import { StoreStatus } from '../../enums'
import { EnergyStore } from './EnergyStore'

const MOCK_GENERATION_ENERGY = {
  "data": {
    "from": "2019-08-12T12:30Z",
    "to": "2019-08-12T13:00Z",
    "generationmix": [
      {
        "fuel": "biomass",
        "perc": 4.8
      },
      {
        "fuel": "coal",
        "perc": 2.5
      },
      {
        "fuel": "imports",
        "perc": 8.7
      },
      {
        "fuel": "gas",
        "perc": 46.5
      },
      {
        "fuel": "nuclear",
        "perc": 16.1
      },
      {
        "fuel": "other",
        "perc": 0.3
      },
      {
        "fuel": "hydro",
        "perc": 0.9
      },
      {
        "fuel": "solar",
        "perc": 14.6
      },
      {
        "fuel": "wind",
        "perc": 5.6
      }
    ]
  }
};

global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve(MOCK_GENERATION_ENERGY)
})) as jest.Mock;

describe('EnergyStore', () => {
    it('should setup correctly', () => {
        const energyStore = new EnergyStore()
        expect(energyStore.fetchEnergyGeneration).toBeDefined()
    })

    it('fetchEnergyGeneration should update the fetch status', async () => {
        const energyStore = new EnergyStore()
        expect(energyStore.status).toBe(StoreStatus.OFFLINE)
        await energyStore.fetchEnergyGeneration()

        expect(energyStore.generationMixData).not.toBeNull()
        expect(energyStore.status).toBe(StoreStatus.ONLINE)
        expect(energyStore.labels).toStrictEqual(["biomass", "coal", "imports", "gas", "nuclear", "other", "hydro", "solar", "wind"])
        expect(energyStore.values).toStrictEqual([4.8, 2.5, 8.7, 46.5, 16.1, 0.3, 0.9, 14.6, 5.6])
    })

    it('setGenerationMixData should update generationMixData', () => {
        const energyStore = new EnergyStore()
        const mockData = {
            from: '2022-01-01',
            to: '2022-01-02',
            generationmix: [{ fuel: 'solar', perc: 10 }],
        }

        energyStore.setGenerationMixData(mockData)

        expect(energyStore.generationMixData).toEqual(mockData)
        expect(energyStore.labels).toEqual(['solar'])
        expect(energyStore.values).toEqual([10])
    })

    
    it('setStatus should update fetch status', () => {
      const energyStore = new EnergyStore()
      const mockData = StoreStatus.ONLINE

      energyStore.setStatus(mockData)

      expect(energyStore.status).toEqual(mockData)
  })
})
