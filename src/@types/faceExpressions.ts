const smile = {
  browInnerUp: 0.17,
  eyeSquintLeft: 0.4,
  eyeSquintRight: 0.44,
  noseSneerLeft: 0.1700000727403593,
  noseSneerRight: 0.14000002836874015,
  mouthPressLeft: 0.61,
  mouthPressRight: 0.41000000000000003,
};
const funnyFace = {
  jawLeft: 0.63,
  mouthPucker: 0.53,
  noseSneerLeft: 1,
  noseSneerRight: 0.39,
  mouthLeft: 1,
  eyeLookUpLeft: 1,
  eyeLookUpRight: 1,
  cheekPuff: 0.9999924982764238,
  mouthDimpleLeft: 0.414743888682652,
  mouthRollLower: 0.32,
  mouthSmileLeft: 0.35499733688813034,
  mouthSmileRight: 0.35499733688813034,
};
const sad = {
  mouthFrownLeft: 1,
  mouthFrownRight: 1,
  mouthShrugLower: 0.78341,
  browInnerUp: 0.452,
  eyeSquintLeft: 0.72,
  eyeSquintRight: 0.75,
  eyeLookDownLeft: 0.5,
  eyeLookDownRight: 0.5,
  jawForward: 1,
};
const surprised = {
  eyeWideLeft: 0.5,
  eyeWideRight: 0.5,
  jawOpen: 0.351,
  mouthFunnel: 1,
  browInnerUp: 1,
};
const angry = {
  browDownLeft: 1,
  browDownRight: 1,
  eyeSquintLeft: 1,
  eyeSquintRight: 1,
  jawForward: 1,
  jawLeft: 1,
  mouthShrugLower: 1,
  noseSneerLeft: 1,
  noseSneerRight: 0.42,
  eyeLookDownLeft: 0.16,
  eyeLookDownRight: 0.16,
  cheekSquintLeft: 1,
  cheekSquintRight: 1,
  mouthClose: 0.23,
  mouthFunnel: 0.63,
  mouthDimpleRight: 1,
};
const crazy = {
  browInnerUp: 0.9,
  jawForward: 1,
  noseSneerLeft: 0.5700000000000001,
  noseSneerRight: 0.51,
  eyeLookDownLeft: 0.39435766259644545,
  eyeLookUpRight: 0.4039761421719682,
  eyeLookInLeft: 0.9618479575523053,
  eyeLookInRight: 0.9618479575523053,
  jawOpen: 0.9618479575523053,
  mouthDimpleLeft: 0.9618479575523053,
  mouthDimpleRight: 0.9618479575523053,
  mouthStretchLeft: 0.27893590769016857,
  mouthStretchRight: 0.2885543872656917,
  mouthSmileLeft: 0.5578718153803371,
  mouthSmileRight: 0.38473918302092225,
  tongueOut: 0.9618479575523053,
};

const defaultExpression = {
  browDownLeft: 0,
  browDownRight: 0,
  browInnerUp: 0,
  browOuterUpLeft: 0,
  browOuterUpRight: 0,
  cheekPuff: 0,
  cheekSquintLeft: 0,
  cheekSquintRight: 0,
  eyeBlinkLeft: 0,
  eyeBlinkRight: 0,
  eyeLookDownLeft: 0,
  eyeLookDownRight: 0,
  eyeLookInLeft: 0,
  eyeLookInRight: 0,
  eyeLookOutLeft: 0,
  eyeLookOutRight: 0,
  eyeLookUpLeft: 0,
  eyeLookUpRight: 0,
  eyeSquintLeft: 0,
  eyeSquintRight: 0,
  eyeWideLeft: 0,
  eyeWideRight: 0,
  jawForward: 0,
  jawLeft: 0,
  jawOpen: 0,
  jawRight: 0,
  mouthClose: 0,
  mouthDimpleLeft: 0,
  mouthDimpleRight: 0,
  mouthFrownLeft: 0,
  mouthFrownRight: 0,
  mouthFunnel: 0,
  mouthLeft: 0,
  mouthLowerDownLeft: 0,
  mouthLowerDownRight: 0,
  mouthPressLeft: 0,
  mouthPressRight: 0,
  mouthPucker: 0,
  mouthRight: 0,
  mouthRollLower: 0,
  mouthRollUpper: 0,
  mouthShrugLower: 0,
  mouthShrugUpper: 0,
  mouthSmileLeft: 0,
  mouthSmileRight: 0,
  mouthStretchLeft: 0,
  mouthStretchRight: 0,
  mouthUpperUpLeft: 0,
  mouthUpperUpRight: 0,
  noseSneerLeft: 0,
  noseSneerRight: 0,
  tongueOut: 0,
  viseme_CH: 0,
  viseme_DD: 0,
  viseme_E: 0,
  viseme_FF: 0,
  viseme_I: 0,
  viseme_O: 0,
  viseme_PP: 0,
  viseme_RR: 0,
  viseme_SS: 0,
  viseme_TH: 0,
  viseme_U: 0,
  viseme_aa: 0,
  viseme_kk: 0,
  viseme_nn: 0,
  viseme_sil: 0,
};
export const facialExpressions = {
  default: defaultExpression,
  smile: smile,
  funnyFace: funnyFace,
  sad: sad,
  surprised: surprised,
  angry: angry,
  crazy: crazy,
};
type PartialExpressionType<T> = {
  [P in keyof T]?: T[P];
};

