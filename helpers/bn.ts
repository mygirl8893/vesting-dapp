import BigNumber from 'bignumber.js'


BigNumber.config ({ EXPONENTIAL_AT: 1e+9 })

const multiplier = new BigNumber(10).exponentiatedBy(18).toString()

const getAmount = (amount: string): string => {
  const tokens = new BigNumber(amount)

  return tokens.multipliedBy(multiplier).toString()
}

const getValueFromBN = (value: string): string => {
  const result = new BigNumber(value)

  return result.dividedBy(multiplier).toFormat()
}

const subtract = (value1: string, value2: string): string => {
  const v1 = new BigNumber(value1)
  const v2 = new BigNumber(value2).toString()
 
  return v1.minus(v2).toString()
}

const add = (value1: string, value2: string): string => {
  const v1 = new BigNumber(value1)
  const v2 = new BigNumber(value2).toString()
 
  return v1.plus(v2).toString()
}

export default {
  add,
  subtract,
  getAmount,
  getValueFromBN,
}
