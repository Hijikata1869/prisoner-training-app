import React, { Fragment, useState } from 'react';
import { Typography, AppBar, CssBaseline, Toolbar, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Cookies from 'js-cookie';

// apis
import { signOut } from '../apis/users';

// components
import { SuccessModal } from '../components/SuccessModal';
import { ReloadButton } from '../components/ReloadButton';
import { FailedAlert } from '../components/FailedAlert';


const useStyles = makeStyles(() => ({
  signOutButton: {
    marginLeft: "auto"
  }
}))


// Appbarのポジションにrelativeを設定することでAppBarの子要素がwindowではなくAppBarを基準に動くようになる
export const Header = () => {

  const classes = useStyles();

  const token = Cookies.get('access-token');
  const client = Cookies.get('client');
  const uid = Cookies.get('uid');

  const [modalOpen, setModalOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);

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
          <Typography variant="h6">
            Prisoner Training App
          </Typography>
          <Button 
            className={classes.signOutButton} 
            color="inherit" 
            onClick={signOutAction}
          >
            ログアウト
          </Button>
        </Toolbar>
      </AppBar>
      {
        modalOpen ?
        <SuccessModal message="ログアウトしました" button={<ReloadButton />} />
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
