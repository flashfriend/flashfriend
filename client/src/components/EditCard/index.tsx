import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { Card, updateCardAsync } from '../../features/deck/deckSlice';
import AddUpdateModal from '../AddUpdateModal';

export default function EditCard({
  isOpen,
  closeModal,
  card,
}: {
  isOpen: boolean;
  closeModal: () => void;
  card: Card;
}) {
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');

  const dispatch = useAppDispatch();

  const handleEditCard = async () => {
    let userid: (string | number | null) = localStorage.getItem('ff_userid');
    if (userid) {
      userid = Number(userid);
      const { id } = card
      dispatch(updateCardAsync({ userid, front, back }))
        .then((data) => console.log('handleEditCard: ', data))
        .then(() => closeModal())
        .then(() => window.location.reload());
    } else alert('Error updating card!');
  };

  return (
    <AddUpdateModal
      card={card}
      isOpen={isOpen}
      closeModal={closeModal}
      handleModalSubmit={handleEditCard}
      instruction="Edit Flashcard"
      front={front}
      setFront={setFront}
      back={back}
      setBack={setBack}
    />
  );
}
