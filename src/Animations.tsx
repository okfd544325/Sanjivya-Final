// All 8 exercise animations as lightweight animated SVGs + dispatcher
export default function ExerciseAnimation({ type, className }: { type: string; className?: string }) {
  const map: Record<string, JSX.Element> = {
    squat: <Squat c={className} />,
    'single-leg-squat': <SingleLegSquat c={className} />,
    'forward-lunge': <ForwardLunge c={className} />,
    'jump-landing': <JumpLanding c={className} />,
    'side-lunge': <SideLunge c={className} />,
    plank: <Plank c={className} />,
    'cricket-bowling': <CricketBowling c={className} />,
    'sprint-start': <SprintStart c={className} />,
  };
  return map[type] ?? <Squat c={className} />;
}

const G = (id: string) => (
  <defs><linearGradient id={id} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#3393ff" /><stop offset="100%" stopColor="#10b981" /></linearGradient></defs>
);
const Ground = () => <line x1="20" y1="170" x2="180" y2="170" stroke="#e2e8f0" strokeWidth="2" />;

function Squat({ c }: { c?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={c} xmlns="http://www.w3.org/2000/svg">
      {G('g1')}<Ground />
      <circle cx="100" cy="55" r="12" fill="url(#g1)"><animate attributeName="cy" values="55;75;55" dur="2.5s" repeatCount="indefinite" /></circle>
      <line x1="100" y1="67" x2="100" y2="110" stroke="url(#g1)" strokeWidth="6" strokeLinecap="round"><animate attributeName="y1" values="67;87;67" dur="2.5s" repeatCount="indefinite" /><animate attributeName="y2" values="110;115;110" dur="2.5s" repeatCount="indefinite" /></line>
      <line x1="100" y1="80" x2="130" y2="85" stroke="url(#g1)" strokeWidth="4" strokeLinecap="round"><animate attributeName="x2" values="130;135;130" dur="2.5s" repeatCount="indefinite" /><animate attributeName="y2" values="85;100;85" dur="2.5s" repeatCount="indefinite" /></line>
      <line x1="100" y1="80" x2="70" y2="85" stroke="url(#g1)" strokeWidth="4" strokeLinecap="round"><animate attributeName="x2" values="70;65;70" dur="2.5s" repeatCount="indefinite" /><animate attributeName="y2" values="85;100;85" dur="2.5s" repeatCount="indefinite" /></line>
      <circle cx="100" cy="110" r="5" fill="url(#g1)"><animate attributeName="cy" values="110;115;110" dur="2.5s" repeatCount="indefinite" /></circle>
      <line x1="100" y1="115" x2="85" y2="145" stroke="url(#g1)" strokeWidth="5" strokeLinecap="round"><animate attributeName="y2" values="145;130;145" dur="2.5s" repeatCount="indefinite" /></line>
      <line x1="85" y1="145" x2="85" y2="170" stroke="url(#g1)" strokeWidth="5" strokeLinecap="round"><animate attributeName="y1" values="145;130;145" dur="2.5s" repeatCount="indefinite" /></line>
      <line x1="100" y1="115" x2="115" y2="145" stroke="url(#g1)" strokeWidth="5" strokeLinecap="round"><animate attributeName="y2" values="145;130;145" dur="2.5s" repeatCount="indefinite" /></line>
      <line x1="115" y1="145" x2="115" y2="170" stroke="url(#g1)" strokeWidth="5" strokeLinecap="round"><animate attributeName="y1" values="145;130;145" dur="2.5s" repeatCount="indefinite" /></line>
    </svg>
  );
}

