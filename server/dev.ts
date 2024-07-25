import { watch } from 'fs'
import { spawn, ChildProcess } from 'child_process'

const CLIENT_WATCH_PATH = '../client/src'
const SERVER_WATCH_PATH = '../server'

let serverProcess: ChildProcess | undefined

const startServer = () => {
  serverProcess = spawn('bun', ['run', 'index.ts'], {
    stdio: 'inherit',
  })

  serverProcess.on('close', (code) => {
    if (code === 0) {
      console.log('Server stopped gracefully.')
    } else {
      console.log(`Server stopped with code ${code}.`)
      startServer()
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

let clientBuildProcess: ChildProcess | undefined

const buildClient = () => {
  clientBuildProcess = spawn('npm', ['run', 'build'], {
    cwd: '../client',
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
