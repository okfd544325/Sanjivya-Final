import React, { useEffect, useState, useMemo } from 'react';

// ============================================================================
// GLOBAL SHARED ANIMATION TICKER
// Ensures 60fps silky smooth movement across all visible cards with 0% CPU waste
// ============================================================================
type TickCallback = (now: number) => void;
const subscribers = new Set<TickCallback>();
let sharedRafId: number | null = null;

function globalRafLoop(now: number) {
  subscribers.forEach((cb) => cb(now));
  if (subscribers.size > 0) {
    sharedRafId = requestAnimationFrame(globalRafLoop);
  } else {
    sharedRafId = null;
  }
}

function useSharedLoop(durationMs: number): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;

    const onTick: TickCallback = (now) => {
      if (startTime === null) startTime = now;
      const elapsed = (now - startTime) % durationMs;
      setProgress(elapsed / durationMs);
    };

    subscribers.add(onTick);
    if (!sharedRafId) {
      sharedRafId = requestAnimationFrame(globalRafLoop);
    }

    return () => {
      subscribers.delete(onTick);
    };
  }, [durationMs]);

  return progress;
}

// Cubic ease in-out helper for organic, natural human athletic rhythm
function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function easeInOutQuad(t: number): number {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

// Interpolate between an array of keyframes based on normalized time [0..1]
interface Keyframe {
  t: number; // 0 to 1
  [key: string]: number;
}

function interpolateKeyframes(frames: Keyframe[], progress: number): Record<string, number> {
  const p = progress % 1;
  let i = 0;
  while (i < frames.length - 1 && frames[i + 1].t <= p) {
    i++;
  }
  const curr = frames[i];
  const next = frames[(i + 1) % frames.length];
  
  const span = next.t > curr.t ? next.t - curr.t : 1 - curr.t + next.t;
  const localT = span > 0 ? (p >= curr.t ? (p - curr.t) / span : (1 - curr.t + p) / span) : 0;
  const eased = easeInOutCubic(Math.max(0, Math.min(1, localT)));

  const result: Record<string, number> = {};
  for (const k of Object.keys(curr)) {
    if (k === 't') continue;
    result[k] = lerp(curr[k], next[k], eased);
  }
  return result;
}

// ============================================================================
// ATHLETIC PALETTE & STYLING
// Premium female athletic fitness apparel (Nike / Apple Fitness+ aesthetic)
// ============================================================================
const PALETTE = {
  skin: '#f5c3a3',
  skinShadow: '#e3ad8b',
  hair: '#231e24',
  hairTie: '#ff545a',
  top: '#ff5a60',
  topShadow: '#e3474d',
  topBand: '#cc373d',
  waistband: '#1c2538',
  leggingsFront: '#293754',
  leggingsFrontShadow: '#212d45',
  leggingsFrontSeam: '#3d4f73',
  leggingsBack: '#1a2233',
  leggingsBackShadow: '#131926',
  shoeUpper: '#ffffff',
  shoeTrim: '#ff5a60',
  shoeMidsole: '#e2e8f0',
  shoeOutsole: '#64748b',
  groundShadow: 'rgba(15, 23, 42, 0.08)',
};

// ============================================================================
// REUSABLE 2D FEMALE ATHLETE VECTOR RENDERER
// Draws anatomically connected vector body parts with high-waist athletic leggings
// ============================================================================
interface LimbPose {
  hipX: number;
  hipY: number;
  kneeX: number;
  kneeY: number;
  ankleX: number;
  ankleY: number;
  footToeX: number;
  footToeY: number;
}

interface ArmPose {
  shoulderX: number;
  shoulderY: number;
  elbowX: number;
  elbowY: number;
  wristX: number;
  wristY: number;
}

interface AthletePose {
  // Center of mass & body
  hipX: number;
  hipY: number;
  torsoAngleDeg: number; // rotation in deg (0 = vertical)
  torsoLength?: number;
  
  // Head
  headAngleDeg?: number;
  ponytailSway?: number;
  
  // Limbs
  frontLeg: LimbPose;
  backLeg: LimbPose;
  frontArm: ArmPose;
  backArm: ArmPose;
  
  // Shadow
  shadowX?: number;
  shadowWidth?: number;
  shadowOpacity?: number;
}

function FemaleAthleteRig({ pose, facing = 'right' }: { pose: AthletePose; facing?: 'left' | 'right' }) {
  const torsoLen = pose.torsoLength ?? 42;
  const torsoRad = (pose.torsoAngleDeg * Math.PI) / 180;
  
  // Torso / Neck / Shoulder anchors
  const shoulderX = pose.hipX + Math.sin(torsoRad) * torsoLen;
  const shoulderY = pose.hipY - Math.cos(torsoRad) * torsoLen;

  const neckLen = 10;
  const neckX = shoulderX + Math.sin(torsoRad) * neckLen;
  const neckY = shoulderY - Math.cos(torsoRad) * neckLen;

  const headAngle = (pose.headAngleDeg ?? 0) * (Math.PI / 180);
  const headDist = 14;
  const headX = neckX + Math.sin(torsoRad + headAngle) * headDist;
  const headY = neckY - Math.cos(torsoRad + headAngle) * headDist;

  const flipX = facing === 'left' ? -1 : 1;
  const sway = (pose.ponytailSway ?? 0) * flipX;

  // Shadow parameters
  const shadowX = pose.shadowX ?? pose.hipX;
  const shadowW = pose.shadowWidth ?? 54;
  const shadowO = pose.shadowOpacity ?? 0.16;

  // Helpers for contoured leg polygon
  const createLegPath = (hipX: number, hipY: number, kneeX: number, kneeY: number, ankleX: number, ankleY: number, isBack = false) => {
    // Thigh vector
    const tdx = kneeX - hipX;
    const tdy = kneeY - hipY;
    const tlen = Math.hypot(tdx, tdy) || 1;
    const tnx = -tdy / tlen;
    const tny = tdx / tlen;

    // Calf vector
    const cdx = ankleX - kneeX;
    const cdy = ankleY - kneeY;
    const clen = Math.hypot(cdx, cdy) || 1;
    const cnx = -cdy / clen;
    const cny = cdx / clen;

    const thighW = 9.5;
    const kneeW = 6.2;
    const calfW = 6.5;
    const ankleW = 3.8;

    return `
      M ${hipX + tnx * thighW * 0.9} ${hipY + tny * thighW * 0.9}
      Q ${hipX + tdx * 0.5 + tnx * (thighW + 1.5)} ${hipY + tdy * 0.5 + tny * (thighW + 1.5)}
        ${kneeX + tnx * kneeW} ${kneeY + tny * kneeW}
      Q ${kneeX + cdx * 0.45 + cnx * (calfW + 1)} ${kneeY + cdy * 0.45 + cny * (calfW + 1)}
        ${ankleX + cnx * ankleW} ${ankleY + cny * ankleW}
      L ${ankleX - cnx * ankleW} ${ankleY - cny * ankleW}
      Q ${kneeX + cdx * 0.5 - cnx * (calfW * 0.7)} ${kneeY + cdy * 0.5 - cny * (calfW * 0.7)}
        ${kneeX - tnx * (kneeW * 0.9)} ${kneeY - tny * (kneeW * 0.9)}
      Q ${hipX + tdx * 0.5 - tnx * (thighW * 0.9)} ${hipY + tdy * 0.5 - tny * (thighW * 0.9)}
        ${hipX - tnx * (thighW * 0.8)} ${hipY - tny * (thighW * 0.8)}
      Z
    `;
  };

  // Contoured arm path
  const createArmPath = (sx: number, sy: number, ex: number, ey: number, wx: number, wy: number) => {
    const udx = ex - sx;
    const udy = ey - sy;
    const ulen = Math.hypot(udx, udy) || 1;
    const unx = -udy / ulen;
    const uny = udx / ulen;

    const fdx = wx - ex;
    const fdy = wy - ey;
    const flen = Math.hypot(fdx, fdy) || 1;
    const fnx = -fdy / flen;
    const fny = fdx / flen;

    const bicepW = 5.2;
    const elbowW = 4.0;
    const wristW = 2.8;

    return `
      M ${sx + unx * bicepW} ${sy + uny * bicepW}
      Q ${sx + udx * 0.5 + unx * (bicepW + 0.8)} ${sy + udy * 0.5 + uny * (bicepW + 0.8)}
        ${ex + unx * elbowW} ${ey + uny * elbowW}
      L ${wx + fnx * wristW} ${wy + fny * wristW}
      L ${wx - fnx * wristW} ${wy - fny * wristW}
      L ${ex - unx * elbowW} ${ey - uny * elbowW}
      Q ${sx + udx * 0.5 - unx * (bicepW * 0.8)} ${sy + udy * 0.5 - uny * (bicepW * 0.8)}
        ${sx - unx * (bicepW * 0.8)} ${sy - uny * (bicepW * 0.8)}
      Z
    `;
  };

  // Shoe / Sneaker path
  const renderShoe = (ankleX: number, ankleY: number, toeX: number, toeY: number, isBack = false) => {
    const fdx = toeX - ankleX;
    const fdy = toeY - ankleY;
    const len = Math.hypot(fdx, fdy) || 1;
    const nx = -fdy / len;
    const ny = fdx / len;

    const heelX = ankleX - fdx * 0.28 - nx * 1.5;
    const heelY = ankleY - fdy * 0.28 - ny * 1.5;
    const soleH = 3.5;

    const shoeFill = isBack ? '#e2e8f0' : PALETTE.shoeUpper;
    const soleColor = isBack ? '#475569' : PALETTE.shoeOutsole;

    return (
      <g key={isBack ? 'back-shoe' : 'front-shoe'}>
        {/* Sneaker Upper */}
        <path
          d={`
            M ${heelX} ${heelY}
            Q ${ankleX - nx * 3} ${ankleY - ny * 3} ${ankleX} ${ankleY - 1}
            Q ${ankleX + fdx * 0.4 - nx * 5} ${ankleY + fdy * 0.4 - ny * 5} ${toeX - nx * 1.5} ${toeY - ny * 1.5}
            L ${toeX} ${toeY}
            L ${toeX + nx * soleH} ${toeY + ny * soleH}
            L ${heelX + nx * soleH} ${heelY + ny * soleH}
            Z
          `}
          fill={shoeFill}
          stroke={isBack ? '#cbd5e1' : '#cbd5e1'}
          strokeWidth="0.75"
        />
        {/* Rubber Cushion Midsole */}
        <path
          d={`
            M ${heelX} ${heelY + 1}
            L ${toeX} ${toeY + 1}
            L ${toeX + nx * soleH} ${toeY + ny * soleH}
            L ${heelX + nx * soleH} ${heelY + ny * soleH}
            Z
          `}
          fill={isBack ? '#94a3b8' : PALETTE.shoeMidsole}
        />
        {/* Outsole Grip Tread */}
        <line
          x1={heelX + nx * (soleH - 0.5)}
          y1={heelY + ny * (soleH - 0.5)}
          x2={toeX + nx * (soleH - 0.5)}
          y2={toeY + ny * (soleH - 0.5)}
          stroke={soleColor}
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        {/* Athletic Accent Brand Stripe */}
        {!isBack && (
          <path
            d={`M ${ankleX + fdx * 0.15 - nx * 1} ${ankleY + fdy * 0.15 - ny * 1} Q ${ankleX + fdx * 0.45 - nx * 2.5} ${ankleY + fdy * 0.45 - ny * 2.5} ${toeX - fdx * 0.25 - nx * 0.5} ${toeY - fdy * 0.25 - ny * 0.5}`}
            stroke={PALETTE.shoeTrim}
            strokeWidth="1.6"
            fill="none"
            strokeLinecap="round"
          />
        )}
      </g>
    );
  };

  return (
    <g className="athlete-character">
      {/* Dynamic Ground Contact Shadow */}
      <ellipse
        cx={shadowX}
        cy={208}
        rx={shadowW * 0.5}
        ry={6}
        fill={`rgba(15, 23, 42, ${shadowO})`}
      />

      {/* 1. BACK ARM (Shaded) */}
      <g opacity={0.88}>
        <path
          d={createArmPath(
            pose.backArm.shoulderX,
            pose.backArm.shoulderY,
            pose.backArm.elbowX,
            pose.backArm.elbowY,
            pose.backArm.wristX,
            pose.backArm.wristY
          )}
          fill={PALETTE.skinShadow}
        />
        {/* Hand */}
        <circle cx={pose.backArm.wristX} cy={pose.backArm.wristY} r="3.2" fill={PALETTE.skinShadow} />
      </g>

      {/* 2. BACK LEG (Darker navy for distinct 3D depth separation) */}
      <g>
        <path
          d={createLegPath(
            pose.backLeg.hipX,
            pose.backLeg.hipY,
            pose.backLeg.kneeX,
            pose.backLeg.kneeY,
            pose.backLeg.ankleX,
            pose.backLeg.ankleY,
            true
          )}
          fill={PALETTE.leggingsBack}
        />
        {renderShoe(
          pose.backLeg.ankleX,
          pose.backLeg.ankleY,
          pose.backLeg.footToeX,
          pose.backLeg.footToeY,
          true
        )}
      </g>

      {/* 3. PELVIS / LEGGINGS HIGH WAISTBAND */}
      <path
        d={`
          M ${pose.hipX - 11} ${pose.hipY - 7}
          Q ${pose.hipX} ${pose.hipY - 9} ${pose.hipX + 11} ${pose.hipY - 7}
          Q ${pose.hipX + 12} ${pose.hipY + 5} ${pose.hipX + 6} ${pose.hipY + 9}
          Q ${pose.hipX} ${pose.hipY + 11} ${pose.hipX - 6} ${pose.hipY + 9}
          Q ${pose.hipX - 12} ${pose.hipY + 5} ${pose.hipX - 11} ${pose.hipY - 7}
          Z
        `}
        fill={PALETTE.waistband}
      />

      {/* 4. ATHLETIC TORSO & SPORTS CROP TANK */}
      {/* Midriff Skin */}
      <path
        d={`
          M ${pose.hipX - 8.5} ${pose.hipY - 6}
          L ${shoulderX - 8} ${shoulderY + 15}
          L ${shoulderX + 8} ${shoulderY + 15}
          L ${pose.hipX + 8.5} ${pose.hipY - 6}
          Z
        `}
        fill={PALETTE.skin}
      />
      {/* Sports Crop Top */}
      <path
        d={`
          M ${shoulderX - 11} ${shoulderY}
          Q ${shoulderX} ${shoulderY - 3} ${shoulderX + 11} ${shoulderY}
          Q ${shoulderX + 9.5} ${shoulderY + 12} ${shoulderX + 7.5} ${shoulderY + 18}
          L ${shoulderX - 7.5} ${shoulderY + 18}
          Q ${shoulderX - 9.5} ${shoulderY + 12} ${shoulderX - 11} ${shoulderY}
          Z
        `}
        fill={PALETTE.top}
      />
      {/* Sports Top Elastic Hem Band */}
      <path
        d={`
          M ${shoulderX - 8} ${shoulderY + 18}
          L ${shoulderX + 8} ${shoulderY + 18}
          L ${shoulderX + 7.6} ${shoulderY + 22}
          L ${shoulderX - 7.6} ${shoulderY + 22}
          Z
        `}
        fill={PALETTE.topBand}
      />
      {/* Racerback Neckline Accent */}
      <path
        d={`M ${shoulderX - 4} ${shoulderY + 1} Q ${shoulderX} ${shoulderY + 6} ${shoulderX + 4} ${shoulderY + 1}`}
        stroke={PALETTE.topBand}
        strokeWidth="1.2"
        fill="none"
      />

      {/* 5. NECK & HEAD */}
      {/* Neck */}
      <path
        d={`M ${neckX - 3.8} ${shoulderY + 1} L ${neckX - 3.2} ${neckY} L ${neckX + 3.2} ${neckY} L ${neckX + 3.8} ${shoulderY + 1} Z`}
        fill={PALETTE.skin}
      />
      {/* Head */}
      <circle cx={headX} cy={headY} r="11" fill={PALETTE.skin} />
      {/* Sleek Dark Hair Cap */}
      <path
        d={`
          M ${headX - 11} ${headY + 1}
          C ${headX - 11} ${headY - 11}, ${headX + 5} ${headY - 13}, ${headX + 11} ${headY - 4}
          C ${headX + 8} ${headY - 1}, ${headX + 5} ${headY - 2}, ${headX} ${headY - 1}
          C ${headX - 5} ${headY - 1}, ${headX - 9} ${headY + 3}, ${headX - 11} ${headY + 1}
          Z
        `}
        fill={PALETTE.hair}
      />
      {/* Athletic High Ponytail & Coral Hair Tie */}
      <circle cx={headX - 10 * flipX} cy={headY - 4} r="2.8" fill={PALETTE.hairTie} />
      <path
        d={`
          M ${headX - 11 * flipX} ${headY - 4}
          Q ${headX - (22 + sway) * flipX} ${headY - 1} ${headX - (25 + sway * 1.4) * flipX} ${headY + 14}
          Q ${headX - (20 + sway) * flipX} ${headY + 13} ${headX - 9 * flipX} ${headY - 2}
          Z
        `}
        fill={PALETTE.hair}
      />
      {/* Minimalist Profile Eye / Brow */}
      <path
        d={`M ${headX + 4 * flipX} ${headY - 1} Q ${headX + 7 * flipX} ${headY - 2} ${headX + 8 * flipX} ${headY}`}
        stroke={PALETTE.hair}
        strokeWidth="1"
        fill="none"
        strokeLinecap="round"
      />

      {/* 6. FRONT LEG (Primary rich navy leggings with contour highlight) */}
      <g>
        <path
          d={createLegPath(
            pose.frontLeg.hipX,
            pose.frontLeg.hipY,
            pose.frontLeg.kneeX,
            pose.frontLeg.kneeY,
            pose.frontLeg.ankleX,
            pose.frontLeg.ankleY,
            false
          )}
          fill={PALETTE.leggingsFront}
        />
        {/* Ergonomic Legging Seam Accent Line */}
        <path
          d={`
            M ${pose.frontLeg.hipX} ${pose.frontLeg.hipY + 2}
            Q ${pose.frontLeg.kneeX - 1} ${pose.frontLeg.kneeY} ${pose.frontLeg.kneeX} ${pose.frontLeg.kneeY + 2}
            Q ${pose.frontLeg.ankleX} ${pose.frontLeg.ankleY - 10} ${pose.frontLeg.ankleX} ${pose.frontLeg.ankleY}
          `}
          stroke={PALETTE.leggingsFrontSeam}
          strokeWidth="0.9"
          fill="none"
          strokeDasharray="4 2"
          opacity={0.65}
        />
        {renderShoe(
          pose.frontLeg.ankleX,
          pose.frontLeg.ankleY,
          pose.frontLeg.footToeX,
          pose.frontLeg.footToeY,
          false
        )}
      </g>

      {/* 7. FRONT ARM (Natural athletic foreground arm) */}
      <g>
        <path
          d={createArmPath(
            pose.frontArm.shoulderX,
            pose.frontArm.shoulderY,
            pose.frontArm.elbowX,
            pose.frontArm.elbowY,
            pose.frontArm.wristX,
            pose.frontArm.wristY
          )}
          fill={PALETTE.skin}
        />
        {/* Hand */}
        <circle cx={pose.frontArm.wristX} cy={pose.frontArm.wristY} r="3.4" fill={PALETTE.skin} />
      </g>
    </g>
  );
}

// Baseline Ground Component
function GroundLine() {
  return (
    <line
      x1="20"
      y1="210"
      x2="220"
      y2="210"
      stroke="#e2e8f0"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
  );
}

// ============================================================================
// 1. SQUAT ANIMATION
// Realistic continuous squat: Hips travel back & down, torso counterbalances,
// thighs reach parallel, knees track safely, heels stay planted.
// ============================================================================
function SquatAnimation() {
  const p = useSharedLoop(3000);
  // Cycle: Standing (0) -> Bottom (0.5) -> Standing (1.0)
  const norm = p < 0.5 ? p * 2 : (1 - p) * 2;
  const t = easeInOutCubic(norm);

  const pose: AthletePose = {
    // Center of mass lowers and shifts slightly back
    hipX: lerp(110, 84, t),
    hipY: lerp(102, 142, t),
    torsoAngleDeg: lerp(4, 38, t), // Forward lean to balance
    torsoLength: 42,
    headAngleDeg: lerp(0, -18, t), // Eyes stay forward
    ponytailSway: lerp(0, -6, t),

    // Front leg: Heel planted at 112, knee flexes to 92 deg, thigh parallel
    frontLeg: {
      hipX: lerp(110, 84, t),
      hipY: lerp(102, 142, t),
      kneeX: lerp(114, 134, t),
      kneeY: lerp(152, 146, t), // Knee stays strong, tracking over toes
      ankleX: 112,
      ankleY: 202,
      footToeX: 135,
      footToeY: 207,
    },

    // Back leg: Subtle depth offset
    backLeg: {
      hipX: lerp(106, 80, t),
      hipY: lerp(100, 140, t),
      kneeX: lerp(108, 128, t),
      kneeY: lerp(152, 144, t),
      ankleX: 104,
      ankleY: 202,
      footToeX: 127,
      footToeY: 207,
    },

    // Arms: Start bent near chest, extend forward as counterbalance during squat
    frontArm: {
      shoulderX: lerp(113, 110, t),
      shoulderY: lerp(60, 108, t),
      elbowX: lerp(128, 134, t),
      elbowY: lerp(75, 102, t),
      wristX: lerp(138, 154, t),
      wristY: lerp(66, 94, t),
    },
    backArm: {
      shoulderX: lerp(108, 105, t),
      shoulderY: lerp(58, 106, t),
      elbowX: lerp(122, 128, t),
      elbowY: lerp(73, 100, t),
      wristX: lerp(132, 148, t),
      wristY: lerp(64, 92, t),
    },

    shadowX: lerp(118, 108, t),
    shadowWidth: lerp(52, 68, t),
    shadowOpacity: lerp(0.14, 0.22, t),
  };

  return (
    <svg viewBox="0 0 240 240" className="w-full h-full">
      <GroundLine />
      <FemaleAthleteRig pose={pose} facing="right" />
    </svg>
  );
}

// ============================================================================
// 2. FORWARD LUNGE ANIMATION
// Standing -> Step into 90-degree front knee / back knee drop -> Push back
// ============================================================================
function ForwardLungeAnimation() {
  const p = useSharedLoop(3200);
  const norm = p < 0.5 ? p * 2 : (1 - p) * 2;
  const t = easeInOutCubic(norm);

  const pose: AthletePose = {
    hipX: lerp(115, 110, t),
    hipY: lerp(102, 138, t),
    torsoAngleDeg: lerp(2, 4, t), // Upright posture maintained
    torsoLength: 42,
    headAngleDeg: 0,
    ponytailSway: lerp(0, -3, t),

    // Front leg: Steps forward, 90 degree bend, knee over ankle
    frontLeg: {
      hipX: lerp(115, 110, t),
      hipY: lerp(102, 138, t),
      kneeX: lerp(118, 152, t),
      kneeY: lerp(152, 150, t),
      ankleX: lerp(112, 152, t),
      ankleY: 202,
      footToeX: lerp(135, 175, t),
      footToeY: 207,
    },

    // Back leg: Drops straight down toward floor, heel elevates on ball of foot
    backLeg: {
      hipX: lerp(108, 104, t),
      hipY: lerp(100, 136, t),
      kneeX: lerp(108, 76, t),
      kneeY: lerp(152, 185, t),
      ankleX: lerp(104, 56, t),
      ankleY: lerp(202, 196, t),
      footToeX: lerp(127, 48, t),
      footToeY: 207,
    },

    // Arms: Running athletic balance (front arm back, rear arm forward)
    frontArm: {
      shoulderX: lerp(116, 112, t),
      shoulderY: lerp(60, 96, t),
      elbowX: lerp(124, 102, t),
      elbowY: lerp(78, 114, t),
      wristX: lerp(134, 94, t),
      wristY: lerp(85, 132, t),
    },
    backArm: {
      shoulderX: lerp(110, 106, t),
      shoulderY: lerp(58, 94, t),
      elbowX: lerp(118, 126, t),
      elbowY: lerp(76, 112, t),
      wristX: lerp(128, 142, t),
      wristY: lerp(83, 98, t),
    },

    shadowX: lerp(112, 108, t),
    shadowWidth: lerp(50, 92, t),
    shadowOpacity: lerp(0.15, 0.22, t),
  };

  return (
    <svg viewBox="0 0 240 240" className="w-full h-full">
      <GroundLine />
      <FemaleAthleteRig pose={pose} facing="right" />
    </svg>
  );
}

// ============================================================================
// 3. SINGLE-LEG SQUAT ANIMATION
// Stays on supporting leg, free leg extends cleanly forward, arms reach forward
// ============================================================================
function SingleLegSquatAnimation() {
  const p = useSharedLoop(3200);
  const norm = p < 0.5 ? p * 2 : (1 - p) * 2;
  const t = easeInOutCubic(norm);

  const pose: AthletePose = {
    hipX: lerp(108, 86, t),
    hipY: lerp(102, 142, t),
    torsoAngleDeg: lerp(4, 32, t),
    torsoLength: 42,
    headAngleDeg: lerp(0, -12, t),
    ponytailSway: lerp(0, -4, t),

    // Supporting leg (Front Leg): Planted on floor, absorbs squat
    frontLeg: {
      hipX: lerp(108, 86, t),
      hipY: lerp(102, 142, t),
      kneeX: lerp(112, 130, t),
      kneeY: lerp(152, 148, t),
      ankleX: 110,
      ankleY: 202,
      footToeX: 133,
      footToeY: 207,
    },

    // Free leg (Back Leg): Extends forward in air above floor
    backLeg: {
      hipX: lerp(104, 82, t),
      hipY: lerp(100, 140, t),
      kneeX: lerp(122, 136, t),
      kneeY: lerp(154, 138, t),
      ankleX: lerp(126, 172, t),
      ankleY: lerp(190, 144, t),
      footToeX: lerp(138, 192, t),
      footToeY: lerp(192, 142, t),
    },

    // Arms: Reach forward for counterweight balance
    frontArm: {
      shoulderX: lerp(111, 108, t),
      shoulderY: lerp(60, 106, t),
      elbowX: lerp(126, 136, t),
      elbowY: lerp(74, 98, t),
      wristX: lerp(136, 160, t),
      wristY: lerp(66, 92, t),
    },
    backArm: {
      shoulderX: lerp(106, 103, t),
      shoulderY: lerp(58, 104, t),
      elbowX: lerp(120, 130, t),
      elbowY: lerp(72, 96, t),
      wristX: lerp(130, 154, t),
      wristY: lerp(64, 90, t),
    },

    shadowX: 114,
    shadowWidth: lerp(48, 62, t),
    shadowOpacity: lerp(0.14, 0.20, t),
  };

  return (
    <svg viewBox="0 0 240 240" className="w-full h-full">
      <GroundLine />
      <FemaleAthleteRig pose={pose} facing="right" />
    </svg>
  );
}

// ============================================================================
// 4. JUMP LANDING ANIMATION (Critical for ACL injury prevention)
// Prep dip -> Jump upward -> Flight -> Soft landing absorption with hips back
// and knees flexed safely tracking forward over toes.
// ============================================================================
function JumpLandingAnimation() {
  const p = useSharedLoop(2800);

  // Jump sequence keyframes:
  // 0.0: Standing
  // 0.15: Prep dip
  // 0.35: Apex of jump (airborne, feet off ground)
  // 0.60: Initial contact
  // 0.78: Deep landing absorption (knees 80 deg, safe tracking)
  // 1.0: Standing
  const frames: Keyframe[] = [
    { t: 0.0, hipY: 102, jumpH: 0, kneeF: 0, armExt: 0, torsoA: 3 },
    { t: 0.16, hipY: 124, jumpH: 0, kneeF: 0.6, armExt: -0.8, torsoA: 18 }, // Dip & arm swing back
    { t: 0.38, hipY: 70, jumpH: 42, kneeF: 0.1, armExt: 1.0, torsoA: -4 },  // Airborne apex, arms reach up
    { t: 0.58, hipY: 102, jumpH: 0, kneeF: 0.15, armExt: 0.4, torsoA: 6 },  // Initial ground touch
    { t: 0.76, hipY: 136, jumpH: 0, kneeF: 0.95, armExt: 0.6, torsoA: 26 }, // Deep, soft ACL landing absorption
    { t: 1.0, hipY: 102, jumpH: 0, kneeF: 0, armExt: 0, torsoA: 3 },
  ];

  const state = interpolateKeyframes(frames, p);
  const hipY = state.hipY;
  const jumpH = state.jumpH;
  const kf = state.kneeF;
  const arms = state.armExt;
  const torsoA = state.torsoA;

  const pose: AthletePose = {
    hipX: 112,
    hipY: hipY,
    torsoAngleDeg: torsoA,
    torsoLength: 42,
    headAngleDeg: torsoA > 15 ? -10 : 0,
    ponytailSway: jumpH > 10 ? 8 : -3,

    frontLeg: {
      hipX: 112,
      hipY: hipY,
      kneeX: lerp(114, 134, kf),
      kneeY: lerp(152, 150, kf) - jumpH * 0.4,
      ankleX: 112,
      ankleY: 202 - jumpH,
      footToeX: 135,
      footToeY: (207 - jumpH) + (jumpH > 5 ? 6 : 0), // Toes point slightly down in air
    },
    backLeg: {
      hipX: 107,
      hipY: hipY - 2,
      kneeX: lerp(109, 129, kf),
      kneeY: lerp(152, 148, kf) - jumpH * 0.4,
      ankleX: 107,
      ankleY: 202 - jumpH,
      footToeX: 130,
      footToeY: (207 - jumpH) + (jumpH > 5 ? 6 : 0),
    },

    frontArm: {
      shoulderX: 113,
      shoulderY: hipY - 42,
      elbowX: lerp(126, 142, (arms + 1) * 0.5),
      elbowY: lerp(75, 40, (arms + 1) * 0.5),
      wristX: lerp(136, 155, (arms + 1) * 0.5),
      wristY: lerp(70, 20, (arms + 1) * 0.5),
    },
    backArm: {
      shoulderX: 108,
      shoulderY: hipY - 44,
      elbowX: lerp(120, 136, (arms + 1) * 0.5),
      elbowY: lerp(73, 38, (arms + 1) * 0.5),
      wristX: lerp(130, 149, (arms + 1) * 0.5),
      wristY: lerp(68, 18, (arms + 1) * 0.5),
    },

    shadowX: 114,
    shadowWidth: jumpH > 0 ? lerp(52, 28, jumpH / 42) : lerp(52, 70, kf),
    shadowOpacity: jumpH > 0 ? lerp(0.16, 0.06, jumpH / 42) : lerp(0.16, 0.26, kf),
  };

  return (
    <svg viewBox="0 0 240 240" className="w-full h-full">
      <GroundLine />
      <FemaleAthleteRig pose={pose} facing="right" />
    </svg>
  );
}

// ============================================================================
// 5. SPRINT START ANIMATION
// Low drive block crouch -> Triple extension drive -> Knee drive forward
// ============================================================================
function SprintStartAnimation() {
  const p = useSharedLoop(2400);

  const frames: Keyframe[] = [
    { t: 0.0, drive: 0 },
    { t: 0.35, drive: 0.1 },  // Set position
    { t: 0.65, drive: 1.0 },  // Explosive drive
    { t: 0.85, drive: 0.8 },  // Stride follow
    { t: 1.0, drive: 0 },     // Reset
  ];

  const state = interpolateKeyframes(frames, p);
  const d = state.drive;

  const pose: AthletePose = {
    hipX: lerp(96, 132, d),
    hipY: lerp(136, 114, d),
    torsoAngleDeg: lerp(52, 42, d), // Aggressive forward drive lean
    torsoLength: 42,
    headAngleDeg: lerp(-25, -15, d),
    ponytailSway: lerp(-6, -18, d),

    // Front driving leg: Starts crouched, drives forward aggressively
    frontLeg: {
      hipX: lerp(96, 132, d),
      hipY: lerp(136, 114, d),
      kneeX: lerp(118, 168, d),
      kneeY: lerp(152, 118, d), // High knee drive!
      ankleX: lerp(104, 154, d),
      ankleY: lerp(202, 158, d),
      footToeX: lerp(126, 172, d),
      footToeY: lerp(205, 162, d),
    },

    // Rear push leg: Fully extends in powerful triple extension
    backLeg: {
      hipX: lerp(92, 128, d),
      hipY: lerp(134, 112, d),
      kneeX: lerp(74, 102, d),
      kneeY: lerp(165, 145, d),
      ankleX: lerp(52, 70, d),
      ankleY: lerp(200, 196, d),
      footToeX: lerp(45, 62, d),
      footToeY: 206,
    },

    // Powerful sprint arm drive (opposite arm to leg)
    frontArm: {
      shoulderX: lerp(126, 158, d),
      shoulderY: lerp(110, 88, d),
      elbowX: lerp(108, 184, d),
      elbowY: lerp(126, 88, d),
      wristX: lerp(96, 198, d),
      wristY: lerp(148, 76, d), // Lead arm punches forward
    },
    backArm: {
      shoulderX: lerp(122, 154, d),
      shoulderY: lerp(108, 86, d),
      elbowX: lerp(142, 124, d),
      elbowY: lerp(98, 122, d),
      wristX: lerp(156, 108, d),
      wristY: lerp(82, 146, d), // Rear arm swings back
    },

    shadowX: lerp(105, 138, d),
    shadowWidth: lerp(72, 85, d),
    shadowOpacity: 0.18,
  };

  return (
    <svg viewBox="0 0 240 240" className="w-full h-full">
      <GroundLine />
      <FemaleAthleteRig pose={pose} facing="right" />
    </svg>
  );
}

// ============================================================================
// 6. SIDE LUNGE (Lateral Lunge) ANIMATION
// Lateral shift: Bent working leg absorbs hip-hinge, trailing leg stays straight
// ============================================================================
function SideLungeAnimation() {
  const p = useSharedLoop(3000);
  const norm = p < 0.5 ? p * 2 : (1 - p) * 2;
  const t = easeInOutCubic(norm);

  const pose: AthletePose = {
    hipX: lerp(112, 138, t),
    hipY: lerp(102, 136, t),
    torsoAngleDeg: lerp(2, 16, t),
    torsoLength: 42,
    headAngleDeg: lerp(0, -6, t),
    ponytailSway: lerp(0, -4, t),

    // Working lateral leg: Flexes into 90 deg knee bend
    frontLeg: {
      hipX: lerp(112, 138, t),
      hipY: lerp(102, 136, t),
      kneeX: lerp(116, 166, t),
      kneeY: lerp(152, 152, t),
      ankleX: lerp(114, 162, t),
      ankleY: 202,
      footToeX: lerp(136, 184, t),
      footToeY: 207,
    },

    // Extended trailing leg: Stays fully straight, foot anchored
    backLeg: {
      hipX: lerp(108, 132, t),
      hipY: lerp(100, 134, t),
      kneeX: lerp(108, 98, t),
      kneeY: lerp(152, 172, t),
      ankleX: lerp(106, 68, t),
      ankleY: 202,
      footToeX: lerp(128, 90, t),
      footToeY: 207,
    },

    // Arms: Hands clasped at chest height for balance
    frontArm: {
      shoulderX: lerp(113, 132, t),
      shoulderY: lerp(60, 98, t),
      elbowX: lerp(126, 144, t),
      elbowY: lerp(76, 114, t),
      wristX: lerp(134, 146, t),
      wristY: lerp(66, 102, t),
    },
    backArm: {
      shoulderX: lerp(108, 126, t),
      shoulderY: lerp(58, 96, t),
      elbowX: lerp(120, 138, t),
      elbowY: lerp(74, 112, t),
      wristX: lerp(128, 142, t),
      wristY: lerp(64, 100, t),
    },

    shadowX: lerp(114, 136, t),
    shadowWidth: lerp(52, 88, t),
    shadowOpacity: lerp(0.15, 0.22, t),
  };

  return (
    <svg viewBox="0 0 240 240" className="w-full h-full">
      <GroundLine />
      <FemaleAthleteRig pose={pose} facing="right" />
    </svg>
  );
}

// ============================================================================
// 7. PLANK ANIMATION
// Controlled static / near-static hold: Straight body line, subtle diaphragmatic
// breathing motion without large disruptive movement.
// ============================================================================
function PlankAnimation() {
  const p = useSharedLoop(3600);
  // Gentle breathing wave
  const breath = Math.sin(p * Math.PI * 2);
  const bY = breath * 1.6;

  return (
    <svg viewBox="0 0 240 240" className="w-full h-full">
      <GroundLine />

      {/* Dynamic Floor Shadow */}
      <ellipse cx="120" cy="208" rx="84" ry="7" fill="rgba(15, 23, 42, 0.14)" />

      {/* Forearms on ground */}
      <g>
        {/* Back Forearm */}
        <line x1="172" y1="184" x2="198" y2="184" stroke={PALETTE.skinShadow} strokeWidth="5.5" strokeLinecap="round" />
        <circle cx="198" cy="184" r="3.2" fill={PALETTE.skinShadow} />

        {/* Back Leg (Navy) */}
        <path
          d={`
            M 112 ${162 + bY * 0.4}
            L 76 170
            L 48 180
            L 44 196
            L 50 196
            L 54 186
            L 80 178
            L 112 ${170 + bY * 0.4}
            Z
          `}
          fill={PALETTE.leggingsBack}
        />
        {/* Back Sneaker */}
        <path
          d="M 40 198 L 52 198 L 54 188 L 44 186 Z"
          fill="#cbd5e1"
        />

        {/* Front Leg (Leggings Navy) */}
        <path
          d={`
            M 116 ${160 + bY * 0.4}
            L 80 168
            L 52 178
            L 48 196
            L 54 196
            L 58 184
            L 84 176
            L 116 ${168 + bY * 0.4}
            Z
          `}
          fill={PALETTE.leggingsFront}
        />
        {/* Front Legging Seam */}
        <line x1="116" y1={164 + bY * 0.4} x2="52" y2="182" stroke={PALETTE.leggingsFrontSeam} strokeWidth="1" strokeDasharray="3 2" opacity={0.65} />
        {/* Front Sneaker Flexed on Toes */}
        <g>
          <path d="M 44 198 L 56 198 L 58 186 L 48 184 Z" fill={PALETTE.shoeUpper} />
          <line x1="44" y1="198" x2="56" y2="198" stroke={PALETTE.shoeOutsole} strokeWidth="2" strokeLinecap="round" />
        </g>

        {/* Pelvis & High Waistband */}
        <ellipse cx="116" cy={164 + bY * 0.4} rx="8" ry="7" fill={PALETTE.waistband} />

        {/* Torso & Sports Top (Straight Plank Alignment) */}
        {/* Midriff */}
        <path
          d={`
            M 116 ${158 + bY * 0.4}
            L 142 ${156 + bY * 0.8}
            L 142 ${168 + bY * 0.8}
            L 116 ${170 + bY * 0.4}
            Z
          `}
          fill={PALETTE.skin}
        />
        {/* Sports Top */}
        <path
          d={`
            M 140 ${155 + bY * 0.8}
            L 172 ${152 + bY}
            L 170 ${166 + bY}
            L 140 ${167 + bY * 0.8}
            Z
          `}
          fill={PALETTE.top}
        />
        <line x1="140" y1={155 + bY * 0.8} x2="140" y2={167 + bY * 0.8} stroke={PALETTE.topBand} strokeWidth="2.5" />

        {/* Upper Arm to Forearm (Vertical elbow stack under shoulder) */}
        <line x1="172" y1={154 + bY} x2="174" y2="185" stroke={PALETTE.skin} strokeWidth="6" strokeLinecap="round" />
        {/* Front Forearm on ground */}
        <line x1="174" y1="185" x2="202" y2="185" stroke={PALETTE.skin} strokeWidth="5.5" strokeLinecap="round" />
        <circle cx="202" cy="185" r="3.4" fill={PALETTE.skin} />

        {/* Neck & Head */}
        <line x1="174" y1={153 + bY} x2="186" y2={151 + bY} stroke={PALETTE.skin} strokeWidth="5" strokeLinecap="round" />
        <circle cx="196" cy={149 + bY} r="10.5" fill={PALETTE.skin} />
        {/* Ponytail swept horizontally in plank */}
        <path
          d={`
            M 190 ${141 + bY}
            C 192 ${138 + bY}, 203 ${140 + bY}, 204 ${148 + bY}
            C 200 ${147 + bY}, 194 ${146 + bY}, 190 ${147 + bY}
            Z
          `}
          fill={PALETTE.hair}
        />
        <circle cx="186" cy={145 + bY} r="2.5" fill={PALETTE.hairTie} />
        <path
          d={`
            M 185 ${145 + bY}
            Q 175 ${143 + bY + breath * 1.5} 165 ${148 + bY + breath * 1.8}
            Q 175 ${147 + bY} 186 ${147 + bY}
            Z
          `}
          fill={PALETTE.hair}
        />
      </g>
    </svg>
  );
}

// ============================================================================
// 8. CRICKET BOWLING ANIMATION
// Gather -> Full 360 classical windmill straight-arm rotation ->
// Braced front foot delivery -> Powerful trunk flexion & follow-through
// ============================================================================
function CricketBowlingAnimation() {
  const p = useSharedLoop(2600);

  const frames: Keyframe[] = [
    { t: 0.0, armA: -40, torsoA: 6, gather: 0 },
    { t: 0.25, armA: 70, torsoA: -10, gather: 0.4 },  // High gather & windup
    { t: 0.50, armA: 175, torsoA: -6, gather: 0.8 },  // Vertical release apex (12 o'clock)
    { t: 0.72, armA: 260, torsoA: 38, gather: 1.0 },  // Forceful follow-through over braced leg
    { t: 0.90, armA: 310, torsoA: 20, gather: 0.5 },  // Recovery stride
    { t: 1.0, armA: 320, torsoA: 6, gather: 0 },
  ];

  const state = interpolateKeyframes(frames, p);
  const armRad = ((state.armA - 90) * Math.PI) / 180;
  const torsoA = state.torsoA;
  const g = state.gather;

  const shoulderX = lerp(110, 134, g);
  const shoulderY = lerp(62, 88, g);
  const armLen = 34;

  const pose: AthletePose = {
    hipX: lerp(106, 126, g),
    hipY: lerp(102, 118, g),
    torsoAngleDeg: torsoA,
    torsoLength: 42,
    headAngleDeg: torsoA > 15 ? -14 : 0,
    ponytailSway: lerp(-4, -18, g),

    // Front braced landing leg: Plants firmly on ground
    frontLeg: {
      hipX: lerp(106, 126, g),
      hipY: lerp(102, 118, g),
      kneeX: lerp(116, 146, g),
      kneeY: lerp(152, 158, g),
      ankleX: lerp(112, 142, g),
      ankleY: 202,
      footToeX: lerp(135, 166, g),
      footToeY: 207,
    },

    // Back leg: Trails during gather, kicks through in follow-through
    backLeg: {
      hipX: lerp(100, 122, g),
      hipY: lerp(100, 116, g),
      kneeX: lerp(88, 86, g),
      kneeY: lerp(152, 150, g),
      ankleX: lerp(74, 60, g),
      ankleY: lerp(202, 185, g), // Kicks up behind in follow-through
      footToeX: lerp(96, 72, g),
      footToeY: lerp(207, 188, g),
    },

    // Right bowling arm: Classical high straight-arm bowling wheel rotation
    frontArm: {
      shoulderX: shoulderX,
      shoulderY: shoulderY,
      elbowX: shoulderX + Math.cos(armRad) * (armLen * 0.52),
      elbowY: shoulderY + Math.sin(armRad) * (armLen * 0.52),
      wristX: shoulderX + Math.cos(armRad) * armLen,
      wristY: shoulderY + Math.sin(armRad) * armLen,
    },

    // Left non-bowling arm: Guides target, pulls down into ribcage
    backArm: {
      shoulderX: shoulderX - 4,
      shoulderY: shoulderY - 2,
      elbowX: lerp(136, 118, g),
      elbowY: lerp(45, 102, g),
      wristX: lerp(152, 110, g),
      wristY: lerp(32, 118, g),
    },

    shadowX: lerp(112, 134, g),
    shadowWidth: lerp(54, 82, g),
    shadowOpacity: 0.18,
  };

  return (
    <svg viewBox="0 0 240 240" className="w-full h-full">
      <GroundLine />
      <FemaleAthleteRig pose={pose} facing="right" />
    </svg>
  );
}

// ============================================================================
// MASTER EXERCISE ANIMATION DISPATCHER
// Clean minimal background container, perfectly centered, zero layout shift
// ============================================================================
export default function ExerciseAnimation({ type, className }: { type: string; className?: string }) {
  const containerClass = `relative flex items-center justify-center bg-transparent rounded-xl overflow-hidden select-none ${className || 'w-28 h-28'}`;

  const renderAnimation = () => {
    switch (type) {
      case 'squat':
        return <SquatAnimation />;
      case 'forward-lunge':
        return <ForwardLungeAnimation />;
      case 'single-leg-squat':
        return <SingleLegSquatAnimation />;
      case 'jump-landing':
        return <JumpLandingAnimation />;
      case 'sprint-start':
        return <SprintStartAnimation />;
      case 'side-lunge':
        return <SideLungeAnimation />;
      case 'plank':
        return <PlankAnimation />;
      case 'cricket-bowling':
        return <CricketBowlingAnimation />;
      default:
        return <SquatAnimation />;
    }
  };

  return (
    <div className={containerClass} title={`${type} demonstration`}>
      {renderAnimation()}
    </div>
  );
}
