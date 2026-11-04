import React, { useEffect, useRef, useState } from 'react';

// Declare custom element for TypeScript
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'altcha-widget': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          challenge?: string;
          configuration?: string;
          name?: string;
          theme?: string;
          auto?: string;
          hidelogo?: boolean | string;
          hidefooter?: boolean | string;
        },
        HTMLElement
      >;
    }
  }
  namespace React.JSX {
    interface IntrinsicElements {
      'altcha-widget': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          challenge?: string;
          configuration?: string;
          name?: string;
          theme?: string;
          auto?: string;
          hidelogo?: boolean | string;
          hidefooter?: boolean | string;
        },
        HTMLElement
      >;
    }
  }
}

interface AltchaWidgetProps {
  onVerify?: (payload: string) => void;
  challengeUrl?: string;
  className?: string;
}

export const AltchaWidget: React.FC<AltchaWidgetProps> = ({
  onVerify,
  challengeUrl,
  className = '',
}) => {
  const widgetRef = useRef<HTMLElement | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Challenge endpoint from prop, env, or fallback to client-side test mode
  const effectiveChallenge = challengeUrl || import.meta.env.VITE_ALTCHA_CHALLENGE_URL;

  useEffect(() => {
    // Dynamic import to register <altcha-widget> custom element
    import('altcha')
      .then(() => {
        setIsLoaded(true);
      })
      .catch((err) => {
        console.warn('Failed to load ALTCHA library:', err);
        setErrorMessage('Failed to load validation widget.');
      });
  }, []);

  useEffect(() => {
    const el = widgetRef.current;
    if (!el || !isLoaded) return;

    // In ALTCHA v3, test mode MUST be set via configure() or configuration attribute
    const widgetConfig = effectiveChallenge
      ? { challenge: effectiveChallenge }
      : { test: true, minDuration: 400 };

    // Programmatic configuration
    if (typeof (el as unknown as { configure: (cfg: object) => void }).configure === 'function') {
      (el as unknown as { configure: (cfg: object) => void }).configure(widgetConfig);
    }

    const handleStateChange = (ev: Event) => {
      const customEvent = ev as CustomEvent<{ state: string; payload?: string }>;
      if (customEvent.detail) {
        if (customEvent.detail.state === 'verified' && customEvent.detail.payload) {
          setErrorMessage(null);
          onVerify?.(customEvent.detail.payload);
        } else if (customEvent.detail.state === 'error') {
          console.warn('ALTCHA state error');
        }
      }
    };

    const handleVerified = (ev: Event) => {
      const customEvent = ev as CustomEvent<{ payload?: string }>;
      const payload = customEvent.detail?.payload || 'verified_human_pow';
      setErrorMessage(null);
      onVerify?.(payload);
    };

    el.addEventListener('statechange', handleStateChange);
    el.addEventListener('verified', handleVerified);

    return () => {
      el.removeEventListener('statechange', handleStateChange);
      el.removeEventListener('verified', handleVerified);
    };
  }, [isLoaded, effectiveChallenge, onVerify]);

  const configJson = JSON.stringify(
    effectiveChallenge
      ? { challenge: effectiveChallenge }
      : { test: true, minDuration: 400 }
  );

  return (
    <div className={`altcha-container ${className}`}>
      {effectiveChallenge ? (
        <altcha-widget
          ref={widgetRef}
          challenge={effectiveChallenge}
          configuration={configJson}
          name="altcha"
          theme="light"
          hidelogo="true"
        />
      ) : (
        <altcha-widget
          ref={widgetRef}
          configuration={configJson}
          name="altcha"
          theme="light"
          hidelogo="true"
        />
      )}

      {errorMessage && (
        <p className="text-xs text-red-500 mt-1">{errorMessage}</p>
      )}
    </div>
  );
};
