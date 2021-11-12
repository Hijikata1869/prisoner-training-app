import React, { Fragment, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Typography, AppBar, CssBaseline, Toolbar, Button, ButtonBase } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Cookies from 'js-cookie';

// apis
import { signOut, fetchCurrentUser } from '../apis/users';

// components
import { SuccessModal } from '../components/SuccessModal';
import { FailedAlert } from '../components/FailedAlert';
import { ToTopPageButton } from './ToTopPageButton';


const useStyles = makeStyles(() => ({
  signInAndOutButton: {
    marginLeft: "auto"
  }
}))


// Appbarのポジションにrelativeを設定することでAppBarの子要素がwindowではなくAppBarを基準に動くようになる
export const Header = () => {

  const classes = useStyles();
  const history = useHistory();

  const token = Cookies.get('access-token');
  const client = Cookies.get('client');
  const uid = Cookies.get('uid');

  const [modalOpen, setModalOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState([]);

  useEffect(() => {
    fetchCurrentUser(token, client, uid)
    .then((res) => {
      setCurrentUser(res.data.currentUser);
    })
    .catch((e) => {
      console.error(e);
    })
  }, [])

  const signOutAction = () => {
    signOut(token, client, uid)
    .then((res) => {
      if (res.status === 200) {
        Cookies.remove('access-token');
        Cookies.remove('client');
        Cookies.remove('uid');
        setModalOpen(true);
      } else {
        console.log(res);
      }
    })
    .catch((e) => {
      console.error(e);
      setAlertOpen(true);
    })
  }

  return(
    <Fragment>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <ButtonBase 
            onClick={() => history.push('/')}
          >
            <Typography variant="h6">
              Prisoner Training App
            </Typography>
          </ButtonBase>
          {
            currentUser.length === 0 ?
            <Button 
              className={classes.signInAndOutButton}
              color="inherit" 
              onClick={() => history.push('/sign_in')}
            >
              ログイン
            </Button>
            :
            <Button 
              className={classes.signInAndOutButton} 
              color="inherit" 
              onClick={signOutAction}
            >
              ログアウト
            </Button>
          }
        </Toolbar>
      </AppBar>
      {
        modalOpen ?
        <SuccessModal message="ログアウトしました" button={<ToTopPageButton />} />
        :
        null
      }
      {
        alertOpen ?
        <FailedAlert message="ログアウトできませんでした" />
        :
        null
      }
    </Fragment>
  )
}
