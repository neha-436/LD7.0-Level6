'use client'

import { useMemo } from 'react'

/* Deterministic pseudo-random so server & client renders match (no hydration mismatch). */
function seeded(seed: number) {
  let s = seed % 2147483647
  if (s <= 0) s += 2147483646
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}

type Star = {
  top: number
  left: number
  size: number
  dur: number
  delay: number
}

export function SpaceBackground() {
  const stars = useMemo<Star[]>(() => {
    const rand = seeded(1337)
    return Array.from({ length: 140 }, () => ({
      top: rand() * 100,
      left: rand() * 100,
      size: rand() * 2 + 0.6,
      dur: rand() * 4 + 2.5,
      delay: rand() * 6,
    }))
  }, [])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 overflow-hidden"
      style={{
        background:
          'radial-gradient(120% 120% at 50% -10%, oklch(0.2 0.06 265) 0%, oklch(0.14 0.04 265) 45%, oklch(0.1 0.03 265) 100%)',
      }}
    >
      {/* Nebula clouds */}
      <div
        className="animate-drift absolute -left-20 top-10 h-[42rem] w-[42rem] rounded-full opacity-40 blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgba(76,201,240,0.35), transparent 70%)',
        }}
      />
      <div
        className="animate-drift absolute -right-24 top-1/3 h-[38rem] w-[38rem] rounded-full opacity-30 blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgba(42,157,143,0.35), transparent 70%)',
          animationDelay: '6s',
        }}
      />
      <div
        className="animate-drift absolute bottom-0 left-1/3 h-[36rem] w-[36rem] rounded-full opacity-25 blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgba(244,162,97,0.3), transparent 70%)',
          animationDelay: '12s',
        }}
      />

      {/* Twinkling stars */}
      {stars.map((star, i) => (
        <span
          key={i}
          className="animate-twinkle absolute rounded-full bg-star"
          style={{
            top: `${star.top}%`,
            left: `${star.left}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            // @ts-expect-error custom property
            '--dur': `${star.dur}s`,
            animationDelay: `${star.delay}s`,
            boxShadow: '0 0 6px rgba(255,255,255,0.7)',
          }}
        />
      ))}
    </div>
  )
}