function SingleLegSquat({ c }: { c?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={c} xmlns="http://www.w3.org/2000/svg">
      {G('g2')}<Ground />
      <circle cx="100" cy="55" r="11" fill="url(#g2)"><animate attributeName="cy" values="55;70;55" dur="2.5s" repeatCount="indefinite" /></circle>
      <line x1="100" y1="66" x2="100" y2="105" stroke="url(#g2)" strokeWidth="6" strokeLinecap="round"><animate attributeName="y1" values="66;81;66" dur="2.5s" repeatCount="indefinite" /><animate attributeName="y2" values="105;112;105" dur="2.5s" repeatCount="indefinite" /></line>
      <line x1="100" y1="75" x2="135" y2="70" stroke="url(#g2)" strokeWidth="4" strokeLinecap="round"><animate attributeName="y1" values="75;90;75" dur="2.5s" repeatCount="indefinite" /><animate attributeName="y2" values="70;85;70" dur="2.5s" repeatCount="indefinite" /></line>
      <line x1="100" y1="75" x2="65" y2="70" stroke="url(#g2)" strokeWidth="4" strokeLinecap="round"><animate attributeName="y1" values="75;90;75" dur="2.5s" repeatCount="indefinite" /><animate attributeName="y2" values="70;85;70" dur="2.5s" repeatCount="indefinite" /></line>
      <line x1="100" y1="112" x2="105" y2="145" stroke="url(#g2)" strokeWidth="5" strokeLinecap="round"><animate attributeName="y2" values="145;130;145" dur="2.5s" repeatCount="indefinite" /></line>
      <line x1="105" y1="145" x2="105" y2="170" stroke="url(#g2)" strokeWidth="5" strokeLinecap="round"><animate attributeName="y1" values="145;130;145" dur="2.5s" repeatCount="indefinite" /></line>
      <line x1="100" y1="112" x2="75" y2="120" stroke="url(#g2)" strokeWidth="4" strokeLinecap="round" opacity="0.7" />
    </svg>
  );
}

function ForwardLunge({ c }: { c?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={c} xmlns="http://www.w3.org/2000/svg">
      {G('g3')}<Ground />
      <circle cx="100" cy="50" r="11" fill="url(#g3)"><animate attributeName="cy" values="50;58;50" dur="2.5s" repeatCount="indefinite" /></circle>
      <line x1="100" y1="61" x2="100" y2="105" stroke="url(#g3)" strokeWidth="6" strokeLinecap="round"><animate attributeName="y1" values="61;69;61" dur="2.5s" repeatCount="indefinite" /><animate attributeName="y2" values="105;113;105" dur="2.5s" repeatCount="indefinite" /></line>
      <line x1="100" y1="75" x2="120" y2="90" stroke="url(#g3)" strokeWidth="4" strokeLinecap="round"><animate attributeName="y1" values="75;83;75" dur="2.5s" repeatCount="indefinite" /><animate attributeName="y2" values="90;100;90" dur="2.5s" repeatCount="indefinite" /></line>
      <line x1="100" y1="75" x2="80" y2="90" stroke="url(#g3)" strokeWidth="4" strokeLinecap="round"><animate attributeName="y1" values="75;83;75" dur="2.5s" repeatCount="indefinite" /><animate attributeName="y2" values="90;100;90" dur="2.5s" repeatCount="indefinite" /></line>
      <line x1="100" y1="113" x2="130" y2="140" stroke="url(#g3)" strokeWidth="5" strokeLinecap="round"><animate attributeName="x2" values="115;130;115" dur="2.5s" repeatCount="indefinite" /><animate attributeName="y2" values="155;140;155" dur="2.5s" repeatCount="indefinite" /></line>
      <line x1="130" y1="140" x2="135" y2="170" stroke="url(#g3)" strokeWidth="5" strokeLinecap="round"><animate attributeName="x1" values="115;130;115" dur="2.5s" repeatCount="indefinite" /><animate attributeName="y1" values="155;140;155" dur="2.5s" repeatCount="indefinite" /><animate attributeName="x2" values="120;135;120" dur="2.5s" repeatCount="indefinite" /></line>
      <line x1="100" y1="113" x2="80" y2="155" stroke="url(#g3)" strokeWidth="5" strokeLinecap="round"><animate attributeName="y2" values="150;155;150" dur="2.5s" repeatCount="indefinite" /></line>
      <line x1="80" y1="155" x2="70" y2="170" stroke="url(#g3)" strokeWidth="5" strokeLinecap="round"><animate attributeName="y1" values="150;155;150" dur="2.5s" repeatCount="indefinite" /></line>
    </svg>
  );
}

