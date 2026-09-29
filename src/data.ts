export interface FormAnalysisResult {
  formScore: number;
  riskLevel: 'LOW' | 'MODERATE' | 'HIGH';
  status: string;
  detectedIssues: Array<{ status: 'good' | 'warning' | 'error'; label: string }>;
  primaryIssue: string;
  correction: string;
  rawFeedback: string[];
}

export const exercises = [
  {
    id: 'squat',
    name: 'Squat',
    targetArea: 'Legs, Glutes, Core',
    animationType: 'squat',
    injuryFocus: 'Knee stability and lower back strength',
    instructions: 'Keep your back straight and lower your hips as if sitting in a chair.'
  },
  {
    id: 'cricket-bowling',
    name: 'Cricket Bowling',
    targetArea: 'Shoulders, Core, Legs',
    animationType: 'cricket-bowling',
    injuryFocus: 'Shoulder mobility and lower back stability',
    instructions: 'Maintain an upright posture and follow through smoothly.'
  },
  {
    id: 'forward-lunge',
    name: 'Forward Lunge',
    targetArea: 'Quads, Hamstrings, Glutes',
    animationType: 'forward-lunge',
    injuryFocus: 'Knee tracking and ankle stability',
    instructions: 'Step forward and lower your hips until both knees are bent at a 90-degree angle.'
  },
  {
    id: 'single-leg-squat',
    name: 'Single-Leg Squat',
    targetArea: 'Quads, Glutes, Balance',
    animationType: 'single-leg-squat',
    injuryFocus: 'Ankle stability and knee alignment',
    instructions: 'Balance on one leg and slowly lower your body while keeping your back straight.'
  },
  {
    id: 'jump-landing',
    name: 'Jump Landing',
    targetArea: 'Legs, Core',
    animationType: 'jump-landing',
    injuryFocus: 'Impact absorption and ACL protection',
    instructions: 'Land softly on the balls of your feet with knees slightly bent.'
  },
  {
    id: 'sprint-start',
    name: 'Sprint Start',
    targetArea: 'Legs, Core, Explosiveness',
    animationType: 'sprint-start',
    injuryFocus: 'Hamstring strength and hip mobility',
    instructions: 'Push off explosively from a low, forward-leaning position.'
  },
  {
    id: 'side-lunge',
    name: 'Side Lunge',
    targetArea: 'Inner Thighs, Glutes, Quads',
    animationType: 'side-lunge',
    injuryFocus: 'Groin flexibility and lateral stability',
    instructions: 'Step to the side and bend that knee while keeping the other leg straight.'
  },
  {
    id: 'plank',
    name: 'Plank',
    targetArea: 'Core, Shoulders',
    animationType: 'plank',
    injuryFocus: 'Core stability and lower back protection',
    instructions: 'Hold your body in a straight line supported by your forearms and toes.'
  }
];

export const sports = [
  {
    id: 'cricket',
    name: 'Cricket',
    description: 'Sport-specific strength, mobility and movement exercises',
    color: 'from-blue-500 to-indigo-600',
    exercises: ['cricket-bowling', 'squat', 'forward-lunge', 'single-leg-squat']
  },
  {
    id: 'football',
    name: 'Football',
    description: 'Lower-body strength, agility and injury-prevention exercises',
    color: 'from-green-500 to-emerald-600',
    exercises: ['squat', 'forward-lunge', 'single-leg-squat', 'jump-landing', 'sprint-start']
  },
  {
    id: 'athletics',
    name: 'Athletics',
    description: 'Running, sprinting, jumping and landing exercises',
    color: 'from-amber-500 to-orange-600',
    exercises: ['sprint-start', 'jump-landing', 'squat', 'single-leg-squat']
  },
  {
    id: 'kabaddi',
    name: 'Kabaddi',
    description: 'Agility, lateral movement and lower-body exercises',
    color: 'from-orange-500 to-red-600',
    exercises: ['side-lunge', 'squat', 'single-leg-squat', 'forward-lunge']
  },
  {
    id: 'basketball',
    name: 'Basketball',
    description: 'Jumping, landing, agility and strength exercises',
    color: 'from-orange-400 to-amber-500',
    exercises: ['jump-landing', 'squat', 'forward-lunge', 'single-leg-squat']
  },
  {
    id: 'badminton',
    name: 'Badminton',
    description: 'Lateral movement, balance and shoulder exercises',
    color: 'from-rose-500 to-pink-600',
    exercises: ['side-lunge', 'forward-lunge', 'single-leg-squat']
  },
  {
    id: 'cycling',
    name: 'Cycling',
    description: 'Cycling-specific mobility, strength and injury-prevention exercises',
    color: 'from-sky-500 to-blue-600',
    exercises: ['squat', 'forward-lunge', 'side-lunge']
  }
];

