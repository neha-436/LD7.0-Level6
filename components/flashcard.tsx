'use client'

import { useState } from 'react'
import type { Command } from '@/lib/commands'

export function Flashcard({
  command,
  accent,
}: {
  command: Command
  accent: string
}) {
  const [flipped, setFlipped] = useState(false)

  return (
    <button
      type="button"
      onClick={() => setFlipped((f) => !f)}
      aria-pressed={flipped}
      aria-label={`${command.name} command. Click to ${flipped ? 'hide' : 'show'} details.`}
      className="group h-60 w-full [perspective:1200px]"
    >
      <div
        className="relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d]"
        style={{ transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
      >
        {/* FRONT — command name */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center rounded-xl border border-border bg-card p-5 text-center [backface-visibility:hidden]"
          style={{ boxShadow: `0 0 0 1px ${accent}22, 0 8px 30px -12px ${accent}55` }}
        >
          <span
            className="mb-3 h-2 w-2 rounded-full"
            style={{ backgroundColor: accent, boxShadow: `0 0 12px ${accent}` }}
          />
          <code className="font-mono text-2xl font-bold text-card-foreground">
            {command.name}
          </code>
          <span className="mt-4 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            tap to reveal
          </span>
          {/* {command.flags?.length ? (
            <span className="mt-2 rounded-full border border-border px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
              {command.flags.length} flags
            </span>
          ) : null} */}
        </div>

        {/* BACK — details */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden rounded-xl border p-4 text-left [backface-visibility:hidden] [transform:rotateY(180deg)]"
          style={{
            borderColor: `${accent}55`,
            background:
              'linear-gradient(160deg, var(--card), color-mix(in oklab, var(--card), black 12%))',
          }}
        >
          <span
            className="mb-3 h-2 w-2 rounded-full"
            style={{ backgroundColor: accent, boxShadow: `0 0 12px ${accent}` }}
          />
          <code
            className="font-mono text-2xl font-bold text-card-foreground justify-center text-align-center text-center"
            // style={{ color: accent }}
          >
            {command.description}
          </code>
          {/* <p className="mt-1.5 text-xs leading-relaxed text-card-foreground/90">
            {command.description}
          </p> */}

          {/* {command.flags?.length ? (
            <div className="mt-2 flex-1 space-y-1 overflow-y-auto pr-1">
              {command.flags.map((f) => (
                <div key={f.flag} className="flex gap-2 text-[11px]">
                  <code
                    className="shrink-0 rounded bg-secondary px-1.5 py-0.5 font-mono font-semibold text-secondary-foreground"
                  >
                    {f.flag}
                  </code>
                  <span className="text-muted-foreground">{f.desc}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex-1" />
          )} */}

{command.image && (
  <img
    src={command.image}
    alt={command.name}
    className="h-29 w-auto transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-110 hover:drop-shadow-[0_0_7px_rgba(34,211,238,0.8)] mt-1"
  />
)}

          {command.example ? (
  <div className="mt-1 rounded-md border border-border bg-background/60 px-5 py-1.5 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.35)]">
    <span className="font-mono text-[16px] text-primary transition-colors duration-300">
      <span className="text-muted-foreground">$ </span>
      {command.example}
    </span>
  </div>
) : null}
        </div>
      </div>
    </button>
  )
}