function JumpLanding({ c }: { c?: string }) {
  const k = "0;0.3;0.5;0.55;0.8;1";
  return (
    <svg viewBox="0 0 200 200" className={c} xmlns="http://www.w3.org/2000/svg">
      {G('g4')}<Ground />
      <circle cx="100" cy="50" r="11" fill="url(#g4)"><animate attributeName="cy" values="30;75;55;75;55;30" dur="3s" repeatCount="indefinite" keyTimes={k} /></circle>
      <line x1="100" y1="61" x2="100" y2="105" stroke="url(#g4)" strokeWidth="6" strokeLinecap="round"><animate attributeName="y1" values="41;86;66;86;66;41" dur="3s" repeatCount="indefinite" keyTimes={k} /><animate attributeName="y2" values="105;116;116;116;116;105" dur="3s" repeatCount="indefinite" keyTimes={k} /></line>
      <line x1="100" y1="70" x2="125" y2="45" stroke="url(#g4)" strokeWidth="4" strokeLinecap="round"><animate attributeName="y1" values="50;95;75;95;75;50" dur="3s" repeatCount="indefinite" keyTimes={k} /><animate attributeName="y2" values="25;120;100;120;100;25" dur="3s" repeatCount="indefinite" keyTimes={k} /></line>
      <line x1="100" y1="70" x2="75" y2="45" stroke="url(#g4)" strokeWidth="4" strokeLinecap="round"><animate attributeName="y1" values="50;95;75;95;75;50" dur="3s" repeatCount="indefinite" keyTimes={k} /><animate attributeName="y2" values="25;120;100;120;100;25" dur="3s" repeatCount="indefinite" keyTimes={k} /></line>
      <line x1="100" y1="116" x2="85" y2="145" stroke="url(#g4)" strokeWidth="5" strokeLinecap="round"><animate attributeName="y2" values="110;140;150;140;150;110" dur="3s" repeatCount="indefinite" keyTimes={k} /></line>
      <line x1="85" y1="145" x2="85" y2="170" stroke="url(#g4)" strokeWidth="5" strokeLinecap="round"><animate attributeName="y1" values="110;140;150;140;150;110" dur="3s" repeatCount="indefinite" keyTimes={k} /></line>
      <line x1="100" y1="116" x2="115" y2="145" stroke="url(#g4)" strokeWidth="5" strokeLinecap="round"><animate attributeName="y2" values="110;140;150;140;150;110" dur="3s" repeatCount="indefinite" keyTimes={k} /></line>
      <line x1="115" y1="145" x2="115" y2="170" stroke="url(#g4)" strokeWidth="5" strokeLinecap="round"><animate attributeName="y1" values="110;140;150;140;150;110" dur="3s" repeatCount="indefinite" keyTimes={k} /></line>
    </svg>
  );
}

function SideLunge({ c }: { c?: string }) {
  const k = "0;0.25;0.5;0.75;1";
  return (
    <svg viewBox="0 0 200 200" className={c} xmlns="http://www.w3.org/2000/svg">
      {G('g5')}<Ground />
      <circle cx="100" cy="50" r="11" fill="url(#g5)"><animate attributeName="cx" values="100;130;100;70;100" dur="3.5s" repeatCount="indefinite" keyTimes={k} /><animate attributeName="cy" values="50;65;50;65;50" dur="3.5s" repeatCount="indefinite" keyTimes={k} /></circle>
      <line x1="100" y1="61" x2="100" y2="105" stroke="url(#g5)" strokeWidth="6" strokeLinecap="round"><animate attributeName="x1" values="100;130;100;70;100" dur="3.5s" repeatCount="indefinite" keyTimes={k} /><animate attributeName="x2" values="100;130;100;70;100" dur="3.5s" repeatCount="indefinite" keyTimes={k} /><animate attributeName="y1" values="61;76;61;76;61" dur="3.5s" repeatCount="indefinite" keyTimes={k} /><animate attributeName="y2" values="105;120;105;120;105" dur="3.5s" repeatCount="indefinite" keyTimes={k} /></line>
      <line x1="100" y1="75" x2="130" y2="70" stroke="url(#g5)" strokeWidth="4" strokeLinecap="round"><animate attributeName="x1" values="100;130;100;70;100" dur="3.5s" repeatCount="indefinite" keyTimes={k} /><animate attributeName="y1" values="75;90;75;90;75" dur="3.5s" repeatCount="indefinite" keyTimes={k} /></line>
      <line x1="100" y1="75" x2="70" y2="70" stroke="url(#g5)" strokeWidth="4" strokeLinecap="round"><animate attributeName="x1" values="100;130;100;70;100" dur="3.5s" repeatCount="indefinite" keyTimes={k} /><animate attributeName="y1" values="75;90;75;90;75" dur="3.5s" repeatCount="indefinite" keyTimes={k} /></line>
      <line x1="100" y1="120" x2="130" y2="150" stroke="url(#g5)" strokeWidth="5" strokeLinecap="round"><animate attributeName="x1" values="100;130;100;70;100" dur="3.5s" repeatCount="indefinite" keyTimes={k} /><animate attributeName="x2" values="130;150;130;50;130" dur="3.5s" repeatCount="indefinite" keyTimes={k} /></line>
      <line x1="150" y1="150" x2="155" y2="170" stroke="url(#g5)" strokeWidth="5" strokeLinecap="round"><animate attributeName="x1" values="130;150;130;50;130" dur="3.5s" repeatCount="indefinite" keyTimes={k} /><animate attributeName="x2" values="135;155;135;45;135" dur="3.5s" repeatCount="indefinite" keyTimes={k} /></line>
      <line x1="100" y1="120" x2="70" y2="170" stroke="url(#g5)" strokeWidth="5" strokeLinecap="round"><animate attributeName="x1" values="100;130;100;70;100" dur="3.5s" repeatCount="indefinite" keyTimes={k} /></line>
    </svg>
  );
}

