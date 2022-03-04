type Opts = {
  prefix?: string
  postfix?: string
  fixAmount?: number
  maxFixAmount?: number
}

/*
  toLocaleString(100_000) // 100,000
  toLocaleString(100_000.123) // 100,000.12
  toLocaleString(100_000.0000123) // 100,000
  toLocaleString(0.1) // 0.1
  toLocaleString(0.123) // 0.12
  toLocaleString(0.000123) // 0.000123
  toLocaleString(0.000000000123) // 0 - this is exception to avoid long numbers
 */

// ATTN it's just for VIEW!
const toLocaleString = (value: string | number | null | undefined, opts?: Opts): string => {
  let { prefix = '', postfix = '', fixAmount = 2, maxFixAmount = 5 } = opts || {}

  if (fixAmount > maxFixAmount) {
    fixAmount = maxFixAmount
  }

  if (typeof value === 'string') {
    value = parseFloat(value)
  }

  if (!Number.isFinite(value)) {
    return
  }

  const regex1 = new RegExp(`^0\.0{${maxFixAmount}}`)
  const regex2 = new RegExp(`^0\.0{${fixAmount}}`)

  let num: string

  if (regex1.test(String(value))) {
    num = '0'
  }
  // if formatting a number with a "fixAmount" will result in a value of "0.00..."
  else if (regex2.test(String(value))) {
    // 0.00027033040765814 -> 0.00027
    num = String(value).replace(/(^0.0+..).+/, '$1')
    num = parseFloat(num).toFixed(fixAmount)
  }
  else {
    num = parseFloat(value.toFixed(fixAmount)).toLocaleString('en', { maximumFractionDigits: fixAmount })
  }

  return `${prefix}${num}${postfix}`
}


export default toLocaleString
