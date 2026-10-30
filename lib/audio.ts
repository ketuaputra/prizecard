/**
 * Procedural Web Audio API Ambient Sound Generator
 * Generates:
 * 1. Gentle rain atmosphere (Filtered pink noise with subtle randomized droplets)
 * 2. Warm nostalgic ambient drone (Soft sine/triangle pentatonic chords)
 * 3. Delicate crystal/bell unseal shimmer sound
 *
 * Runs completely in the browser without requiring any external MP3/audio files.
 */

class AmbientAudioManager {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private masterGain: GainNode | null = null;
  private rainGain: GainNode | null = null;
  private synthGain: GainNode | null = null;
  private chordIntervalId: number | null = null;
  private noiseSource: AudioBufferSourceNode | null = null;

  private initContext() {
    if (this.ctx) return;
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    this.ctx = new AudioCtx();

    // Master volume control with gentle ceiling
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.0001, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);

    // Sub-bus for rain
    this.rainGain = this.ctx.createGain();
    this.rainGain.gain.setValueAtTime(0.4, this.ctx.currentTime);
    this.rainGain.connect(this.masterGain);

    // Sub-bus for warm chords
    this.synthGain = this.ctx.createGain();
    this.synthGain.gain.setValueAtTime(0.3, this.ctx.currentTime);
    this.synthGain.connect(this.masterGain);
  }

  /**
   * Generates continuous pink/brown noise to simulate soothing rain on a window
   */
  private createRainBuffer(durationSeconds = 6): AudioBuffer {
    if (!this.ctx) throw new Error("AudioContext not ready");
    const bufferSize = this.ctx.sampleRate * durationSeconds;
    const buffer = this.ctx.createBuffer(2, bufferSize, this.ctx.sampleRate);

    for (let channel = 0; channel < 2; channel++) {
      const data = buffer.getChannelData(channel);
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;

      for (let i = 0; i < bufferSize; i++) {
        // Pink noise generator (Paul Kellet's filtered method)
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        const pink = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
        b6 = white * 0.115926;
        data[i] = pink * 0.05;
      }
    }

    return buffer;
  }

  /**
   * Plays a warm, soft pentatonic ambient chord note with natural envelope
   */
  private playSoftNote(frequency: number, duration: number, velocity: number = 0.15) {
    if (!this.ctx || !this.synthGain) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const noteGain = this.ctx.createGain();

    // Warm triangle/sine blend
    osc.type = "sine";
    osc.frequency.setValueAtTime(frequency, now);

    // Warm lowpass filter to mimic felt piano / lofi warmth
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(450, now);
    filter.frequency.exponentialRampToValueAtTime(180, now + duration);

    // Soft attack, long blooming decay
    noteGain.gain.setValueAtTime(0.0001, now);
    noteGain.gain.exponentialRampToValueAtTime(velocity, now + duration * 0.25);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(filter);
    filter.connect(noteGain);
    noteGain.connect(this.synthGain);

    osc.start(now);
    osc.stop(now + duration);
  }

  /**
   * Cycles gentle, contemplative chords (Fmaj7 - Cmaj9 - Am7 - Em7)
   */
  private startChordProgression() {
    // Frequencies for soothing pentatonic pads: [F, A, C, E], [C, E, G, B, D], [A, C, E, G], [G, B, D, F]
    const chords = [
      [174.61, 220.0, 261.63, 329.63], // F3, A3, C4, E4 (Fmaj7)
      [130.81, 196.0, 246.94, 293.66, 329.63], // C3, G3, B3, D4, E4 (Cmaj9)
      [110.0, 164.81, 220.0, 261.63, 329.63], // A2, E3, A3, C4, E4 (Am7)
      [146.83, 196.0, 246.94, 349.23], // D3, G3, B3, F4 (G7/D)
    ];

    let chordIdx = 0;

    const triggerChord = () => {
      if (!this.isPlaying || !this.ctx) return;
      const currentNotes = chords[chordIdx % chords.length];

      // Arpeggiate notes slightly for delicate human feel
      currentNotes.forEach((freq, i) => {
        const jitter = i * 0.25 + (Math.random() * 0.08);
        window.setTimeout(() => {
          if (this.isPlaying) {
            this.playSoftNote(freq, 6.5, 0.08 / Math.sqrt(currentNotes.length));
          }
        }, jitter * 1000);
      });

      chordIdx++;
    };

    triggerChord();
    this.chordIntervalId = window.setInterval(triggerChord, 6000);
  }

  /**
   * Sound effect when the wax seal is broken (delicate warm chime)
   */
  public playSealBreakChime() {
    try {
      this.initContext();
      if (!this.ctx) return;
      if (this.ctx.state === "suspended") {
        this.ctx.resume();
      }

      const now = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6 (crystal shimmer)

      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const noteTime = now + idx * 0.06;

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, noteTime);

        gain.gain.setValueAtTime(0.0001, noteTime);
        gain.gain.exponentialRampToValueAtTime(0.12, noteTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, noteTime + 1.2);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(noteTime);
        osc.stop(noteTime + 1.3);
      });
    } catch {
      // Audio playback silently ignored if blocked by browser policy
    }
  }

  /**
   * Play blessing warm harp/bell touch
   */
  public playBlessingChime() {
    try {
      this.initContext();
      if (!this.ctx) return;
      if (this.ctx.state === "suspended") {
        this.ctx.resume();
      }

      const now = this.ctx.currentTime;
      const freqs = [440, 554.37, 659.25, 880]; // A4, C#5, E5, A5
      freqs.forEach((f, i) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const t = now + i * 0.08;

        osc.type = "triangle";
        osc.frequency.setValueAtTime(f, t);

        gain.gain.setValueAtTime(0.0001, t);
        gain.gain.exponentialRampToValueAtTime(0.09, t + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 1.6);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(t);
        osc.stop(t + 1.7);
      });
    } catch {
      // Silently ignore if blocked
    }
  }

  /**
   * Start or resume ambient audio stream
   */
  public async start(): Promise<boolean> {
    try {
      this.initContext();
      if (!this.ctx || !this.masterGain || !this.rainGain) return false;

      if (this.ctx.state === "suspended") {
        await this.ctx.resume();
      }

      // Setup rain loop
      const rainBuffer = this.createRainBuffer(8);
      const rainFilter = this.ctx.createBiquadFilter();
      rainFilter.type = "lowpass";
      rainFilter.frequency.setValueAtTime(650, this.ctx.currentTime);

      this.noiseSource = this.ctx.createBufferSource();
      this.noiseSource.buffer = rainBuffer;
      this.noiseSource.loop = true;
      this.noiseSource.connect(rainFilter);
      rainFilter.connect(this.rainGain);
      this.noiseSource.start();

      // Smooth fade in
      const now = this.ctx.currentTime;
      this.masterGain.gain.setValueAtTime(0.0001, now);
      this.masterGain.gain.exponentialRampToValueAtTime(0.7, now + 2.5);

      this.isPlaying = true;
      this.startChordProgression();
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Pause and fade out ambient audio stream
   */
  public stop() {
    if (!this.ctx || !this.masterGain || !this.isPlaying) return;

    const now = this.ctx.currentTime;
    this.masterGain.gain.setValueAtTime(Math.max(this.masterGain.gain.value, 0.0001), now);
    this.masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

    window.setTimeout(() => {
      if (this.chordIntervalId) {
        clearInterval(this.chordIntervalId);
        this.chordIntervalId = null;
      }
      if (this.noiseSource) {
        try {
          this.noiseSource.stop();
          this.noiseSource.disconnect();
        } catch {}
        this.noiseSource = null;
      }
      this.isPlaying = false;
    }, 1300);
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }
}

export const ambientAudio = new AmbientAudioManager();
