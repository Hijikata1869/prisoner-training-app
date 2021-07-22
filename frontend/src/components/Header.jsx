import React, { Fragment } from 'react';
import { Typography, AppBar, CssBaseline, Toolbar } from '@material-ui/core';


// Appbarのポジションにrelativeを設定することでAppBarの子要素がwindowではなくAppBarを基準に動くようになる
export const Header = () => {
  return(
    <Fragment>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6">
            Prisoner Training App
          </Typography>
        </Toolbar>
      </AppBar>
    </Fragment>
  )
}
