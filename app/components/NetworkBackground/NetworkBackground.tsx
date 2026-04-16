'use client'

import { useEffect, useRef } from 'react'

export default function NetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!

    let width = canvas.offsetWidth
    let height = canvas.offsetHeight

    canvas.width = width
    canvas.height = height

    const mouse = {
      x: width / 2,
      y: height / 2,
    }

    const NODE_COUNT = 120
    const MAX_DIST = 140

    class Node {
      x: number
      y: number
      vx: number
      vy: number

      constructor() {
        // distribución tipo “mapa” (más densidad en zonas)
        this.x = Math.random() * width
        this.y = Math.random() * height

        this.vx = (Math.random() - 0.5) * 0.4
        this.vy = (Math.random() - 0.5) * 0.4
      }

      update() {
        this.x += this.vx
        this.y += this.vy

        // rebote suave
        if (this.x < 0 || this.x > width) this.vx *= -1
        if (this.y < 0 || this.y > height) this.vy *= -1

        // interacción con mouse
        const dx = this.x - mouse.x
        const dy = this.y - mouse.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < 150) {
          const force = (150 - dist) / 150
          this.x += dx * force * 0.02
          this.y += dy * force * 0.02
        }
      }

      draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, 1.5, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(0,229,255,0.8)'
        ctx.fill()
      }
    }

    const nodes: Node[] = []
    for (let i = 0; i < NODE_COUNT; i++) {
      nodes.push(new Node())
    }

    function drawConnections() {
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < MAX_DIST) {
            const opacity = 1 - dist / MAX_DIST
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.strokeStyle = `rgba(0,229,255,${opacity * 0.3})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, width, height)

      nodes.forEach((node) => {
        node.update()
        node.draw()
      })

      drawConnections()

      requestAnimationFrame(animate)
    }

    animate()

    // mouse tracking
    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    })

    // resize
    window.addEventListener('resize', () => {
      width = canvas.offsetWidth
      height = canvas.offsetHeight
      canvas.width = width
      canvas.height = height
    })
  }, [])

  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
}