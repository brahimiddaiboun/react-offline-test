import * as React from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { IconButton } from '@mui/material'
import WindPowerIcon from '@mui/icons-material/WindPower' //wind
import SolarPowerIcon from '@mui/icons-material/SolarPower' //solar
import OilBarrelIcon from '@mui/icons-material/OilBarrel' // gas2
import PropaneIcon from '@mui/icons-material/Propane' //gas3
import MoreHorizIcon from '@mui/icons-material/MoreHoriz' // other
import LocalShippingIcon from '@mui/icons-material/LocalShipping' //import
import WavesIcon from '@mui/icons-material/Waves' // hydro
import RecyclingIcon from '@mui/icons-material/Recycling' //biomass
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt' // nuc

export enum EnergyTypes {
    BIO = 'biomass',
    COAL = 'coal',
    IMPORTS = 'imports',
    GAS = 'gas',
    NUCLEAR = 'nuclear',
    OTHER = 'other',
    HYDRO = 'hydro',
    SOLAR = 'solar',
    WIND = 'wind',
}


interface BasicCardProps {
    width?: number
    label: EnergyTypes | string
    description?: string
    value: number
}

export const BasicCard: React.FC<BasicCardProps> = ({
    label,
    description,
    width,
    value,
}) => {

  
const energyIcon = (energy: EnergyTypes | string) => {
  switch (energy) {
      case EnergyTypes.BIO:
          return <RecyclingIcon />
      case EnergyTypes.COAL:
          return <PropaneIcon />
      case EnergyTypes.IMPORTS:
          return <LocalShippingIcon />
      case EnergyTypes.GAS:
          return <OilBarrelIcon />
      case EnergyTypes.NUCLEAR:
          return <ElectricBoltIcon />
      case EnergyTypes.OTHER:
          return <MoreHorizIcon />
      case EnergyTypes.HYDRO:
          return <WavesIcon />
      case EnergyTypes.SOLAR:
          return <SolarPowerIcon />
      case EnergyTypes.WIND:
          return <WindPowerIcon />
      default:
          return <MoreHorizIcon />
  }
}
    return (
        <Card sx={{ minWidth: width || 275 }} style={{ textAlign: 'center' }}>
            <CardContent>
                <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                >
                    {label}
                </Typography>
                <Typography variant="h5" component="div">
                    {description}
                </Typography>
                <Typography variant="h3" component="div">
                    {value} %
                </Typography>
            </CardContent>
            <IconButton aria-label="share">
                {energyIcon(label)}
            </IconButton>
        </Card>
    )
}
