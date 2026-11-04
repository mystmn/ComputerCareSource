import React, { useEffect, useRef, useState } from 'react';

// Declare custom element for TypeScript
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'altcha-widget': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          challenge?: string;
          test?: boolean | string;
          name?: string;
          theme?: string;
          auto?: string;
          hidelogo?: boolean | string;
          hidefooter?: boolean | string;
          configuration?: string;
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
          test?: boolean | string;
          name?: string;
          theme?: string;
          auto?: string;
          hidelogo?: boolean | string;
          hidefooter?: boolean | string;
          configuration?: string;
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
      });
  }, []);

  useEffect(() => {
    const el = widgetRef.current;
    if (!el || !isLoaded) return;

    const handleStateChange = (ev: Event) => {
      const customEvent = ev as CustomEvent<{ state: string; payload?: string }>;
      if (customEvent.detail) {
        if (customEvent.detail.state === 'verified' && customEvent.detail.payload) {
          onVerify?.(customEvent.detail.payload);
        }
      }
    };

    const handleVerified = (ev: Event) => {
      const customEvent = ev as CustomEvent<{ payload?: string }>;
      if (customEvent.detail?.payload) {
        onVerify?.(customEvent.detail.payload);
      } else {
        onVerify?.('verified_human');
      }
    };

    el.addEventListener('statechange', handleStateChange);
    el.addEventListener('verified', handleVerified);

    return () => {
      el.removeEventListener('statechange', handleStateChange);
      el.removeEventListener('verified', handleVerified);
    };
  }, [isLoaded, onVerify]);

  return (
    <div className={`altcha-container ${className}`}>
      {effectiveChallenge ? (
        <altcha-widget
          ref={widgetRef}
          challenge={effectiveChallenge}
          name="altcha"
          theme="light"
          hidelogo="true"
        />
      ) : (
        <altcha-widget
          ref={widgetRef}
          test="true"
          name="altcha"
          theme="light"
          hidelogo="true"
        />
      )}
    </div>
  );
};
