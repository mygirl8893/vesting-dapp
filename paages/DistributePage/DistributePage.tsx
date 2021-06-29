import availableWithMetaMask from 'decorators/availableWithMetaMask'

import MainLayout from 'components/MainLayout/MainLayout'

import Form from './Form/Form'

import s from './DistributePage.module.scss'


const DistributePage = () => (
  <MainLayout>
    <div className={s.container}>
      <Form />
    </div>
  </MainLayout>
)


export default availableWithMetaMask(DistributePage)
