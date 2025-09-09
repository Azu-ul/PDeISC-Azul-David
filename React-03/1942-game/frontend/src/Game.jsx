import React, { useState, useEffect, useRef } from 'react'
import Player from './Player'
import Bullets from './Bullets'
import Enemy from './Enemy'
import useKeyboard from './useKeyboard'
import './styles.css'

const GAME_W = 480
const GAME_H = 700
const PLAYER_SPEED = 300
const BULLET_SPEED = 1000
const ENEMY_BULLET_SPEED = 400
const BULLET_COOLDOWN = 0.10
const MIN_BURST_INTERVAL = 4
const MAX_BURST_INTERVAL = 5
const MIN_BURST_COUNT = 3
const MAX_BURST_COUNT = 5
const ENEMY_SPEED = 120
const GREEN_ENEMY_SPEED = 200
const SLOW_DURATION = 1

export default function Game() {
  const keys = useKeyboard()
  const [player, setPlayer] = useState({ x: GAME_W / 2 - 16, y: GAME_H - 80 })
  const [bullets, setBullets] = useState([])
  const [enemyBullets, setEnemyBullets] = useState([])
  const [enemies, setEnemies] = useState([])
  const [score, setScore] = useState(0)

  const bulletsRef = useRef([])
  const enemyBulletsRef = useRef([])
  const enemiesRef = useRef([])
  const bulletCooldownRef = useRef(0)
  const burstTimerRef = useRef(MIN_BURST_INTERVAL + Math.random()*(MAX_BURST_INTERVAL-MIN_BURST_INTERVAL))

  useEffect(() => {
    let last = performance.now()
    let animId

    function loop(now) {
      const dt = (now - last)/1000
      last = now

      // Mover jugador
      setPlayer(p => {
        let nx = p.x
        let ny = p.y
        if(keys.ArrowLeft) nx -= PLAYER_SPEED*dt
        if(keys.ArrowRight) nx += PLAYER_SPEED*dt
        if(keys.ArrowUp) ny -= PLAYER_SPEED*dt
        if(keys.ArrowDown) ny += PLAYER_SPEED*dt
        nx = Math.max(0, Math.min(GAME_W-32, nx))
        ny = Math.max(0, Math.min(GAME_H-32, ny))
        return { ...p, x: nx, y: ny }
      })

      // Disparos jugador
      bulletCooldownRef.current -= dt
      if(keys.Space && bulletCooldownRef.current<=0){
        bulletsRef.current.push({ x: player.x+12, y: player.y-20, vx:0, vy:-BULLET_SPEED, sprite:'/assets/bullets.png' })
        setBullets([...bulletsRef.current])
        bulletCooldownRef.current = BULLET_COOLDOWN
      }
      bulletsRef.current = bulletsRef.current.map(b=>({...b, x:b.x+b.vx*dt, y:b.y+b.vy*dt})).filter(b=>b.y>-20)
      setBullets([...bulletsRef.current])

      // Spawn de ráfagas enemigos normales
      burstTimerRef.current -= dt
      if(burstTimerRef.current <= 0){
        const burstCount = Math.floor(Math.random()*(MAX_BURST_COUNT-MIN_BURST_COUNT+1))+MIN_BURST_COUNT
        for(let i=0;i<burstCount;i++){
          const startX = Math.random()*(GAME_W-32)
          const startY = -32 - Math.random()*100
          const limitY = GAME_H/2 + Math.random()*(GAME_H/2)
          const vx = (Math.random()-0.5)*40
          const vy = ENEMY_SPEED + Math.random()*30
          enemiesRef.current.push({
            x: startX,
            y: startY,
            vx,
            vy,
            state: 'down',
            limitY,
            age: 0,
            type: Math.random()<0.5?'sine':'zigzag',
            slowTimer: 0,
            sprite: '/assets/enemy.png',
            fireCooldown: 1 + Math.random()*2,
            points: 50
          })
        }
        burstTimerRef.current = MIN_BURST_INTERVAL + Math.random()*(MAX_BURST_INTERVAL-MIN_BURST_INTERVAL)
      }

      // Spawn de enemigos verdes solo si score>700
      if(score > 10 && Math.random()<0.01 && enemiesRef.current.filter(e=>e.type==='green').length<2){
        const fromLeft = Math.random()<0.5
        const startX = fromLeft ? -32 : GAME_W
        const startY = Math.random()*(GAME_H-100)
        const radius = 80 + Math.random()*70  // vuelta circular grande
        enemiesRef.current.push({
          x: startX,
          y: startY,
          type: 'green',
          state: 'approach',
          centerX: startX + (fromLeft ? radius : -radius),
          centerY: startY + radius,
          angle: fromLeft? Math.PI : 0, // 180° izquierda, 0° derecha
          radius,
          speed: GREEN_ENEMY_SPEED, // un poco más rápido
          sprite: '/assets/green_enemy.png',
          circleCount: 0,
          points: 100
        })
      }

      // Mover enemigos y disparos
      enemiesRef.current = enemiesRef.current.map(e=>{
        let nx = e.x
        let ny = e.y
        let nvx = e.vx
        let nvy = e.vy
        let age = e.age + dt
        let state = e.state
        let slowTimer = e.slowTimer
        let sprite = e.sprite
        let fireCooldown = e.fireCooldown - dt
        let angle = e.angle || 0

        if(e.type==='green'){
          if(state==='approach'){
            const dx = e.centerX - nx
            if(Math.abs(dx)<1) state='circle'
            else nx += dx*0.05
          } else if(state==='circle'){
            const deltaAngle = e.speed*dt/e.radius
            angle += deltaAngle
            nx = e.centerX + Math.cos(angle)*e.radius
            ny = e.centerY + Math.sin(angle)*e.radius
            if(angle >= 2*Math.PI){
              angle = 0
              e.circleCount +=1
              if(e.circleCount>=2) state='exit'
            }
          } else if(state==='exit'){
            nx += (nx>GAME_W/2? 1:-1)*e.speed*dt
            if(nx<-32 || nx>GAME_W) return null
          }
        } else {
          nx += nvx*dt
          ny += nvy*dt
          if(e.type==='sine') nx += Math.sin(age*3)*20*dt
          else if(e.type==='zigzag') nx += Math.sin(age*5)*30*dt

          if(state==='down' && ny >= e.limitY && slowTimer<=0){
            slowTimer = SLOW_DURATION
            nvy = nvy*0.4
            sprite = '/assets/turn.png'
          }
          if(slowTimer>0){
            slowTimer -= dt
            if(slowTimer<=0){
              nvy = -ENEMY_SPEED
              state = 'up'
              sprite = '/assets/volver.png'
            }
          }
          if(state==='up' && ny<-32) return null

          if(state==='down' && fireCooldown <= 0){
            const dx = (player.x+14) - (nx+14)
            const dy = (player.y+14) - (ny+14)
            const dist = Math.hypot(dx, dy)
            const vxBullet = dx/dist * ENEMY_BULLET_SPEED
            const vyBullet = dy/dist * ENEMY_BULLET_SPEED
            enemyBulletsRef.current.push({
              x: nx+12,
              y: ny+12,
              vx: vxBullet,
              vy: vyBullet,
              sprite: '/assets/enemy_bullet.png'
            })
            fireCooldown = 1 + Math.random()*2
          }
        }

        return {...e, x:nx, y:ny, vx:nvx, vy:nvy, age, state, slowTimer, sprite, fireCooldown, angle}
      }).filter(Boolean)

      // Mover balas enemigas
      enemyBulletsRef.current = enemyBulletsRef.current.map(b=>({...b, x:b.x+b.vx*dt, y:b.y+b.vy*dt}))
        .filter(b=>b.x>0 && b.x<GAME_W && b.y>0 && b.y<GAME_H)
      setEnemyBullets([...enemyBulletsRef.current])
      setEnemies([...enemiesRef.current])

      // Separar enemigos normales
      for(let iter=0; iter<2; iter++){
        for(let i=0; i<enemiesRef.current.length; i++){
          for(let j=i+1; j<enemiesRef.current.length; j++){
            const e1=enemiesRef.current[i], e2=enemiesRef.current[j]
            if(e1.type==='green' || e2.type==='green') continue
            const dx=e2.x-e1.x, dy=e2.y-e1.y, dist=Math.hypot(dx,dy)
            if(dist<30 && dist>0){ 
              const push=(30-dist)/2, nx=dx/dist, ny=dy/dist
              e1.x -= nx*push; e1.y -= ny*push
              e2.x += nx*push; e2.y += ny*push
            }
          }
        }
      }

      // Colisiones balas/enemigos
      bulletsRef.current.forEach((b, bi)=>{
        enemiesRef.current.forEach((en, ei)=>{
          if(b.x<en.x+28 && b.x+8>en.x && b.y<en.y+28 && b.y+16>en.y){
            bulletsRef.current.splice(bi,1)
            enemiesRef.current.splice(ei,1)
            setScore(s=>s+en.points)
          }
        })
      })

      // Colisiones jugador/balas enemigas
      enemyBulletsRef.current.forEach((b, bi)=>{
        if(player.x< b.x+8 && player.x+28> b.x && player.y< b.y+16 && player.y+28> b.y){
          bulletsRef.current=[]
          enemiesRef.current=[]
          enemyBulletsRef.current=[]
          setBullets([])
          setEnemies([])
          setEnemyBullets([])
          setScore(0)
          setPlayer({x:GAME_W/2-16, y:GAME_H-80})
        }
      })

      animId = requestAnimationFrame(loop)
    }

    animId = requestAnimationFrame(loop)
    return ()=>cancelAnimationFrame(animId)
  }, [keys, player, score])

  return (
    <div className="game-area border border-dark mx-auto position-relative bg-black" style={{width:GAME_W,height:GAME_H}}>
      <Player player={player}/>
      {bullets.map((b,i)=><Bullets key={i} bullet={b}/>)}
      {enemyBullets.map((b,i)=><Bullets key={i} bullet={b}/>)}
      {enemies.map((en,i)=><Enemy key={i} enemy={en}/>)}
      <div className="position-absolute top-0 start-0 p-2 text-bg-dark">Score: {score}</div>
    </div>
  )
}
