import React, { useState } from "react";

interface DragMoveProps {
  onPointerDown?: (e: React.PointerEvent<HTMLDivElement>) => void;
  onPointerUp?: (e: React.PointerEvent<HTMLDivElement>) => void;
  onPointerMove?: (e: React.PointerEvent<HTMLDivElement>) => void;
  onDragMove?: (e: React.PointerEvent<HTMLDivElement>) => void;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

const DragMove: React.FC<DragMoveProps> = ({
  onPointerDown = () => {},
  onPointerUp = () => {},
  onPointerMove = () => {},
  onDragMove = () => {},
  children,
  style,
  className,
}) => {
  const [isDragging, setIsDragging] = useState(false);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    onPointerDown && onPointerDown(e);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(false);
    onPointerUp && onPointerUp(e);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDragging) {
      onDragMove && onDragMove(e);
    } else {
      onPointerMove && onPointerMove(e);
    }
  };

  return (
    <div
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerMove={handlePointerMove}
      style={style}
      className={className}
    >
      {children}
    </div>
  );
};

export default DragMove;
