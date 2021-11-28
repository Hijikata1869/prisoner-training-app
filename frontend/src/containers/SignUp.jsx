import React, { Fragment, useState } from 'react';
import { Grid, Typography, TextField, Button, IconButton, Collapse, Backdrop, CardContent, Card, CardActions, Hidden } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';


// images
import LoginLogo from '../images/loginLogo2.png';

// apis
import { postUser } from '../apis/users';

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
    marginBottom: '1rem',
    marginTop: "2rem"
  },
  guestLoginButton: {
    width: "100%",
    margin: '0 auto',
    marginBottom: "1rem"
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  backdropCard: {
    padding: '50px',
  },
  signInButton: {
    width: "100%",
    marin: "0 auto"
  },
  
}));

export const SignUp = () => {

  const classes = useStyles();
  const history = useHistory();

  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [confirmationPassword, setConfirmationPassword] = useState("");

  const hundleChange = (e) => {
    switch(e.target.name) {
      case 'nickname':
        setNickname(e.target.value);
        break;
      case 'email':
        setEmail(e.target.value);
        break;
      case 'password':
        setPassword(e.target.value);
        break;
      case 'confirmationPassword':
        setConfirmationPassword(e.target.value);
        break;
      default:
        console.log('key not found');
    }
  };

  const userRegistrationAction = () => {
    postUser(nickname,email,password)
    .then((res) => {
      if (res.status == 200) {
        Cookies.set('access-token', res.headers['access-token']);
        Cookies.set('client', res.headers['client']);
        Cookies.set('uid', res.headers['uid']);
        setModalOpen(true);
      }
    })
    .catch((e) => {
      console.error(e);
      setAlertOpen(true);
    });
  }

  return(
    <Fragment>
      {
        modalOpen ?
        <SuccessModal message="登録が完了しました" button={<ToTopPageButton />} />
        :
        null
      }
      {
        alertOpen ?
        <FailedAlert message="登録ができませんでした" />
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
              <Typography variant="h4">サインアップ</Typography>
            </Grid>
            <Grid item>
              <TextField 
                label="ニックネーム" 
                fullWidth 
                margin="normal" 
                name="nickname" 
                value={nickname} 
                onChange={hundleChange}
              />
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
                name="password" 
                value={password} 
                onChange={hundleChange}
              />
            </Grid>
            <Grid item>
              <TextField 
                label="パスワード（確認用）" 
                fullWidth 
                margin="normal" 
                type="password" 
                name="confirmationPassword" 
                value={confirmationPassword} 
                onChange={hundleChange}
                helperText={confirmationPassword ? 
                  password != confirmationPassword ? "パスワードが一致してません" : "" :
                  ""
                }
              />
            </Grid>
            <Grid item>
              <Button 
                className={classes.loginButton} 
                variant="contained" 
                color="primary"　
                onClick={userRegistrationAction}
                disabled={
                  password && password === confirmationPassword ? false : true
                }
              >
                登録する
              </Button>
            </Grid>
            <Grid item>
              <Button 
                className={classes.guestLoginButton} 
                variant="contained" 
                color="secondary" 
                onClick={() => { }}
              >
                ゲストログインして使ってみる
              </Button>
            </Grid>
            <Grid item>
              <Button 
                className={classes.signInButton}
                onClick={() => history.push('/sign_in')}
              >
                ログインはこちら
              </Button>
            </Grid>
          </Grid>
          <Hidden only={['sm', 'xs']}>
            <Grid 
              className={classes.loginIconWrappr} 
              container 
              item md={9} 
              justifyContent="space-between"
            >
              <img className={classes.loginIcon} src={LoginLogo} />
            </Grid>
          </Hidden>
        </Grid>
      </div>
    </Fragment>
  );

}