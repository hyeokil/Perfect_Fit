// declare module 'soundtouchjs';

declare module 'soundtouchjs' {
  namespace SoundTouch {
    interface EventListener {
      (detail: any): void;
    }

    interface WebAudioNode {
      on(eventName: string, cb: EventListener): void;
      off(eventName?: string): void;
      connect(toNode: any): void;
      disconnect(): void;
    }

    class WebAudioBufferSource {
      buffer: AudioBuffer;
      position: number;
      constructor(buffer: AudioBuffer);
      extract(target: Float32Array, numFrames?: number, position?: number): number;
    }

    class SoundTouch {
      tempo: number;
      rate: number;
      virtualPitch: number;
      virtualRate: number;
      virtualTempo: number;
      process(): void;
    }

    class PitchShifter {
      _soundtouch: SoundTouch;
      _filter: SimpleFilter;
      timePlayed: number;
      sourcePosition: number;
      duration: number;
      sampleRate: number;
      listeners: { name: string; cb: EventListener }[];

      constructor(context: AudioContext, buffer: AudioBuffer, bufferSize: number, onEnd?: EventListener);

      get formattedDuration(): string;
      get formattedTimePlayed(): string;
      get percentagePlayed(): number;
      set percentagePlayed(perc: number): void;
      get node(): WebAudioNode;

      set pitch(pitch: number): void;
      set pitchSemitones(semitone: number): void;
      set rate(rate: number): void;
      set tempo(tempo: number): void;

      connect(toNode: any): void;
      disconnect(): void;
      on(eventName: string, cb: EventListener): void;
      off(eventName?: string): void;
    }

    interface AbstractFifoSamplePipe {
      inputBuffer: FifoSampleBuffer;
      outputBuffer: FifoSampleBuffer;
      clear(): void;
    }

    class SimpleFilter implements AbstractFifoSamplePipe {
      inputBuffer: FifoSampleBuffer;
      outputBuffer: FifoSampleBuffer;
      clear(): void;
      constructor(sourceSound: WebAudioBufferSource, pipe: SoundTouch | Stretch, callback?: EventListener);
      fillInputBuffer(numFrames?: number): void;
      extract(target: Float32Array, numFrames?: number): number;
      handleSampleData(event: Event): void;
    }

    class Stretch implements AbstractFifoSamplePipe {
      constructor(createBuffers: boolean);
      clear(): void;
      setParameters(sampleRate: number, sequenceMs: number, seekWindowMs: number, overlapMs: number): void;
      set tempo(tempo: number);
      set quickSeek(enable: boolean);
      clone(): Stretch;
      process(): void;
    }

    class RateTransposer implements AbstractFifoSamplePipe {
      constructor(createBuffers: boolean);
      reset(): void;
      clone(): RateTransposer;
      set rate(rate: number);
      process(): void;
    }

    class FifoSampleBuffer {
      vector: Float32Array;
      position: number;
      startIndex: number;
      frameCount: number;
      endIndex: number;
      clear(): void;
      put(numFrames: number): void;
      putSamples(samples: Float32Array, position?: number, numFrames?: number): void;
      putBuffer(buffer: FifoSampleBuffer, position?: number, numFrames?: number): void;
      receive(numFrames: number): void;
      receiveSamples(output: Float32Array, numFrames?: number): void;
      extract(output: Float32Array, position?: number, numFrames?: number): void;
      ensureCapacity(numFrames?: number): void;
      ensureAdditionalCapacity(numFrames?: number): void;
      rewind(): void;
    }

    const getWebAudioNode: (
      context: AudioContext,
      filter: SimpleFilter,
      sourcePositionCallback?: EventListener,
      bufferSize?: number
    ) => WebAudioNode;

    const testFloatEqual: (a: number, b: number) => boolean;
  }

  export = SoundTouch;
}
