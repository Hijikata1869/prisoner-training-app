import React, { Fragment, memo, useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Hidden,
  Card,
  CardContent,
  CardActions,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Cookies from "js-cookie";
import moment from "moment";
import { Helmet, HelmetProvider } from "react-helmet-async";

// icons
import { ThumbUp } from "@material-ui/icons";

// apis
import {
  postTraining,
  fetchCurrentUser,
  fetchUser,
  deleteTrainingLog,
  fetchUserTrainingLogs,
  fetchUserRecentTrainingLogs,
  fetchNumberOfLikes,
} from "../apis/users";

// components
import { ReloadButton } from "../components/ReloadButton";
import { FailedAlert } from "../components/FailedAlert";
import { DeleteDialog } from "../components/DeleteDialog";
import { SuccessAlert } from "../components/SuccessAlert";
import { SuccessModalWithSnsShareButton } from "../components/SuccessModalWithSnsShareButton";

// images
import OgpImage from "../images/ogp.svg";

const useStyles = makeStyles(() => ({
  pageWrapper: {
    paddingRight: "2rem",
    paddingLeft: "2rem",
  },
  trainingLogTitle: {
    marginTop: "4rem",
  },
  trainingLogWrapper: {
    marginTop: "0.25rem",
    marginBottom: "3rem",
  },
  trainingLogCard: {},
  cardActionArea: {
    display: "flex",
    justifyContent: "flex-start",
  },
  likesNumber: {
    marginRight: "auto",
  },
  deleteButton: {
    marginRight: "1rem",
  },
  likeIcon: {
    marginLeft: "0.5rem",
  },
  notPresentText: {
    marginTop: "1rem",
  },
}));

const repsPrepare = () => {
  const reps = [];
  for (let i = 1; i < 51; i++) {
    reps.push(`${i}`);
  }
  return reps;
};

// eslint-disable-next-line react/display-name
export const UserTrainingLog = memo(({ match }) => {
  const classes = useStyles();
  const trainingLepsArray = repsPrepare();

  const token = Cookies.get("access-token");
  const client = Cookies.get("client");
  const uid = Cookies.get("uid");

  const [currentUser, setCurrentUser] = useState([]);
  const [trainingMenu, setTrainingMenu] = useState("");
  const [step, setStep] = useState("");
  const [rep, setRep] = useState("");
  const [set, setSet] = useState("");
  const [note, setNote] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [user, setUser] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [successAlertOpen, setSuccessAlertOpen] = useState(false);
  const [targetTrainingLogId, setTargetTrainingLogId] = useState();
  const [userTrainingLogs, setUserTrainingLogs] = useState([]);
  const [recentPushUp, setRecentPushUp] = useState([]);
  const [recentSquat, setRecentSquat] = useState([]);
  const [recentPullUp, setRecentPullUp] = useState([]);
  const [recentLegRaise, setRecentLegRaise] = useState([]);
  const [recentBridge, setRecentBridge] = useState([]);
  const [recentHandstandPushUp, setRecentHandstandPushUp] = useState([]);
  const [pushUpLikes, setPushUpLikes] = useState(0);
  const [squatLikes, setSquatLikes] = useState(0);
  const [pullUpLikes, setPullUpLikes] = useState(0);
  const [legRaiseLikes, setLegRaiseLikes] = useState(0);
  const [bridgeLikes, setBridgeLikes] = useState(0);
  const [handstandPushUpLikes, setHandstandPushUpLikes] = useState(0);

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
    fetchUser(match.params.userId, token, client, uid)
      .then((res) => {
        setUser(res.data.user);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  useEffect(() => {
    fetchUserTrainingLogs(match.params.userId)
      .then((res) => {
        setUserTrainingLogs(res.data.userTrainingLogs);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  useEffect(() => {
    const fetchRecentPushUpData = async () => {
      const recentPushUpId = await fetchUserRecentTrainingLogs(
        match.params.userId
      )
        .then((res) => {
          setRecentPushUp(res.data.recentPushUp);
          return res.data.recentPushUp.id;
        })
        .catch((e) => {
          console.error(e);
        });

      const recentPushUpLikes = await fetchNumberOfLikes(recentPushUpId)
        .then((res) => {
          return res.data.numberOfLikes;
        })
        .catch((e) => {
          console.error(e);
        });
      setPushUpLikes(recentPushUpLikes);
    };
    fetchRecentPushUpData();
  }, []);

  useEffect(() => {
    const fetchRecentSquatData = async () => {
      const recentSquatId = await fetchUserRecentTrainingLogs(
        match.params.userId
      )
        .then((res) => {
          setRecentSquat(res.data.recentSquat);
          return res.data.recentSquat.id;
        })
        .catch((e) => {
          console.error(e);
        });

      const recentSquatLikes = await fetchNumberOfLikes(recentSquatId)
        .then((res) => {
          return res.data.numberOfLikes;
        })
        .catch((e) => {
          console.error(e);
        });
      setSquatLikes(recentSquatLikes);
    };
    fetchRecentSquatData();
  }, []);

  useEffect(() => {
    const fetchRecentPullUpData = async () => {
      const recentPullUpId = await fetchUserRecentTrainingLogs(
        match.params.userId
      )
        .then((res) => {
          setRecentPullUp(res.data.recentPullUp);
          return res.data.recentPullUp.id;
        })
        .catch((e) => {
          console.error(e);
        });

      const recentPullUpLikes = await fetchNumberOfLikes(recentPullUpId)
        .then((res) => {
          return res.data.numberOfLikes;
        })
        .catch((e) => {
          console.error(e);
        });
      setPullUpLikes(recentPullUpLikes);
    };
    fetchRecentPullUpData();
  }, []);

  useEffect(() => {
    const fetchRecentLegRaiseData = async () => {
      const recentLegRaiseId = await fetchUserRecentTrainingLogs(
        match.params.userId
      )
        .then((res) => {
          setRecentLegRaise(res.data.recentLegRaise);
          return res.data.recentLegRaise.id;
        })
        .catch((e) => {
          console.error(e);
        });

      const recentLegRaiseLikes = await fetchNumberOfLikes(recentLegRaiseId)
        .then((res) => {
          return res.data.numberOfLikes;
        })
        .catch((e) => {
          console.error(e);
        });
      setLegRaiseLikes(recentLegRaiseLikes);
    };
    fetchRecentLegRaiseData();
  }, []);

  useEffect(() => {
    const fetchRecentBridgeData = async () => {
      const recentBridgeId = await fetchUserRecentTrainingLogs(
        match.params.userId
      )
        .then((res) => {
          setRecentBridge(res.data.recentBridge);
          return res.data.recentBridge.id;
        })
        .catch((e) => {
          console.error(e);
        });

      const recentBridgeLikes = await fetchNumberOfLikes(recentBridgeId)
        .then((res) => {
          return res.data.numberOfLikes;
        })
        .catch((e) => {
          console.error(e);
        });
      setBridgeLikes(recentBridgeLikes);
    };
    fetchRecentBridgeData();
  }, []);

  useEffect(() => {
    const fetchRecentHandstandPushUpData = async () => {
      const recentHandstandPushUpId = await fetchUserRecentTrainingLogs(
        match.params.userId
      )
        .then((res) => {
          setRecentHandstandPushUp(res.data.recentHandstandPushUp);
          return res.data.recentHandstandPushUp.id;
        })
        .catch((e) => {
          console.error(e);
        });

      const recentHandstandPushUpLikes = await fetchNumberOfLikes(
        recentHandstandPushUpId
      )
        .then((res) => {
          return res.data.numberOfLikes;
        })
        .catch((e) => {
          console.error(e);
        });
      setHandstandPushUpLikes(recentHandstandPushUpLikes);
    };
    fetchRecentHandstandPushUpData();
  }, []);

  const hundleMenuChange = (e) => {
    setTrainingMenu(e.target.value);
  };

  const hundleStepChange = (e) => {
    setStep(e.target.value);
  };

  const hundleRepsChange = (e) => {
    setRep(e.target.value);
  };

  const hundleSetChange = (e) => {
    setSet(e.target.value);
  };

  const hundleNoteChange = (e) => {
    setNote(e.target.value);
  };

  const postTrainingAction = (trainingMenu, step, rep, set, note) => {
    const userId = currentUser.id;
    const result = postTraining(
      userId,
      token,
      client,
      uid,
      trainingMenu,
      step,
      rep,
      set,
      note
    );
    result
      .then((res) => {
        if (res.status === 200) {
          setModalOpen(true);
        }
      })
      .catch((e) => {
        setAlertOpen(true);
        console.error(e);
      });
  };

  const dialogOpenAction = (trainingLogId) => {
    setTargetTrainingLogId(trainingLogId);
    setDialogOpen(true);
  };

  const returnTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const trainingLogDeleteAction = () => {
    const trainingLogId = targetTrainingLogId;
    deleteTrainingLog(token, client, uid, trainingLogId)
      .then((res) => {
        if (res.status == 200) {
          setDialogOpen(false);
          setSuccessAlertOpen(true);
        }
      })
      .catch((e) => {
        console.error(e);
      });
    returnTop();
  };

  useEffect(() => {
    const ogUrl = `https://www.prisoner-training-app.com${match.url}/training_logs`;
  
    const head = document.getElementsByTagName("head")[0];
    const firstLinkTag = head.getElementsByTagName('link')[0];
  
    // const metaTags = head.getElementsByTagName('meta');

    const ogTitleMeta = document.createElement("meta");
    ogTitleMeta.setAttribute("property", "og:title");
    ogTitleMeta.setAttribute("content", "Prisoner Training App");
    head.insertBefore(ogTitleMeta, firstLinkTag)
  
    const ogTypeMeta = document.createElement("meta");
    ogTypeMeta.setAttribute("property", "og:type");
    ogTypeMeta.setAttribute("content", "article");
    head.insertBefore(ogTypeMeta, firstLinkTag);
  
    const ogUrlMeta = document.createElement("meta");
    ogUrlMeta.setAttribute("property", "og:url");
    ogUrlMeta.setAttribute("content", ogUrl);
    head.insertBefore(ogUrlMeta, firstLinkTag);
  
    const ogImageMeta = document.createElement("meta");
    ogImageMeta.setAttribute("property", "og:image");
    ogImageMeta.setAttribute("content", OgpImage);
    head.insertBefore(ogImageMeta, firstLinkTag);
  
    const ogSiteNameMeta = document.createElement("meta");
    ogSiteNameMeta.setAttribute("property", "og:site_name");
    ogSiteNameMeta.setAttribute("content", "Prisoner Training App");
    head.insertBefore(ogSiteNameMeta, firstLinkTag);
  
    const twitterCardMeta = document.createElement("meta");
    twitterCardMeta.setAttribute("name", "twitter:card");
    twitterCardMeta.setAttribute("content", "summary_large_image");
    head.insertBefore(twitterCardMeta, firstLinkTag);
  
    const facebookAppIdMeta = document.createElement("meta");
    facebookAppIdMeta.setAttribute("property", "fb:app_id");
    facebookAppIdMeta.setAttribute("contnt", "850644569333854");
    head.insertBefore(facebookAppIdMeta, firstLinkTag);
  }, []);

  return (
    <Fragment>
      <HelmetProvider>
        <Helmet>
          <title>トレーニング記録</title>
        </Helmet>
      </HelmetProvider>
      {modalOpen ? (
        <SuccessModalWithSnsShareButton
          message="トレーニングを記録しました"
          button={<ReloadButton />}
          match={match}
          ogDesc={`${currentUser?.nickname}さんがPrisoner Training Appでトレーニングを記録しました`}
          ogTitle={`${trainingMenu}の${step}を${rep}回行いました`}
        />
      ) : null}
      {alertOpen ? (
        <FailedAlert message="トレーニングを記録できませんでした" />
      ) : null}
      {dialogOpen ? (
        <DeleteDialog deleteAction={trainingLogDeleteAction} />
      ) : null}
      {successAlertOpen ? (
        <SuccessAlert message="記録を１件削除しました" />
      ) : null}
      <Grid className={classes.pageWrapper} container item direction="column">
        <Hidden only="xs">
          <Typography className={classes.inputTrainingTitle} variant="h4">
            {`${user.nickname}さんのトレーニング記録`}
          </Typography>
        </Hidden>
        <Hidden smUp>
          <Typography className={classes.inputTrainingTitle} variant="h6">
            {`${user.nickname}さんのトレーニング記録`}
          </Typography>
        </Hidden>
        {currentUser.id == match.params.userId ? (
          <Grid
            className={classes.inputTrainingLogWrapper}
            container
            item
            spacing={3}
            direction="row"
            alignItems="center"
          >
            <Grid item md={4} sm={12} xs={12}>
              <FormControl variant="standard" fullWidth>
                <InputLabel>トレーニングメニュー</InputLabel>
                <Select
                  label="trainingMenu"
                  value={trainingMenu}
                  onChange={hundleMenuChange}
                >
                  <MenuItem value="プッシュアップ">プッシュアップ</MenuItem>
                  <MenuItem value="スクワット">スクワット</MenuItem>
                  <MenuItem value="プルアップ">プルアップ</MenuItem>
                  <MenuItem value="レッグレイズ">レッグレイズ</MenuItem>
                  <MenuItem value="ブリッジ">ブリッジ</MenuItem>
                  <MenuItem value="ハンドスタンドプッシュアップ">
                    ハンドスタンドプッシュアップ
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={3} sm={12} xs={12}>
              <FormControl variant="standard" fullWidth>
                <InputLabel>ステップ</InputLabel>
                <Select label="step" value={step} onChange={hundleStepChange}>
                  <MenuItem value="ステップ１">ステップ１</MenuItem>
                  <MenuItem value="ステップ２">ステップ２</MenuItem>
                  <MenuItem value="ステップ３">ステップ３</MenuItem>
                  <MenuItem value="ステップ４">ステップ４</MenuItem>
                  <MenuItem value="ステップ５">ステップ５</MenuItem>
                  <MenuItem value="ステップ６">ステップ６</MenuItem>
                  <MenuItem value="ステップ７">ステップ７</MenuItem>
                  <MenuItem value="ステップ８">ステップ８</MenuItem>
                  <MenuItem value="ステップ９">ステップ９</MenuItem>
                  <MenuItem value="ステップ１０">ステップ１０</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={2} sm={12} xs={12}>
              <FormControl variant="standard" fullWidth>
                <InputLabel>回数</InputLabel>
                <Select label="rep" value={rep} onChange={hundleRepsChange}>
                  {trainingLepsArray.map((rep, index) => {
                    return (
                      <MenuItem key={index} value={rep}>{`${rep}回`}</MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={3} sm={12} xs={12}>
              <FormControl variant="standard" fullWidth>
                <InputLabel>セット数</InputLabel>
                <Select label="set" value={set} onChange={hundleSetChange}>
                  <MenuItem value="１セット">１セット</MenuItem>
                  <MenuItem value="２セット">２セット</MenuItem>
                  <MenuItem value="３セット">３セット</MenuItem>
                  <MenuItem value="４セット">４セット</MenuItem>
                  <MenuItem value="５セット">５セット</MenuItem>
                  <MenuItem value="６セット">６セット</MenuItem>
                  <MenuItem value="７セット">７セット</MenuItem>
                  <MenuItem value="８セット">８セット</MenuItem>
                  <MenuItem value="９セット">９セット</MenuItem>
                  <MenuItem value="１０セット">１０セット</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={10} sm={12} xs={12}>
              <FormControl variant="standard" fullWidth>
                <TextField
                  label="一言メモ"
                  value={note}
                  onChange={hundleNoteChange}
                />
              </FormControl>
            </Grid>
            <Grid item md={2} sm={12} xs={12}>
              <Button
                color="primary"
                variant="contained"
                size="medium"
                fullWidth
                onClick={() =>
                  postTrainingAction(trainingMenu, step, rep, set, note)
                }
              >
                記録する
              </Button>
            </Grid>
          </Grid>
        ) : null}
        <Typography className={classes.trainingLogTitle} variant="h4">
          これまでの記録
        </Typography>
        <Grid className={classes.trainingLogWrapper} container item spacing={5}>
          <Grid item md={4} sm={6} xs={12}>
            <Typography color="textSecondary">プッシュアップ</Typography>
            {recentPushUp ? (
              <Card className={classes.trainingLogCard} variant="outlined">
                <CardContent>
                  <Typography variant="subtitle2" color="textSecondary">
                    トレーニング日
                  </Typography>
                  <Typography variant="h6" gutterBottom>{`${moment(
                    recentPushUp.updated_at
                  ).format("YYYY-MM-DD")}`}</Typography>
                  <Typography variant="subtitle2" color="textSecondary">
                    ステップ
                  </Typography>
                  <Typography
                    variant="h6"
                    gutterBottom
                  >{`${recentPushUp.step}`}</Typography>
                  <Typography variant="subtitle2" color="textSecondary">
                    回数
                  </Typography>
                  <Typography
                    variant="h6"
                    gutterBottom
                  >{`${recentPushUp.repetition}回`}</Typography>
                  <Typography variant="subtitle2" color="textSecondary">
                    セット数
                  </Typography>
                  <Typography
                    variant="h6"
                    gutterBottom
                  >{`${recentPushUp.set}`}</Typography>
                  <Typography variant="subtitle2" color="textSecondary">
                    メモ
                  </Typography>
                  <Typography variant="h6">{`${recentPushUp.memo}`}</Typography>
                </CardContent>
                <CardActions className={classes.cardActionArea}>
                  <ThumbUp className={classes.likeIcon} />
                  <Typography>{`${pushUpLikes}`}</Typography>
                  <Typography className={classes.likesNumber}></Typography>
                  {currentUser.id === recentPushUp.user_id ? (
                    <Button
                      className={classes.deleteButton}
                      variant="text"
                      color="secondary"
                      size="small"
                      onClick={() => dialogOpenAction(recentPushUp.id)}
                    >
                      削除する
                    </Button>
                  ) : null}
                </CardActions>
              </Card>
            ) : (
              <Typography className={classes.notPresentText}>
                まだ記録がありません
              </Typography>
            )}
          </Grid>
          <Grid item md={4} sm={6} xs={12}>
            <Typography color="textSecondary">スクワット</Typography>
            {recentSquat ? (
              <Card className={classes.trainingLogCard} variant="outlined">
                <CardContent>
                  <Typography variant="subtitle2" color="textSecondary">
                    トレーニング日
                  </Typography>
                  <Typography variant="h6" gutterBottom>{`${moment(
                    recentSquat.updated_at
                  ).format("YYYY-MM-DD")}`}</Typography>
                  <Typography variant="subtitle2" color="textSecondary">
                    ステップ
                  </Typography>
                  <Typography
                    variant="h6"
                    gutterBottom
                  >{`${recentSquat.step}`}</Typography>
                  <Typography variant="subtitle2" color="textSecondary">
                    回数
                  </Typography>
                  <Typography
                    variant="h6"
                    gutterBottom
                  >{`${recentSquat.repetition}回`}</Typography>
                  <Typography variant="subtitle2" color="textSecondary">
                    セット数
                  </Typography>
                  <Typography
                    variant="h6"
                    gutterBottom
                  >{`${recentSquat.set}`}</Typography>
                  <Typography variant="subtitle2" color="textSecondary">
                    メモ
                  </Typography>
                  <Typography variant="h6">{`${recentSquat.memo}`}</Typography>
                </CardContent>
                <CardActions className={classes.cardActionArea}>
                  <ThumbUp className={classes.likeIcon} />
                  <Typography>{`${squatLikes}`}</Typography>
                  <Typography className={classes.likesNumber}></Typography>
                  {currentUser.id === recentSquat.user_id ? (
                    <Button
                      className={classes.deleteButton}
                      variant="text"
                      color="secondary"
                      size="small"
                      onClick={() => dialogOpenAction(recentSquat.id)}
                    >
                      削除する
                    </Button>
                  ) : null}
                </CardActions>
              </Card>
            ) : (
              <Typography className={classes.notPresentText}>
                まだ記録がありません
              </Typography>
            )}
          </Grid>
          <Grid item md={4} sm={6} xs={12}>
            <Typography color="textSecondary">プルアップ</Typography>
            {recentPullUp ? (
              <Card className={classes.trainingLogCard} variant="outlined">
                <CardContent>
                  <Typography variant="subtitle2" color="textSecondary">
                    トレーニング日
                  </Typography>
                  <Typography variant="h6" gutterBottom>{`${moment(
                    recentPullUp.updated_at
                  ).format("YYYY-MM-DD")}`}</Typography>
                  <Typography variant="subtitle2" color="textSecondary">
                    ステップ
                  </Typography>
                  <Typography
                    variant="h6"
                    gutterBottom
                  >{`${recentPullUp.step}`}</Typography>
                  <Typography variant="subtitle2" color="textSecondary">
                    回数
                  </Typography>
                  <Typography
                    variant="h6"
                    gutterBottom
                  >{`${recentPullUp.repetition}回`}</Typography>
                  <Typography variant="subtitle2" color="textSecondary">
                    セット数
                  </Typography>
                  <Typography
                    variant="h6"
                    gutterBottom
                  >{`${recentPullUp.set}`}</Typography>
                  <Typography variant="subtitle2" color="textSecondary">
                    メモ
                  </Typography>
                  <Typography variant="h6">{`${recentPullUp.memo}`}</Typography>
                </CardContent>
                <CardActions className={classes.cardActionArea}>
                  <ThumbUp className={classes.likeIcon} />
                  <Typography>{`${pullUpLikes}`}</Typography>
                  <Typography className={classes.likesNumber}></Typography>
                  {currentUser.id === recentPullUp.user_id ? (
                    <Button
                      className={classes.deleteButton}
                      variant="text"
                      color="secondary"
                      size="small"
                      onClick={() => dialogOpenAction(recentPullUp.id)}
                    >
                      削除する
                    </Button>
                  ) : null}
                </CardActions>
              </Card>
            ) : (
              <Typography className={classes.notPresentText}>
                まだ記録がありません
              </Typography>
            )}
          </Grid>
          <Grid item md={4} sm={6} xs={12}>
            <Typography color="textSecondary">レッグレイズ</Typography>
            {recentLegRaise ? (
              <Card className={classes.trainingLogCard} variant="outlined">
                <CardContent>
                  <Typography variant="subtitle2" color="textSecondary">
                    トレーニング日
                  </Typography>
                  <Typography variant="h6" gutterBottom>{`${moment(
                    recentLegRaise.updated_at
                  ).format("YYYY-MM-DD")}`}</Typography>
                  <Typography variant="subtitle2" color="textSecondary">
                    ステップ
                  </Typography>
                  <Typography
                    variant="h6"
                    gutterBottom
                  >{`${recentLegRaise.step}`}</Typography>
                  <Typography variant="subtitle2" color="textSecondary">
                    回数
                  </Typography>
                  <Typography
                    variant="h6"
                    gutterBottom
                  >{`${recentLegRaise.repetition}回`}</Typography>
                  <Typography variant="subtitle2" color="textSecondary">
                    セット数
                  </Typography>
                  <Typography
                    variant="h6"
                    gutterBottom
                  >{`${recentLegRaise.set}`}</Typography>
                  <Typography variant="subtitle2" color="textSecondary">
                    メモ
                  </Typography>
                  <Typography variant="h6">{`${recentLegRaise.memo}`}</Typography>
                </CardContent>
                <CardActions className={classes.cardActionArea}>
                  <ThumbUp className={classes.likeIcon} />
                  <Typography>{`${legRaiseLikes}`}</Typography>
                  <Typography className={classes.likesNumber}></Typography>
                  {currentUser.id === recentLegRaise.user_id ? (
                    <Button
                      className={classes.deleteButton}
                      variant="text"
                      color="secondary"
                      size="small"
                      onClick={() => dialogOpenAction(recentLegRaise.id)}
                    >
                      削除する
                    </Button>
                  ) : null}
                </CardActions>
              </Card>
            ) : (
              <Typography className={classes.notPresentText}>
                まだ記録がありません
              </Typography>
            )}
          </Grid>
          <Grid item md={4} sm={6} xs={12}>
            <Typography color="textSecondary">ブリッジ</Typography>
            {recentBridge ? (
              <Card className={classes.trainingLogCard} variant="outlined">
                <CardContent>
                  <Typography variant="subtitle2" color="textSecondary">
                    トレーニング日
                  </Typography>
                  <Typography variant="h6" gutterBottom>{`${moment(
                    recentBridge.updated_at
                  ).format("YYYY-MM-DD")}`}</Typography>
                  <Typography variant="subtitle2" color="textSecondary">
                    ステップ
                  </Typography>
                  <Typography
                    variant="h6"
                    gutterBottom
                  >{`${recentBridge.step}`}</Typography>
                  <Typography variant="subtitle2" color="textSecondary">
                    回数
                  </Typography>
                  <Typography
                    variant="h6"
                    gutterBottom
                  >{`${recentBridge.repetition}回`}</Typography>
                  <Typography variant="subtitle2" color="textSecondary">
                    セット数
                  </Typography>
                  <Typography
                    variant="h6"
                    gutterBottom
                  >{`${recentBridge.set}`}</Typography>
                  <Typography variant="subtitle2" color="textSecondary">
                    メモ
                  </Typography>
                  <Typography variant="h6">{`${recentBridge.memo}`}</Typography>
                </CardContent>
                <CardActions className={classes.cardActionArea}>
                  <ThumbUp className={classes.likeIcon} />
                  <Typography>{`${bridgeLikes}`}</Typography>
                  <Typography className={classes.likesNumber}></Typography>
                  {currentUser.id === recentBridge.user_id ? (
                    <Button
                      className={classes.deleteButton}
                      variant="text"
                      color="secondary"
                      size="small"
                      onClick={() => dialogOpenAction(recentBridge.id)}
                    >
                      削除する
                    </Button>
                  ) : null}
                </CardActions>
              </Card>
            ) : (
              <Typography className={classes.notPresentText}>
                まだ記録がありません
              </Typography>
            )}
          </Grid>
          <Grid item md={4} sm={6} xs={12}>
            <Typography color="textSecondary">
              ハンドスタンドプッシュアップ
            </Typography>
            {recentHandstandPushUp ? (
              <Card className={classes.trainingLogCard} variant="outlined">
                <CardContent>
                  <Typography variant="subtitle2" color="textSecondary">
                    トレーニング日
                  </Typography>
                  <Typography variant="h6" gutterBottom>{`${moment(
                    recentHandstandPushUp.updated_at
                  ).format("YYYY-MM-DD")}`}</Typography>
                  <Typography variant="subtitle2" color="textSecondary">
                    ステップ
                  </Typography>
                  <Typography
                    variant="h6"
                    gutterBottom
                  >{`${recentHandstandPushUp.step}`}</Typography>
                  <Typography variant="subtitle2" color="textSecondary">
                    回数
                  </Typography>
                  <Typography
                    variant="h6"
                    gutterBottom
                  >{`${recentHandstandPushUp.repetition}回`}</Typography>
                  <Typography variant="subtitle2" color="textSecondary">
                    セット数
                  </Typography>
                  <Typography
                    variant="h6"
                    gutterBottom
                  >{`${recentHandstandPushUp.set}`}</Typography>
                  <Typography variant="subtitle2" color="textSecondary">
                    メモ
                  </Typography>
                  <Typography variant="h6">{`${recentHandstandPushUp.memo}`}</Typography>
                </CardContent>
                <CardActions className={classes.cardActionArea}>
                  <ThumbUp className={classes.likeIcon} />
                  <Typography>{`${handstandPushUpLikes}`}</Typography>
                  <Typography className={classes.likesNumber}></Typography>
                  {currentUser.id === recentHandstandPushUp.user_id ? (
                    <Button
                      className={classes.deleteButton}
                      variant="text"
                      color="secondary"
                      size="small"
                      onClick={() => dialogOpenAction(recentHandstandPushUp.id)}
                    >
                      削除する
                    </Button>
                  ) : null}
                </CardActions>
              </Card>
            ) : (
              <Typography className={classes.notPresentText}>
                まだ記録がありません
              </Typography>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  );
});
