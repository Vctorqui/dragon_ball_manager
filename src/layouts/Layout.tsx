import { Box, useMediaQuery, useTheme } from '@mui/material'
import React, { ReactNode } from 'react'
import { Header } from './components/Header'
import { Footer } from './components/Footer'

export const Layout = ({
  children,
  sx,
}: {
  children: ReactNode
  sx?: object
}) => {
  const theme = useTheme()
  const isSm = useMediaQuery(theme.breakpoints.down('md'))
  return (
    <>
      <Header />
      <Box minHeight={'calc(100vh - 123px)'} mt={isSm ? 7 : 8} sx={sx}>
        {children}
      </Box>
      <Footer />
    </>
  )
}
