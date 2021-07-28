import React, { Fragment, useEffect } from 'react';
import { Typography, Card, CardActions, CardActionArea, CardContent, CardMedia, Grid, Container, CssBaseline, Button  } from '@material-ui/core';

// styles
import { useStyles } from '../styles';

// apis
import { fetchHome } from '../apis/home';

// images
import MainLogo from '../images/MainLogo.png';
import CardItem1 from '../images/record.png';

// components
import { Header } from '../components/Header';

const cards = [1, 2, 3];

export const Index = () => {
  
  const classes = useStyles();
  
  useEffect(() => {
    fetchHome()
    .then((data) => 
      console.log(data)
    )
  },[])

  return(
    <Fragment>
      <Header />
      <div className={classes.topWrapper}>
        <Container>
          <Grid container spacing={1} direction="row" >
            <Grid container item sm={6} justifyContent="center">
              <Grid item>
                <Typography variant="h5" align="left" color="textPrimary" gutterBottom>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                </Typography>
              </Grid>
              <Grid item>
                <Button variant="contained" color="primary" size="large">
                  さっそく使ってみる
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
        <Container maxWidth="lg" >
          <Typography variant="h5" >
            することを選ぶ
          </Typography>
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} md={4}>
                <Card className={classes.card}>
                  <CardActionArea className={classes.cardActionArea}>
                    <CardMedia 
                      component="img"
                      className={classes.cardMedia}
                      src={CardItem1}
                      title="record"
                    />
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="h5" component="h5" className={classes.contentTitle}>
                        記録する
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                        行ったトレーニングを記録します。過去のトレーニング内容を振り返ることもできます。
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions className={classes.cardAction}>
                    <Button variant="contained" size="large" color="primary" className={classes.actionButton}>
                      さっそく記録する
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </div>
    </Fragment>
  )
}