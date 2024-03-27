export type PitchShifterType = {
  tempo: number;
  pitch: number;
  on(event: string, callback: void): void;
  off(): void;
  connect(node: AudioNode): void;
  disconnect(): void;
  percentagePlayed: number;
  formattedTimePlayed: string;
  formattedDuration: string;
  pitchSemitones: number;
}