"use client";
import MyModal from '@ui/chess/stages/MyModal'
import { useState } from 'react';

export default function App() {

function close(MyModal) {
    alert("Close", MyModal);
    //() => MyModal.setIsOpen(false);
}
function open(MyModal) {
    () => MyModal.openModal();
}

  return (
    <>
    <div className='flex justify-center'>
        <div className='p-4 bg-red-400 rounded-md'>
            <h2>Ruy Lopez</h2>
            <p></p>
            <MyModal/>
            <button onClick={() => openModal()}>Åpne</button>

        </div>
    </div>

    </>
  )
}