import React, { Fragment, useEffect } from 'react';

// apis
import { fetchHome } from '../apis/home';

// components
import { Header } from '../components/Header';

export const Index = () => {
  
  useEffect(() => {
    fetchHome()
    .then((data) => 
      console.log(data)
    )
  },[])

  return(
    <Fragment>
      <Header />
    </Fragment>
  )
}