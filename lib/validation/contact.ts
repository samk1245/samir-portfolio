export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  honeypot?: string; // Anti-spam trap: bots fill this, humans don't
}

export interface ValidationResult {
  isValid: boolean;
  errors: Partial<Record<keyof ContactFormData, string>>;
}

export function validateContactForm(data: Partial<ContactFormData>): ValidationResult {
  const errors: Partial<Record<keyof ContactFormData, string>> = {};

  if (!data.name || data.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters long.";
  } else if (data.name.trim().length > 80) {
    errors.name = "Name cannot exceed 80 characters.";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email.trim())) {
    errors.email = "Please provide a valid email address.";
  }

  if (!data.subject || data.subject.trim().length < 3) {
    errors.subject = "Subject must be at least 3 characters long.";
  } else if (data.subject.trim().length > 120) {
    errors.subject = "Subject cannot exceed 120 characters.";
  }

  if (!data.message || data.message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters long.";
  } else if (data.message.trim().length > 2000) {
    errors.message = "Message cannot exceed 2000 characters.";
  }

  // Honeypot check: if filled, mark invalid silently or throw
  if (data.honeypot && data.honeypot.trim().length > 0) {
    errors.honeypot = "Spam bot detected.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
