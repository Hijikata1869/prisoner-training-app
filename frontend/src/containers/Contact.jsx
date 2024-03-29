import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Helmet, HelmetProvider } from "react-helmet-async";

const useStyles = makeStyles(() => ({
  contactContainer: {
    padding: "2rem",
  },
  pageTitle: {
    marginBottom: "2rem",
  },
  contactParagraph: {
    marginBottom: "1rem",
    marginLeft: "1rem",
  },
  twitterWrapper: {
    marginTop: "1rem",
    marginLeft: "2rem",
  },
  mailAdressWrapper: {
    marginLeft: "2rem",
  },
}));

export const Contact = () => {
  const classes = useStyles();

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>お問い合わせ</title>
        </Helmet>
      </HelmetProvider>
      <Grid className={classes.contactContainer} container direction="column">
        <Grid item>
          <Typography className={classes.pageTitle} variant="h4">
            お問い合わせ
          </Typography>
        </Grid>
        <Grid className={classes.contactParagraph} item>
          <Typography>
            アプリに関するお問い合わせや、何か気になることがございましたら下記のいずれかまでご連絡いただけますと幸いです。
          </Typography>
        </Grid>
        <Grid className={classes.mailAdressWrapper} item>
          <Typography variant="subtitle2" color="textSecondary">
            開発者メールアドレス
          </Typography>
          <Typography>liv.knk@gmail.com</Typography>
        </Grid>
        <Grid className={classes.twitterWrapper} item>
          <Typography variant="subtitle2" color="textSecondary">
            開発者Twitter
          </Typography>
          <Typography>@ehn1869</Typography>
        </Grid>
      </Grid>
    </>
  );
};
