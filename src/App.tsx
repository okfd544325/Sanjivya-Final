import { Routes, Route } from 'react-router-dom';
import { Layout, Dashboard, Sports, ExerciseLibrary, LiveFormAnalysis, AnalysisResult, CycleRisk, RedScreening, Progress } from './Pages';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/sports" element={<Sports />} />
        <Route path="/exercises" element={<ExerciseLibrary />} />
        <Route path="/analysis" element={<LiveFormAnalysis />} />
        <Route path="/result" element={<AnalysisResult />} />
        <Route path="/cycle" element={<CycleRisk />} />
        <Route path="/screening" element={<RedScreening />} />
        <Route path="/progress" element={<Progress />} />
      </Route>
    </Routes>
  );
}
