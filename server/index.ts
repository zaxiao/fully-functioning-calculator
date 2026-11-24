import express from 'express'

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

  res.json({
    message: String(result),
  })
})

app.listen(3001, () => {
  console.log('Backend running at http://localhost:3001')
})