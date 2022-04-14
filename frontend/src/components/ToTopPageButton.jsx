import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";

export const ToTopPageButton = () => {
  const history = useHistory();

  return (
    <Button
      variant="contained"
      color="primary"
      fullWidth
      onClick={() => {
        history.push("/");
        window.location.reload();
      }}
    >
      アプリに戻る
    </Button>
  );
};
