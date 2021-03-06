import React, { Fragment, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  Input,
  InputLabel,
  Hidden,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Cookies from "js-cookie";

// apis
import { userUpdateAction, fetchCurrentUser } from "../apis/users";

// components
import { SuccessModal } from "../components/SuccessModal";
import { ReloadButton } from "../components/ReloadButton";
import { FailedAlert } from "../components/FailedAlert";

const useStyles = makeStyles(() => ({
  updateWrapper: {
    paddingTop: "2rem",
  },
  submitButton: {
    marginTop: "1.5rem",
  },
  fileUploadArea: {
    marginTop: "1rem",
  },
  changePasswordButton: {
    marginTop: "1rem",
  },
}));

export const UserUpdate = ({ match }) => {
  const classes = useStyles();
  const history = useHistory();

  const [currentUser, setCurrentUser] = useState([]);
  const [nickname, setNickname] = useState(currentUser.nickname);
  const [email, setEmail] = useState(currentUser.email);
  const [introduction, setIntroduction] = useState(currentUser.introduction);
  const [modalOpen, setModalOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);

  const token = Cookies.get("access-token");
  const client = Cookies.get("client");
  const uid = Cookies.get("uid");

  useEffect(() => {
    fetchCurrentUser(token, client, uid)
      .then((res) => {
        setCurrentUser(res.data.currentUser);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  const hundleChange = (e) => {
    switch (e.target.name) {
      case "nickname":
        setNickname(e.target.value);
        break;
      case "email":
        setEmail(e.target.value);
        break;
      case "introduction":
        setIntroduction(e.target.value);
        break;
      default:
        console.log("key not found");
    }
  };

  const updateUsers = (nickname, email, introduction, token, client, uid) => {
    const userId = currentUser.id;
    const result = userUpdateAction(
      userId,
      nickname,
      email,
      introduction,
      token,
      client,
      uid
    );
    result
      .then((res) => {
        if (res.status === 200) {
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

  return (
    <Fragment>
      {modalOpen ? (
        <SuccessModal
          message="?????????????????????????????????"
          button={<ReloadButton />}
        />
      ) : null}
      {alertOpen ? (
        <FailedAlert message="?????????????????????????????????????????????" />
      ) : null}
      <Container className={classes.updateWrapper}>
        <Grid
          container
          item
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <Grid item>
            <Hidden only="xs">
              <Typography variant="h3">???????????????????????????</Typography>
            </Hidden>
            <Hidden smUp>
              <Typography variant="h5">???????????????????????????</Typography>
            </Hidden>
          </Grid>
          <Grid container item direction="column" justifyContent="space-evenly">
            <Grid item>
              <TextField
                className={classes.nicknameField}
                variant="outlined"
                fullWidth
                label="???????????????????????????"
                margin="normal"
                name="nickname"
                defaultValue={currentUser.nickname}
                helperText={`??????????????????????????????${currentUser.nickname}`}
                value={nickname}
                onChange={hundleChange}
              />
            </Grid>
            <Grid item>
              <TextField
                className={classes.emailField}
                variant="outlined"
                fullWidth
                label="??????????????????????????????"
                margin="normal"
                name="email"
                defaultValue={currentUser.email}
                helperText={`?????????????????????????????????${currentUser.email}`}
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
                label="?????????????????????"
                margin="normal"
                name="introduction"
                helperText={
                  currentUser.introduction
                    ? `????????????????????????${currentUser.introduction}`
                    : "????????????????????????????????????"
                }
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
              onClick={() =>
                updateUsers(nickname, email, introduction, token, client, uid)
              }
            >
              ???????????????????????????
            </Button>
          </Grid>
          <Grid item>
            <Button
              className={classes.changePasswordButton}
              onClick={() => {
                history.push("/auth/password/edit");
              }}
            >
              ????????????????????????????????????
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
};
