import React, { Fragment, useEffect } from 'react';
import { Typography, Card, CardActions, CardActionArea, CardContent, CardMedia, Grid, Container, CssBaseline, Button  } from '@material-ui/core';
import styled from 'styled-components';

// apis
import { fetchHome } from '../apis/home';

// images
import MainLogo from '../images/MainLogo.png';
import CardItem1 from '../images/record.png';

// components
import { Header } from '../components/Header';

const TopWrapper = styled.div`
  margin-top: 5rem;
`;

const SecondWrapper = styled.div`
  margin-top: 4rem;
`;

const MainLogoImage = styled.img`
  width: 100%;
  heitht: 100%;
`;

export const Index = () => {
  
  useEffect(() => {
    fetchHome()
    .then((data) => 
      console.log(data)
    )
  },[])

  return(
    <Fragment>
      <Header />
      <TopWrapper>
        <Container>
          <Grid container spacing={1} direction="row" >
            <Grid container item sm={6} justifyContent="center">
              <Grid item>
                <Typography variant="h5" align="left" color="textPrimary" gutterBottom>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                </Typography>
              </Grid>
              <Grid item>
                <Button variant="contained" color="primary">
                  早速使ってみる
                </Button>
              </Grid>
            </Grid>
            <Grid container item sm={6}>
              <Grid item>
                <MainLogoImage src={MainLogo} alt="main logo" />
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </TopWrapper>
      <SecondWrapper>
        <Container maxWidth="lg" >
          <Typography variant="h5" >
            することを選ぶ
          </Typography>
          <Card>
            <CardActionArea>
              <CardMedia 
                src={CardItem1}
                title="record"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h5">
                  記録する
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  行ったトレーニングを記録します。過去のトレーニング内容を振り返ることもできます。
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
            </CardActions>
          </Card>
        </Container>
      </SecondWrapper>
    </Fragment>
  )
}