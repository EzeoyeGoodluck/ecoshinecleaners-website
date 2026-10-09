import express from 'express';
import { createServer as createViteServer } from 'vite';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TARGET_EMAIL = 'info@ecoshinecleaners.uk.com';
const TARGET_PHONE = '+44 7375 614692';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // In-memory & file storage for leads
  const dataDir = path.resolve(__dirname, 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  const leadsFile = path.resolve(dataDir, 'leads.json');
  if (!fs.existsSync(leadsFile)) {
    fs.writeFileSync(leadsFile, JSON.stringify([], null, 2));
  }

  // API endpoint for form submissions
  app.post('/api/submit', async (req, res) => {
    try {
      const submission = {
        id: 'ECO-' + Date.now().toString(36).toUpperCase(),
        timestamp: new Date().toISOString(),
        ...req.body,
        recipient: TARGET_EMAIL,
        notifyPhone: TARGET_PHONE,
      };

      console.log(`📬 NEW ECOSHINE LEAD RECEIVED for ${TARGET_EMAIL}:`, submission);

      // Save to leads file
      try {
        const currentData = JSON.parse(fs.readFileSync(leadsFile, 'utf-8'));
        currentData.unshift(submission);
        fs.writeFileSync(leadsFile, JSON.stringify(currentData, null, 2));
      } catch (fileErr) {
        console.error('Error saving lead to file:', fileErr);
      }

      // Forward to email endpoint for info@ecoshinecleaners.uk.com
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 6000);

        const emailSubject = submission.source === 'Online Contact Enquiry'
          ? `[EcoShine Contact] ${submission.fullName || 'Client'} (${submission.postcode || 'Enquiry'})`
          : submission.source === 'Customer Review'
          ? `[EcoShine Review] ${submission.name} - ${submission.rating} Stars`
          : `[EcoShine Booking] ${submission.serviceType || 'Eco Clean'} - ${submission.fullName || 'Client'} (${submission.postcode || ''})`;

        const emailPayload: Record<string, any> = {
          _subject: emailSubject,
          _template: 'table',
          _captcha: 'false',
          reference_id: submission.id || submission.referenceId,
          business_inbox: TARGET_EMAIL,
          business_phone: TARGET_PHONE,
          client_name: submission.fullName || submission.name || 'Not provided',
          client_phone: submission.phone || 'Not provided',
          client_email: submission.email || 'Not provided',
          postcode_area: submission.postcode || submission.location || 'Not provided',
          service_requested: submission.serviceType || 'Domestic Clean',
          frequency: submission.frequency || 'One-off / N/A',
          home_layout: submission.bedrooms ? `${submission.bedrooms} Bed(s), ${submission.bathrooms} Bath(s)` : 'N/A',
          specialist_addons: Array.isArray(submission.selectedAddOns) && submission.selectedAddOns.length > 0
            ? submission.selectedAddOns.join(', ')
            : 'None',
          preferred_date: submission.preferredDate ? `${submission.preferredDate} (${submission.preferredTime || 'Anytime'})` : 'Flexible / Soonest',
          estimated_investment: submission.estimatedPrice ? `£${submission.estimatedPrice}.00` : 'Quote Requested',
          has_pets: submission.hasPets ? 'YES - Dispatch pet-safe botanical solution' : 'No pets noted',
          preferred_contact_method: submission.contactMethod || 'WhatsApp / Phone',
          what_they_want_or_requirements: submission.whatTheyWant || submission.notes || submission.message || 'General cleaning enquiry',
          notes_or_message: submission.message || submission.notes || submission.quote || submission.whatTheyWant || 'No extra notes provided',
          region_hub: submission.region || 'Northampton & Northamptonshire',
          submitted_at: submission.timestamp,
        };

        if (submission.email && submission.email.includes('@')) {
          emailPayload._replyto = submission.email;
        }

        await fetch(`https://formsubmit.co/ajax/${TARGET_EMAIL}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify(emailPayload),
          signal: controller.signal,
        })
          .then((r) => r.json())
          .then((res) => console.log('FormSubmit status for ' + TARGET_EMAIL + ':', res))
          .catch((err) => console.log('Email forwarding status:', err.message));

        clearTimeout(timeoutId);
      } catch (e) {
        console.log('Silent email dispatch catch:', e);
      }

      return res.json({
        success: true,
        referenceId: submission.id,
        recipient: TARGET_EMAIL,
        phone: TARGET_PHONE,
        message: `Your enquiry has been dispatched to ${TARGET_EMAIL}`,
      });
    } catch (err: any) {
      console.error('Submit error:', err);
      return res.status(500).json({ success: false, error: err.message });
    }
  });

  // Leads retrieval endpoint
  app.get('/api/leads', (_req, res) => {
    try {
      const data = JSON.parse(fs.readFileSync(leadsFile, 'utf-8'));
      return res.json({ success: true, count: data.length, leads: data });
    } catch {
      return res.json({ success: true, count: 0, leads: [] });
    }
  });

  // Mount Vite middlewares in development
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });
  app.use(vite.middlewares);

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`EcoShine server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
