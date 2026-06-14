import { useEffect, useRef } from 'react'

interface Drop {
  x: number
  y: number
  length: number
  speed: number
  opacity: number
}

const DROP_COUNT = 200
const ANGLE = 70 * (Math.PI / 180) // near-vertical, slight wind

function initDrops(width: number, height: number): Drop[] {
  return Array.from({ length: DROP_COUNT }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    length: 10 + Math.random() * 20,
    speed: 4 + Math.random() * 8,
    opacity: 0.1 + Math.random() * 0.35,
  }))
}

export default function RainEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let drops: Drop[] = []

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      drops = initDrops(canvas.width, canvas.height)
    }

    resize()
    window.addEventListener('resize', resize)

    const dx = Math.cos(ANGLE)
    const dy = Math.sin(ANGLE)

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const drop of drops) {
        ctx.beginPath()
        ctx.moveTo(drop.x, drop.y)
        ctx.lineTo(drop.x - dx * drop.length, drop.y - dy * drop.length)
        ctx.strokeStyle = `rgba(180, 220, 200, ${drop.opacity})`
        ctx.lineWidth = 1
        ctx.stroke()

        drop.x += dx * drop.speed
        drop.y += dy * drop.speed

        if (drop.y > canvas.height + drop.length) {
          drop.y = -drop.length
          drop.x = Math.random() * canvas.width
        }
      }

      // mist at the bottom
      const mist = ctx.createLinearGradient(0, canvas.height * 0.75, 0, canvas.height)
      mist.addColorStop(0, 'rgba(45, 74, 45, 0)')
      mist.addColorStop(1, 'rgba(45, 74, 45, 0.45)')
      ctx.fillStyle = mist
      ctx.fillRect(0, canvas.height * 0.75, canvas.width, canvas.height * 0.25)

      animId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
    />
  )
}
