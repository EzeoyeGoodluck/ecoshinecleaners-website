import { BUSINESS } from '../config';

// Every form on the site posts here. It sends the submission to formsubmit.co,
// which emails it to BUSINESS.email. See src/config.ts for setup notes.
export async function submitLead(subject: string, payload: Record<string, unknown>) {
  const res = await fetch(`https://formsubmit.co/ajax/${BUSINESS.email}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      _subject: subject,
      _template: 'table',
      _captcha: 'false',
      ...payload,
    }),
  });
  if (!res.ok) throw new Error('Form submission failed');
}

export const SERVICE_OPTIONS = [
  { value: 'Regular Domestic Cleaning', label: 'Regular domestic cleaning' },
  { value: 'Deep Cleaning', label: 'Deep cleaning' },
  { value: 'End of Tenancy Cleaning', label: 'End of tenancy cleaning' },
  { value: 'Commercial Cleaning', label: 'Commercial cleaning' },
  { value: 'Other', label: 'Other' },
];
