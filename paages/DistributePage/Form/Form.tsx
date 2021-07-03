import React from 'react'
import { Form as FormularForm, useForm, useFieldState } from 'formular'
import { parseUnits } from '@ethersproject/units'
import DatePicker from 'react-datepicker'
import { useWeb3React } from '@web3-react/core'
import { tokenContract, getVestingContract } from 'contracts'
import { useReducerState } from 'hooks'

import s from './Form.module.scss'
import 'react-datepicker/dist/react-datepicker.css'


const getSeconds = (date: number): number =>
  parseInt(String(new Date(date).getTime() / 1000))

type FormFields = {
  address: string
  amount: string
  startDate: number
  endDate: number
  cliffDate: number
}

const Input = ({ field }) => {
  const { value } = useFieldState<string>(field)

  const handleChange = (event) => {
    field.set(event.target.value)
  }

  return (
    <input
      className={s.input}
      value={value}
      onChange={handleChange}
    />
  )
}

type StartDateProps = {
  form: FormularForm<FormFields>
  minDate: Date
}

const StartDate: React.FunctionComponent<StartDateProps> = ({ form, minDate }) => {
  const { value: startDate } = useFieldState<number>(form.fields.startDate)

  const handleChange = (date) => {
    form.fields.startDate.set(date.getTime())
  }

  return (
    <DatePicker
      wrapperClassName={s.datePicker}
      selected={startDate ? new Date(startDate) : null}
      minDate={minDate}
      onChange={handleChange}
    />
  )
}

type EndDateProps = {
  form: FormularForm<FormFields>
  minDate: Date
}

const EndDate: React.FunctionComponent<EndDateProps> = ({ form, minDate }) => {
  const { value: startDate } = useFieldState<number>(form.fields.startDate)
  const { value: endDate } = useFieldState<number>(form.fields.endDate)

  const handleChange = (date) => {
    form.fields.endDate.set(date.getTime())
  }

  const maxDate = startDate ? new Date(new Date(startDate).setFullYear(new Date(startDate).getFullYear() + 1)) : null

  return (
    <DatePicker
      wrapperClassName={s.datePicker}
      selected={endDate ? new Date(endDate) : null}
      minDate={minDate}
      maxDate={maxDate}
      disabled={!startDate}
      placeholderText={startDate ? '' : 'Select start date'}
      onChange={handleChange}
    />
  )
}

type CliffDateProps = {
  form: FormularForm<FormFields>
}

const CliffDate: React.FunctionComponent<CliffDateProps> = ({ form }) => {
  const { value: startDate } = useFieldState<number>(form.fields.startDate)
  const { value: endDate } = useFieldState<number>(form.fields.endDate)
  const { value: cliffDate } = useFieldState<number>(form.fields.cliffDate)

  const handleChange = (date: Date) => {
    form.fields.cliffDate.set(date.getTime())
  }

  return (
    <DatePicker
      wrapperClassName={s.datePicker}
      selected={cliffDate ? new Date(cliffDate) : null}
      minDate={startDate ? new Date(startDate) : null}
      maxDate={endDate ? new Date(endDate) : null}
      disabled={!startDate || !endDate}
      placeholderText={(startDate && endDate) ? '' : 'Select start and end dates'}
      onChange={handleChange}
    />
  )
}

const Form: React.FunctionComponent = () => {
  const { account, library } = useWeb3React()

  const [ { isFetching, error }, setState ] = useReducerState({ isFetching: false, error: null })

  const form = useForm<FormFields>({
    fields: {
      address: [],
      amount: [],
      startDate: [],
      endDate: [],
      cliffDate: [],
    },
  })

  const handleSubmit = async () => {
    if (!library || isFetching) {
      return
    }

    const { values } = await form.submit()

    /*const hasEmpty = !Object.values(values).every(Boolean)
    const incorrectAddress = !/^0x[a-fA-F0-9]{40}$/.test(values.address)
    const incorrectAmountCount = values.amount && +values.amount < 0.00001
    const incorrectAmountValue = values.amount && !/[0-9.]/.test(values.amount)

    if (form.error) {
      handleSetError('')
    }

    if (hasEmpty) {
      return handleSetError('All fields are required')
    }

    if (incorrectAddress) {
      return handleSetError('Not valid address')
    }

    if (incorrectAmountCount) {
      return handleSetError('Amount must be greater than 0.00001')
    }

    if (incorrectAmountValue) {
      return handleSetError('Not valid amount')
    }*/

    try {
      const tokenDecimals = await tokenContract.decimals()

      let { address, amount, startDate, endDate, cliffDate } = values

      startDate = getSeconds(startDate) as any
      endDate = getSeconds(endDate) as any
      cliffDate = getSeconds(cliffDate) as any
      amount = parseUnits(amount, tokenDecimals) as any

      const vestingContract = getVestingContract(library)

      setState({ isFetching: true })

      const receipt = await vestingContract.holdTokens(address, amount, startDate, endDate, cliffDate)

      console.log('receipt:', receipt)

      await receipt.wait()

      console.log('success')
    }
    catch (err) {
      console.error(err)
      alert('Something went wrong! :(')
    }
  }

  const minDate = new Date(new Date().setDate(new Date().getDate() + 1))

  return (
    <div className={s.container}>
      <div className={s.title}>Address</div>
      <Input field={form.fields.address} />

      <div className={s.title}>Amount</div>
      <Input field={form.fields.amount} />

      <div className={s.title}>Start date</div>
      <StartDate form={form} minDate={minDate} />

      <div className={s.title}>End date</div>
      <EndDate form={form} minDate={minDate} />

      <div className={s.title}>Cliff date</div>
      <CliffDate form={form} />

      <button className={s.button} disabled={isFetching} onClick={handleSubmit}>
        {isFetching ? 'Loading...' : 'Distribute'}
      </button>
    </div>
  )
}


export default Form
