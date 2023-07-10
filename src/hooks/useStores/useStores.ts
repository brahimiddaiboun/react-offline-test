import React from 'react'

import { storesContext } from '../../providers'
import { RootStore } from '../../stores'

/**
 * useStores hook
 * @description Get all stores
 * @usage
 * const stores = useStores()
 * const { optionsStore } = stores
 */
export const useStores = (): RootStore => React.useContext(storesContext)

/**
 * useStore hook
 *
 * @description
 * Get a single store by store name
 * Comes with autocompletion thanks to TS \o/
 *
 * @usage
 * const optionsStore = useStore('optionsStore')
 *
 * @param store Name of available store
 */
export const useStore = <T extends keyof RootStore>(store: T): RootStore[T] =>
    React.useContext(storesContext)[store]
