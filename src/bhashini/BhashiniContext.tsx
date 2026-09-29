import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { INDIAN_LANGUAGES, UI_TRANSLATIONS, IndianLanguage } from './bhashiniData';

interface BhashiniConfig {
  apiKey: string;
  userId: string;
  pipelineId: string;
  useOfficialApi: boolean;
}

interface BhashiniContextType {
  currentLang: IndianLanguage;
  setLanguageByCode: (code: string) => void;
  languages: IndianLanguage[];
  t: (key: string, defaultText?: string) => string;
  speak: (text?: string) => void;
  stopSpeaking: () => void;
  isSpeaking: boolean;
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  config: BhashiniConfig;
  updateConfig: (newConfig: Partial<BhashiniConfig>) => void;
  getAthleteAdviceForPage: (pathname: string) => string;
}

const DEFAULT_CONFIG: BhashiniConfig = {
  apiKey: '',
  userId: '',
  pipelineId: '',
  useOfficialApi: false,
};

const BhashiniContext = createContext<BhashiniContextType | null>(null);

export function BhashiniProvider({ children }: { children: ReactNode }) {
  const [langCode, setLangCode] = useState<string>(() => {
    return localStorage.getItem('sanjivya_bhashini_lang') || 'en';
  });

  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [config, setConfig] = useState<BhashiniConfig>(() => {
    try {
      const saved = localStorage.getItem('sanjivya_bhashini_config');
      return saved ? { ...DEFAULT_CONFIG, ...JSON.parse(saved) } : DEFAULT_CONFIG;
    } catch {
      return DEFAULT_CONFIG;
    }
  });

  const currentLang = INDIAN_LANGUAGES.find((l) => l.code === langCode) || INDIAN_LANGUAGES[0];

  const setLanguageByCode = useCallback((code: string) => {
    setLangCode(code);
    localStorage.setItem('sanjivya_bhashini_lang', code);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, []);

  const updateConfig = useCallback((newConfig: Partial<BhashiniConfig>) => {
    setConfig((prev) => {
      const updated = { ...prev, ...newConfig };
      localStorage.setItem('sanjivya_bhashini_config', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const t = useCallback((key: string, defaultText?: string): string => {
    const entry = UI_TRANSLATIONS[key];
    if (entry) {
      if (entry[langCode]) return entry[langCode];
      if (currentLang.fallbackLang && entry[currentLang.fallbackLang]) return entry[currentLang.fallbackLang];
      if (entry['en']) return entry['en'];
    }
    return defaultText || key;
  }, [langCode, currentLang]);

  const stopSpeaking = useCallback(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  }, []);

  const speak = useCallback((customText?: string) => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported on this browser.');
      return;
    }

    window.speechSynthesis.cancel();

    const textToSpeak = customText || currentLang.sampleGreeting;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = currentLang.speechCode;
    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    const voices = window.speechSynthesis.getVoices();
    const matchingVoice = voices.find(
      (v) => v.lang.toLowerCase() === currentLang.speechCode.toLowerCase() ||
             v.lang.toLowerCase().startsWith(currentLang.code)
    );
    if (matchingVoice) {
      utterance.voice = matchingVoice;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  }, [currentLang]);

  const getAthleteAdviceForPage = useCallback((pathname: string): string => {
    const lang = currentLang.code;
    if (pathname.includes('/progress')) {
      if (lang === 'hi') return 'आपकी प्रगति में फॉर्म स्कोर 86% और ट्रेनिंग लोड सामान्य श्रेणी में है। बहुत बढ़िया सुधार!';
      if (lang === 'bho') return 'रउआ प्रगति में फॉर्म स्कोर 86% आ ट्रेनिंग लोड एकदम सही बा। बहुत नीमन सुधार!';
      if (lang === 'raj') return 'आपरी प्रगती में फॉर्म स्कोर 86% अर तालीम लोड सही चल रह्यो है। घणो आछो सुधार!';
      if (lang === 'hne') return 'आप मन के प्रगति म फॉर्म स्कोर 86% अउ ट्रेनिंग लोड बने हे। बढ़िया सुधार!';
      if (lang === 'mr') return 'तुमच्या प्रगतीत सरासरी फॉर्म स्कोअर 86% आणि ट्रेनिंग लोड चांगल्या स्थितीत आहे. खूप छान प्रगती!';
      if (lang === 'gu') return 'તમારી પ્રગતિમાં સરેરાશ ફોર્મ સ્કોર 86% અને તાલીમ લોડ સામાન્ય શ્રેણીમાં છે. ઉત્તમ સુધારો!';
      if (lang === 'pa') return 'ਤੁਹਾਡੀ ਪ੍ਰਗਤੀ ਵਿੱਚ ਔਸਤ ਫਾਰਮ ਸਕੋਰ 86% ਅਤੇ ਸਿਖਲਾਈ ਲੋਡ ਬਹੁਤ ਵਧੀਆ ਹੈ। ਸ਼ਾਨਦਾਰ ਸੁਧਾਰ!';
      if (lang === 'ta') return 'உங்கள் முன்னேற்றத்தில் படிவ மதிப்பெண் 86% ஆக உள்ளது. சிறந்த பயிற்சி!';
      if (lang === 'te') return 'మీ పురోగతిలో ఫారమ్ స్కోర్ 86% గా ఉంది. అద్భుతమైన శిక్షణ!';
      if (lang === 'kn') return 'ನಿಮ್ಮ ಪ್ರಗತಿಯಲ್ಲಿ ಫಾರ್ಮ್ ಸ್ಕೋರ್ 86% ಮತ್ತು ತರಬೇತಿ ಹೊರೆ ಉತ್ತಮವಾಗಿದೆ. ಉತ್ತಮ ಸುಧಾರಣೆ!';
      if (lang === 'ml') return 'നിങ്ങളുടെ പുരോഗതിയിൽ ഫോം സ്കോർ 86% ആണ്. മികച്ച പ്രകടനം!';
      if (lang === 'bn') return 'আপনার অগ্রগতির ফর্ম স্কোর ৮৬% এবং প্রশিক্ষণের চাপ ভালো অবস্থায় আছে।';
      if (lang === 'or') return 'ଆପଣଙ୍କର ପ୍ରଗତିରେ ଫର୍ମ ସ୍କୋର 86% ଏବଂ ତାଲିମ ଭାର ଉତ୍ତମ ସ୍ଥିତିରେ ଅଛି।';
      if (lang === 'as') return 'আপোনাৰ অগ্ৰগতিত ফৰ্ম স্ক’ৰ ৮৬% আৰু প্ৰশিক্ষণৰ বোজা ভাল অৱস্থাত আছে।';
      if (lang === 'ur') return 'آپ کی پیش رفت میں فارم اسکور 86 فیصد ہے اور ٹریننگ لوڈ بہترین حد میں ہے۔';
      return 'In your progress overview, your average form score is 86% and training load is in an optimal zone. Great performance!';
    }
    if (pathname.includes('/cycle')) {
      if (lang === 'hi') return 'आज आपके मासिक चक्र का दिन 14 है। यह ओवुलेटरी चरण है, उच्च ऊर्जा का उपयोग करें और सही फॉर्म बनाए रखें।';
      if (lang === 'bho') return 'आजु माहवारी चक्र के 14वां दिन बा। ई ओवुलेटरी चरण ह, ऊर्जा ढेर बा पर फॉर्म सही रखीं।';
      if (lang === 'mr') return 'आज मासिक पाळीचा दिवस 14 आहे. ही ओवुलेटरी फेज आहे, ऊर्जा जास्त असेल, योग्य फॉर्म ठेवा.';
      if (lang === 'gu') return 'આજે માસિક ચક્રનો 14મો દિવસ છે. શક્તિ વધુ રહેશે, યોગ્ય ફોર્મ જાળવી રાખો.';
      if (lang === 'pa') return 'ਅੱਜ ਚੱਕਰ ਦਾ 14ਵਾਂ ਦਿਨ ਹੈ। ਊਰਜਾ ਜ਼ਿਆਦਾ ਰਹੇਗੀ, ਪਰ ਸਹੀ ਫਾਰਮ ਬਣਾਈ ਰੱਖੋ।';
      if (lang === 'ta') return 'இன்று சுழற்சி நாள் 14. அதிக ஆற்றல் கொண்ட நிலை, கவனமாக பயிற்சி செய்யுங்கள்.';
      if (lang === 'te') return 'ఈరోజు సైకిల్ 14వ రోజు. అధిక శక్తి ఉన్న సమయం, సరైన రూపంతో వ్యాయామం చేయండి.';
      if (lang === 'kn') return 'ಇಂದು ಚಕ್ರದ 14 ನೇ ದಿನ. ಶಕ್ತಿಯು ಹೆಚ್ಚಿರುತ್ತದೆ, ಸರಿಯಾದ ಫಾರ್ಮ್ ಕಾಪಾಡಿಕೊಳ್ಳಿ.';
      if (lang === 'bn') return 'আজ চক্রের ১৪তম দিন। উচ্চ শক্তির পর্যায়, সঠিক ফর্মের সাথে অনুশীলন করুন।';
      return 'Today is cycle day 14 (Ovulatory Phase). Take advantage of strong performance while maintaining safe form.';
    }
    if (pathname.includes('/analysis')) {
      if (lang === 'hi') return 'लाइव कैमरा विश्लेषण से अपने घुटने, कूल्हों और संतुलन की जांच करें ताकि खेल चोटों से बचा जा सके।';
      if (lang === 'bho') return 'लाइव कैमरा से आपन घुटना आ कमर के संतुलन देखीं ताकि कवनो चोट ना लागे।';
      if (lang === 'mr') return 'लाइव्ह कॅमेरा विश्लेषणाने गुडघे आणि पाठीचा समतोल तपासा जेणेकरून दुखापती टाळता येतील.';
      if (lang === 'gu') return 'લાઇવ કૅમેરાથી ઘૂંટણ અને શરીરના સંતુલનની ચકાસણી કરો જેથી ઈજાઓથી બચી શકાય.';
      if (lang === 'ta') return 'நேரடி கேமரா பகுப்பாய்வு மூலம் காயம் ஏற்படாமல் சரியான முறையில் பயிற்சி செய்யுங்கள்.';
      if (lang === 'te') return 'గాయాల బారిన పడకుండా సరైన భంగಿమలో వ్యాయామం చేయడానికి కెమెరా విశ్లేషణను ఉపయోగించండి.';
      if (lang === 'bn') return 'লাইভ ক্যামেরা বিশ্লেষণের মাধ্যমে সঠিক ভঙ্গিমায় ব্যায়াম করুন এবং আঘাত প্রতিরোধ করুন।';
      return 'Use live AI camera form analysis to detect joint alignments, reduce ACL injury risk, and refine technique.';
    }
    if (pathname.includes('/screening')) {
      if (lang === 'hi') return 'RED-S स्क्रीनिंग से ऊर्जा स्तर, थकान और पोषण की स्थिति का तुरंत आकलन करें।';
      if (lang === 'mr') return 'RED-S तपासणीने खेळाडूची ऊर्जा, थकवा आणि पोषणाची स्थिती सहज तपासा.';
      if (lang === 'ta') return 'RED-S பரிசோதனை மூலம் உங்கள் ஆற்றல் மற்றும் மீட்பு நிலையை மதிப்பிடுங்கள்.';
      if (lang === 'te') return 'RED-S స్క్రీనింగ్ ద్వారా మీ శక్తి మరియు అలసట స్థాయిలను తనిਖీ చేయండి.';
      if (lang === 'bn') return 'RED-S স্ক্রিনিংয়ের মাধ্যমে শক্তির ঘাটতি ও ক্লান্তি মূল্যায়ন করুন।';
      return 'Complete the quick RED-S screening to assess energy deficiency, fatigue, and recovery readiness.';
    }
    return currentLang.sampleGreeting;
  }, [currentLang]);

  useEffect(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
    }
  }, []);

  return (
    <BhashiniContext.Provider
      value={{
        currentLang,
        setLanguageByCode,
        languages: INDIAN_LANGUAGES,
        t,
        speak,
        stopSpeaking,
        isSpeaking,
        isModalOpen,
        openModal: () => setIsModalOpen(true),
        closeModal: () => setIsModalOpen(false),
        config,
        updateConfig,
        getAthleteAdviceForPage,
      }}
    >
      {children}
    </BhashiniContext.Provider>
  );
}

export function useBhashini() {
  const context = useContext(BhashiniContext);
  if (!context) {
    throw new Error('useBhashini must be used within a BhashiniProvider');
  }
  return context;
}
