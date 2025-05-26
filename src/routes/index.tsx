import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'

export const Route = createFileRoute('/')({
  component: App,
})

function Clock() {
  const [time, setTime] = useState(new Date())
  const [glitch, setGlitch] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    const glitchTimer = setInterval(() => {
      setGlitch(true)
      setTimeout(() => setGlitch(false), 150)
    }, Math.random() * 8000 + 3000)

    return () => {
      clearInterval(timer)
      clearInterval(glitchTimer)
    }
  }, [])

  return (
    <div className="font-mono mb-8 relative">
      <div className={`text-4xl font-bold tracking-wider transition-all duration-150 ${
        glitch 
          ? 'text-red-400 animate-pulse transform skew-x-2 scale-105' 
          : 'text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]'
      }`}>
        {time.toLocaleTimeString()}
      </div>
      <div className="text-lg text-green-400 mt-2 tracking-widest opacity-90 drop-shadow-[0_0_5px_rgba(34,197,94,0.6)]">
        {time.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
      </div>
      {glitch && (
        <div className="absolute inset-0 text-4xl font-bold tracking-wider text-red-500 opacity-60 animate-ping">
          {time.toLocaleTimeString()}
        </div>
      )}
    </div>
  )
}

function MatrixRain() {
  const [drops, setDrops] = useState<number[]>([])

  useEffect(() => {
    const columns = Math.floor(window.innerWidth / 20)
    const initialDrops = Array(columns).fill(0).map(() => Math.floor(Math.random() * -100))
    setDrops(initialDrops)

    const interval = setInterval(() => {
      setDrops(prev => prev.map(drop => {
        const newDrop = drop + 1
        return newDrop > window.innerHeight / 20 ? Math.floor(Math.random() * -20) : newDrop
      }))
    }, 100)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 opacity-20">
      {drops.map((drop, i) => (
        <div
          key={i}
          className="absolute text-green-400 text-sm font-mono animate-pulse"
          style={{
            left: i * 20,
            top: drop * 20,
            filter: 'drop-shadow(0 0 3px rgba(34,197,94,0.8))'
          }}
        >
          {String.fromCharCode(0x30A0 + Math.random() * 96)}
        </div>
      ))}
    </div>
  )
}

function CyberGrid() {
  return (
    <div className="absolute inset-0 opacity-10 pointer-events-none">
      <div className="h-full w-full" style={{
        backgroundImage: `
          linear-gradient(rgba(34,211,238,0.3) 1px, transparent 1px),
          linear-gradient(90deg, rgba(34,211,238,0.3) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px'
      }} />
    </div>
  )
}

function App() {
  const [hackingText, setHackingText] = useState('')
  const [scanLine, setScanLine] = useState(0)

  useEffect(() => {
    const messages = [
      'SYSTEM INITIALIZED...',
      'NEURAL NETWORK ACTIVE',
      'QUANTUM ENCRYPTION ENABLED',
      'FIREWALL STATUS: OPTIMAL',
      'DATA STREAM SECURED'
    ]
    
    let messageIndex = 0
    const typeText = () => {
      const message = messages[messageIndex]
      let charIndex = 0
      setHackingText('')
      
      const typeInterval = setInterval(() => {
        if (charIndex < message.length) {
          setHackingText(message.substring(0, charIndex + 1))
          charIndex++
        } else {
          clearInterval(typeInterval)
          setTimeout(() => {
            messageIndex = (messageIndex + 1) % messages.length
            typeText()
          }, 2000)
        }
      }, 100)
    }
    
    typeText()

    const scanInterval = setInterval(() => {
      setScanLine(prev => (prev + 2) % 100)
    }, 50)

    return () => clearInterval(scanInterval)
  }, [])

  return (
    <div className="text-center relative overflow-hidden">
      <MatrixRain />
      <CyberGrid />
      
      <div 
        className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-60 z-10"
        style={{ top: `${scanLine}%`, transition: 'top 0.05s linear' }}
      />
      
      <header className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black text-white relative z-20">
        <div className="relative mb-8">
          <div className="w-48 h-48 border-2 border-cyan-400 rounded-full animate-spin
                         shadow-[0_0_50px_rgba(34,211,238,0.8),inset_0_0_50px_rgba(34,211,238,0.2)]">
            <div className="w-full h-full border-2 border-green-400 rounded-full animate-reverse-spin
                           shadow-[0_0_30px_rgba(34,197,94,0.6)]">
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-6xl font-bold text-transparent bg-gradient-to-r from-cyan-400 to-green-400 
                               bg-clip-text animate-pulse">
                  ∞
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <Clock />
        
        <div className="mb-8 h-8">
          <p className="text-lg font-mono text-green-400 tracking-widest drop-shadow-[0_0_10px_rgba(34,197,94,0.8)]">
            > {hackingText}<span className="animate-blink">_</span>
          </p>
        </div>
        
        <p className="mb-6 text-gray-300 font-mono text-sm tracking-wider">
          [ QUANTUM DEVELOPMENT ENVIRONMENT ACTIVE ]
        </p>
        
        <div className="flex flex-col space-y-4">
          <a
            className="group px-6 py-3 border border-cyan-400 text-cyan-400 font-mono tracking-widest
                     hover:bg-cyan-400 hover:text-black transition-all duration-300
                     shadow-[0_0_20px_rgba(34,211,238,0.5)] hover:shadow-[0_0_30px_rgba(34,211,238,0.8)]
                     transform hover:scale-105"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="relative z-10">[ ACCESS REACT NEURAL NET ]</span>
          </a>
          <a
            className="group px-6 py-3 border border-green-400 text-green-400 font-mono tracking-widest
                     hover:bg-green-400 hover:text-black transition-all duration-300
                     shadow-[0_0_20px_rgba(34,197,94,0.5)] hover:shadow-[0_0_30px_rgba(34,197,94,0.8)]
                     transform hover:scale-105"
            href="https://tanstack.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="relative z-10">[ ENTER TANSTACK MATRIX ]</span>
          </a>
        </div>
      </header>
    </div>
  )
}
