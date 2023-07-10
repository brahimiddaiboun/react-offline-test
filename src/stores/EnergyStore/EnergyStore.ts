import { action, computed, makeObservable, observable } from 'mobx'

import { StoreStatus } from '../../enums'
import { EnergyGenerationQuery, GenerationMixList } from '../../types'

const url: string = 'https://api.carbonintensity.org.uk/generation'

export class EnergyStore {
    generationMixData: EnergyGenerationQuery | null = null
    status: StoreStatus = StoreStatus.OFFLINE

    constructor() {
        makeObservable(this, {
            fetchEnergyGeneration: action.bound,
            status: observable,
            generationMixData: observable,
            generationMix: computed,
            labels: computed,
            values: computed,
            generationDataChartLine: computed,
            dates: computed,
            setStatus: action.bound,
            setGenerationMixData: action.bound,
        })
    }

    setGenerationMixData(response: EnergyGenerationQuery | null): void {
        this.generationMixData = response
    }

    setStatus(status: StoreStatus): void {
        this.status = status
    }

    get generationMix(): GenerationMixList {
        return this.generationMixData?.generationmix || null
    }

    get labels(): Array<string> | null {
        return this.generationMixData?.generationmix.map((i) => i.fuel) || null
    }

    get values(): Array<number> | null {
        return this.generationMixData?.generationmix.map((i) => i.perc) || null
    }

    get generationDataChartLine(): any {
        return [
            {
                name: 'biomass',
                data: [4.8, 15, 10, 5, 8, 4.8, 15, 10, 5, 8, 14, 16],
                type: 'line',
                fill: 'gradient',
            },
            {
                name: 'coal',
                data: [2.5, 5, 7, 6, 4, 2.5, 5, 7, 6, 4, 6, 7],
                type: 'line',
                fill: 'gradient',
            },
            {
                name: 'imports',
                data: [8.7, 10, 6, 12, 9, 8.7, 10, 6, 12, 9, 11, 13],
                type: 'line',
                fill: 'gradient',
            },
            {
                name: 'gas',
                data: [46.5, 36.5, 40, 44, 50, 46.5, 36.5, 40, 44, 50, 65, 75],
                type: 'line',
                fill: 'gradient',
            },
            {
                name: 'nuclear',
                data: [16.1, 23.1, 15, 11, 8, 16.1, 23.1, 15, 11, 8, 15, 19],
                type: 'line',
                fill: 'gradient',
            },
            {
                name: 'other',
                data: [0.3, 1.5, 1, 0.7, 0.5, 0.3, 1.5, 1, 0.7, 0.5, 0.7, 0.9],
                type: 'line',
                fill: 'gradient',
            },
            {
                name: 'hydro',
                data: [
                    0.9, 1.3, 1.1, 0.5, 0.2, 0.9, 1.3, 1.1, 0.5, 0.2, 0.1, 0.1,
                ],
                type: 'line',
                fill: 'gradient',
            },
            {
                name: 'solar',
                data: [14.6, 11.6, 13, 9, 12, 14.6, 11.6, 13, 9, 12, 13, 16],
                type: 'line',
                fill: 'gradient',
            },
            {
                name: 'wind',
                data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39, 25, 20],
                type: 'line',
                fill: 'gradient',
            },
        ]
    }

    get dates(): any {
        return [
            '01/01/2022',
            '02/01/2022',
            '03/01/2022',
            '04/01/2022',
            '05/01/2022',
            '06/01/2022',
            '07/01/2022',
            '08/01/2022',
            '09/01/2022',
            '10/01/2022',
            '11/01/2022',
            '12/01/2022',
        ]
    }

    fetchEnergyGeneration = async () => {
        this.setStatus(StoreStatus.LOADING)
        try {
            const response = await fetch(url, { method: 'GET' })
            const resp = await response.json()
            if(resp.error){
                throw new Error(JSON.stringify(resp))
            }
            this.setGenerationMixData(resp.data)
            this.setStatus(StoreStatus.ONLINE)
        } catch (e) {
            this.setStatus(StoreStatus.ERROR)
        }
    }
}
