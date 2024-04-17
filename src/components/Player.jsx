import React, { useState, useRef } from "react";

export default function Player() {
    const [playerName, setPlayerName] = useState('');

    const playerNameRef = useRef();

    function handleClick() {
        setPlayerName(playerNameRef.current.value);
        playerNameRef.current.value = '';
    }

    return (
        <section id="player">
            <h2>Welcome {playerName || 'unknown entity'}</h2>
            <p>
                <input
                    ref={playerNameRef}
                    type="text" />
                <button onClick={handleClick}>Set Name</button>
            </p>
        </section>
    );
}
