export declare type EnergyGenerationQuery = {
    from: string
    to: string
    generationmix: GenerationMixList | null
    title?: string
    subheader?: string
}

export declare type GenerationMixList = Array<{
    fuel: string
    perc: number
}>
