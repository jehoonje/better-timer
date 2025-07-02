import { create } from 'zustand';

type TimerType = 'exercise' | 'rest';
type TimerStatus = 'idle' | 'running' | 'paused';

interface TimerState {
  seconds: number;
  timerType: TimerType;
  status: TimerStatus;
  currentSet: number;
  lastRestTime: string;
  intervalId: NodeJS.Timeout | null;
  
  startTimer: (type: TimerType) => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  tick: () => void;
  switchTimer: () => void;
}

export const useTimerStore = create<TimerState>((set, get) => ({
  seconds: 0,
  timerType: 'exercise',
  status: 'idle',
  currentSet: 1,
  lastRestTime: '00:00',
  intervalId: null,

  startTimer: (type: TimerType) => {
    const { intervalId } = get();
    if (intervalId) clearInterval(intervalId);

    set({
      status: 'running',
      timerType: type,
      seconds: 0
    });

    if (type === 'exercise') {
      // 운동은 1초 후 시작
      setTimeout(() => {
        const newIntervalId = setInterval(() => {
          get().tick();
        }, 10);
        set({ intervalId: newIntervalId });
      }, 10);
    } else {
      // 휴식은 바로 시작
      const newIntervalId = setInterval(() => {
        get().tick();
      }, 10);
      set({ intervalId: newIntervalId });
    }
  },

  pauseTimer: () => {
    const { intervalId } = get();
    if (intervalId) {
      clearInterval(intervalId);
    }
    set({
      status: 'paused',
      intervalId: null,
      seconds: 0
    });
  },

  resetTimer: () => {
    const { intervalId } = get();
    if (intervalId) {
      clearInterval(intervalId);
    }
    set({
      seconds: 0,
      timerType: 'exercise',
      status: 'idle',
      currentSet: 1,
      lastRestTime: '00:00',
      intervalId: null
    });
  },

  tick: () => {
    set((state) => ({
      seconds: state.seconds + 0.01 // 0.01초씩 증가
    }));
  },

  switchTimer: () => {
    const { timerType, seconds, currentSet } = get();
    
    if (timerType === 'exercise') {
      // 운동 -> 휴식으로 전환
      get().startTimer('rest');
    } else {
      // 휴식 -> 운동으로 전환 (SET 증가)
      const minutes = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      const formattedTime = `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
      
      set({
        currentSet: currentSet + 1,
        lastRestTime: formattedTime
      });
      get().startTimer('exercise');
    }
  }
}))

export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  const millis = Math.floor((seconds % 1) * 100);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}:${millis.toString().padStart(2, '0')}`;
};