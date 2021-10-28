import React, { Fragment, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Typography, Card, CardActions, CardActionArea, CardContent, CardMedia, Grid, Container, Button, Avatar, CardHeader, IconButton  } from '@material-ui/core';
import { ThumbUp } from '@material-ui/icons';
import Cookies from 'js-cookie';

// apis
import { fetchCurrentUser } from '../apis/users';

// styles
import { useStyles } from '../styles';

// images
import MainLogo from '../images/MainLogo.png';
import RecordImage from '../images/record.png';
import FourthWrapperLogo from '../images/whatIsPrisoner2.png';
import QuestionImage from '../images/questionCardImage.svg';
import ConfirmationImage from '../images/confirmCardImage.svg';

const trainingCards = [1, 2, 3, 4];

export const Index = () => {
  
  const classes = useStyles();
  const history = useHistory();

  const token = Cookies.get('access-token');
  const client = Cookies.get('client');
  const uid = Cookies.get('uid');

  const [currentUser, setCurrentUser] = useState([]);

  useEffect(() => {
    fetchCurrentUser(token, client, uid)
    .then((res) => {
      setCurrentUser(res.data.currentUser);
      console.log(res);
    })
    .catch((e) => {
      console.error(e);
    })
  }, []);

  const hundleClick = () => {
    if (currentUser.length === 0) {
      console.log("ログインしてません")
    } else {
      console.log("ログイン済みです");
    }
  }

  return(
    <Fragment>
      <Button 
        variant="contained" 
        color="secondary" 
        onClick={hundleClick} 
      >
        api test
      </Button>
      <div className={classes.topWrapper}>
        <Container>
          <Grid container spacing={1} direction="row" >
            <Grid container item sm={6} justifyContent="center">
              <Grid item>
                <Typography variant="h6" color="textPrimary">
                  プリズナートレーニングAppは、自分が行ったプリズナートレーニングを手軽に記録しておけるWebアプリです。
                </Typography>
                <Typography variant="h6" color="textPrimary" paragraph gutterBottom >
                  トレーニングの難易度が上がり、壁にぶつかったときはその乗り越え方を質問することもできます。プリズナートレーニー同士で助け合い、「真の強さ」を身につけましょう！
                </Typography>
              </Grid>
              <Grid item>
                <Button 
                  variant="contained" 
                  color="primary" 
                  size="large" 
                  onClick={() => history.push("/sign_up")}
                >
                  さっそく登録して使ってみる
                </Button>
              </Grid>
            </Grid>
            <Grid container item sm={6}>
              <Grid item>
                <img className={classes.mainLogoImage} src={MainLogo} alt="main logo" />
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </div>
      <div className={classes.secondWrapper}>
        <Container maxWidth="lg" className={classes.trainingLogContainer}>
          <Typography variant="h5" >
            することを選ぶ
          </Typography>
          <Grid container spacing={4} className={classes.trainingCardContainer}>
            <Grid item xs={12} md={4}>
              <Card className={classes.card}>
                <CardActionArea 
                  className={classes.cardActionArea} 
                  onClick={
                    currentUser.length !== 0 ?
                    () => history.push(`/users/${currentUser.id}/training_logs`)
                    :
                    () => history.push("/sign_in")
                  }
                >
                  <CardMedia 
                    component="img"
                    className={classes.cardMedia}
                    src={RecordImage}
                    title="record"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h5" className={classes.cardRecordTitle}>
                      記録する
                    </Typography>
                    <Typography variant="body1" component="p">
                      行ったトレーニングを記録します。過去のトレーニング内容を振り返ることもできます。
                    </Typography>
                    <Typography variant="subtitle2" color="textSecondary" >※ログインすると使える機能です</Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions className={classes.cardAction} >
                  <Button 
                    variant="contained" 
                    size="large" 
                    color="primary" 
                    className={classes.actionButton} 
                    onClick={
                      currentUser.length !== 0 ?
                      () => history.push(`/users/${currentUser.id}/training_logs`)
                      :
                      () => history.push("/sign_in")
                    }
                  >
                    記録する
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card className={classes.card}>
                <CardActionArea 
                  className={classes.cardActionArea} 
                  onClick={
                    currentUser.length !== 0 ?
                    () => history.push("/questions")
                    :
                    () => history.push("/sign_in")
                  }
                >
                  <CardMedia 
                    component="img"
                    className={classes.cardMedia}
                    src={QuestionImage}
                    title="record"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h5" className={classes.cardQuestionTitle}>
                      質問する
                    </Typography>
                    <Typography variant="body1" component="p">
                      トレーニングについて何か困ったことがあれば質問してアドバイスを求めることができます。
                    </Typography>
                    <Typography variant="subtitle2" color="textSecondary" >※ログインすると使える機能です</Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions className={classes.cardAction}>
                  <Button 
                    variant="contained" 
                    size="large" 
                    color="primary" 
                    className={classes.actionButton} 
                    onClick={
                      currentUser.length !== 0 ?
                      () => history.push("/questions")
                      :
                      () => history.push("/sign_in")
                    }
                  >
                    質問する
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card className={classes.card}>
                <CardActionArea 
                  className={classes.cardActionArea} 
                  onClick={
                    currentUser.length !== 0 ?
                    () => history.push(`/users/${currentUser.id}`)
                    :
                    () => history.push("/sign_in")
                  }
                >
                  <CardMedia 
                    component="img"
                    className={classes.cardMedia}
                    src={ConfirmationImage}
                    title="record"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h5" className={classes.cardConfirmationTitle}>
                      確認する
                    </Typography>
                    <Typography variant="body1" component="p">
                      マイページで自分のトレーニング記録やプロフィール、質問にアドバイスが来ていないかなどを確認してみましょう。
                    </Typography>
                    <Typography variant="subtitle2" color="textSecondary" >※ログインすると使える機能です</Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions className={classes.cardAction}>
                  <Button 
                    variant="contained" 
                    size="large" 
                    color="primary" 
                    className={classes.actionButton} 
                    onClick={
                      currentUser.length !== 0 ?
                      () => history.push(`/users/${currentUser.id}`)
                      :
                      () => history.push("/sign_in")
                    }
                  >
                    マイページへ
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </div>
      <div className={classes.thirdWrapper}>
        <Container maxWidth="lg">
          <Typography variant="h5" className={classes.thirdWrapperTitle} gutterBottom>
            みんなのトレーニング記録
          </Typography>
          <Grid container spacing={4} >
            {trainingCards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={3}>
                <Card className={classes.trainingCard}>
                  <CardHeader 
                    className={classes.cardHeader} 
                    avatar={<Avatar></Avatar>} 
                    title="ユーザー名" 
                    subheader="2021-7-21"
                  />
                  <CardContent>
                    <Typography variant="body1" >スクワット ステップ４ １０×２セット</Typography>
                    <Typography variant="body1" >プルアップ ステップ２ １５×１セット</Typography>
                  </CardContent>
                  <CardActions>
                    <IconButton>
                      <ThumbUp/>
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Button variant="text" className={classes.toTrainingLogButton}>トレーニング記録一覧はこちら</Button>
        </Container>
      </div>
      <div className={classes.fourthWrapper}>
        <Container className={classes.fourthContainer}>
          <Typography variant="h5">
            プリズナートレーニングとは？
          </Typography>
          <Grid container spacing={1} direction="row">
            <Grid container item sm={6}>
              <Grid item>
                <img className={classes.fourthWrapperLogo} src={FourthWrapperLogo} />
              </Grid>
            </Grid>
            <Grid container item sm={6} alignItems="center" >
              <Grid item >
                <Typography variant="h5" align="left" color="textPrimary" >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </div>
      <div className={classes.footer}>
        <Container className={classes.footerWrapper}>
          <Typography variant="h6" align="center" gutterBottom>
            Prisoner Training App
          </Typography>
          <Typography variant="subtitle1" align="center" color="textSecondary">
            ここにはフッターの説明文が入ります。
          </Typography>
        </Container>
      </div>
    </Fragment>
  )
}