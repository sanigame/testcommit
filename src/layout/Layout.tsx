import React from 'react'

import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import Hidden from '@mui/material/Hidden'
import Toolbar from '@mui/material/Toolbar'
import { Outlet } from 'react-router-dom'

import {
  AppBarNavigation,
  MobileBottomNavigation,
  Logo,
  DarkModeToggle,
  BackButton,
} from './components'
import styles from './styles.module.scss'

function Layout() {
  return (
    <>
      <CssBaseline />
      <AppBar className="vroom-appbar">
        <Toolbar>
          <BackButton />
          <Logo />
          <div className={styles.appbarNavigation}>
            <Hidden mdDown implementation="css">
              <AppBarNavigation />
            </Hidden>
          </div>
          <Box>
            <DarkModeToggle />
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Container>
        <Outlet />
      </Container>
      <Hidden mdUp implementation="css">
        <MobileBottomNavigation />
      </Hidden>
    </>
  )
}

export default Layout
