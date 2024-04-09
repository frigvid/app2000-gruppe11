"use client";
import MyModal from '@ui/chess/stages/MyModal'
import { getOpenings } from '@utils/game/get-gamedata';
import { useEffect, useState } from 'react';
import { createClient } from "@utils/supabase/client";

export default function App() {


const [opening, setOpening] = useState([]); 
setOpening(getOpenings);
console.log(opening);

  return (
    <>
    <div className='flex justify-center items-center'>
      <div className='grid grid-cols-4 gap-4'>
      {opening.map((opening) => {
          return(
            <div className='p-4 bg-red-400 rounded-md max-h-32'>
            <h2>{opening.name}</h2>
            <p></p>
            <MyModal title={opening.name} details={opening.desc} id={opening.id}/>
          </div>
          )
        })}

     </div>
    </div>
    </>
  )
}