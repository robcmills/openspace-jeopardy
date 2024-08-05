import { watch } from 'fs'
import { spawn, ChildProcess } from 'child_process'

const CLIENT_WATCH_PATH = 'client/src'
const SERVER_WATCH_PATH = 'server'

// Server

let serverProcess: ChildProcess | undefined

const startServer = () => {
  console.log('Starting server...')
  serverProcess = spawn('bun', ['run', 'index.ts'], {
    cwd: 'server',
    stdio: 'inherit',
  })

  serverProcess.on('error', (err) => {
    console.error(err)
  })

  serverProcess.on('exit', (code, signal) => {
    if (code === 0) {
      console.log('Server exited gracefully.')
    } else {
      console.log(`Server exited with code ${code} signal ${signal}`)
    }
  })
}

let serverTimer: Timer | undefined

const restartServer = () => {
  if (serverTimer) {
    clearTimeout(serverTimer)
  }
  serverTimer = setTimeout(() => {
    console.log('Restarting server...')
    if (serverProcess) {
      serverProcess.on('close', () => startServer())
      serverProcess.kill()
    } else {
      startServer()
    }
  }, 100)
}

watch(SERVER_WATCH_PATH, { recursive: true }, (eventType, filename) => {
  if (filename) {
    console.log(`EventType: ${eventType} Filename: ${filename}`)
    restartServer()
  }
})

startServer()

// Client

let clientBuildProcess: ChildProcess | undefined

const buildClient = () => {
  clientBuildProcess = spawn('bun', ['run', 'build'], {
    stdio: 'inherit',
  })
}

let clientTimer: Timer | undefined

const rebuildClient = () => {
  if (clientTimer) {
    clearTimeout(clientTimer)
  }
  clientTimer = setTimeout(() => {
    console.log('Rebuilding client...')
    if (clientBuildProcess) {
      clientBuildProcess.kill()
    }
    buildClient()
  }, 100)
}

watch(CLIENT_WATCH_PATH, { recursive: true }, (eventType, filename) => {
  if (filename) {
    console.log(`EventType: ${eventType} Filename: ${filename}`)
    rebuildClient()
  }
})

rebuildClient()
