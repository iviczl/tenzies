import { useEffect, useState } from 'react'
import './App.css'
import Die from './components/Die'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

function App() {
  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)

  useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const value = dice[0].value
    const allSame = dice.every(die => die.value == value)
    setTenzies(allHeld && allSame)
  }, [dice])

  function allNewDice() {
    const newDice = []
    for(let i = 0; i < 10; i++) {
      newDice.push(newDie())
    }
    return newDice
  }

  function newDie() {
    return { id: nanoid(), value: Math.ceil(Math.random() * 6), isHeld: false }
  }
  const diceElements = dice.map(die => <Die key={ die.id } value={ die.value } 
    toggle={() => clickDie(die.id)} 
    isHeld={ die.isHeld }/>)

  function roll() {
    if(tenzies) {
      setDice(allNewDice)
    } else {
      setDice(prevDice => prevDice.map(die => die.isHeld ? 
        die:
        newDie()
      ))
    }
  }

  function clickDie(id) {
    setDice(() => dice.map(die => die.id === id ? 
      {
        ...die,
        isHeld: !die.isHeld
      }:
      die
    ))
  }

  return (
    <div className='page'>
      { tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <div>Roll until all dice are the same. 
        Click each die to freeze it at its current value between rolls.
      </div>
      <div className="container">
        { diceElements }
      </div>
      <button className='roll-button' onClick={roll}>{ tenzies ? 'Reset game' : 'Roll' }</button>
    </div>
  )
}

export default App
