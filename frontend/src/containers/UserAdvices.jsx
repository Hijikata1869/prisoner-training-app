import React, { Fragment, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
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
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import Cookies from "js-cookie";

// icons
import BookmarkIcon from "@material-ui/icons/Bookmark";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";

// apis
import {
  fetchUser,
  fetchUsers,
  fetchQuestions,
  fetchCurrentUser,
  deleteAdvice,
  fetchUserAdvices
} from "../apis/users";

// components
import { DeleteDialog } from "../components/DeleteDialog";
import { SuccessAlert } from "../components/SuccessAlert";

const useStyles = makeStyles(() => ({
  adviceCardWrapper: {
    paddingLeft: "2rem",
    paddingRight: "2rem",
  },
  pageTitle: {
    marginBottom: "2rem",
    marginLeft: "2rem",
  },
  adviceCard: {
    marginBottom: "1rem",
    padding: "1rem",
  },
  userAvatar: {
    height: "75px",
    width: "75px",
    marginRight: "1.5rem",
  },
  cardActionText: {
    margin: "0 auto",
  },
  deleteAdviceButton: {
    margin: "0 0 0 auto",
  },
}));

export const UserAdvices = ({ match }) => {
  const history = useHistory();
  const classes = useStyles();

  const token = Cookies.get("access-token");
  const client = Cookies.get("client");
  const uid = Cookies.get("uid");

  const [user, setUser] = useState([]);
  const [allUsersArr, setAllUsersArr] = useState([]);
  const [allQuestionsArr, setAllQuestionsArr] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);
  const [currentUserBookmarksArr, setCurrentUserBookmarksArr] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [targetAdviceId, setTargetAdviceId] = useState();
  const [alertOpen, setAlertOpen] = useState(false);
  const [userAdvices, setUserAdvices] = useState([]);

  useEffect(() => {
    fetchUser(match.params.userId)
      .then((res) => {
        setUser(res.data.user);
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

  useEffect(() => {
    fetchQuestions()
      .then((res) => {
        setAllQuestionsArr(res.data.questions);
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

  useEffect(() => {
    fetchUserAdvices(match.params.userId)
    .then((res) => {
      setUserAdvices(res.data.userAdvices);
    })
    .catch((e) => {
      console.error(e);
    });
  }, []);

  const showUserImage = (userId) => {
    const user = allUsersArr.find((user) => user.id == userId);
    return user?.image.url;
  };

  const showUserName = (userId) => {
    const user = allUsersArr.find((user) => user.id == userId);
    return user?.nickname;
  };

  const showQuestion = (questionId) => {
    const targetQuestion = allQuestionsArr.find(
      (question) => question.id == questionId
    );
    return targetQuestion?.question;
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

  const dialogOpenAction = (adviceId) => {
    setTargetAdviceId(adviceId);
    setDialogOpen(true);
  };

  const deleteAdviceAction = () => {
    deleteAdvice(token, client, uid, targetAdviceId)
      .then((res) => {
        if (res.status == 200) {
          setDialogOpen(false);
          setAlertOpen(true);
        }
      })
      .then(() => {
        window.scroll({
          top: 0,
        });
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <Fragment>
      {dialogOpen ? <DeleteDialog deleteAction={deleteAdviceAction} /> : null}
      {alertOpen ? (
        <SuccessAlert message="アドバイスを一件削除しました" />
      ) : null}
      <Grid container item direction="column">
        <Hidden only="xs">
          <Typography
            className={classes.pageTitle}
            variant="h4"
          >{`${user.nickname}さんのアドバイス一覧`}</Typography>
        </Hidden>
        <Hidden smUp>
          <Typography
            className={classes.pageTitle}
            variant="h6"
          >{`${user.nickname}さんのアドバイス一覧`}</Typography>
        </Hidden>
        <Grid className={classes.adviceCardWrapper} item>
          {userAdvices.length !== 0 ? (
            <Fragment>
              {userAdvices.map((data, index) => {
                return (
                  <Card className={classes.adviceCard} key={index}>
                    <CardHeader
                      avatar={
                        <ButtonBase
                          onClick={() => history.push(`/users/${data.user_id}`)}
                        >
                          <Avatar
                            className={classes.userAvatar}
                            variant="rounded"
                            src={showUserImage(data.user_id)}
                          />
                        </ButtonBase>
                      }
                      title={
                        <Typography variant="h5">{`${showUserName(
                          data.user_id
                        )}`}</Typography>
                      }
                      subheader={
                        <Typography variant="subtitle2" color="textSecondary">
                          {`投稿日：${moment(data.created_at).format(
                            "YYYY-MM-DD"
                          )}`}
                        </Typography>
                      }
                    />
                    <CardContent>
                      <Typography variant="subtitle2" gutterBottom>
                        元の質問
                      </Typography>
                      <Typography variant="subtitle2" color="textSecondary">
                        {`${showQuestion(data.question_id)}`}
                      </Typography>
                    </CardContent>
                    <CardContent>
                      <Typography
                        variant="subtitle2"
                        gutterBottom
                      >{`${showUserName(
                        data.user_id
                      )}さんのアドバイス`}</Typography>
                      <Typography>{`${data.advice}`}</Typography>
                    </CardContent>
                    {currentUser.length !== 0 ? (
                      <Fragment>
                        {currentUserBookmarksArr.find(
                          (bookmark) => bookmark.advice_id == data.id
                        ) ? (
                          <CardActions>
                            <IconButton
                              onClick={() => deleteBookmarkAction(data.id)}
                            >
                              <BookmarkIcon />
                            </IconButton>
                            <Typography>ブックマーク済み</Typography>
                          </CardActions>
                        ) : (
                          <CardActions>
                            <IconButton
                              onClick={() => createBookmarkAction(data.id)}
                            >
                              <BookmarkBorderIcon />
                            </IconButton>
                            <Typography>ブックマークする</Typography>
                          </CardActions>
                        )}
                      </Fragment>
                    ) : (
                      <CardActions>
                        <Typography
                          className={classes.cardActionText}
                          color="textSecondary"
                        >
                          ログインするとアドバイスをブックマークすることができます
                        </Typography>
                      </CardActions>
                    )}
                    {currentUser.id == data.user_id ? (
                      <CardActions>
                        <Button
                          className={classes.deleteAdviceButton}
                          onClick={() => dialogOpenAction(data.id)}
                        >
                          削除する
                        </Button>
                      </CardActions>
                    ) : null}
                  </Card>
                );
              })}
            </Fragment>
          ) : (
            <Typography>まだアドバイスがありません</Typography>
          )}
        </Grid>
      </Grid>
    </Fragment>
  );
};
