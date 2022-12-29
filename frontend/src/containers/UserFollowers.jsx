import React, { Fragment, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Avatar,
  ButtonBase,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Hidden,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

// apis
import { fetchUserFollowers } from "../apis/users";

const useStyles = makeStyles(() => ({
  pageTitle: {
    marginBottom: "2rem",
    marginLeft: "1rem",
  },
  followerUserCard: {
    marginBottom: "2rem",
  },
  cardWrapper: {
    paddingLeft: "2rem",
    paddingRight: "2rem",
  },
  userImage: {
    height: "80px",
    width: "80px",
  },
}));

export const UserFollowers = ({ match }) => {
  const history = useHistory();
  const classes = useStyles();

  const [userFollowers, setUserFollowers] = useState([]);

  useEffect(() => {
    fetchUserFollowers(match.params.userId)
      .then((res) => {
        setUserFollowers(res.data.userFollowers);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  return (
    <Fragment>
      <Grid container item direction="column">
        <Hidden only="xs">
          <Typography className={classes.pageTitle} variant="h4">
            フォローされているユーザー
          </Typography>
        </Hidden>
        <Hidden smUp>
          <Typography className={classes.pageTitle} variant="h6">
            フォローされているユーザー
          </Typography>
        </Hidden>
        <Grid className={classes.cardWrapper} item>
          {userFollowers.length !== 0 ? (
            userFollowers.map((followerUser, index) => {
              return (
                <Card className={classes.followerUserCard} key={index}>
                  <CardHeader
                    avatar={
                      <ButtonBase
                        onClick={() =>
                          history.push(`/users/${followerUser.id}`)
                        }
                      >
                        <Avatar
                          className={classes.userImage}
                          alt={`${followerUser.nickname}`}
                          src={followerUser.image.url}
                          variant="rounded"
                        />
                      </ButtonBase>
                    }
                    title={
                      <Typography>{`${followerUser.nickname}`}</Typography>
                    }
                  />
                  <CardContent>
                    {followerUser.introduction ? (
                      <Typography>{`${followerUser.introduction}`}</Typography>
                    ) : (
                      <Typography color="textSecondary" variant="subtitle1">
                        {`${followerUser.nickname}さんの自己紹介はまだありません`}
                      </Typography>
                    )}
                  </CardContent>
                  <CardActions></CardActions>
                </Card>
              );
            })
          ) : (
            <Typography>フォロワーはまだいません</Typography>
          )}
        </Grid>
      </Grid>
    </Fragment>
  );
};
