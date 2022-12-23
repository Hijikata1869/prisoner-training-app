import React, { useState, useEffect } from 'react';
import { Button, Grid, TextField, Typography, InputAdornment, Hidden } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import Cookies from "js-cookie";
import moment from "moment";

// charts
import { LineChart, XAxis, YAxis, Tooltip, Legend, Line } from 'recharts';

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
    marginBottom: '2rem',
    marginRight: '2rem',
    marginLeft: '2rem'
  },
  bodyFatArea: {
    marginBottom: '2rem',
    marginRight: '2rem'
  },
  alertContainer: {
    paddingBottom: '2rem'
  },
  submitButton: {
    marginBottom: '1rem'
  },
  sfSubmitArea: {
    marginTop: '2rem',
    marginBottom: '2rem'
  },
  sfWeightArea: {
    marginBottom: '1rem'
  },
  sfBodyFatArea: {
    marginBottom: '1rem'
  },
  title: {
    marginLeft: '1rem'
  },
  sfTitle: {
    marginLeft: '1rem'
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
        <Grid className={classes.alertContainer} container item>
          <Grid item>
            <FailedAlert 
              message="体組成を記録できませんでした"
            />
          </Grid>
        </Grid>
        :
        null
      }
      <Hidden xsDown>
        <Typography className={classes.title} variant="h4">体組成記録</Typography>
      </Hidden>
      <Hidden smUp>
        <Typography className={classes.sfTitle} variant="h6">体組成記録</Typography>
      </Hidden>
      <Grid className={classes.lineChartsContainer} container item>
        <Hidden mdDown>
          <LineChart
            width={1000}
            height={300}
            data={formatedBodyCompositions}
          >
            <XAxis dataKey="created_at" interval={2} />
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
        </Hidden>
        <Hidden lgUp xsDown>
          <LineChart
            width={700}
            height={300}
            data={formatedBodyCompositions}
          >
            <XAxis dataKey="created_at" interval={2} />
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
        </Hidden>
        <Hidden smUp>
          <LineChart
            width={350}
            height={300}
            data={formatedBodyCompositions}
          >
            <XAxis dataKey="created_at" interval={9} />
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
        </Hidden>
      </Grid>
      <Hidden xsDown>
        <Grid container item direction='row' justifyContent='flex-start' alignItems='center'>
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
            <Button 
              className={classes.submitButton}
              variant="outlined" 
              color='primary' 
              size="large" 
              onClick={hundleSubmit}
            >
              送信
            </Button>
          </Grid>
        </Grid>
      </Hidden>
      <Hidden smUp>
        <Grid className={classes.sfSubmitArea} container item direction='column' alignItems='center'>
          <Grid item className={classes.sfWeightArea}>
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
          <Grid item className={classes.sfBodyFatArea}>
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
            <Button 
              className={classes.sfSubmitButton}
              variant="contained" 
              color='primary' 
              size="large" 
              onClick={hundleSubmit}
            >
              送信
            </Button>
          </Grid>
        </Grid>
      </Hidden>
    </>
  );
}