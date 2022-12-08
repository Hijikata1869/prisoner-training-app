import React, { Fragment, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Grid, Hidden, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

// components
import { UserMenu } from "../components/UserMenu";

// apis
import { fetchUser } from "../apis/users";

const useStyles = makeStyles(() => ({
  PageWrapper: {
    paddingTop: "2rem",
  },
  title: {
    padding: "4rem",
  }
}));

export const UsersContainer = ({ match, mainComponent }) => {
  const classes = useStyles();
  const history = useHistory();

  const [user, setUser] = useState([]);

  useEffect(() => {
    fetchUser(match.params.userId)
    .then((res) => {
      setUser(res.data.user);
    })
    .catch((e) => {
      console.error(e);
    });
  }, []);

  const userNickname = user.nickname;

  return (
    <Fragment>
    {
      userNickname ?
      <>
        <div className={classes.PageWrapper}>
          <Grid container>
            <Hidden only={["sm", "xs"]}>
              <Grid container item lg={3} md={3}>
                <UserMenu match={match} />
              </Grid>
            </Hidden>
            <Grid container item lg={9} md={9} sm={12}>
              {/* このコンテナの中にコンポーネントとしてそれぞれのページを追加する */}
              {mainComponent}
            </Grid>
          </Grid>
        </div>
      </>
      :
      <>
        <Grid container direction="column" alignItems="center">
          <Grid item>
            <Typography className={classes.title} variant="h6">存在しないユーザーです</Typography>
          </Grid>
          <Grid item>
            <Button variant="outlined" onClick={() => history.goBack()}>
              前のページに戻る
            </Button>
          </Grid>
        </Grid>
      </>
    }
    </Fragment>
  );
};
