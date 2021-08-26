import React, { Fragment, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Container, Grid, TextField, Typography, Input, InputLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Cookies from 'js-cookie';

// components
import { Header } from '../components/Header';
import { UserMenu } from '../components/UserMenu';

// apis
import { userUpdateAction, fetchCurrentUser } from '../apis/users';

const useStyles = makeStyles(() => ({
  updateWrapper: {
    paddingTop: '2rem',
  },
  submitButton: {
    marginTop: '1.5rem',
  },
  fileUploadArea: {
    marginTop: '1rem',
  },
  changePasswordButton: {
    marginTop: '1rem',
  }
}));

export const UserUpdate = () => {

  const classes = useStyles();
  const history = useHistory();

  const [currentUser, setCurrentUser] = useState([]);
  const [nickname, setNickname] = useState(currentUser.nickname);
  const [email, setEmail] = useState(currentUser.email);
  const [introduction, setIntroduction] = useState(currentUser.introduction);
  const [password, setPassword] = useState('');
  const [confirmationPassword, setConfirmationPassword] = useState('');
  const [image, setImage] = useState(currentUser.image);
  
  const token = Cookies.get('access-token');
  const client = Cookies.get('client');
  const uid = Cookies.get('uid');

  useEffect(() => {
    fetchCurrentUser(token, client, uid)
    .then((res) => {
      setCurrentUser(res);
    })
    .catch((e) => {
      console.error(e);
    })
  },[]);

  const hundleChange = (e) => {
    switch(e.target.name) {
      case 'nickname':
        setNickname(e.target.value);
        break;
      case 'email':
        setEmail(e.target.value);
        break;
      case 'introduction':
        setIntroduction(e.target.value);
        break;
      default:
        console.log('key not found');
    }
  }

  const updateUsers = (nickname, email, introduction, token, client, uid) => {
    const userId = currentUser.id;
    const result = userUpdateAction(userId, nickname, email, introduction, token, client, uid);
    result
    .then((res) => {
      if (res.status === 200) {
        Cookies.set('access-token', res.headers['access-token']);
        Cookies.set('client', res.headers['client']);
        Cookies.set('uid', res.headers['uid']);
      }
    })
    .catch((e) => {
      console.error(e);
    })
    
  }

  return(
    <Fragment>
      {console.log(currentUser.nickname)}
      <Header />
      <div>
        <Container className={classes.updateWrapper}>
          <Grid container spacing={4}>
            <UserMenu />
            <Grid container item md={9} sm={9} direction="column" alignItems="center" justifyContent="center"  >
              <Grid item>
                <Typography variant="h3">登録情報を更新する</Typography>
              </Grid>
              <Grid container item direction="column" justifyContent="space-evenly">
                <Grid item>
                  <TextField 
                    className={classes.nicknameField} 
                    variant="outlined" 
                    fullWidth 
                    label="新しいニックネーム" 
                    margin="normal" 
                    name="nickname" 
                    defaultValue={currentUser.nickname}
                    helperText={`現在のニックネーム：${currentUser.nickname}`}
                    value={nickname} 
                    onChange={hundleChange}
                  />
                </Grid>
                <Grid item>
                  <TextField 
                    className={classes.emailField} 
                    variant="outlined" 
                    fullWidth 
                    label="新しいメールアドレス" 
                    margin="normal" 
                    name="email" 
                    defaultValue={currentUser.email}
                    helperText={`現在のメールアドレス：${currentUser.email}`}
                    value={email}
                    onChange={hundleChange}
                  />
                </Grid>
                <Grid item>
                  <TextField 
                    className={classes.introductionField} 
                    variant="outlined" 
                    fullWidth 
                    multiline 
                    minRows={3}
                    label="新しい自己紹介" 
                    margin="normal" 
                    name="introduction" 
                    helperText={currentUser.introduction ? `現在の自己紹介：${currentUser.introduction}` : "まだ自己紹介がありません"}
                    value={introduction}
                    onChange={hundleChange}
                  />
                </Grid>
              </Grid>
              <Grid item>
                <Button 
                  className={classes.submitButton}
                  variant="contained" 
                  color="primary" 
                  size="large"
                  onClick={() => updateUsers(nickname, email, introduction, token, client, uid)}
                >
                  登録情報を更新する
                </Button>
              </Grid>
              <Grid item>
                <Button 
                  className={classes.changePasswordButton} 
                  onClick={() => {history.push('/auth/password/edit')}}
                >
                  パスワードの変更はこちら
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </div>
    </Fragment>
  )
}