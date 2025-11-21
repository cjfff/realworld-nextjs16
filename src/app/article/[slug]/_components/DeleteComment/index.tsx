"use client"

export const DeleteComment = ({ action }: { action: Function }) => {
  return (
    <span className="mod-options" onClick={() => action()}>
      <i className="ion-trash-a"></i>
    </span>
  );
};