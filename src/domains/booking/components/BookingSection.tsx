import React, { useState } from 'react';
import type { BookingFormData, BookingSubmissionResult } from '../types';
import { submitBookingRequest } from '../services/bookingService';
import { AltchaWidget } from '../../../shared/components/AltchaWidget';
import { CheckCircle2, RefreshCw, Send, Lock } from 'lucide-react';

interface BookingSectionProps {
  selectedServiceId?: string;
}

export const BookingSection: React.FC<BookingSectionProps> = ({
  selectedServiceId = 'computer-repair',
}) => {
  const [formData, setFormData] = useState<BookingFormData>({
    fullName: '',
    phone: '',
    address: '',
    zipCode: '',
    serviceType: selectedServiceId,
    deviceType: 'Home Computer / Network',
    preferredDate: '',
    timeWindow: 'Flexible',
    issueDescription: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<BookingSubmissionResult | null>(null);
  const [altchaPayload, setAltchaPayload] = useState<string>('');
  const [altchaVerified, setAltchaVerified] = useState(false);
  const [verificationError, setVerificationError] = useState(false);

  const [prevServiceId, setPrevServiceId] = useState(selectedServiceId);
  if (selectedServiceId !== prevServiceId) {
    setPrevServiceId(selectedServiceId);
    setFormData((prev) => ({ ...prev, serviceType: selectedServiceId }));
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === 'name' || name === 'fullName') {
      setFormData((prev) => ({ ...prev, fullName: value }));
    } else if (name === 'message' || name === 'issueDescription') {
      setFormData((prev) => ({ ...prev, issueDescription: value }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!altchaVerified) {
      setVerificationError(true);
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await submitBookingRequest(formData, altchaPayload);
      setSubmissionResult(result);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formSubmitTarget =
    import.meta.env.VITE_FORMSUBMIT_EMAIL || 'info@theevergreenstrategy.com';
  const formAction = `https://formsubmit.co/${formSubmitTarget}`;

  return (
    <section
      id="booking"
      className="relative py-20 sm:py-24 bg-gradient-to-b from-[#1B365D] to-[#10223B] text-white scroll-mt-16 overflow-hidden"
    >
      {/* Spatial Layer 1: Architectural Grid & Ambient Glow */}
      <div className="absolute inset-0 bg-architectural-grid opacity-50 pointer-events-none" />
      <div className="absolute -top-24 left-1/3 w-96 h-96 rounded-full bg-[#2C7A7B]/20 blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-24 right-1/3 w-96 h-96 rounded-full bg-[#C59B27]/15 blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 space-y-2">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Schedule Your In-Home Visit
          </h2>
          <p className="text-base text-gray-300">
            No upfront payment required. We will call or text you promptly to confirm your appointment.
          </p>
        </div>

        {/* Spatial Layer 2: Frosted Glass Outer Bezel Frame */}
        <div className="p-2.5 sm:p-3.5 rounded-[2.25rem] bg-white/[0.08] backdrop-blur-md border border-white/15 shadow-2xl">
          {/* Spatial Layer 3: Inner Pure White Card */}
          <div className="rounded-3xl bg-white text-[#4A5568] p-6 sm:p-10 shadow-xl">
            {submissionResult ? (
              <div className="text-center py-6 space-y-5">
                <div className="w-16 h-16 rounded-full bg-[#E6FFFA] text-[#2C7A7B] mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#2C7A7B]">
                    Confirmed &bull; Ref #{submissionResult.referenceId}
                  </span>
                  <h3 className="text-2xl font-extrabold text-[#1B365D]">
                    Thank You, {submissionResult.data.fullName}!
                  </h3>
                  <p className="text-sm text-[#4A5568] max-w-md mx-auto">
                    We have received your request and will reach out to{' '}
                    <strong className="text-[#1B365D]">{submissionResult.data.phone}</strong> shortly.
                  </p>
                </div>
                <button
                  onClick={() => setSubmissionResult(null)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-300 text-xs font-bold text-[#4A5568] hover:bg-gray-50 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Book Another Visit</span>
                </button>
              </div>
            ) : (
              <form
                action={formAction}
                method="POST"
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                {/* FormSubmit Configuration Fields */}
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_template" value="table" />
                <input
                  type="hidden"
                  name="_subject"
                  value="New In-Home Tech Visit - Computer Care Source"
                />
                <input type="hidden" name="service" value={formData.serviceType} />
                <input type="hidden" name="altcha" value={altchaPayload} />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="client-name"
                      className="block text-xs font-bold text-[#1B365D] uppercase tracking-wider mb-1.5"
                    >
                      Name *
                    </label>
                    <input
                      id="client-name"
                      type="text"
                      required
                      name="name"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Full Name"
                      className="w-full px-4 py-3 rounded-xl bg-[#F7FAFC] border border-slate-200 text-sm text-[#1B365D] shadow-inner focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C59B27] transition-all"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="client-phone"
                      className="block text-xs font-bold text-[#1B365D] uppercase tracking-wider mb-1.5"
                    >
                      Phone Number *
                    </label>
                    <input
                      id="client-phone"
                      type="tel"
                      required
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="(614) 382-2874"
                      className="w-full px-4 py-3 rounded-xl bg-[#F7FAFC] border border-slate-200 text-sm text-[#1B365D] shadow-inner focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C59B27] transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="client-address"
                    className="block text-xs font-bold text-[#1B365D] uppercase tracking-wider mb-1.5"
                  >
                    Address or Zip Code *
                  </label>
                  <input
                    id="client-address"
                    type="text"
                    required
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Street Address or Zip Code"
                    className="w-full px-4 py-3 rounded-xl bg-[#F7FAFC] border border-slate-200 text-sm text-[#1B365D] shadow-inner focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C59B27] transition-all"
                  />
                </div>

                <div>
                  <label
                    htmlFor="client-message"
                    className="block text-xs font-bold text-[#1B365D] uppercase tracking-wider mb-1.5"
                  >
                    Brief Description of Issue
                  </label>
                  <textarea
                    id="client-message"
                    rows={3}
                    name="message"
                    value={formData.issueDescription}
                    onChange={handleChange}
                    placeholder="How can we help? (e.g. slow PC, virus pop-ups, Wi-Fi dead zones, data recovery...)"
                    className="w-full px-4 py-3 rounded-xl bg-[#F7FAFC] border border-slate-200 text-sm text-[#1B365D] shadow-inner focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C59B27] transition-all"
                  />
                </div>

                {/* Human Validation: ALTCHA Proof-of-Work */}
                <div className="pt-1">
                  <div className="flex flex-col gap-2">
                    <span className="block text-xs font-bold text-[#1B365D] uppercase tracking-wider">
                      Human Verification
                    </span>
                    <AltchaWidget
                      onVerify={(payload) => {
                        setAltchaVerified(true);
                        setAltchaPayload(payload);
                        setVerificationError(false);
                      }}
                    />
                    {verificationError && !altchaVerified && (
                      <p className="text-xs text-red-500 font-medium animate-in fade-in">
                        Please complete the verification checkbox above before requesting a visit.
                      </p>
                    )}
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-1.5 text-xs text-[#4A5568]">
                    <Lock className="w-4 h-4 text-[#2C7A7B]" />
                    <span>100% Confidential. Pay only after service is complete.</span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-b from-[#D4A930] to-[#C59B27] hover:from-[#C59B27] hover:to-[#AF8820] border-t border-white/30 text-white font-bold text-base shadow-gold-glow transition-all transform hover:-translate-y-0.5 cursor-pointer disabled:opacity-60"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? 'Sending...' : 'Request House Call'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
