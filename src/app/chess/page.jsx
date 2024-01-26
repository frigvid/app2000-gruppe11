"use client";

import ChessGame from "../ui/chessboard/ChessGame"
export default function App() {





    return(
        <>


        <div className="flex justify-center items-center">
        <div>
            <button onClick={() => {alert("reset")}} className="bg-main text-foreground">Reset</button>
        </div>
            <ChessGame/>
        </div>
        </>
    )
}