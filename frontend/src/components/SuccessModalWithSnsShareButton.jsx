import React from "react";
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

export const SuccessModalWithSnsShareButton = ({
  message,
  button,
  match,
  ogTitle,
  ogDesc,
}) => {
  const classes = useStyles();

  const ogUrl = `https://www.prisoner-training-app.com${match.url}/training_logs`;

  const head = document.getElementsByTagName("head")[0];

  // const metaTags = head.getElementsByTagName('meta');

  const ogTitleMeta = document.createElement("meta");
  ogTitleMeta.setAttribute("property", "og:title");
  ogTitleMeta.setAttribute("content", ogTitle);
  head.appendChild(ogTitleMeta);

  const ogTypeMeta = document.createElement("meta");
  ogTypeMeta.setAttribute("property", "og:type");
  ogTypeMeta.setAttribute("content", "artcle");
  head.appendChild(ogTypeMeta);

  const ogUrlMeta = document.createElement("meta");
  ogUrlMeta.setAttribute("property", "og:url");
  ogUrlMeta.setAttribute("content", ogUrl);
  head.appendChild(ogUrlMeta);

  const ogImageMeta = document.createElement("meta");
  ogImageMeta.setAttribute("property", "og:image");
  ogImageMeta.setAttribute("content", OgpImage);
  head.appendChild(ogImageMeta);

  const ogSiteNameMeta = document.createElement("meta");
  ogSiteNameMeta.setAttribute("property", "og:site_name");
  ogSiteNameMeta.setAttribute("content", "Prisoner Training App");
  head.appendChild(ogSiteNameMeta);

  const ogDescMeta = document.createElement("meta");
  ogDescMeta.setAttribute("property", "og:description");
  ogDescMeta.setAttribute("content", ogDesc);
  head.appendChild(ogDescMeta);

  const twitterCardMeta = document.createElement("meta");
  twitterCardMeta.setAttribute("name", "twitter:card");
  twitterCardMeta.setAttribute("content", "summary_large_image");
  head.appendChild(twitterCardMeta);

  const facebookAppIdMeta = document.createElement("meta");
  facebookAppIdMeta.setAttribute("property", "fb:app_id");
  facebookAppIdMeta.setAttribute("contnt", "850644569333854");
  head.appendChild(facebookAppIdMeta);

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
              <TwitterShareButton className={classes.twitterButton} url={ogUrl}>
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
};
