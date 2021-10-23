import React, { Fragment, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Avatar, ButtonBase, Card, CardContent, CardHeader, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import Cookies from 'js-cookie';


// apis
import { fetchAdvices, fetchUsers, fetchUser } from '../apis/users';

const useStyles = makeStyles(() => ({
  pageTitle: {
  },
  adviceCardWrapper: {
    margin: "2rem"
  },
  adviceCard: {
    marginBottom: "2rem",
    padding: "1rem"
  },
  userImage: {
    height: "60px",
    width: "60px"
  }
}));


export const UserBookmarks = ({ match }) => {

  const history = useHistory();
  const classes = useStyles();

  const token = Cookies.get('access-token');
  const client = Cookies.get('client');
  const uid = Cookies.get('uid');

  const [usersArr, setUsersArr] = useState([]);
  const [bookmarkedAdvicesArr, setBookmaredkAdvicesArr] = useState([]);

  useEffect(() => {
    fetchUsers()
    .then((res) => {
      setUsersArr(res.data.users);
    })
    .catch((e) => {
      console.error(e);
    })
  }, [])

  useEffect(() => {
    fetchUser(match.params.userId, token, client, uid)
    .then((res) => {
      setBookmaredkAdvicesArr(res.data.bookmarkedAdvices);
    })
    .catch((e) => {
      console.error(e);
    })
  }, [])

  const showUserName = (userId) => {
    const user = usersArr.find((user) => user.id === userId);
    return user?.nickname;
  }

  const showUserImage = (userId) => {
    const user = usersArr.find((user) => user.id === userId);
    return user?.image.url;
  }

  return(
    <Fragment>
      <Grid container item direction="column" >
        <Typography className={classes.pageTitle} variant="h4">
          {`${showUserName(Number(match.params.userId))}のブックマークしたアドバイス`}
        </Typography>
        <Grid className={classes.adviceCardWrapper} item>
          {
            bookmarkedAdvicesArr.map((adviceData, index) => {
              return(
                <Card className={classes.adviceCard} key={index}>
                  <CardHeader 
                    avatar={
                      <ButtonBase 
                        onClick={() => history.push(`/users/${adviceData.user_id}`)}
                      >
                        <Avatar 
                          className={classes.userImage}
                          alt={showUserName(adviceData.user_id)}
                          src={showUserImage(adviceData.user_id)} 
                          variant="rounded"
                        />
                      </ButtonBase>
                    }
                    title={
                      <Typography variant="h5" >{`${showUserName(adviceData.user_id)}さんのアドバイス`}</Typography>
                    }
                    subheader={`投稿日：${moment(adviceData.created_at).format('YYYY-MM-DD')}`}
                  />
                  <CardContent>
                    <Typography>{`${adviceData.advice}`}</Typography>
                  </CardContent>
                </Card>
              )
            })
          }
        </Grid>
      </Grid>
    </Fragment>
  );
}