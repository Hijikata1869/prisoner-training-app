import React, { Fragment, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  title: {
    marginTop: "2rem"
  }
}))


export const DeleteDialog = ({ deleteAction }) => {

  const classes = useStyles();

  const [open, setOpen] = useState(true);

  const hundleClose = () => {
    setOpen(false);
    window.location.reload();
  }

  return(
    <Fragment>
      <Dialog open={open}>
        <DialogTitle className={classes.title}>{"削除してよろしいですか？"}</DialogTitle>
        <DialogActions>
          <Button onClick={hundleClose}>キャンセル</Button>
          <Button onClick={deleteAction}>削除する</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}