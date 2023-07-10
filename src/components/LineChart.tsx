import React from 'react'
import { Box, Card, CardHeader, Typography } from '@mui/material'
import ReactApexChart from 'react-apexcharts'

interface LineChartProps {
    dates: string[]
    generationmix: {
        name: string
        data: number[]
        fill: string
        type: string
    }[]
    title: string
    subheader: string
}

export const LineChart: React.FC<LineChartProps> = ({
    title,
    subheader,
    generationmix,
    dates,
}) => {
    return (
        <Card>
            <CardHeader title={title} subheader={subheader} />
            <Box sx={{ p: 3, pb: 1 }} dir="ltr">
                {!generationmix || !dates ? (
                    <center>
                        <Typography>No Data</Typography>
                    </center>
                ) : (
                    <ReactApexChart
                        type="line"
                        series={generationmix}
                        options={{
                            dataLabels: { enabled: false },
                            stroke: {
                                width: 3,
                                curve: 'smooth',
                                lineCap: 'round',
                            },
                            plotOptions: {
                                bar: {
                                    borderRadius: 4,
                                    columnWidth: '28%',
                                    borderRadiusApplication: 'end',
                                    borderRadiusWhenStacked: 'last',
                                },
                            },
                            fill: { type: generationmix.map((i) => i.fill) },
                            labels: dates,
                            xaxis: { type: 'datetime' },
                            tooltip: {
                                shared: true,
                                intersect: false,
                                y: {
                                    formatter: (y) => '',
                                },
                            },
                        }}
                        height={364}
                    />
                )}
            </Box>
        </Card>
    )
}
