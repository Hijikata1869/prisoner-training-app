import React, { useState, useEffect } from 'react';
import { Button, Grid, TextField, Typography, InputAdornment } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import Cookies from "js-cookie";
import moment from "moment";

// charts
import { LineChart, XAxis, YAxis, Tooltip, Legend, Line, ResponsiveContainer } from 'recharts';

// api
import { fetchCurrentUser, postBodyComposition, fetchUserBodyCompositions } from '../apis/users';

// components
import { SuccessModal } from '../components/SuccessModal';
import { ReloadButton } from '../components/ReloadButton';
import { FailedAlert } from '../components/FailedAlert';

const useStyles = makeStyles(() => ({
  lineChartsContainer: {
    marginTop: "2rem"
  },
  weightArea: {
    marginBottom: '2rem'
  },
  bodyFatArea: {
    marginBottom: '2rem'
  },
  alertContainer: {
    paddingBottom: '2rem'
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
  const [modalOpen, setModalOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  
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
        setModalOpen(true);
      }
    })
    .catch((e) => {
      setAlertOpen(true);
      console.error(e);
    })
  }

  const formatedBodyCompositions = userBodyCompositions.map((data) => {
    return (
      {
        id: data.id,
        user_id: data.user_id,
        体重: data.weight,
        体脂肪: data.body_fat,
        created_at: moment(data.created_at).format("MM/DD")
      }
    );
  });

  return(
    <>
      {
        modalOpen ?
        <SuccessModal 
          message="体組成を記録しました"
          button={<ReloadButton />}
        /> :
        null
      }
      {
        alertOpen ?
        <Grid className={classes.alertContainer} container>
          <Grid item>
            <FailedAlert 
              message="体組成を記録できませんでした"
            />
          </Grid>
        </Grid>
        :
        null
      }
      <Typography variant="h4">体組成記録</Typography>
      <Grid className={classes.lineChartsContainer} container>
        <ResponsiveContainer height="100%" width="80%">
          <LineChart
            data={formatedBodyCompositions}
          >
            <XAxis dataKey="created_at" interval={1} />
            <YAxis 
              yAxisId="left" 
              label={{ value: '体重(kg)', dx: -10, angle: -90 }}
              padding={{ top: 30, bottom: 30 }}
            />
            <YAxis 
              yAxisId="right" 
              orientation="right" 
              label={{ value: '体脂肪(%)', dx: 10, angle: -90 }}
              padding={{ top: 30, bottom: 30 }}
            />
            <Tooltip />
            <Legend 
              iconType={"plainline"}
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="体重"
              stroke="#8884db"
              dot={false}
            />
            <Line 
              yAxisId="right"
              type="monotone"
              dataKey="体脂肪"
              stroke="#82ca9d"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
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
        <Grid item>
          <Button variant="contained" color="secondary" onClick={() => console.log(formatedBodyCompositions)}>console</Button>
        </Grid>
      </Grid>
    </>
  );
}