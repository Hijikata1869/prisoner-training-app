import React, { Fragment, useEffect, useState } from "react";
import {
  Avatar,
  Button,
  ButtonBase,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Hidden,
  IconButton,
  TextField,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import moment from "moment";

// icons
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import BookmarkIcon from "@material-ui/icons/Bookmark";

// api
import {
  fetchQuestion,
  fetchUsers,
  fetchCurrentUser,
  postAdvice,
  createBookmark,
} from "../apis/users";

// components
import { SuccessModal } from "../components/SuccessModal";
import { FailedAlert } from "../components/FailedAlert";
import { ReloadButton } from "../components/ReloadButton";
import { UserBookmarks } from "./UserBookmarks";

// images
import mainLogo from "../images/answerAdviceImage.svg";

const useStyles = makeStyles((theme) => ({
  adviceContainer: {
    marginTop: "2rem",
  },
  adviseWrapper: {
    margin: "2rem",
  },
  pageTitle: {
    marginBottom: "1rem",
    marginLeft: "2rem",
  },
  questionTitle: {
    marginLeft: "2rem",
    marginBottom: "0.5rem",
  },
  questionWrapper: {
    marginLeft: "2rem",
    marginRight: "2rem",
  },
  buttonWrapper: {
    margin: "0 auto",
  },
  submitButton: {
    marginBottom: "2rem",
  },
  advicesCardWrapper: {
    margin: "0 2rem 2rem 2rem",
  },
  adviceCard: {
    marginBottom: "1rem",
  },
  adviceTitle: {
    marginBottom: "0.5rem",
  },
  adviceCardTitle: {
    marginBottom: "0.5rem",
  },
  nonAdviceTitle: {
    textAlign: "center",
    marginTop: "4rem",
    marginBottom: "4rem",
  },
  adviceTextField: {
    backgroundColor: theme.palette.background.paper,
  },
  mainLogoImage: {
    width: "100%",
    height: "100%",
  },
  mainLogoWrapper: {
    height: "85vh",
  },
}));

export const Advices = ({ match }) => {
  const classes = useStyles();
  const history = useHistory();

  const token = Cookies.get("access-token");
  const client = Cookies.get("client");
  const uid = Cookies.get("uid");

  const [questionData, setQuestionData] = useState([]);
  const [usersArr, setUsersArr] = useState([]);
  const [advice, setAdvice] = useState("");
  const [currentUser, setCurrentUser] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [advicesArr, setAdvicesArr] = useState([]);
  const [buildBookmarkIcon, setBuildBookmarkIcon] = useState(true);
  const [deleteBookmarkIcon, setDeleteBookmarkIcon] = useState(false);
  const [currentUserBookmarksArr, setCurrentUserBookmarksArr] = useState([]);

  useEffect(() => {
    fetchQuestion(match.params.questionId, token, client, uid)
      .then((res) => {
        setQuestionData(res.data.question);
        setAdvicesArr(res.data.advices);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  useEffect(() => {
    fetchUsers()
      .then((res) => {
        setUsersArr(res.data.users);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  useEffect(() => {
    fetchCurrentUser(token, client, uid)
      .then((res) => {
        setCurrentUser(res.data.currentUser);
        setCurrentUserBookmarksArr(res.data.currentUserBookmarks);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  const showUserImage = (userId) => {
    const user = usersArr.find((user) => user.id === userId);

    return user?.image.url;
  };

  const showUserName = (userId) => {
    const user = usersArr.find((user) => user.id === userId);

    return user?.nickname;
  };

  const hundleChange = (e) => {
    setAdvice(e.target.value);
  };

  const hundleSubmit = () => {
    const currentUserId = currentUser.id;
    const questionId = questionData.id;
    postAdvice(token, client, uid, currentUserId, questionId, advice)
      .then((res) => {
        if (res.status === 200) {
          setModalOpen(true);
        }
      })
      .catch((e) => {
        setAlertOpen(true);
        console.error(e);
      });
  };

  const createBookmarkAction = (adviceId) => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/advices/${adviceId}/bookmarks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "access-token": token,
        client: client,
        uid: uid,
      },
    })
      .then(() => {
        fetchCurrentUser(token, client, uid)
          .then((res) => {
            setCurrentUserBookmarksArr(res.data.currentUserBookmarks);
          })
          .catch((e) => {
            console.error(e);
          });
      })
      .catch((e) => console.error(e));
  };

  const deleteBookmarkAction = (adviceId) => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/advices/${adviceId}/bookmarks`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "access-token": token,
        client: client,
        uid: uid,
      },
    })
      .then(() => {
        fetchCurrentUser(token, client, uid)
          .then((res) => {
            setCurrentUserBookmarksArr(res.data.currentUserBookmarks);
          })
          .catch((e) => {
            console.error(e);
          });
      })
      .catch((e) => console.error(e));
  };

  return (
    <Fragment>
      {modalOpen ? (
        <SuccessModal
          message="????????????????????????????????????"
          button={<ReloadButton />}
        />
      ) : null}
      {alertOpen ? (
        <FailedAlert message="????????????????????????????????????????????????" />
      ) : null}
      <Grid className={classes.adviceContainer} container>
        <Hidden smDown>
          <Grid className={classes.mainLogoWrapper} container item md={3}>
            {/* ??????????????????????????????????????? */}
            <Grid item>
              <img className={classes.mainLogoImage} src={mainLogo} />
            </Grid>
          </Grid>
        </Hidden>
        <Grid container item md={9} direction="column">
          <Hidden only="xs">
            <Typography className={classes.pageTitle} variant="h3">
              ?????????????????????
            </Typography>
          </Hidden>
          <Hidden smUp>
            <Typography className={classes.pageTitle} variant="h4">
              ?????????????????????
            </Typography>
          </Hidden>
          <Grid item>
            <Typography className={classes.questionTitle} variant="h5">
              ??????
            </Typography>
          </Grid>
          <Grid className={classes.questionWrapper} item>
            <Card>
              <CardHeader
                avatar={
                  <ButtonBase
                    onClick={() =>
                      history.push(`/users/${questionData.user_id}`)
                    }
                  >
                    <Avatar
                      className={classes.userImage}
                      alt={showUserName(questionData.user_id)}
                      src={showUserImage(questionData.user_id)}
                      variant="rounded"
                    />
                  </ButtonBase>
                }
                title={
                  <Typography variant="h5">{`${showUserName(
                    questionData.user_id
                  )}???????????????`}</Typography>
                }
                subheader={`????????????${moment(questionData.created_at).format(
                  "YYYY-MM-DD"
                )}`}
              />
              <CardContent>
                <Typography variant="subtitle2" color="textSecondary">
                  ???????????????????????????????????????????????????????????????
                </Typography>
                <Typography>{`${questionData.training_menu}???${questionData.step}????????????`}</Typography>
              </CardContent>
              <CardContent>
                <Typography variant="subtitle2" color="textSecondary">
                  ??????????????????????????????????????????
                </Typography>
                <Typography>{`${questionData.question}`}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid className={classes.adviseWrapper} item>
            <Typography className={classes.adviceTitle} variant="h5">
              ????????????
            </Typography>
            <Grid item>
              <TextField
                className={classes.adviceTextField}
                variant="outlined"
                fullWidth
                multiline
                minRows={5}
                value={advice}
                onChange={hundleChange}
              />
            </Grid>
          </Grid>
          <Grid className={classes.buttonWrapper} item>
            <Button
              className={classes.submitButton}
              variant="contained"
              color="primary"
              onClick={hundleSubmit}
            >
              ????????????????????????????????????
            </Button>
          </Grid>
          <Grid item className={classes.advicesCardWrapper}>
            <Typography className={classes.adviceCardTitle} variant="h5">
              ??????????????????????????????????????????
            </Typography>
            {advicesArr.length !== 0 ? (
              advicesArr.map((adviceData, index) => {
                return (
                  <Card className={classes.adviceCard} key={index}>
                    <CardHeader
                      avatar={
                        <ButtonBase
                          onClick={() =>
                            history.push(`/users/${adviceData.user_id}`)
                          }
                        >
                          <Avatar
                            className={classes.userImage}
                            alt={showUserName(adviceData.user_id)}
                            src={showUserImage(adviceData.user_id)}
                            variant="rounded"
                          />
                        </ButtonBase>
                      }
                      title={
                        <Typography variant="h5">{`${showUserName(
                          adviceData.user_id
                        )}????????????????????????`}</Typography>
                      }
                      subheader={`????????????${moment(
                        adviceData.created_at
                      ).format("YYYY-MM-DD")}`}
                    />
                    <CardContent>
                      <Typography variant="subtitle2" color="textSecondary">
                        ???????????????
                      </Typography>
                      <Typography>{`${adviceData.advice}`}</Typography>
                    </CardContent>
                    <CardActions>
                      {currentUserBookmarksArr.find(
                        (element) => element.advice_id === adviceData.id
                      ) ? (
                        <Fragment>
                          <IconButton
                            onClick={() => deleteBookmarkAction(adviceData.id)}
                          >
                            <BookmarkIcon fontSize="large" />
                          </IconButton>
                          <Typography>????????????????????????</Typography>
                        </Fragment>
                      ) : (
                        <Fragment>
                          <IconButton
                            onClick={() => createBookmarkAction(adviceData.id)}
                          >
                            <BookmarkBorderIcon fontSize="large" />
                          </IconButton>
                          <Typography>????????????????????????</Typography>
                        </Fragment>
                      )}
                    </CardActions>
                  </Card>
                );
              })
            ) : (
              <Typography className={classes.nonAdviceTitle}>
                ???????????????????????????????????????
              </Typography>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  );
};
