import './App.css'
import { useState } from 'react'

function App() {
  //To look up -> the structure [] and useState?
  const [display, setDisplay] = useState('0')
  const [justCalculated, setJustCalculated] = useState(false)

  //To look up -> the current => structure??
  function appendDigit(digit: string) {
    if (justCalculated) {
      setDisplay(digit)
      setJustCalculated(false)
      return
    }

    setDisplay(current => current === '0' ? digit : current + digit)
  }

  function chooseOperator(operator: string) {
    if (justCalculated){
      return
    }

    setDisplay(current => {
      const expression = current.trimEnd()
      const lastDigit = expression.slice(-1)
      const operators = ['+', '-', '*', '/']

      if (operators.includes(lastDigit)) {
        return `${expression.slice(0, -1)}${operator}`
      }

      return `${expression} ${operator}`
    })      
  }
  //Temporary
  function handleEquals() {
    setDisplay('You do it')
    setJustCalculated(true)
  } 

  function clearAll() {
    setDisplay('0')
    setJustCalculated(false)
  }

  function deleteLastDigit() {
    if (justCalculated) {
      clearAll()
      setJustCalculated(false)
      return
    }

    setDisplay(current => {
      const deleteIt = current.trimEnd().slice(0, -1).trimEnd()

      return deleteIt === '' ? '0' : deleteIt
      })
  }

  return (
    <main>
      <h1>I am a FULLY functioning calculator</h1>

      <output>{display}</output>

      <div>
        <button onClick={() => appendDigit('1')}>1</button>
        <button onClick={() => appendDigit('2')}>2</button>
        <button onClick={() => appendDigit('3')}>3</button>
        <button onClick={() => appendDigit('4')}>4</button>
        <button onClick={() => appendDigit('5')}>5</button>
        <button onClick={() => appendDigit('6')}>6</button>
        <button onClick={() => appendDigit('7')}>7</button>
        <button onClick={() => appendDigit('8')}>8</button>
        <button onClick={() => appendDigit('9')}>9</button>
        <button onClick={() => appendDigit('0')}>0</button>
        <button onClick={() => chooseOperator('+')}>+</button>
        <button onClick={() => chooseOperator('-')}>-</button>
        <button onClick={() => chooseOperator('*')}>*</button>
        <button onClick={() => chooseOperator('/')}>/</button>
        <button onClick={handleEquals}>=</button>
        <button onClick={clearAll}>AC</button>
        <button onClick={deleteLastDigit}>C</button>
      </div>
    </main>
  )
}

export default App
