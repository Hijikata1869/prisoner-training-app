import React, { Fragment } from 'react';
import { Container, Grid, Typography } from '@material-ui/core';

// components
import { UserMenu } from '../components/UserMenu';

export const TrainingLogs = () => {
  return(
    <Fragment>
      <div>
        <Container>
          <Grid container spacing={4} >
            <UserMenu />
            <Grid container item md={9} sm={9} >
              <Grid item>
                <Typography variant="h3" gutterBottom >
                  トレーニングを記録する
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </div>
    </Fragment>
  )
}