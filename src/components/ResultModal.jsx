import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from 'react-dom';

const ResultModal = forwardRef(function ResultModal(props, ref) {
    const {
        targetTime,
        remainingTime,
        onReset
    } = props;

    const dialogRef = useRef();

    const userLost = remainingTime <= 0;
    const formattedRemainingTime = (remainingTime / 1000).toFixed(2);
    const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);

    useImperativeHandle(ref, () => {
        return {
            open() {
                dialogRef.current.showModal();
            }
        }
    });

    return createPortal(
        <dialog ref={dialogRef} className="result-modal" onClose={onReset}>
            {userLost && <h2>You lost!</h2>}
            {!userLost && <h2>Your score: {score}</h2>}
            <p>The target time was <strong>{targetTime}</strong> seconds.</p>
            {userLost ?
                <p>You ran out of time!</p>
                : <p>You stopped the timer with <strong>{formattedRemainingTime}</strong></p>}
            <form method="dialog" onSubmit={onReset}>
                <button>
                    Close
                </button>
            </form>
        </dialog>, 
        document.getElementById('modal')
    );
});

export default ResultModal;