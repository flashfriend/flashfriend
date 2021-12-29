import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useState } from 'react';
import AddUpdateModal from '../AddUpdateModal';

export default function EditCard({
  isOpen,
  closeModal,
  card
}: {
  isOpen: boolean;
  closeModal: () => void;
  card: React.MutableRefObject<number>;
}) {
  const handleEditCard = async () => {
    // update redux state (and database)
    // close modal
  };

  return (
    <AddUpdateModal
      card={card}
      isOpen={isOpen}
      closeModal={closeModal}
      handleModal={handleEditCard}
      instruction="Edit FlashCard"
    />
  );
}
