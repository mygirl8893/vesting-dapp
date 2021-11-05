import React from 'react'
import { useFieldState } from 'formular'
import DatePicker from 'react-date-picker/dist/entry.nostyle'
import cx from 'classnames'

import Input from './components/Input/Input'

import useForm from './utils/useForm'
import type { VestingForm } from './utils/useForm'

import s from './Form.module.scss'


type StartDateProps = {
  form: VestingForm
  minDate: Date
}

const StartDate: React.FC<StartDateProps> = ({ form, minDate }) => {
  const { value: startDate } = useFieldState<number>(form.fields.startDate)

  const handleChange = (date) => {
    form.fields.startDate.set(date?.getTime() || null)
  }

  return (
    <DatePicker
      value={startDate ? new Date(startDate) : null}
      minDate={minDate}
      onChange={handleChange}
    />
  )
}

type EndDateProps = {
  form: VestingForm
  minDate: Date
}

const EndDate: React.FC<EndDateProps> = ({ form, minDate }) => {
  const { value: startDate } = useFieldState<number>(form.fields.startDate)
  const { value: endDate } = useFieldState<number>(form.fields.endDate)

  const handleChange = (date) => {
    form.fields.endDate.set(date.getTime())
  }

  const maxDate = startDate ? new Date(new Date(startDate).setFullYear(new Date(startDate).getFullYear() + 3)) : null

  return (
    <DatePicker
      className={s.datePicker}
      value={endDate ? new Date(endDate) : null}
      minDate={minDate}
      maxDate={maxDate}
      disabled={!startDate}
      onChange={handleChange}
    />
  )
}

type CliffDateProps = {
  form: VestingForm
}

const CliffDate: React.FC<CliffDateProps> = ({ form }) => {
  const { value: startDate } = useFieldState<number>(form.fields.startDate)
  const { value: endDate } = useFieldState<number>(form.fields.endDate)
  const { value: cliffDate } = useFieldState<number>(form.fields.cliffDate)

  const handleChange = (date: Date) => {
    form.fields.cliffDate.set(date.getTime())
  }

  return (
    <DatePicker
      className={s.datePicker}
      value={cliffDate ? new Date(cliffDate) : null}
      minDate={startDate ? new Date(startDate) : null}
      maxDate={endDate ? new Date(endDate) : null}
      disabled={!startDate || !endDate}
      onChange={handleChange}
    />
  )
}

const Form = () => {
  const { form, submit, isSubmitting } = useForm()

  const minDate = new Date(new Date().setDate(new Date().getDate() + 1))

  return (
    <div className={s.form}>
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

      <div className={cx(s.submitButton, { [s.disabled]: isSubmitting })} onClick={submit}>
        <span>Distribute</span>
        {
          isSubmitting && (
            <div className={s.spinner}>
              <img src="/images/svg/16/spinner.svg" alt="" />
            </div>
          )
        }
      </div>
    </div>
  )
}


export default Form
