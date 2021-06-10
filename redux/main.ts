import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { RootState } from './store'


interface InitialState {
  flags: {
    isMetaMaskLoading: boolean
    isMetaMaskConnected: boolean
    isMetaMaskNeedApproval: boolean
    isMetaMaskConnectionError: boolean
  }
  accounts: string[]
}

const initialState: InitialState = {
  flags: {
    isMetaMaskLoading: false,
    isMetaMaskConnected: false,
    isMetaMaskNeedApproval: false,
    isMetaMaskConnectionError: false,
  },
  accounts: [],
}

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setMetaMaskData: (state, action: PayloadAction<InitialState['accounts']>) => {
      const hasAccounts = Boolean(action.payload?.length)
      state.flags.isMetaMaskConnected = hasAccounts
      state.accounts = action.payload

      if (!hasAccounts) {
        state.flags.isMetaMaskConnectionError = true
      }
    },
    setMetaMaskLoading: (state, action: PayloadAction<boolean>) => {
      state.flags.isMetaMaskLoading = action.payload
    },
    setMetaMaskNeedApproval: (state, action: PayloadAction<boolean>) => {
      state.flags.isMetaMaskNeedApproval = action.payload
    },
    setMetaMaskConnectionError: (state, action: PayloadAction<boolean>) => {
      state.flags.isMetaMaskConnectionError = action.payload
    },
  },
})

export const {
  setMetaMaskData,
  setMetaMaskLoading,
  setMetaMaskNeedApproval,
  setMetaMaskConnectionError,
} = mainSlice.actions

export const selectMetaMaskFlags = (state: RootState) => state.main.flags
export const selectMetaMaskAccounts = (state: RootState) => state.main.accounts

export default mainSlice.reducer
