import React, { useState } from "react";
import Board from "../board/board.component";
import { Box, Divider, Step, StepLabel, Stepper, Switch, Typography } from "@mui/material";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import MovingComponent from "react-moving-text";
import { getCoordinatesFromId, getMovesFromHistory } from "../../utils/game.util";
export default function Game() {
    const [history, setHistory] = useState([{ squares: Array(9).fill(null), move: '' }]);
    const [currentMove, setCurrentMove] = useState(0);
    const [status, setStatus] = useState();
    const xIsNext = currentMove % 2 === 0;
    const currentSquares = history[currentMove] ? history[currentMove].squares : [];

    function handlePlay(nextSquares, id, name) {
        const nextHistory = [...history.slice(0, currentMove + 1), { squares: nextSquares, move: getCoordinatesFromId(id, name) }];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }

    function jumpTo(nextMove) {
        setCurrentMove(nextMove);
    }

    const moves = getMovesFromHistory(history, currentMove, jumpTo);

    return (
        <Box>
            <MovingComponent
                type="glowing"
                duration="10000ms"
                delay="0s"
                direction="normal"
                timing="ease"
                iteration="5"
                fillMode="none">
                <h1 className="text-center main-header">
                    Tic Tac Toe
                </h1>
            </MovingComponent>
            <Divider variant="middle" className="mb-3"/>
            <div className='d-flex justify-content-center'>
                <Stepper className="mb-3 " activeStep={currentMove} alternativeLabel style={{width: (moves.length + 1) * 130 +'px'}}>
                    {moves.map((move) => (
                        <Step key={move.id} onClick={move.jumpTo} className="step">
                            <StepLabel icon={move.id || '0'}>
                                <span>{move.description}</span><br/>
                                <span>{move.coordinates}</span>
                            </StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </div>
            <Divider variant="middle" className="mb-3"/>
            <Typography gutterBottom variant="h4" component="div" className={`text-center mb-3 
                ${status?.toString().includes('Win') ? 'text-success' : ''} 
                ${status?.toString().includes('Tie') ? 'text-secondary' : ''}`
            }>
                {status}
            </Typography>
            <Divider variant="middle" className="mb-4"/>
            <Box  className="game d-flex justify-content-center">
                <Box  className="mx-5 ">
                    <Board setStatus={setStatus} xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
                </Box >
            </Box >
        </Box>
    );
}