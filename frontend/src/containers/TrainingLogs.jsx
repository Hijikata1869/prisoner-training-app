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
  IconButton,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Cookies from "js-cookie";
import { Helmet, HelmetProvider } from "react-helmet-async";

// icons
import { ThumbUp, ThumbUpAltOutlined } from "@material-ui/icons";

// apis
import {
  fetchTrainingLogs,
  fetchUsers,
  fetchCurrentUser,
  fetchLikes,
  fetchCurrentUserLikes,
} from "../apis/users";

const useStyles = makeStyles(() => ({
  pageWrapper: {
    padding: "1.5rem",
  },
  userAvatar: {
    height: "60px",
    width: "60px",
  },
  trainingCard: {
    padding: "0.5rem",
  },
  trainingCardWrapper: {
    paddingRight: "1rem",
    paddingLeft: "1rem",
    marginTop: "1rem",
  },
}));

export const TrainingLogs = () => {
  const classes = useStyles();
  const history = useHistory();

  const token = Cookies.get("access-token");
  const client = Cookies.get("client");
  const uid = Cookies.get("uid");

  const [trainingLogsArr, setTrainingLogsArr] = useState([]);
  const [usersArr, setUsersArr] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);
  const [allLikesArr, setAllLikesArr] = useState([]);
  const [currentUserLikes, setCurrentUserLikes] = useState([]);

  useEffect(() => {
    fetchTrainingLogs()
      .then((res) => {
        setTrainingLogsArr(res.data.trainingLogs);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  useEffect(() => {
    fetchUsers()
      .then((res) => {
        setUsersArr(res.data.users);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  useEffect(() => {
    fetchCurrentUser(token, client, uid)
      .then((res) => {
        setCurrentUser(res.data.currentUser);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  useEffect(() => {
    fetchLikes()
      .then((res) => {
        setAllLikesArr(res.data.likes);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  useEffect(() => {
    fetchCurrentUserLikes(token, client, uid)
      .then((res) => {
        setCurrentUserLikes(res.data.currentUserLikes);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  const showUserImage = (userId) => {
    const targetUser = usersArr.find((user) => user.id == userId);
    return targetUser?.image.url;
  };

  const showUserName = (userId) => {
    const targetUser = usersArr.find((user) => user.id == userId);
    return targetUser?.nickname;
  };

  const createLikeAction = (trainingLogId) => {
    fetch(
      `${process.env.REACT_APP_SERVER_URL}/training_logs/${trainingLogId}/likes`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "access-token": token,
          client: client,
          uid: uid,
        },
      }
    )
      .then(() => {
        fetchCurrentUser(token, client, uid)
          .then((res) => {
            setCurrentUserLikes(res.data.currentUserLikes);
          })
          .catch((e) => {
            console.error(e);
          });
      })
      .then(() => {
        fetchLikes()
          .then((res) => {
            setAllLikesArr(res.data.likes);
          })
          .catch((e) => {
            console.error(e);
          });
      })
      .catch((e) => console.error(e));
  };

  const deleteLikekAction = (trainingLogId) => {
    fetch(
      `${process.env.REACT_APP_SERVER_URL}/training_logs/${trainingLogId}/likes`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "access-token": token,
          client: client,
          uid: uid,
        },
      }
    )
      .then(() => {
        fetchCurrentUser(token, client, uid)
          .then((res) => {
            setCurrentUserLikes(res.data.currentUserLikes);
          })
          .catch((e) => {
            console.error(e);
          });
      })
      .then(() => {
        fetchLikes()
          .then((res) => {
            setAllLikesArr(res.data.likes);
          })
          .catch((e) => {
            console.error(e);
          });
      })
      .catch((e) => console.error(e));
  };

  const numberOfLikes = (trainingLogId) => {
    const targetLikes = allLikesArr.filter(
      (like) => like.training_log_id == trainingLogId
    );
    return targetLikes?.length;
  };

  return (
    <Fragment>
      <HelmetProvider>
        <Helmet>
          <title>トレーニング記録一覧</title>
        </Helmet>
      </HelmetProvider>
      <Grid className={classes.pageWrapper} container direction="column">
        <Hidden only="xs">
          <Typography variant="h4">トレーニング記録一覧</Typography>
        </Hidden>
        <Hidden smUp>
          <Typography variant="h5">トレーニング記録一覧</Typography>
        </Hidden>
        <Grid
          className={classes.trainingCardWrapper}
          container
          item
          spacing={4}
        >
          {trainingLogsArr.map((trainingData, index) => {
            return (
              <Grid key={index} item md={3} sm={6} xs={12}>
                <Card className={classes.trainingCard}>
                  <CardHeader
                    avatar={
                      <ButtonBase
                        onClick={() =>
                          history.push(`/users/${trainingData.user_id}`)
                        }
                      >
                        <Avatar
                          className={classes.userAvatar}
                          variant="rounded"
                          src={showUserImage(trainingData.user_id)}
                        />
                      </ButtonBase>
                    }
                    title={
                      <Typography variant="h5">{`${showUserName(
                        trainingData.user_id
                      )}`}</Typography>
                    }
                  />
                  <CardContent>
                    <Typography variant="subtitle2" color="textSecondary">
                      トレーニングメニュー
                    </Typography>
                    <Typography
                      variant="body1"
                      gutterBottom
                    >{`${trainingData.training_menu}`}</Typography>
                    <Typography variant="subtitle2" color="textSecondary">
                      ステップ
                    </Typography>
                    <Typography
                      variant="body1"
                      gutterBottom
                    >{`${trainingData.step}`}</Typography>
                    <Typography variant="subtitle2" color="textSecondary">
                      回数
                    </Typography>
                    <Typography variant="body1">{`${trainingData.repetition}回`}</Typography>
                  </CardContent>
                  <CardActions>
                    {currentUser.length !== 0 ? (
                      <Fragment>
                        {currentUserLikes.find(
                          (like) => like.training_log_id == trainingData.id
                        ) ? (
                          <Fragment>
                            <IconButton
                              className={classes.deleteLikeButton}
                              onClick={() => deleteLikekAction(trainingData.id)}
                            >
                              <ThumbUp />
                            </IconButton>
                            <Typography>{`${numberOfLikes(
                              trainingData.id
                            )}`}</Typography>
                          </Fragment>
                        ) : (
                          <Fragment>
                            <IconButton
                              className={classes.createLikeButton}
                              onClick={() => createLikeAction(trainingData.id)}
                            >
                              <ThumbUpAltOutlined />
                            </IconButton>
                            <Typography>{`${numberOfLikes(
                              trainingData.id
                            )}`}</Typography>
                          </Fragment>
                        )}
                      </Fragment>
                    ) : (
                      <Typography color="textSecondary">
                        {`${numberOfLikes(trainingData.id)}件のいいね`}
                      </Typography>
                    )}
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </Fragment>
  );
};
