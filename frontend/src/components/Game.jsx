import React from 'react'
import { Card } from 'react-bootstrap'

function Game({game}) {
  return (
    <Card className='my-3 p-3 rounded'>
        <a href={`/game/${game.name}`}>
            <Card.Img src={game.image} />
        </a>
    </Card>
  )
}

export default Game;
