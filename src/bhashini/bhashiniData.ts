export interface IndianLanguage {
  code: string;
  name: string;
  nativeName: string;
  state: string;
  region: string;
  speechCode: string;
  fallbackLang?: string;
  sampleGreeting: string;
}

export const INDIAN_LANGUAGES: IndianLanguage[] = [
  // National & Pan-India
  { code: 'en', name: 'English', nativeName: 'English', state: 'All India', region: 'National / Global', speechCode: 'en-IN', sampleGreeting: 'Welcome to Sanjivya! Train safely and protect yourself from sports injuries.' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', state: 'Uttar Pradesh, MP, Delhi, Bihar, Rajasthan, Haryana', region: 'North / Central India', speechCode: 'hi-IN', sampleGreeting: 'संजीव्या में आपका स्वागत है! सुरक्षित व्यायाम करें और खेल चोटों से बचें।' },
  { code: 'sa', name: 'Sanskrit', nativeName: 'संस्कृतम्', state: 'National / Classical', region: 'Pan-India', speechCode: 'hi-IN', fallbackLang: 'hi', sampleGreeting: 'संजीव्यायां भवतः स्वागतम्! कुशलतया अभ्यासं कुर्वन्तु, आघातेभ्यः सुरक्षिताः भवन्तु।' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو', state: 'Jammu & Kashmir, Telangana, UP, Bihar, Delhi', region: 'Pan-India', speechCode: 'ur-IN', sampleGreeting: 'سنجیویا میں خوش آمدید! محفوظ طریقے سے ورزش کریں اور چوٹوں سے بچیں۔' },

  // Western India
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', state: 'Maharashtra, Goa', region: 'Western India', speechCode: 'mr-IN', sampleGreeting: 'संजीव्यामध्ये आपले स्वागत आहे! सुरक्षित सराव करा आणि खेळातील दुखापती टाळा.' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', state: 'Gujarat, Daman & Diu, Dadra & Nagar Haveli', region: 'Western India', speechCode: 'gu-IN', sampleGreeting: 'સંજીવ્યામાં તમારું સ્વાગત છે! સુરક્ષિત કસરત કરો અને ઈજાઓથી બચો.' },
  { code: 'kok', name: 'Konkani', nativeName: 'कोंकणी', state: 'Goa, Maharashtra, Karnataka', region: 'Western India', speechCode: 'mr-IN', fallbackLang: 'mr', sampleGreeting: 'संजीव्यांत तुमकां येवकार! सुरक्षित व्यायाम करात आनी दुखापती पसून वांचात.' },
  { code: 'kac', name: 'Kutchi', nativeName: 'કચ્છી / ڪڇي', state: 'Gujarat (Kutch region)', region: 'Western India', speechCode: 'gu-IN', fallbackLang: 'gu', sampleGreeting: 'સંજીવ્યા મેં સ્વાગત આય! સહી કસરત કરો ને ઈજાઓ કાં બચો.' },
  { code: 'sd', name: 'Sindhi', nativeName: 'सिन्धी / سنڌي', state: 'Gujarat, Rajasthan, Maharashtra', region: 'Western India', speechCode: 'hi-IN', sampleGreeting: 'سنجيويا ۾ ڀلي ڪري آيا! محفوظ طريقي سان ورزش ڪريو.' },

  // Northern & Himalayan India
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', state: 'Punjab, Chandigarh, Delhi, Haryana', region: 'Northern India', speechCode: 'pa-IN', sampleGreeting: 'ਸੰਜੀਵਿਆ ਵਿੱਚ ਤੁਹਾਡਾ ਸੁਆਗਤ ਹੈ! ਸੁਰੱਖਿਅਤ ਅਭਿਆਸ ਕਰੋ ਅਤੇ ਸੱਟਾਂ ਤੋਂ ਬਚੋ।' },
  { code: 'bgc', name: 'Haryanvi', nativeName: 'हरियाणवी', state: 'Haryana, Delhi, Western UP', region: 'Northern India', speechCode: 'hi-IN', fallbackLang: 'hi', sampleGreeting: 'संजीव्या म्ह थारा स्वागत सै! सही ढाल कसरत करो अर चोट तैं बचो।' },
  { code: 'raj', name: 'Rajasthani / Marwari', nativeName: 'राजस्थानी / मारवाड़ी', state: 'Rajasthan, Haryana, Gujarat', region: 'Western / Northern India', speechCode: 'hi-IN', fallbackLang: 'hi', sampleGreeting: 'संजीव्या में आपरो घणो स्वागत है! सही कसरत करो और चोटां सूं बचो।' },
  { code: 'ks', name: 'Kashmiri', nativeName: 'کٲشُر', state: 'Jammu & Kashmir', region: 'Northern India', speechCode: 'ur-IN', sampleGreeting: 'سنجیویا منٛز خوش آمدید! جان کٕنیو ٹریننگ تہ بچیو زخم پؠٹھہٕ।' },
  { code: 'doi', name: 'Dogri', nativeName: 'डोगरी', state: 'Jammu & Kashmir, Himachal Pradesh', region: 'Northern India', speechCode: 'hi-IN', fallbackLang: 'hi', sampleGreeting: 'संजीव्या च थुआड़ा स्वागत ऐ! सुरक्षित अभ्यास करो ते चोटें थमां बचो।' },
  { code: 'lad', name: 'Ladakhi', nativeName: 'ལ་དྭགས་སྐད་ / लद्दाखी', state: 'Ladakh', region: 'Northern India', speechCode: 'hi-IN', fallbackLang: 'hi', sampleGreeting: 'संजीव्या लद्दाख़ में आपका स्वागत है! सुरक्षित खेल अभ्यास करें।' },
  { code: 'gbm', name: 'Garhwali', nativeName: 'गढ़वाली', state: 'Uttarakhand (Garhwal)', region: 'Northern India', speechCode: 'hi-IN', fallbackLang: 'hi', sampleGreeting: 'संजीव्या मा तुमरो स्वागत च! सही तरीकन अभ्यास करा अर चोट बिटि बचा।' },
  { code: 'kfy', name: 'Kumaoni', nativeName: 'कुमाऊँनी', state: 'Uttarakhand (Kumaon)', region: 'Northern India', speechCode: 'hi-IN', fallbackLang: 'hi', sampleGreeting: 'संजीव्या मा तुमरो भौत स्वागत छू! सुरक्षित कसरत करो।' },
  { code: 'him', name: 'Himachali / Pahari', nativeName: 'पहाड़ी', state: 'Himachal Pradesh', region: 'Northern India', speechCode: 'hi-IN', fallbackLang: 'hi', sampleGreeting: 'संजीव्या च तुहाड़ा स्वागत ऐ! सही कसरत करा ते फिट रओ।' },

  // Central India & Hindi Belt
  { code: 'bho', name: 'Bhojpuri', nativeName: 'भोजपुरी', state: 'Bihar, Eastern UP, Jharkhand', region: 'North / Eastern India', speechCode: 'hi-IN', fallbackLang: 'hi', sampleGreeting: 'संजीव्या में रउआ सब के बहुत-बहुत स्वागत बा! सही से कसरत करीं आ चोट से बचीं।' },
  { code: 'awa', name: 'Awadhi', nativeName: 'अवधी', state: 'Uttar Pradesh (Central)', region: 'Northern India', speechCode: 'hi-IN', fallbackLang: 'hi', sampleGreeting: 'संजीव्या मा आपन स्वागत अहइ! सही से अभ्यास करौ औ चोटन से बचौ।' },
  { code: 'hne', name: 'Chhattisgarhi', nativeName: 'छत्तीसगढ़ी', state: 'Chhattisgarh', region: 'Central India', speechCode: 'hi-IN', fallbackLang: 'hi', sampleGreeting: 'संजीव्या म जम्मो झन के स्वागत हे! बढ़िया ले कसरत करव अउ चोट-मोच ले बचव।' },
  { code: 'bnd', name: 'Bundeli', nativeName: 'बुन्देली', state: 'Madhya Pradesh, Uttar Pradesh (Bundelkhand)', region: 'Central India', speechCode: 'hi-IN', fallbackLang: 'hi', sampleGreeting: 'संजीव्या में तुमाओ स्वागत हे! सही कसरत करो औरी चोट से बचो।' },
  { code: 'mvy', name: 'Malvi', nativeName: 'मालवी', state: 'Madhya Pradesh (Malwa), Rajasthan', region: 'Central India', speechCode: 'hi-IN', fallbackLang: 'hi', sampleGreeting: 'संजीव्या में आपरो स्वागत छे! ठीक तरह कसरत करो।' },
  { code: 'mag', name: 'Magahi', nativeName: 'मगही', state: 'Bihar, Jharkhand', region: 'Eastern India', speechCode: 'hi-IN', fallbackLang: 'hi', sampleGreeting: 'संजीव्या में अपने के स्वागत हे! बढ़िया से कसरत करा अउर चोट से बचा।' },
  { code: 'mai', name: 'Maithili', nativeName: 'मैथिली', state: 'Bihar, Jharkhand', region: 'Eastern India', speechCode: 'hi-IN', fallbackLang: 'hi', sampleGreeting: 'संजीव्या मे अहाँक स्वागत अछि! सुरक्षित अभ्यास करू आ चोट सं बचू।' },

  // Eastern & Tribal India
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', state: 'West Bengal, Tripura, Assam', region: 'Eastern India', speechCode: 'bn-IN', sampleGreeting: 'সঞ্জীব্যায় আপনাকে স্বাগতম! নিরাপদে প্রশিক্ষণ নিন এবং আঘাত থেকে রক্ষা পান।' },
  { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ', state: 'Odisha', region: 'Eastern India', speechCode: 'or-IN', sampleGreeting: 'ସଞ୍ଜୀବ୍ୟାକୁ ଆପଣଙ୍କୁ ସ୍ୱାଗତ! ସୁରକ୍ଷିତ ତାଲିମ ନିଅନ୍ତୁ ଏବଂ ଆଘାତରୁ ରକ୍ଷା ପାଆନ୍ତୁ।' },
  { code: 'sat', name: 'Santali', nativeName: 'ᱥᱟᱱᱛᱟᱲᱤ', state: 'Jharkhand, Odisha, West Bengal', region: 'Eastern India', speechCode: 'hi-IN', fallbackLang: 'hi', sampleGreeting: 'ᱥᱟᱱᱡᱤᱵᱷᱭᱟ ᱨᱮ ᱟᱯᱮᱭᱟᱜ ᱥᱟᱜᱩᱱ ᱫᱟᱨᱟᱢ! ᱵᱮᱥ ᱛᱮ ᱴᱨᱮᱱᱤᱝ ᱦᱟᱛᱟᱣ ᱢᱮ.' },
  { code: 'gon', name: 'Gondi', nativeName: 'गोंडी', state: 'Madhya Pradesh, Maharashtra, Chhattisgarh, Telangana', region: 'Central / Tribal India', speechCode: 'hi-IN', fallbackLang: 'hi', sampleGreeting: 'संजीव्या ते मीकु स्वागत! सही कसरत कीम अउर चोट नंग बचोम।' },
  { code: 'kru', name: 'Kurukh / Oraon', nativeName: 'कुड़ुख़', state: 'Jharkhand, Chhattisgarh, Odisha', region: 'Eastern India', speechCode: 'hi-IN', fallbackLang: 'hi', sampleGreeting: 'संजीव्या नू निमहाय स्वागत राई! बेस से कसरत नना।' },
  { code: 'hoc', name: 'Ho', nativeName: 'हो (Warang Chiti)', state: 'Jharkhand, Odisha', region: 'Eastern India', speechCode: 'hi-IN', fallbackLang: 'hi', sampleGreeting: 'संजीव्या रे पेया स्वागत मेना! बेस लेका कसरत एपे।' },

  // Southern India
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', state: 'Andhra Pradesh, Telangana', region: 'Southern India', speechCode: 'te-IN', sampleGreeting: 'సంజీవ్యకు స్వాగతం! సురక్షితంగా వ్యాయామం చేయండి మరియు క్రీడా గాయాల నుండి రక్షించుకోండి.' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', state: 'Tamil Nadu, Puducherry', region: 'Southern India', speechCode: 'ta-IN', sampleGreeting: 'சஞ்சீவ்யாவிற்கு நல்வரவு! பாதுகாப்பாக பயிற்சி செய்து விளையாட்டு காயங்களைத் தவிர்க்கவும்.' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', state: 'Karnataka', region: 'Southern India', speechCode: 'kn-IN', sampleGreeting: 'ಸಂಜೀವ್ಯಾಗೆ ಸುಸ್ವಾಗತ! ಸುರಕ್ಷಿತವಾಗಿ ತರಬೇತಿ ಪಡೆಯಿರಿ ಮತ್ತು ಗಾಯಗಳಿಂದ ಪಾರಾಗಿರಿ.' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', state: 'Kerala, Lakshadweep', region: 'Southern India', speechCode: 'ml-IN', sampleGreeting: 'സഞ്ജീവ്യയിലേക്ക് സ്വാഗതം! സുരക്ഷിതമായി വ്യായാമം ചെയ്യുക, പരിക്കുകൾ ഒഴിവാക്കുക.' },
  { code: 'tcy', name: 'Tulu', nativeName: 'ತುಳು', state: 'Karnataka (Dakshina Kannada, Udupi), Kerala', region: 'Southern India', speechCode: 'kn-IN', fallbackLang: 'kn', sampleGreeting: 'ಸಂಜೀವ್ಯಗ್ ಈರೆಗ್ ಎದ್ಕೊಂಡು! ಎಡ್ಡೆ ತರಬೇತಿ ದೆತೊನ್ಲೆ ಬೊಕ್ಕ ಗಾಯೊಡ್ದು ಪಾರಾವಲೆ.' },

  // Northeastern India
  { code: 'as', name: 'Assamese', nativeName: 'অসমীয়া', state: 'Assam', region: 'Northeastern India', speechCode: 'as-IN', sampleGreeting: 'সঞ্জীৱ্যালৈ আপোনাক স্বাগতম! সুৰক্ষিতভাৱে প্ৰশিক্ষণ লওক আৰু আঘাতৰ পৰা ৰক্ষা পৰক।' },
  { code: 'brx', name: 'Bodo', nativeName: 'बड़ो', state: 'Assam', region: 'Northeastern India', speechCode: 'as-IN', fallbackLang: 'as', sampleGreeting: 'संजीव्यायाव नोंथांखौ बरायबाय! मोजाङै ट्रेनिं ला आरो जोखोम जानायनिफ्राय रैखा मोन्नानै था।' },
  { code: 'mni', name: 'Manipuri (Meitei)', nativeName: 'মৈতৈলোন্', state: 'Manipur', region: 'Northeastern India', speechCode: 'bn-IN', fallbackLang: 'bn', sampleGreeting: 'সঞ্জীব্যাদা তরাম্না ওকচরি! অশোক অপন থোক্তনবা চপ চানা ত্রেনিং তৌবীয়ু।' },
  { code: 'ne', name: 'Nepali', nativeName: 'नेपाली', state: 'Sikkim, West Bengal, Assam', region: 'Northeastern India', speechCode: 'ne-NP', sampleGreeting: 'संजीव्यामा तपाईंलाई स्वागत छ! सुरक्षित अभ्यास गर्नुहोस् र चोटपटकबाट बच्नुहोस्।' },
  { code: 'lus', name: 'Mizo', nativeName: 'Mizo ṭawng', state: 'Mizoram', region: 'Northeastern India', speechCode: 'en-IN', fallbackLang: 'en', sampleGreeting: 'Sanjivya-ah kan lo lawm a che! Him takin insawizawi la, inhliam lakah inveng rawh.' },
  { code: 'kha', name: 'Khasi', nativeName: 'Ka Ktien Khasi', state: 'Meghalaya', region: 'Northeastern India', speechCode: 'en-IN', fallbackLang: 'en', sampleGreeting: 'Khublei bad sngewbha sha ka Sanjivya! Hikai bha bad iada ialade na ka jingmynsaw.' },
  { code: 'grt', name: 'Garo', nativeName: 'A·chik', state: 'Meghalaya, Assam', region: 'Northeastern India', speechCode: 'en-IN', fallbackLang: 'en', sampleGreeting: 'Sanjivya-ona rimchaksoa! Kakket kene kaminge gimin an·tangko chel·chakbo.' },
  { code: 'trp', name: 'Kokborok', nativeName: 'ককবরক (Kokborok)', state: 'Tripura', region: 'Northeastern India', speechCode: 'bn-IN', fallbackLang: 'bn', sampleGreeting: 'Sanjivya-o nangkhe khulumkha! Kahamkhe train khlaidi tei injury ni bachaidi.' },
  { code: 'nag', name: 'Nagamese / Naga', nativeName: 'Nagamese', state: 'Nagaland', region: 'Northeastern India', speechCode: 'en-IN', fallbackLang: 'en', sampleGreeting: 'Sanjivya te apuni ke bhal pawa janai ase! Bhal pora exercise koribi aru dukhi napabo.' }
];

export const UI_TRANSLATIONS: Record<string, Record<string, string>> = {
  // Navigation
  'nav.dashboard': {
    en: 'Dashboard', hi: 'डैशबोर्ड', mr: 'डॅशबोर्ड', bn: 'ড্যাশবোর্ড', te: 'డ్యాష్‌బోర్డ్', ta: 'டாஷ்போர்டு', gu: 'ડેશબોર્ડ', kn: 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್', ml: 'ഡാഷ്‌ബോർഡ്', pa: 'ਡੈਸ਼ਬੋਰਡ', or: 'ଡ୍ୟାସବୋର୍ଡ', as: 'ডেচবৰ্ড', ur: 'ڈیش بورڈ', bho: 'डैशबोर्ड', raj: 'डैशबोर्ड', hne: 'डैशबोर्ड', tcy: 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್'
  },
  'nav.cycle': {
    en: 'Cycle & Risk', hi: 'मासिक चक्र और जोखिम', mr: 'मासिक पाळी आणि जोखीम', bn: 'চক্র এবং ঝুঁকি', te: 'చక్రం మరియు ప్రమాదం', ta: 'மாதவிடாய் சுழற்சி & ஆபத்து', gu: 'ચક્ર અને જોખમ', kn: 'ಚಕ್ರ ಮತ್ತು ಅಪಾಯ', ml: 'ചക്രവും അപകടസാധ്യതയും', pa: 'ਚੱਕਰ ਅਤੇ ਜੋਖਮ', or: 'ଋତୁଚକ୍ର ଏବଂ ବିପଦ', as: 'ঋতুচক্ৰ আৰু বিপদ', ur: 'حیض سائیکل اور خطرہ', bho: 'माहवारी चक्र आ जोखिम', raj: 'मासिक चक्र अर जोखीम', hne: 'मासिक चक्र अउ जोखिम', tcy: 'ತಿಂಗೊಲ್ದ ಚಕ್ರ ಬೊಕ್ಕ ಅಪಾಯ'
  },
  'nav.sports': {
    en: 'Sports', hi: 'खेल', mr: 'खेळ', bn: 'খেলাধুলা', te: 'క్రీడలు', ta: 'விளையாட்டுகள்', gu: 'રમતો', kn: 'ಕ್ರೀಡೆಗಳು', ml: 'കായികങ്ങൾ', pa: 'ਖੇਡਾਂ', or: 'ଖେଳ', as: 'খেল-ধেমালি', ur: 'کھیل', bho: 'खेल-कूद', raj: 'खेळ', hne: 'खेल-कूद', tcy: 'ಗೇಮ್ಲು'
  },
  'nav.exercises': {
    en: 'Exercises', hi: 'व्यायाम', mr: 'व्यायाम', bn: 'ব্যায়াম', te: 'వ్యాయామాలు', ta: 'உடற்பயிற்சிகள்', gu: 'કસરતો', kn: 'ವ್ಯಾಯಾಮಗಳು', ml: 'വ്യായാമങ്ങൾ', pa: 'ਕਸਰਤਾਂ', or: 'ବ୍ୟାୟାମ', as: 'ব্যায়াম', ur: 'ورزشیں', bho: 'कसरत', raj: 'कसरत', hne: 'कसरत', tcy: 'ವ್ಯಾಯಾಮ'
  },
  'nav.analysis': {
    en: 'Form Analysis', hi: 'फॉर्म विश्लेषण', mr: 'फॉर्म विश्लेषण', bn: 'ফর্ম বিশ্লেষণ', te: 'ఫారమ్ విశ్లేషణ', ta: 'படிவ பகுப்பாய்வு', gu: 'ફોર્મ વિશ્લેષણ', kn: 'ಫಾರ್ಮ್ ವಿಶ್ಲೇಷಣೆ', ml: 'ഫോം വിശകലനം', pa: 'ਫਾਰਮ ਵਿਸ਼ਲੇਸ਼ਣ', or: 'ଫର୍ମ ବିଶ୍ଳେଷଣ', as: 'ফৰ্ম বিশ্লেষণ', ur: 'فارم تجزیہ', bho: 'फॉर्म जाँच', raj: 'फॉर्म विश्लेषण', hne: 'फॉर्म जांच', tcy: 'ಫಾರ್ಮ್ ಪರೀಕ್ಷೆ'
  },
  'nav.screening': {
    en: 'RED-S Screening', hi: 'RED-S स्क्रीनिंग', mr: 'RED-S तपासणी', bn: 'RED-S স্ক্রীনিং', te: 'RED-S స్క్రీనింగ్', ta: 'RED-S பரிசோதனை', gu: 'RED-S સ્ક્રિનિંગ', kn: 'RED-S ತಪಾಸಣೆ', ml: 'RED-S സ്ക്രീനിംഗ്', pa: 'RED-S ਸਕ੍ਰੀਨਿੰਗ', or: 'RED-S ସ୍କ୍ରିନିଂ', as: 'RED-S পৰীক্ষণ', ur: 'ریڈ ایس اسکریننگ', bho: 'RED-S जांच', raj: 'RED-S जांच', hne: 'RED-S जांच', tcy: 'RED-S ಪರೀಕ್ಷೆ'
  },
  'nav.progress': {
    en: 'Progress', hi: 'प्रगति व सुधार', mr: 'प्रगती आणि सुधारणा', bn: 'অগ্রগতি', te: 'పురోగతి', ta: 'முன்னேற்றம்', gu: 'પ્રગતિ', kn: 'ಪ್ರಗತಿ', ml: 'പുരോഗതി', pa: 'ਤਰੱਕੀ', or: 'ପ୍ରଗତି', as: 'অগ্ৰগতি', ur: 'پیش رفت', bho: 'सुधार आ प्रगति', raj: 'प्रगती', hne: 'प्रगति', tcy: 'ಮುನ್ನಡೆ'
  },

  // Dashboard & Common
  'dash.welcome': {
    en: 'Welcome back', hi: 'वापसी पर स्वागत है', mr: 'पुन्हा स्वागत आहे', bn: 'আবার স্বাগতম', te: 'తిరిగి స్వాగతం', ta: 'மீண்டும் வருக', gu: 'પાછા સ્વાગત છે', kn: 'ಮತ್ತೆ ಸ್ವಾಗತ', ml: 'സ്വാഗതം', pa: 'ਜੀ ਆਇਆਂ ਨੂੰ', or: 'ସ୍ୱାଗତ', as: 'পুনৰ স্বাগতম', ur: 'خوش آمدید', bho: 'रउआ सब के फेर से स्वागत बा', raj: 'पाछो स्वागत है', hne: 'फेरु ले स्वागत हे', tcy: 'ಕುಡೊರ ಸ್ವಾಗತ'
  },
  'dash.subtitle': {
    en: "Here's your training snapshot for today.",
    hi: 'यहाँ आज के लिए आपका प्रशिक्षण स्नैपशॉट है।',
    mr: 'येथे तुमच्या आजच्या सरावाचा आढावा आहे.',
    bn: 'এখানে আজকের জন্য আপনার প্রশিক্ষণের বিবরণ রয়েছে।',
    te: 'ఈరోజు కోసం మీ శిక్షణ సమాచారం ఇక్కడ ఉంది.',
    ta: 'இன்றைய உங்கள் பயிற்சி கண்ணோட்டம் இங்கே.',
    gu: 'અહીં તમારા આજના તાલીમનો સંક્ષિપ્ત સાર છે.',
    kn: 'ಇಂದಿನ ತರಬೇತಿಯ ವಿವರಣೆ ಇಲ್ಲಿದೆ.',
    ml: 'ഇന്നത്തെ നിങ്ങളുടെ പരിശീലന വിവരങ്ങൾ ഇതാ.',
    pa: 'ਇੱਥੇ ਅੱਜ ਲਈ ਤੁਹਾਡੀ ਸਿਖਲਾਈ ਦਾ ਸਾਰ ਹੈ।',
    or: 'ଆଜିର ତାଲିମ ସାରାଂଶ ଏଠାରେ ଅଛି।',
    as: 'আজিৰ প্ৰশিক্ষণৰ সাৰাংশ ইয়াত আছে।',
    ur: 'آج کی آپ کی تربیت کی تفصیلات یہاں ہیں۔',
    bho: 'ई आजु खातिर रउआ ट्रेनिंग के स्नैपशॉट ह।',
    raj: 'अठे आज रै तालीम रो ब्यौरो है।',
    hne: 'इहां आज बर आप मन के ट्रेनिंग के हाल हे।'
  },
  'btn.startAnalysis': {
    en: 'Start Form Analysis', hi: 'फॉर्म विश्लेषण शुरू करें', mr: 'फॉर्म विश्लेषण सुरू करा', bn: 'ফর্ম বিশ্লেষণ শুরু করুন', te: 'ఫారమ్ విశ్లేషణ ప్రారంభించండి', ta: 'படிவ பகுப்பாய்வை தொடங்குங்கள்', gu: 'ફોર્મ વિશ્લેષણ શરૂ કરો', kn: 'ಫಾರ್ಮ್ ವಿಶ್ಲೇಷಣೆ ಪ್ರಾರಂಭಿಸಿ', ml: 'ഫോം വിശകലനം ആരംഭിക്കുക', pa: 'ਫਾਰਮ ਵਿਸ਼ਲੇਸ਼ਣ ਸ਼ੁਰੂ ਕਰੋ', or: 'ଫର୍ମ ବିଶ୍ଳେଷଣ ଆରମ୍ଭ କରନ୍ତୁ', as: 'ফৰ্ম বিশ্লেষণ আৰম্ভ কৰক', ur: 'فارم تجزیہ شروع کریں', bho: 'फॉर्म जाँच शुरू करीं', raj: 'फॉर्म विश्लेषण सरू करो', hne: 'फॉर्म जांच सुरु करव'
  },
  'dash.injuryRiskProfile': {
    en: 'Injury Risk Profile', hi: 'चोट जोखिम प्रोफाइल', mr: 'इजा जोखीम प्रोफाइल', bn: 'আঘাতের ঝুঁকি প্রোফাইল', te: 'గాయం ప్రమాద ప్రొఫైల్', ta: 'காயம் ஆபத்து விவரம்', gu: 'ઈજા જોખમ પ્રોફાઇલ', kn: 'ಗಾಯದ ಅಪಾಯ ಪ್ರೊಫೈಲ್', ml: 'പരിക്കിന്റെ സാധ്യത പ്രൊഫൈൽ', pa: 'ਸੱਟ ਦਾ ਖਤਰਾ ਪ੍ਰੋਫਾਈਲ', or: 'ଆଘାତ ବିପଦ ପ୍ରୋଫାଇଲ୍', as: 'আঘাতৰ বিপদ প্ৰফাইল', ur: 'چوٹ کا خطرہ پروفائل', bho: 'चोट के खतरा प्रोफाइल', raj: 'चोट जोखीम प्रोफाइल', hne: 'चोट के खतरा'
  },
  'dash.cyclePhaseTraining': {
    en: 'Cycle Phase & Training', hi: 'मासिक चरण और प्रशिक्षण', mr: 'मासिक टप्पा आणि सराव', bn: 'চক্রের পর্যায় ও প্রশিক্ষণ', te: 'చక్ర దశ మరియు శిక్షణ', ta: 'சுழற்சி நிலை & பயிற்சி', gu: 'ચક્ર તબક્કો અને તાલીમ', kn: 'ಚಕ್ರದ ಹಂತ ಮತ್ತು ತರಬೇತಿ', ml: 'ചക്ര ഘട്ടവും പരിശീലനവും', pa: 'ਚੱਕਰ ਪੜਾਅ ਅਤੇ ਸਿਖਲਾਈ', or: 'ଋତୁ ପର୍ଯ୍ୟାୟ ଏବଂ ତାଲିମ', as: 'চক্ৰৰ স্তৰ আৰু প্ৰশিক্ষণ', ur: 'سائیکل کا مرحلہ اور تربیت'
  },
  'dash.todaysFocus': {
    en: "Today's Focus", hi: 'आज का मुख्य फोकस', mr: 'आजचे मुख्य लक्ष', bn: 'আজকের মূল লক্ষ্য', te: 'నేటి దృష్టి', ta: 'இன்றைய கவனம்', gu: 'આજનું ફોકસ', kn: 'ಇಂದಿನ ಗಮನ', ml: 'ഇന്നത്തെ ശ്രദ്ധ', pa: 'ਅੱਜ ਦਾ ਫੋਕਸ', or: 'ଆଜିର ଲକ୍ଷ୍ୟ', as: 'আজিৰ লক্ষ্য', ur: 'آج کی توجہ', bho: 'आजु के मुख्य ध्यान', raj: 'आज रो खास ध्यान', hne: 'आज के मुख ध्यान'
  },
  'dash.readiness': {
    en: 'Readiness', hi: 'तैयारी स्तर', mr: 'सराव तयारी', bn: 'প্রস্তুতি', te: 'సిద్ధత', ta: 'தயார்நிலை', gu: 'તૈયારી સ્થિતિ', kn: 'ಸಿದ್ಧತೆ', ml: 'തയ്യാറെടുപ്പ്', pa: 'ਤਿਆਰੀ', or: 'ପ୍ରସ୍ତୁତି', as: 'প্ৰস্তুতি', ur: 'آمادگی', bho: 'तैयारी', raj: 'तयारी', hne: 'तैयारी'
  },
  'dash.currentPhase': {
    en: 'Current Phase', hi: 'वर्तमान चरण', mr: 'सध्याचा टप्पा', bn: 'বর্তমান পর্যায়', te: 'ప్రస్తుత దశ', ta: 'தற்போதைய நிலை', gu: 'વર્તમાન તબક્કો', kn: 'ಪ್ರಸ್ತುತ ಹಂತ', ml: 'നിലവിലെ ഘട്ടം', pa: 'ਮੌਜੂਦਾ ਪੜਾਅ', or: 'ବର୍ତ୍ତମାନ ପର୍ଯ୍ୟାୟ', as: 'বৰ্তমান স্তৰ', ur: 'موجودہ مرحلہ'
  },

  // Progress Page
  'progress.title': {
    en: 'Progress', hi: 'प्रगति व सुधार', mr: 'प्रगती आणि सुधारणा', bn: 'অগ্রগতি', te: 'పురోగతి', ta: 'முன்னேற்றம்', gu: 'પ્રગતિ', kn: 'ಪ್ರಗತಿ', ml: 'പുരോഗതി', pa: 'ਤਰੱਕੀ', or: 'ପ୍ରଗତି', as: 'অগ্ৰগতি', ur: 'پیش رفت', bho: 'प्रगति', raj: 'प्रगती', hne: 'सुधार अउ प्रगति', tcy: 'ಮುನ್ನಡೆ'
  },
  'progress.subtitle': {
    en: 'Track your form scores, training load, risk trends, and workout completion.',
    hi: 'अपने फॉर्म स्कोर, ट्रेनिंग लोड, जोखिम रुझान और वर्कआउट पूर्णता को ट्रैक करें।',
    mr: 'तुमचा फॉर्म स्कोअर, ट्रेनिंग लोड, जोखीम कल आणि व्यायाम पूर्णता ट्रॅक करा.',
    bn: 'আপনার ফর্ম স্কোর, প্রশিক্ষণের চাপ, ঝুঁকির ধারা এবং ওয়ার্কআউট সমাপ্তি ট্র্যাক করুন।',
    te: 'మీ ఫారమ్ స్కోర్లు, శిక్షణ లోడ్, ప్రమాద పోకడలు మరియు వర్కౌట్ పూర్తిని ట్రాక్ చేయండి.',
    ta: 'உங்கள் படிவ மதிப்பெண்கள், பயிற்சி சுமை, ஆபத்து போக்குகள் மற்றும் உடற்பயிற்சி நிறைவைக் கண்காணிக்கவும்.',
    gu: 'તમારા ફોર્મ સ્કોર, તાલીમ લોડ, જોખમ ટ્રેન્ડ અને વર્કઆઉટ પરિપૂર્ણતાને ટ્રૅક કરો.',
    kn: 'ನಿಮ್ಮ ಫಾರ್ಮ್ ಸ್ಕೋರ್‌ಗಳು, ತರಬೇತಿ ಲೋಡ್, ಅಪಾಯದ ಪ್ರವೃತ್ತಿಗಳು ಮತ್ತು ವರ್ಕೌಟ್ ಪೂರ್ಣಗೊಳಿಸುವಿಕೆಯನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ.',
    ml: 'നിങ്ങളുടെ ഫോം സ്കോറുകൾ, പരിശീലന ഭാരം, അപകടസാധ്യത പ്രവണതകൾ, വ്യായാമ പൂർത്തീകരണം എന്നിവ ട്രാക്ക് ചെയ്യുക.',
    pa: 'ਆਪਣੇ ਫਾਰਮ ਸਕੋਰ, ਸਿਖਲਾਈ ਲੋਡ, ਜੋਖਮ ਦੇ ਰੁਝਾਨ ਅਤੇ ਕਸਰਤ ਪੂਰੀ ਹੋਣ ਨੂੰ ਟਰੈਕ ਕਰੋ।',
    or: 'ଆପଣଙ୍କର ଫର୍ମ ସ୍କୋର, ତାଲିମ ଭାର, ବିପଦ ଧାରା ଏବଂ ବ୍ୟାୟାମ ସମାପ୍ତି ଟ୍ରାକ୍ କରନ୍ତୁ।',
    as: 'আপোনাৰ ফৰ্ম স্ক’ৰ, প্ৰশিক্ষণৰ বোজা, বিপদৰ ধাৰা আৰু ব্যায়াম সম্পূৰ্ণ হোৱাৰ তথ্য অনুসৰণ কৰক।',
    ur: 'اپنے فارم سکور، ٹریننگ لوڈ، خطرے کے رجحانات، اور ورزش کی تکمیل کو ٹریک کریں۔',
    bho: 'आपन फॉर्म स्कोर, ट्रेनिंग लोड आ वर्कआउट के पूरा होखे के ट्रैक करीं।',
    raj: 'आपरो फॉर्म स्कोर, तालीम लोड अर वर्कआउट ट्रॅक करो।',
    hne: 'अपन फॉर्म स्कोर, ट्रेनिंग लोड अउ कसरत के हाल देखव।'
  },
  'progress.avgFormScore': {
    en: 'Avg Form Score', hi: 'औसत फॉर्म स्कोर', mr: 'सरासरी फॉर्म स्कोअर', bn: 'গড় ফর্ম স্কোর', te: 'సగటు ఫారమ్ స్కోర్', ta: 'சராசரி படிவ மதிப்பெண்', gu: 'સરેરાશ ફોર્મ સ્કોર', kn: 'ಸರಾಸರಿ ಫಾರ್ಮ್ ಸ್ಕೋರ್', ml: 'ശരാശരി ഫോം സ്കോർ', pa: 'ਔਸਤ ਫਾਰਮ ਸਕੋਰ', or: 'ହାରାହାରି ଫର୍ମ ସ୍କୋର', as: 'গড় ফৰ্ম স্ক’ৰ', ur: 'اوسط فارم اسکور', bho: 'औसत फॉर्म स्कोर', raj: 'औसत फॉर्म स्कोर', hne: 'औसत फॉर्म स्कोर'
  },
  'progress.avgTrainingLoad': {
    en: 'Avg Training Load', hi: 'औसत ट्रेनिंग लोड', mr: 'सरासरी ट्रेनिंग लोड', bn: 'গড় প্রশিক্ষণ লোড', te: 'సగటు శిక్షణ లోడ్', ta: 'சராசரி பயிற்சி சுமை', gu: 'સરેરાશ તાલીમ લોડ', kn: 'ಸರಾಸರಿ ತರಬೇತಿ ಲೋಡ್', ml: 'ശരാശരി പരിശീലന ഭാരം', pa: 'ਔਸਤ ਸਿਖਲਾਈ ਲੋਡ', or: 'ହାରାହାରି ତାଲିମ ଭାର', as: 'গড় প্ৰশিক্ষণৰ বোজা', ur: 'اوسط ٹریننگ لوڈ', bho: 'औसत ट्रेनिंग लोड', raj: 'औसत तालीम लोड', hne: 'औसत ट्रेनिंग लोड'
  },
  'progress.currentRisk': {
    en: 'Current Risk', hi: 'वर्तमान जोखिम', mr: 'सध्याची जोखीम', bn: 'বর্তমান ঝুঁকি', te: 'ప్రస్తుత ప్రమాదం', ta: 'தற்போதைய ஆபத்து', gu: 'હાલનું જોખમ', kn: 'ಪ್ರಸ್ತುತ ಅಪಾಯ', ml: 'നിലവിലെ അപകടസാധ്യത', pa: 'ਮੌਜੂਦਾ ਖਤਰਾ', or: 'ବର୍ତ୍ତମାନ ବିପଦ', as: 'বৰ্তমান বিপদ', ur: 'موجودہ خطرہ', bho: 'हाल के खतरा', raj: 'हाल रो जोखीम', hne: 'अभी के खतरा'
  },
  'progress.avgCompletion': {
    en: 'Avg Completion', hi: 'औसत पूर्णता', mr: 'सरासरी पूर्णता', bn: 'গড় সমাপ্তি', te: 'సగటు పూర్తి', ta: 'சராசரி நிறைவு', gu: 'સરેરાશ પૂર્ણતા', kn: 'ಸರಾಸರಿ ಪೂರ್ಣಗೊಂಡಿದೆ', ml: 'ശരാശരി പൂർത്തീകരണം', pa: 'ਔਸਤ ਪੂਰਾ ਹੋਇਆ', or: 'ହାରାହାରି ସମାପ୍ତି', as: 'গড় সম্পূৰ্ণতা', ur: 'اوسط تکمیل', bho: 'औसत पूरा भईल', raj: 'औसत पूरो', hne: 'औसत पूरा'
  },
  'progress.formThisWeek': {
    en: 'Form Score (This Week)', hi: 'फॉर्म स्कोर (इस सप्ताह)', mr: 'फॉर्म स्कोअर (या आठवड्यात)', bn: 'ফর্ম স্কোর (এই সপ্তাহে)', te: 'ఫారమ్ స్కోర్ (ఈ వారం)', ta: 'படிவ மதிப்பெண் (இந்த வாரம்)', gu: 'ફોર્મ સ્કોર (આ સપ્તાહે)', kn: 'ಫಾರ್ಮ್ ಸ್ಕೋರ್ (ಈ ವಾರ)', ml: 'ഫോം സ്കോർ (ഈ ആഴ്ച)', pa: 'ਫਾਰਮ ਸਕੋਰ (ਇਸ ਹਫ਼ਤੇ)', or: 'ଫର୍ମ ସ୍କୋର (ଏହି ସପ୍ତାହ)', as: 'ফৰ্ম স্ক’ৰ (এই সপ্তাহত)', ur: 'فارم اسکور (اس ہفتے)', bho: 'फॉर्म स्कोर (एह हफ्ता)', raj: 'फॉर्म स्कोर (ईं हफ्ते)'
  },
  'progress.loadThisWeek': {
    en: 'Training Load (This Week)', hi: 'ट्रेनिंग लोड (इस सप्ताह)', mr: 'ट्रेनिंग लोड (या आठवड्यात)', bn: 'প্রশিক্ষণ লোড (এই সপ্তাহে)', te: 'శిక్షణ లోడ్ (ఈ వారం)', ta: 'பயிற்சி சுமை (இந்த வாரம்)', gu: 'તાલીમ લોડ (આ સપ્તાહે)', kn: 'ತರಬೇತಿ ಲೋಡ್ (ಈ ವಾರ)', ml: 'പരിശീലന ഭാരം (ഈ ആഴ്ച)', pa: 'ਸਿਖਲਾਈ ਲੋਡ (ਇਸ ਹਫ਼ਤੇ)', or: 'ତାଲିମ ଭାର (ଏହି ସପ୍ତାହ)', as: 'প্ৰশিক্ষণৰ বোজা (এই সপ্তাহত)', ur: 'ٹریننگ لوڈ (اس ہفتے)', bho: 'ट्रेनिंग लोड (एह हफ्ता)', raj: 'तालीम लोड (ईं हफ्ते)'
  },
  'progress.riskTrend': {
    en: 'Risk Trend (4 Weeks)', hi: 'जोखिम रुझान (4 सप्ताह)', mr: 'जोखीम कल (4 आठवडे)', bn: 'ঝুঁকির ধারা (৪ সপ্তাহ)', te: 'ప్రమాద ధోరణి (4 వారాలు)', ta: 'ஆபத்து போக்கு (4 வாரங்கள்)', gu: 'જોખમ વલણ (4 અઠવાડિયા)', kn: 'ಅಪಾಯದ ಪ್ರವೃತ್ತಿ (4 ವಾರಗಳು)', ml: 'അപകടസാധ്യത പ്രവണത (4 ആഴ്ചകൾ)', pa: 'ਜੋਖਮ ਦੇ ਰੁਝਾਨ (4 ਹਫ਼ਤੇ)', or: 'ବିପଦ ଧାରା (୪ ସପ୍ତାହ)', as: 'বিপদৰ ধাৰা (৪ সপ্তাহ)', ur: 'خطرے کا رجحان (4 ہفتے)', bho: 'खतरा के रुझान (4 हफ्ता)', raj: 'जोखीम चाल (4 हफ्ता)'
  },
  'progress.completionThisWeek': {
    en: 'Workout Completion (This Week)', hi: 'वर्कआउट पूर्णता (इस सप्ताह)', mr: 'वर्कआउट पूर्णता (या आठवड्यात)', bn: 'ওয়ার্কআউট সমাপ্তি (এই সপ্তাহে)', te: 'వర్కౌట్ పూర్తి (ఈ వారం)', ta: 'உடற்பயிற்சி நிறைவு (இந்த வாரம்)', gu: 'વર્કઆઉટ પૂર્ણતા (આ સપ્તાહે)', kn: 'ವರ್ಕೌಟ್ ಪೂರ್ಣಗೊಂಡಿದೆ (ಈ ವಾರ)', ml: 'വ്യായാമ പൂർത്തീകരണം (ഈ ആഴ്ച)', pa: 'ਕਸਰਤ ਪੂਰੀ (ਇਸ ਹਫ਼ਤੇ)', or: 'ବ୍ୟାୟାମ ସମାପ୍ତି (ଏହି ସପ୍ତାହ)', as: 'ব্যায়াম সম্পূৰ্ণ হোৱা (এই সপ্তাহত)', ur: 'ورزش کی تکمیل (اس ہفتے)', bho: 'कसरत पूरा भइल (एह हफ्ता)'
  },

  // Bhashini AI Header & Voice
  'bhashini.badge': {
    en: 'Bhishmini AI (Bhashini)', hi: 'भीष्मिनी एआई (भाषिणी)', mr: 'भीष्मिनी एआय (भाषिणी)', bn: 'ভীষ্মিণী এআই (ভাষিণী)', te: 'భీష్మిణి AI (భాషిణి)', ta: 'பீஷ்மினி AI (பாஷிணி)', gu: 'ભીષ્મિની AI (ભાષિણી)', kn: 'ಭೀಷ್ಮಿಣಿ AI (ಭಾಷಿಣಿ)', ml: 'ഭീഷ്മിണി AI (ഭാഷിണി)', pa: 'ਭੀਸ਼ਮਿਨੀ AI (ਭਾਸ਼ਿਣੀ)', or: 'ଭୀଷ୍ମିନୀ AI (ଭାଷିଣୀ)', as: 'ভীষ্মিনী AI (ভাষিণী)', ur: 'بھیشمنی اے آئی (بھاشنی)', bho: 'भीष्मिनी एआई (भाषिणी)', raj: 'भीष्मिनी एआई'
  },
  'bhashini.assistant': {
    en: 'Bhishmini Voice Guide', hi: 'भीष्मिनी वॉइस गाइड', mr: 'भीष्मिनी व्हॉईस गाईड', bn: 'ভীষ্মিণী ভয়েস গাইড', te: 'భీష్మిణి వాయిస్ గైడ్', ta: 'பீஷ்மினி குரல் வழிகாட்டி', gu: 'ભીષ્મિની વોઇસ ગાઇડ', kn: 'ಭೀಷ್ಮಿಣಿ ಧ್ವನಿ ಮಾರ್ಗದರ್ಶಿ', ml: 'ഭീഷ്മിണി വോയ്സ് ഗൈഡ്', pa: 'ਭੀਸ਼ਮਿਨੀ ਵੌਇਸ ਗਾਈਡ', or: 'ଭୀଷ୍ମିନୀ ଭଏସ୍ ଗାଇଡ୍', as: 'ভীষ্মিনী ভইচ গাইড', ur: 'بھیشمنی صوتی گائیڈ', bho: 'भीष्मिनी आवाज गाइड', raj: 'भीष्मिनी आवाज गाइड'
  },
  'bhashini.listen': {
    en: 'Listen to Advice', hi: 'सलाह सुनें', mr: 'सल्ला ऐका', bn: 'পরামর্শ শুনুন', te: 'సలహా వినండి', ta: 'ஆலோசனையைக் கேளுங்கள்', gu: 'સલાહ સાંભળો', kn: 'ಸಲಹೆ ಆಲಿಸಿ', ml: 'ഉപദേശം കേൾക്കുക', pa: 'ਸਲਾਹ ਸੁਣੋ', or: 'ପରାମର୍ଶ ଶୁଣନ୍ତୁ', as: 'পৰামৰ্শ শুনক', ur: 'مشورہ سنیں', bho: 'सलाह सुनीं', raj: 'सलाह सुणो', hne: 'सलाह सुनव'
  },
  'bhashini.speaking': {
    en: 'Speaking...', hi: 'बोल रहा है...', mr: 'आवाज सुरू आहे...', bn: 'বলছি...', te: 'మాట్లాడుతోంది...', ta: 'பேசுகிறது...', gu: 'બોલે છે...', kn: 'ಮಾತನಾಡುತ್ತಿದೆ...', ml: 'സംസാരിക്കുന്നു...', pa: 'ਬੋਲ ਰਿਹਾ ਹੈ...', or: 'କହୁଛି...', as: 'কৈ আছে...', ur: 'بول رہا ہے...', bho: 'बोलत बा...', raj: 'बोल रह्यो है...', hne: 'बोलत हे...'
  },
  'bhashini.changeLang': {
    en: 'Select State & Language', hi: 'राज्य और भाषा चुनें', mr: 'राज्य आणि भाषा निवडा', bn: 'রাজ্য ও ভাষা নির্বাচন করুন', te: 'రాష్ట్రం & భాషను ఎంచుకోండి', ta: 'மாநிலம் & மொழியைத் தேர்ந்தெடுக்கவும்', gu: 'રાજ્ય અને ભાષા પસંદ કરો', kn: 'ರಾಜ್ಯ ಮತ್ತು ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ', ml: 'സംസ്ഥാനവും ഭാഷയും തിരഞ്ഞെടുക്കുക', pa: 'ਰਾਜ ਅਤੇ ਭਾਸ਼ਾ ਚੁਣੋ', or: 'ରାଜ୍ୟ ଏବଂ ଭାଷା ବାଛନ୍ତୁ', as: 'ৰাজ্য আৰু ভাষা বাছক', ur: 'ریاست اور زبان منتخب کریں', bho: 'राज्य आ भाषा चुनीं', raj: 'राज्य अर भासा चुणो'
  }
};
