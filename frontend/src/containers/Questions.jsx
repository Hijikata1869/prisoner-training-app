import React, { Fragment, useEffect, useState } from 'react';
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Cookies from 'js-cookie';

// api
import { fetchCurrentUser, postQuestion } from '../apis/users';

// components
import { SuccessModal } from '../components/SuccessModal';
import { ReloadButton } from '../components/ReloadButton';
import { FailedAlert } from '../components/FailedAlert';

const useStyles = makeStyles(() => ({
  questionsWrapper: {
    paddingTop: "2rem"
  },
  postQuestionWrapper: {
    paddingLeft: "2rem",
    paddingRight: "2rem"
  },
  showQuestionsWrapper: {
  },
  postQuestionTitle: {
    marginBottom: "2rem"
  },
  postQuestionItems: {
    marginBottom: "2rem"
  },
  postQuestionButton: {
    margin: "0 auto"
  }
}));

export const Questions = () => {

  const classes = useStyles();

  const token = Cookies.get('access-token');
  const client = Cookies.get('client');
  const uid = Cookies.get('uid');

  const [trainingMenu, setTrainingMenu] = useState("");
  const [step, setStep] = useState("");
  const [questionText, setQuestionText] = useState("");
  const [currentUser, setCurrentUser] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);

  useEffect(() => {
    fetchCurrentUser(token, client, uid)
    .then((res) => {
      setCurrentUser(res);
    })
    .catch((e) => {
      console.error(e);
    })
  }, []);

  const hundleTrainingMenuChange = (e) => {
    setTrainingMenu(e.target.value);
  };

  const hundleStepChange = (e) => {
    setStep(e.target.value);
  };

  const hundleTextChange = (e) => {
    setQuestionText(e.target.value);
  }

  const postQuestionAction = () => {
    const userId = currentUser.id;
    postQuestion(token, client, uid, userId, trainingMenu, step, questionText)
    .then((res) => {
      setModalOpen(true);
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
      <SuccessModal message="質問を投稿しました" button={<ReloadButton />} /> :
      null
    }
    {
      alertOpen ? 
      <FailedAlert message="質問が投稿できませんでした" /> :
      null
    }
        <Grid className={classes.questionsWrapper} container>
          <Grid 
            className={classes.postQuestionWrapper} 
            container 
            item 
            md={5} 
            direction="column" 
          >
            <Grid item>
              <Typography className={classes.postQuestionTitle} variant="h4">質問する</Typography>
            </Grid>
            <Grid className={classes.postQuestionItems} item >
              <FormControl variant="standard" fullWidth >
                <InputLabel>トレーニングメニュー</InputLabel>
                <Select 
                  label="trainingMenu" 
                  value={trainingMenu}
                  onChange={hundleTrainingMenuChange}
                >
                  <MenuItem value="プッシュアップ">プッシュアップ</MenuItem>
                  <MenuItem value="スクワット">スクワット</MenuItem>
                  <MenuItem value="プルアップ">プルアップ</MenuItem>
                  <MenuItem value="レッグレイズ">レッグレイズ</MenuItem>
                  <MenuItem value="ブリッジ">ブリッジ</MenuItem>
                  <MenuItem value="ハンドスタンドプッシュアップ">ハンドスタンドプッシュアップ</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid className={classes.postQuestionItems} item>
              <FormControl variant="standard" fullWidth >
                <InputLabel>ステップ</InputLabel>
                <Select
                  label="step" 
                  value={step} 
                  onChange={hundleStepChange}
                >
                  <MenuItem value="ステップ１">ステップ１</MenuItem>
                  <MenuItem value="ステップ２">ステップ２</MenuItem>
                  <MenuItem value="ステップ３">ステップ３</MenuItem>
                  <MenuItem value="ステップ４">ステップ４</MenuItem>
                  <MenuItem value="ステップ５">ステップ５</MenuItem>
                  <MenuItem value="ステップ６">ステップ６</MenuItem>
                  <MenuItem value="ステップ７">ステップ７</MenuItem>
                  <MenuItem value="ステップ８">ステップ８</MenuItem>
                  <MenuItem value="ステップ９">ステップ９</MenuItem>
                  <MenuItem value="ステップ１０">ステップ１０</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid className={classes.postQuestionItems} item>
              <Typography variant="subtitle2">詰まっているポイント</Typography>
              <TextField 
                variant="outlined" 
                fullWidth 
                multiline 
                minRows={10} 
                value={questionText} 
                onChange={hundleTextChange}
              >
              </TextField>
            </Grid>
            <Grid className={classes.postQuestionButton} item>
              <Button 
                variant="contained" 
                color="primary" 
                onClick={() => postQuestionAction()}
              >
                質問する
              </Button>
            </Grid>
          </Grid>
          <Grid className={classes.showQuestionsWrapper} container item md={7} direction="column">
            <Grid item>
              <Typography variant="h4">質問一覧</Typography>
            </Grid>
          </Grid>
        </Grid>
    </Fragment>
  );
}