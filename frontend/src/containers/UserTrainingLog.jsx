import React, { Fragment, useEffect, useState } from 'react';
import { Grid, Typography, Button, FormControl, InputLabel, Select, MenuItem, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Cookies from 'js-cookie';

// apis
import { postTraining, fetchCurrentUser } from '../apis/users';

const useStyles = makeStyles(() => ({
  inputTrainingWrapper: {
  },
  inputTrainingTitle: {
    marginBottom: "4rem",
  },
  pastTrainingLogTitle: {
    marginTop: "4rem",
  }
}));

const repsPrepare = () => {
  const reps = [];
  for (let i = 1; i < 51; i++) {
    reps.push(`${i}`);
  }
  return reps;
}


export const UserTrainingLog = () => {

  const classes = useStyles();
  const trainingLepsArray = repsPrepare();

  const [currentUser, setCurrentUser] = useState([]);
  const [trainingMenu, setTrainingMenu] = useState("");
  const [step, setStep] = useState("");
  const [rep, setRep] = useState("");
  const [set, setSet] = useState("");
  const [note, setNote] = useState("");

  const token = Cookies.get('access-token');
  const client = Cookies.get('client');
  const uid = Cookies.get('uid');

  useEffect(() => {
    fetchCurrentUser(token, client, uid)
    .then((res) => {
      setCurrentUser(res);
    })
    .catch((e) => {
      console.error(e);
    })
  }, []);

  const hundleMenuChange = (e) => {
    setTrainingMenu(e.target.value);
  }

  const hundleStepChange = (e) => {
    setStep(e.target.value);
  }

  const hundleRepsChange = (e) => {
    setRep(e.target.value);
  }

  const hundleSetChange = (e) => {
    setSet(e.target.value);
  }

  const hundleNoteChange = (e) => {
    setNote(e.target.value);
  }

  const postTrainingAction = (token, client, uid, trainingMenu, step, rep, set, note) => {
    const userId = currentUser.id;
    const result = postTraining(userId, token, client, uid, trainingMenu, step, rep, set, note);
    result
    .then((res) => {
      if (res.status === 200) {
        alert('登録成功')
      }
    })
    .catch((e) => {
      console.error(e);
    })
  }

  return(
    <Fragment>
      <Grid className={classes.inputTrainingWrapper} container item direction="column">
        <Typography className={classes.inputTrainingTitle} variant="h4">
          トレーニングを記録する
        </Typography>
        <Grid container item spacing={3} direction="row" alignItems="center" >
          <Grid item  className={classes.sample}  md={4} >
            <FormControl variant="standard" fullWidth >
              <InputLabel>トレーニングメニュー</InputLabel>
              <Select 
                label="trainingMenu" 
                value={trainingMenu} 
                onChange={hundleMenuChange} 
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
          <Grid item md={3}>
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
          <Grid item md={2}>
            <FormControl variant="standard" fullWidth>
              <InputLabel>回数</InputLabel>
              <Select
                label="rep" 
                value={rep} 
                onChange={hundleRepsChange}
              >
                {
                  trainingLepsArray.map((rep, index) => {
                    return(
                      <MenuItem key={index} value={rep}>{`${rep}回`}</MenuItem>
                    )
                  })
                }
              </Select>
            </FormControl>
          </Grid>
          <Grid item md={3}>
            <FormControl variant="standard" fullWidth >
              <InputLabel>セット数</InputLabel>
              <Select
                label="set" 
                value={set} 
                onChange={hundleSetChange}
              >
                <MenuItem value="１セット">１セット</MenuItem>
                <MenuItem value="２セット">２セット</MenuItem>
                <MenuItem value="３セット">３セット</MenuItem>
                <MenuItem value="４セット">４セット</MenuItem>
                <MenuItem value="５セット">５セット</MenuItem>
                <MenuItem value="６セット">６セット</MenuItem>
                <MenuItem value="７セット">７セット</MenuItem>
                <MenuItem value="８セット">８セット</MenuItem>
                <MenuItem value="９セット">９セット</MenuItem>
                <MenuItem value="１０セット">１０セット</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item md={10} >
            <FormControl variant="standard" fullWidth >
              <TextField 
                label="一言メモ" 
                value={note}
                onChange={hundleNoteChange}
              />
            </FormControl>
          </Grid>
          <Grid item md={2}>
            <Button 
              color="primary" 
              variant="contained"
              size="medium" 
              onClick={() => postTrainingAction(token, client, uid, trainingMenu, step, rep, set, note)}
            >
              記録する
            </Button>
          </Grid>
        </Grid>
        <Grid container item direction="column" >
          <Typography className={classes.pastTrainingLogTitle} variant="h4" >過去の記録</Typography>
        </Grid>
      </Grid>
    </Fragment>
  )
}