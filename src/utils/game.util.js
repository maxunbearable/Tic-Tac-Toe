export function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return { name: squares[a], line: lines[i] };
        }
    }
    return null;
}

export function getMovesFromHistory(history, currentMove, jumpTo) {
    return history.map((moveDTO, id) => {
        let description;
        if (id > 0) {
            description = 'Go to move #' + id;
        }
        if (id === currentMove) {
            description = 'You are at move #' + id;
        }
        if (!id) {
            description = 'Go to game start';
        }
        return { id, description, jumpTo: () => jumpTo(id), coordinates: moveDTO.move };
    });
}

export function getCoordinatesFromId(id, name) {
    if (id < 3) {
        return `${name}: [1, ${id + 1}]`;
    } else if (id < 6) {
        return `${name}: [2, ${id - 3 + 1}]`;
    } else {
        return `${name}: [3, ${id - 6 + 1}]`;
    }
}

export function getTurnStatus(winner, squares, xIsNext) {
    if (winner) {
        return "Winner: " + winner.name;
    } else if (squares.every(square => !!square)) {
        return 'Tie!';
    } else {
        return "Next player: " + (xIsNext ? "X" : "O");
    }
}