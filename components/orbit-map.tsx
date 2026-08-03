'use client'

import { useMemo } from 'react'
import { topics, type Topic } from '@/lib/commands'

/* ----------------------------------------------------------------------------
 * OrbitMap — a full, top-down solar system.
 * The Sun sits at the CENTER of a responsive square stage. Every topic rides
 * its own concentric circular orbit and continuously REVOLVES around the sun.
 *
 * How it works:
 *  - Each orbit is an outer wrapper that is centered on the sun and holds the
 *    faint orbit ring. Inside it, a "spinner" layer rotates 360deg forever
 *    (`.orbit-ring-spin`), carrying the planet that is pinned to the ring edge.
 *  - The planet counter-rotates at the same speed (`.orbit-planet-spin`) so its
 *    label always stays upright while it travels around the sun.
 *  - Inner orbits revolve faster than outer ones (like real planets), and each
 *    starts at a different angle so they never line up.
 *
 * Everything is derived from the topic list in lib/commands.ts, so adding or
 * removing a topic automatically adds/removes an orbit.
 * ------------------------------------------------------------------------- */

// Orbit diameters as a percentage of the square stage (innermost → outermost).
const MIN_DIAMETER = 26
const MAX_DIAMETER = 98

type Placed = {
  topic: Topic
  diameter: number // % of stage
  size: number // planet diameter in px
  period: number // seconds per revolution
  startDeg: number // initial angle so orbits don't align
  delay: number // negative delay to phase-match the start angle
}

export function OrbitMap({ onSelect }: { onSelect: (topic: Topic) => void }) {
  const placed = useMemo<Placed[]>(() => {
    const n = topics.length
    return topics.map((topic, i) => {
      const t = n > 1 ? i / (n - 1) : 0
      const diameter = MIN_DIAMETER + t * (MAX_DIAMETER - MIN_DIAMETER)
      const period = 26 + i * 7 // inner orbits are faster
      const startDeg = (i * 137.5) % 360 // golden-angle spacing
      return {
        topic,
        diameter,
        size: Math.round(40 * (topic.size ?? 1)),
        period,
        startDeg,
        delay: -(startDeg / 360) * period,
      }
    })
  }, [])

  return (
    <div className="relative flex h-full w-full items-center justify-center">
      {/* Responsive square stage */}
      <div className="relative aspect-square w-[min(92vw,88vh)]">
        {/* Orbits + planets */}
        {placed.map(({ topic, diameter, size, period, startDeg, delay }, i) => (
          <div
            key={topic.id}
            className="pointer-events-none absolute left-1/2 top-1/2 rounded-full"
            style={{
              width: `${diameter}%`,
              height: `${diameter}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            {/* faint orbit ring */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-full border"
              style={{ borderColor: topic.glow, opacity: 0.18 }}
            />

            {/* Rotating layer — carries the planet around the sun */}
            <div
              className="orbit-ring-spin absolute inset-0"
              style={{
                transform: `rotate(${startDeg}deg)`,
                // @ts-expect-error custom props consumed by animation classes
                '--period': `${period}s`,
                '--delay': `${delay}s`,
              }}
            >
              {/* Planet pinned to the right edge of the ring */}
              <button
                type="button"
                onClick={() => onSelect(topic)}
                className="orbit-planet-spin group pointer-events-auto absolute left-full top-1/2 flex flex-col items-center outline-none"
                style={{
                  transform: `translate(-50%, -50%) rotate(${-startDeg}deg)`,
                  // @ts-expect-error custom props consumed by animation classes
                  '--period': `${period}s`,
                  '--delay': `${delay}s`,
                }}
                aria-label={`${topic.name}: ${topic.tagline}. ${topic.commands.length} commands.`}
              >
                <span className="relative flex items-center justify-center">
                  <span
                    className="rounded-full transition-transform duration-300 group-hover:scale-125 group-focus-visible:scale-125"
                    style={{
                      width: size,
                      height: size,
                      background: `radial-gradient(circle at 32% 28%, color-mix(in oklab, ${topic.color}, white 45%), ${topic.color} 46%, color-mix(in oklab, ${topic.color}, black 55%) 100%)`,
                      boxShadow: `0 0 22px -2px ${topic.glow}, inset -6px -6px 18px rgba(0,0,0,0.45)`,
                    }}
                  />
                  <span className="absolute -bottom-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full border border-border bg-card px-1 font-mono text-[10px] font-semibold text-card-foreground">
                    {topic.commands.length}
                  </span>
                </span>
                <span className="mt-1.5 whitespace-nowrap rounded-full bg-background/70 px-2 py-0.5 text-center text-xs font-semibold text-foreground backdrop-blur-sm">
                  {topic.name}
                </span>
              </button>
            </div>
          </div>
        ))}

        {/* The Sun — center of the system */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
          <span
            aria-hidden="true"
            className="animate-sun-pulse rounded-full"
            style={{
              width: 'clamp(90px, 16vmin, 170px)',
              height: 'clamp(90px, 16vmin, 170px)',
              background:
                'radial-gradient(circle at 40% 38%, #fff3c4 0%, #ffd166 24%, #f7933d 52%, #e8622a 76%, #b8340f 100%)',
              boxShadow:
                '0 0 80px 20px rgba(247,147,61,0.55), 0 0 160px 60px rgba(232,98,42,0.35)',
            }}
          />
          <span className="absolute font-mono text-xs uppercase tracking-[0.25em] text-[#2a1206]">
            
          </span>
        </div>
      </div>
    </div>
  )
}