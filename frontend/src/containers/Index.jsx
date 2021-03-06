import React, { Fragment, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Typography,
  Card,
  CardActions,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Container,
  Button,
  Avatar,
  CardHeader,
  IconButton,
  ButtonBase,
} from "@material-ui/core";
import { ThumbUp, ThumbUpAltOutlined } from "@material-ui/icons";
import Cookies from "js-cookie";

// apis
import { fetchCurrentUser, fetchTrainingLogs, fetchLikes } from "../apis/users";
import { fetchHome } from "../apis/home";

// styles
import { useStyles } from "../styles";

// images
import MainLogo from "../images/MainLogo.png";
import RecordImage from "../images/record.png";
import FourthWrapperLogo from "../images/whatIsPrisoner2.png";
import QuestionImage from "../images/questionCardImage.svg";
import ConfirmationImage from "../images/confirmCardImage.svg";

export const Index = () => {
  const classes = useStyles();
  const history = useHistory();

  const token = Cookies.get("access-token");
  const client = Cookies.get("client");
  const uid = Cookies.get("uid");

  const [currentUser, setCurrentUser] = useState([]);
  const [usersArr, setUsersArr] = useState([]);
  const [trainingLogsArr, setTrainingLogsArr] = useState([]);
  const [currentUserLikesArr, setCurrentUserLikesArr] = useState([]);
  const [allTrainingLogsArr, setAllTrainingLogsArr] = useState([]);
  const [currentUserFollowingsArr, setCurrentUserFollowingsArr] = useState([]);
  const [allLikesArr, setAllLikesArr] = useState([]);
  const [followingUserTrainingLogsArr, setFollowingUserTrainingLogsArr] =
    useState([]);

  useEffect(() => {
    fetchCurrentUser(token, client, uid)
      .then((res) => {
        setCurrentUser(res.data.currentUser);
        setCurrentUserLikesArr(res.data.currentUserLikes);
        setCurrentUserFollowingsArr(res.data.currentUserFollowings);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  useEffect(() => {
    fetchHome()
      .then((res) => {
        setUsersArr(res.data.users);
        setTrainingLogsArr(res.data.trainingLogs);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  useEffect(() => {
    fetchTrainingLogs()
      .then((res) => {
        setAllTrainingLogsArr(res.data.trainingLogs);
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

  const showUserName = (userId) => {
    const user = usersArr.find((user) => user.id === userId);
    return user?.nickname;
  };

  const showUserImage = (userId) => {
    const user = usersArr.find((user) => user.id === userId);
    return user?.image.url;
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
            setCurrentUserLikesArr(res.data.currentUserLikes);
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
            setCurrentUserLikesArr(res.data.currentUserLikes);
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

  const fetchFollowingUserIds = () => {
    const followingUserIds = currentUserFollowingsArr.map((followingUser) => {
      return followingUser.id;
    });
    return followingUserIds;
  };

  const fetchFollowingUserTrainingLogs = () => {
    const followingUserIds = fetchFollowingUserIds();
    const result = allTrainingLogsArr.filter((trainingLog) => {
      return followingUserIds.includes(trainingLog.user_id);
    });
    return result;
  };

  return (
    <Fragment>
      <div className={classes.topWrapper}>
        <Container>
          <Grid container spacing={1} direction="row">
            <Grid container item sm={6} justifyContent="center">
              <Grid item>
                <Typography variant="h6" color="textPrimary">
                  ?????????????????????????????????App??????????????????????????????????????????????????????????????????????????????????????????Web??????????????????
                </Typography>
                <Typography
                  variant="h6"
                  color="textPrimary"
                  paragraph
                  gutterBottom
                >
                  ?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
                </Typography>
              </Grid>
              <Grid item>
                {currentUser.length !== 0 ? (
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={() =>
                      history.push(`/users/${currentUser.id}/training_logs`)
                    }
                  >
                    ?????????????????????????????????
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={() => history.push("/sign_up")}
                  >
                    ???????????????????????????????????????
                  </Button>
                )}
              </Grid>
            </Grid>
            <Grid container item sm={6}>
              <Grid item>
                <img
                  className={classes.mainLogoImage}
                  src={MainLogo}
                  alt="main logo"
                />
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </div>
      <div className={classes.secondWrapper}>
        <Container maxWidth="lg" className={classes.trainingLogContainer}>
          <Typography variant="h5">?????????????????????</Typography>
          <Grid container spacing={4} className={classes.trainingCardContainer}>
            <Grid item xs={12} md={4}>
              <Card className={classes.card}>
                <CardActionArea
                  className={classes.cardActionArea}
                  onClick={
                    currentUser.length !== 0
                      ? () =>
                          history.push(`/users/${currentUser.id}/training_logs`)
                      : () => history.push("/sign_in")
                  }
                >
                  <CardMedia
                    component="img"
                    className={classes.cardMedia}
                    src={RecordImage}
                    title="record"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h5"
                      className={classes.cardRecordTitle}
                    >
                      ????????????
                    </Typography>
                    <Typography variant="body1" component="p">
                      ????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
                    </Typography>
                    <Typography variant="subtitle2" color="textSecondary">
                      ?????????????????????????????????????????????
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions className={classes.cardAction}>
                  <Button
                    variant="contained"
                    size="large"
                    color="primary"
                    className={classes.actionButton}
                    onClick={
                      currentUser.length !== 0
                        ? () =>
                            history.push(
                              `/users/${currentUser.id}/training_logs`
                            )
                        : () => history.push("/sign_in")
                    }
                  >
                    ????????????????????????????????????
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card className={classes.card}>
                <CardActionArea
                  className={classes.cardActionArea}
                  onClick={
                    currentUser.length !== 0
                      ? () => history.push("/questions")
                      : () => history.push("/sign_in")
                  }
                >
                  <CardMedia
                    component="img"
                    className={classes.cardMedia}
                    src={QuestionImage}
                    title="record"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h5"
                      className={classes.cardQuestionTitle}
                    >
                      ?????? / ?????????????????????
                    </Typography>
                    <Typography variant="body1" component="p">
                      ??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
                    </Typography>
                    <Typography variant="subtitle2" color="textSecondary">
                      ?????????????????????????????????????????????
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions className={classes.cardAction}>
                  <Button
                    variant="contained"
                    size="large"
                    color="primary"
                    className={classes.actionButton}
                    onClick={
                      currentUser.length !== 0
                        ? () => history.push("/questions")
                        : () => history.push("/sign_in")
                    }
                  >
                    ????????????????????????????????????
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card className={classes.card}>
                <CardActionArea
                  className={classes.cardActionArea}
                  onClick={
                    currentUser.length !== 0
                      ? () => history.push(`/users/${currentUser.id}`)
                      : () => history.push("/sign_in")
                  }
                >
                  <CardMedia
                    component="img"
                    className={classes.cardMedia}
                    src={ConfirmationImage}
                    title="record"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h5"
                      className={classes.cardConfirmationTitle}
                    >
                      ????????????
                    </Typography>
                    <Typography variant="body1" component="p">
                      ???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
                    </Typography>
                    <Typography variant="body1" component="p">
                      ??????????????????????????????????????????????????????
                    </Typography>
                    <Typography variant="subtitle2" color="textSecondary">
                      ?????????????????????????????????????????????
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions className={classes.cardAction}>
                  <Button
                    variant="contained"
                    size="large"
                    color="primary"
                    className={classes.actionButton}
                    onClick={
                      currentUser.length !== 0
                        ? () => history.push(`/users/${currentUser.id}`)
                        : () => history.push("/sign_in")
                    }
                  >
                    ??????????????????
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </div>
      <div className={classes.thirdWrapper}>
        <Container maxWidth="lg">
          {currentUser.length !== 0 && currentUserFollowingsArr.length !== 0 ? (
            <Typography
              variant="h5"
              className={classes.thirdWrapperTitle}
              gutterBottom
            >
              ?????????????????????????????????????????????????????????????????????
            </Typography>
          ) : (
            <Typography
              variant="h5"
              className={classes.thirdWrapperTitle}
              gutterBottom
            >
              ??????????????????????????????????????????
            </Typography>
          )}
          {currentUser.length !== 0 && currentUserFollowingsArr.length !== 0 ? (
            <Grid container spacing={4}>
              {fetchFollowingUserTrainingLogs().map((trainingLog, index) => {
                if (index < 4) {
                  return (
                    <Grid item md={3} sm={6} xs={12} key={index}>
                      <Card>
                        <CardHeader
                          avatar={
                            <ButtonBase
                              onClick={() =>
                                history.push(`/users/${trainingLog.user_id}`)
                              }
                            >
                              <Avatar
                                variant="rounded"
                                className={classes.trainingCard}
                                src={showUserImage(trainingLog.user_id)}
                              />
                            </ButtonBase>
                          }
                          title={
                            <Typography variant="h5">
                              {`${showUserName(trainingLog.user_id)}`}
                            </Typography>
                          }
                        />
                        <CardContent>
                          <Typography variant="subtitle2" color="textSecondary">
                            ??????????????????????????????
                          </Typography>
                          <Typography
                            variant="body1"
                            gutterBottom
                          >{`${trainingLog.training_menu}`}</Typography>
                          <Typography variant="subtitle2" color="textSecondary">
                            ????????????
                          </Typography>
                          <Typography
                            variant="body1"
                            gutterBottom
                          >{`${trainingLog.step}`}</Typography>
                          <Typography variant="subtitle2" color="textSecondary">
                            ??????
                          </Typography>
                          <Typography variant="body1">{`${trainingLog.repetition}???`}</Typography>
                        </CardContent>
                        <CardActions>
                          {currentUserLikesArr.find(
                            (like) => like.training_log_id === trainingLog.id
                          ) ? (
                            <Fragment>
                              <IconButton
                                className={classes.deleteLikeButton}
                                onClick={() =>
                                  deleteLikekAction(trainingLog.id)
                                }
                              >
                                <ThumbUp />
                              </IconButton>
                              <Typography>{`${numberOfLikes(
                                trainingLog.id
                              )}`}</Typography>
                            </Fragment>
                          ) : (
                            <Fragment>
                              <IconButton
                                className={classes.createLikeButton}
                                onClick={() => createLikeAction(trainingLog.id)}
                              >
                                <ThumbUpAltOutlined />
                              </IconButton>
                              <Typography>{`${numberOfLikes(
                                trainingLog.id
                              )}`}</Typography>
                            </Fragment>
                          )}
                        </CardActions>
                      </Card>
                    </Grid>
                  );
                }
              })}
            </Grid>
          ) : (
            <Grid container spacing={4}>
              {trainingLogsArr.map((data, index) => {
                return (
                  <Grid item md={3} sm={6} xs={12} key={index}>
                    <Card>
                      <CardHeader
                        avatar={
                          <ButtonBase
                            onClick={() =>
                              history.push(`users/${data.user_id}`)
                            }
                          >
                            <Avatar
                              variant="rounded"
                              src={showUserImage(data.user_id)}
                            />
                          </ButtonBase>
                        }
                        title={
                          <Typography variant="h5">{`${showUserName(
                            data.user_id
                          )}`}</Typography>
                        }
                      />
                      <CardContent>
                        <Typography variant="subtitle2" color="textSecondary">
                          ??????????????????????????????
                        </Typography>
                        <Typography
                          variant="body1"
                          gutterBottom
                        >{`${data.training_menu}`}</Typography>
                        <Typography variant="subtitle2" color="textSecondary">
                          ????????????
                        </Typography>
                        <Typography
                          variant="body1"
                          gutterBottom
                        >{`${data.step}`}</Typography>
                        <Typography variant="subtitle2" color="textSecondary">
                          ??????
                        </Typography>
                        <Typography variant="body1">{`${data.repetition}???`}</Typography>
                      </CardContent>
                      <CardContent>
                        <Typography color="textSecondary">{`${numberOfLikes(
                          data.id
                        )}???????????????`}</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          )}
          <Button
            variant="text"
            className={classes.toTrainingLogButton}
            onClick={() => history.push("/training_logs")}
          >
            ??????????????????????????????????????????
          </Button>
        </Container>
      </div>
      <div className={classes.fourthWrapper}>
        <Container className={classes.fourthContainer}>
          <Typography variant="h5">??????????????????????????????????????????</Typography>
          <Grid container spacing={1} direction="row">
            <Grid container item sm={6}>
              <Grid item>
                <img
                  className={classes.fourthWrapperLogo}
                  src={FourthWrapperLogo}
                />
              </Grid>
            </Grid>
            <Grid container item sm={6} alignItems="center">
              <Grid item>
                <Typography
                  variant="h6"
                  align="left"
                  color="textPrimary"
                  paragraph
                >
                  ?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
                </Typography>
                <Typography
                  variant="h6"
                  align="left"
                  color="textPrimary"
                  paragraph
                >
                  ????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </div>
      <div className={classes.footer}>
        <Container className={classes.footerWrapper}>
          <Typography variant="h6" gutterBottom>
            &copy; 2021 Prisoner Training App
          </Typography>
          <ButtonBase
            className={classes.contactPageButton}
            onClick={() => history.push("/contact")}
          >
            <Typography variant="subtitle1" color="textSecondary">
              ??????????????????????????????
            </Typography>
          </ButtonBase>
        </Container>
      </div>
    </Fragment>
  );
};
