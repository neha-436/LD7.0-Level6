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

export type CommandFlag = {
  flag: string
  desc: string
}

export type Command = {
  name: string
  description: string
  flags?: CommandFlag[]
  example?: string
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
    tagline: 'Move through the file system',
    color: '#4cc9f0',
    glow: '#4cc9f0',
    size: 1.1,
    commands: [
      {
        name: 'pwd',
        description: 'Print the full path of the current working directory.',
        example: 'pwd',
      },
      {
        name: 'ls',
        description: 'List files and directories in the current location.',
        flags: [
          { flag: '-l', desc: 'Long format with permissions, size, date' },
          { flag: '-a', desc: 'Include hidden files (dotfiles)' },
          { flag: '-h', desc: 'Human-readable file sizes' },
          { flag: '-R', desc: 'List subdirectories recursively' },
        ],
        example: 'ls -lah',
      },
      {
        name: 'cd',
        description: 'Change the current directory.',
        flags: [
          { flag: '~', desc: 'Go to home directory' },
          { flag: '..', desc: 'Go up one level' },
          { flag: '-', desc: 'Go to previous directory' },
        ],
        example: 'cd ../projects',
      },
      {
        name: 'tree',
        description: 'Display directories and files as a tree.',
        flags: [
          { flag: '-L', desc: 'Limit depth of the tree' },
          { flag: '-d', desc: 'List directories only' },
        ],
        example: 'tree -L 2',
      },
    ],
  },
  {
    id: 'files',
    name: 'Venus',
    tagline: 'Create, copy, move & remove',
    color: '#f4a261',
    glow: '#f4a261',
    size: 1,
    commands: [
      {
        name: 'touch',
        description: 'Create an empty file or update its timestamp.',
        example: 'touch notes.txt',
      },
      {
        name: 'mkdir',
        description: 'Create new directories.',
        flags: [{ flag: '-p', desc: 'Create parent directories as needed' }],
        example: 'mkdir -p src/components',
      },
      {
        name: 'cp',
        description: 'Copy files and directories.',
        flags: [
          { flag: '-r', desc: 'Copy directories recursively' },
          { flag: '-i', desc: 'Prompt before overwrite' },
          { flag: '-v', desc: 'Verbose — show what is copied' },
        ],
        example: 'cp -r src backup/',
      },
      {
        name: 'mv',
        description: 'Move or rename files and directories.',
        flags: [
          { flag: '-i', desc: 'Prompt before overwrite' },
          { flag: '-v', desc: 'Verbose output' },
        ],
        example: 'mv old.txt new.txt',
      },
      {
        name: 'rm',
        description: 'Remove files or directories. Use with care!',
        flags: [
          { flag: '-r', desc: 'Recursively remove directories' },
          { flag: '-f', desc: 'Force, ignore nonexistent files' },
          { flag: '-i', desc: 'Prompt before each removal' },
        ],
        example: 'rm -rf temp/',
      },
      {
        name: 'cat',
        description: 'Print file contents to the terminal.',
        flags: [{ flag: '-n', desc: 'Number all output lines' }],
        example: 'cat -n config.yml',
      },
    ],
  },
  {
    id: 'permissions',
    name: 'Earth',
    tagline: 'Control who can do what',
    color: '#e76f51',
    glow: '#e76f51',
    size: 0.95,
    commands: [
      {
        name: 'chmod',
        description: 'Change file permission bits.',
        flags: [
          { flag: '+x', desc: 'Add execute permission' },
          { flag: '755', desc: 'rwx for owner, rx for group/others' },
          { flag: '-R', desc: 'Apply recursively' },
        ],
        example: 'chmod +x deploy.sh',
      },
      {
        name: 'chown',
        description: 'Change file owner and group.',
        flags: [{ flag: '-R', desc: 'Change ownership recursively' }],
        example: 'chown -R user:group /var/www',
      },
      {
        name: 'umask',
        description: 'Set default permission mask for new files.',
        example: 'umask 022',
      },
    ],
  },
  {
    id: 'processes',
    name: 'Mars',
    tagline: 'Watch & control running tasks',
    color: '#2a9d8f',
    glow: '#2a9d8f',
    size: 1.05,
    commands: [
      {
        name: 'ps',
        description: 'Report a snapshot of current processes.',
        flags: [
          { flag: 'aux', desc: 'All processes with detail' },
          { flag: '-ef', desc: 'Full-format listing' },
        ],
        example: 'ps aux | grep node',
      },
      {
        name: 'top',
        description: 'Live view of processes and resource usage.',
        example: 'top',
      },
      {
        name: 'kill',
        description: 'Send a signal to a process by PID.',
        flags: [
          { flag: '-9', desc: 'SIGKILL — force kill' },
          { flag: '-15', desc: 'SIGTERM — graceful stop (default)' },
        ],
        example: 'kill -9 1234',
      },
      {
        name: 'jobs',
        description: 'List background jobs in the current shell.',
        example: 'jobs -l',
      },
    ],
  },
  {
    id: 'text',
    name: 'Jupiter',
    tagline: 'Search & transform text',
    color: '#8ecae6',
    glow: '#8ecae6',
    size: 1,
    commands: [
      {
        name: 'grep',
        description: 'Search text using patterns.',
        flags: [
          { flag: '-i', desc: 'Case-insensitive match' },
          { flag: '-r', desc: 'Search recursively' },
          { flag: '-n', desc: 'Show line numbers' },
          { flag: '-v', desc: 'Invert match' },
        ],
        example: 'grep -rin "error" logs/',
      },
      {
        name: 'sed',
        description: 'Stream editor for find-and-replace and edits.',
        flags: [{ flag: '-i', desc: 'Edit files in place' }],
        example: "sed -i 's/foo/bar/g' file.txt",
      },
      {
        name: 'awk',
        description: 'Pattern scanning and column processing.',
        example: "awk '{print $1}' data.txt",
      },
      {
        name: 'sort',
        description: 'Sort lines of text.',
        flags: [
          { flag: '-n', desc: 'Numeric sort' },
          { flag: '-r', desc: 'Reverse order' },
          { flag: '-u', desc: 'Unique lines only' },
        ],
        example: 'sort -nr scores.txt',
      },
      {
        name: 'wc',
        description: 'Count lines, words and bytes.',
        flags: [
          { flag: '-l', desc: 'Count lines' },
          { flag: '-w', desc: 'Count words' },
        ],
        example: 'wc -l access.log',
      },
    ],
  },
  {
    id: 'networking',
    name: 'Saturn',
    tagline: 'Talk to other machines',
    color: '#90be6d',
    glow: '#90be6d',
    size: 1.05,
    commands: [
      {
        name: 'ping',
        description: 'Check connectivity to a host.',
        flags: [{ flag: '-c', desc: 'Number of packets to send' }],
        example: 'ping -c 4 google.com',
      },
      {
        name: 'curl',
        description: 'Transfer data from or to a server.',
        flags: [
          { flag: '-O', desc: 'Save with remote filename' },
          { flag: '-I', desc: 'Fetch headers only' },
          { flag: '-L', desc: 'Follow redirects' },
        ],
        example: 'curl -L https://example.com',
      },
      {
        name: 'wget',
        description: 'Download files from the web.',
        flags: [{ flag: '-c', desc: 'Resume a partial download' }],
        example: 'wget https://site.com/file.zip',
      },
      {
        name: 'ssh',
        description: 'Securely connect to a remote machine.',
        flags: [{ flag: '-p', desc: 'Specify a port' }],
        example: 'ssh user@192.168.1.10',
      },
    ],
  },
  {
    id: 'packages',
    name: 'Uranus',
    tagline: 'Install & update software',
    color: '#f9c74f',
    glow: '#f9c74f',
    size: 0.95,
    commands: [
      {
        name: 'apt',
        description: 'Package manager for Debian/Ubuntu systems.',
        flags: [
          { flag: 'update', desc: 'Refresh package lists' },
          { flag: 'install', desc: 'Install a package' },
          { flag: 'remove', desc: 'Uninstall a package' },
        ],
        example: 'sudo apt install htop',
      },
      {
        name: 'dnf',
        description: 'Package manager for Fedora/RHEL systems.',
        flags: [{ flag: 'install', desc: 'Install a package' }],
        example: 'sudo dnf install git',
      },
      {
        name: 'dpkg',
        description: 'Low-level Debian package tool.',
        flags: [{ flag: '-i', desc: 'Install a .deb file' }],
        example: 'sudo dpkg -i app.deb',
      },
    ],
  },
  {
    id: 'monitoring',
    name: 'Neptune',
    tagline: 'Inspect the machine',
    color: '#f28482',
    glow: '#f28482',
    size: 1,
    commands: [
      {
        name: 'df',
        description: 'Report file system disk space usage.',
        flags: [{ flag: '-h', desc: 'Human-readable sizes' }],
        example: 'df -h',
      },
      {
        name: 'du',
        description: 'Estimate file and directory space usage.',
        flags: [
          { flag: '-h', desc: 'Human-readable sizes' },
          { flag: '-s', desc: 'Summary total only' },
        ],
        example: 'du -sh *',
      },
      {
        name: 'free',
        description: 'Show memory usage.',
        flags: [{ flag: '-h', desc: 'Human-readable sizes' }],
        example: 'free -h',
      },
      {
        name: 'uptime',
        description: 'Show how long the system has been running.',
        example: 'uptime',
      },
    ],
  },
  {
    id: 'archives',
    name: 'Pluto',
    tagline: 'Compress & bundle files',
    color: '#c77dff',
    glow: '#c77dff',
    size: 0.9,
    commands: [
      {
        name: 'tar',
        description: 'Archive multiple files into one.',
        flags: [
          { flag: '-c', desc: 'Create an archive' },
          { flag: '-x', desc: 'Extract an archive' },
          { flag: '-z', desc: 'Use gzip compression' },
          { flag: '-f', desc: 'Specify the file name' },
        ],
        example: 'tar -czf site.tar.gz src/',
      },
      {
        name: 'zip',
        description: 'Package and compress files into a .zip.',
        flags: [{ flag: '-r', desc: 'Recurse into directories' }],
        example: 'zip -r project.zip project/',
      },
      {
        name: 'unzip',
        description: 'Extract files from a .zip archive.',
        flags: [{ flag: '-d', desc: 'Extract to a directory' }],
        example: 'unzip project.zip -d out/',
      },
    ],
  },
]
