import React, { Fragment, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Avatar, Button, ButtonBase, Card, CardActions, CardContent, CardHeader, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Cookies from 'js-cookie';

// apis
import { fetchUser } from '../apis/users';

const useStyles = makeStyles(() => ({
  pageTitle: {
    marginBottom: "2rem",
    marginLeft: "1rem"
  },
  followingUserCard: {
    marginBottom: "2rem"
  },
  cardWrapper: {
    paddingLeft: "2rem",
    paddingRight: "2rem"
  },
  userImage: {
    height: "80px",
    width: "80px"
  }
}));

export const UserFollowings = ({ match }) => {

  const history = useHistory();
  const classes = useStyles();

  const token = Cookies.get('access-token');
  const client = Cookies.get('client');
  const uid = Cookies.get('uid');

  const [followingUsersArr, setFollowingUsersArr] = useState([]);

  useEffect(() => {
    fetchUser(match.params.userId)
    .then((res) => {
      setFollowingUsersArr(res.data.userFollowings);
      console.log(res);
    })
    .catch((e) => {
      console.error(e);
    })
  }, [])

  return(
    <Fragment>
      {/* <Button variant="contained" onClick={() => console.log(followingUsersArr)}>api</Button> */}
      <Grid container item direction="column">
        <Typography className={classes.pageTitle} variant="h4">フォロー中のユーザー</Typography>
        <Grid className={classes.cardWrapper} item>
          {
            followingUsersArr.length !== 0 ?
              followingUsersArr.map((followingUser, index) => {
                return(
                  <Card className={classes.followingUserCard} key={index}>
                    <CardHeader 
                      avatar={
                        <ButtonBase 
                          onClick={() => history.push(`/users/${followingUser.id}`)}
                        >
                          <Avatar 
                            className={classes.userImage}
                            alt={`${followingUser.nickname}`}
                            src={followingUser.image.url} 
                            variant="rounded"
                          />
                        </ButtonBase>
                      }
                      title={
                        <Typography>{`${followingUser.nickname}`}</Typography>
                      }
                    />
                    <CardContent>
                      {
                        followingUser.introduction ?
                        <Typography>{`${followingUser.introduction}`}</Typography>
                        :
                        <Typography 
                          color="textSecondary" 
                          variant="subtitle2"
                        >
                          {`${followingUser.nickname}さんの自己紹介はまだありません`}
                        </Typography>
                      }
                    </CardContent>
                    <CardActions></CardActions>
                  </Card>
                );
              })
              :
              <Typography>フォロー中のユーザーはいません</Typography>
          }
        </Grid>
      </Grid>
    </Fragment>
  );
}