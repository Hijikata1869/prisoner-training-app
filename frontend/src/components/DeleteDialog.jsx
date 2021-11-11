import React, { Fragment, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';


export const DeleteDialog = ({ deleteAction }) => {

  const [open, setOpen] = useState(true);

  const hundleClose = () => {
    setOpen(false);
    window.location.reload();
  }

  return(
    <Fragment>
      <Dialog open={open}>
        <DialogTitle>{"削除してよろしいですか？"}</DialogTitle>
        <DialogActions>
          <Button onClick={hundleClose}>キャンセル</Button>
          <Button onClick={deleteAction}>削除する</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}