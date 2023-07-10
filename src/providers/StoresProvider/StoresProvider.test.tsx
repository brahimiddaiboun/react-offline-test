import React, { useContext } from 'react'

import { render } from '@testing-library/react'
import renderer from 'react-test-renderer'
import { StoresProvider, storesContext } from './StoresProvider'
import { EnergyStore } from '../../stores'
import { StoreStatus } from '../../enums'

describe('StoresProvider', () => {
    it('storesContext should be a React context', () => {
        expect(storesContext.Provider).toBeDefined()
    })

    it('should be available in context', () => {
        const TestComponent: React.FC = () => {
            const { energyStore } = useContext(storesContext)
            energyStore.fetchEnergyGeneration()
            if (energyStore.status === StoreStatus.ERROR) {
                return <title data-testid="error">error</title>
            }
            return null
        }

        const reactElement: React.ReactElement = (
            <StoresProvider value={{ energyStore: new EnergyStore() }}>
                <TestComponent />
            </StoresProvider>
        )

        const testReturnRender = render(reactElement)
        expect(testReturnRender.getAllByTestId('error')).toBeDefined()

        const tree = renderer.create(reactElement)
        expect(tree.toJSON()).toMatchSnapshot()
    })
})
