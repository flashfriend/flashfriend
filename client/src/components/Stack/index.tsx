import TinderCard from 'react-tinder-card';
import Front from './Front';
import Back from './Back';
import React, { useState, useMemo, useRef } from 'react';
import './Stack.css';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectDeck } from '../../features/deck/deckSlice';


function Stack() {
  // TODO: The 'cards' variable will be replaced with a call to the Redux store to grab the user's cards using useSelector() and a .map() to render a card component with an index passed into the functions (onSwipe) for each object.
  const dispatch = useAppDispatch();
  const deck = useAppSelector(selectDeck);

  const [currentIndex, setCurrentIndex] = useState<number>(deck.length - 1);
  const [flipped, setFlipped] = useState<string>('front');


  const currentIndexRef = useRef(currentIndex);

  // const childRefs: React.RefObject<any>[] = useMemo(
  //   () =>
  //     Array(cards.length)
  //       .fill(0)
  //       .map((i) => React.createRef()),
  //   []
  // );

  const childRefs = useMemo(
    () => (
      deck.map(i => React.createRef())
    ), []
  )

  const updateCurrentIndex = (val: number) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canGoBack = currentIndex < deck.length - 1;
  const canSwipe = currentIndex >= 0;

  const swiped = (index: number) => {
    updateCurrentIndex(index - 1);
  };

  const swipe = async (dir: string) => {
    if (canSwipe && currentIndex < deck.length) {
      await childRefs[currentIndex].current.swipe(dir);
    }
  };

  const goBack = async () => {
    if (!canGoBack) return;
    const newIndex = currentIndex + 1;
    updateCurrentIndex(newIndex);
    await childRefs[newIndex].current.restoreCard();
  };

  // TODO: Create a flipCard function to switch to the other side of the card.

  return (
    <div
      className={`
      flex flex-col
      w-full items-center
      p-20
    `}
    >
      {/* <h1 className='font-bold text-neutral-900 text-xl mb-5' >Let's study!</h1> */}
      <div className="cardContainer">
        {deck.map((card, index) => (
          <TinderCard
            ref={childRefs[index] as any}
            className="swipe"
            key={card.id}
            onSwipe={() => swiped(index)}
          >
            <div className="card bg-slate-200 border-amber-500 border-2">
              {flipped === 'front' ? (
                <Front text={card.front} front_id={card.id}/>
              ) : (
                <Back text={card.back} back_id={card.id}/>
              )}
            </div>
          </TinderCard>
        ))}
      </div>

      <div className="buttons">
        <button className='button bg-amber-500' onClick={() => goBack()}>Back</button>
        <button
          className="button bg-amber-500"
          onClick={() => {
            flipped === 'front' ? setFlipped('back') : setFlipped('front');
          }}
        >
          Flip
        </button>
        <button className="button bg-amber-500" onClick={() => swipe('right')}>
          Next
        </button>
      </div>
    </div>
  );
}

export default Stack;
