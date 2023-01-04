import React, { Fragment, useEffect, useState } from "react";
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
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Cookies from "js-cookie";
import moment from "moment";

// icons
import { ThumbUp } from "@material-ui/icons";

// apis
import {
  postTraining,
  fetchCurrentUser,
  fetchUser,
  deleteTrainingLog,
  fetchLikes,
  fetchUserTrainingLogs,
} from "../apis/users";

// components
import { SuccessModal } from "../components/SuccessModal";
import { ReloadButton } from "../components/ReloadButton";
import { FailedAlert } from "../components/FailedAlert";
import { DeleteDialog } from "../components/DeleteDialog";
import { SuccessAlert } from "../components/SuccessAlert";

const useStyles = makeStyles(() => ({
  pageWrapper: {
    paddingRight: "2rem",
    paddingLeft: "2rem",
  },
  pastTrainingLogWrapper: {},
  pastTrainingLogTitle: {
    marginTop: "5rem",
    marginBottom: "2rem",
  },
  pastTrainingLog: {
    marginBottom: "3rem",
    border: "1px solid gray",
    borderRadius: "10px",
  },
  trainingLogNotes: {
    borderTop: "1px solid gray",
  },
  deleteButtonWrapper: {
    margin: "0 0 0 auto",
  },
  deleteButton: {},
  numberOfLikes: {
    margin: "0 0 0 auto",
  },
  likeIconWrapper: {
    textAlign: "right",
  },
  likeNumber: {
    marginLeft: "0.5rem",
  },
}));

const repsPrepare = () => {
  const reps = [];
  for (let i = 1; i < 51; i++) {
    reps.push(`${i}`);
  }
  return reps;
};

export const UserTrainingLog = ({ match }) => {
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
  const [allLikesArr, setAllLikesArr] = useState([]);
  const [userTrainingLogs, setUserTrainingLogs] = useState([]);

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
    fetchLikes()
      .then((res) => {
        setAllLikesArr(res.data.likes);
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
  };

  const numberOfLikes = (trainingLogId) => {
    const targetLikes = allLikesArr.filter(
      (like) => like.training_log_id == trainingLogId
    );
    return targetLikes?.length;
  };

  return (
    <Fragment>
      {modalOpen ? (
        <SuccessModal
          message="トレーニングを記録しました"
          button={<ReloadButton />}
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
        <Grid
          className={classes.pastTrainingLogWrapper}
          container
          item
          direction="column"
        >
          <Hidden only="xs">
            <Typography className={classes.pastTrainingLogTitle} variant="h4">
              これまでの記録
            </Typography>
          </Hidden>
          <Hidden smUp>
            <Typography className={classes.pastTrainingLogTitle} variant="h5">
              これまでの記録
            </Typography>
          </Hidden>
          {userTrainingLogs.length !== 0 ? (
            <Fragment>
              {userTrainingLogs.map((data, index) => {
                return (
                  <Grid
                    key={index}
                    className={classes.pastTrainingLog}
                    container
                    item
                    spacing={4}
                    direction="row"
                    alignItems="center"
                  >
                    <Grid item md="auto" xs={12}>
                      <Typography variant="subtitle2">日付</Typography>
                      <Typography variant="h6">{`${moment(
                        data.updated_at
                      ).format("YYYY-MM-DD")}`}</Typography>
                    </Grid>
                    <Grid item md="auto" xs={12}>
                      <Typography variant="subtitle2">メニュー</Typography>
                      <Typography variant="h6">{`${data.training_menu}`}</Typography>
                    </Grid>
                    <Grid item md="auto" xs={12}>
                      <Typography variant="subtitle2">ステップ</Typography>
                      <Typography variant="h6">{`${data.step}`}</Typography>
                    </Grid>
                    <Grid item md="auto" xs={12}>
                      <Typography variant="subtitle2">回数</Typography>
                      <Typography variant="h6">{`${data.repetition}回`}</Typography>
                    </Grid>
                    <Grid item md="auto" xs={12}>
                      <Typography variant="subtitle2">セット数</Typography>
                      <Typography variant="h6">{`${data.set}`}</Typography>
                    </Grid>
                    <Grid className={classes.deleteButtonWrapper} item>
                      {currentUser.id === data.user_id ? (
                        <Button
                          className={classes.deleteButton}
                          variant="text"
                          color="secondary"
                          size="small"
                          onClick={() => dialogOpenAction(data.id)}
                        >
                          削除する
                        </Button>
                      ) : null}
                    </Grid>
                    <Grid
                      className={classes.trainingLogNotes}
                      container
                      item
                      alignItems="center"
                    >
                      <Grid
                        className={classes.trianingLogNotes}
                        item
                        md={10}
                        sm={10}
                        xs={12}
                      >
                        <Typography variant="body1">{`一言メモ：${data.memo}`}</Typography>
                      </Grid>
                      <Grid
                        className={classes.likeIconWrapper}
                        item
                        md={1}
                        sm={1}
                      >
                        <ThumbUp className={classes.likeIcon} />
                      </Grid>
                      <Grid className={classes.likeWrapper} item md={1} sm={1}>
                        <Typography
                          className={classes.likeNumber}
                          color="textSecondary"
                        >
                          {numberOfLikes(data.id)}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                );
              })}
            </Fragment>
          ) : (
            <Typography>まだトレーニング記録がありません</Typography>
          )}
        </Grid>
      </Grid>
    </Fragment>
  );
};