export type FacialExpressionsType = typeof facialExpressions;

type OptionalExpressions = {
  [K in keyof FacialExpressionsType]: PartialExpressionType<
    FacialExpressionsType[K]
  >;
};

export type ExpressionType = OptionalExpressions[keyof OptionalExpressions];
type ExpressionKeys = keyof ExpressionType;

type ExpressionKeyStrings = `${ExpressionKeys}`;

export type ExpressionsKeyManual =
  | "browDownLeft"
  | "browDownRight"
  | "browInnerUp"
  | "browOuterUpLeft"
  | "browOuterUpRight"
  | "cheekPuff"
  | "cheekSquintLeft"
  | "cheekSquintRight"
  | "eyeBlinkLeft"
  | "eyeBlinkRight"
  | "eyeLookDownLeft"
  | "eyeLookDownRight"
  | "eyeLookInLeft"
  | "eyeLookInRight"
  | "eyeLookOutLeft"
  | "eyeLookOutRight"
  | "eyeLookUpLeft"
  | "eyeLookUpRight"
  | "eyeSquintLeft"
  | "eyeSquintRight"
  | "eyeWideLeft"
  | "eyeWideRight"
  | "jawForward"
  | "jawLeft"
  | "jawOpen"
  | "jawRight"
  | "mouthClose"
  | "mouthDimpleLeft"
  | "mouthDimpleRight"
  | "mouthFrownLeft"
  | "mouthFrownRight"
  | "mouthFunnel"
  | "mouthLeft"
  | "mouthLowerDownLeft"
  | "mouthLowerDownRight"
  | "mouthPressLeft"
  | "mouthPressRight"
  | "mouthPucker"
  | "mouthRight"
  | "mouthRollLower"
  | "mouthRollUpper"
  | "mouthShrugLower"
  | "mouthShrugUpper"
  | "mouthSmileLeft"
  | "mouthSmileRight"
  | "mouthStretchLeft"
  | "mouthStretchRight"
  | "mouthUpperUpLeft"
  | "mouthUpperUpRight"
  | "noseSneerLeft"
  | "noseSneerRight"
  | "tongueOut"
  | "viseme_CH"
  | "viseme_DD"
  | "viseme_E"
  | "viseme_FF"
  | "viseme_I"
  | "viseme_O"
  | "viseme_PP"
  | "viseme_RR"
  | "viseme_SS"
  | "viseme_TH"
  | "viseme_U"
  | "viseme_aa"
  | "viseme_kk"
  | "viseme_nn"
  | "viseme_sil";

export interface LipsyncDataType {
  metadata: LipsyncMetadata;
  mouthCues: mouthCue[];
}
export interface LipsyncMetadata {
  soundFile: string;
  duration: number;
}

export interface mouthCue {
  start: number;
  end: number;
  value: CorrespondingKeys;
}

const corresponding = {
  A: "viseme_PP",
  B: "viseme_kk",
  C: "viseme_I",
  D: "viseme_AA",
  E: "viseme_O",
  F: "viseme_U",
  G: "viseme_FF",
  H: "viseme_TH",
  X: "viseme_PP",
};
export type CorrespondingType = typeof corresponding
export type CorrespondingKeys = keyof CorrespondingType