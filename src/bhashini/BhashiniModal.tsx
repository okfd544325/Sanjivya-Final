import { useState } from 'react';
import { X, Sparkles, Volume2, Key, CheckCircle2, ShieldAlert, Cpu, HelpCircle, BookOpen } from 'lucide-react';
import { useBhashini } from './BhashiniContext';

export function BhashiniModal() {
  const {
    isModalOpen,
    closeModal,
    currentLang,
    speak,
    stopSpeaking,
    isSpeaking,
    config,
    updateConfig
  } = useBhashini();

  const [activeTab, setActiveTab] = useState<'assistant' | 'setup' | 'config'>('assistant');
  const [apiKeyInput, setApiKeyInput] = useState(config.apiKey);
  const [userIdInput, setUserIdInput] = useState(config.userId);
  const [pipelineInput, setPipelineInput] = useState(config.pipelineId);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isModalOpen) return null;

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    updateConfig({
      apiKey: apiKeyInput,
      userId: userIdInput,
      pipelineId: pipelineInput,
      useOfficialApi: Boolean(apiKeyInput.trim()),
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const samplePrompts = [
    {
      title: 'Injury Prevention in ' + currentLang.name,
      query: `Explain how female athletes can avoid knee (ACL) and hamstring injuries during high-intensity training in ${currentLang.name}.`,
      response:
        currentLang.code === 'hi'
          ? 'घुटने (ACL) की चोटों से बचने के लिए वार्म-अप में सिंगल लेग स्क्वैट्स और जंप-लैंडिंग पर ध्यान दें। लैंडिंग के समय घुटने अंदर की तरफ न झुकने दें।'
          : currentLang.code === 'mr'
          ? 'गुडघ्याच्या (ACL) दुखापती टाळण्यासाठी सराव करताना जंप-लँडिंग आणि सिंगल-लेग स्क्वॅट्सवर भर द्या. पाय जमिनीवर टेकताना गुडघे आत झुकणार नाहीत याची काळजी घ्या.'
          : currentLang.code === 'ta'
          ? 'முழங்கால் (ACL) காயங்களைத் தவிர்க்க குதித்து தரையிறங்கும் போது முழங்கால்களை நேராக வைத்திருக்கவும்.'
          : currentLang.code === 'te'
          ? 'మోకాలి గాయాలను నివారించడానికి జంప్-ల్యాండింగ్ సమయంలో సరైన బ్యాలెన్స్ పాటించండి.'
          : 'To protect knees and hamstrings, emphasize soft landings with hips back and knees tracking directly over the toes.'
    },
    {
      title: 'Menstrual Cycle Training Advice',
      query: `What is the optimal training intensity for my current phase in ${currentLang.name}?`,
      response:
        currentLang.code === 'hi'
          ? 'मासिक चक्र के ओवुलेटरी चरण में ताकत और शक्ति प्रशिक्षण सबसे प्रभावी होता है, पर लिगामेंट ढीले होने के कारण फॉर्म का अतिरिक्त ध्यान रखें।'
          : currentLang.code === 'mr'
          ? 'ओवुलेटरी टप्प्यात ऊर्जा जास्त असते, स्ट्रेंथ ट्रेनिंगसाठी हा काळ उत्तम आहे. मात्र लिगामेंट्स शिथिल असल्याने फॉर्म अचूक ठेवावा.'
          : currentLang.code === 'ta'
          ? 'ஓவுலேட்டரி கட்டத்தில் ஆற்றல் அதிகம், வலிமை பயிற்சியில் சரியான படிவத்தைப் பராமரிக்கவும்.'
          : currentLang.code === 'te'
          ? 'ఈ దశలో శక్తి ఎక్కువగా ఉంటుంది, బలం పెంచే వ్యాయామాలకు ఇది మంచి సమయం.'
          : 'During high-energy cycle phases, maximize strength and power output while strictly following safe form.'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-2xl w-full overflow-hidden animate-float-up my-auto">
        {/* Modal Top Header */}
        <div className="p-6 bg-gradient-to-r from-primary-600 via-indigo-600 to-primary-700 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold">Bhishmini AI Assistant</h2>
                <span className="text-[10px] uppercase font-bold tracking-wider bg-white/20 px-2 py-0.5 rounded-full">
                  Bhashini Engine
                </span>
              </div>
              <p className="text-xs text-primary-100 mt-0.5">
                Multi-State National Language AI • Selected: <strong className="text-white">{currentLang.nativeName} ({currentLang.name})</strong>
              </p>
            </div>
          </div>
          <button
            onClick={closeModal}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50/80 px-6 pt-3 gap-2">
          <button
            onClick={() => setActiveTab('assistant')}
            className={`pb-3 px-3 text-xs font-semibold flex items-center gap-1.5 border-b-2 transition-colors ${
              activeTab === 'assistant'
                ? 'border-primary-600 text-primary-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Voice & AI Advice
          </button>
          <button
            onClick={() => setActiveTab('setup')}
            className={`pb-3 px-3 text-xs font-semibold flex items-center gap-1.5 border-b-2 transition-colors ${
              activeTab === 'setup'
                ? 'border-primary-600 text-primary-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            How to Use (Short Guide)
          </button>
          <button
            onClick={() => setActiveTab('config')}
            className={`pb-3 px-3 text-xs font-semibold flex items-center gap-1.5 border-b-2 transition-colors ${
              activeTab === 'config'
                ? 'border-primary-600 text-primary-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Key className="w-3.5 h-3.5" />
            Bhashini API Keys
          </button>
        </div>

        {/* Tab 1: Assistant & Quick Voice Guidance */}
        {activeTab === 'assistant' && (
          <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
            <div className="bg-primary-50/70 border border-primary-100 rounded-2xl p-4 flex items-start justify-between gap-4">
              <div>
                <span className="text-[11px] font-bold text-primary-700 uppercase tracking-wide">
                  Active State / Language
                </span>
                <p className="text-base font-bold text-slate-900 mt-0.5">
                  {currentLang.nativeName} ({currentLang.name})
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  Primary State: {currentLang.state} ({currentLang.region})
                </p>
              </div>

              <button
                onClick={() => (isSpeaking ? stopSpeaking() : speak(currentLang.sampleGreeting))}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                  isSpeaking
                    ? 'bg-red-500 text-white animate-pulse'
                    : 'bg-primary-600 hover:bg-primary-700 text-white shadow-xs'
                }`}
              >
                <Volume2 className="w-4 h-4" />
                {isSpeaking ? 'Stop Audio' : 'Hear Greeting'}
              </button>
            </div>

            <div>
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
                Quick Sports & Injury Advice in {currentLang.name}
              </h3>
              <div className="space-y-3">
                {samplePrompts.map((item, idx) => (
                  <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-4 hover:border-primary-200 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-slate-800">{item.title}</span>
                      <button
                        onClick={() => (isSpeaking ? stopSpeaking() : speak(item.response))}
                        className="text-xs text-primary-600 hover:text-primary-700 font-semibold flex items-center gap-1"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        Listen
                      </button>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed font-medium bg-slate-50 p-3 rounded-xl border border-slate-100">
                      "{item.response}"
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 flex items-start gap-2.5">
              <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-xs text-amber-800">
                Bhishmini AI uses India's National Language Translation specifications to empower athletes in their native tongue.
              </p>
            </div>
          </div>
        )}

        {/* Tab 2: How to Use (Short Guide for User) */}
        {activeTab === 'setup' && (
          <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
            <h3 className="text-sm font-bold text-slate-900">How to use Bhishmini AI in 3 simple steps:</h3>

            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80">
                <span className="w-6 h-6 rounded-full bg-primary-600 text-white text-xs font-bold flex items-center justify-center shrink-0">1</span>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Select Your State / Mother Tongue</h4>
                  <p className="text-xs text-slate-600 mt-1">
                    Click the <strong>Language Dropdown</strong> in the top header bar. You can choose from all 22 official Indian languages (Hindi, Marathi, Bengali, Tamil, Telugu, Gujarati, Punjabi, etc.) or search directly by your state name.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80">
                <span className="w-6 h-6 rounded-full bg-primary-600 text-white text-xs font-bold flex items-center justify-center shrink-0">2</span>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Instant UI Translation & Voice Guidance</h4>
                  <p className="text-xs text-slate-600 mt-1">
                    The entire website navigations, form analysis scores, and progress metrics adapt to your chosen language. Click the <strong>"Listen Advice"</strong> button at the top to have Bhishmini AI read the page insights aloud!
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80">
                <span className="w-6 h-6 rounded-full bg-primary-600 text-white text-xs font-bold flex items-center justify-center shrink-0">3</span>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Built-in AI Ready (No Setup Required)</h4>
                  <p className="text-xs text-slate-600 mt-1">
                    The built-in Bhishmini Smart Engine is pre-configured and works immediately without needing any external server. If your organization has an official Government Bhashini API key, you can optionally connect it in the <strong>Bhashini API Keys</strong> tab.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Official Bhashini API Configuration */}
        {activeTab === 'config' && (
          <form onSubmit={handleSaveConfig} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Official Bhashini API Integration (Optional)</h3>
              <p className="text-xs text-slate-500 mt-1">
                Obtain your API credentials from{' '}
                <a href="https://bhashini.gov.in" target="_blank" rel="noreferrer" className="text-primary-600 underline font-medium">
                  bhashini.gov.in (ULCA Platform)
                </a>. If left blank, Sanjivya automatically uses the high-speed Built-in Bhishmini Engine.
              </p>
            </div>

            {savedSuccess && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold rounded-xl flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                Settings saved successfully!
              </div>
            )}

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Bhashini API Key</label>
                <input
                  type="password"
                  placeholder="Enter your Bhashini API Key (optional)"
                  value={apiKeyInput}
                  onChange={(e) => setApiKeyInput(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:border-primary-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">User ID / Inference ID</label>
                <input
                  type="text"
                  placeholder="e.g. bhashini_user_123"
                  value={userIdInput}
                  onChange={(e) => setUserIdInput(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:border-primary-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Pipeline ID</label>
                <input
                  type="text"
                  placeholder="e.g. 64392f96daac500b55c543d0"
                  value={pipelineInput}
                  onChange={(e) => setPipelineInput(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:border-primary-500"
                />
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-primary-600" />
                <span className="text-xs font-semibold text-slate-800">
                  {apiKeyInput ? 'Official Bhashini API Mode' : 'Built-in Smart Engine (Active)'}
                </span>
              </div>
              <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-bold">
                Ready
              </span>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={closeModal}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
              >
                Close
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-primary-600 hover:bg-primary-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors"
              >
                Save Settings
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
