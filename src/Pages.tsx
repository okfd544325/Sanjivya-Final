import { useRef, useState, useEffect, useCallback } from 'react';
import { Link, useLocation, useNavigate, NavLink, Outlet, useSearchParams } from 'react-router-dom';
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import {
  Camera, CameraOff, Play, Square, CheckCircle2, AlertTriangle, XCircle, Loader2, Activity, HeartPulse,
  Eye, RotateCcw, ChevronRight, LayoutDashboard, Dumbbell, TrendingUp, ClipboardList, Bike, Target,
  ShieldCheck, Calendar, AlertCircle, Heart, CheckSquare, type LucideIcon,
} from 'lucide-react';
import {
  exercises, sports, getExercise, getExercisesForSport, mockCycle, cyclePhases, mockAthlete,
  recentAnalyses, progressData, redScreeningQuestions, fallbackResult, analyzeFrame,
} from './data';
import type { FormAnalysisResult } from './data';
import ExerciseAnimation from './Animations';

// ===== LAYOUT =====
const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/sports', label: 'Sports', icon: Bike },
  { to: '/exercises', label: 'Exercises', icon: Dumbbell },
  { to: '/analysis', label: 'Form Analysis', icon: Camera },
  { to: '/cycle', label: 'Cycle & Risk', icon: HeartPulse },
  { to: '/screening', label: 'RED-S Screening', icon: ClipboardList },
  { to: '/progress', label: 'Progress', icon: TrendingUp },
];

export function Layout() {
  const location = useLocation();
  return (
    <div className="min-h-screen flex bg-slate-50">
      <aside className="hidden md:flex w-64 flex-col bg-white border-r border-slate-200 fixed h-screen">
        <div className="px-6 py-5 border-b border-slate-100 flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-md">
            <Activity className="w-5 h-5 text-white" strokeWidth={2.5} />
          </div>
          <div><h1 className="text-lg font-bold text-slate-900 leading-none">CycleGuard</h1><p className="text-[10px] text-slate-400 mt-0.5 leading-none">SIH 2026 Prototype</p></div>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end}
              className={({ isActive }) => `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${isActive ? 'bg-primary-50 text-primary-700' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'}`}>
              <item.icon className="w-[18px] h-[18px]" strokeWidth={2} />{item.label}
            </NavLink>
          ))}
        </nav>
        <div className="px-4 py-3 border-t border-slate-100"><p className="text-[10px] text-slate-400 leading-relaxed">Prototype only. Not a medical device. No health diagnosis provided.</p></div>
      </aside>
      <div className="md:hidden fixed top-0 left-0 right-0 z-30 bg-white border-b border-slate-200 px-4 py-3 flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center"><Activity className="w-4 h-4 text-white" strokeWidth={2.5} /></div>
        <h1 className="text-base font-bold text-slate-900">CycleGuard</h1>
      </div>
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-slate-200 flex justify-around px-1 py-1.5">
        {navItems.map((item) => {
          const isActive = item.end ? location.pathname === item.to : location.pathname.startsWith(item.to);
          return <NavLink key={item.to} to={item.to} end={item.end} className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg ${isActive ? 'text-primary-600' : 'text-slate-400'}`}>
            <item.icon className="w-5 h-5" strokeWidth={2} /><span className="text-[9px] font-medium leading-none">{item.label.split(' ')[0]}</span>
          </NavLink>;
        })}
      </nav>
      <main className="flex-1 md:ml-64 pt-14 md:pt-0 pb-16 md:pb-0"><Outlet /></main>
    </div>
  );
}

// ===== DASHBOARD =====
function StatCard({ icon: Icon, label, value, sublabel, color, to }: { icon: LucideIcon; label: string; value: string | number; sublabel?: string; color: string; to: string }) {
  return (
    <Link to={to} className="bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-md transition-shadow group">
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center`}><Icon className="w-5 h-5 text-white" strokeWidth={2} /></div>
        <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 transition-colors" />
      </div>
      <p className="text-sm text-slate-500 font-medium">{label}</p>
      <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
      {sublabel && <p className="text-xs text-slate-400 mt-0.5">{sublabel}</p>}
    </Link>
  );
}

function RiskGauge({ score }: { score: number }) {
  const circ = 2 * Math.PI * 52; const offset = circ - (score / 100) * circ;
  const color = score < 40 ? '#10b981' : score < 70 ? '#f59e0b' : '#ef4444';
  return (
    <div className="relative w-36 h-36 mx-auto">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r="52" fill="none" stroke="#f1f5f9" strokeWidth="10" />
        <circle cx="60" cy="60" r="52" fill="none" stroke={color} strokeWidth="10" strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={offset} style={{ transition: 'stroke-dashoffset 1s ease' }} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center"><span className="text-3xl font-bold text-slate-900">{score}</span><span className="text-xs text-slate-400 font-medium">Risk Score</span></div>
    </div>
  );
}

