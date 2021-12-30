import React from 'react';
import { useAppDispatch } from '../../app/hooks';
import { Card, deleteCardAsync } from '../../features/deck/deckSlice';

function Back({
  text,
  card,
  openModal,
  flipped,
  setFlipped,
}: {
  text: string;
  card: Card;
  openModal: () => void;
  flipped: string;
  setFlipped: (flipped: string) => void;
}) {
  const dispatch = useAppDispatch();

  const handleDelete = (e: React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLElement>) => {
    let userid: string | number | null = localStorage.getItem('ff_userid');
    if (userid) {
      userid = Number(userid);
      dispatch(deleteCardAsync(card))
        .then((data) => console.log('handleDelete: ', data))
        .then(() => window.location.reload());
    } else alert('Error deleting card!');
    e.stopPropagation();
  };

  const handleEdit = (e: React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLElement>) => {
    openModal();
    e.stopPropagation();
  };

  return (
    <div
      className="flex flex-col p-3 h-full z-70 relative"
      onClick={() => {
        flipped === 'front' ? setFlipped('back') : setFlipped('front');
      }}
      onTouchStart={() => {
        flipped === 'front' ? setFlipped('back') : setFlipped('front');
      }}
    >
      <button
        className="absolute -right-8 -top-8 z-100 cursor-pointer"
        onClick={(e) => handleDelete(e)}
        onTouchStart={(e) => handleDelete(e)}
      >
        <svg
          className="h-8 w-8 text-white fill-slate-800 hover:animate-spin"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {' '}
          <circle cx="12" cy="12" r="10" />{' '}
          <line x1="15" y1="9" x2="9" y2="15" />{' '}
          <line x1="9" y1="9" x2="15" y2="15" />
        </svg>
      </button>
      <div className="flex-1 font-semibold text-xl cursor-pointer">
        <h3>{text}</h3>
      </div>
      <button className="self-end cursor-pointer" onClick={(e) => handleEdit(e)} onTouchStart={(e) => handleEdit(e)}>
        <svg
          className="w-6 h-6"
          data-darkreader-inline-stroke=""
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
          ></path>
        </svg>
      </button>
    </div>
  );
}

export default Back;
