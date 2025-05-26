import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'

export const Route = createFileRoute('/')({
  component: App,
})

function DigitalRain() {
  const [drops, setDrops] = useState<{ x: number; y: number; speed: number; char: string }[]>([])
  
  useEffect(() => {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+-=[]{}|;:,.<>?'
    const initDrops = Array.from({ length: 50 }, (_, i) => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      speed: Math.random() * 2 + 0.5,
      char: chars[Math.floor(Math.random() * chars.length)]
    }))
    setDrops(initDrops)
    
    const interval = setInterval(() => {
      setDrops(prev => prev.map(drop => ({
        ...drop,
        y: drop.y > 100 ? -5 : drop.y + drop.speed,
        char: Math.random() > 0.95 ? chars[Math.floor(Math.random() * chars.length)] : drop.char
      })))
    }, 100)
    
    return () => clearInterval(interval)
  }, [])
  
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {drops.map((drop, i) => (
        <div
          key={i}
          className="absolute text-cyan-400/30 font-mono text-sm animate-pulse"
          style={{
            left: `${drop.x}%`,
            top: `${drop.y}%`,
            textShadow: '0 0 15px #00ffff'
          }}
        >
          {drop.char}
        </div>
      ))}
    </div>
  )
}

function GlitchText({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const [glitch, setGlitch] = useState(false)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true)
      setTimeout(() => setGlitch(false), 150)
    }, Math.random() * 3000 + 2000)
    
    return () => clearInterval(interval)
  }, [])
  
  return (
    <span 
      className={`${className} ${glitch ? 'animate-pulse' : ''} transition-all duration-150`}
      style={{
        textShadow: glitch 
          ? '2px 0 #ff0040, -2px 0 #00ffff, 0 0 20px #ff0040' 
          : '0 0 10px currentColor'
      }}
    >
      {children}
    </span>
  )
}

function CyberClock() {
  const [time, setTime] = useState(new Date())
  const [mode, setMode] = useState<'digital' | 'binary' | 'hex'>('digital')
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])
  
  const formatTime = () => {
    const hours = time.getHours()
    const minutes = time.getMinutes()
    const seconds = time.getSeconds()
    
    switch (mode) {
      case 'binary':
        return `${hours.toString(2).padStart(5, '0')}:${minutes.toString(2).padStart(6, '0')}:${seconds.toString(2).padStart(6, '0')}`
      case 'hex':
        return `0x${hours.toString(16).padStart(2, '0')}:0x${minutes.toString(16).padStart(2, '0')}:0x${seconds.toString(16).padStart(2, '0')}`
      default:
        return time.toLocaleTimeString()
    }
  }
  
  return (
    <div className="cyber-panel p-6 mb-8 bg-black/80 border-2 border-cyan-400 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-magenta-500/10 animate-pulse" />
      <div className="relative z-10">
        <div className="text-center mb-4">
          <button
            onClick={() => setMode(mode === 'digital' ? 'binary' : mode === 'binary' ? 'hex' : 'digital')}
            className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors border border-cyan-400/50 px-2 py-1 rounded"
          >
            [{mode.toUpperCase()}]
          </button>
        </div>
        <GlitchText className="font-mono text-4xl text-cyan-400 block text-center">
          {formatTime()}
        </GlitchText>
        <div className="text-center mt-2 text-magenta-400 text-sm font-mono">
          [{time.toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: '2-digit', day: '2-digit' })}]
        </div>
      </div>
    </div>
  )
}

