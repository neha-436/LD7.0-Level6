// 'use client'

// import { useEffect, useRef, useState } from 'react'

// const BOOT_LINES = [
//   '[ OK ]  Mounting LinuxDiary 7.0 kernel modules...',
//   '[ OK ]  Calibrating navigation thrusters...',
//   '[ OK ]  Loading command constellation database...',
//   '[ OK ]  Establishing uplink to Mission Control...',
//   '[ OK ]  Life support: nominal. Oxygen: 100%',
//   '[ OK ]  Charting course for the Command Galaxy...',
//   'READY.  Ignition in 3... 2... 1...',
// ]

// export function BootSequence({ onComplete }: { onComplete: () => void }) {
//   const [visibleLines, setVisibleLines] = useState<string[]>([])
//   const [warping, setWarping] = useState(false)
//   const finished = useRef(false)

//   useEffect(() => {
//     let i = 0
//     const interval = setInterval(() => {
//       setVisibleLines((prev) => [...prev, BOOT_LINES[i]])
//       i++
//       if (i >= BOOT_LINES.length) {
//         clearInterval(interval)
//         setTimeout(() => launch(), 900)
//       }
//     }, 520)
//     return () => clearInterval(interval)
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [])

//   function launch() {
//     if (finished.current) return
//     finished.current = true
//     setWarping(true)
//     setTimeout(onComplete, 1100)
//   }

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
//       {/* Warp streaks */}
//       {warping && (
//         <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
//           {Array.from({ length: 60 }).map((_, i) => (
//             <span
//               key={i}
//               className="absolute left-1/2 top-1/2 w-px bg-primary"
//               style={{
//                 height: `${20 + (i % 10) * 12}px`,
//                 transform: `rotate(${(i / 60) * 360}deg) translateY(-40px)`,
//                 transformOrigin: 'center top',
//                 animation: `warp ${0.6 + (i % 5) * 0.08}s ease-in forwards`,
//               }}
//             />
//           ))}
//         </div>
//       )}

//       <div
//         className={`w-full max-w-xl transition-all duration-700 ${
//           warping ? 'scale-125 opacity-0 blur-sm' : 'scale-100 opacity-100'
//         }`}
//       >
//         <div className="rounded-xl border border-primary/30 bg-card/70 p-5 shadow-2xl backdrop-blur-md">
//           <div className="mb-4 flex items-center gap-2 border-b border-border pb-3">
//             <span className="h-3 w-3 rounded-full bg-destructive" />
//             <span className="h-3 w-3 rounded-full bg-accent" />
//             <span className="h-3 w-3 rounded-full bg-primary" />
//             <span className="ml-3 font-mono text-xs text-muted-foreground">
//               missioncontrol@linuxdiary: ~/launch
//             </span>
//           </div>
//           <div className="min-h-52 font-mono text-sm leading-relaxed">
//             {visibleLines.map((line, i) => (
//               <p
//                 key={i}
//                 className={
//                   line?.startsWith('READY')
//                     ? 'animate-rise text-accent'
//                     : 'animate-rise text-primary/90'
//                 }
//               >
//                 {line}
//               </p>
//             ))}
//             <span className="inline-block h-4 w-2 animate-pulse bg-primary align-middle" />
//           </div>
//         </div>

//         <button
//           type="button"
//           onClick={launch}
//           className="mx-auto mt-6 block rounded-full border border-border px-5 py-2 font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:border-primary hover:text-primary"
//         >
//           Skip intro &gt;&gt;
//         </button>
//       </div>
//     </div>
//   )
// }

// 'use client'

// import { useEffect, useMemo, useRef, useState } from 'react'

// const BOOT_LINES = [
//   'THRUSTERS: ONLINE',
//   'NAV: LOCKED',
//   'UPLINK: SECURE',
//   'O2: 100%',
//   'READY FOR LAUNCH',
// ]

// export function BootSequence({ onComplete }: { onComplete: () => void }) {
//   const [lineIndex, setLineIndex] = useState(0)
//   const [charIndex, setCharIndex] = useState(0)
//   const [countdown, setCountdown] = useState<number | null>(null)
//   const [warping, setWarping] = useState(false)
//   const finished = useRef(false)

//   // Stable starfield, generated once
//   // const stars = useMemo(
//   //   () =>
//   //     Array.from({ length: 70 }).map((_, i) => ({
//   //       id: i,
//   //       top: Math.random() * 100,
//   //       left: Math.random() * 100,
//   //       size: Math.random() * 2 + 1,
//   //       duration: 1.5 + Math.random() * 2.5,
//   //       delay: Math.random() * 3,
//   //     })),
//   //   []
//   // )

//   // Typewriter effect: char by char, line by line
//   useEffect(() => {
//     if (lineIndex >= BOOT_LINES.length) return

//     const currentLine = BOOT_LINES[lineIndex]
//     if (charIndex < currentLine.length) {
//       const t = setTimeout(() => setCharIndex((c) => c + 1), 16)
//       return () => clearTimeout(t)
//     }

