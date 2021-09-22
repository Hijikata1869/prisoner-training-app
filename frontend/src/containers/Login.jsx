import React, { Fragment, useState } from 'react';
import { Grid, Typography, TextField, Button, Backdrop, Card, CardContent, CardActions, Collapse, IconButton } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import CloseIcon from '@material-ui/icons/Close';
import Cookies from 'js-cookie';

// images
import LoginLogo from '../images/loginLogo2.png';

// apis
import { userSignIn } from '../apis/users';

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
  const [open, setOpen] = useState(false);
  const [failedAlert, setFailedAlert] = useState(false);
  const [alertOpen, setAlertOpen] = useState(true);

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

  const hundleToggle = () => {
    setOpen(!open);
  }

  const signInUsers = (email, password) => {
    const result = userSignIn(email, password);
    result
    .then((res) => {
      if (res.status === 200) {
        hundleToggle();
        Cookies.set('access-token', res.headers['access-token']);
        Cookies.set('client', res.headers['client']);
        Cookies.set('uid', res.headers['uid']);
      }
    })
    .catch((e) => {
      console.log(e);
      setFailedAlert(true);
    });
  }

  return(
    <Fragment>
      <Backdrop className={classes.backdrop} open={open} >
        <Card className={classes.backdropCard} >
          <CardContent>
            <Typography variant="h5" component="h2" >
              ログインしました
            </Typography>
          </CardContent>
          <CardActions>
            <Button 
              variant="contained" 
              color="primary" 
              fullWidth 
              onClick={() => history.push('/')} 
            >
              アプリに戻る
            </Button>
          </CardActions>
        </Card>
      </Backdrop>
      {
        failedAlert ? 
        <Collapse in={alertOpen}>
        <Alert 
          severity="error" 
          action={
            <IconButton 
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {setAlertOpen(false);}}
            >
              <CloseIcon />
            </IconButton>
          }
        >
          ログインできませんでした
        </Alert>
        </Collapse> : 
        <></>
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
              <Button className={classes.loginButton} variant="contained" color="secondary">ゲストログインして使ってみる</Button>
            </Grid>
          </Grid>
          <Grid className={classes.loginIconWrappr} container item md={9} sm={false} justifyContent="space-between">
            <img className={classes.loginIcon} src={LoginLogo} />
          </Grid>
        </Grid>
      </div>
    </Fragment>
  );

}