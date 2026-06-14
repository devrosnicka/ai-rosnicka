import { useEffect, useRef } from 'react'

interface Drop {
  x: number
  y: number
  length: number
  speed: number
  opacity: number
}

const DROP_COUNT = 200
const ANGLE = 70 * (Math.PI / 180)
const dx = Math.cos(ANGLE)
const dy = Math.sin(ANGLE)

const CANOPY_R = 72
const POLE_HEIGHT = 110
const NUM_PANELS = 8

function xOverflow(height: number) {
  return height * (dx / dy)
}

function initDrops(width: number, height: number): Drop[] {
  const overflow = xOverflow(height)
  return Array.from({ length: DROP_COUNT }, () => ({
    x: Math.random() * (width + overflow) - overflow,
    y: Math.random() * height,
    length: 10 + Math.random() * 20,
    speed: 4 + Math.random() * 8,
    opacity: 0.1 + Math.random() * 0.35,
  }))
}

function drawUmbrella(ctx: CanvasRenderingContext2D, x: number, y: number, open: boolean) {
  const cx = x
  const cy = y - POLE_HEIGHT

  ctx.save()

  if (open) {
    // Alternating panels
    for (let i = 0; i < NUM_PANELS; i++) {
      const a1 = Math.PI + (i / NUM_PANELS) * Math.PI
      const a2 = Math.PI + ((i + 1) / NUM_PANELS) * Math.PI
      ctx.beginPath()
      ctx.moveTo(cx, cy)
      ctx.arc(cx, cy, CANOPY_R, a1, a2)
      ctx.closePath()
      ctx.fillStyle = i % 2 === 0 ? 'rgba(74, 124, 74, 0.93)' : 'rgba(45, 74, 45, 0.93)'
      ctx.fill()
    }

    // Ribs
    ctx.lineWidth = 1.5
    ctx.strokeStyle = '#1a2e1a'
    for (let i = 0; i <= NUM_PANELS; i++) {
      const a = Math.PI + (i / NUM_PANELS) * Math.PI
      ctx.beginPath()
      ctx.moveTo(cx, cy)
      ctx.lineTo(cx + CANOPY_R * Math.cos(a), cy + CANOPY_R * Math.sin(a))
      ctx.stroke()
    }

    // Scalloped edges (control point slightly outside the arc perimeter)
    ctx.lineWidth = 2
    ctx.strokeStyle = '#6db86d'
    for (let i = 0; i < NUM_PANELS; i++) {
      const a1 = Math.PI + (i / NUM_PANELS) * Math.PI
      const a2 = Math.PI + ((i + 1) / NUM_PANELS) * Math.PI
      const aMid = (a1 + a2) / 2
      ctx.beginPath()
      ctx.moveTo(cx + CANOPY_R * Math.cos(a1), cy + CANOPY_R * Math.sin(a1))
      ctx.quadraticCurveTo(
        cx + (CANOPY_R + 13) * Math.cos(aMid),
        cy + (CANOPY_R + 13) * Math.sin(aMid),
        cx + CANOPY_R * Math.cos(a2),
        cy + CANOPY_R * Math.sin(a2),
      )
      ctx.stroke()
    }

    // Top finial
    ctx.beginPath()
    ctx.arc(cx, cy - CANOPY_R, 5, 0, Math.PI * 2)
    ctx.fillStyle = '#6db86d'
    ctx.fill()
  } else {
    // Closed: narrow furled canopy
    ctx.beginPath()
    ctx.ellipse(cx, cy, 8, 30, 0, 0, Math.PI * 2)
    ctx.fillStyle = 'rgba(74, 124, 74, 0.93)'
    ctx.fill()
    ctx.strokeStyle = '#6db86d'
    ctx.lineWidth = 1.5
    ctx.stroke()

    ctx.beginPath()
    ctx.arc(cx, cy - 30, 4, 0, Math.PI * 2)
    ctx.fillStyle = '#6db86d'
    ctx.fill()
  }

  // Pole
  ctx.beginPath()
  ctx.moveTo(cx, cy)
  ctx.lineTo(x, y)
  ctx.strokeStyle = '#1a2e1a'
  ctx.lineWidth = 3
  ctx.lineCap = 'round'
  ctx.stroke()

  // J-handle
  ctx.beginPath()
  ctx.moveTo(x, y)
  ctx.bezierCurveTo(x, y + 16, x + 22, y + 16, x + 18, y + 36)
  ctx.strokeStyle = '#4a7c4a'
  ctx.lineWidth = 5
  ctx.lineCap = 'round'
  ctx.stroke()

  ctx.restore()
}

interface Props {
  mousePosRef: React.RefObject<{ x: number; y: number }>
  isHoveringRef: React.RefObject<boolean>
}

export default function RainEffect({ mousePosRef, isHoveringRef }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let drops: Drop[] = []
    let overflow = 0

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      overflow = xOverflow(canvas.height)
      drops = initDrops(canvas.width, canvas.height)
    }

    resize()
    window.addEventListener('resize', resize)

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const { x: mx, y: my } = mousePosRef.current
      const isHovering = isHoveringRef.current
      const hasEntered = mx >= 0

      // Canopy center (used to skip drops in rain shadow)
      const umbCX = mx
      const umbCY = my - POLE_HEIGHT

      for (const drop of drops) {
        // Advance position first so drops never pile up
        const nextX = drop.x + dx * drop.speed
        const nextY = drop.y + dy * drop.speed

        // Determine if this drop is sheltered by the open umbrella.
        // Above the flat base: check if it's inside the dome circle.
        // Below the flat base: project the drop back along the rain angle to the
        // canopy height — if that projected x lands within the canopy radius the
        // drop would have been intercepted before reaching its current position.
        let inShadow = false
        if (hasEntered && isHovering) {
          if (drop.y < umbCY) {
            inShadow = (drop.x - umbCX) ** 2 + (drop.y - umbCY) ** 2 < CANOPY_R ** 2
          } else {
            const projX = drop.x - (drop.y - umbCY) * (dx / dy)
            inShadow = Math.abs(projX - umbCX) < CANOPY_R
          }
        }

        if (!inShadow) {
          ctx.beginPath()
          ctx.moveTo(drop.x, drop.y)
          ctx.lineTo(drop.x - dx * drop.length, drop.y - dy * drop.length)
          ctx.strokeStyle = `rgba(180, 220, 200, ${drop.opacity})`
          ctx.lineWidth = 1
          ctx.stroke()
        }

        drop.x = nextX
        drop.y = nextY

        if (drop.y > canvas.height + drop.length) {
          drop.y = -drop.length
          drop.x = Math.random() * (canvas.width + overflow) - overflow
        }
      }

      // Mist at the bottom
      const mist = ctx.createLinearGradient(0, canvas.height * 0.75, 0, canvas.height)
      mist.addColorStop(0, 'rgba(45, 74, 45, 0)')
      mist.addColorStop(1, 'rgba(45, 74, 45, 0.45)')
      ctx.fillStyle = mist
      ctx.fillRect(0, canvas.height * 0.75, canvas.width, canvas.height * 0.25)

      // Draw umbrella (open when hovering, closed at last position after leaving)
      if (hasEntered) {
        drawUmbrella(ctx, mx, my, isHovering)
      }

      animId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [mousePosRef, isHoveringRef])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
    />
  )
}
