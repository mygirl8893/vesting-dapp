import Header from './Header/Header'
import Footer from './Footer/Footer'

import s from './MainLayout.module.scss'


const MainLayout: React.FunctionComponent = ({ children }) => (
  <div className={s.container}>
    <header className={s.header}>
      <Header />
    </header>
    <main className={s.content}>
      {children}
    </main>
    <footer className={s.footer}>
      <Footer />
    </footer>
  </div>
)


export default MainLayout
