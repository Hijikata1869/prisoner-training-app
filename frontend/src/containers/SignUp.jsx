import React, { Fragment, useState } from 'react';
import { Grid, Typography, TextField, Button, IconButton, Collapse, Backdrop, CardContent, Card, CardActions } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';
import { useHistory } from 'react-router-dom';
import CloseIcon from '@material-ui/icons/Close';

// components
import { Header } from '../components/Header';

// images
import LoginLogo from '../images/loginLogo2.png';

// apis
import { postUser } from '../apis/users';

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

export const SignUp = () => {

  const classes = useStyles();
  const history = useHistory();

  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmationPassword, setConfirmationPassword] = useState("");
  const [failedAlert, setFailedAlert] = useState(false);
  const [open, setOpen] = useState(true);
  const [toggleOpen, setToggleOpen] = useState(false);

  const hundleClose = () => {
    setToggleOpen(false);
  }

  const hundleToggle = () => {
    setToggleOpen(!toggleOpen);
  }

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

  const postUsers = (nickname,email,password) => {
    const result = postUser(nickname,email,password);
    result
    .then((res) => {
      if (res.status === "success") {
        hundleToggle();
      }
    })
    .catch((e) => {
      console.log(e);
      setFailedAlert(true);
    });
  }

  return(
    <Fragment>
      <Header />
      <Backdrop className={classes.backdrop} open={toggleOpen}>
        <Card className={classes.backdropCard}>
          <CardContent>
            <Typography variant="h5" component="h2" >登録が完了しました</Typography>
          </CardContent>
          <CardActions>
            <Button variant="contained" color="primary" fullWidth onClick={() => {history.push('/')}} >
              アプリに戻る
            </Button>
          </CardActions>
        </Card>
      </Backdrop>
      {
        failedAlert ? 
        <Collapse in={open}>
        <Alert 
          severity="error" 
          action={
                    <IconButton 
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {setOpen(false);}}
                    >
                      <CloseIcon />
                    </IconButton>
                  }
        >
          登録できませんでした
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
                label="パスワード(確認用)" 
                fullWidth 
                margin="normal" 
                type="password" 
                className={classes.passwordFeild} 
                name="confirmationPassword" 
                value={confirmationPassword} 
                onChange={hundleChange}
              />
            </Grid>
            <Grid item>
              <Button 
                className={classes.loginButton} 
                variant="contained" 
                color="primary"　
                onClick={() => postUsers(nickname,email,password)}
              >
                登録する
              </Button>
            </Grid>
            <Grid item>
              <Button 
                className={classes.loginButton} 
                variant="contained" 
                color="secondary" 
                onClick={() => { }}
              >
                ゲストログインして使ってみる
              </Button>
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