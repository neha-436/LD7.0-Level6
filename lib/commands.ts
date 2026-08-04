/* ============================================================================
 * LinuxDiary 7.0 — Command Data
 * ----------------------------------------------------------------------------
 * THIS IS THE ONLY FILE YOU NEED TO EDIT TO ADD / REMOVE COMMANDS OR TOPICS.
 *
 * HOW TO ADD A COMMAND:
 *   Find the topic below and add an object to its `commands` array:
 *     {
 *       name: "ls",
 *       description: "List directory contents.",
 *       flags: [
 *         { flag: "-l", desc: "Long listing format" },
 *         { flag: "-a", desc: "Show hidden files" },
 *       ],
 *       example: "ls -la /home",   // optional
 *     }
 *
 * HOW TO ADD A TOPIC (a new planet):
 *   Add a new object to the `topics` array with a unique `id`, a `name`,
 *   a `tagline`, two colors (`color` + `glow`) for the planet, an `icon`
 *   (any emoji-free short label is fine), and a `commands` array.
 *   Planets are placed on the map automatically.
 *
 * The `color` / `glow` values are plain CSS colors used to paint the planet.
 * ==========================================================================*/
// import lsSvg from "../assets/ls.svg"
// import cdSvg from "../assets/cd.svg"

export type CommandFlag = {
  flag: string
  desc: string
}

export type Command = {
  name: string
  description: string
  flags?: CommandFlag[]
  example?: string
  image?: string
}

export type Topic = {
  id: string
  name: string
  tagline: string
  /** Base planet color (any CSS color) */
  color: string
  /** Planet glow / ring color (any CSS color) */
  glow: string
  /** Relative planet size, 1 = default */
  size?: number
  commands: Command[]
}

export const topics: Topic[] = [
  {
    id: 'navigation',
    name: 'Mercury',
    tagline: 'Small commands. Massive impact.',
    color: '#4cc9f0',
    glow: '#4cc9f0',
    size: 1.1,
    commands: [
      {
        name: 'TUXY are you here??',
        description: 'Oops! Not here',
      },
    ],
  },
  {
    id: 'files',
    name: 'Venus',
    tagline: 'Beauty lies in simplicity',
    color: '#f4a261',
    glow: '#f4a261',
    size: 1,
    commands: [
      {
        name: 'TUXY are you here??',
        description: 'Oops! Not here',
      },
    ],
  },
  {
    id: 'permissions',
    name: 'Earth',
    tagline: 'Your home base for Linux',
    color: '#8ecae6',
    glow: '#8ecae6',
    size: 0.95,
    commands: [
      {
        name: 'TUXY are you here??',
        description: 'Oops! Not here',
      },
    ],
  },
  {
    id: 'processes',
    name: 'Mars',
    tagline: 'Explore beyond the terminal',
    color: '#2a9d8f',
    glow: '#2a9d8f',
    size: 1.05,
    commands: [
      {
        name: 'TUXY are you here??',
        description: 'Yeah! You found me',
        image: "/tux.svg",
        example: 'PART 1 - "mars"',
      }
    ],
  },
  {
    id: 'text',
    name: 'Jupiter',
    tagline: 'Master the giants of Linux',
    color: '#e76f51',
    glow: '#e76f51',
    size: 1,
    commands: [
      {
        name: 'TUXY are you here??',
        description: 'Oops! Not here',
      },
    ],
  },
  {
    id: 'networking',
    name: 'Saturn',
    tagline: 'Orbit through advanced commands',
    color: '#90be6d',
    glow: '#90be6d',
    size: 1.05,
    commands: [
      {
        name: 'TUXY are you here??',
        description: 'Oops! Not here',
      },
    ],
  },
  {
    id: 'packages',
    name: 'Uranus',
    tagline: 'Think differently. Command boldly.',
    color: '#f9c74f',
    glow: '#f9c74f',
    size: 0.95,
    commands: [
      {
        name: 'TUXY are you here??',
        description: 'Oops! Not here',
      },
    ],
  },
  {
    id: 'monitoring',
    name: 'Neptune',
    tagline: 'Dive into the deepest utilities',
    color: '#f28482',
    glow: '#f28482',
    size: 1,
    commands: [
      {
        name: 'TUXY are you here??',
        description: 'Oops! Not here',
      },
    ],
  },
  {
    id: 'archives',
    name: 'Pluto',
    tagline: 'Dwarf planet. Hidden power.',
    color: '#c77dff',
    glow: '#c77dff',
    size: 0.9,
    commands: [
      {
        name: 'TUXY are you here??',
        description: 'Oops! Not here',
      },
    ],
  },
]
