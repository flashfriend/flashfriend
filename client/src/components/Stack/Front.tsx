import React from 'react'

function Front({ text, front_id }: { text: string, front_id: number }) {

  // const editCard = () => {
  //   // TODO:
  // }

  return (
    <div className='flex flex-col p-3 h-full'>
      <div className='flex-1 font-semibold text-xl'>
        <h3>{text}</h3>
      </div>
      {/* <button className='self-end bg-slate-600 p-2 rounded-xl text-slate-50'>Edit</button> */}
    </div>
  )
}

export default Front 