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
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import moment from "moment";

// api
import {
  fetchCurrentUser,
  postQuestion,
  fetchQuestions,
  fetchUsers,
} from "../apis/users";

// components
import { SuccessModal } from "../components/SuccessModal";
import { ReloadButton } from "../components/ReloadButton";
import { FailedAlert } from "../components/FailedAlert";

const useStyles = makeStyles(() => ({
  questionsWrapper: {
    paddingTop: "2rem",
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
    marginBottom: "2rem",
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

  const showUserImage = (userId) => {
    const user = usersArr.find((user) => user.id === userId);
    return user?.image.url;
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
        <SuccessModal message="???????????????????????????" button={<ReloadButton />} />
      ) : null}
      {alertOpen ? <FailedAlert message="???????????????????????????????????????" /> : null}
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
              ????????????
            </Typography>
          </Grid>
          <Grid className={classes.postQuestionItems} item>
            <FormControl variant="standard" fullWidth>
              <InputLabel>??????????????????????????????</InputLabel>
              <Select
                id="trainingMenus"
                label="trainingMenu"
                value={trainingMenu}
                onChange={hundleTrainingMenuChange}
              >
                <MenuItem value="?????????????????????">?????????????????????</MenuItem>
                <MenuItem value="???????????????">???????????????</MenuItem>
                <MenuItem value="???????????????">???????????????</MenuItem>
                <MenuItem value="??????????????????">??????????????????</MenuItem>
                <MenuItem value="????????????">????????????</MenuItem>
                <MenuItem value="??????????????????????????????????????????">
                  ??????????????????????????????????????????
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid className={classes.postQuestionItems} item>
            <FormControl variant="standard" fullWidth>
              <InputLabel>????????????</InputLabel>
              <Select
                id="steps"
                label="step"
                value={step}
                onChange={hundleStepChange}
              >
                <MenuItem value="???????????????">???????????????</MenuItem>
                <MenuItem value="???????????????">???????????????</MenuItem>
                <MenuItem value="???????????????">???????????????</MenuItem>
                <MenuItem value="???????????????">???????????????</MenuItem>
                <MenuItem value="???????????????">???????????????</MenuItem>
                <MenuItem value="???????????????">???????????????</MenuItem>
                <MenuItem value="???????????????">???????????????</MenuItem>
                <MenuItem value="???????????????">???????????????</MenuItem>
                <MenuItem value="???????????????">???????????????</MenuItem>
                <MenuItem value="??????????????????">??????????????????</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid className={classes.postQuestionItems} item>
            <Typography variant="subtitle2">
              ??????????????????????????????????????????????????????
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
              ????????????
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
          <Grid item>
            <Typography className={classes.viewQuestionTitle} variant="h4">
              ????????????
            </Typography>
          </Grid>
          {questionsArr.map((data, index) => {
            return (
              <Card className={classes.questionCard} key={index}>
                <CardHeader
                  avatar={
                    <ButtonBase
                      onClick={() => history.push(`/users/${data.user_id}`)}
                    >
                      <Avatar
                        className={classes.userImage}
                        alt={showUserName(data.user_id)}
                        src={showUserImage(data.user_id)}
                        variant="rounded"
                      />
                    </ButtonBase>
                  }
                  title={
                    <Typography variant="h5">{`${showUserName(
                      data.user_id
                    )}`}</Typography>
                  }
                  subheader={`????????????${moment(data.created_at).format(
                    "YYYY-MM-DD"
                  )}`}
                />
                <CardContent>
                  <Typography variant="subtitle2" color="textSecondary">
                    ???????????????????????????????????????????????????????????????
                  </Typography>
                  <Typography>{`${data.training_menu}???${data.step}????????????`}</Typography>
                </CardContent>
                <CardContent>
                  <Typography variant="subtitle2" color="textSecondary">
                    ??????????????????????????????????????????
                  </Typography>
                  <Typography>{`${data.question}`}</Typography>
                </CardContent>
                <CardActions className={classes.adviceButtonArea}>
                  <Button
                    className={classes.adviceButton}
                    variant="contained"
                    color="primary"
                    onClick={() =>
                      history.push(`/questions/${data.id}/advices`)
                    }
                  >
                    ????????????????????????
                  </Button>
                </CardActions>
              </Card>
            );
          })}
        </Grid>
      </Grid>
    </Fragment>
  );
};
