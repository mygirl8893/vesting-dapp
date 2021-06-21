import { useState } from 'react'
import DatePicker from 'react-datepicker'
import { useSelector } from 'react-redux'
import { holdTokens } from 'helpers/contract'
import { selectMetaMaskAccounts } from 'redux/main'
import bn from 'helpers/bn'

import s from './SpreadForm.module.scss'
import 'react-datepicker/dist/react-datepicker.css'


type Form = {
  values: {
    address: string
    amount: string
    startDate: Date | null
    endDate: Date | null
    cliffDate: Date | null
  },
  error: string
  success: boolean
  isFetching: boolean
}

const initialState = {
  values: {
    address: '',
    amount: '',
    startDate: null,
    endDate: null,
    cliffDate: null,
  },
  error: '',
  success: false,
  isFetching: false,
}

const SpreadForm: React.FunctionComponent = () => {
  const [ userAddress ] = useSelector(selectMetaMaskAccounts)

  const [ form, changeForm ] = useState<Form>(initialState)

  const handleSetFetching = (status: boolean) => changeForm((state) => ({ ...state, isFetching: status }))
  const handleSetSuccess = (status: boolean) => changeForm((state) => ({ ...state, success: status }))
  const handleSetError = (error: string) => changeForm((state) => ({ ...state, error }))

  const setFormValue = (name: string, value: Date | string) => {
    handleSetError('')
    handleSetSuccess(false)
    changeForm((state) => ({
      ...state, values: { ...state.values, [name]: value }
    }))
  }

  const handleChangeAddress = (event: any) => setFormValue('address', event.target.value)
  const handleChangeAmount = (event: any) => setFormValue('amount', event.target.value)
  const handlechangeStartDate = (value: Date) => setFormValue('startDate', value)
  const handleChangeEndDate = (value: Date) => setFormValue('endDate', value)
  const handleChangeCliffDate = (value: Date) => setFormValue('cliffDate', value)

  const handleSumbit = () => {
    const hasEmpty = !Object.values(form.values).every(Boolean)
    const incorrectAddress = !/^0x[a-fA-F0-9]{40}$/.test(form.values.address)
    const incorrectAmountCount = form.values.amount && +form.values.amount < 0.00001
    const incorrectAmountValue = form.values.amount && !/[0-9\.]/.test(form.values.amount)

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
    }

    const { address, amount, startDate, endDate, cliffDate } = form.values

    const getSeconds = (date: Date): number => parseInt(String(new Date(date).getTime() / 1000))

    handleSetFetching(true)

    holdTokens({
      from: userAddress,
      params: {
        address,
        amount: bn.getAmount(amount),
        startDate: getSeconds(startDate as Date),
        endDate: getSeconds(endDate as Date),
        cliffDate: getSeconds(cliffDate as Date),
        // For test:
        // startDate: getSeconds(new Date("Jun 22 2021 01:53:00") as Date),
        // cliffDate: getSeconds(new Date("Jun 22 2021 01:54:50") as Date),
        // endDate: getSeconds(new Date("Jun 22 2021 01:56:50") as Date),
      },
    })
      .on('error', (error: any) => {
        handleSetError(error?.message)
        handleSetFetching(false)
      })
      .on('confirmation', () => {
        changeForm(initialState)
        handleSetFetching(false)
        handleSetSuccess(true)
      })
  }

  const isStartDateExist = Boolean(form.values.startDate)
  const isEndDateExist = Boolean(form.values.endDate)
  const startDate = new Date(form.values.startDate as Date)
  const minDate = new Date(new Date().setDate(new Date().getDate() + 1))

  return (
    <div className={s.container}>
      <div className={s.titleContainer}>Spread tokens</div>
      <div className={s.formContainer}>
        <div className={s.box}>
          <div className={s.title}>Address:</div>
          <input className={s.input} value={form.values.address} onChange={handleChangeAddress} />
        </div>
        <div className={s.box}>
          <div className={s.title}>Amount:</div>
          <input className={s.input} value={form.values.amount} onChange={handleChangeAmount} />
        </div>
        <div className={s.box}>
          <div className={s.title}>Start date:</div>
          <DatePicker
            wrapperClassName={s.datePicker}
            selected={form.values.startDate}
            minDate={minDate}
            onChange={handlechangeStartDate}
          />
        </div>
        <div className={s.box}>
          <div className={s.title}>End date:</div>
          <DatePicker
            wrapperClassName={s.datePicker}
            selected={form.values.endDate}
            minDate={minDate}
            maxDate={isStartDateExist ? new Date(startDate.setFullYear(startDate.getFullYear() + 1)) : null}
            disabled={!isStartDateExist}
            placeholderText={isStartDateExist ? '' : "Need to select start date"}
            onChange={handleChangeEndDate}
          />
        </div>
        <div className={s.box}>
          <div className={s.title}>Cliff date:</div>
          <DatePicker
            wrapperClassName={s.datePicker}
            selected={form.values.cliffDate}
            minDate={isStartDateExist ? new Date(form.values.startDate as Date) : null}
            maxDate={isEndDateExist ? new Date(form.values.endDate as Date) : null}
            disabled={!isStartDateExist || !isEndDateExist}
            placeholderText={(isStartDateExist && isEndDateExist) ? '' : "Need to select start and end dates"}
            onChange={handleChangeCliffDate}
          />
        </div>
        <div className={s.box}>
          <div className={s.buttonContainer}>
            <button className={s.button} onClick={handleSumbit}>
              Send
            </button>
          </div>
        </div>
      </div>
      <div className={s.statusContainer}>
        {
          Boolean(form.isFetching) && (
            <div className={s.loading}>
              Loading...
            </div>
          )
        }
        {
          Boolean(form.success) && (
            <div className={s.success}>
              Transaction sent
            </div>
          )
        }
        {
          Boolean(form.error) && (
            <div className={s.error}>
              {form.error}
            </div>
          )
        }
      </div>
    </div>
  )
}


export default SpreadForm
