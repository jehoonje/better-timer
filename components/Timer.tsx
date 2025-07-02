'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTimerStore } from '@/store/timerStore';
import { formatTime } from '@/utils/formatTime';

export default function Timer() {
  const {
    seconds,
    timerType,
    status,
    currentSet,
    lastRestTime,
    startTimer,
    pauseTimer,
    resetTimer,
    switchTimer
  } = useTimerStore();

  const isExercise = timerType === 'exercise';
  const buttonColor = isExercise ? 'bg-gray-700 hover:bg-gray-800' : 'bg-red-700 hover:bg-red-800';
  const buttonActiveColor = isExercise ? 'active:bg-gray-900' : 'active:bg-red-900';

  const handleMainButtonClick = () => {
    if (status === 'idle' || status === 'paused') {
      startTimer('exercise');
    } else if (status === 'running') {
      switchTimer();
    }
  };

  const formattedTime = formatTime(seconds);
  const timeDigits = formattedTime.split('');

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative bg-black">
      {/* Set 표시 - 상단 */}
      <div className="absolute top-16 left-1/2 transform -translate-x-1/2 text-center">
        <motion.h1 
          className="text-4xl font-light text-white mb-2"
          key={currentSet}
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          SET {currentSet}
        </motion.h1>
        
        {/* 직전 휴식 시간 표시 */}
        <AnimatePresence mode="wait">
          {lastRestTime !== '00:00' && (
            <motion.p 
              className="text-xl text-white/80"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
            >
              break: {lastRestTime}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* 타이머 디스플레이 - 상단 */}
      <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="flex items-center justify-center">
          {timeDigits.map((digit, index) => (
            <span
              key={index}
              className={`text-7xl font-thin text-white ${
                digit === ':' ? 'mx-1' : ''
              }`}
              style={{
                fontFamily: '-apple-system, SF Pro Display, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                fontVariantNumeric: 'tabular-nums',
                textShadow: '0 4px 20px rgba(255,255,255,0.3)'
              }}
            >
              {digit}
            </span>
          ))}
        </div>
      </div>

      {/* 메인 버튼 - 화면 정중앙 */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <motion.button
          onClick={handleMainButtonClick}
          className="text-white font-bold cursor-pointer flex flex-col items-center justify-center"
          whileTap={{ scale: 0.98 }}
          style={{
            width: '240px',
            height: '240px',
            background: (status === 'idle' || status === 'paused') ? '#b91c1c' : '#444',
            border: 'none',
            borderRadius: '160px',
            boxShadow: `
              inset 0 0 2px 2px hsla(0,0%,0%,.2),
              inset 0 0 2px 4px hsla(0,0%,0%,.2),
              inset 0 0 2px 6px hsla(0,0%,0%,.2),
              inset 0 0 1px 8px hsla(0,0%,0%,.5),
              inset 0 -4px 2px 4px hsla(0,0%,0%,.5),
              inset 0 1px 1px 8px hsla(0,0%,100%,.25),
              inset 0 -30px 30px hsla(0,0%,0%,.2),
              0 -4px 8px 4px hsla(0,0%,0%,.5),
              0 10px 10px hsla(0,0%,0%,.25),
              0 0 2px 2px hsla(0,0%,0%,.2),
              0 0 2px 4px hsla(0,0%,0%,.2),
              0 0 2px 6px hsla(0,0%,0%,.2),
              0 0 2px 8px hsla(0,0%,0%,.5),
              0 1px 2px 8px hsla(0,0%,100%,.25),
              0 -1px 2px 8px hsla(0,0%,0%,.5)
            `,
            color: (status === 'idle' || status === 'paused') ? '#fff' : '#303030',
            textShadow: `
              0 1px 1px hsla(0,0%,100%,.25),
              0 -1px 1px hsla(0,0%,0%,.75)
            `,
            fontSize: '40px',
            padding: '0',
            outline: 'none',
            transition: 'all 0.1s ease'
          }}
          onMouseDown={(e) => {
            e.target.style.boxShadow = `
              inset 0 0 2px 2px hsla(0,0%,0%,.2),
              inset 0 0 2px 4px hsla(0,0%,0%,.2),
              inset 0 0 2px 6px hsla(0,0%,0%,.2),
              inset 0 0 1px 7px hsla(0,0%,0%,.5),
              inset 0 5px 15px 7px hsla(0,0%,0%,.15),
              inset 0 -4px 2px 3px hsla(0,0%,0%,.5),
              inset 0 1px 1px 7px hsla(0,0%,100%,.25),
              inset 0 -30px 30px hsla(0,0%,0%,.1),
              inset 0 30px 30px hsla(0,0%,0%,.2),
              0 -4px 8px 4px hsla(0,0%,0%,.5),
              0 5px 10px hsla(0,0%,0%,.25),
              0 0 2px 2px hsla(0,0%,0%,.2),
              0 0 2px 4px hsla(0,0%,0%,.2),
              0 0 2px 6px hsla(0,0%,0%,.2),
              0 0 2px 8px hsla(0,0%,0%,.5),
              0 1px 2px 8px hsla(0,0%,100%,.25),
              0 -1px 2px 8px hsla(0,0%,0%,.5)
            `;
          }}
          onMouseUp={(e) => {
            e.target.style.boxShadow = `
              inset 0 0 2px 2px hsla(0,0%,0%,.2),
              inset 0 0 2px 4px hsla(0,0%,0%,.2),
              inset 0 0 2px 6px hsla(0,0%,0%,.2),
              inset 0 0 1px 8px hsla(0,0%,0%,.5),
              inset 0 -4px 2px 4px hsla(0,0%,0%,.5),
              inset 0 1px 1px 8px hsla(0,0%,100%,.25),
              inset 0 -30px 30px hsla(0,0%,0%,.2),
              0 -4px 8px 4px hsla(0,0%,0%,.5),
              0 10px 10px hsla(0,0%,0%,.25),
              0 0 2px 2px hsla(0,0%,0%,.2),
              0 0 2px 4px hsla(0,0%,0%,.2),
              0 0 2px 6px hsla(0,0%,0%,.2),
              0 0 2px 8px hsla(0,0%,0%,.5),
              0 1px 2px 8px hsla(0,0%,100%,.25),
              0 -1px 2px 8px hsla(0,0%,0%,.5)
            `;
          }}
        >
          {status === 'idle' || status === 'paused' ? (currentSet === 1 ? 'Start' : 'Next Set') : 
           isExercise ? 'Break' : 'Next Set'}
        </motion.button>
      </div>

      {/* 하단 버튼 */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
        <motion.button
          onClick={status === 'paused' ? resetTimer : pauseTimer}
          disabled={status === 'idle'}
          className="text-white font-bold cursor-pointer"
          whileTap={status !== 'idle' ? { scale: 0.98 } : {}}
          style={{
            width: '160px',
            height: '60px',
            background: status === 'idle' ? '#666' : '#888',
            border: 'none',
            borderRadius: '30px',
            boxShadow: status === 'idle' ? 'none' : `
              inset 0 0 1px 1px hsla(0,0%,0%,.2),
              inset 0 0 1px 2px hsla(0,0%,0%,.2),
              inset 0 0 1px 3px hsla(0,0%,0%,.2),
              inset 0 0 1px 4px hsla(0,0%,0%,.5),
              inset 0 -2px 1px 2px hsla(0,0%,0%,.5),
              inset 0 1px 1px 4px hsla(0,0%,100%,.25),
              inset 0 -15px 15px hsla(0,0%,0%,.2),
              0 -2px 4px 2px hsla(0,0%,0%,.5),
              0 5px 5px hsla(0,0%,0%,.25),
              0 0 1px 1px hsla(0,0%,0%,.2),
              0 0 1px 2px hsla(0,0%,0%,.2),
              0 0 1px 3px hsla(0,0%,0%,.2),
              0 0 1px 4px hsla(0,0%,0%,.5),
              0 1px 1px 4px hsla(0,0%,100%,.25),
              0 -1px 1px 4px hsla(0,0%,0%,.5)
            `,
            color: status === 'idle' ? '#444' : '#303030',
            textShadow: status === 'idle' ? 'none' : `
              0 1px 1px hsla(0,0%,100%,.25),
              0 -1px 1px hsla(0,0%,0%,.75)
            `,
            fontSize: '18px',
            padding: '0',
            outline: 'none',
            opacity: status === 'idle' ? 0.5 : 1,
            cursor: status === 'idle' ? 'not-allowed' : 'pointer',
            transition: 'all 0.1s ease'
          }}
          onMouseDown={status !== 'idle' ? (e) => {
            e.target.style.boxShadow = `
              inset 0 0 1px 1px hsla(0,0%,0%,.2),
              inset 0 0 1px 2px hsla(0,0%,0%,.2),
              inset 0 0 1px 3px hsla(0,0%,0%,.2),
              inset 0 0 1px 3.5px hsla(0,0%,0%,.5),
              inset 0 2px 8px 3.5px hsla(0,0%,0%,.15),
              inset 0 -2px 1px 1.5px hsla(0,0%,0%,.5),
              inset 0 1px 1px 3.5px hsla(0,0%,100%,.25),
              inset 0 -15px 15px hsla(0,0%,0%,.1),
              inset 0 15px 15px hsla(0,0%,0%,.2),
              0 -2px 4px 2px hsla(0,0%,0%,.5),
              0 2px 5px hsla(0,0%,0%,.25),
              0 0 1px 1px hsla(0,0%,0%,.2),
              0 0 1px 2px hsla(0,0%,0%,.2),
              0 0 1px 3px hsla(0,0%,0%,.2),
              0 0 1px 4px hsla(0,0%,0%,.5),
              0 1px 1px 4px hsla(0,0%,100%,.25),
              0 -1px 1px 4px hsla(0,0%,0%,.5)
            `;
          } : undefined}
          onMouseUp={status !== 'idle' ? (e) => {
            e.target.style.boxShadow = `
              inset 0 0 1px 1px hsla(0,0%,0%,.2),
              inset 0 0 1px 2px hsla(0,0%,0%,.2),
              inset 0 0 1px 3px hsla(0,0%,0%,.2),
              inset 0 0 1px 4px hsla(0,0%,0%,.5),
              inset 0 -2px 1px 2px hsla(0,0%,0%,.5),
              inset 0 1px 1px 4px hsla(0,0%,100%,.25),
              inset 0 -15px 15px hsla(0,0%,0%,.2),
              0 -2px 4px 2px hsla(0,0%,0%,.5),
              0 5px 5px hsla(0,0%,0%,.25),
              0 0 1px 1px hsla(0,0%,0%,.2),
              0 0 1px 2px hsla(0,0%,0%,.2),
              0 0 1px 3px hsla(0,0%,0%,.2),
              0 0 1px 4px hsla(0,0%,0%,.5),
              0 1px 1px 4px hsla(0,0%,100%,.25),
              0 -1px 1px 4px hsla(0,0%,0%,.5)
            `;
          } : undefined}
        >
          {status === 'paused' ? 'Reset' : 'Finish'}
        </motion.button>
      </div>
    </div>
  );
}