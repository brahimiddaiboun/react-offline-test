import { Card, CardHeader, Typography } from '@mui/material'
import React from 'react'
import ReactApexChart from 'react-apexcharts'

interface PieChartProps {
    chartLabels: Array<string>
    chartValues: Array<number>
    title: string
    subheader: string
}

export const PieChart: React.FC<PieChartProps> = ({
    title,
    subheader,
    chartLabels,
    chartValues,
}) => {
    return (
        <Card>
            <CardHeader title={title} subheader={subheader} />
            {!chartLabels && !chartValues ? (
                <center>
                    <Typography>No Data</Typography>
                </center>
            ) : (
                <ReactApexChart
                    type="pie"
                    series={chartValues}
                    options={{
                        labels: chartLabels,
                        stroke: { colors: ['white'] },
                        legend: { floating: true, horizontalAlign: 'center' },
                        dataLabels: {
                            enabled: true,
                            dropShadow: { enabled: false },
                        },
                        tooltip: {
                            fillSeriesColor: false,
                            y: {
                                formatter: (seriesName) => `${seriesName}`,
                                title: {
                                    formatter: () => '',
                                },
                            },
                        },
                        plotOptions: {
                            pie: { donut: { labels: { show: false } } },
                        },
                    }}
                    height={280}
                    width={500}
                />
            )}
        </Card>
    )
}
