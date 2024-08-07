"use client";
import React, { useState } from "react";

const Square = ({
  value,
  onSquareClick,
}: {
  value: string | null;
  onSquareClick: () => void;
}) => {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
};

export default Square;
