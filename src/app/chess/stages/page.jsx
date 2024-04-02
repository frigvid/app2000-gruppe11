"use client";
import MyModal from '@ui/chess/stages/MyModal'
import { useState } from 'react';

export default function App() {

const opening = [
  {title: 'Ruy Lopez', description: 'details', id: 1},
  {title: 'London', description: 'details2222', id: 2},
  {title: 'Dutch', description: 'details3333', id: 3}
];

  return (
    <>
    <div className='flex justify-center items-center'>
      <div className='grid grid-cols-4 gap-4'>
        {opening.map((opening) => {
          return(
            <div className='p-4 bg-red-400 rounded-md max-h-32'>
            <h2>{opening.title}</h2>
            <p></p>
            <MyModal title={opening.title} details={opening.description}/>
          </div>
          )
        })}

     </div>
    </div>
    </>
  )
}