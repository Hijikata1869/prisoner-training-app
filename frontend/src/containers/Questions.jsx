import React, { Fragment, useEffect, useState } from "react";
import {
  Avatar,
  Button,
  ButtonBase,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory, Link } from "react-router-dom";
import Cookies from "js-cookie";
import moment from "moment";

// api
import {
  fetchCurrentUser,
  postQuestion,
  fetchQuestions,
  fetchUsers,
  fetchRecentQuestions,
  fetchUser,
} from "../apis/users";

// components
import { SuccessModal } from "../components/SuccessModal";
import { ReloadButton } from "../components/ReloadButton";
import { FailedAlert } from "../components/FailedAlert";

const useStyles = makeStyles(() => ({
  questionsWrapper: {
    paddingTop: "2rem",
    paddingBottom: "3rem",
  },
  postQuestionWrapper: {
    paddingLeft: "2rem",
    paddingRight: "2rem",
    marginBottom: "2rem",
  },
  showQuestionsWrapper: {
    paddingRight: "2rem",
  },
  postQuestionTitle: {
    marginBottom: "2rem",
  },
  postQuestionItems: {
    marginBottom: "2rem",
  },
  postQuestionButton: {
    margin: "0 auto",
  },
  questionContainer: {
    backgroundColor: "#e8e8e8",
    marginBottom: "2rem",
  },
  questionCard: {
    marginBottom: "3rem",
    padding: "1rem",
    marginLeft: "2rem",
  },
  userImage: {
    width: "60px",
    height: "60px",
  },
  viewQuestionTitle: {
    marginBottom: "2rem",
    paddingLeft: "2rem",
  },
  adviceButton: {
    margin: "0 auto",
  },
  prymaryTitle: {
    paddingLeft: "2rem",
    marginBottom: "0.5rem",
  },
}));

