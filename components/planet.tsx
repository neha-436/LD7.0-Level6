'use client'

import type { Topic } from '@/lib/commands'

export function Planet({
  topic,
  index,
  onSelect,
}: {
  topic: Topic
  index: number
  onSelect: (topic: Topic) => void
}) {
  const size = 88 * (topic.size ?? 1)

  return (
    <button
      type="button"
      onClick={() => onSelect(topic)}
      className="animate-rise group flex flex-col items-center gap-3 rounded-2xl p-4 outline-none transition-transform focus-visible:ring-2 focus-visible:ring-primary"
      style={{ animationDelay: `${index * 90}ms` }}
      aria-label={`${topic.name}: ${topic.tagline}. ${topic.commands.length} commands.`}
    >
      <span className="animate-float-slow relative flex items-center justify-center" style={{ animationDelay: `${index * 0.4}s` }}>
        {/* Orbit ring */}
        <span
          className="absolute rounded-full border opacity-40 transition-opacity group-hover:opacity-90"
          style={{
            width: size + 34,
            height: size + 34,
            borderColor: topic.glow,
            transform: 'rotateX(72deg)',
          }}
        />
        {/* Planet body */}
        <span
          className="rounded-full transition-transform duration-300 group-hover:scale-110"
          style={{
            width: size,
            height: size,
            background: `radial-gradient(circle at 32% 28%, color-mix(in oklab, ${topic.color}, white 45%), ${topic.color} 46%, color-mix(in oklab, ${topic.color}, black 55%) 100%)`,
            boxShadow: `0 0 26px -2px ${topic.glow}, inset -8px -8px 22px rgba(0,0,0,0.45)`,
          }}
        />
        {/* Command count badge */}
        <span
          className="absolute -bottom-1 -right-1 flex h-7 min-w-7 items-center justify-center rounded-full border border-border bg-card px-1.5 font-mono text-xs font-semibold text-card-foreground"
        >
          {topic.commands.length}
        </span>
      </span>

      <span className="text-center">
        <span className="block font-semibold text-foreground">{topic.name}</span>
        <span className="mt-0.5 block text-xs text-muted-foreground">
          {topic.tagline}
        </span>
      </span>
    </button>
  )
}
