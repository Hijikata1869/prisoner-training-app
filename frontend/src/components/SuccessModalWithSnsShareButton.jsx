import React, { memo } from "react";
import {
  Backdrop,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  TwitterIcon,
  TwitterShareButton,
  FacebookIcon,
  FacebookShareButton,
} from "react-share";

// images
import OgpImage from "../images/ogp.svg";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  backdropCard: {
    padding: "50px",
  },
  snsButtonArea: {
    marginTop: "1rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  twitterButton: {
    marginTop: "0.5rem",
    marginRight: "1rem",
  },
}));

// eslint-disable-next-line react/display-name
export const SuccessModalWithSnsShareButton = memo(({
  message,
  button,
  match,
  ogTitle,
  ogDesc,
}) => {
  const classes = useStyles();

  const ogUrl = `https://www.prisoner-training-app.com${match.url}/training_logs`;

  // const head = document.getElementsByTagName("head")[0];
  // const firstLinkTag = head.getElementsByTagName('link')[0];

  // const metaTags = head.getElementsByTagName('meta');

  // const ogDescMeta = document.createElement("meta");
  // ogDescMeta.setAttribute("property", "og:description");
  // ogDescMeta.setAttribute("content", ogDesc);
  // head.insertBefore(ogDescMeta, firstLinkTag);

  return (
    <>
      <Backdrop className={classes.backdrop} open={true}>
        <Card className={classes.backdropCard}>
          <CardContent>
            <Typography variant="h5" component="h2">
              {message}
            </Typography>
          </CardContent>
          <CardActions>{button}</CardActions>
          <CardActions className={classes.snsButtonArea}>
            <div>
              <Typography>記録をシェア</Typography>
            </div>
            <div>
              <TwitterShareButton className={classes.twitterButton} url={ogUrl} title={ogTitle}>
                <TwitterIcon size={48} round />
              </TwitterShareButton>
              <FacebookShareButton url={ogUrl}>
                <FacebookIcon size={48} round />
              </FacebookShareButton>
            </div>
          </CardActions>
        </Card>
      </Backdrop>
    </>
  );
});
