import React, { Fragment, useEffect, useState } from 'react';
import { useHistory, useRouteMatch, useLocation, useParams } from 'react-router-dom';
import { Typography, AppBar, CssBaseline, Toolbar, Button, ButtonBase, Hidden, IconButton, Drawer, List, ListItem, ListItemText, Divider, ListItemAvatar, Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Cookies from 'js-cookie';

// icons
import MenuIcon from '@material-ui/icons/Menu';

// apis
import { signOut, fetchCurrentUser, fetchUsers } from '../apis/users';

// components
import { SuccessModal } from '../components/SuccessModal';
import { FailedAlert } from '../components/FailedAlert';
import { ToTopPageButton } from './ToTopPageButton';


const useStyles = makeStyles(() => ({
  signInAndOutButton: {
    marginLeft: "auto"
  },
  menuIcon: {
    marginLeft: "auto"
  },
}))


// Appbarのポジションにrelativeを設定することでAppBarの子要素がwindowではなくAppBarを基準に動くようになる
export const Header = () => {

  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const params = useParams();

  const token = Cookies.get('access-token');
  const client = Cookies.get('client');
  const uid = Cookies.get('uid');

  const [modalOpen, setModalOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState([]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [allUsersArr, setAllUsersArr] = useState([]);

  useEffect(() => {
    fetchCurrentUser(token, client, uid)
    .then((res) => {
      setCurrentUser(res.data.currentUser);
    })
    .catch((e) => {
      console.error(e);
    })
  }, [])

  useEffect(() => {
    fetchUsers()
    .then((res) => {
      setAllUsersArr(res.data.users);
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

  const hundleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const showUserName = (userId) => {
    const targetUser = allUsersArr.find(user => user.id == userId);
    return targetUser?.nickname;
  }

  const showUserImage = (userId) => {
    const targetUser = allUsersArr.find(user => user.id == userId);
    return targetUser?.image.url;
  }


  const logedInUserDrawer = (
    <div>
      <List>
        <ListItem>
          <ListItemAvatar>
            <Avatar 
              src={showUserImage(currentUser.id)}
            />
          </ListItemAvatar>
          <ListItemText>{`${showUserName(currentUser.id)}`}</ListItemText>
        </ListItem>
        <ListItem 
          button
          onClick={
            () => {
              history.push(`/users/${currentUser.id}/training_logs`);
              hundleDrawerToggle();
            }
          }
        >
          <ListItemText>
            トレーニング記録
          </ListItemText>
        </ListItem>
        <Divider />
        <ListItem 
          button
          onClick={
            () => {
              history.push(`/users/${currentUser.id}/bookmarks`);
              hundleDrawerToggle();
            }
          }
        >
          <ListItemText>
            ブックマーク
          </ListItemText>
        </ListItem>
        <Divider />
        <ListItem 
          button
          onClick={
            () => {
              history.push(`/users/${currentUser.id}`);
              hundleDrawerToggle();
            }
          }
        >
          <ListItemText>
            プロフィール
          </ListItemText>
        </ListItem>
        <Divider />
        <ListItem 
          button
          onClick={
            () => {
              history.push(`/users/${currentUser.id}/questions`);
              hundleDrawerToggle();
            }
          }
        >
          <ListItemText>
            過去の質問
          </ListItemText>
        </ListItem>
        <Divider />
        <ListItem 
          button
          onClick={
            () => {
              history.push(`/users/${currentUser.id}/advices`);
              hundleDrawerToggle();
            }
          }
        >
          <ListItemText>
            過去のアドバイス
          </ListItemText>
        </ListItem>
        <Divider />
        <ListItem
          button
          onClick={() => {
            signOutAction();
            hundleDrawerToggle();
          }}
        >
          <ListItemText>
            ログアウト
          </ListItemText>
        </ListItem>
      </List>
    </div>
  );

  const drawer = (
    <div>
      <List>
        <ListItem 
          button
          onClick={() => {
            history.push('/sign_up');
            hundleDrawerToggle();
          }}
        >
          <ListItemText>
            新規会員登録
          </ListItemText>
        </ListItem>
        <ListItem
          button
          onClick={() => {
            history.push('/sign_in');
            hundleDrawerToggle();
        }}
        >
          <ListItemText>
            ログイン
          </ListItemText>
        </ListItem>
      </List>
    </div>
  )

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
          <Button variant="contained" color="secondary" onClick={() => console.log(currentUser)}>test</Button>
          <Hidden only="xs">
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
          </Hidden>
          <Hidden only={['xl', 'lg', 'md', 'sm']}>
            <IconButton
              className={classes.menuIcon}
              color="inherit"
              onClick={hundleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          </Hidden>
          <Hidden smUp>
            <Drawer
              open={mobileOpen}
              onClose={hundleDrawerToggle}
            >
              {
                currentUser.length !== 0 ?
                <Fragment>
                  {logedInUserDrawer}
                </Fragment>
                :
                <Fragment>
                  {drawer}
                </Fragment>
              }
            </Drawer>
          </Hidden>
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
