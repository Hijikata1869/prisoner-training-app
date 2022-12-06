import React from "react";
import { useHistory } from "react-router-dom";
import { Button, Container, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

// images
import Image404 from "../images/404image.svg";

const useStyles = makeStyles(() => ({
  imageContainer: {
    paddingTop: "2rem",
  },
  secondWrapper: {
    marginTop: "4rem",
    paddingRight: "2rem",
    paddingLeft: "2rem",
  },
  backButton: {
    marginTop: "2rem",
  },
  image404: {
    height: "200px",
    width: "auto",
  },
}));

export const Page404 = () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <>
      <div className="firstWrapper">
        <Container className={classes.imageContainer}>
          <Grid container justifyContent="center">
            <Grid item>
              <img className={classes.image404} src={Image404} alt="404image" />
            </Grid>
          </Grid>
        </Container>
      </div>
      <div className={classes.secondWrapper}>
        <Grid container alignItems="center" direction="column">
          <Grid item>
            <Typography variant="h5" gutterBottom>
              お探しのページは見つかりませんでした
            </Typography>
          </Grid>
          <Button
            className={classes.backButton}
            variant="outlined"
            color="primary"
            onClick={() => history.push("/")}
          >
            トップページに戻る
          </Button>
          <Grid item></Grid>
        </Grid>
      </div>
    </>
  );
};
