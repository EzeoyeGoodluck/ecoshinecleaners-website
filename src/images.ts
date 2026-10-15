// Photos used on the site, hotlinked from Unsplash (free licence, no attribution
// end of its URL and paste it in place of the ID below. Keep the ?w=... suffix.
const unsplash = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const IMAGES = {
  // Regular cleaning: bright, tidy living room
  regular: unsplash("photo-1600585154340-be6161a56a0c"),
  // Deep cleaning: person cleaning a kitchen worktop with spray and cloth
  deep: unsplash("photo-1556911220-bff31c812dba"),
  // End of tenancy: empty, clean kitchen
  tenancy: unsplash("photo-1484154218962-a197022b5858"),
  // Commercial: modern office interior
  commercial: unsplash("photo-1497366216548-37526070297c"),
};
