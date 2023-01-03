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
import {
  fetchCurrentUser,
  fetchTrainingLogs,
  fetchLikes,
  fetchCurrentUserFollowings,
  fetchCurrentUserLikes,
} from "../apis/users";
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
  const [allTrainingLogsArr, setAllTrainingLogsArr] = useState([]);
  const [allLikesArr, setAllLikesArr] = useState([]);
  const [currentUserFollowings, setCurrentUserFollowings] = useState([]);
  const [currentUserLikes, setCurrentUserLikes] = useState([]);

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

  useEffect(() => {
    fetchCurrentUserFollowings(token, client, uid)
      .then((res) => {
        setCurrentUserFollowings(res.data.currentUserFollowings);
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
        fetchCurrentUserLikes(token, client, uid)
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
        fetchCurrentUserLikes(token, client, uid)
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

  const fetchFollowingUserIds = () => {
    const followingUserIds = currentUserFollowings.map((followingUser) => {
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
                  プリズナートレーニングAppは、自分が行ったプリズナートレーニングを手軽に記録しておけるWebアプリです。
                </Typography>
                <Typography
                  variant="h6"
                  color="textPrimary"
                  paragraph
                  gutterBottom
                >
                  トレーニングの難易度が上がり、壁にぶつかったときはその乗り越え方を質問することもできます。プリズナートレーニー同士で助け合い、「真の強さ」を身につけましょう！
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
                    トレーニングを記録する
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={() => history.push("/sign_up")}
                  >
                    さっそく登録して使ってみる
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
          <Typography variant="h5">することを選ぶ</Typography>
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
                      記録する
                    </Typography>
                    <Typography variant="body1" component="p">
                      行ったトレーニングを記録します。過去のトレーニング内容を振り返ることもできます。
                    </Typography>
                    <Typography variant="subtitle2" color="textSecondary">
                      ※ログインすると使える機能です
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
                    トレーニング記録ページへ
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
                      質問 / アドバイスする
                    </Typography>
                    <Typography variant="body1" component="p">
                      トレーニングについて何か困ったことがあれば質問してアドバイスを求めることができます。
                    </Typography>
                    <Typography variant="subtitle2" color="textSecondary">
                      ※ログインすると使える機能です
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
                    質問・アドバイスページへ
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
                      確認する
                    </Typography>
                    <Typography variant="body1" component="p">
                      マイページで自分のトレーニング記録やプロフィール、質問にアドバイスが来ていないかなどを確認してみましょう。
                    </Typography>
                    <Typography variant="body1" component="p">
                      登録情報の変更もこちらから行えます。
                    </Typography>
                    <Typography variant="subtitle2" color="textSecondary">
                      ※ログインすると使える機能です
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
          {currentUser.length !== 0 && currentUserFollowings.length !== 0 ? (
            <Typography
              variant="h5"
              className={classes.thirdWrapperTitle}
              gutterBottom
            >
              フォローしているユーザーの最新トレーニング記録
            </Typography>
          ) : (
            <Typography
              variant="h5"
              className={classes.thirdWrapperTitle}
              gutterBottom
            >
              みんなの最新トレーニング記録
            </Typography>
          )}
          {currentUser.length !== 0 && currentUserFollowings.length !== 0 ? (
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
                            トレーニングメニュー
                          </Typography>
                          <Typography
                            variant="body1"
                            gutterBottom
                          >{`${trainingLog.training_menu}`}</Typography>
                          <Typography variant="subtitle2" color="textSecondary">
                            ステップ
                          </Typography>
                          <Typography
                            variant="body1"
                            gutterBottom
                          >{`${trainingLog.step}`}</Typography>
                          <Typography variant="subtitle2" color="textSecondary">
                            回数
                          </Typography>
                          <Typography variant="body1">{`${trainingLog.repetition}回`}</Typography>
                        </CardContent>
                        <CardActions>
                          {currentUserLikes.find(
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
                          トレーニングメニュー
                        </Typography>
                        <Typography
                          variant="body1"
                          gutterBottom
                        >{`${data.training_menu}`}</Typography>
                        <Typography variant="subtitle2" color="textSecondary">
                          ステップ
                        </Typography>
                        <Typography
                          variant="body1"
                          gutterBottom
                        >{`${data.step}`}</Typography>
                        <Typography variant="subtitle2" color="textSecondary">
                          回数
                        </Typography>
                        <Typography variant="body1">{`${data.repetition}回`}</Typography>
                      </CardContent>
                      <CardContent>
                        <Typography color="textSecondary">{`${numberOfLikes(
                          data.id
                        )}件のいいね`}</Typography>
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
            トレーニング記録一覧はこちら
          </Button>
        </Container>
      </div>
      <div className={classes.fourthWrapper}>
        <Container className={classes.fourthContainer}>
          <Typography variant="h5">プリズナートレーニングとは？</Typography>
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
                  アメリカの元囚人にして、キャリステニクス（自分の体重を使い、体を極限まで開発する技術）の第一人者であるポール・ウェイドが彼の書籍、コンビクト・コンディショニング（邦題はプリズナートレーニング）で紹介している、見せかけの筋肉ではない、本物の強さを手に入れるためのトレーニングがプリズナートレーニングです。
                </Typography>
                <Typography
                  variant="h6"
                  align="left"
                  color="textPrimary"
                  paragraph
                >
                  フィットネス産業の発展に伴いキャリステニクスは死に瀕していましたが、生き延びるために極限の強さとパワーが必要になるアメリカの監獄で秘密裏に伝承されていたことから、コンビクト・コンディショニング（囚人のコンディショニング）という題名がつけられました。
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
              お問い合わせはこちら
            </Typography>
          </ButtonBase>
        </Container>
      </div>
    </Fragment>
  );
};