export function Dashboard() {
  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div><h1 className="text-2xl font-bold text-slate-900">Welcome back</h1><p className="text-slate-500 text-sm mt-1">Here's your training snapshot for today.</p></div>
        <Link to="/analysis" className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-5 py-2.5 rounded-xl font-medium text-sm transition-colors shadow-sm"><Camera className="w-4 h-4" />Start Form Analysis</Link>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 lg:col-span-1">
          <div className="flex items-center gap-2 mb-4"><HeartPulse className="w-4 h-4 text-primary-500" /><h2 className="text-sm font-semibold text-slate-700">Current Risk Score</h2></div>
          <RiskGauge score={mockAthlete.currentRiskScore} />
          <div className="mt-4 pt-4 border-t border-slate-100 text-center">
            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-amber-600"><AlertTriangle className="w-4 h-4" />MODERATE RISK</span>
            <p className="text-xs text-slate-400 mt-1">Demo logic — not medically validated</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-6 lg:col-span-2">
          <div className="flex items-center gap-2 mb-4"><Activity className="w-4 h-4 text-accent-500" /><h2 className="text-sm font-semibold text-slate-700">Cycle Phase & Training</h2></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-xl p-4"><p className="text-xs text-slate-500 font-medium">Current Phase</p><p className="text-xl font-bold text-primary-700 mt-1">{mockCycle.phase}</p><p className="text-xs text-slate-400 mt-1">Day {mockCycle.day} of cycle</p></div>
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-4"><p className="text-xs text-slate-500 font-medium">Risk Modifier</p><p className="text-xl font-bold text-amber-600 mt-1">+{mockCycle.riskModifier}%</p><p className="text-xs text-slate-400 mt-1">Injury risk adjustment</p></div>
            <div className="col-span-2 bg-slate-50 rounded-xl p-4"><p className="text-xs text-slate-500 font-medium mb-1">Today's Workout</p><p className="text-sm font-semibold text-slate-700">{mockAthlete.todayWorkout}</p><Link to="/cycle" className="text-xs text-primary-600 font-medium mt-2 inline-block hover:underline">View cycle details →</Link></div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Camera} label="Form Score" value={`${mockAthlete.formScore}/100`} sublabel="Last analysis" color="bg-primary-500" to="/analysis" />
        <StatCard icon={TrendingUp} label="Training Load" value={`${mockAthlete.trainingLoad}%`} sublabel="This week" color="bg-accent-500" to="/progress" />
        <StatCard icon={Dumbbell} label="Exercises" value="8" sublabel="In library" color="bg-violet-500" to="/exercises" />
        <StatCard icon={Activity} label="Cycle Day" value={mockAthlete.cycleDay} sublabel={mockCycle.phase} color="bg-amber-500" to="/cycle" />
      </div>
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-4"><h2 className="text-sm font-semibold text-slate-700">Recent Form Analyses</h2><Link to="/progress" className="text-xs text-primary-600 font-medium hover:underline">View all →</Link></div>
        <div className="space-y-2">
          {recentAnalyses.map((a, i) => (
            <div key={i} className="flex items-center justify-between py-3 px-4 rounded-xl hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${a.score >= 80 ? 'bg-accent-100' : a.score >= 60 ? 'bg-amber-100' : 'bg-red-100'}`}>
                  {a.score >= 80 ? <CheckCircle2 className="w-4 h-4 text-accent-600" /> : <AlertTriangle className="w-4 h-4 text-amber-600" />}
                </div>
                <div><p className="text-sm font-medium text-slate-700">{a.exercise}</p><p className="text-xs text-slate-400">{a.time}{a.issues.length > 0 && ` · ${a.issues.join(', ')}`}</p></div>
              </div>
              <span className={`text-lg font-bold ${a.score >= 80 ? 'text-accent-600' : a.score >= 60 ? 'text-amber-600' : 'text-red-600'}`}>{a.score}</span>
            </div>
          ))}
        </div>
      </div>
      <p className="text-center text-xs text-slate-400 pt-2">CycleGuard is a prototype for SIH 2026. All risk scores and recommendations are demo logic, not medical advice.</p>
    </div>
  );
}

