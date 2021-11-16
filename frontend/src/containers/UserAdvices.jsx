import React, { Fragment, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Avatar, Button, ButtonBase, Card, CardActions, CardContent, CardHeader, Grid, IconButton, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import Cookies from 'js-cookie';

// icons
import BookmarkIcon from '@material-ui/icons/Bookmark';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';

// apis
import { fetchUser, fetchUsers, fetchQuestions, fetchCurrentUser, deleteAdvice } from '../apis/users';


const useStyles = makeStyles(() => ({
  adviceCardWrapper: {
    paddingLeft: "2rem",
    paddingRight: "2rem"
  },
  pageTitle: {
    marginBottom: "2rem"
  },
  adviceCard: {
    marginBottom: "1rem",
    paddingBottom: "1rem"
  },
  userAvatar: {
    height: "75px",
    width: "75px",
    marginRight: "1.5rem"
  },
  cardActionText: {
    margin: "0 auto"
  }
}))


export const UserAdvices = ({ match }) => {

  const history = useHistory();
  const classes = useStyles();

  const token = Cookies.get('access-token');
  const client = Cookies.get('client');
  const uid = Cookies.get('uid');

  const [user, setUser] = useState([]);
  const [userAdvicesArr, setUserAdvicesArr] = useState([]);
  const [allUsersArr, setAllUsersArr] = useState([]);
  const [allQuestionsArr, setAllQuestionsArr] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);
  const [currentUserBookmarksArr, setCurrentUserBookmarksArr] = useState([]);

  useEffect(() => {
    fetchUser(match.params.userId)
    .then((res) => {
      setUser(res.data.user);
      setUserAdvicesArr(res.data.userAdvices);
      console.log(res);
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

  useEffect(() => {
    fetchQuestions()
    .then((res) => {
      setAllQuestionsArr(res.data.questions);
    })
    .catch((e) => {
      console.error(e);
    })
  }, [])

  useEffect(() => {
    fetchCurrentUser(token, client, uid)
    .then((res) => {
      setCurrentUser(res.data.currentUser);
      setCurrentUserBookmarksArr(res.data.currentUserBookmarks);
    })
    .catch((e) => {
      console.error(e);
    })
  }, [])

  const showUserImage = (userId) => {
    const user = allUsersArr.find(user => user.id == userId);
    return user?.image.url;
  }

  const showUserName = (userId) => {
    const user = allUsersArr.find(user => user.id == userId);
    return user?.nickname;
  }

  const showQuestion = (questionId) => {
    const targetQuestion = allQuestionsArr.find(question => question.id == questionId);
    return targetQuestion?.question;
  }

  const deleteBookmarkAction = (adviceId) => {
    fetch(`http://localhost:3000/api/v1/advices/${adviceId}/bookmarks`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'access-token': token,
        'client': client,
        'uid': uid
      }
    })
    .then(() => {
      fetchCurrentUser(token, client, uid)
      .then((res) => {
        setCurrentUserBookmarksArr(res.data.currentUserBookmarks);
      })
      .catch((e) => {
        console.error(e);
      })
    })
    .catch((e) => console.error(e))
  }

  const createBookmarkAction = (adviceId) => {
    fetch(`http://localhost:3000/api/v1/advices/${adviceId}/bookmarks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'access-token': token,
        'client': client,
        'uid': uid
      }
    })
    .then(() => {
      fetchCurrentUser(token, client, uid)
      .then((res) => {
        setCurrentUserBookmarksArr(res.data.currentUserBookmarks);
      })
      .catch((e) => {
        console.error(e);
      })
    })
    .catch((e) => console.error(e))
  }

  return(
    <Fragment>
      <Grid container item direction="column">
        <Typography className={classes.pageTitle} variant="h4">{`${user.nickname}さんのアドバイス一覧`}</Typography>
        <Grid className={classes.adviceCardWrapper} item>
          {
            userAdvicesArr.map((data, index) => {
              return(
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
                      <Typography variant="h5">{`${showUserName(data.user_id)}`}</Typography>
                    }
                    subheader={
                      <Typography variant="subtitle2" color="textSecondary">
                        {`投稿日：${moment(data.created_at).format('YYYY-MM-DD')}`}
                      </Typography>
                    }
                   />
                  <CardContent>
                    <Typography variant="subtitle2" gutterBottom>元の質問</Typography>
                    <Typography variant="subtitle2" color="textSecondary">
                      {`${showQuestion(data.question_id)}`}
                    </Typography>
                  </CardContent>
                  <CardContent>
                    <Typography variant="subtitle2" gutterBottom>{`${showUserName(data.user_id)}さんのアドバイス`}</Typography>
                    <Typography>{`${data.advice}`}</Typography>
                  </CardContent>
                  {
                    currentUser.length !== 0 ?
                    <Fragment>
                      {
                        currentUserBookmarksArr.find(bookmark => bookmark.advice_id == data.id) ?
                        <CardActions>
                          <IconButton
                            onClick={() => deleteBookmarkAction(data.id)}
                          >
                            <BookmarkIcon />
                          </IconButton>
                          <Typography>ブックマーク済み</Typography>
                        </CardActions>
                        :
                        <CardActions>
                          <IconButton
                            onClick={() => createBookmarkAction(data.id)}
                          >
                            <BookmarkBorderIcon />
                          </IconButton>
                          <Typography>ブックマークする</Typography>
                        </CardActions>
                      }
                    </Fragment>
                    :
                    <CardActions>
                      <Typography className={classes.cardActionText} color="textSecondary" >
                        ログインするとアドバイスをブックマークすることができます
                      </Typography>
                    </CardActions>
                  }
                  {
                    currentUser.id == data.user_id ?
                    <CardActions>
                      <Button>削除する</Button>
                    </CardActions>
                    :
                    null
                  }
                </Card>
              );
            })
          }
        </Grid>
      </Grid>
    </Fragment>
  );
}