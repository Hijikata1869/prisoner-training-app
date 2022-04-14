import React, { useState } from "react";
import { Collapse, IconButton } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import CloseIcon from "@material-ui/icons/Close";

export const SuccessAlert = ({ message }) => {
  const [alertOpen, setAlertOpen] = useState(true);

  return (
    <Collapse in={alertOpen}>
      <Alert
        severity="success"
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              setAlertOpen(false);
              window.location.reload();
            }}
          >
            <CloseIcon />
          </IconButton>
        }
      >
        {message}
      </Alert>
    </Collapse>
  );
};