function Plank({ c }: { c?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={c} xmlns="http://www.w3.org/2000/svg">
      <defs><linearGradient id="g6" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#3393ff" /><stop offset="100%" stopColor="#10b981" /></linearGradient></defs>
      <Ground />
      <circle cx="55" cy="130" r="10" fill="url(#g6)"><animate attributeName="cy" values="128;132;128" dur="2s" repeatCount="indefinite" /></circle>
      <line x1="65" y1="132" x2="150" y2="138" stroke="url(#g6)" strokeWidth="7" strokeLinecap="round"><animate attributeName="y1" values="130;134;130" dur="2s" repeatCount="indefinite" /><animate attributeName="y2" values="136;140;136" dur="2s" repeatCount="indefinite" /></line>
      <line x1="60" y1="138" x2="55" y2="165" stroke="url(#g6)" strokeWidth="5" strokeLinecap="round"><animate attributeName="y1" values="136;140;136" dur="2s" repeatCount="indefinite" /></line>
      <line x1="50" y1="165" x2="72" y2="165" stroke="url(#g6)" strokeWidth="5" strokeLinecap="round" />
      <line x1="150" y1="140" x2="155" y2="170" stroke="url(#g6)" strokeWidth="5" strokeLinecap="round"><animate attributeName="y1" values="136;140;136" dur="2s" repeatCount="indefinite" /></line>
    </svg>
  );
}

