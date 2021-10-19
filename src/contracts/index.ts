export { contracts } from './config'
export type { ContractsAbi } from './config'
export { default as ContractsProvider } from './ContractsProvider'
export { default as getContract } from './getContract'

export const ownerAddress = process.env.NEXT_PUBLIC_OWNER
