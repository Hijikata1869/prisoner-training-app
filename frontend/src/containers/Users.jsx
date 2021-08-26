import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { Typography, Grid, Avatar, Container, Button, TextField, InputLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';

// apis
import { fetchUser, imageUpdate } from '../apis/users';

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
  const [image, setImage] = useState();

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

  const selectImage = useCallback((e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  },[])

  const createFormData = () => {
    const formData = new FormData();
    formData.append('image', image);
    return formData;
  }

  const imageUpdateAction = () => {

    const currentUserId = currentUser.id;
    const currentUserToken = Cookies.get('access-token');
    const currentUserClient = Cookies.get('client');
    const currentUserUid = Cookies.get('uid');
    const data = createFormData();

    imageUpdate(currentUserId, currentUserToken, currentUserClient, currentUserUid, data)
    .then((res) => {
      console.log(res);
    })
    .catch((e) => {
      console.error(e);
    })
  }

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
                <Avatar 
                  className={classes.largeAvatar} 
                  src={user.image}
                >
                </Avatar>
              </Grid>
              <Grid item>
                <InputLabel>プロフィール画像を更新する</InputLabel>
                <TextField type="file" onChange={(e) => selectImage(e)} />
                <Button variant="contained" color="secondary" onClick={imageUpdateAction} >プロフィール画像を更新する</Button>
              </Grid>
              <Grid item>
                <Typography variant="h3" gutterBottom >{`${user.nickname}`}</Typography>
              </Grid>
              <Grid item className={classes.introduce}>
                {user.introduction ? 
                <Typography variant="h5" gutterBottom paragraph >
                  {user.introduction}
                </Typography> : 
                "まだ自己紹介がありません"
                }
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