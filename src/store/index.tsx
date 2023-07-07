import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { player } from './slices/player'


//Estado Global
export const store = configureStore({
  reducer: {
    player
  }
})


export type RootSelector = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<RootSelector> = useSelector

export const useAppDispatch: () => AppDispatch = useDispatch