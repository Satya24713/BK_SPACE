
import { Murli, AbhyasForm, CourseDay } from '../types';

export const SEED_MURLIS: Murli[] = [
  {
    id: '1',
    date: '1971-06-08',
    type: 'Avyakt',
    title_hindi: 'जीवन के लिए तीन चीजों की आवश्यकता',
    content_hindi: 'जीवन में मुख्य तीन शक्तियों की आवश्यकता है: 1. निर्णय शक्ति, 2. परखने की शक्ति, 3. सहन शक्ति।',
    content_english: 'Three main powers are needed in life: 1. Power of Judgment, 2. Power of Discernment, 3. Power of Tolerance.',
    audio_url: 'https://soundcloud.com/brahmakumaris/music-for-meditation-1',
    youtube_id: 'XO8wew38VM8'
  },
  {
    id: '2',
    date: '2023-10-24',
    type: 'Sakar',
    title_hindi: 'मीठे बच्चे - विदेही बनने का अभ्यास करो',
    content_hindi: 'मीठे बच्चे, तुम्हें अब विदेही बनने का अभ्यास करना है। अपने को आत्मा समझ बाप को याद करो।',
    content_english: 'Sweet children, you now have to practice becoming bodiless. Consider yourself a soul and remember the Father.',
    youtube_id: 'P_6vDLq6jGM'
  },
  {
    id: '3',
    date: '1993-01-18',
    type: 'Avyakt',
    title_hindi: 'तपस्या का वर्ष',
    content_hindi: 'तपस्या अर्थात एक बाप दूसरा न कोई। दृढ़ता ही सफलता की चाबी है।',
    content_english: 'Tapasya means One Father and no one else. Determination is the key to success.',
    youtube_id: 'iWES7Hj52zY'
  }
];

export const SEED_ABHYAS: AbhyasForm[] = [
  {
    id: 'form-1',
    title: 'Soul Consciousness',
    hindi_title: 'आत्मिक स्वरूप',
    description: 'I am a point of light, a peaceful soul, situated in the center of the forehead.',
    description_hindi: 'मैं एक चमकता हुआ सितारा, शांत स्वरूप आत्मा, मस्तक के बीच विराजमान हूँ।',
    color_theme: 'text-yellow-600'
  },
  {
    id: 'form-2',
    title: 'God\'s Child',
    hindi_title: 'ईश्वर की संतान',
    description: 'I am a child of the Supreme Soul, full of purity and divine virtues.',
    description_hindi: 'मैं परमपिता परमात्मा की संतान हूँ, पवित्रता और दिव्य गुणों से भरपूर हूँ।',
    color_theme: 'text-orange-500'
  },
  {
    id: 'form-3',
    title: 'Ancestor Soul',
    hindi_title: 'पूर्वज आत्मा',
    description: 'I am an ancestor soul, a root of the world tree, sustaining everyone.',
    description_hindi: 'मैं पूर्वज आत्मा हूँ, विश्व रूपी वृक्ष की जड़ हूँ, सभी को शक्ति प्रदान कर रही हूँ।',
    color_theme: 'text-red-500'
  },
  {
    id: 'form-4',
    title: 'World Server',
    hindi_title: 'विश्व सेवादारी',
    description: 'I am a world server, radiating vibrations of peace to the whole globe.',
    description_hindi: 'मैं विश्व सेवादारी हूँ, पूरे विश्व को शांति के प्रकंपन दे रही हूँ।',
    color_theme: 'text-blue-500'
  },
  {
    id: 'form-5',
    title: 'Angel',
    hindi_title: 'फरिश्ता',
    description: 'I am a double light angel, detached from the body and loved by God.',
    description_hindi: 'मैं डबल लाइट फरिश्ता हूँ, देह से न्यारा और परमात्मा का प्यारा हूँ।',
    color_theme: 'text-white drop-shadow-md'
  }
];

export const SEED_COURSE: CourseDay[] = [
  {
    day: 1,
    title: 'Who am I?',
    title_hindi: 'मैं कौन हूँ?',
    theme_hindi: 'मैं कौन हूँ?',
    resources: ['Soul vs Body', '3 Faculties of Soul (Mind, Intellect, Sanskars)'],
    reflection: 'Visualize yourself as a sparkling star in the center of the forehead.',
    reflection_hindi: 'स्वयं को मस्तक के बीच चमकते हुए सितारे के रूप में देखें।'
  },
  {
    day: 2,
    title: 'Who is God?',
    title_hindi: 'परमात्मा कौन है?',
    theme_hindi: 'परमात्मा कौन है?',
    resources: ['Shiv Baba - The Point of Light', 'God\'s attributes'],
    reflection: 'Feel the rays of peace coming from the Supreme Soul.',
    reflection_hindi: 'परमात्मा से आती हुई शांति की किरणों को महसूस करें।'
  },
  {
    day: 3,
    title: 'Three Worlds',
    title_hindi: 'तीन लोक',
    theme_hindi: 'तीन लोक',
    resources: ['Corporeal, Subtle, Incorporeal World'],
    reflection: 'Travel with your mind to the Soul World (Paramdham).',
    reflection_hindi: 'अपने मन से परमधाम की यात्रा करें।'
  },
  {
    day: 4,
    title: 'The World Cycle',
    title_hindi: 'सृष्टि चक्र',
    theme_hindi: 'सृष्टि चक्र',
    resources: ['Golden, Silver, Copper, Iron Ages', 'The Sangam Yug'],
    reflection: 'Reflect on your journey through the cycle.',
    reflection_hindi: 'सृष्टि चक्र में अपनी यात्रा का चिंतन करें।'
  },
  {
    day: 5,
    title: 'Karma Philosophy',
    title_hindi: 'कर्म दर्शन',
    theme_hindi: 'कर्म दर्शन',
    resources: ['Law of Action and Reaction', 'Deep philosophy of Karma'],
    reflection: 'Check your actions today. Are they neutral or elevated?',
    reflection_hindi: 'आज अपने कर्मों की जाँच करें। क्या वे श्रेष्ठ हैं?'
  },
  {
    day: 6,
    title: 'Tree of Humanity',
    title_hindi: 'कल्प वृक्ष',
    theme_hindi: 'कल्प वृक्ष',
    resources: ['The roots, trunk, and branches', 'Unity in diversity'],
    reflection: 'Send good wishes to all souls of all religions.',
    reflection_hindi: 'सभी धर्मों की आत्माओं को शुभ भावना भेजें।'
  },
  {
    day: 7,
    title: 'Rajyoga Meditation',
    title_hindi: 'राजयोग विधि',
    theme_hindi: 'राजयोग विधि',
    resources: ['Method of Connection', 'Practical Application'],
    reflection: 'Sit in silence and experience the link with the Divine.',
    reflection_hindi: 'शांति में बैठें और परमात्मा से संबंध का अनुभव करें।'
  }
];
