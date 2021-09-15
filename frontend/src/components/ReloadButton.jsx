import React from 'react';
import { Button } from '@material-ui/core';

export const ReloadButton = () => {

  return(
    <Button 
      variant="contained" 
      color="primary" 
      fullWidth 
      onClick={() =>{
        window.location.reload();
      }} 
    >
      アプリに戻る
    </Button>
  );
}