function TerminalCommand({ command, output }: { command: string; output: string }) {
  const [visible, setVisible] = useState(false)
  const [typing, setTyping] = useState('')
  
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), Math.random() * 2000)
    return () => clearTimeout(timer)
  }, [])
  
  useEffect(() => {
    if (!visible) return
    
    let i = 0
    const typeTimer = setInterval(() => {
      setTyping(command.slice(0, i))
      i++
      if (i > command.length) clearInterval(typeTimer)
    }, 50)
    
    return () => clearInterval(typeTimer)
  }, [visible, command])
  
  return (
    <div className={`transition-opacity duration-500 ${visible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="flex items-center text-green-400 font-mono text-sm mb-1">
        <span className="text-magenta-400 mr-2">cyber@terminal:~$</span>
        <span className="flex-1">{typing}</span>
        <span className="animate-pulse text-cyan-400">█</span>
      </div>
      {typing.length === command.length && (
        <div className="text-cyan-300 font-mono text-sm ml-4 opacity-80">
          {output}
        </div>
      )}
    </div>
  )
}

function CyberGrid() {
  return (
    <div className="fixed inset-0 z-0 opacity-10">
      <svg width="100%" height="100%" className="absolute inset-0">
        <defs>
          <pattern id="cyber-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#00ffff" strokeWidth="0.5" opacity="0.3"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#cyber-grid)" />
      </svg>
    </div>
  )
}

function FloatingHex() {
  const [hexes] = useState(() => 
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 30 + 10,
      rotation: Math.random() * 360,
      speed: Math.random() * 20 + 10
    }))
  )
  
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      {hexes.map((hex) => (
        <div
          key={hex.id}
          className="absolute border border-cyan-400/20 rotate-45"
          style={{
            left: `${hex.x}%`,
            top: `${hex.y}%`,
            width: `${hex.size}px`,
            height: `${hex.size}px`,
            animation: `float ${hex.speed}s linear infinite`,
            transform: `rotate(${hex.rotation}deg)`,
          }}
        />
      ))}
    </div>
  )
}

function Clock() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="font-mono mb-4 text-cyan-400">
      <div className="text-2xl" style={{ textShadow: '0 0 20px #00ffff' }}>
        {time.toLocaleTimeString()}
      </div>
      <div className="text-sm opacity-75 mt-1 text-magenta-400">
        {time.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
      </div>
    </div>
  )
}

function App() {
  const [activeTerminal, setActiveTerminal] = useState(false)
  const [hackMode, setHackMode] = useState(false)
  
  useEffect(() => {
    const timer = setTimeout(() => setActiveTerminal(true), 1000)
    return () => clearTimeout(timer)
  }, [])
  
  return (
    <div className="min-h-screen bg-black text-green-400 relative overflow-hidden">
      <DigitalRain />
      <CyberGrid />
      <FloatingHex />
      
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="border-b border-cyan-400/30 bg-black/80 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-2 flex justify-between items-center">
            <GlitchText className="text-2xl font-mono font-bold text-cyan-400">
              CYBER.SYS
            </GlitchText>
            <div className="flex space-x-4 text-xs font-mono">
              <div className="text-green-400">[ONLINE]</div>
              <div className="text-cyan-400">[SECURED]</div>
              <div className="text-magenta-400">[ENCRYPTED]</div>
            </div>
          </div>
        </header>
        
        {/* Main Content */}
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              <CyberClock />
              
              <div className="cyber-panel p-6 bg-black/80 border-2 border-magenta-400 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-magenta-500/5 to-cyan-500/5" />
                <div className="relative z-10">
                  <h2 className="text-xl font-mono text-magenta-400 mb-4 flex items-center">
                    <span className="animate-pulse mr-2">◉</span>
                    SYSTEM STATUS
                  </h2>
                  <div className="space-y-2 text-sm font-mono">
                    <div className="flex justify-between">
                      <span className="text-cyan-400">CPU:</span>
                      <span className="text-green-400">OPTIMAL</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-cyan-400">MEMORY:</span>
                      <span className="text-green-400">87.3% UTILIZED</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-cyan-400">NETWORK:</span>
                      <span className="text-green-400">SECURE TUNNEL ACTIVE</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-cyan-400">FIREWALL:</span>
                      <span className="text-green-400">MAXIMUM PROTECTION</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="cyber-panel p-4 bg-black/80 border-2 border-green-400">
                <div className="text-center">
                  <button
                    onClick={() => setHackMode(!hackMode)}
                    className={`px-6 py-3 font-mono font-bold border-2 transition-all duration-300 ${
                      hackMode 
                        ? 'border-red-500 text-red-500 bg-red-500/10 shadow-[0_0_20px_#ff0000]' 
                        : 'border-green-400 text-green-400 hover:bg-green-400/10 hover:shadow-[0_0_20px_#00ff00]'
                    }`}
                  >
                    {hackMode ? '[HACK MODE: ACTIVE]' : '[INITIATE HACK MODE]'}
                  </button>
                </div>
              </div>
            </div>
            
            {/* Right Column */}
            <div className="space-y-6">
              <div className="cyber-panel p-6 bg-black/90 border-2 border-cyan-400 relative">
                <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/10 to-transparent" />
                <div className="relative z-10">
                  <h2 className="text-xl font-mono text-cyan-400 mb-4 flex items-center">
                    <span className="animate-pulse mr-2">▶</span>
                    TERMINAL ACCESS
                  </h2>
                  <div className="bg-black/50 p-4 border border-green-400/50 font-mono text-sm min-h-[200px]">
                    {activeTerminal && (
                      <div className="space-y-2">
                        <TerminalCommand 
                          command="sudo access --level=admin" 
                          output="ACCESS GRANTED. Welcome, Administrator."
                        />
                        <TerminalCommand 
                          command="scan --network --stealth" 
                          output="Scanning... 247 hosts discovered. All systems nominal."
                        />
                        <TerminalCommand 
                          command="encrypt --quantum --key=2048" 
                          output="Quantum encryption enabled. Security level: MAXIMUM."
                        />
                        {hackMode && (
                          <TerminalCommand 
                            command="hack --target=matrix --payload=red-pill" 
                            output="WARNING: Reality breach detected. The Matrix has you..."
                          />
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="cyber-panel p-6 bg-black/80 border-2 border-yellow-400 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 to-orange-500/5 animate-pulse" />
                <div className="relative z-10 text-center">
                  <h2 className="text-xl font-mono text-yellow-400 mb-4">NEURAL LINKS</h2>
                  <div className="space-y-3">
                    <a
                      href="https://reactjs.org"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-cyan-400 hover:text-cyan-300 transition-colors font-mono border border-cyan-400/50 p-2 hover:bg-cyan-400/10"
                    >
                      [REACT.EXE] - Neural Interface Framework
                    </a>
                    <a
                      href="https://tanstack.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-magenta-400 hover:text-magenta-300 transition-colors font-mono border border-magenta-400/50 p-2 hover:bg-magenta-400/10"
                    >
                      [TANSTACK.EXE] - Data Processing Core
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        
        {/* Footer */}
        <footer className="border-t border-cyan-400/30 bg-black/80 backdrop-blur-sm p-4">
          <div className="container mx-auto text-center">
            <GlitchText className="text-xs font-mono text-cyan-400/70">
              SYSTEM.INIT.COMPLETE - CYBER.INTERFACE.LOADED - NEURAL.LINK.ESTABLISHED
            </GlitchText>
          </div>
        </footer>
      </div>
      
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-20vh) rotate(360deg); opacity: 0; }
        }
        
        .cyber-panel {
          box-shadow: inset 0 1px 1px rgba(0, 255, 255, 0.1), 0 0 20px rgba(0, 255, 255, 0.1);
        }
        
        .cyber-panel:hover {
          box-shadow: inset 0 1px 1px rgba(0, 255, 255, 0.2), 0 0 30px rgba(0, 255, 255, 0.2);
        }
      `}</style>
    </div>
  )
}
