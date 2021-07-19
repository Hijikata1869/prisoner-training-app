import React, { Fragment, useEffect } from 'react';
import { fetchHome } from '../apis/home';

export const Index = () => {
  
  useEffect(() => {
    fetchHome()
    .then((data) => 
      console.log(data)
    )
  },[])

  return(
    <Fragment>
      トップページ
    </Fragment>
  )
}