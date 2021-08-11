import React, { Fragment, useEffect, useState } from 'react';
import { Typography, Grid, Avatar, Container, Button, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// apis
import { fetchUser } from '../apis/users';

// components
import { Header } from '../components/Header';
import { UserMenu } from '../components/UserMenu';

const useStyles = makeStyles((theme) => ({
  userWrapper: {
    paddingTop: '2rem',
  },
  largeAvatar: {
    width: theme.spacing(20),
    height: theme.spacing(20),
    marginBottom: '1rem',
  },
  introduce: {
    fontSize: '20px',
  },
  updateButton: {
    marginTop: '2rem',
  },
}))

export const Users = ({ match }) => {

  const classes = useStyles();

  const [user, setUser] = useState([]);

  useEffect(() => {
    fetchUser(match.params.userId)
    .then((res) => {
      setUser(res.data.user);
    }
    )
    .catch((e) => console.error(e));
  },[])

  return(
    <Fragment>
      <Header />
      <div>
        <Container className={classes.userWrapper}>
          <Grid container spacing={4}>
            <UserMenu />
            <Grid container item md={9} sm={9} direction="column" alignItems="center" justifyContent="center" >
              <Grid item>
                <Typography variant="h3" gutterBottom >{`${user.nickname}のプロフィール`}</Typography>
              </Grid>
              <Grid item>
                <Avatar className={classes.largeAvatar}></Avatar>
              </Grid>
              <Grid item>
                <Typography variant="h3" gutterBottom >{`${user.nickname}`}</Typography>
              </Grid>
              <Grid item>
                <Typography variant="h5" gutterBottom >
                  都道府県
                </Typography>
              </Grid>
              <Grid item className={classes.introduce}>
                <Typography variant="h5" gutterBottom paragraph >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </Typography>
              </Grid>
              <Grid item>
                <Button className={classes.updateButton} variant="contained" color="primary" >
                  登録情報を更新する
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </div>
    </Fragment>
  )
}