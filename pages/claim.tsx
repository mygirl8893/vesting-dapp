import dynamic from 'next/dynamic'


const ClaimPage = dynamic(() => import('paages/ClaimPage/ClaimPage'), { ssr: false })


export default ClaimPage
