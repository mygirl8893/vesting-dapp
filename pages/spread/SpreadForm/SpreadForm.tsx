import { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import s from './SpreadForm.module.scss'


const SpreadForm: React.FunctionComponent = () => {
  const [ form, changeForm ] = useState<{
    values: {
      address: string
      amount: string
      startDate: Date | null
      endDate: Date | null
    },
    error: string
  }>({
    values: {
      address: '',
      amount: '',
      startDate: null,
      endDate: null,
    },
    error: '',
  })

  const setError = (error: string) => changeForm((state) => ({
    ...state,
    error,
  }))

  const setFormValue = (name: string, value: any) => changeForm((state) => ({
    ...state,
    values: {
      ...state.values,
      [name]: value,
    }
  }))

  const changeAddress = (event: any) => setFormValue('address', event.target.value)
  const changeAmount = (event: any) => setFormValue('amount', event.target.value)
  const changeStartDate = (value: Date) => setFormValue('startDate', value)
  const changeEndDate = (value: Date) => setFormValue('endDate', value)

  const isStartDateExist = Boolean(form.values.startDate)
  const startDate: Date = new Date(form.values.startDate as Date)

  return (
    <div className={s.container}>
      <div className={s.formContainer}>
        <div className={s.box}>
          <div className={s.title}>Address:</div>
          <input className={s.input} value={form.values.address} onChange={changeAddress} />
        </div>
        <div className={s.box}>
          <div className={s.title}>Amount:</div>
          <input className={s.input} value={form.values.amount} onChange={changeAmount} />
        </div>
        <div className={s.box}>
          <div className={s.title}>Start date:</div>
          <DatePicker
            wrapperClassName={s.datePicker}
            selected={form.values.startDate}
            minDate={new Date()}
            onChange={changeStartDate}
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
            onChange={changeEndDate}
          />
        </div>
      </div>
      <div className={s.buttonContainer}>
        <button className={s.button} onClick={() => {}}>
          Send
        </button>
      </div>
    </div>
  )
}


export default SpreadForm
