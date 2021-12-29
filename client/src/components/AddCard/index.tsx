import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment, useState } from 'react'
import { useAppDispatch } from '../../app/hooks'
import { addCardAsync } from '../../features/deck/deckSlice'

export default function AddCard({ isOpen, closeModal }: { isOpen: boolean, closeModal: any }) {
  const [ front, setFront ] = useState('')
  const [ back, setBack ] = useState('')

  const dispatch = useAppDispatch()

  const handleAddCard = async () => {
    let userid: any = localStorage.getItem('ff_userid')
    if (userid) {
      userid = Number(userid)
      dispatch(addCardAsync({ userid, front, back }))
        .then(data => console.log('handleAddCard', data))
        .then(() => {
          setFront('')
          setBack('')
        })
        .then(() => closeModal())
        .then(() => window.location.reload())
    } else alert('Error adding card!')
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-blue-100 opacity-60" />
            </Transition.Child>
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-lg p-6 my-8 overflow-hidden text-center align-middle transition-all transform bg-slate-100 shadow-xl rounded-2xl">
                <div className='flex flex-col' onClick={closeModal}>
                  <svg className="w-10 h-10 hover:text-amber-400 self-end mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Add New Flashcard
                </Dialog.Title>
                <div className="flex mt-2 w-full">
                  <form className="flex-1 pb-2 pt-6 flex flex-col items-stretch">
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Front of Card:
                      </label>
                      <textarea 
                        className="h-24 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        id="front" 
                        placeholder="What is FlashFriend?" 
                        value={front}
                        onChange={(e) => setFront(e.currentTarget.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Back of Card:
                      </label>
                      <textarea 
                        className="h-36 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        id="back" 
                        placeholder="FlashFriend is the ultimate flash card tool to help prepare developers for the job interview process." 
                        value={back}
                        onChange={(e) => setBack(e.currentTarget.value)}
                      />
                    </div>
                  </form>
                </div>

                <div className="w-30">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-slate-100 bg-amber-500 border border-transparent m-2 mt-0 rounded-md hover:bg-amber-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-amber-600"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-slate-100 bg-amber-500 border border-transparent m-2 mt-0 rounded-md hover:bg-amber-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-amber-600"
                    onClick={handleAddCard}
                  >
                    Add
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}