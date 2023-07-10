import React from 'react'
import { createStore } from '../../stores'

export const storesContext = React.createContext(createStore({}))
export const StoresProvider = storesContext.Provider
