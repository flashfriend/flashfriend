import React, { useEffect, useState } from 'react'
import NavBar from '../NavBar'
import Stack from '../Stack'
import { useAppDispatch } from '../../app/hooks';
import { selectDeck, selectCurrentCard, getDeckAsync } from '../../features/deck/deckSlice';

function Home() {
  const [username, setUsername] = useState('');
  const dispatch = useAppDispatch();


  useEffect(async () => {
    console.log('USEEFFECT FIRED IN HOME');

    const data = await fetch('http://localhost:3000/api/user');
    console.log(data);
    console.log('DATA RETRIEVED AT HOME');

    setUsername(username);
  }, [])
  return (
    <div>
      <NavBar />
      <Stack />
    </div>
  )
}

export default Home
