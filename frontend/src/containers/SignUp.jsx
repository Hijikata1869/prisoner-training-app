import React, { Fragment, useState } from "react";
import { Grid, Typography, TextField, Button, Hidden } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";

// images
import LoginLogo from "../images/loginLogo2.png";

// apis
import { postUser, guestLogin, userSignIn } from "../apis/users";

// components
import { SuccessModal } from "../components/SuccessModal";
import { ToTopPageButton } from "../components/ToTopPageButton";
import { FailedAlert } from "../components/FailedAlert";

const useStyles = makeStyles((theme) => ({
  loginWrapper: {
    padding: "20px",
  },
  loginIconWrappr: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    textAlign: "center",
  },
  loginIcon: {
    width: "75%",
    height: "auto",
    margin: "0 auto",
    paddingBottom: "2rem",
  },
  passwordFeild: {
    marginBottom: "40px",
  },
  loginButton: {
    width: "100%",
    margin: "0 auto",
    marginBottom: "1rem",
    marginTop: "2rem",
  },
  guestLoginButton: {
    width: "100%",
    margin: "0 auto",
    marginBottom: "1rem",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  backdropCard: {
    padding: "50px",
  },
  signInButton: {
    width: "100%",
    marin: "0 auto",
  },
}));

export const SignUp = () => {
  const classes = useStyles();
  const history = useHistory();

  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [confirmationPassword, setConfirmationPassword] = useState("");
  const [guestModalOpen, setGuestModalOpen] = useState(false);
  const [guestAlertOpen, setGuestAlertOpen] = useState(false);

  const hundleChange = (e) => {
    switch (e.target.name) {
      case "nickname":
        setNickname(e.target.value);
        break;
      case "email":
        setEmail(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
      case "confirmationPassword":
        setConfirmationPassword(e.target.value);
        break;
      default:
        console.log("key not found");
    }
  };

  const userRegistrationAction = () => {
    postUser(nickname, email, password)
      .then((res) => {
        if (res.status == 200) {
          Cookies.set("access-token", res.headers["access-token"]);
          Cookies.set("client", res.headers["client"]);
          Cookies.set("uid", res.headers["uid"]);
          setModalOpen(true);
        }
      })
      .catch((e) => {
        console.error(e);
        setAlertOpen(true);
      });
  };

  const guestLoginAction = () => {
    guestLogin()
      .then((res) => {
        if (res.status == 200) {
          Cookies.set("access-token", res.data.token["access-token"]);
          Cookies.set("client", res.data.token["client"]);
          Cookies.set("uid", res.data.token["uid"]);
          setGuestModalOpen(true);
        }
      })
      .catch((e) => {
        console.error(e);
        setGuestAlertOpen(true);
      });
  };

  return (
    <Fragment>
      {modalOpen ? (
        <SuccessModal
          message="???????????????????????????"
          button={<ToTopPageButton />}
        />
      ) : null}
      {guestModalOpen ? (
        <SuccessModal
          message="??????????????????????????????????????????"
          button={<ToTopPageButton />}
        />
      ) : null}
      {alertOpen ? <FailedAlert message="?????????????????????????????????" /> : null}
      {guestAlertOpen ? (
        <FailedAlert message="?????????????????????????????????????????????" />
      ) : null}
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
              <Typography variant="h4">??????????????????</Typography>
            </Grid>
            <Grid item>
              <TextField
                id="nickname"
                label="??????????????????"
                fullWidth
                margin="normal"
                name="nickname"
                value={nickname}
                onChange={hundleChange}
              />
            </Grid>
            <Grid item>
              <TextField
                id="email"
                label="?????????????????????"
                fullWidth
                margin="normal"
                name="email"
                value={email}
                onChange={hundleChange}
              />
            </Grid>
            <Grid item>
              <TextField
                id="password"
                label="???????????????"
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
                id="confirmationPassword"
                label="??????????????????????????????"
                fullWidth
                margin="normal"
                type="password"
                name="confirmationPassword"
                value={confirmationPassword}
                onChange={hundleChange}
                helperText={
                  confirmationPassword
                    ? password != confirmationPassword
                      ? "???????????????????????????????????????"
                      : ""
                    : ""
                }
              />
            </Grid>
            <Grid item>
              <Button
                className={classes.loginButton}
                variant="contained"
                color="primary"
                onClick={userRegistrationAction}
                disabled={
                  password && password === confirmationPassword ? false : true
                }
              >
                ????????????
              </Button>
            </Grid>
            <Grid item>
              <Button
                className={classes.guestLoginButton}
                variant="contained"
                color="secondary"
                onClick={guestLoginAction}
              >
                ??????????????????????????????????????????
              </Button>
            </Grid>
            <Grid item>
              <Button
                className={classes.signInButton}
                onClick={() => history.push("/sign_in")}
              >
                ????????????????????????
              </Button>
            </Grid>
          </Grid>
          <Hidden only={["sm", "xs"]}>
            <Grid
              className={classes.loginIconWrappr}
              container
              item
              md={9}
              justifyContent="space-between"
            >
              <img className={classes.loginIcon} src={LoginLogo} />
            </Grid>
          </Hidden>
        </Grid>
      </div>
    </Fragment>
  );
};
