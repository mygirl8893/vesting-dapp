import Header from './Header/Header'
import Footer from './Footer/Footer'

import s from './MainLayout.module.scss'


const MainLayout: React.FunctionComponent = ({ children }) => {

  return (
    <div className={s.container}>
      <Header />
      <main className={s.content}>
        {children}
      </main>
      <Footer />
    </div>
  )
}


export default MainLayout
