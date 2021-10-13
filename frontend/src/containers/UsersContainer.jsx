import React, { Fragment } from 'react';
import { Container, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// components
import { UserMenu } from '../components/UserMenu';

const useStyles = makeStyles(() => ({
  PageWrapper: {
    paddingTop: "2rem",
  }
}));

export const UsersContainer = ({ match, mainComponent }) => {

  const classes = useStyles();

  return(
    <Fragment>
      <div>
        <Container className={classes.PageWrapper}>
          <Grid container spacing={4} >
            <UserMenu />
            <Grid container item md={9} sm={9} >
              {/* このコンテナの中にコンポーネントとしてそれぞれのページを追加する */}
              {mainComponent}
            </Grid>
          </Grid>
        </Container>
      </div>
    </Fragment>
  )
}