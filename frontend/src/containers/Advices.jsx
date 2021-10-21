import React, { Fragment, useEffect, useState } from 'react';
import { Avatar, Button, ButtonBase, Card, CardContent, CardHeader, Grid, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import moment from 'moment';

// api 
import { fetchQuestion, fetchUsers, fetchCurrentUser, postAdvice } from '../apis/users';

const useStyles = makeStyles((theme) => ({
  adviceContainer: {
    marginTop: "2rem"
  },
  adviseWrapper: {
    margin: "2rem"
  },
  pageTitle: {
    marginBottom: "1rem"
  },
  questionTitle: {
    marginLeft: "2rem"
  },
  questionWrapper: {
    marginLeft: "2rem",
    marginRight: "2rem"
  },
  buttonWrapper: {
    margin: "0 auto"
  }
  
}));

export const Advices = ({ match }) => {

  const classes = useStyles();
  const history = useHistory();

  const token = Cookies.get('access-token');
  const client = Cookies.get('client');
  const uid = Cookies.get('uid');

  const [questionData, setQuestionData] = useState([]);
  const [usersArr, setUsersArr] = useState([]);
  const [advice, setAdvice] = useState("");
  const [currentUser, setCurrentUser] = useState([]);

  useEffect(() => {
    fetchQuestion(match.params.questionId, token, client, uid)
    .then((res) => {
      setQuestionData(res.data.question);
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

  useEffect(() => {
    fetchCurrentUser(token, client, uid)
    .then((res) => {
      setCurrentUser(res);
    })
    .catch((e) => {
      console.error(e);
    })
  }, []) 

  const showUserImage = (userId) => {
    const user = usersArr.find((user) => user.id === userId)

    return user?.image.url;
  }

  const showUserName = (userId) => {
    const user = usersArr.find((user) => user.id === userId);

    return user?.nickname;
  }

  const hundleChange = (e) => {
    setAdvice(e.target.value);
  }

  const hundleSubmit = () => {
    const currentUserId = currentUser.id;
    const questionId = questionData.id;
    postAdvice(token, client, uid, currentUserId, questionId, advice)
    .then((res) => {
      console.log(res);
    })
    .catch((e) => {
      console.error(e);
    })
  }

  return(
    <Fragment>
      <Grid className={classes.adviceContainer} container>
        <Grid container item md={3}></Grid>
        <Grid container item md={9} direction="column" >
          <Typography className={classes.pageTitle} variant="h3" >アドバイスする</Typography>
          <Grid className={classes.questionTitle} item>
            <Typography variant="h5">質問</Typography>
          </Grid>
          <Grid className={classes.questionWrapper} item>
            <Card>
              <CardHeader 
                avatar={
                  <ButtonBase 
                    onClick={() => history.push(`/users/${questionData.user_id}`)}
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
                  <Typography variant="h5">{`${showUserName(questionData.user_id)}`}</Typography>
                } 
                subheader={`投稿日：${moment(questionData.created_at).format('YYYY-MM-DD')}`}
              />
              <CardContent>
                <Typography variant="subtitle2" color="textSecondary">質問したいトレーニングメニュー及びステップ</Typography>
                <Typography>{`${questionData.training_menu}の${questionData.step}について`}</Typography>
              </CardContent>
              <CardContent>
                <Typography variant="subtitle2" color="textSecondary">困っていること、聞きたいこと</Typography>
                <Typography>{`${questionData.question}`}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid className={classes.adviseWrapper} item >
            <Typography variant="h5">回答する</Typography>
            <Grid item>
              <TextField 
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
              この内容でアドバイスする
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  );
}