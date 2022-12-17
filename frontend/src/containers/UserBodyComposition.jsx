import React, { useState, useEffect } from 'react';
import { Button, Grid, TextField, Typography, InputAdornment } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import Cookies from "js-cookie";

// api
import { fetchCurrentUser, postBodyComposition, fetchUserBodyCompositions } from '../apis/users';

const useStyles = makeStyles(() => ({
  weightArea: {
    marginBottom: '2rem'
  },
  bodyFatArea: {
    marginBottom: '2rem'
  }
}));

export const UserBodyComposition = ({ match }) => {

  const classes = useStyles();

  const token = Cookies.get("access-token");
  const client = Cookies.get("client");
  const uid = Cookies.get("uid");

  const [weight, setWeight] = useState();
  const [bodyFat, setBodyFat] = useState();
  const [currentUser, setCurrentUser] = useState([]);
  const [userBodyCompositions, setUserBodyCompositions] = useState([]);
  
  useEffect(() => {
    fetchCurrentUser(token, client, uid)
      .then((res) => {
        setCurrentUser(res.data.currentUser);
      })
      .catch((e) => {
        console.error(e);
      }) 
  }, []);

  useEffect(() => {
    const userId = match.params.userId;
    fetchUserBodyCompositions(userId)
    .then((res) => {
      setUserBodyCompositions(res.data.userBodyCompositions);
    })
    .catch((e) => {
      console.error(e);
    })
  }, []);

  const hundleWeightChange = (e) => {
    setWeight(e.target.value);
  }

  const hundleBodyFatChange = (e) => {
    setBodyFat(e.target.value);
  }

  const hundleSubmit = () => {
    const currentUserId = currentUser.id;
    postBodyComposition(token, client, uid, currentUserId, weight, bodyFat)
    .then((res) => {
      if (res.status === 200) {
        alert('送信成功！')
      }
    })
    .catch((e) => {
      alert('送信失敗！')
      console.error(e);
    })
  }

  return(
    <>
      <Typography variant="h3">体組成記録ページ</Typography>
      <Grid container>
        <Grid item>
          {
            userBodyCompositions.length !== 0 ? 
            userBodyCompositions.map((data, index) => {
              return(
                <>
                  <Grid container key={index} spacing={10}>
                    <Grid item>{`体重：${data.weight}Kg`}</Grid>
                    <Grid item>{`体脂肪：${data.body_fat}%`}</Grid>
                  </Grid>
                </>
              );
            })
            : 
            "体組成記録はまだ存在しません"
          }
        </Grid>
      </Grid>
      <Grid container direction='row' alignItems='center' spacing={5}>
        <Grid item className={classes.weightArea}>
          <Typography variant='subtitle2'>体重</Typography>
          <TextField 
            value={weight} 
            onChange={hundleWeightChange}
            variant='outlined'
            placeholder='20.0 ~ 100.0'
            InputProps={{
              endAdornment: <InputAdornment position="end">Kg</InputAdornment>,
            }}
            helperText='数値を入力してください'
           />
        </Grid>
        <Grid item className={classes.bodyFatArea}>
          <Typography variant='subtitle2'>体脂肪</Typography>
          <TextField
            value={bodyFat} 
            onChange={hundleBodyFatChange}
            variant="outlined"
            placeholder='1.0 ~ 50.0'
            InputProps={{
              endAdornment: <InputAdornment position='end'>%</InputAdornment>,
            }}
            helperText='数値を入力してください'
           />
        </Grid>
        <Grid item>
          <Button variant="contained" color='primary' onClick={hundleSubmit}>送信</Button>
        </Grid>
      </Grid>
    </>
  );
}