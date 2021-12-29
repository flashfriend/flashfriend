import React, { useEffect, useState } from 'react'
import NavBar from '../NavBar'
import Stack from '../Stack'

function Home() {

  const fetchUsername = async () => {
    const response = await fetch('/api/userid');
    const body = await response.json();
    localStorage.setItem('ff_userid', body);
  }

  useEffect(() => {
    fetchUsername();
  }, [])

  return (
    <div>
      <NavBar />
      <Stack />
    </div>
  )
}

export default Home