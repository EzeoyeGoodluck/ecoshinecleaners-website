# Redesign notes (14 Oct 2026)

Restructured to follow the BrightPoint Cleaning layout.

## Files changed
- src/components/Header.tsx: promo strip, logo, nav with Residential dropdown (Regular / Deep / End of Tenancy), Commercial, Areas, Reviews, FAQs, Contact, phone number and Book now button. Region switcher removed from the UI (data and props kept, so Southampton can be re-enabled later).
- src/components/HomeView.tsx: hero with headline and inline quote form, trust badge row, three service cards plus commercial banner, Why choose EcoShine, three reviews, final call to action. Price calculator and postcode checker removed from the home page (the quote modal and services page still cover pricing).
- src/components/Footer.tsx: simplified three-column footer.
- src/components/MobileStickyBar.tsx: Get a price / Call bar on mobile, plus a floating WhatsApp button on all screen sizes.
- src/components/FAQView.tsx (new): accordion page using FAQS from cleaningData plus three extra questions.
- src/App.tsx and src/types.ts: faq route added.
- src/components/ServicesView.tsx: anchor ids added to the four package cards so nav links scroll to them.
- src/index.css: shared .field, .btn-primary, .btn-secondary, .btn-accent classes.
- index.html: body background set to white.

- Second phone number +44 7551 909166 added as phone2 in cleaningData.ts and shown in the header, mobile menu, footer, home page (thanks state and final CTA), contact page, services page and service areas page.

## Still to confirm with the client
- Real Google review rating and count (not shown yet, to avoid an unverified claim).
- Whether the £10 off promo strip is a real offer.
- Company number and registered office for the footer.
- Real photos for the three service cards (currently using the existing stock images).
- Whether to keep the Southampton region at all.
