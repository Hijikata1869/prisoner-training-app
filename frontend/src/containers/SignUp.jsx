import React, { Fragment, useState } from 'react';
import { Grid, Typography, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// components
import { Header } from '../components/Header';

// images
import LoginLogo from '../images/loginLogo2.png';

// apis
import { postUsers } from '../apis/users';

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
  }
}));

export const SignUp = () => {

  const classes = useStyles();

  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmationPasssword, setConfirmationPassword] = useState("");

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

  return(
    <Fragment>
      <Header />
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
                value={confirmationPasssword} 
                onChange={hundleChange}
              />
            </Grid>
            <Grid item>
              <Button 
                className={classes.loginButton} 
                variant="contained" 
                color="primary"　
                onClick={() => postUsers(nickname, email, password)}
              >
                登録する
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