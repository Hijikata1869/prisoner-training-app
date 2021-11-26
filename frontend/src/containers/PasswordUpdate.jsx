import React, { Fragment, useState } from 'react';
import { Grid, Typography, TextField, InputLabel, Button, Hidden } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Cookies from 'js-cookie';

// api
import { passwordUpdate } from '../apis/users';

// images
import LoginLogo from '../images/loginLogo2.png';

const useStyles = makeStyles((theme) => ({
  textFieldWrapper: {
    padding: ' 2rem 2rem',
  },
  title: {
    marginBottom: '2rem'
  },
  loginIconWrappr: {
    backgroundColor: theme.palette.background.paper,
  },
  loginIcon: {
    width: '75%',
    height: 'auto',
    margin: '0 auto',
    paddingBottom: '2rem',
  },
  pageTitle: {
    marginTop: "2rem",
    marginBottom: "3rem"
  },
  newPasswordWrapper: {
    marginBottom: "2rem"
  },
  confirmationPasswordWrapper: {
    marginBottom: "4rem"
  },
  submitButtonWrapper: {
    margin: "0 auto"
  }
}));

export const PasswordUpdate = () => {

  const classes = useStyles();

  const [password, setPassword] = useState("");
  const [confirmationPassword, setConfirmationPassword] = useState("");

  const hundleChange = (e) => {
    switch (e.target.name) {
      case 'password':
        setPassword(e.target.value);
        break;
      case 'confirmationPassword':
        setConfirmationPassword(e.target.value);
        break;
      default:
        console.log('key not found');
    }
  }

  const hundleUpdate = (password, confirmationPassword) => {
    const token = Cookies.get('access-token');
    const client = Cookies.get('client');
    const uid = Cookies.get('uid');
    passwordUpdate(token, client, uid, password, confirmationPassword)
    .then((res) => {
      console.log(res);
    })
    .catch((e) => {
      console.error(e);
    })
  }

  return(
    <Fragment>
      <Grid container>
        <Grid className={classes.textFieldWrapper} 
          container 
          item 
          md={3} 
          sm={12}
          direction="column" 
        >
          <Grid item className={classes.pageTitle}>
            <Typography className={classes.title} variant="h5" component="h2" >パスワードを変更する</Typography>
          </Grid>
          <Grid item className={classes.newPasswordWrapper}>
            <InputLabel>新しいパスワード</InputLabel>
            <TextField 
              name="password" 
              type="password" 
              fullWidth  
              value={password} 
              onChange={hundleChange}
              />
          </Grid>
          <Grid item className={classes.confirmationPasswordWrapper}>
            <InputLabel>パスワード（確認用）</InputLabel>
            <TextField 
              name="confirmationPassword" 
              type="password" 
              fullWidth 
              value={confirmationPassword}
              onChange={hundleChange} 
              helperText={confirmationPassword ? 
                password != confirmationPassword ? "パスワードが一致してません" : "" :
                ""
              }
            />
          </Grid>
          <Grid item className={classes.submitButtonWrapper}>
            <Button 
              variant="contained" 
              color="primary" 
              disabled={password && password === confirmationPassword ? false : true}
              onClick={() => hundleUpdate(password, confirmationPassword)} 
            >
              パスワードを変更する
            </Button>
          </Grid>
        </Grid>
        <Hidden smDown>
          <Grid className={classes.loginIconWrappr} container item md={9} sm={12} justifyContent="space-between">
            <img className={classes.loginIcon} src={LoginLogo} />
          </Grid>
        </Hidden>
      </Grid>
    </Fragment>
  );
}