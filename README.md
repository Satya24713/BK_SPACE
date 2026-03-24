 **BK Space** is a spiritual reading app I built for my mom. It's "vibe-coded"—meaning I focused on how it feels rather than perfect code structure.

My goal was simple: create a peaceful place for daily spiritual study. The app lets you read Murlis, Abhyas forms, and Course content without any distractions. I chose warm, spiritual colors throughout, especially this deep red (#D32F2F) that creates a calming atmosphere.

The reading experience keeps you focused. As you scroll, it remembers your place automatically. Important terms are bolded right in the text (like **सार:**), and a handy floating button helps you navigate long sections.

For typography, I picked one font—Laila—and used it everywhere. It gives the whole app an elegant, culturally resonant feel.

There's also a secret admin page (protected by a PIN) where you can easily add new content. No complicated tools needed—just simple dropdowns to update Murlis, Abhyas forms, and Course days.

The interface feels smooth and tactile. Buttons respond nicely when you tap them, the date picker works just like the one on your iPhone, and subtle background animations add to the peaceful vibe.

All the data lives in Supabase. When there's nothing to show, instead of boring empty states, you get beautiful glowing "Awakening" screens.

Under the hood, I used React with Vite, styled everything with Tailwind CSS, and added animations through Framer Motion. The backend is Supabase (PostgreSQL), and I used React Icons for all the icons.

If you want to run it yourself, create a `.env.local` file with your Supabase credentials:

```
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

Then run `npm run dev` and you're good to go.
