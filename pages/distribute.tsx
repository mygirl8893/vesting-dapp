import dynamic from 'next/dynamic'


const DistributePage = dynamic(() => import('paages/DistributePage/DistributePage'), { ssr: false })


export default DistributePage
