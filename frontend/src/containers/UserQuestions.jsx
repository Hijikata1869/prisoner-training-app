import React, { Fragment, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Avatar, Button, ButtonBase, Card, CardActions, CardContent, CardHeader, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Cookies from 'js-cookie';
import moment from 'moment';

// apis
import { fetchCurrentUser, fetchUser, fetchUsers } from '../apis/users';

const useStyles = makeStyles(() => ({
  userAvatar: {
    height: "75px",
    width: "75px"
  },
  questionCard: {
    marginBottom: "2rem",
    padding: "1rem"
  },
  questionCardWrapper: {
    paddingLeft: "2rem",
    paddingRight: "2rem"
  },
  pageTitle: {
    marginBottom: "2rem"
  },
  adviceButton: {
    margin: "0 auto"
  },
  toQuestionPageButton: {
    marginTop: "2rem"
  }
}))

export const UserQuestions = ({ match }) => {

  const classes = useStyles();
  const history = useHistory();

  const token = Cookies.get('access-token');
  const client = Cookies.get('client');
  const uid = Cookies.get('uid');

  const [user, setUser] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);
  const [userQuestions, setUserQuestions] = useState([]);
  const [usersArr, setUsersArr] = useState([]);

  useEffect(() => {
    fetchUser(match.params.userId)
    .then((res) => {
      setUser(res.data.user);
      setUserQuestions(res.data.userQuestions);
    })
    .catch((e) => {
      console.error(e);
    })
  }, [])

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
      setUsersArr(res.data.users);
    })
    .catch((e) => {
      console.error(e);
    })
  }, [])

  const showUserImage = (userId) => {
    const user = usersArr.find(user => user.id === userId);
    return user?.image.url;
  } 

  const showUserName = (userId) => {
    const user = usersArr.find(user => user.id === userId);
    return user?.nickname;
  }


  return(
    <Fragment>
      <Grid container item direction="column" >
        <Typography className={classes.pageTitle} variant="h4">{`${user.nickname}さんの質問一覧`}</Typography>
        {
          userQuestions.length !== 0 ?
          userQuestions.map((questionData, index) => {
            return(
              <Grid className={classes.questionCardWrapper} item key={index}>
                <Card className={classes.questionCard}>
                  <CardHeader
                    avatar={
                      <ButtonBase
                        onClick={() => history.push(`/users/${questionData.user_id}`)}
                      >
                        <Avatar 
                          className={classes.userAvatar}
                          variant="rounded"
                          src={showUserImage(questionData.user_id)}
                        />
                      </ButtonBase>
                    }
                    title={
                      <Typography variant="h5" >{`${showUserName(questionData.user_id)}`}</Typography>
                    }
                    subheader={`投稿日：${moment(questionData.created_at).format('YYYY-MM-DD')}`}
                  />
                  <CardContent>
                    <Typography variant="subtitle2" color="textSecondary" >質問したいトレーニングメニュー及びステップ</Typography>
                    <Typography>{`${questionData.training_menu}の${questionData.step}について`}</Typography>
                  </CardContent>
                  <CardContent>
                    <Typography variant="subtitle2" color="textSecondary" >困っていること、聞きたいこと</Typography>
                    <Typography>{`${questionData.question}`}</Typography>
                  </CardContent>
                  <CardActions className={classes.adviceButtonWrapper}>
                    <Button 
                      className={classes.adviceButton} 
                      variant="contained" 
                      color="primary" 
                      onClick={() => history.push(`/questions/${questionData.id}/advices`)}
                    >
                      アドバイスをする
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })
          :
          <Grid item>
            <Typography variant="h6">まだ質問がありません</Typography>
            {
              currentUser.length !== 0 ?
              <Button 
                variant="outlined" 
                className={classes.toQuestionPageButton}
                onClick={() => history.push("/Questions")}
              >
                質問ページはこちら
              </Button>
              :
              null
            }
          </Grid>
        }
      </Grid>
    </Fragment>
  );
}