import express from 'express'
import { getSassed } from './sass.js'
import { fileURLToPath } from 'node:url'

const app = express()

app.use(express.json())

// TODO: Replace eval() with a maths expression parser; add input validation
// and tests for invalid expressions, operator precedence, and division by zero.
app.post('/api/calculate', (req, res) => {
  const expression = req.body?.expression
  
  if (
    typeof expression !== 'string' ||
    !/^\d+(?:\s*[+\-*/]\s*\d+)*$/.test(expression)
  ) {
    res.status(400).json({ message: 'WTH is that' })
    return
  }

  const result = eval(expression)

  if (!Number.isFinite(result)) {
    res.status(400).json({ message: `Nu am creier`})
    return
  }

    const normalMode = req.body.normalMode === true

    res.json({
        message: normalMode
        ? String(result)
        : getSassed(expression),
    })
  })

const frontendPath = fileURLToPath(
  new URL('../client/dist/', import.meta.url),
)

app.use(express.static(frontendPath))

const port = Number(process.env.PORT || 3001)

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`)
})