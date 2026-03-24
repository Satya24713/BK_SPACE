# BK Space

A beautifully crafted, "vibe-coded" spiritual daily reading application created with love for my mom. 

## About The Project
BK Space serves as a clean, uninterrupted gateway to daily spiritual study across Murlis, Abhyas forms, and Course content. The application focuses on delivering an incredibly premium, distraction-free reading experience bathed in warm spiritual tones (strict `#D32F2F` contrast).

## Features
- **Immersive Daily Reader:** A sleek reading view featuring dynamic paragraph tracking (`IntersectionObserver`) to maintain focus, inline markdown bolding for key terms (`**सार:**`), and floating action button (FAB) navigation tools to scroll massive texts smoothly.
- **Strictly Spiritual Typography:** The entire application is completely locked to the elegant "Laila" font, ensuring a culturally resonant, beautiful layout out-of-the-box.
- **Hidden Admin Portal:** A PIN-protected `/#/admin-secret-upload` route provides secure database inserts and native `<select>` dropdown updating for Murlis, Abhyas forms, and Course days without needing complex third-party tools.
- **Butter-Smooth UI:** Animated via `framer-motion` to provide tactile hover and tap physics, dynamic empty states, premium iOS-grade Date Pickers, and spinning "Soul Point" CSS background architectures.
- **Cloud Database:** Fully powered by Supabase natively. Relies 100% on live database data, cleanly managing empty arrays natively via stunning glowing "Awakening" loaders and empty states.

## Tech Stack
- Frontend: React, Vite, Tailwind CSS, Framer Motion
- Backend: Supabase (PostgreSQL)
- Icons: React Icons (Type Safe)

## Setup
To run this project locally, ensure you provide `.env.local` containing:
```
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```
Then run the app using `npm run dev`.