// ===== SPORTS =====
export function Sports() {
  const [selectedSport, setSelectedSport] = useState<string | null>(null);
  if (selectedSport) {
    const sport = sports.find((s) => s.id === selectedSport);
    const exs = getExercisesForSport(selectedSport);
    return (
      <div className="p-6 md:p-8 max-w-5xl mx-auto">
        <button onClick={() => setSelectedSport(null)} className="text-sm text-primary-600 font-medium mb-4 hover:underline">← Back to Sports</button>
        <h1 className="text-2xl font-bold text-slate-900 mb-1">{sport?.name}</h1>
        <p className="text-slate-500 text-sm mb-6">{sport?.description}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {exs.map((ex) => (
            <Link key={ex.id} to="/analysis" state={{ exerciseId: ex.id }} className="bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-md transition-shadow group">
              <div className="flex items-start justify-between mb-2"><div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center"><Dumbbell className="w-5 h-5 text-primary-600" /></div><ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 transition-colors" /></div>
              <h3 className="font-semibold text-slate-900">{ex.name}</h3><p className="text-xs text-slate-400 mt-1">{ex.targetArea}</p><p className="text-xs text-primary-600 font-medium mt-3">Start Analysis →</p>
            </Link>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-slate-900 mb-1">Sports</h1>
      <p className="text-slate-500 text-sm mb-6">Select a sport to see related exercises and start form analysis.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {sports.map((sport) => (
          <button key={sport.id} onClick={() => setSelectedSport(sport.id)} className="bg-white rounded-2xl border border-slate-200 p-6 text-left hover:shadow-lg hover:border-primary-200 transition-all group">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${sport.color} flex items-center justify-center mb-4 shadow-sm`}><span className="text-white font-bold text-lg">{sport.name[0]}</span></div>
            <h3 className="font-bold text-slate-900 text-lg">{sport.name}</h3>
            <p className="text-sm text-slate-500 mt-1">{sport.description}</p>
            <div className="flex items-center gap-1 mt-4 text-primary-600 text-sm font-medium">{sport.exercises.length} exercises<ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ===== EXERCISE LIBRARY =====
export function ExerciseLibrary() {
  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-slate-900 mb-1">Exercise Library</h1>
      <p className="text-slate-500 text-sm mb-6">Browse exercises with form guides, animations, and injury-prevention focus.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {exercises.map((ex) => (
          <div key={ex.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="flex">
              <div className="w-32 h-32 bg-gradient-to-br from-slate-50 to-primary-50/30 flex items-center justify-center shrink-0"><ExerciseAnimation type={ex.animationType} className="w-28 h-28" /></div>
              <div className="flex-1 p-4">
                <h3 className="font-bold text-slate-900">{ex.name}</h3>
                <div className="flex items-center gap-1.5 mt-1"><Target className="w-3.5 h-3.5 text-slate-400" /><span className="text-xs text-slate-500">{ex.targetArea}</span></div>
                <div className="flex items-start gap-1.5 mt-2"><ShieldCheck className="w-3.5 h-3.5 text-accent-500 shrink-0 mt-0.5" /><span className="text-xs text-slate-500">{ex.injuryFocus}</span></div>
                <p className="text-xs text-slate-400 mt-2 line-clamp-2">{ex.instructions}</p>
                <Link to="/analysis" state={{ exerciseId: ex.id }} className="inline-flex items-center gap-1.5 mt-3 text-sm font-medium text-primary-600 hover:text-primary-700"><Camera className="w-4 h-4" />Start Analysis<ChevronRight className="w-4 h-4" /></Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ===== LIVE FORM ANALYSIS =====
const SAMPLE_INTERVAL_MS = 4000;
type AnalysisPhase = 'select' | 'camera' | 'analyzing' | 'result';

export function LiveFormAnalysis() {
  const location = useLocation();
  const navigate = useNavigate();
  const passedId = (location.state as { exerciseId?: string } | null)?.exerciseId;
  const [selectedExerciseId, setSelectedExerciseId] = useState<string>(passedId ?? '');
  const [phase, setPhase] = useState<AnalysisPhase>(passedId ? 'camera' : 'select');
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<FormAnalysisResult | null>(null);
  const [analyzedCount, setAnalyzedCount] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const sampleTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const selectedExercise = selectedExerciseId ? getExercise(selectedExerciseId) : undefined;

  const startCamera = useCallback(async () => {
    setCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } }, audio: false });
      streamRef.current = stream;
      if (videoRef.current) { videoRef.current.srcObject = stream; await videoRef.current.play(); }
      setCameraActive(true);
    } catch { setCameraError('Unable to access camera. Please allow camera permissions and try again.'); }
  }, []);

  const stopCamera = useCallback(() => {
    if (streamRef.current) { streamRef.current.getTracks().forEach((t) => t.stop()); streamRef.current = null; }
    if (videoRef.current) videoRef.current.srcObject = null;
    setCameraActive(false);
  }, []);

  const captureAndAnalyze = useCallback(async () => {
    if (!videoRef.current || !selectedExercise) return;
    const video = videoRef.current;
    if (video.readyState < 2) return;
    const canvas = document.createElement('canvas');
    canvas.width = 640; canvas.height = 480;
    const ctx = canvas.getContext('2d'); if (!ctx) return;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const base64 = canvas.toDataURL('image/jpeg', 0.7).split(',')[1];
    setAnalyzing(true);
    const res = await analyzeFrame(base64, selectedExercise.name, selectedExercise.instructions);
    setAnalyzing(false); setResult(res); setAnalyzedCount((c) => c + 1);
    if (res.formScore > 0) { setPhase('result'); if (sampleTimerRef.current) { clearInterval(sampleTimerRef.current); sampleTimerRef.current = null; } }
  }, [selectedExercise]);

  const startAnalysis = useCallback(() => {
    setPhase('analyzing'); setResult(null); setAnalyzedCount(0);
    captureAndAnalyze();
    if (sampleTimerRef.current) clearInterval(sampleTimerRef.current);
    sampleTimerRef.current = setInterval(captureAndAnalyze, SAMPLE_INTERVAL_MS);
  }, [captureAndAnalyze]);

  const stopAnalysis = useCallback(() => { if (sampleTimerRef.current) { clearInterval(sampleTimerRef.current); sampleTimerRef.current = null; } setPhase('camera'); }, []);
  const tryAgain = useCallback(() => { setResult(null); setAnalyzedCount(0); setPhase('camera'); }, []);

  useEffect(() => { return () => { if (sampleTimerRef.current) clearInterval(sampleTimerRef.current); if (streamRef.current) streamRef.current.getTracks().forEach((t) => t.stop()); }; }, []);
  useEffect(() => { if (phase === 'camera' && !cameraActive) startCamera(); }, [phase, cameraActive, startCamera]);

  if (phase === 'select') {
    return (
      <div className="p-6 md:p-8 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-slate-900 mb-1">Live Form Analysis</h1>
        <p className="text-slate-500 text-sm mb-6">Select an exercise to begin camera-based form analysis.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {exercises.map((ex) => (
            <button key={ex.id} onClick={() => { setSelectedExerciseId(ex.id); setPhase('camera'); }} className="bg-white rounded-2xl border border-slate-200 p-4 text-left hover:shadow-md hover:border-primary-200 transition-all group">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-slate-50 to-primary-50/30 rounded-xl flex items-center justify-center mb-3"><ExerciseAnimation type={ex.animationType} className="w-18 h-18" /></div>
              <h3 className="font-semibold text-slate-900 text-sm text-center">{ex.name}</h3>
              <p className="text-xs text-slate-400 text-center mt-1">{ex.targetArea}</p>
              <div className="flex items-center justify-center gap-1 mt-3 text-primary-600 text-xs font-medium"><Camera className="w-3.5 h-3.5" />Select & Start</div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  const statusColor = result?.status === 'Excellent' ? 'text-accent-600 bg-accent-50' : result?.status === 'Good' ? 'text-primary-600 bg-primary-50' : result?.status === 'Needs Improvement' ? 'text-amber-600 bg-amber-50' : 'text-red-600 bg-red-50';

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <div><h1 className="text-xl font-bold text-slate-900">Live Form Analysis</h1>{selectedExercise && <p className="text-sm text-slate-500">{selectedExercise.name}</p>}</div>
        <button onClick={() => { stopCamera(); stopAnalysis(); setPhase('select'); setResult(null); }} className="text-sm text-slate-500 hover:text-slate-700 font-medium">Change Exercise</button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 space-y-4">
          <div className="relative bg-slate-900 rounded-2xl overflow-hidden aspect-video">
            <video ref={videoRef} className="w-full h-full object-cover" muted playsInline />
            {!cameraActive && <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400"><CameraOff className="w-12 h-12 mb-3" /><p className="text-sm">Camera is off</p></div>}
            {cameraActive && phase === 'analyzing' && <div className="absolute top-3 left-3 flex items-center gap-2 bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-lg"><span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" /><span className="text-white text-xs font-medium">ANALYZING LIVE</span></div>}
            {cameraActive && phase === 'camera' && <div className="absolute top-3 left-3 flex items-center gap-2 bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-lg"><span className="w-2 h-2 bg-accent-500 rounded-full" /><span className="text-white text-xs font-medium">CAMERA LIVE</span></div>}
            {analyzing && <div className="absolute bottom-3 left-3 flex items-center gap-2 bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-lg"><Loader2 className="w-4 h-4 text-white animate-spin" /><span className="text-white text-xs font-medium">Analyzing frame...</span></div>}
          </div>
          {cameraError && <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3"><AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" /><div><p className="text-sm font-medium text-red-700">{cameraError}</p><button onClick={startCamera} className="text-xs text-red-600 font-medium mt-1 hover:underline">Try again</button></div></div>}
          <div className="flex flex-wrap gap-3">
            {phase === 'camera' && cameraActive && <button onClick={startAnalysis} className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-5 py-2.5 rounded-xl font-medium text-sm transition-colors shadow-sm"><Play className="w-4 h-4" />Start Analysis</button>}
            {phase === 'analyzing' && <button onClick={stopAnalysis} className="inline-flex items-center gap-2 bg-slate-700 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl font-medium text-sm transition-colors"><Square className="w-4 h-4" />Stop</button>}
            {phase === 'result' && <>
              <button onClick={tryAgain} className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-5 py-2.5 rounded-xl font-medium text-sm transition-colors shadow-sm"><RotateCcw className="w-4 h-4" />Try Again</button>
              <button onClick={() => navigate('/result', { state: { result, exerciseId: selectedExerciseId } })} className="inline-flex items-center gap-2 bg-white border border-slate-200 hover:border-primary-300 text-slate-700 px-5 py-2.5 rounded-xl font-medium text-sm transition-colors">View Full Result<ChevronRight className="w-4 h-4" /></button>
            </>}
            {cameraActive && <button onClick={() => { stopCamera(); stopAnalysis(); setPhase('camera'); }} className="inline-flex items-center gap-2 bg-white border border-slate-200 hover:border-slate-300 text-slate-600 px-5 py-2.5 rounded-xl font-medium text-sm transition-colors"><CameraOff className="w-4 h-4" />Turn Off Camera</button>}
          </div>
          {selectedExercise && <div className="bg-white rounded-2xl border border-slate-200 p-4"><div className="flex items-center gap-2 mb-2"><Eye className="w-4 h-4 text-slate-400" /><h3 className="text-sm font-semibold text-slate-700">Reference: {selectedExercise.name}</h3></div><div className="flex gap-4"><div className="w-24 h-24 bg-gradient-to-br from-slate-50 to-primary-50/30 rounded-xl flex items-center justify-center shrink-0"><ExerciseAnimation type={selectedExercise.animationType} className="w-20 h-20" /></div><p className="text-xs text-slate-500 leading-relaxed">{selectedExercise.instructions}</p></div></div>}
        </div>
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-5">
            <div className="flex items-center gap-2 mb-3"><Activity className="w-4 h-4 text-primary-500" /><h3 className="text-sm font-semibold text-slate-700">Analysis Status</h3></div>
            <div className="space-y-3">
              <div className="flex justify-between items-center"><span className="text-xs text-slate-500">Exercise</span><span className="text-sm font-medium text-slate-700">{selectedExercise?.name ?? '—'}</span></div>
              <div className="flex justify-between items-center"><span className="text-xs text-slate-500">Status</span><span className={`text-xs font-medium px-2 py-0.5 rounded-full ${phase === 'analyzing' ? 'bg-primary-100 text-primary-700' : phase === 'result' ? 'bg-accent-100 text-accent-700' : 'bg-slate-100 text-slate-500'}`}>{phase === 'camera' ? 'Ready' : phase === 'analyzing' ? 'Running' : 'Complete'}</span></div>
              <div className="flex justify-between items-center"><span className="text-xs text-slate-500">Form Score</span><span className={`text-lg font-bold ${result ? (result.formScore >= 80 ? 'text-accent-600' : result.formScore >= 60 ? 'text-amber-600' : 'text-red-600') : 'text-slate-300'}`}>{result ? result.formScore : '—'}</span></div>
              <div className="flex justify-between items-center"><span className="text-xs text-slate-500">Frames Analyzed</span><span className="text-sm font-medium text-slate-700">{analyzedCount}</span></div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl border border-primary-100 p-5">
            <div className="flex items-center gap-2 mb-2"><HeartPulse className="w-4 h-4 text-primary-500" /><h3 className="text-sm font-semibold text-slate-700">Cycle Context</h3></div>
            <div className="space-y-2"><div className="flex justify-between"><span className="text-xs text-slate-500">Phase</span><span className="text-sm font-medium text-primary-700">{mockCycle.phase}</span></div><div className="flex justify-between"><span className="text-xs text-slate-500">Risk Modifier</span><span className="text-sm font-medium text-amber-600">+{mockCycle.riskModifier}%</span></div></div>
          </div>
          {result && <div className="bg-white rounded-2xl border border-slate-200 p-5 animate-float-up"><h3 className="text-sm font-semibold text-slate-700 mb-3">Detected</h3><div className="space-y-2">{result.detectedIssues.map((issue, i) => <div key={i} className="flex items-center gap-2">{issue.status === 'good' && <CheckCircle2 className="w-4 h-4 text-accent-500" />}{issue.status === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-500" />}{issue.status === 'error' && <XCircle className="w-4 h-4 text-red-500" />}<span className="text-sm text-slate-700">{issue.label}</span></div>)}{result.detectedIssues.length === 0 && <p className="text-xs text-slate-400">No detailed issues detected yet.</p>}</div></div>}
          {result && <div className={`rounded-2xl border p-5 animate-float-up ${result.formScore >= 80 ? 'bg-accent-50 border-accent-200' : result.formScore >= 60 ? 'bg-amber-50 border-amber-200' : 'bg-red-50 border-red-200'}`}><div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${statusColor} mb-3`}>{result.formScore >= 80 ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}{result.primaryIssue.toUpperCase()}</div><p className="text-sm text-slate-700 font-medium mb-2">{result.correction}</p>{result.rawFeedback.length > 0 && <ul className="space-y-1 mt-3 pt-3 border-t border-slate-200/50">{result.rawFeedback.slice(0, 3).map((fb, i) => <li key={i} className="text-xs text-slate-600 flex items-start gap-1.5"><span className="text-slate-400 mt-0.5">•</span>{fb}</li>)}</ul>}<div className="mt-3 pt-3 border-t border-slate-200/50"><p className="text-xs text-slate-400">Risk Level: <span className="font-semibold text-slate-600">{result.riskLevel}</span></p></div></div>}
          <p className="text-[10px] text-slate-400 text-center px-2">Coaching feedback only. Not a medical diagnosis. Risk calculations use prototype demo logic.</p>
        </div>
      </div>
    </div>
  );
}

// ===== ANALYSIS RESULT =====
export function AnalysisResult() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = (location.state as { result?: FormAnalysisResult; exerciseId?: string } | null);
  const result = state?.result ?? fallbackResult;
  const exerciseId = state?.exerciseId ?? 'squat';
  const exercise = getExercise(exerciseId);
  const scoreBg = result.formScore >= 80 ? 'from-accent-500 to-accent-600' : result.formScore >= 60 ? 'from-amber-500 to-orange-500' : 'from-red-500 to-rose-500';
  const riskColor = result.riskLevel === 'LOW' ? 'text-accent-600 bg-accent-50' : result.riskLevel === 'MODERATE' ? 'text-amber-600 bg-amber-50' : 'text-red-600 bg-red-50';
  const goodIssues = result.detectedIssues.filter((i) => i.status === 'good');
  const problemIssues = result.detectedIssues.filter((i) => i.status !== 'good');

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto space-y-6">
      <button onClick={() => navigate(-1)} className="text-sm text-primary-600 font-medium hover:underline">← Back</button>
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className={`w-28 h-28 rounded-2xl bg-gradient-to-br ${scoreBg} flex flex-col items-center justify-center text-white shadow-lg`}><span className="text-3xl font-bold leading-none">{result.formScore}</span><span className="text-xs opacity-90 mt-1">/ 100</span></div>
          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-xl font-bold text-slate-900">Analysis Result</h1>
            <p className="text-sm text-slate-500 mt-0.5">{exercise?.name ?? 'Exercise'} — Form Analysis</p>
            <div className="flex flex-wrap gap-2 mt-3 justify-center sm:justify-start">
              <span className={`text-xs font-bold px-3 py-1 rounded-full ${riskColor}`}>RISK: {result.riskLevel}</span>
              <span className="text-xs font-medium px-3 py-1 rounded-full bg-slate-100 text-slate-600">{result.status}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <div className="flex items-center gap-2 mb-4"><AlertTriangle className="w-4 h-4 text-amber-500" /><h2 className="text-sm font-semibold text-slate-700">Problems Detected</h2></div>
          {problemIssues.length > 0 ? (
            <div className="space-y-3">
              {problemIssues.map((issue, i) => <div key={i} className="flex items-center gap-3 py-2 px-3 bg-amber-50/50 rounded-lg">{issue.status === 'error' ? <XCircle className="w-5 h-5 text-red-500" /> : <AlertTriangle className="w-5 h-5 text-amber-500" />}<span className="text-sm text-slate-700 font-medium">{issue.label}</span></div>)}
              <div className="pt-2"><p className="text-xs text-slate-500 font-medium mb-1">Primary Issue</p><p className="text-sm font-semibold text-slate-800">{result.primaryIssue}</p></div>
            </div>
          ) : <div className="flex items-center gap-2 py-4 text-accent-600"><CheckCircle2 className="w-5 h-5" /><span className="text-sm font-medium">No significant issues detected. Great form!</span></div>}
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <div className="flex items-center gap-2 mb-4"><CheckCircle2 className="w-4 h-4 text-accent-500" /><h2 className="text-sm font-semibold text-slate-700">What's Working Well</h2></div>
          {goodIssues.length > 0 ? <div className="space-y-3">{goodIssues.map((issue, i) => <div key={i} className="flex items-center gap-3 py-2 px-3 bg-accent-50/50 rounded-lg"><CheckCircle2 className="w-5 h-5 text-accent-500" /><span className="text-sm text-slate-700 font-medium">{issue.label}</span></div>)}</div> : <p className="text-sm text-slate-400">No specific positives highlighted in this analysis.</p>}
        </div>
      </div>
      <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl border border-primary-100 p-6">
        <h2 className="text-sm font-semibold text-slate-700 mb-3">How to Correct It</h2>
        <p className="text-sm text-slate-700 font-medium mb-4">{result.correction}</p>
        {result.rawFeedback.length > 0 && <ul className="space-y-2">{result.rawFeedback.map((fb, i) => <li key={i} className="text-sm text-slate-600 flex items-start gap-2"><ChevronRight className="w-4 h-4 text-primary-500 shrink-0 mt-0.5" />{fb}</li>)}</ul>}
      </div>
      {exercise && <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <div className="flex items-center gap-2 mb-4"><Activity className="w-4 h-4 text-primary-500" /><h2 className="text-sm font-semibold text-slate-700">Correct Exercise Form</h2></div>
        <div className="flex flex-col sm:flex-row gap-6 items-center">
          <div className="w-40 h-40 bg-gradient-to-br from-slate-50 to-primary-50/30 rounded-2xl flex items-center justify-center shrink-0"><ExerciseAnimation type={exercise.animationType} className="w-36 h-36" /></div>
          <div className="flex-1"><h3 className="font-bold text-slate-900">{exercise.name}</h3><p className="text-xs text-slate-400 mt-1 mb-3">{exercise.targetArea}</p><p className="text-sm text-slate-600 leading-relaxed">{exercise.instructions}</p><div className="mt-3 bg-amber-50 rounded-lg p-3"><p className="text-xs font-medium text-amber-700">Injury Prevention Focus</p><p className="text-xs text-slate-600 mt-1">{exercise.injuryFocus}</p></div></div>
        </div>
      </div>}
      <div className="bg-white rounded-2xl border border-slate-200 p-5">
        <div className="flex items-center gap-2 mb-3"><HeartPulse className="w-4 h-4 text-primary-500" /><h2 className="text-sm font-semibold text-slate-700">Cycle Context</h2></div>
        <div className="grid grid-cols-2 gap-4"><div><p className="text-xs text-slate-500">Phase</p><p className="text-sm font-bold text-primary-700">{mockCycle.phase}</p></div><div><p className="text-xs text-slate-500">Risk Modifier</p><p className="text-sm font-bold text-amber-600">+{mockCycle.riskModifier}%</p></div></div>
      </div>
      <div className="flex flex-wrap gap-3">
        <Link to="/analysis" state={{ exerciseId }} className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-xl font-medium text-sm transition-colors shadow-sm"><RotateCcw className="w-4 h-4" />Try Again</Link>
        <Link to="/exercises" className="inline-flex items-center gap-2 bg-white border border-slate-200 hover:border-primary-300 text-slate-700 px-6 py-3 rounded-xl font-medium text-sm transition-colors"><Camera className="w-4 h-4" />Try Another Exercise</Link>
      </div>
      <p className="text-center text-xs text-slate-400">This is a coaching prototype, not a medical diagnosis. Consult a qualified professional for injury concerns.</p>
    </div>
  );
}

// ===== CYCLE & RISK =====
export function CycleRisk() {
  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto space-y-6">
      <div><h1 className="text-2xl font-bold text-slate-900 mb-1">Cycle & Risk</h1><p className="text-slate-500 text-sm">Track your menstrual cycle phase and its impact on injury risk.</p></div>
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <div className="flex items-center gap-2 mb-4"><HeartPulse className="w-5 h-5 text-primary-500" /><h2 className="text-sm font-semibold text-slate-700">Current Cycle Phase</h2></div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-xl p-5 text-center"><p className="text-xs text-slate-500 font-medium">Phase</p><p className="text-2xl font-bold text-primary-700 mt-1">{mockCycle.phase}</p></div>
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-5 text-center"><div className="flex items-center justify-center gap-1.5"><Calendar className="w-4 h-4 text-amber-500" /><p className="text-xs text-slate-500 font-medium">Cycle Day</p></div><p className="text-2xl font-bold text-amber-600 mt-1">Day {mockCycle.day}</p></div>
          <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-xl p-5 text-center"><div className="flex items-center justify-center gap-1.5"><TrendingUp className="w-4 h-4 text-red-500" /><p className="text-xs text-slate-500 font-medium">Risk Modifier</p></div><p className="text-2xl font-bold text-red-600 mt-1">+{mockCycle.riskModifier}%</p></div>
        </div>
        <div className="mt-4 pt-4 border-t border-slate-100"><p className="text-sm text-slate-600">{mockCycle.description}</p></div>
      </div>
      <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl border border-primary-100 p-6">
        <div className="flex items-center gap-2 mb-3"><Activity className="w-5 h-5 text-primary-500" /><h2 className="text-sm font-semibold text-slate-700">Training Recommendation</h2></div>
        <p className="text-sm text-slate-700">{mockCycle.recommendation}</p>
      </div>
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="text-sm font-semibold text-slate-700 mb-4">Cycle Timeline (28 days)</h2>
        <div className="relative">
          <div className="flex h-3 rounded-full overflow-hidden"><div className="bg-slate-400 flex-[5]" /><div className="bg-primary-500 flex-[8]" /><div className="bg-accent-500 flex-[3]" /><div className="bg-amber-500 flex-[12]" /></div>
          <div className="absolute top-0 h-3 w-0.5 bg-slate-900" style={{ left: `${(mockCycle.day / 28) * 100}%` }} />
          <div className="text-[10px] text-slate-400 mt-1" style={{ marginLeft: `${(mockCycle.day / 28) * 100 - 2}%` }}>Day {mockCycle.day}</div>
        </div>
        <div className="flex justify-between text-[10px] text-slate-400 mt-2"><span>Day 1</span><span>Day 14</span><span>Day 28</span></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {cyclePhases.map((p) => (
          <div key={p.phase} className={`bg-white rounded-2xl border p-5 ${p.phase === mockCycle.phase ? 'border-primary-300 ring-2 ring-primary-100' : 'border-slate-200'}`}>
            <div className="flex items-center justify-between mb-2"><div className="flex items-center gap-2"><div className={`w-3 h-3 rounded-full ${p.color}`} /><h3 className="font-semibold text-slate-900 text-sm">{p.phase}</h3></div>{p.phase === mockCycle.phase && <span className="text-[10px] font-bold text-primary-600 bg-primary-50 px-2 py-0.5 rounded-full">CURRENT</span>}</div>
            <p className="text-xs text-slate-400 mb-2">{p.days}</p><p className="text-sm text-slate-600">{p.description}</p>
            <div className="mt-3 pt-3 border-t border-slate-100"><span className="text-xs text-slate-500">Risk Modifier: </span><span className="text-xs font-bold text-slate-700">+{p.riskModifier}%</span></div>
          </div>
        ))}
      </div>
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3"><AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" /><p className="text-xs text-amber-700 leading-relaxed">All cycle-based risk calculations on this page use prototype demo logic and are not medically validated. This tool does not provide medical advice. Consult a qualified sports medicine professional for personalized guidance.</p></div>
    </div>
  );
}

// ===== RED-S SCREENING =====
type Answer = 'Yes' | 'No' | 'Sometimes';
const answerValues: Record<Answer, number> = { Yes: 1, Sometimes: 0.5, No: 0 };

export function RedScreening() {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, Answer>>({});
  const [showResult, setShowResult] = useState(false);
  const totalQuestions = redScreeningQuestions.length;
  const question = redScreeningQuestions[currentQ];
  const progress = ((currentQ + (showResult ? 1 : 0)) / totalQuestions) * 100;

  function answer(ans: Answer) {
    setAnswers((prev) => ({ ...prev, [question.id]: ans }));
    if (currentQ < totalQuestions - 1) setCurrentQ((q) => q + 1); else setShowResult(true);
  }
  function reset() { setAnswers({}); setCurrentQ(0); setShowResult(false); }

  const totalScore = redScreeningQuestions.reduce((sum, q) => sum + (answers[q.id] ? answerValues[answers[q.id]] * q.weight : 0), 0);
  const maxScore = redScreeningQuestions.reduce((sum, q) => sum + q.weight, 0);
  const riskPercent = Math.round((totalScore / maxScore) * 100);
  const riskLevel = riskPercent >= 60 ? 'high' : riskPercent >= 30 ? 'moderate' : 'low';
  const riskConfig = {
    high: { label: 'Potential risk indicators detected', color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200', icon: AlertTriangle, recommendation: 'Consider speaking with a qualified sports medicine professional or your team physician for a comprehensive evaluation.' },
    moderate: { label: 'Some risk indicators present', color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200', icon: AlertTriangle, recommendation: 'Monitor your symptoms and discuss them with your coach or a healthcare provider at your next check-up.' },
    low: { label: 'Low risk indicators detected', color: 'text-accent-600', bg: 'bg-accent-50', border: 'border-accent-200', icon: CheckCircle2, recommendation: 'Continue maintaining healthy training and nutrition habits. Regular check-ups are always recommended.' },
  };
  const cfg = riskConfig[riskLevel];

  if (showResult) {
    return (
      <div className="p-6 md:p-8 max-w-3xl mx-auto space-y-6">
        <div><h1 className="text-2xl font-bold text-slate-900 mb-1">RED-S Screening Result</h1><p className="text-slate-500 text-sm">Based on your responses, here's a summary.</p></div>
        <div className={`rounded-2xl border ${cfg.border} ${cfg.bg} p-6`}>
          <div className="flex items-center gap-3 mb-3"><cfg.icon className={`w-8 h-8 ${cfg.color}`} /><h2 className={`text-lg font-bold ${cfg.color}`}>{cfg.label}</h2></div>
          <div className="mt-4"><div className="flex justify-between items-center mb-1"><span className="text-xs text-slate-500 font-medium">Risk Score</span><span className={`text-sm font-bold ${cfg.color}`}>{riskPercent}%</span></div><div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden"><div className={`h-full rounded-full ${riskLevel === 'high' ? 'bg-red-500' : riskLevel === 'moderate' ? 'bg-amber-500' : 'bg-accent-500'}`} style={{ width: `${riskPercent}%` }} /></div></div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-6"><div className="flex items-center gap-2 mb-3"><Heart className="w-4 h-4 text-primary-500" /><h2 className="text-sm font-semibold text-slate-700">Recommendation</h2></div><p className="text-sm text-slate-600">{cfg.recommendation}</p></div>
        <div className="bg-white rounded-2xl border border-slate-200 p-6"><h2 className="text-sm font-semibold text-slate-700 mb-4">Your Responses</h2><div className="space-y-3">{redScreeningQuestions.map((q) => <div key={q.id} className="flex items-start justify-between gap-4 py-2 border-b border-slate-50 last:border-0"><p className="text-xs text-slate-600 flex-1">{q.question}</p><span className={`text-xs font-bold px-2 py-0.5 rounded-full shrink-0 ${answers[q.id] === 'Yes' ? 'bg-red-100 text-red-600' : answers[q.id] === 'Sometimes' ? 'bg-amber-100 text-amber-600' : 'bg-accent-100 text-accent-600'}`}>{answers[q.id] ?? '—'}</span></div>)}</div></div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4"><p className="text-xs text-amber-700 leading-relaxed font-medium">This is a screening tool, not a diagnosis. It does not replace professional medical evaluation. If you have concerns about your health, energy, or menstrual cycle, please consult a qualified healthcare provider.</p></div>
        <button onClick={reset} className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-xl font-medium text-sm transition-colors shadow-sm"><RotateCcw className="w-4 h-4" />Retake Screening</button>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 max-w-3xl mx-auto space-y-6">
      <div><h1 className="text-2xl font-bold text-slate-900 mb-1">RED-S Screening</h1><p className="text-slate-500 text-sm">A quick 5-question screening for Relative Energy Deficiency in Sport indicators.</p></div>
      <div className="bg-white rounded-2xl border border-slate-200 p-5">
        <div className="flex items-center justify-between mb-2"><div className="flex items-center gap-2"><ClipboardList className="w-4 h-4 text-primary-500" /><span className="text-sm font-medium text-slate-700">Question {currentQ + 1} of {totalQuestions}</span></div><span className="text-xs text-slate-400">{Math.round(progress)}% complete</span></div>
        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-primary-500 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} /></div>
      </div>
      <div className="bg-white rounded-2xl border border-slate-200 p-8 animate-float-up" key={currentQ}>
        <p className="text-lg font-semibold text-slate-900 mb-6">{question.question}</p>
        <div className="space-y-3">
          {(['Yes', 'Sometimes', 'No'] as Answer[]).map((ans) => <button key={ans} onClick={() => answer(ans)} className="w-full flex items-center justify-between px-5 py-4 rounded-xl border border-slate-200 hover:border-primary-300 hover:bg-primary-50/50 transition-all text-left group"><span className="text-sm font-medium text-slate-700">{ans}</span><ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-primary-500 transition-colors" /></button>)}
        </div>
      </div>
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4"><p className="text-xs text-amber-700 leading-relaxed">This is a screening tool, not a diagnosis. Your responses are stored only in your browser session and are not sent anywhere.</p></div>
    </div>
  );
}

// ===== PROGRESS =====
export function Progress() {
  const avgFormScore = Math.round(progressData.formScores.reduce((s, d) => s + d.score, 0) / progressData.formScores.length);
  const avgLoad = Math.round(progressData.trainingLoad.reduce((s, d) => s + d.load, 0) / progressData.trainingLoad.length);
  const avgCompletion = Math.round(progressData.workoutCompletion.reduce((s, d) => s + d.completed, 0) / progressData.workoutCompletion.length);
  const currentRisk = progressData.riskTrend[progressData.riskTrend.length - 1].risk;
  const tooltipStyle = { borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '12px' };
  const axisProps = { tick: { fontSize: 12, fill: '#94a3b8' }, axisLine: false, tickLine: false };

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-6">
      <div><h1 className="text-2xl font-bold text-slate-900 mb-1">Progress</h1><p className="text-slate-500 text-sm">Track your form scores, training load, risk trends, and workout completion.</p></div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-5"><div className="flex items-center gap-2 mb-2"><Target className="w-4 h-4 text-primary-500" /><span className="text-xs text-slate-500 font-medium">Avg Form Score</span></div><p className="text-2xl font-bold text-slate-900">{avgFormScore}</p><p className="text-xs text-accent-600 mt-1">+4 this week</p></div>
        <div className="bg-white rounded-2xl border border-slate-200 p-5"><div className="flex items-center gap-2 mb-2"><Activity className="w-4 h-4 text-accent-500" /><span className="text-xs text-slate-500 font-medium">Avg Training Load</span></div><p className="text-2xl font-bold text-slate-900">{avgLoad}%</p><p className="text-xs text-slate-400 mt-1">Optimal range</p></div>
        <div className="bg-white rounded-2xl border border-slate-200 p-5"><div className="flex items-center gap-2 mb-2"><TrendingUp className="w-4 h-4 text-amber-500" /><span className="text-xs text-slate-500 font-medium">Current Risk</span></div><p className="text-2xl font-bold text-slate-900">{currentRisk}</p><p className="text-xs text-accent-600 mt-1">↓ 13 in 4 weeks</p></div>
        <div className="bg-white rounded-2xl border border-slate-200 p-5"><div className="flex items-center gap-2 mb-2"><CheckSquare className="w-4 h-4 text-violet-500" /><span className="text-xs text-slate-500 font-medium">Avg Completion</span></div><p className="text-2xl font-bold text-slate-900">{avgCompletion}%</p><p className="text-xs text-slate-400 mt-1">This week</p></div>
      </div>
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="text-sm font-semibold text-slate-700 mb-4">Form Score (This Week)</h2>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={progressData.formScores}>
            <defs><linearGradient id="formGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#3393ff" stopOpacity={0.3} /><stop offset="100%" stopColor="#3393ff" stopOpacity={0} /></linearGradient></defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" /><XAxis dataKey="day" {...axisProps} /><YAxis domain={[50, 100]} {...axisProps} /><Tooltip contentStyle={tooltipStyle} /><Area type="monotone" dataKey="score" stroke="#3393ff" strokeWidth={2} fill="url(#formGrad)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h2 className="text-sm font-semibold text-slate-700 mb-4">Training Load (This Week)</h2>
          <ResponsiveContainer width="100%" height={200}><BarChart data={progressData.trainingLoad}><CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" /><XAxis dataKey="day" {...axisProps} /><YAxis {...axisProps} /><Tooltip contentStyle={tooltipStyle} /><Bar dataKey="load" fill="#10b981" radius={[6, 6, 0, 0]} /></BarChart></ResponsiveContainer>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h2 className="text-sm font-semibold text-slate-700 mb-4">Risk Trend (4 Weeks)</h2>
          <ResponsiveContainer width="100%" height={200}><LineChart data={progressData.riskTrend}><CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" /><XAxis dataKey="week" {...axisProps} /><YAxis domain={[0, 100]} {...axisProps} /><Tooltip contentStyle={tooltipStyle} /><Line type="monotone" dataKey="risk" stroke="#f59e0b" strokeWidth={2.5} dot={{ fill: '#f59e0b', r: 4 }} /></LineChart></ResponsiveContainer>
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="text-sm font-semibold text-slate-700 mb-4">Workout Completion (This Week)</h2>
        <ResponsiveContainer width="100%" height={200}><BarChart data={progressData.workoutCompletion}><CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" /><XAxis dataKey="day" {...axisProps} /><YAxis domain={[0, 100]} {...axisProps} /><Tooltip contentStyle={tooltipStyle} /><Bar dataKey="completed" fill="#8b5cf6" radius={[6, 6, 0, 0]} /></BarChart></ResponsiveContainer>
      </div>
      <p className="text-center text-xs text-slate-400">All progress data shown is demo/mock data for prototype purposes.</p>
    </div>
  );
}
