import TinderCard from 'react-tinder-card'
import Front from './Front'
import Back from './Back'
import React, { useState, useMemo, useRef } from 'react'
import './Stack.css'

const cards = [
  {
    id: 1,
    front: 'What is React?',
    back: 'A declarative, efficient, and flexible JavaScript library for building user interfaces.'
  },
  {
    id: 2,
    front: 'What is Redux?',
    back: 'A predictable state container for JavaScript apps.'
  },
  {
    id: 2,
    front: 'What is Docker?',
    back: 'A containerization platform for distributed applications.'
  },
]

function Stack() {

  // TODO: The 'cards' variable will be replaced with a call to the Redux store to grab the user's cards using useSelector() and a .map() to render a card component with an index passed into the functions (onSwipe) for each object.

  const [currentIndex, setCurrentIndex] = useState(cards.length - 1)
  const [flipped, setFlipped] = useState('front')
  const currentIndexRef = useRef(currentIndex)

  const childRefs: any = useMemo(
    () =>
      Array(cards.length)
        .fill(0)
        .map((i) => React.createRef()),
    []
  )

  const updateCurrentIndex = (val: number) => {
    setCurrentIndex(val)
    currentIndexRef.current = val
  }

  const canGoBack = currentIndex < cards.length - 1
  const canSwipe = currentIndex >= 0

  const swiped = (index: number) => {
    updateCurrentIndex(index - 1)
  }

  const swipe = async (dir: string) => {
    if (canSwipe && currentIndex < cards.length) {
      await childRefs[currentIndex].current.swipe(dir)
    }
  }

  const goBack = async () => {
    if (!canGoBack) return
    const newIndex = currentIndex + 1
    updateCurrentIndex(newIndex)
    await childRefs[newIndex].current.restoreCard()
  }

  // TODO: Create a flipCard function to switch to the other side of the card.

  return (
    <div className={`
      flex flex-col
      w-full items-center
      p-20
    `}>
      {/* <h1 className='font-bold text-neutral-900 text-xl mb-5' >Let's study!</h1> */}
      <div className='cardContainer'>
        {cards.map((card, index) => (
          <TinderCard
            ref={childRefs[index]}
            className='swipe'
            key={card.id}
            onSwipe={() => swiped(index)}
          >
            <div className='card bg-slate-200 border-amber-500 border-2'>
              { flipped === "front" ? <Front text={card.front} /> : <Back text={card.back} /> }
            </div>
          </TinderCard>
        ))}
      </div>

      <div className='buttons'>
        <button className='button bg-amber-500' onClick={() => goBack()}>Go Back</button>
        <button className='button bg-amber-500' onClick={() => swipe('left')}>Flip</button>
        <button className='button bg-amber-500' onClick={() => swipe('right')}>Next</button>
      </div>
    </div>
  )
}

export default Stack
