import React from 'react'

function Back({ text, back_id }: { text: string, back_id: number }) {

  // const editCard = () => {
  //   // TODO:
  // }

  return (
    <div className='flex flex-col p-3 h-full'>
      <div className='flex-1 font-semibold text-xl'>
        <h3>{text}</h3>
      </div>
      <button className='self-end'>
        <svg className="w-6 h-6" data-darkreader-inline-stroke="" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
        </svg>
      </button>
    </div>
  )
}

export default Back
