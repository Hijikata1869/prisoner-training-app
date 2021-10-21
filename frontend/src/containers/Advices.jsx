import React, { Fragment, useEffect, useState } from 'react';
import { Avatar, Button, ButtonBase, Card, CardContent, CardHeader, Grid, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import moment from 'moment';

// api 
import { fetchQuestion, fetchUsers, fetchCurrentUser, postAdvice } from '../apis/users';

// components
import { SuccessModal } from '../components/SuccessModal';
import { FailedAlert } from '../components/FailedAlert';
import { ReloadButton } from '../components/ReloadButton';

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
    marginLeft: "2rem",
    marginBottom: "0.5rem"
  },
  questionWrapper: {
    marginLeft: "2rem",
    marginRight: "2rem"
  },
  buttonWrapper: {
    margin: "0 auto"
  },
  submitButton: {
    marginBottom: "2rem"
  },
  advicesCardWrapper: {
    margin: "0 2rem 2rem 2rem"
  },
  adviceCard: {
    marginBottom: "1rem"
  },
  adviceTitle: {
    marginBottom: "0.5rem"
  },
  adviceCardTitle: {
    marginBottom: "0.5rem"
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
  const [modalOpen, setModalOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [advicesArr, setAdvicesArr] = useState([]);

  useEffect(() => {
    fetchQuestion(match.params.questionId, token, client, uid)
    .then((res) => {
      setQuestionData(res.data.question);
      setAdvicesArr(res.data.advices);
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
      if (res.status === 200) {
        setModalOpen(true);
      }
    })
    .catch((e) => {
      setAlertOpen(true);
      console.error(e);
    })
  }

  return(
    <Fragment>
      {
        modalOpen ? 
        <SuccessModal message="アドバイスを投稿しました" button={<ReloadButton />} /> :
        null
      }
      {
        alertOpen ? 
        <FailedAlert message="アドバイスが投稿できませんでした" /> :
        null
      }
      <Grid className={classes.adviceContainer} container>
        <Grid container item md={3}></Grid>
        <Grid container item md={9} direction="column" >
          <Typography className={classes.pageTitle} variant="h3" >アドバイスする</Typography>
          <Grid item>
            <Typography className={classes.questionTitle} variant="h5">質問</Typography>
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
                  <Typography variant="h5">{`${showUserName(questionData.user_id)}さんの質問`}</Typography>
                } 
                subheader={`質問日：${moment(questionData.created_at).format('YYYY-MM-DD')}`}
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
            <Typography className={classes.adviceTitle} variant="h5">回答する</Typography>
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
          <Grid item className={classes.advicesCardWrapper} >
            <Typography className={classes.adviceCardTitle} variant="h5" >この質問への過去のアドバイス</Typography>
            {
            advicesArr.map((adviceData, index) => {
              return(
                <Card className={classes.adviceCard} key={index} >
                  <CardHeader 
                    avatar={
                      <ButtonBase 
                        onClick={() => history.push(`/users/${adviceData.user_id}`)}
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
                      <Typography variant="h5">{`${showUserName(adviceData.user_id)}さんのアドバイス`}</Typography>
                    } 
                    subheader={`回答日：${moment(adviceData.created_at).format('YYYY-MM-DD')}`}
                  />
                  <CardContent>
                    <Typography variant="subtitle2" color="textSecondary">アドバイス</Typography>
                    <Typography>{`${adviceData.advice}`}</Typography>
                  </CardContent>
                </Card>
              );
            })
            }
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  );
}