import React from 'react';
import { Grid, Typography, Link, Hidden } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  link: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
}))
 
export const UserMenu = () => {

  const classes = useStyles();

  return(
    <Hidden only="xs">
      <Grid container item md={3} sm={3}>
        <Grid container item direction="column" justifyContent="space-evenly" >
          <Grid item >
            <Typography variant="h4">
              メニュー
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h5" >
              <Link className={classes.link} href="#" color="textSecondary" underline="none" >
                トレーニング記録
              </Link>
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h5">
              <Link className={classes.link} href="#" color="textSecondary" underline="none" >
                ブックマーク
              </Link>
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h5">
              <Link className={classes.link} href="#" color="textSecondary" underline="none" >
                プロフィール
              </Link>
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h5">
              <Link className={classes.link} href="#" color="textSecondary" underline="none" >
                過去の質問
              </Link>
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h5">
              <Link className={classes.link} href="#" color="textSecondary" underline="none" >
                過去のアドバイス
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Hidden>
  )
}