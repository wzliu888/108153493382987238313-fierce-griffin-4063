import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { Terminal, Cpu, Shield, Zap, Eye, Lock, Wifi, Activity } from 'lucide-react'

export const Route = createFileRoute('/')({
  component: App,
})

function MatrixRain() {
  useEffect(() => {
    const canvas = document.getElementById('matrix-canvas') as HTMLCanvasElement
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    
    const chars = '01アカサタナハマヤラワガザダバパABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const charArray = chars.split('')
    const fontSize = 14
    const columns = canvas.width / fontSize
    const drops: number[] = []
    
    for (let x = 0; x < columns; x++) {
      drops[x] = 1
    }
    
    function draw() {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      ctx.fillStyle = '#0ff'
      ctx.font = `${fontSize}px monospace`
      
      for (let i = 0; i < drops.length; i++) {
        const text = charArray[Math.floor(Math.random() * charArray.length)]
        ctx.fillText(text, i * fontSize, drops[i] * fontSize)
        
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }
    }
    
    const interval = setInterval(draw, 35)
    return () => clearInterval(interval)
  }, [])
  
  return (
    <canvas
      id="matrix-canvas"
      className="fixed inset-0 pointer-events-none opacity-20 z-0"
    />
  )
}

function Clock() {
  const [time, setTime] = useState(new Date())
  const [glitch, setGlitch] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
      setGlitch(Math.random() > 0.97)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (glitch) {
      const timeout = setTimeout(() => setGlitch(false), 150)
      return () => clearTimeout(timeout)
    }
  }, [glitch])

  return (
    <div className={`font-mono mb-8 text-cyan-400 ${glitch ? 'animate-pulse text-red-500' : ''}`}>
      <div className="text-4xl font-bold tracking-wider shadow-lg">
        {time.toLocaleTimeString()}
      </div>
      <div className="text-lg opacity-80 mt-2 text-green-400">
        {time.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
      </div>
    </div>
  )
}

function CyberIcon({ icon: Icon, label, status }: { icon: any, label: string, status: 'online' | 'offline' | 'warning' }) {
  const statusColors = {
    online: 'text-green-400 shadow-green-400/50',
    offline: 'text-red-400 shadow-red-400/50', 
    warning: 'text-yellow-400 shadow-yellow-400/50'
  }
  
  return (
    <div className="flex flex-col items-center group cursor-pointer transition-all duration-300 hover:scale-110">
      <div className={`p-4 rounded-lg bg-black/60 border-2 border-cyan-500/30 ${statusColors[status]} group-hover:border-cyan-400 group-hover:shadow-lg group-hover:shadow-cyan-400/20`}>
        <Icon className="w-8 h-8" />
      </div>
      <span className="text-xs mt-2 text-gray-400 group-hover:text-cyan-400">{label}</span>
      <div className={`w-2 h-2 rounded-full mt-1 ${status === 'online' ? 'bg-green-400' : status === 'warning' ? 'bg-yellow-400' : 'bg-red-400'} ${status === 'online' ? 'animate-pulse' : ''}`} />
    </div>
  )
}

function TerminalWindow() {
  const [text, setText] = useState('')
  const commands = [
    '> INITIALIZING NEURAL LINK...',
    '> CONNECTING TO MAINFRAME...',
    '> BYPASSING SECURITY PROTOCOLS...',
    '> ACCESS GRANTED',
    '> WELCOME TO THE GRID'
  ]
  
  useEffect(() => {
    let currentCommand = 0
    let currentChar = 0
    
    const typeWriter = setInterval(() => {
      if (currentCommand < commands.length) {
        if (currentChar <= commands[currentCommand].length) {
          setText(prev => {
            const lines = prev.split('\n')
            lines[currentCommand] = commands[currentCommand].slice(0, currentChar)
            return lines.join('\n')
          })
          currentChar++
        } else {
          currentCommand++
          currentChar = 0
          setText(prev => prev + '\n')
        }
      }
    }, 50)
    
    return () => clearInterval(typeWriter)
  }, [])
  
  return (
    <div className="w-full max-w-md bg-black/80 border border-green-400 rounded-lg p-4 font-mono text-sm">
      <div className="flex items-center mb-2">
        <div className="flex space-x-1">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <span className="ml-2 text-green-400">NEURAL_INTERFACE.exe</span>
      </div>
      <div className="text-green-400 whitespace-pre-line min-h-[120px]">
        {text}<span className="animate-ping">|</span>
      </div>
    </div>
  )
}

function App() {
  const [scanlines, setScanlines] = useState(true)
  
  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      <MatrixRain />
      
      {/* Scanlines effect */}
      {scanlines && (
        <div className="fixed inset-0 pointer-events-none z-10 opacity-10"
             style={{
               background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #0ff 2px, #0ff 4px)'
             }} />
      )}
      
      <div className="relative z-20 min-h-screen flex flex-col items-center justify-center text-center px-4">
        {/* Main Cyber Logo */}
        <div className="mb-8 relative">
          <div className="text-8xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-pulse">
            CYBER
          </div>
          <div className="text-2xl font-mono text-green-400 mt-2 tracking-[0.5em]">
            NEURAL_LINK_ACTIVE
          </div>
        </div>
        
        <Clock />
        
        {/* System Status Grid */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <CyberIcon icon={Shield} label="FIREWALL" status="online" />
          <CyberIcon icon={Cpu} label="QUANTUM_CPU" status="online" />
          <CyberIcon icon={Wifi} label="NEURAL_NET" status="warning" />
          <CyberIcon icon={Activity} label="BIOMETRICS" status="online" />
        </div>
        
        <TerminalWindow />
        
        <div className="mt-8 space-y-4">
          <div className="flex items-center justify-center space-x-4">
            <Eye className="w-6 h-6 text-cyan-400" />
            <span className="font-mono text-cyan-400 text-lg">REALITY.EXE LOADED</span>
            <Lock className="w-6 h-6 text-green-400" />
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6">
            <a
              className="px-6 py-3 bg-cyan-500/20 border border-cyan-400 text-cyan-400 hover:bg-cyan-500/30 hover:shadow-lg hover:shadow-cyan-400/20 transition-all duration-300 font-mono uppercase tracking-wider"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Terminal className="inline-block mr-2 w-4 h-4" />
              Access React Matrix
            </a>
            <a
              className="px-6 py-3 bg-purple-500/20 border border-purple-400 text-purple-400 hover:bg-purple-500/30 hover:shadow-lg hover:shadow-purple-400/20 transition-all duration-300 font-mono uppercase tracking-wider"
              href="https://tanstack.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Zap className="inline-block mr-2 w-4 h-4" />
              Initialize TanStack
            </a>
          </div>
        </div>
        
        <button
          onClick={() => setScanlines(!scanlines)}
          className="mt-8 px-4 py-2 bg-red-500/20 border border-red-400 text-red-400 hover:bg-red-500/30 transition-all duration-300 font-mono text-sm"
        >
          {scanlines ? 'DISABLE' : 'ENABLE'} SCANLINES
        </button>
        
        <div className="fixed bottom-4 right-4 font-mono text-xs text-gray-500">
          NEURAL_LINK_V2.77.4<br />
          CONNECTION: STABLE<br />
          LATENCY: 12ms
        </div>
      </div>
    </div>
  )
}
