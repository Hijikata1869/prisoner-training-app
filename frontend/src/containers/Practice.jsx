import React, { Fragment, useState } from 'react';
import { TextField, Button } from '@material-ui/core';


export const Practice = () => {

  const sampleResolve = (value) => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(value);
      }, 1000);
    })
  }

  const sample = async () => {
    for (let i = 0; i < 5; i++ ) {
      const result = await sampleResolve(i);
      console.log(result);
    }
    return console.log('ループ終わり')
  }

  return (
    <Fragment>
      <Button variant="contained" color="primary" onClick={sample} >中身確認</Button>
    </Fragment>
  );
}