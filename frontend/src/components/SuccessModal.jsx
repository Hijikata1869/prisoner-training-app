import React from "react";
import {
  Backdrop,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  backdropCard: {
    padding: "50px",
  },
}));

export const SuccessModal = ({ message, button }) => {
  const classes = useStyles();

  return (
    <Backdrop className={classes.backdrop} open={true}>
      <Card className={classes.backdropCard}>
        <CardContent>
          <Typography variant="h5" component="h2">
            {message}
          </Typography>
        </CardContent>
        <CardActions>{button}</CardActions>
      </Card>
    </Backdrop>
  );
};
