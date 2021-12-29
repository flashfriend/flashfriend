import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useState } from 'react';
import { Card } from '../../features/deck/deckSlice';
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
  const handleEditCard = () => {
    console.log('Submitting card edits');
    closeModal();
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
