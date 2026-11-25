import './App.css'
import { useEffect, useRef, useState } from 'react'
import LatticeLoader from './components/LatticeLoader'

const konamiCode = [
  'arrowup', 'arrowup',
  'arrowdown', 'arrowdown',
  'arrowleft', 'arrowright',
  'arrowleft', 'arrowright',
  'b', 'a',
]

function App() {
  const recentKeys = useRef<string[]>([])

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.repeat || event.ctrlKey || event.metaKey || event.altKey) {
        return
      }

      recentKeys.current = [
        ...recentKeys.current,
        event.key.toLowerCase(),
      ].slice(-konamiCode.length)

      const matches =
        recentKeys.current.length === konamiCode.length &&
        recentKeys.current.every((key, index) => key === konamiCode[index])

      if (matches) {
        setNormalMode(true)
        clearAll()
        recentKeys.current = []
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  //To look up -> the structure [] and useState?
  const [display, setDisplay] = useState('0')
  const [justCalculated, setJustCalculated] = useState(false)
  const [normalMode, setNormalMode] = useState(false)
  const showUpsideDown = !normalMode && display === '5318008'

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
        return `${expression.slice(0, -1)}${operator} `
      }

      return `${expression} ${operator} `
    })      
  }
  

  async function handleEquals() {
    if (showUpsideDown) {
      setJustCalculated(true)
      return
    }

    try {
      const response = await fetch('/api/calculate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          expression: display,
          normalMode
        }),
      })

      if (!response.ok) {
        throw new Error(`Oh no I can't accept this request`)
      }

      const data = await response.json()

      setDisplay(data.message)
      setJustCalculated(true)
    } catch (error) {
      console.error(error)
      setDisplay('WTH is that?! You do it🙄')
      setJustCalculated(true)
    }
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
    <main className="page">
      <h1>I am a fully functioning calculator</h1>
      <h3>Be warned: I'm VERY polite</h3>

      <section className="calculator" aria-label="Calculator">
        <output className="display">
          {showUpsideDown ? (
            <span className="display-upside-down" role="img" aria-label="BOOBIES">
              {display}
            </span>
          ) : display}
        </output>

        <div className="keypad">
          <button onClick={clearAll}>AC</button>
          <button onClick={deleteLastDigit}>C</button>
          <button onClick={handleEquals}>=</button>
          <button onClick={() => chooseOperator('/')}>/</button>
          <button onClick={() => appendDigit('7')}>7</button>
          <button onClick={() => appendDigit('8')}>8</button>
          <button onClick={() => appendDigit('9')}>9</button>
          <button onClick={() => chooseOperator('*')}>*</button>
          <button onClick={() => appendDigit('4')}>4</button>
          <button onClick={() => appendDigit('5')}>5</button>
          <button onClick={() => appendDigit('6')}>6</button>
          <button onClick={() => chooseOperator('-')}>-</button>
          <button onClick={() => appendDigit('1')}>1</button>
          <button onClick={() => appendDigit('2')}>2</button>
          <button onClick={() => appendDigit('3')}>3</button>
          <button onClick={() => chooseOperator('+')}>+</button>
          <button onClick={() => appendDigit('0')}>0</button>
          <button onClick={() => ('WIP')}>.WIP</button>
          <button onClick={() => ('WIP')}>%WIP</button>
          <button
            className="thinking-button"
            type="button"
            aria-label="Thinking"
          >
          <LatticeLoader showTimer={false} />
          </button>
        </div>

        {normalMode && (
        <button
          className="boring-flag"
          onClick={() => {
            setNormalMode(false)
            clearAll()
          }}
        >
          This is<br />boring
        </button>
        )}
      </section>
    </main>
  )
}

export default App
