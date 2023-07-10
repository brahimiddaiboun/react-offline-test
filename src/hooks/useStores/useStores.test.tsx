import React from 'react'
import { renderHook } from '@testing-library/react-hooks'

import { storesContext } from '../../providers'
import { useStores, useStore } from './useStores'
import { EnergyStore } from '../../stores'
import { StoreStatus } from '../../enums'

describe('useStores', () => {
    it('useStores should return the root store', () => {
        const rootStore = { energyStore: {"generationMixData": null, "status": StoreStatus.OFFLINE} } 
        const wrapper = ({ children }: { children: React.ReactNode }) => (
            <storesContext.Provider value={{ energyStore: new EnergyStore() }}>
                {children}
            </storesContext.Provider>
        )

        const { result } = renderHook(() => useStores(), { wrapper })

        expect(result.current).toEqual(rootStore)
    })

    it('useStore should return the energyStore', () => {
        const rootStore = { energyStore: {"generationMixData": null, "status": StoreStatus.OFFLINE} } 
        const wrapper = ({ children }: { children: React.ReactNode }) => (
            <storesContext.Provider value={{ energyStore: new EnergyStore() }}>
                {children}
            </storesContext.Provider>
        )

        const { result } = renderHook(() => useStore('energyStore'), {
            wrapper,
        })

        expect(result.current).toEqual(rootStore.energyStore)
    })
})