//     // line finished, pause then move to next
//     const pause = setTimeout(() => {
//       if (lineIndex + 1 >= BOOT_LINES.length) {
//         setCountdown(3)
//       } else {
//         setLineIndex((l) => l + 1)
//         setCharIndex(0)
//       }
//     }, 380)
//     return () => clearTimeout(pause)
//   }, [lineIndex, charIndex])

//   // Countdown 3-2-1, then launch
//   useEffect(() => {
//     if (countdown === null) return
//     if (countdown === 0) {
//       const t = setTimeout(() => launch(), 250)
//       return () => clearTimeout(t)
//     }
//     const t = setTimeout(() => setCountdown((c) => (c ?? 1) - 1), 700)
//     return () => clearTimeout(t)
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [countdown])

//   function launch() {
//     if (finished.current) return
//     finished.current = true
//     setWarping(true)
//     setTimeout(onComplete, 1100)
//   }

//   function skip() {
//     setLineIndex(BOOT_LINES.length)
//     setCountdown(null)
//     launch()
//   }

//   const completedLines = BOOT_LINES.slice(0, lineIndex)
//   const typingLine = BOOT_LINES[lineIndex]?.slice(0, charIndex) ?? ''
//   const isTyping = lineIndex < BOOT_LINES.length

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden px-4">
//       {/* Starfield */}
//       <div aria-hidden="true" className="absolute inset-0">
//         {stars.map((s) => (
//           <span
//             key={s.id}
//             className="absolute rounded-full bg-primary/70 animate-twinkle"
//             style={{
//               top: `${s.top}%`,
//               left: `${s.left}%`,
//               width: s.size,
//               height: s.size,
//               animationDuration: `${s.duration}s`,
//               animationDelay: `${s.delay}s`,
//             }}
//           />
//         ))}
//       </div>

//       {/* Warp streaks */}
//       {warping && (
//         <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
//           {Array.from({ length: 60 }).map((_, i) => (
//             <span
//               key={i}
//               className="absolute left-1/2 top-1/2 w-px bg-primary"
//               style={{
//                 height: `${20 + (i % 10) * 12}px`,
//                 transform: `rotate(${(i / 60) * 360}deg) translateY(-40px)`,
//                 transformOrigin: 'center top',
//                 animation: `warp ${0.6 + (i % 5) * 0.08}s ease-in forwards`,
//               }}
//             />
//           ))}
//         </div>
//       )}

//       <div
//         className={`relative w-full max-w-xl transition-all duration-700 ${
//           warping ? 'scale-125 opacity-0 blur-sm' : 'scale-100 opacity-100'
//         }`}
//       >
//         <div className="relative overflow-hidden rounded-xl border border-primary/30 bg-card/70 p-5 shadow-2xl backdrop-blur-md">
//           {/* Scanline sweep */}
//           <div
//             aria-hidden="true"
//             className="pointer-events-none absolute inset-x-0 h-10 bg-gradient-to-b from-primary/10 via-primary/5 to-transparent animate-scanline"
//           />

//           <div className="mb-4 flex items-center gap-2 border-b border-border pb-3">
//             <span className="h-3 w-3 rounded-full bg-destructive" />
//             <span className="h-3 w-3 rounded-full bg-accent" />
//             <span className="h-3 w-3 rounded-full bg-primary" />
//             <span className="ml-3 font-mono text-xs text-muted-foreground">
//               missioncontrol@linuxdiary: ~/launch
//             </span>
//           </div>

//           <div className="min-h-52 font-mono text-sm leading-relaxed">
//             {completedLines.map((line, i) => (
//               <p
//                 key={i}
//                 className={
//                   line.startsWith('READY')
//                     ? 'animate-rise text-accent'
//                     : 'animate-rise text-primary/90'
//                 }
//               >
//                 {line}
//               </p>
//             ))}

//             {isTyping && (
//               <p
//                 className={`animate-flicker ${
//                   typingLine.startsWith('READY') ? 'text-accent' : 'text-primary/90'
//                 }`}
//               >
//                 {typingLine}
//               </p>
//             )}

//             {countdown !== null && (
//               <div className="mt-6 flex items-center justify-center">
//                 {countdown > 0 ? (
//                   <span
//                     key={countdown}
//                     className="animate-countdown font-mono text-5xl font-bold text-accent"
//                   >
//                     {countdown}
//                   </span>
//                 ) : (
//                   <span className="font-mono text-2xl font-bold tracking-widest text-accent">
//                     IGNITION
//                   </span>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>

//         <button
//           type="button"
//           onClick={skip}
//           className="mx-auto mt-6 block rounded-full border border-border px-5 py-2 font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:border-primary hover:text-primary"
//         >
//           Skip intro &gt;&gt;
//         </button>
//       </div>

//       <style jsx global>{`
//         @keyframes flicker {
//           0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% { opacity: 1; }
//           20%, 22%, 24%, 55% { opacity: 0.3; }
//         }
//         .animate-flicker {
//           animation: flicker 1.4s linear;
//         }

