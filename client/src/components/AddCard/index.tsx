import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment, useState } from 'react'
import AddUpdateModal from '../AddUpdateModal'
import { useAppDispatch } from '../../app/hooks'
import { addCardAsync } from '../../features/deck/deckSlice'

export default function AddCard({ isOpen, closeModal }: { isOpen: boolean, closeModal: () => void }) {
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');

  const dispatch = useAppDispatch()

  const handleAddCard = async () => {
    let userid: any = localStorage.getItem('ff_userid')
    if (userid) {
      userid = Number(userid)
      dispatch(addCardAsync({ userid, front, back }))
        .then(data => console.log('handleAddCard', data))
        .then(() => closeModal())
        .then(() => window.location.reload())
    } else alert('Error adding card!')
  }

  return (
    <AddUpdateModal
      card={null}
      isOpen={isOpen}
      closeModal={closeModal}
      handleModalSubmit={handleAddCard}
      instruction='Add New FlashCard'
      front={front}
      setFront={setFront}
      back={back}
      setBack={setBack}
    />
  )
}