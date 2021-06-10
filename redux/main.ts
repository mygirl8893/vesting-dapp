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
    setMetaMaskData: (state, action: PayloadAction<InitialState['accounts']>) => {
      state.isMetaMaskConnected = true
      state.accounts = action.payload
    },
  },
})

export const { setMetaMaskData } = mainSlice.actions

export const selectMetaMaskConnected = (state: RootState) => state.main.isMetaMaskConnected
export const selectMetaMaskAccounts = (state: RootState) => state.main.accounts

export default mainSlice.reducer
