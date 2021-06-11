import { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import s from './SpreadForm.module.scss'


type Form = {
  values: {
    address: string
    amount: string
    startDate: Date | null
    endDate: Date | null
  },
  error: string
}

const SpreadForm: React.FunctionComponent = () => {
  const [ form, changeForm ] = useState<Form>({
    values: {
      address: '',
      amount: '',
      startDate: null,
      endDate: null,
    },
    error: '',
  })

  const setFormValue = (name: string, value: Date | string) => {
    handleSetError('')
    changeForm((state) => ({
      ...state, values: { ...state.values, [name]: value }
    }))
  }

  const handleSetError = (error: string) => changeForm((state) => ({ ...state, error }))
  const handleChangeAddress = (event: any) => setFormValue('address', event.target.value)
  const handleChangeAmount = (event: any) => setFormValue('amount', event.target.value)
  const handlechangeStartDate = (value: Date) => setFormValue('startDate', value)
  const handleChangeEndDate = (value: Date) => setFormValue('endDate', value)

  const handleSumbit = () => {
    const hasEmpty = !Object.values(form.values).every(Boolean)
    const incorrectAddress = !/^0x[a-fA-F0-9]{40}$/.test(form.values.address)
    const incorrectAmountCount = form.values.amount && +form.values.amount < 0.00001 // need to change this value
    const incorrectAmountValue = form.values.amount && !/[0-9\.]/.test(form.values.amount)

    if (hasEmpty) {
      return handleSetError('All fields are required')
    }

    if (incorrectAddress) {
      return handleSetError('Not valid address')
    }

    if (incorrectAmountCount) {
      return handleSetError('Amount must be greater than 0.00001 ETH')
    }

    if (incorrectAmountValue) {
      return handleSetError('Not valid amount')
    }

    // Do request ...
  }

  const isStartDateExist = Boolean(form.values.startDate)
  const startDate: Date = new Date(form.values.startDate as Date)

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
            minDate={new Date()}
            onChange={handlechangeStartDate}
          />
        </div>
        <div className={s.box}>
          <div className={s.title}>End date:</div>
          <DatePicker
            wrapperClassName={s.datePicker}
            selected={form.values.endDate}
            minDate={new Date()}
            maxDate={isStartDateExist ? new Date(startDate.setFullYear(startDate.getFullYear() + 1)) : null}
            disabled={!isStartDateExist}
            placeholderText={isStartDateExist ? '' : "Need to select start date"}
            onChange={handleChangeEndDate}
          />
        </div>
      </div>
      {
        Boolean(form.error) && (
          <div className={s.errorContainer}>
            {form.error}
          </div>
        )
      }
      <div className={s.buttonContainer}>
        <button className={s.button} onClick={handleSumbit}>
          Send
        </button>
      </div>
    </div>
  )
}


export default SpreadForm
