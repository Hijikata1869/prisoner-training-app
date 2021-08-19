import React, { Fragment, useEffect, useState } from 'react';
import { Typography, Grid, Avatar, Container, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';

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
  const history = useHistory();

  const [user, setUser] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);

  useEffect(() => {
    const token = Cookies.get('access-token');
    const client = Cookies.get('client');
    const uid = Cookies.get('uid');
    fetchUser(match.params.userId, token, client, uid)
    .then((res) => {
      setUser(res.data.user);
      setCurrentUser(res.data.currentUser);
    }
    )
    .catch((e) => console.error(e));
  },[])

  return(
    <Fragment>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={() => console.log({
          user: user,
          currentUser: currentUser,
        })} 
      >
        認証テスト
      </Button>
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
                <Avatar 
                  className={classes.largeAvatar} 
                  src={user.image}
                >
                </Avatar>
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
                {user.id === currentUser.id ? 
                  <Button 
                    className={classes.updateButton} 
                    variant="contained" 
                    color="primary" 
                    onClick={() => {history.push('/auth/edit')}}
                  >
                    登録情報を更新する
                  </Button> : "" 
                }
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </div>
    </Fragment>
  )
}