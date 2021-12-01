import React, { Fragment, useState } from 'react';
import { Grid, Typography, TextField, Button, Hidden } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';

// images
import LoginLogo from '../images/loginLogo2.png';

// apis
import { userSignIn, guestLogin } from '../apis/users';

// components
import { SuccessModal } from '../components/SuccessModal';
import { ToTopPageButton } from '../components/ToTopPageButton';
import { FailedAlert } from '../components/FailedAlert';

const useStyles = makeStyles((theme) => ({
  loginWrapper: {
    padding: '20px',
  },
  loginIconWrappr: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    textAlign: 'center',
  },
  loginIcon: {
    width: '75%',
    height: 'auto',
    margin: '0 auto',
    paddingBottom: '2rem',
  },
  passwordFeild: {
    marginBottom: '40px',
  },
  loginButton: {
    width: '100%',
    margin: '0 auto',
    marginBottom: '1rem'
  },
  guestLoginButton: {
    width: "100%",
    margin: "0 auto"
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  backdropCard: {
    padding: '50px',
  }
}));

export const Login = () => {

  const classes = useStyles();
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [guestModalOpen, setGuestModalOpen] = useState(false);
  const [guestAlertOpen, setGuestAlertOpen] = useState(false);

  const hundleChange = (e) => {
    switch(e.target.name) {
      case 'email':
        setEmail(e.target.value);
        break;
      case 'password':
        setPassword(e.target.value);
        break;
      default:
        console.log('key not found');
    }
  }

  const signInUsers = (email, password) => {
    userSignIn(email, password)
    .then((res) => {
      if (res.status === 200) {
        Cookies.set('access-token', res.headers['access-token']);
        Cookies.set('client', res.headers['client']);
        Cookies.set('uid', res.headers['uid']);
        setModalOpen(true);
      }
    })
    .catch((e) => {
      console.log(e);
      setAlertOpen(true);
    });
  }

  const guestLoginAction = () => {
    guestLogin()
    .then((res) => {
      if (res.status == 200) {
        Cookies.set('access-token', res.data.token['access-token']);
        Cookies.set('client', res.data.token['client']);
        Cookies.set('uid', res.data.token['uid']);
        setGuestModalOpen(true);
      }
    })
    .catch((e) => {
      console.error(e);
      setGuestAlertOpen(true);
    })
  }

  return(
    <Fragment>
      {
        modalOpen ?
        <SuccessModal message="ログインしました" button={<ToTopPageButton />} /> 
        :
        null
      }
      {
        alertOpen ?
        <FailedAlert message="ログインできませんでした" />
        :
        null
      }
      {
        guestModalOpen ?
        <SuccessModal message="ゲストとしてログインしました"　button={<ToTopPageButton />} />
        :
        null
      }
      {
        guestAlertOpen ?
        <FailedAlert message="ゲストログインできませんでした" />
        :
        null
      }
      <div className={classes.wrapper}>
        <Grid container direction="row">
          <Grid 
            className={classes.loginWrapper} 
            container 
            item 
            md={3} 
            sm={12} 
            direction="column" 
            alignItems="stretch" 
            justifyContent="space-evenly" 
          >
            <Grid item className={classes.title}>
              <Typography variant="h4">ログイン</Typography>
            </Grid>
            <Grid item>
              <TextField 
                label="メールアドレス" 
                fullWidth 
                margin="normal" 
                name="email" 
                value={email} 
                onChange={hundleChange}
              />
            </Grid>
            <Grid item>
              <TextField 
                label="パスワード" 
                fullWidth 
                margin="normal" 
                type="password" 
                className={classes.passwordFeild} 
                name="password" 
                value={password} 
                onChange={hundleChange} 
              />
            </Grid>
            <Grid item>
              <Button 
                className={classes.loginButton} 
                variant="contained" 
                color="primary" 
                onClick={() => signInUsers(email, password)}
              >
                ログインする
              </Button>
            </Grid>
            <Grid item>
              <Button 
                className={classes.guestLoginButton} 
                variant="contained" 
                color="secondary"
                onClick={guestLoginAction}
              >
                ゲストログインして使ってみる
              </Button>
            </Grid>
          </Grid>
          <Hidden only={['sm', 'xs']}>
            <Grid className={classes.loginIconWrappr} container item md={9} sm={false} justifyContent="space-between">
              <img className={classes.loginIcon} src={LoginLogo} />
            </Grid>
          </Hidden>
        </Grid>
      </div>
    </Fragment>
  );

}