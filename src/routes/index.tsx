import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect, useRef } from 'react'

export const Route = createFileRoute('/')({
  component: App,
})

function CyberClock() {
  const [time, setTime] = useState(new Date())
  const [glitch, setGlitch] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    const glitchTimer = setInterval(() => {
      setGlitch(true)
      setTimeout(() => setGlitch(false), 100)
    }, 3000 + Math.random() * 7000)

    return () => {
      clearInterval(timer)
      clearInterval(glitchTimer)
    }
  }, [])

  return (
    <div className={`font-mono mb-8 relative ${glitch ? 'animate-pulse' : ''}`}>
      <div className="text-4xl font-bold text-cyan-400 neon-text relative">
        <span className={glitch ? 'glitch-text' : ''}>
          {time.toLocaleTimeString()}
        </span>
      </div>
      <div className="text-sm text-green-400 opacity-80 mt-2 tracking-widest">
        NEURAL LINK ACTIVE • 
        {time.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
      </div>
    </div>
  )
}

function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')!
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?'
    const charArray = chars.split('')
    const fontSize = 14
    const columns = canvas.width / fontSize
    const drops: number[] = []

    for (let i = 0; i < columns; i++) {
      drops[i] = 1
    }

    function draw() {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = '#00ff41'
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

    const interval = setInterval(draw, 33)
    return () => clearInterval(interval)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none opacity-20 z-0"
    />
  )
}

function CyberLogo() {
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setPhase(prev => (prev + 1) % 4)
    }, 2000)
    return () => clearInterval(timer)
  }, [])

  const phases = [
    { text: 'NEURAL', color: 'text-cyan-400', glow: 'cyber-glow-cyan' },
    { text: 'MATRIX', color: 'text-green-400', glow: 'cyber-glow-green' },
    { text: 'CYBER', color: 'text-purple-400', glow: 'cyber-glow-purple' },
    { text: 'SYNTH', color: 'text-pink-400', glow: 'cyber-glow-pink' }
  ]

  return (
    <div className="relative mb-12">
      <div className={`text-8xl font-bold tracking-wider ${phases[phase].color} ${phases[phase].glow} transition-all duration-500`}>
        {phases[phase].text}
      </div>
      <div className="absolute inset-0 text-8xl font-bold tracking-wider text-white opacity-10 animate-ping">
        {phases[phase].text}
      </div>
      <div className="text-xl text-gray-400 mt-4 tracking-[0.5em] font-mono">
        INTERFACE v3.14.159
      </div>
    </div>
  )
}

function CyberButton({ href, children, variant = 'primary' }: { href: string; children: React.ReactNode; variant?: 'primary' | 'secondary' }) {
  const [isHovered, setIsHovered] = useState(false)
  
  const variants = {
    primary: 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white cyber-border-cyan',
    secondary: 'bg-gradient-to-r from-purple-500 to-pink-600 text-white cyber-border-purple'
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        relative group px-8 py-4 font-mono font-bold tracking-wider
        ${variants[variant]}
        transform transition-all duration-300 hover:scale-105 hover:shadow-2xl
        border-2 border-transparent hover:animate-pulse
        ${isHovered ? 'animate-pulse' : ''}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 transition-opacity duration-300" />
      <div className="absolute inset-0 border-2 border-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />
    </a>
  )
}

function SystemStatus() {
  const [systems] = useState([
    { name: 'NEURAL LINK', status: 'ONLINE', level: 98 },
    { name: 'QUANTUM CORE', status: 'STABLE', level: 87 },
    { name: 'DATA STREAM', status: 'ACTIVE', level: 94 },
    { name: 'FIREWALL', status: 'SECURE', level: 91 }
  ])

  return (
    <div className="mt-12 grid grid-cols-2 gap-4 w-full max-w-2xl">
      {systems.map((system, index) => (
        <div key={index} className="bg-black/50 border border-cyan-400/30 p-4 cyber-panel">
          <div className="flex justify-between items-center mb-2">
            <span className="text-cyan-400 font-mono text-sm">{system.name}</span>
            <span className="text-green-400 font-mono text-xs">{system.status}</span>
          </div>
          <div className="w-full bg-gray-800 h-2 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-cyan-500 to-green-400 transition-all duration-300 animate-pulse"
              style={{ width: `${system.level}%` }}
            />
          </div>
          <div className="text-right text-cyan-400 font-mono text-xs mt-1">
            {system.level}%
          </div>
        </div>
      ))}
    </div>
  )
}

function App() {
  const [scanlinePosition, setScanlinePosition] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setScanlinePosition(prev => (prev + 1) % 100)
    }, 50)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <style>{`
        .neon-text {
          text-shadow: 0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor, 0 0 20px currentColor;
        }
        .glitch-text {
          animation: glitch 0.3s;
        }
        @keyframes glitch {
          0% { transform: translateX(0); }
          20% { transform: translateX(-2px); }
          40% { transform: translateX(2px); }
          60% { transform: translateX(-2px); }
          80% { transform: translateX(2px); }
          100% { transform: translateX(0); }
        }
        .cyber-glow-cyan { filter: drop-shadow(0 0 10px #22d3ee) drop-shadow(0 0 20px #22d3ee); }
        .cyber-glow-green { filter: drop-shadow(0 0 10px #4ade80) drop-shadow(0 0 20px #4ade80); }
        .cyber-glow-purple { filter: drop-shadow(0 0 10px #a855f7) drop-shadow(0 0 20px #a855f7); }
        .cyber-glow-pink { filter: drop-shadow(0 0 10px #ec4899) drop-shadow(0 0 20px #ec4899); }
        .cyber-border-cyan { box-shadow: 0 0 15px rgba(34, 211, 238, 0.5); }
        .cyber-border-purple { box-shadow: 0 0 15px rgba(168, 85, 247, 0.5); }
        .cyber-panel {
          background: linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(0,30,50,0.8) 100%);
          box-shadow: inset 0 0 20px rgba(34, 211, 238, 0.1), 0 0 10px rgba(34, 211, 238, 0.2);
        }
        .scanline {
          position: absolute;
          top: ${scanlinePosition}%;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, #00ff41, transparent);
          pointer-events: none;
          z-index: 1000;
        }
      `}</style>
      
      <MatrixRain />
      <div className="scanline" />
      
      <div className="relative z-10 text-center min-h-screen">
        <header className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-black via-gray-900 to-black text-white px-8">
          <CyberLogo />
          <CyberClock />
          
          <div className="mb-12 max-w-4xl">
            <p className="text-green-400 font-mono mb-6 text-lg tracking-wider">
              &gt; CYBERPUNK NEURAL INTERFACE INITIALIZED_
            </p>
            <p className="text-cyan-400 font-mono mb-4 text-sm opacity-80">
              PROTOCOL: Edit <code className="bg-black/50 px-2 py-1 border border-cyan-400/30">src/routes/index.tsx</code> to modify reality matrix
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 mb-8">
            <CyberButton href="https://reactjs.org" variant="primary">
              [ ENTER REACT MATRIX ]
            </CyberButton>
            <CyberButton href="https://tanstack.com" variant="secondary">
              [ ACCESS TANSTACK CORE ]
            </CyberButton>
          </div>
          
          <SystemStatus />
        </header>
      </div>
    </>
  )
}
