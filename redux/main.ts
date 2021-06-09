import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { RootState } from './store'

interface InitialState {
  isMetaMaskConnected: boolean
  accounts: string[]
}

const initialState: InitialState = {
  isMetaMaskConnected: false,
  accounts: [],
}

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setMetaMaskConnectedStatus: (state, action: PayloadAction<boolean>) => {
      state.isMetaMaskConnected = action.payload
    },
    setMetaMaskAccounts: (state, action: PayloadAction<string[]>) => {
      state.accounts = action.payload
    },
  },
})

export const { setMetaMaskConnectedStatus, setMetaMaskAccounts } = mainSlice.actions

export const selectMetaMaskConnected = (state: RootState) => state.main.isMetaMaskConnected
export const selectMetaMaskAccounts = (state: RootState) => state.main.accounts

export default mainSlice.reducer
