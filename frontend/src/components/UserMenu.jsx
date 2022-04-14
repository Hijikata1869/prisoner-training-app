import React, { Fragment } from "react";
import { Grid, Typography, Link, Hidden } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  menuWrapper: {
    height: "85vh",
    marginLeft: "5rem",
  },
  link: {
    "&:hover": {
      cursor: "pointer",
    },
  },
  menuTitle: {
    marginBottom: "3rem",
  },
  linkMenu: {
    marginBottom: "3rem",
  },
}));

export const UserMenu = ({ match }) => {
  const classes = useStyles();

  return (
    <Fragment>
      <Hidden only={["sm", "xs"]}>
        <Grid className={classes.menuWrapper} container item>
          <Grid
            container
            item
            direction="column"
            alignItems="flex-start"
            justifyContent="center"
          >
            <Grid className={classes.menuTitle} item>
              <Typography variant="h4">メニュー</Typography>
            </Grid>
            <Grid className={classes.linkMenu} item>
              <Typography variant="h5">
                <Link
                  className={classes.link}
                  href={`${match.url}/training_logs`}
                  color="textSecondary"
                  underline="none"
                >
                  トレーニング記録
                </Link>
              </Typography>
            </Grid>
            <Grid className={classes.linkMenu} item>
              <Typography variant="h5">
                <Link
                  className={classes.link}
                  href={`${match.url}/bookmarks`}
                  color="textSecondary"
                  underline="none"
                >
                  ブックマーク
                </Link>
              </Typography>
            </Grid>
            <Grid className={classes.linkMenu} item>
              <Typography variant="h5">
                <Link
                  className={classes.link}
                  href={`${match.url}`}
                  color="textSecondary"
                  underline="none"
                >
                  プロフィール
                </Link>
              </Typography>
            </Grid>
            <Grid className={classes.linkMenu} item>
              <Typography variant="h5">
                <Link
                  className={classes.link}
                  href={`${match.url}/questions`}
                  color="textSecondary"
                  underline="none"
                >
                  過去の質問
                </Link>
              </Typography>
            </Grid>
            <Grid className={classes.linkMenu} item>
              <Typography variant="h5">
                <Link
                  className={classes.link}
                  href={`${match.url}/advices`}
                  color="textSecondary"
                  underline="none"
                >
                  過去のアドバイス
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Hidden>
    </Fragment>
  );
};
