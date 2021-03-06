import TinderCard from 'react-tinder-card';
import Front from './Front';
import Back from './Back';
import React, { useState, useRef, useEffect, Children } from 'react';
import './Stack.css';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectDeck, getDeckAsync, Card } from '../../features/deck/deckSlice';
import EditCard from '../EditCard';


/* Attempting to work around type errors resulting from improper RefObject typing
 in react-tinder-card: see https://github.com/3DJakob/react-tinder-card/issues/74
 */
interface CurrentMethods {
  restoreCard(): Promise<void>;
  swipe(dir: 'right' | 'left'): Promise<void>;
}
interface TinderCardRef {
  current: CurrentMethods;
}


export function mapRef(arr: Card[]): React.RefObject<TinderCardRef>[] {
  const childRefs = arr.map((i: Card) => React.createRef<TinderCardRef>());
  console.log('childRefs: ', typeof childRefs[0]);
  return childRefs;
}

function Stack() {
  const dispatch = useAppDispatch();
  const deck = useAppSelector(selectDeck);

  const [currentIndex, setCurrentIndex] = useState<number>(deck.length - 1);
  const [flipped, setFlipped] = useState<string>('front');
  const [childRefs, setChildRefs] = useState<React.RefObject<TinderCardRef>[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const currentIndexRef = useRef(currentIndex);

  useEffect(() => {
    dispatch(getDeckAsync()).then((data) => {
      // const newRefs: React.RefObject<TinderCardRef>[] = mapRef(data.payload);
      setChildRefs(mapRef(data.payload));
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
  const canSwipe =
    currentIndex >= 0 && currentIndex < deck.length && deck.length > 1;

  const swiped = (index: number) => {
    // console.log('swiped', index);
    updateCurrentIndex(index - 1);
  };

  const swipe = async (dir: string) => {
    // if the direction is right & its the last card, shuffle and reset the deck
    if (canSwipe && currentIndex < deck.length) {
      // console.log(canSwipe, currentIndex, deck.length)
      const currentRef = childRefs[currentIndex];
      await currentRef.current.swipe(dir);
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
    console.log('current card: ', deck[currentIndex]);
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
        <div className="cardContainer">
          {deck.map((card, index) => (
            <TinderCard
              ref={childRefs[index] as any}
              className="swipe"
              key={card.id + index}
              onSwipe={() => swiped(index)}
            >
              <div className="card bg-slate-200 border-amber-500 border-2">
                {flipped === 'front' ? (
                  <Front
                    text={card.front}
                    card={card}
                    openModal={openModal}
                    flipped={flipped}
                    setFlipped={setFlipped}
                  />
                ) : (
                  <Back
                    text={card.back}
                    card={card}
                    openModal={openModal}
                    flipped={flipped}
                    setFlipped={setFlipped}
                  />
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
