import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Volume2, VolumeX, Sparkles, Globe, ChevronDown, Search, Check, Info } from 'lucide-react';
import { useBhashini } from './BhashiniContext';

export function BhashiniHeader() {
  const {
    currentLang,
    setLanguageByCode,
    languages,
    speak,
    stopSpeaking,
    isSpeaking,
    openModal,
    getAthleteAdviceForPage,
    t
  } = useBhashini();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredLanguages = languages.filter((lang) => {
    const q = searchQuery.toLowerCase().trim();
    return (
      lang.name.toLowerCase().includes(q) ||
      lang.nativeName.toLowerCase().includes(q) ||
      lang.state.toLowerCase().includes(q) ||
      lang.region.toLowerCase().includes(q)
    );
  });

  const handleToggleVoice = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      const advice = getAthleteAdviceForPage(location.pathname);
      speak(advice);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 py-2.5 shadow-xs">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Left: Bhishmini AI Tag & State indicator */}
        <div className="flex items-center gap-2 min-w-0">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gradient-to-r from-orange-50 via-primary-50 to-green-50 border border-slate-200/80">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <Sparkles className="w-3.5 h-3.5 text-primary-600" />
            <span className="text-xs font-semibold text-slate-800 tracking-tight hidden sm:inline">
              {t('bhashini.badge', 'Bhishmini AI')}
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-1 text-xs text-slate-500 truncate max-w-xs">
            <span className="font-medium text-slate-700">{currentLang.nativeName}</span>
            <span className="text-slate-300">•</span>
            <span className="truncate">{currentLang.state}</span>
          </div>
        </div>

        {/* Right: Language Selector Option Menu & Audio/AI Buttons */}
        <div className="flex items-center gap-2">
          {/* Voice Guide Button */}
          <button
            onClick={handleToggleVoice}
            title={isSpeaking ? 'Stop voice' : 'Listen in your state language'}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              isSpeaking
                ? 'bg-red-50 text-red-700 border border-red-200 animate-pulse'
                : 'bg-primary-50 text-primary-700 hover:bg-primary-100 border border-primary-200/60'
            }`}
          >
            {isSpeaking ? (
              <>
                <VolumeX className="w-3.5 h-3.5 text-red-600" />
                <span className="hidden md:inline">{t('bhashini.speaking', 'Speaking...')}</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5 text-primary-600" />
                <span className="hidden md:inline">{t('bhashini.listen', 'Listen Advice')}</span>
              </>
            )}
          </button>

          {/* Option Menu Dropdown (Every Language of India) */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              aria-label="Choose Indian Language"
              className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200/80 text-slate-800 px-3 py-1.5 rounded-xl text-xs font-semibold border border-slate-200 transition-colors shadow-2xs"
            >
              <Globe className="w-3.5 h-3.5 text-primary-600 shrink-0" />
              <span className="text-primary-700 font-bold">{currentLang.nativeName}</span>
              <span className="text-slate-400 font-normal hidden sm:inline">({currentLang.name})</span>
              <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden z-50 animate-float-up">
                {/* Dropdown Header & Search */}
                <div className="p-3 bg-slate-50/80 border-b border-slate-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5 text-primary-500" />
                      Every Language of India (भाषिणी AI)
                    </span>
                    <span className="text-[10px] text-slate-500 bg-white px-1.5 py-0.5 rounded border border-slate-200">
                      {languages.length} Languages
                    </span>
                  </div>

                  <div className="relative">
                    <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search language or state (e.g. Marathi, Punjab)..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-8 pr-3 py-1.5 text-xs bg-white rounded-lg border border-slate-200 focus:outline-hidden focus:border-primary-500"
                      autoFocus
                    />
                  </div>
                </div>

                {/* Languages List */}
                <div className="max-h-72 overflow-y-auto divide-y divide-slate-50 scrollbar-thin">
                  {filteredLanguages.length === 0 ? (
                    <div className="p-4 text-center text-xs text-slate-400">
                      No matching language or state found.
                    </div>
                  ) : (
                    filteredLanguages.map((lang) => {
                      const isSelected = lang.code === currentLang.code;
                      return (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setLanguageByCode(lang.code);
                            setDropdownOpen(false);
                            setSearchQuery('');
                          }}
                          className={`w-full px-3.5 py-2.5 text-left flex items-start justify-between gap-2 hover:bg-primary-50/60 transition-colors ${
                            isSelected ? 'bg-primary-50/90 text-primary-900 font-semibold' : 'text-slate-700'
                          }`}
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-bold text-slate-900">{lang.nativeName}</span>
                              <span className="text-xs text-slate-500 font-medium">({lang.name})</span>
                            </div>
                            <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                              State: {lang.state}
                            </p>
                          </div>
                          {isSelected && (
                            <Check className="w-4 h-4 text-primary-600 shrink-0 mt-0.5" />
                          )}
                        </button>
                      );
                    })
                  )}
                </div>

                {/* Dropdown Footer */}
                <div className="p-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span>Powered by Bhishmini AI</span>
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      openModal();
                    }}
                    className="text-primary-600 font-semibold hover:underline"
                  >
                    AI Setup & Guide →
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Bhishmini AI Assistant Trigger */}
          <button
            onClick={openModal}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-primary-600 to-indigo-600 hover:from-primary-700 hover:to-indigo-700 text-white text-xs font-semibold shadow-xs transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Bhishmini AI</span>
          </button>
        </div>
      </div>
    </header>
  );
}
