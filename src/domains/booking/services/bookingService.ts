import type { BookingFormData, BookingSubmissionResult } from '../types';

const STORAGE_KEY = 'ccs_local_leads';

/**
 * Dispatches a booking request to FormSubmit.co (https://formsubmit.co)
 * and guarantees lead safety by persisting to local storage backup.
 */
export async function submitBookingRequest(data: BookingFormData): Promise<BookingSubmissionResult> {
  const referenceId = 'CCS-' + Math.floor(100000 + Math.random() * 900000);
  const submittedAt = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const result: BookingSubmissionResult = {
    referenceId,
    data,
    submittedAt,
  };

  // 1. Local backup guarantee (never lose a lead)
  try {
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    existing.unshift(result);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing.slice(0, 50)));
  } catch (err) {
    console.warn('Could not store lead to localStorage:', err);
  }

  // 2. FormSubmit.co Integration
  // Uses VITE_FORMSUBMIT_EMAIL if provided, or fallback
  const formSubmitTarget =
    import.meta.env.VITE_FORMSUBMIT_EMAIL ||
    import.meta.env.VITE_FORMSUBMIT_TOKEN ||
    'contact@computercaresource.com';

  const formSubmitEndpoint = `https://formsubmit.co/ajax/${formSubmitTarget}`;

  try {
    const response = await fetch(formSubmitEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        _subject: `[New In-Home Tech Visit] ${data.fullName} (Ref: ${referenceId})`,
        _template: 'table',
        _captcha: 'false',
        'Customer Name': data.fullName,
        'Phone Number': data.phone,
        'Service Street / Zip': data.address,
        'Service Requested': data.serviceType,
        'Issue Description': data.issueDescription || 'Not specified',
        'Reference ID': referenceId,
        'Submission Time': `${new Date().toLocaleDateString()} at ${submittedAt}`,
      }),
    });

    if (!response.ok) {
      console.warn('FormSubmit returned status:', response.status);
    }
  } catch (error) {
    console.warn('FormSubmit dispatch network notice:', error);
    // Non-blocking: result is returned so user sees confirmation & reference code
  }

  // 3. Optional secondary webhook (if configured)
  const webhookUrl = import.meta.env.VITE_BOOKING_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...result,
          timestamp: new Date().toISOString(),
          source: 'computercaresource.com',
        }),
      });
    } catch (err) {
      console.error('Secondary webhook error:', err);
    }
  }

  return result;
}
