import express from 'express'

const easyCalculationSass = [
    `SERIOUSLY??? USE YOUR BRAIN`,
    `YOU REALLY NEEDED ME FOR THIS?`,
    `TRY HARDER...`,
    `DID YOU KNOW THAT THERE'S SOMETHING CALLED A BRAIN?`,
    `OH COME ON A TODDLER CAN DO THIS`
]

const hardCalculationSass = [
    `HOW WOULD I KNOW? JEEZ.`,
    `THIS SOUNDS LIKE A YOU PROBLEM.`,
    `ASK SOMEONE WHO PAID ATTENTION IN MATHS.`,
    `&A%n@/^9&$`,
    `YOU NEED TO PAY ME MORE FOR THIS`
]

function isEasyCalculation(expression: string): boolean {
    const numbers = expression
    .split(/[+\-*/]/)
    .map(part => Number(part.trim()))

    const operators = expression
    .match(/[+\-*/]/g) ?? []

    const hasAdditionOrSubtraction = operators.some(
    operator => operator === '+' || operator === '-',
    )

    const hasMultiplicationOrDivision = operators.some(
    operator => operator === '*' || operator === '/',
    )

    const allBelow10 = numbers.every(number => number < 10)
    const allBelow100 = numbers.every(number => number < 100)

    if (hasAdditionOrSubtraction && hasMultiplicationOrDivision) {
        return allBelow10 && operators.length <= 4
    }

    if (hasMultiplicationOrDivision) {
        return allBelow10 && operators.length <= 3
    }

    if (allBelow10) {
        return operators.length <= 4
    }

    return operators.length <= 1

}

function pickRandom(sass: string[]): string {
  const index = Math.floor(Math.random() * sass.length)

  return sass[index]!
}

export function getSassed(expression: string): string {
    const sassComments = isEasyCalculation(expression)
        ? easyCalculationSass
        : hardCalculationSass

    return pickRandom(sassComments)
}

