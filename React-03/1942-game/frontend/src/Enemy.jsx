import React from 'react'

export default function Enemy({ enemy }) {
  return (
    <img
      src={enemy.sprite}
      alt="enemy"
      className="sprite"
      style={{
        left: enemy.x,
        top: enemy.y,
        transform: `rotate(${enemy.angle || 0}rad)`,
        transformOrigin: 'center center'
      }}
    />
  )
}
