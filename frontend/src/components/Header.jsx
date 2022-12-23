import React, { Fragment, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Typography,
  AppBar,
  CssBaseline,
  Toolbar,
  Button,
  ButtonBase,
  Hidden,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  ListItemAvatar,
  Avatar,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Cookies from "js-cookie";

// icons
import MenuIcon from "@material-ui/icons/Menu";
import FitnessCenterOutlinedIcon from "@material-ui/icons/FitnessCenterOutlined";
import BookmarkOutlinedIcon from "@material-ui/icons/BookmarkOutlined";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import HelpOutlineOutlinedIcon from "@material-ui/icons/HelpOutlineOutlined";
import MessageOutlinedIcon from "@material-ui/icons/MessageOutlined";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import HomeIcon from "@material-ui/icons/Home";
import AccessibilityNewOutlinedIcon from '@material-ui/icons/AccessibilityNewOutlined';

// apis
import { signOut, fetchCurrentUser, fetchUsers } from "../apis/users";

// components
import { SuccessModal } from "../components/SuccessModal";
import { FailedAlert } from "../components/FailedAlert";
import { ToTopPageButton } from "./ToTopPageButton";

// images
import NotLoggedInDrawerImage from "../images/notLoggedInDrawerImage.svg";
import NotLoggedInDrawerWelcomeImage from "../images/notLoggedInDrawerWelcomeImage.svg";

const useStyles = makeStyles(() => ({
  signInAndOutButton: {
    marginLeft: "auto",
  },
  menuIcon: {
    marginLeft: "auto",
  },
  drawerAvatar: {
    margin: "0 auto",
    marginTop: "3rem",
    height: "75px",
    width: "75px",
  },
  drawerNickname: {
    textAlign: "center",
    marginTop: "0.5rem",
    marginBottom: "3rem",
  },
  drawerWrapper: {
    width: "300px",
  },
  drawerLogOutText: {
    textAlign: "center",
    marginTop: "2rem",
  },
  notLoggedInDrawerWrapper: {
    width: "300px",
    margin: "0 auto",
    textAlign: "center",
  },
  notLoggedInDrawerImage: {
    height: "100%",
    width: "100%",
    marginTop: "2rem",
  },
  notLoggedInDrawerWelcomeImageWrapper: {
    width: "300px",
  },
  notLoggedInDrawerWelcomeImage: {
    height: "50%",
    width: "50%",
    marginTop: "5rem",
    marginBottom: "2rem",
  },
}));

// Appbarのポジションにrelativeを設定することでAppBarの子要素がwindowではなくAppBarを基準に動くようになる
export const Header = () => {
  const classes = useStyles();
  const history = useHistory();

  const token = Cookies.get("access-token");
  const client = Cookies.get("client");
  const uid = Cookies.get("uid");

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
      });
  }, []);

  useEffect(() => {
    fetchUsers()
      .then((res) => {
        setAllUsersArr(res.data.users);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  const signOutAction = () => {
    signOut(token, client, uid)
      .then((res) => {
        if (res.status === 200) {
          Cookies.remove("access-token");
          Cookies.remove("client");
          Cookies.remove("uid");
          setModalOpen(true);
        } else {
          console.log(res);
        }
      })
      .catch((e) => {
        console.error(e);
        setAlertOpen(true);
      });
  };

  const hundleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const showUserName = (userId) => {
    const targetUser = allUsersArr.find((user) => user.id == userId);
    return targetUser?.nickname;
  };

  const showUserImage = (userId) => {
    const targetUser = allUsersArr.find((user) => user.id == userId);
    return targetUser?.image.url;
  };

  const logedInUserDrawer = (
    <div className={classes.drawerWrapper}>
      <List>
        <Avatar
          className={classes.drawerAvatar}
          src={showUserImage(currentUser.id)}
          variant="rounded"
        />
        <Typography className={classes.drawerNickname} variant="h6">
          {`${showUserName(currentUser.id)}`}
        </Typography>
        <Divider />
        <ListItem
          button
          onClick={() => {
            history.push(`/`);
            hundleDrawerToggle();
          }}
        >
          <ListItemAvatar>
            <HomeIcon />
          </ListItemAvatar>
          <ListItemText>ホーム</ListItemText>
        </ListItem>
        <ListItem
          button
          onClick={() => {
            history.push(`/users/${currentUser.id}/training_logs`);
            hundleDrawerToggle();
          }}
        >
          <ListItemAvatar>
            <FitnessCenterOutlinedIcon />
          </ListItemAvatar>
          <ListItemText>トレーニング記録</ListItemText>
        </ListItem>
        <ListItem
          button
          onClick={() => {
            history.push(`/users/${currentUser.id}/body_compositions`);
            hundleDrawerToggle();
          }}
        >
          <ListItemAvatar>
            <AccessibilityNewOutlinedIcon />
          </ListItemAvatar>
          <ListItemText>体組成記録</ListItemText>
        </ListItem>
        <ListItem
          button
          onClick={() => {
            history.push(`/users/${currentUser.id}/bookmarks`);
            hundleDrawerToggle();
          }}
        >
          <ListItemAvatar>
            <BookmarkOutlinedIcon />
          </ListItemAvatar>
          <ListItemText>ブックマーク</ListItemText>
        </ListItem>
        <ListItem
          button
          onClick={() => {
            history.push(`/users/${currentUser.id}`);
            hundleDrawerToggle();
          }}
        >
          <ListItemAvatar>
            <AccountCircleOutlinedIcon />
          </ListItemAvatar>
          <ListItemText>プロフィール</ListItemText>
        </ListItem>
        <ListItem
          button
          onClick={() => {
            history.push(`/users/${currentUser.id}/questions`);
            hundleDrawerToggle();
          }}
        >
          <ListItemAvatar>
            <HelpOutlineOutlinedIcon />
          </ListItemAvatar>
          <ListItemText>過去の質問</ListItemText>
        </ListItem>
        <ListItem
          button
          onClick={() => {
            history.push(`/users/${currentUser.id}/advices`);
            hundleDrawerToggle();
          }}
        >
          <ListItemAvatar>
            <MessageOutlinedIcon />
          </ListItemAvatar>
          <ListItemText>過去のアドバイス</ListItemText>
        </ListItem>
        <Divider />
        <ListItem
          className={classes.drawerLogOutText}
          button
          onClick={() => {
            signOutAction();
            hundleDrawerToggle();
          }}
        >
          <ListItemText>ログアウト</ListItemText>
        </ListItem>
      </List>
    </div>
  );

  const drawer = (
    <div className={classes.notLoggedInDrawerWrapper}>
      <List>
        <img
          className={classes.notLoggedInDrawerWelcomeImage}
          src={NotLoggedInDrawerWelcomeImage}
        />
        <ListItem
          className={classes.notLoggedInDrawerItems}
          button
          onClick={() => {
            history.push("/sign_up");
            hundleDrawerToggle();
          }}
        >
          <ListItemAvatar>
            <PermIdentityIcon />
          </ListItemAvatar>
          <ListItemText>新規会員登録</ListItemText>
        </ListItem>
        <ListItem
          className={classes.notLoggedInDrawerItems}
          button
          onClick={() => {
            history.push("/sign_in");
            hundleDrawerToggle();
          }}
        >
          <ListItemAvatar>
            <LockOpenIcon />
          </ListItemAvatar>
          <ListItemText>ログイン</ListItemText>
        </ListItem>
        <img
          className={classes.notLoggedInDrawerImage}
          src={NotLoggedInDrawerImage}
        />
      </List>
    </div>
  );

  return (
    <Fragment>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <ButtonBase onClick={() => history.push("/")}>
            <Typography variant="h6">Prisoner Training App</Typography>
          </ButtonBase>
          <Hidden only={["xs", "sm"]}>
            {currentUser.length === 0 ? (
              <Button
                className={classes.signInAndOutButton}
                color="inherit"
                onClick={() => history.push("/sign_in")}
              >
                ログイン
              </Button>
            ) : (
              <Button
                className={classes.signInAndOutButton}
                color="inherit"
                onClick={signOutAction}
              >
                ログアウト
              </Button>
            )}
          </Hidden>
          <Hidden only={["xl", "lg", "md"]}>
            <IconButton
              className={classes.menuIcon}
              color="inherit"
              onClick={hundleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          </Hidden>
          <Hidden mdUp>
            <Drawer open={mobileOpen} onClose={hundleDrawerToggle}>
              {currentUser.length !== 0 ? (
                <Fragment>{logedInUserDrawer}</Fragment>
              ) : (
                <Fragment>{drawer}</Fragment>
              )}
            </Drawer>
          </Hidden>
        </Toolbar>
      </AppBar>
      {modalOpen ? (
        <SuccessModal
          message="ログアウトしました"
          button={<ToTopPageButton />}
        />
      ) : null}
      {alertOpen ? <FailedAlert message="ログアウトできませんでした" /> : null}
    </Fragment>
  );
};
