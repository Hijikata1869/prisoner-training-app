import React, { Fragment, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Avatar,
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
  fetchUsers,
  fetchUser,
  fetchCurrentUser,
  fetchQuestions,
} from "../apis/users";

const useStyles = makeStyles(() => ({
  pageTitle: {
    margin: "0 2rem",
  },
  adviceCardWrapper: {
    margin: "2rem",
  },
  adviceCard: {
    marginBottom: "2rem",
    padding: "1rem",
  },
  userImage: {
    height: "60px",
    width: "60px",
  },
}));

export const UserBookmarks = ({ match }) => {
  const history = useHistory();
  const classes = useStyles();

  const token = Cookies.get("access-token");
  const client = Cookies.get("client");
  const uid = Cookies.get("uid");

  const [usersArr, setUsersArr] = useState([]);
  const [bookmarkedAdvicesArr, setBookmaredkAdvicesArr] = useState([]);
  const [currentUserBookmarksArr, setCurrentUserBookmarksArr] = useState([]);
  const [allQuestionsArr, setAllQuestionsArr] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);

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
    fetchUser(match.params.userId, token, client, uid)
      .then((res) => {
        setBookmaredkAdvicesArr(res.data.bookmarkedAdvices);
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
    fetchQuestions()
      .then((res) => {
        setAllQuestionsArr(res.data.questions);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  const showUserName = (userId) => {
    const user = usersArr.find((user) => user.id === userId);
    return user?.nickname;
  };

  const showUserImage = (userId) => {
    const user = usersArr.find((user) => user.id === userId);
    return user?.image.url;
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

  const showQuestion = (questionId) => {
    const targetQuestion = allQuestionsArr.find(
      (question) => question.id == questionId
    );
    return targetQuestion?.question;
  };

  return (
    <Fragment>
      <Grid container item direction="column">
        <Hidden only="xs">
          <Typography className={classes.pageTitle} variant="h4">
            {`${showUserName(
              Number(match.params.userId)
            )}さんのブックマークしたアドバイス`}
          </Typography>
        </Hidden>
        <Hidden smUp>
          <Typography className={classes.pageTitle} variant="h6">
            {`${showUserName(
              Number(match.params.userId)
            )}さんのブックマークしたアドバイス`}
          </Typography>
        </Hidden>
        <Grid className={classes.adviceCardWrapper} item>
          {bookmarkedAdvicesArr.length !== 0 ? (
            <Fragment>
              {bookmarkedAdvicesArr.map((adviceData, index) => {
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
                        )}さんのアドバイス`}</Typography>
                      }
                      subheader={`投稿日：${moment(
                        adviceData.created_at
                      ).format("YYYY-MM-DD")}`}
                    />
                    <CardContent>
                      <Typography variant="subtitle2" gutterBottom>
                        元の質問
                      </Typography>
                      <Typography variant="subtitle2" color="textSecondary">
                        {`${showQuestion(adviceData.question_id)}`}
                      </Typography>
                    </CardContent>
                    <CardContent>
                      <Typography variant="subtitle2" gutterBottom>
                        アドバイス
                      </Typography>
                      <Typography>{`${adviceData.advice}`}</Typography>
                    </CardContent>
                    <CardActions>
                      {currentUser.length !== 0 ? (
                        currentUserBookmarksArr.find(
                          (element) => element.advice_id === adviceData.id
                        ) ? (
                          <Fragment>
                            <IconButton
                              onClick={() =>
                                deleteBookmarkAction(adviceData.id)
                              }
                            >
                              <BookmarkIcon />
                            </IconButton>
                            <Typography>ブックマーク済み</Typography>
                          </Fragment>
                        ) : (
                          <Fragment>
                            <IconButton
                              onClick={() =>
                                createBookmarkAction(adviceData.id)
                              }
                            >
                              <BookmarkBorderIcon />
                            </IconButton>
                            <Typography>ブックマークする</Typography>
                          </Fragment>
                        )
                      ) : null}
                    </CardActions>
                  </Card>
                );
              })}
            </Fragment>
          ) : (
            <Typography>まだブックマークしたアドバイスがありません</Typography>
          )}
        </Grid>
      </Grid>
    </Fragment>
  );
};
