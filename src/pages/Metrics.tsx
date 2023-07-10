import React, { useEffect, useState, SyntheticEvent } from 'react'
import { Box, Container, Grid, Tab, Tabs, Typography } from '@mui/material'
import { observer } from 'mobx-react-lite'

import { BasicCard, LineChart, PieChart } from '../components'
import { useStore } from '../hooks'
import { StoreStatus } from '../enums'
import { Error } from './'

interface TabPanelProps {
    children?: React.ReactNode
    index: number
    value: number
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    )
}

export const Metrics: React.FC = observer(() => {
    const [value, setValue] = useState(0)

    const energyStore = useStore('energyStore')

    useEffect(() => {
        ;(async () => {
            return await energyStore.fetchEnergyGeneration()
        })()
    }, [])

    const handleChange = (event: SyntheticEvent, newValue: number) => {
        setValue(newValue)
    }

    if (energyStore.status === StoreStatus.ERROR) {
        return <Error />
    }

    if (energyStore.status !== StoreStatus.ONLINE) {
        return <Typography>Loading...</Typography>
    }

    function a11yProps(index: number) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        }
    }

    const charts = (
        <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
                <LineChart
                    generationmix={energyStore.generationDataChartLine || []}
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
    )

    const tiledIcons = (
        <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
        >
            {energyStore.generationMix.map((el) => (
                <Grid item xs={2} sm={4} md={4} key={el.fuel}>
                    <BasicCard
                        label={el.fuel}
                        description={''}
                        value={el.perc}
                    />
                </Grid>
            ))}
        </Grid>
    )

    return (
        <Container
            maxWidth="xl"
            style={{ backgroundColor: 'rgb(249, 250, 251)' }}
        >
            <Typography variant="h4" sx={{ mb: 5, mt: 10 }}>
                Welcome to your energy dashboard
            </Typography>

            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="energy data type display"
                >
                    <Tab label="charts" {...a11yProps(0)} />
                    <Tab label="tiled cards" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                {charts}
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                {tiledIcons}
            </CustomTabPanel>
        </Container>
    )
})