export const getExercise = (id: string) => exercises.find(e => e.id === id);
export const getExercisesForSport = (sportId: string) => {
  const sport = sports.find(s => s.id === sportId);
  if (!sport) return [];
  return sport.exercises.map(exId => exercises.find(e => e.id === exId)).filter(Boolean);
};

export const mockCycle = {
  phase: 'Luteal',
  day: 14,
  riskModifier: 5,
  description: 'Mid cycle',
  recommendation: 'Train normal'
};

export const cyclePhases = [
  {
    phase: 'Luteal',
    days: '14-28',
    description: 'Luteal phase',
    riskModifier: 5,
    color: 'bg-blue-500'
  }
];

export const mockAthlete = {
  currentRiskScore: 20,
  todayWorkout: 'Rest',
  formScore: 85,
  trainingLoad: 50,
  cycleDay: 14
};

export const recentAnalyses = [
  {
    score: 80,
    exercise: 'Squat',
    time: '2 hours ago',
    issues: []
  }
];

export interface FormScoreData {
  day: string;
  score: number;
}

export interface TrainingLoadData {
  day: string;
  load: number;
}

export interface RiskTrendData {
  week: string;
  risk: number;
}

export interface WorkoutCompletionData {
  day: string;
  completed: number;
}

export interface ProgressData {
  formScores: FormScoreData[];
  trainingLoad: TrainingLoadData[];
  riskTrend: RiskTrendData[];
  workoutCompletion: WorkoutCompletionData[];
}

export const progressData: ProgressData = {
  formScores: [
    { day: 'Mon', score: 82 },
    { day: 'Tue', score: 85 },
    { day: 'Wed', score: 79 },
    { day: 'Thu', score: 88 },
    { day: 'Fri', score: 86 },
    { day: 'Sat', score: 91 },
    { day: 'Sun', score: 89 },
  ],
  trainingLoad: [
    { day: 'Mon', load: 65 },
    { day: 'Tue', load: 75 },
    { day: 'Wed', load: 45 },
    { day: 'Thu', load: 80 },
    { day: 'Fri', load: 70 },
    { day: 'Sat', load: 85 },
    { day: 'Sun', load: 50 },
  ],
  riskTrend: [
    { week: 'Wk 1', risk: 38 },
    { week: 'Wk 2', risk: 32 },
    { week: 'Wk 3', risk: 28 },
    { week: 'Wk 4', risk: 25 },
  ],
  workoutCompletion: [
    { day: 'Mon', completed: 100 },
    { day: 'Tue', completed: 90 },
    { day: 'Wed', completed: 100 },
    { day: 'Thu', completed: 85 },
    { day: 'Fri', completed: 95 },
    { day: 'Sat', completed: 100 },
    { day: 'Sun', completed: 80 },
  ],
};

export const redScreeningQuestions = [
  {
    id: 1,
    question: 'Do you have regular menstrual cycles or have you noticed delayed or absent periods?',
    weight: 2
  },
  {
    id: 2,
    question: 'Do you often experience persistent fatigue, sluggishness, or slow recovery after routine training?',
    weight: 2
  },
  {
    id: 3,
    question: 'Have you suffered recurrent stress fractures, shin splints, or persistent joint pain?',
    weight: 3
  },
  {
    id: 4,
    question: 'Have you had unintentional weight loss, strict food restriction, or low energy availability?',
    weight: 2
  },
  {
    id: 5,
    question: 'Have you noticed a plateau or unexpected decline in your athletic performance despite consistent effort?',
    weight: 2
  }
];

export const fallbackResult: FormAnalysisResult = {
  formScore: 100,
  riskLevel: 'LOW',
  status: 'Excellent',
  detectedIssues: [],
  primaryIssue: 'None',
  correction: 'Keep it up',
  rawFeedback: []
};

export const analyzeFrame = async (base64: string, name: string, instructions: string): Promise<FormAnalysisResult> => {
  return fallbackResult;
};
