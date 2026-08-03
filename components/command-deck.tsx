'use client'

import { useMemo, useState } from 'react'
import { ArrowLeft, Search, X } from 'lucide-react'
import type { Topic } from '@/lib/commands'
import { Flashcard } from './flashcard'

export function CommandDeck({
  topic,
  onBack,
}: {
  topic: Topic
  onBack: () => void
}) {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return topic.commands
    return topic.commands.filter((c) =>
      [
        c.name,
        c.description,
        c.example ?? '',
        ...(c.flags?.flatMap((f) => [f.flag, f.desc]) ?? []),
      ]
        .join(' ')
        .toLowerCase()
        .includes(q),
    )
  }, [query, topic.commands])

  return (
    <div className="relative z-10 mx-auto w-full max-w-6xl px-4 py-8 sm:py-12">
      <button
        type="button"
        onClick={onBack}
        className="animate-rise inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-2 text-sm text-muted-foreground backdrop-blur-md transition-colors hover:border-primary hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to galaxy
      </button>

      <header className="animate-rise mt-6 flex flex-col items-center gap-4 text-center">
        <span
          className="h-16 w-16 rounded-full"
          style={{
            background: `radial-gradient(circle at 32% 28%, color-mix(in oklab, ${topic.color}, white 45%), ${topic.color} 46%, color-mix(in oklab, ${topic.color}, black 55%) 100%)`,
            boxShadow: `0 0 30px -2px ${topic.glow}`,
          }}
        />
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {topic.name}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">{topic.tagline}</p>
        </div>
      </header>

      <div className="animate-rise mx-auto mt-6 flex max-w-sm items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-2.5 backdrop-blur-md focus-within:border-primary">
        <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={`Search ${topic.name} commands...`}
          className="w-full bg-transparent font-mono text-sm text-foreground outline-none placeholder:text-muted-foreground"
          aria-label={`Search ${topic.name} commands`}
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            aria-label="Clear search"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {filtered.length > 0 ? (
        <div className="mt-8 flex justify-center">
          {filtered.map((command) => (
            <Flashcard key={command.name} command={command} accent={topic.color} />
          ))}
        </div>
      ) : (
        <p className="mt-10 text-center text-sm text-muted-foreground">
          No commands match &quot;{query}&quot; on this planet.
        </p>
      )}
    </div>
  )
}