//         @keyframes twinkle {
//           0%, 100% { opacity: 0.15; transform: scale(0.8); }
//           50% { opacity: 1; transform: scale(1.2); }
//         }
//         .animate-twinkle {
//           animation: twinkle ease-in-out infinite;
//         }

//         @keyframes scanline {
//           0% { top: -10%; }
//           100% { top: 110%; }
//         }
//         .animate-scanline {
//           animation: scanline 3.2s linear infinite;
//         }

//         @keyframes countdown {
//           0% { opacity: 0; transform: scale(1.6); }
//           30% { opacity: 1; transform: scale(1); }
//           80% { opacity: 1; transform: scale(1); }
//           100% { opacity: 0; transform: scale(0.7); }
//         }
//         .animate-countdown {
//           animation: countdown 0.7s ease-out forwards;
//         }
//       `}</style>
//     </div>
//   )
// }

'use client'

import { useEffect, useRef, useState } from 'react'

export function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [showText, setShowText] = useState(false)
  const [countdown, setCountdown] = useState<number | null>(null)
  const [warping, setWarping] = useState(false)
  const finished = useRef(false)

  const [stars, setStars] = useState<
    { id: number; top: number; left: number; size: number; duration: number; delay: number }[]
  >([])

  // Generate starfield only on the client, after mount, to avoid hydration mismatch
  useEffect(() => {
    setStars(
      Array.from({ length: 80 }).map((_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 2 + 1,
        duration: 1.5 + Math.random() * 2.5,
        delay: Math.random() * 3,
      }))
    )
  }, [])

  // Show "Ready to launch!" then start countdown, then launch
  useEffect(() => {
    const t1 = setTimeout(() => setShowText(true), 200)
    const t2 = setTimeout(() => setCountdown(3), 1400)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [])

  useEffect(() => {
    if (countdown === null) return
    if (countdown === 0) {
      const t = setTimeout(() => launch(), 300)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => setCountdown((c) => (c ?? 1) - 1), 700)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countdown])

  function launch() {
    if (finished.current) return
    finished.current = true
    setWarping(true)
    setTimeout(onComplete, 1100)
  }

  function skip() {
    setCountdown(0)
    launch()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden px-4">
      {/* Starfield */}
      <div aria-hidden="true" className="absolute inset-0">
        {stars.map((s) => (
          <span
            key={s.id}
            className="absolute rounded-full bg-primary/70 animate-twinkle"
            style={{
              top: `${s.top}%`,
              left: `${s.left}%`,
              width: s.size,
              height: s.size,
              animationDuration: `${s.duration}s`,
              animationDelay: `${s.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Warp streaks */}
      {/* {warping && (
        <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 60 }).map((_, i) => (
            <span
              key={i}
              className="absolute left-1/2 top-1/2 w-px bg-primary"
              style={{
                height: `${20 + (i % 10) * 12}px`,
                transform: `rotate(${(i / 60) * 360}deg) translateY(-40px)`,
                transformOrigin: 'center top',
                animation: `warp ${0.6 + (i % 5) * 0.08}s ease-in forwards`,
              }}
            />
          ))}
        </div>
      )} */}

      <div
        className={`relative flex flex-col items-center gap-8 transition-all duration-700 ${
          warping ? 'scale-125 opacity-0 blur-sm' : 'scale-100 opacity-100'
        }`}
      >
        {showText && countdown === null && (
          <p className="animate-flicker font-mono text-2xl tracking-widest text-primary sm:text-5xl">
            Ready to launch?
          </p>
        )}

        {countdown !== null && (
          <>
            {countdown > 0 ? (
              <span
                key={countdown}
                className="animate-countdown font-mono text-7xl font-bold text-accent"
              >
                {countdown}
              </span>
            ) : (
              <span className="animate-flicker font-mono text-2xl tracking-widest text-primary sm:text-5xl">
                Let's Go!
              </span>
            )}
          </>
        )}
      </div>

      <button
        type="button"
        onClick={skip}
        className="absolute bottom-10 rounded-full border border-border px-5 py-2 font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:border-primary hover:text-primary"
      >
        Skip intro &gt;&gt;
      </button>

      <style jsx global>{`
        @keyframes flicker {
          0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% { opacity: 1; }
          20%, 22%, 24%, 55% { opacity: 0.3; }
        }
        .animate-flicker {
          animation: flicker 1.4s linear;
        }

        @keyframes twinkle {
          0%, 100% { opacity: 0.15; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        .animate-twinkle {
          animation: twinkle ease-in-out infinite;
        }

        @keyframes countdown {
          0% { opacity: 0; transform: scale(1.6); }
          30% { opacity: 1; transform: scale(1); }
          80% { opacity: 1; transform: scale(1); }
          100% { opacity: 0; transform: scale(0.7); }
        }
        .animate-countdown {
          animation: countdown 0.7s ease-out forwards;
        }
      `}</style>
    </div>
  )
}