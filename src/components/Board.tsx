"use client";

import React, { useState } from "react";
import Square from "./Square";

const calculateWinner = (squares: string[], size: number) => {
  const lines = [];

  // For horizontal and vedrtical line winner
  for (let i = 0; i < size; i++) {
    lines.push(Array.from({ length: size }, (_, j) => i * size + j));
    lines.push(Array.from({ length: size }, (_, j) => j * size + i));
  }

  // For Diagonal line winner
  lines.push(Array.from({ length: size }, (_, i) => i * size + i));
  lines.push(Array.from({ length: size }, (_, i) => (i + 1) * size + (i + 1)));

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (
      line.every(
        (index) => squares[index] && squares[index] === squares[line[0]]
      )
    ) {
      return squares[line[0]];
    }
  }

  return null;
};

const Board = () => {
  const defaultValue = 3;
  const [size, setSize] = useState(defaultValue);
  const [squares, setSquares] = useState(Array(size * size).fill(null));
  const [nextTurn, setNextTurn] = useState(true);

  const handleClick = (i: number) => {
    if (calculateWinner(squares, size) || squares[i]) return;

    const newSquares = squares.slice();
    newSquares[i] = nextTurn ? "X" : "O";

    setSquares(newSquares);
    setNextTurn(!nextTurn);
  };

  const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSize = Number(e.target.value);
    if (newSize > 0) {
      setSize(newSize);
      setSquares(Array(newSize * newSize).fill(null));
      setNextTurn(true);
    }
  };

  const handleGenerateClick = () => {
    if (size > 0) {
      setSquares(Array(size * size).fill(null));
      setNextTurn(true);
    }
  };

  const isBoardFull = (squares: string[]) => {
    const noEmptySquare = squares.every((square) => square !== null);
    return noEmptySquare;
  };

  const winner = calculateWinner(squares, size);
  const drawGame = !winner && isBoardFull(squares);
  let result;
  if (winner) {
    result = "Winner: " + winner;
  } else if (drawGame) {
    result = "It's a draw!";
  } else {
    const nextPlayer = nextTurn ? "X" : "O";
    result = "Next Turn: " + nextPlayer;
  }

  const handleResetClick = () => {
    setSquares(Array(size * size).fill(null));
    setNextTurn(true);
  };

  return (
    <>
      <div>
        <input
          type="number"
          min={3}
          value={size}
          onChange={handleSizeChange}
          className="input-size"
          placeholder="Enter board size"
        />
        <button onClick={handleGenerateClick} className="generate-btn">
          Generate
        </button>
        <button onClick={handleResetClick} className="generate-btn">
          Reset
        </button>
      </div>
      <div className="status">{result}</div>
      {Array.from({ length: size }, (_, rowIndex) => (
        <div key={rowIndex} className="board-row">
          {Array.from({ length: size }, (_, colIndex) => {
            const index = rowIndex * size + colIndex;
            return (
              <Square
                key={index}
                value={squares[index]}
                onSquareClick={() => handleClick(index)}
              />
            );
          })}
        </div>
      ))}
    </>
  );
};

export default Board;
