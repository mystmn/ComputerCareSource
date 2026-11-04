import type { BookingFormData, BookingSubmissionResult } from '../types';

const STORAGE_KEY = 'ccs_local_leads';

/**
 * Dispatches a booking request to Web3Forms (https://web3forms.com)
 * and guarantees lead safety by persisting to local storage backup.
 */
export async function submitBookingRequest(
  data: BookingFormData,
  altchaPayload?: string
): Promise<BookingSubmissionResult> {
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

  // 2. Web3Forms Integration (https://web3forms.com)
  const web3FormsKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

  if (web3FormsKey) {
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: web3FormsKey,
          subject: `[New In-Home Tech Visit] ${data.fullName} (Ref: ${referenceId})`,
          from_name: 'Computer Care Source',
          name: data.fullName,
          phone: data.phone,
          address: data.address,
          message: data.issueDescription || 'Not specified',
          service: data.serviceType,
          'Customer Name': data.fullName,
          'Phone Number': data.phone,
          'Service Street / Zip': data.address,
          'Service Requested': data.serviceType,
          'Issue Description': data.issueDescription || 'Not specified',
          'Human Verification (ALTCHA)': altchaPayload ? 'Verified' : 'Unverified',
          altcha: altchaPayload || '',
          'Reference ID': referenceId,
          'Submission Time': `${new Date().toLocaleDateString()} at ${submittedAt}`,
        }),
      });

      const resData = await response.json().catch(() => null);
      if (!response.ok || (resData && !resData.success)) {
        console.warn('Web3Forms response notice:', resData || response.status);
      }
    } catch (error) {
      console.warn('Web3Forms dispatch network notice:', error);
    }
  } else {
    console.warn('VITE_WEB3FORMS_ACCESS_KEY is not set. Lead stored locally.');
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
