import React, { useEffect } from 'react'
import { Container, Grid, Typography } from '@mui/material'
import { observer } from 'mobx-react-lite'

import { LineChart, PieChart } from '../components'
import { useStore } from '../hooks'
import { StoreStatus } from '../enums'
import { Error } from './'

export const Metrics: React.FC = observer(() => {
    const energyStore = useStore('energyStore')

    useEffect(() => {
        ;(async () => {
            return await energyStore.fetchEnergyGeneration()
        })()
    }, [])

    if (energyStore.status === StoreStatus.ERROR) {
        return <Error />
    }

    if (energyStore.status !== StoreStatus.ONLINE) {
        return <Typography>Loading...</Typography>
    }

    return (
        <Container
            maxWidth="xl"
            style={{ backgroundColor: 'rgb(249, 250, 251)' }}
        >
            <Typography variant="h4" sx={{ mb: 5, mt: 10 }}>
                Welcome to your energy dashboard
            </Typography>

            <Grid container spacing={3}>
                <Grid item xs={12} md={6} lg={8}>
                    <LineChart
                        generationmix={
                            energyStore.generationDataChartLine || []
                        }
                        dates={energyStore.dates}
                        title={'Energy type generation'}
                        subheader={'The last year'}
                    />
                </Grid>

                <Grid item xs={12} md={6} lg={4}>
                    <PieChart
                        chartLabels={energyStore.labels}
                        chartValues={energyStore.values}
                        title={'Energy type generation'}
                        subheader={'The last 30min'}
                    />
                </Grid>
            </Grid>
        </Container>
    )
})