export const Questions = () => {
  const classes = useStyles();
  const history = useHistory();

  const token = Cookies.get("access-token");
  const client = Cookies.get("client");
  const uid = Cookies.get("uid");

  const [trainingMenu, setTrainingMenu] = useState("");
  const [step, setStep] = useState("");
  const [questionText, setQuestionText] = useState("");
  const [currentUser, setCurrentUser] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [questionsArr, setQuestionsArr] = useState([]);
  const [usersArr, setUsersArr] = useState([]);
  const [pushUpQuestion, setPushUpQuestion] = useState([]);
  const [pushUpQuestionUser, setPushUpQuestionUser] = useState([]);
  const [squatQuestion, setSquatQuestion] = useState([]);
  const [squatQuestionUser, setSquatQuestionUser] = useState([]);
  const [pullUpQuestion, setPullUpQuestion] = useState([]);
  const [pullUpQuestionUser, setPullUpQuestionUser] = useState([]);
  const [legRaiseQuestion, setLegRaiseQuestion] = useState([]);
  const [legRaiseQuestionUser, setLegRaiseQuestionUser] = useState([]);
  const [bridgeQuestion, setBridgeQuestion] = useState([]);
  const [bridgeQuestionUser, setBridgeQuestionUser] = useState([]);
  const [handstandPushUpQuestion, setHandstandPushUpQuestion] = useState([]);
  const [handstandPushUpQuestionUser, setHandstandPushUpQuestionUser] =
    useState([]);

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
    fetchQuestions(token, client, uid)
      .then((res) => {
        setQuestionsArr(res.data.questions);
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
    fetchRecentQuestions()
      .then((res) => {
        setPushUpQuestion(res.data.pushUpQuestion[0]);
        setSquatQuestion(res.data.squatQuestion[0]);
        setPullUpQuestion(res.data.pullUpQuestion[0]);
        setLegRaiseQuestion(res.data.legRaiseQuestion[0]);
        setBridgeQuestion(res.data.bridgeQuestion[0]);
        setHandstandPushUpQuestion(res.data.handstandPushUpQuestion[0]);
        setPushUpQuestionUser(res.data.pushUpQuestion[1]);
        setSquatQuestionUser(res.data.squatQuestion[1]);
        setPullUpQuestionUser(res.data.pullUpQuestion[1]);
        setLegRaiseQuestionUser(res.data.legRaiseQuestion[1]);
        setBridgeQuestionUser(res.data.bridgeQuestion[1]);
        setHandstandPushUpQuestionUser(res.data.handstandPushUpQuestion[1]);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  const showUserImage = (targetUser) => {
    const userImageUrl = targetUser.image?.url;
    return userImageUrl?.toString();
  };

  const showUserName = (userId) => {
    const user = usersArr.find((user) => user.id === userId);

    return user?.nickname;
  };

  const hundleTrainingMenuChange = (e) => {
    setTrainingMenu(e.target.value);
  };

  const hundleStepChange = (e) => {
    setStep(e.target.value);
  };

  const hundleTextChange = (e) => {
    setQuestionText(e.target.value);
  };

  const postQuestionAction = () => {
    const userId = currentUser.id;
    postQuestion(token, client, uid, userId, trainingMenu, step, questionText)
      .then((res) => {
        setModalOpen(true);
      })
      .catch((e) => {
        setAlertOpen(true);
        console.error(e);
      });
  };

  return (
    <Fragment>
      {modalOpen ? (
        <SuccessModal message="質問を投稿しました" button={<ReloadButton />} />
      ) : null}
      {alertOpen ? <FailedAlert message="質問が投稿できませんでした" /> : null}
      <Grid className={classes.questionsWrapper} container>
        <Grid
          className={classes.postQuestionWrapper}
          container
          item
          md={5}
          xs={12}
          direction="column"
        >
          <Grid item>
            <Typography className={classes.postQuestionTitle} variant="h4">
              質問する
            </Typography>
          </Grid>
          <Grid className={classes.postQuestionItems} item>
            <FormControl variant="standard" fullWidth>
              <InputLabel>トレーニングメニュー</InputLabel>
              <Select
                id="trainingMenus"
                label="trainingMenu"
                value={trainingMenu}
                onChange={hundleTrainingMenuChange}
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
          <Grid className={classes.postQuestionItems} item>
            <FormControl variant="standard" fullWidth>
              <InputLabel>ステップ</InputLabel>
              <Select
                id="steps"
                label="step"
                value={step}
                onChange={hundleStepChange}
              >
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
          <Grid className={classes.postQuestionItems} item>
            <Typography variant="subtitle2">
              詰まっているポイントや質問したいこと
            </Typography>
            <TextField
              variant="outlined"
              fullWidth
              multiline
              minRows={10}
              value={questionText}
              onChange={hundleTextChange}
            ></TextField>
          </Grid>
          <Grid className={classes.postQuestionButton} item>
            <Button
              variant="contained"
              color="primary"
              onClick={() => postQuestionAction()}
            >
              質問する
            </Button>
          </Grid>
        </Grid>
        <Grid
          className={classes.showQuestionsWrapper}
          container
          item
          md={7}
          xs={12}
          direction="column"
        >
          <Typography className={classes.viewQuestionTitle} variant="h4">
            質問一覧
          </Typography>
          <Grid item>
            <Typography className={classes.prymaryTitle} color="textSecondary">
              最新のプッシュアップに関する質問
            </Typography>
            <Card className={classes.questionCard}>
              <CardHeader
                avatar={
                  <ButtonBase
                    onClick={() =>
                      history.push(`/users/${pushUpQuestion.user_id}`)
                    }
                  >
                    <Avatar
                      className={classes.userImage}
                      variant="rounded"
                      alt={pushUpQuestionUser.nickname}
                      src={showUserImage(pushUpQuestionUser)}
                    />
                  </ButtonBase>
                }
                title={
                  <Typography variant="h5">{`${pushUpQuestionUser.nickname}`}</Typography>
                }
                subheader={`投稿日：${moment(pushUpQuestion.created_at).format(
                  "YYYY-MM-DD"
                )}`}
              />
              <CardContent>
                <Typography variant="subtitle2" color="textSecondary">
                  質問したいトレーニングメニュー及びステップ
                </Typography>
                <Typography>{`${pushUpQuestion.training_menu}の${pushUpQuestion.step}について`}</Typography>
              </CardContent>
              <CardContent>
                <Typography variant="subtitle2" color="textSecondary">
                  困っていること、聞きたいこと
                </Typography>
                <Typography>{`${pushUpQuestion.question}`}</Typography>
              </CardContent>
              <CardActions>
                <Button
                  className={classes.adviceButton}
                  variant="contained"
                  color="primary"
                  onClick={() =>
                    history.push(`/questions/${pushUpQuestion.id}/advices`)
                  }
                >
                  アドバイスをする
                </Button>
              </CardActions>
            </Card>
            <Link to="/questions/push_up?training_menu=push_up">
              プッシュアップの質問一覧はこちら
            </Link>
          </Grid>
          <Grid item>
            <Typography className={classes.prymaryTitle} color="textSecondary">
              最新のスクワットに関する質問
            </Typography>
            <Card className={classes.questionCard}>
              <CardHeader
                avatar={
                  <ButtonBase
                    onClick={() =>
                      history.push(`/users/${squatQuestion.user_id}`)
                    }
                  >
                    <Avatar
                      className={classes.userImage}
                      variant="rounded"
                      alt={squatQuestionUser.nickname}
                      src={showUserImage(squatQuestionUser)}
                    />
                  </ButtonBase>
                }
                title={
                  <Typography variant="h5">{`${squatQuestionUser.nickname}`}</Typography>
                }
                subheader={`投稿日：${moment(squatQuestion.created_at).format(
                  "YYYY-MM-DD"
                )}`}
              />
              <CardContent>
                <Typography variant="subtitle2" color="textSecondary">
                  質問したいトレーニングメニュー及びステップ
                </Typography>
                <Typography>{`${squatQuestion.training_menu}の${squatQuestion.step}について`}</Typography>
              </CardContent>
              <CardContent>
                <Typography variant="subtitle2" color="textSecondary">
                  困っていること、聞きたいこと
                </Typography>
                <Typography>{`${squatQuestion.question}`}</Typography>
              </CardContent>
              <CardActions>
                <Button
                  className={classes.adviceButton}
                  variant="contained"
                  color="primary"
                  onClick={() =>
                    history.push(`/questions/${squatQuestion.id}/advices`)
                  }
                >
                  アドバイスをする
                </Button>
              </CardActions>
            </Card>
            <Link to="/questions/squat?training_menu=squat">
              スクワットの質問一覧はこちら
            </Link>
          </Grid>
          <Grid item>
            <Typography className={classes.prymaryTitle} color="textSecondary">
              最新のプルアップに関する質問
            </Typography>
            <Card className={classes.questionCard}>
              <CardHeader
                avatar={
                  <ButtonBase
                    onClick={() =>
                      history.push(`/users/${pullUpQuestion.user_id}`)
                    }
                  >
                    <Avatar
                      className={classes.userImage}
                      variant="rounded"
                      alt={pullUpQuestionUser.nickname}
                      src={showUserImage(pullUpQuestionUser)}
                    />
                  </ButtonBase>
                }
                title={
                  <Typography variant="h5">{`${pullUpQuestionUser.nickname}`}</Typography>
                }
                subheader={`投稿日：${moment(pullUpQuestion.created_at).format(
                  "YYYY-MM-DD"
                )}`}
              />
              <CardContent>
                <Typography variant="subtitle2" color="textSecondary">
                  質問したいトレーニングメニュー及びステップ
                </Typography>
                <Typography>{`${pullUpQuestion.training_menu}の${pullUpQuestion.step}について`}</Typography>
              </CardContent>
              <CardContent>
                <Typography variant="subtitle2" color="textSecondary">
                  困っていること、聞きたいこと
                </Typography>
                <Typography>{`${pullUpQuestion.question}`}</Typography>
              </CardContent>
              <CardActions>
                <Button
                  className={classes.adviceButton}
                  variant="contained"
                  color="primary"
                  onClick={() =>
                    history.push(`/questions/${pullUpQuestion.id}/advices`)
                  }
                >
                  アドバイスをする
                </Button>
              </CardActions>
            </Card>
            <Link to="/questions/pull_up?training_menu=pull_up">
              プルアップの質問一覧はこちら
            </Link>
          </Grid>
          <Grid item>
            <Typography className={classes.prymaryTitle} color="textSecondary">
              最新のレッグレイズに関する質問
            </Typography>
            <Card className={classes.questionCard}>
              <CardHeader
                avatar={
                  <ButtonBase
                    onClick={() =>
                      history.push(`/users/${legRaiseQuestion.user_id}`)
                    }
                  >
                    <Avatar
                      className={classes.userImage}
                      variant="rounded"
                      alt={legRaiseQuestionUser.nickname}
                      src={showUserImage(legRaiseQuestionUser)}
                    />
                  </ButtonBase>
                }
                title={
                  <Typography variant="h5">{`${legRaiseQuestionUser.nickname}`}</Typography>
                }
                subheader={`投稿日：${moment(
                  legRaiseQuestion.created_at
                ).format("YYYY-MM-DD")}`}
              />
              <CardContent>
                <Typography variant="subtitle2" color="textSecondary">
                  質問したいトレーニングメニュー及びステップ
                </Typography>
                <Typography>{`${legRaiseQuestion.training_menu}の${legRaiseQuestion.step}について`}</Typography>
              </CardContent>
              <CardContent>
                <Typography variant="subtitle2" color="textSecondary">
                  困っていること、聞きたいこと
                </Typography>
                <Typography>{`${legRaiseQuestion.question}`}</Typography>
              </CardContent>
              <CardActions>
                <Button
                  className={classes.adviceButton}
                  variant="contained"
                  color="primary"
                  onClick={() =>
                    history.push(`/questions/${legRaiseQuestion.id}/advices`)
                  }
                >
                  アドバイスをする
                </Button>
              </CardActions>
            </Card>
            <Link to="/questions/leg_raise?training_menu=leg_raise">
              レッグレイズの質問一覧はこちら
            </Link>
          </Grid>
          <Grid item>
            <Typography className={classes.prymaryTitle} color="textSecondary">
              最新のブリッジに関する質問
            </Typography>
            <Card className={classes.questionCard}>
              <CardHeader
                avatar={
                  <ButtonBase
                    onClick={() =>
                      history.push(`/users/${bridgeQuestion.user_id}`)
                    }
                  >
                    <Avatar
                      className={classes.userImage}
                      variant="rounded"
                      alt={bridgeQuestionUser.nickname}
                      src={showUserImage(bridgeQuestionUser)}
                    />
                  </ButtonBase>
                }
                title={
                  <Typography variant="h5">{`${bridgeQuestionUser.nickname}`}</Typography>
                }
                subheader={`投稿日：${moment(bridgeQuestion.created_at).format(
                  "YYYY-MM-DD"
                )}`}
              />
              <CardContent>
                <Typography variant="subtitle2" color="textSecondary">
                  質問したいトレーニングメニュー及びステップ
                </Typography>
                <Typography>{`${bridgeQuestion.training_menu}の${bridgeQuestion.step}について`}</Typography>
              </CardContent>
              <CardContent>
                <Typography variant="subtitle2" color="textSecondary">
                  困っていること、聞きたいこと
                </Typography>
                <Typography>{`${bridgeQuestion.question}`}</Typography>
              </CardContent>
              <CardActions>
                <Button
                  className={classes.adviceButton}
                  variant="contained"
                  color="primary"
                  onClick={() =>
                    history.push(`/questions/${bridgeQuestion.id}/advices`)
                  }
                >
                  アドバイスをする
                </Button>
              </CardActions>
            </Card>
            <Link to="/questions/bridge?training_menu=bridge">
              ブリッジの質問一覧はこちら
            </Link>
          </Grid>
          <Grid item>
            <Typography className={classes.prymaryTitle} color="textSecondary">
              最新のハンドスタンドプッシュアップに関する質問
            </Typography>
            <Card className={classes.questionCard}>
              <CardHeader
                avatar={
                  <ButtonBase
                    onClick={() =>
                      history.push(`/users/${handstandPushUpQuestion.user_id}`)
                    }
                  >
                    <Avatar
                      className={classes.userImage}
                      variant="rounded"
                      alt={handstandPushUpQuestionUser.nickname}
                      src={showUserImage(handstandPushUpQuestionUser)}
                    />
                  </ButtonBase>
                }
                title={
                  <Typography variant="h5">{`${handstandPushUpQuestionUser.nickname}`}</Typography>
                }
                subheader={`投稿日：${moment(
                  handstandPushUpQuestion.created_at
                ).format("YYYY-MM-DD")}`}
              />
              <CardContent>
                <Typography variant="subtitle2" color="textSecondary">
                  質問したいトレーニングメニュー及びステップ
                </Typography>
                <Typography>{`${handstandPushUpQuestion.training_menu}の${handstandPushUpQuestion.step}について`}</Typography>
              </CardContent>
              <CardContent>
                <Typography variant="subtitle2" color="textSecondary">
                  困っていること、聞きたいこと
                </Typography>
                <Typography>{`${handstandPushUpQuestion.question}`}</Typography>
              </CardContent>
              <CardActions>
                <Button
                  className={classes.adviceButton}
                  variant="contained"
                  color="primary"
                  onClick={() =>
                    history.push(
                      `/questions/${handstandPushUpQuestion.id}/advices`
                    )
                  }
                >
                  アドバイスをする
                </Button>
              </CardActions>
            </Card>
            <Link to="/questions/handstand_push_up?training_menu=handstand_push_up">
              ハンドスタンドプッシュアップの質問一覧はこちら
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  );
};
