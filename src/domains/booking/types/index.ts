export interface BookingFormData {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  zipCode: string;
  serviceType: string;
  deviceType: string;
  preferredDate: string;
  timeWindow: string;
  issueDescription: string;
}

export interface BookingSubmissionResult {
  referenceId: string;
  data: BookingFormData;
  submittedAt: string;
}

