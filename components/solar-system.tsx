'use client'

import { useMemo, useState } from 'react'
import { Search, X } from 'lucide-react'
import { topics, type Topic, type Command } from '@/lib/commands'
import { OrbitMap } from './orbit-map'
import { Flashcard } from './flashcard'

type Hit = { command: Command; topic: Topic }

export function SolarSystem({ onSelect }: { onSelect: (topic: Topic) => void }) {
  const [query, setQuery] = useState('')

  const hits = useMemo<Hit[]>(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    const results: Hit[] = []
    for (const topic of topics) {
      for (const command of topic.commands) {
        const haystack = [
          command.name,
          command.description,
          command.example ?? '',
          ...(command.flags?.flatMap((f) => [f.flag, f.desc]) ?? []),
        ]
          .join(' ')
          .toLowerCase()
        if (haystack.includes(q)) results.push({ command, topic })
      }
    }
    return results
  }, [query])

  const totalCommands = useMemo(
    () => topics.reduce((sum, t) => sum + t.commands.length, 0),
    [],
  )

  return (
    <div className="relative z-10 flex min-h-screen flex-col">
      {/* Top bar — heading + small search */}
      <header className="animate-rise flex flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-8">
        <span className="rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 font-mono text-sm font-semibold uppercase tracking-[0.25em] text-primary">
          LinuxDiary 7.0
        </span>

        <div className="flex w-full max-w-xs items-center gap-2 rounded-full border border-border bg-card/70 px-3.5 py-2 backdrop-blur-md focus-within:border-primary sm:w-auto">
          <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search commands..."
            className="w-full bg-transparent font-mono text-sm text-foreground outline-none placeholder:text-muted-foreground sm:w-52"
            aria-label="Search all commands"
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
      </header>

      {/* Results OR the revolving solar system */}
      {query ? (
        <section className="mx-auto w-full max-w-6xl px-4 py-8">
          <p className="mb-4 text-center font-mono text-xs text-muted-foreground">
            {hits.length} result{hits.length === 1 ? '' : 's'} for &quot;{query}&quot; · {totalCommands} total
          </p>
          {hits.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {hits.map(({ command, topic }) => (
                <div key={`${topic.id}-${command.name}`}>
                  <span
                    className="mb-1.5 block text-center font-mono text-[10px] uppercase tracking-widest"
                    style={{ color: topic.glow }}
                  >
                    {topic.name}
                  </span>
                  <Flashcard command={command} accent={topic.color} />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-sm text-muted-foreground">
              No commands found in this sector. Try another keyword.
            </p>
          )}
        </section>
      ) : (
        <section
          className="relative flex-1"
          aria-label="Topic planets orbiting the sun"
        >
          <OrbitMap onSelect={onSelect} />
        </section>
      )}
    </div>
  )
}
