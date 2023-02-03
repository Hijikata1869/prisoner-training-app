import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { Grid, Card, Typography, CardHeader, ButtonBase, Avatar, CardContent, CardActions, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";

// apis
import { fetchOneKindQuestions, fetchDesignatedUsers } from "../apis/users";

const useStyles = makeStyles(() => ({
  pageWrapper: {
    padding: "1.5rem",
    marginBottom: "2rem"
  },
  pageTitle: {
    marginBottom: "1rem"
  },
  questionCard: {
    padding: "1rem"
  },
  toAdviceButton: {
    margin: "0 auto",
  }
}));

export const OneKindQuestions = () => {

  const classes = useStyles();

  const history = useHistory();
  const search = useLocation().search;
  const query = new URLSearchParams(search);
  const trainingMenu = query.get("training_menu");

  const userIds = [];

  const [questions, setQuestions] = useState([]);
  const [hasQuestionUsers, setHasQuestionUsers] = useState([]);

  useEffect(() => {
    const fetchQuestionsAndUsers = async() => {

      const oneKindQuestionsData = await fetchOneKindQuestions(trainingMenu)
      .then((res) => {
        setQuestions(res.data.questions);
        return res.data.questions;
      })
      .catch((e) => {
        console.error(e);
      });

      await oneKindQuestionsData.map((question) => {
        userIds.push(question.user_id);
      });

      fetchDesignatedUsers(userIds)
      .then((res) => {
        setHasQuestionUsers(res.data.users);
      })
      .catch((e) => {
        console.error(e);
      });
    }
    fetchQuestionsAndUsers();
  }, [])

  const showUserImage = (userId) => {
    const targetUser = hasQuestionUsers.find(user => user.id == userId);
    return targetUser?.image.url;
  }

  const showUserName = (userId) => {
    const targetUser = hasQuestionUsers.find(user => user.id == userId);
    return targetUser?.nickname;
  }

  const showPageTitle = (trainingMenu) => {
    let pageTitle;
    switch (trainingMenu){
      case "push_up":
        pageTitle = "プッシュアップの質問一覧";
        break;
      case "squat":
        pageTitle = "スクワットの質問一覧";
        break;
      case "pull_up":
        pageTitle = "プルアップの質問一覧";
        break;
      case "leg_raise":
        pageTitle = "レッグレイズの質問一覧";
        break;
      case "bridge":
        pageTitle = "ブリッジの質問一覧";
        break;
      case "handstand_push_up":
        pageTitle = "ハンドスタンドプッシュアップの質問一覧";
        break;
      default:
        pageTitle = "";
    }
    return pageTitle;
  }

  return (
    <>
      <div className={classes.pageWrapper}>
        <Typography className={classes.pageTitle} variant="h4">{`${showPageTitle(trainingMenu)}`}</Typography>
        <Grid container spacing={3}>
          {questions.map((question, index) => {
            return (
            <Grid key={index} item md={6}>
              <Card className={classes.questionCard}>
                <CardHeader
                  avatar={
                    <ButtonBase
                      onClick={() =>
                        history.push(`/users/${question.user_id}`)
                      }
                    >
                      <Avatar
                        variant="rounded"
                        alt={showUserName(question.user_id)}
                        src={showUserImage(question.user_id)}
                      />
                    </ButtonBase>
                  }
                  title={
                    <Typography variant="h5">{`${showUserName(question.user_id)}`}</Typography>
                  }
                  subheader={`投稿日：${moment(question.created_at).format(
                    "YYYY-MM-DD"
                  )}`}
                />
                <CardContent>
                  <Typography variant="subtitle2" color="textSecondary">
                    質問したいトレーニングメニュー及びステップ
                  </Typography>
                  <Typography>{`${question.training_menu}の${question.step}について`}</Typography>
                </CardContent>
                <CardContent>
                  <Typography variant="subtitle2" color="textSecondary">
                    困っていること、聞きたいこと
                  </Typography>
                  <Typography>{`${question.question}`}</Typography>
                </CardContent>
                <CardActions className={classes.cardActionsArea}>
                  <Button
                    className={classes.toAdviceButton}
                    variant="contained"
                    color="primary"
                    onClick={() =>
                      history.push(`/questions/${question.id}/advices`)
                    }
                  >
                    アドバイスをする
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            );
          })}
        </Grid>
      </div>
    </>
  );
};
