import TinderCard from 'react-tinder-card';
import Front from './Front';
import Back from './Back';
import React, { useState, useRef, useEffect } from 'react';
import './Stack.css';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  selectDeck,
  getDeckAsync,
  Card,
} from '../../features/deck/deckSlice';
import EditCard from '../EditCard';

export function mapRef(arr: Card[]) {
  const childRefs = arr.map((i: Card) => React.createRef());
  return childRefs;
}

function Stack() {
  // TODO: The 'cards' variable will be replaced with a call to the Redux store to grab the user's cards using useSelector() and a .map() to render a card component with an index passed into the functions (onSwipe) for each object.
  const dispatch = useAppDispatch();
  const deck = useAppSelector(selectDeck);

  const [currentIndex, setCurrentIndex] = useState<number>(deck.length - 1);
  const [flipped, setFlipped] = useState<string>('front');
  const [childRefs, setChildRefs] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const currentIndexRef = useRef(currentIndex);

  useEffect(() => {
    dispatch(getDeckAsync()).then((data) => {
      const newRefs = mapRef(data.payload);
      setChildRefs(newRefs);
      setCurrentIndex(data.payload.length - 1);
    });
  }, []);

  // function mapRef(arr: Card[]) {
  //   const childRefs = arr.map((i: Card) => React.createRef());
  //   return childRefs;
  // }

  const updateCurrentIndex = (val: number) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canGoBack = currentIndex < deck.length - 1;
  const canSwipe = currentIndex >= 0 && currentIndex < deck.length && deck.length > 1;

  const swiped = (index: number) => {
    console.log('swiped', index);
    updateCurrentIndex(index - 1);
  };

  const swipe = async (dir: string) => {
    // if the direction is right & its the last card, shuffle and reset the deck
    if (canSwipe && currentIndex < deck.length) {
      console.log(canSwipe, currentIndex, deck.length)
      await childRefs[currentIndex].current.swipe(dir);
    }
  };

  const goBack = async () => {
    if (!canGoBack) {
      return;
    }
    const newIndex = currentIndex + 1;
    updateCurrentIndex(newIndex);
    await childRefs[newIndex].current.restoreCard();
  };

  function closeModal() {
    setModalIsOpen(false);
  }

  function openModal() {
    console.log('current card: ', deck[currentIndex])
    setModalIsOpen(true);
  }

  return (
    <>
      <div
        className={`
      flex flex-col
      w-full items-center
      p-20
    `}
    >
      {/* <h1 className='font-bold text-neutral-900 text-xl mb-5' >Let's study!</h1> */}
      <div 
        className="cardContainer" 
        onClick={() => {
          flipped === 'front' ? setFlipped('back') : setFlipped('front');
        }}
        >
        {deck.map((card, index) => (
          <TinderCard
            ref={childRefs[index] as any}
            className="swipe"
            key={card.id + index}
            onSwipe={() => swiped(index)}
            
          >
            <div className="card bg-slate-200 border-amber-500 border-2">
              {flipped === 'front' ? (
                <Front text={card.front} front_id={card.id} openModal={openModal} />
              ) : (
                <Back text={card.back} back_id={card.id} openModal={openModal} />
              )}
            </div>
          </TinderCard>
        ))}
      </div>

        <div className="buttons">
          <button className="button bg-amber-500" onClick={() => goBack()}>
            Back
          </button>
          <button
            className="button bg-amber-500"
            onClick={() => {
              flipped === 'front' ? setFlipped('back') : setFlipped('front');
            }}
          >
            Flip
          </button>
          <button
            className="button bg-amber-500"
            onClick={() => swipe('right')}
          >
            Next
          </button>
        </div>
      </div>
      <EditCard
        isOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
        closeModal={closeModal}
        card={deck[currentIndex]}
      />
    </>
  );
}

export default Stack;
