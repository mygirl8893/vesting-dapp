import dynamic from 'next/dynamic'


const HomePage = dynamic(() => import('paages/HomePage/HomePage'), { ssr: false })


export default HomePage
