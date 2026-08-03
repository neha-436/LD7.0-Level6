'use client'

import { useState } from 'react'
import type { Topic } from '@/lib/commands'
import { SpaceBackground } from '@/components/space-background'
import { BootSequence } from '@/components/boot-sequence'
import { SolarSystem } from '@/components/solar-system'
import { CommandDeck } from '@/components/command-deck'

export default function Page() {
  const [booted, setBooted] = useState(false)
  const [topic, setTopic] = useState<Topic | null>(null)

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <SpaceBackground />

      {!booted ? (
        <BootSequence onComplete={() => setBooted(true)} />
      ) : topic ? (
        <CommandDeck topic={topic} onBack={() => setTopic(null)} />
      ) : (
        <SolarSystem onSelect={setTopic} />
      )}

      {booted && (
        <footer className="relative z-10 pb-8 text-center font-mono text-xs text-muted-foreground">
          LinuxDiary 7.0 · Command Constellation · Explore · Learn · Launch
        </footer>
      )}
    </main>
  )
}