function CricketBowling({ c }: { c?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={c} xmlns="http://www.w3.org/2000/svg">
      {G('g7')}<Ground />
      <circle cx="100" cy="45" r="11" fill="url(#g7)"><animate attributeName="cy" values="45;48;45" dur="2s" repeatCount="indefinite" /></circle>
      <line x1="100" y1="56" x2="100" y2="110" stroke="url(#g7)" strokeWidth="6" strokeLinecap="round"><animate attributeName="x1" values="100;95;100" dur="2s" repeatCount="indefinite" /><animate attributeName="x2" values="100;105;100" dur="2s" repeatCount="indefinite" /></line>
      <line x1="100" y1="65" x2="130" y2="30" stroke="url(#g7)" strokeWidth="4" strokeLinecap="round"><animate attributeName="x2" values="70;150;130;70" dur="2s" repeatCount="indefinite" keyTimes="0;0.33;0.66;1" /><animate attributeName="y2" values="80;20;30;80" dur="2s" repeatCount="indefinite" keyTimes="0;0.33;0.66;1" /></line>
      <circle cx="130" cy="30" r="4" fill="#ef4444"><animate attributeName="cx" values="70;150;130;70" dur="2s" repeatCount="indefinite" keyTimes="0;0.33;0.66;1" /><animate attributeName="cy" values="80;20;30;80" dur="2s" repeatCount="indefinite" keyTimes="0;0.33;0.66;1" /></circle>
      <line x1="100" y1="65" x2="75" y2="80" stroke="url(#g7)" strokeWidth="4" strokeLinecap="round"><animate attributeName="x2" values="75;120;75;120" dur="2s" repeatCount="indefinite" keyTimes="0;0.33;0.66;1" /><animate attributeName="y2" values="80;70;80;70" dur="2s" repeatCount="indefinite" keyTimes="0;0.33;0.66;1" /></line>
      <line x1="105" y1="110" x2="125" y2="170" stroke="url(#g7)" strokeWidth="5" strokeLinecap="round" />
      <line x1="95" y1="110" x2="75" y2="165" stroke="url(#g7)" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

function SprintStart({ c }: { c?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={c} xmlns="http://www.w3.org/2000/svg">
      {G('g8')}<Ground />
      <line x1="30" y1="120" x2="50" y2="120" stroke="#cbd5e1" strokeWidth="1" opacity="0.5"><animate attributeName="x1" values="10;30;10" dur="0.5s" repeatCount="indefinite" /><animate attributeName="x2" values="30;50;30" dur="0.5s" repeatCount="indefinite" /></line>
      <line x1="25" y1="140" x2="45" y2="140" stroke="#cbd5e1" strokeWidth="1" opacity="0.5"><animate attributeName="x1" values="5;25;5" dur="0.5s" repeatCount="indefinite" /><animate attributeName="x2" values="25;45;25" dur="0.5s" repeatCount="indefinite" /></line>
      <circle cx="110" cy="60" r="11" fill="url(#g8)"><animate attributeName="cx" values="100;115;120" dur="1.5s" repeatCount="indefinite" /><animate attributeName="cy" values="65;55;50" dur="1.5s" repeatCount="indefinite" /></circle>
      <line x1="100" y1="76" x2="95" y2="120" stroke="url(#g8)" strokeWidth="6" strokeLinecap="round"><animate attributeName="x1" values="90;110;115" dur="1.5s" repeatCount="indefinite" /><animate attributeName="x2" values="90;100;105" dur="1.5s" repeatCount="indefinite" /><animate attributeName="y1" values="81;71;66" dur="1.5s" repeatCount="indefinite" /></line>
      <line x1="100" y1="85" x2="130" y2="75" stroke="url(#g8)" strokeWidth="4" strokeLinecap="round"><animate attributeName="x1" values="90;110;115" dur="1.5s" repeatCount="indefinite" /><animate attributeName="y1" values="90;80;75" dur="1.5s" repeatCount="indefinite" /><animate attributeName="x2" values="120;135;140" dur="1.5s" repeatCount="indefinite" /><animate attributeName="y2" values="95;70;60" dur="1.5s" repeatCount="indefinite" /></line>
      <line x1="100" y1="85" x2="75" y2="100" stroke="url(#g8)" strokeWidth="4" strokeLinecap="round"><animate attributeName="x1" values="90;110;115" dur="1.5s" repeatCount="indefinite" /><animate attributeName="y1" values="90;80;75" dur="1.5s" repeatCount="indefinite" /><animate attributeName="x2" values="65;80;85" dur="1.5s" repeatCount="indefinite" /><animate attributeName="y2" values="115;95;85" dur="1.5s" repeatCount="indefinite" /></line>
      <line x1="95" y1="120" x2="130" y2="140" stroke="url(#g8)" strokeWidth="5" strokeLinecap="round"><animate attributeName="x1" values="90;100;105" dur="1.5s" repeatCount="indefinite" /><animate attributeName="x2" values="110;140;155" dur="1.5s" repeatCount="indefinite" /><animate attributeName="y2" values="155;135;120" dur="1.5s" repeatCount="indefinite" /></line>
      <line x1="95" y1="120" x2="70" y2="160" stroke="url(#g8)" strokeWidth="5" strokeLinecap="round"><animate attributeName="x1" values="90;100;105" dur="1.5s" repeatCount="indefinite" /><animate attributeName="x2" values="60;75;90" dur="1.5s" repeatCount="indefinite" /><animate attributeName="y2" values="170;155;140" dur="1.5s" repeatCount="indefinite" /></line>
    </svg>
  );
}
