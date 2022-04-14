import React, { Fragment } from "react";
import { Grid, Hidden } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

// components
import { UserMenu } from "../components/UserMenu";

const useStyles = makeStyles(() => ({
  PageWrapper: {
    paddingTop: "2rem",
  },
}));

export const UsersContainer = ({ match, mainComponent }) => {
  const classes = useStyles();

  return (
    <Fragment>
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
    </Fragment>
  );
};
