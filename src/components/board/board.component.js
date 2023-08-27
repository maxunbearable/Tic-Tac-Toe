import Square from '../square/square.component';
import {calculateWinner, getTurnStatus} from "../../utils/game.util";
import { Grid } from "@mui/material";
export default function Board({ xIsNext, squares, onPlay, setStatus }) {
    function handleClick(i) {
        if (squares[i] || calculateWinner(squares)) {
            return;
        }
        const nextSquares = squares.slice();
        if (xIsNext) {
            nextSquares[i] = "X";
        } else {
            nextSquares[i] = "O";
        }
        onPlay(nextSquares, i, nextSquares[i]);
    }

    const winner = calculateWinner(squares);


    setStatus(getTurnStatus(winner, squares, xIsNext));

    return (
        <Grid container className="board">
            {[...Array.from(Array(3).keys())].map((row) => (
                <Grid className={row !== 2 ? 'border-right' : ''} key={row + 'row_id'}>
                    {[...Array.from(Array(3).keys())].map(i => i * 3).map(column => (
                        <div key={column+row + 'cell_wrapper_id'} className={`
                            ${column === 3 ? 'center-column' : ''} 
                            ${winner?.line.includes(column+row) ? 'text-success' : ''}
                            ${squares.every(square => !!square) && !winner ? 'text-secondary' : ''} 
                        `}>
                            <Square
                                key={column+row}
                                value={squares[column+row]}
                                onSquareClick={() => handleClick(column+row)}
                            />
                        </div>
                    ))}
                </Grid>
            ))}
        </Grid>
    );
}