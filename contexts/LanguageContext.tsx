
import React, { createContext, useContext, ReactNode } from 'react';

// Fonts available in index.html config
export type FontType = 'font-sans' | 'font-gotu' | 'font-laila' | 'font-teko';

interface LanguageContextType {
  font: FontType;
  fontName: string;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<string, string> = {
  'nav.home': 'घर',
  'nav.murlis': 'मुरली',
  'nav.abhyas': 'अभ्यास',
  'nav.course': 'कोर्स',
  'nav.favorites': 'पसंदीदा',

  'home.subtitle': 'अपने आंतरिक प्रकाश से जुड़ें।',
  'home.search': 'ज्ञान के सागर में खोजें...',
  'home.dailypearl': 'आज का मोती',
  'home.vardan': 'आज का मुख्य सार',
  'home.readMurli': 'आज की मुरली पढ़ें',
  'home.readmore': 'और पढ़ें',

  'murlis.title': 'खज़ाना',
  'murlis.listen': 'ऑडियो सुनें',
  'murlis.nomatch': 'कोई मुरली नहीं मिली',
  'murlis.sakar.title': 'साकार मुरली',
  'murlis.sakar.desc': 'शिव बाबा द्वारा प्रजापिता ब्रह्मा के माध्यम से उच्चारे गए अनमोल महावाक्य।',
  'murlis.avyakt.title': 'अव्यक्त मुरली',
  'murlis.avyakt.desc': 'बापदादा द्वारा दादी गुलज़ार के माध्यम से उच्चारे गए श्रेष्ठ महावाक्य।',
  'murlis.back': 'वापस',

  'abhyas.title': '५ स्वरूप अभ्यास',
  'abhyas.subtitle': 'आत्मिक शक्ति पुनः प्राप्त करने के लिए दैनिक आध्यात्मिक ड्रिल।',
  'abhyas.progress': 'दैनिक प्रगति',

  'course.title': '७ दिवसीय राजयोग कोर्स',
  'course.journey': 'आपकी यात्रा',
  'course.completed': 'पूर्ण',
  'course.reflection': 'चिंतन',
  'course.resources': 'अध्ययन सामग्री',
  'course.markDone': 'पूर्ण चिह्नित करें',
  'course.markIncomplete': 'अपूर्ण चिह्नित करें',

  'fav.title': 'पसंदीदा',
  'fav.loading': 'रत्न लोड हो रहे हैं...',
  'fav.empty': 'अभी तक कोई पसंदीदा नहीं।',
  'fav.emptySub': 'यहाँ देखने के लिए मुरली को बुकमार्क करें।',
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const t = (key: string): string => {
    return translations[key] || key;
  };

  return (
    <LanguageContext.Provider value={{
      font: 'font-laila',
      fontName: 'लैला',
      t
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
