import React from 'react';

export default function Rank({ currentUser, ranking }) {
  const { name } = currentUser;
  return (
    <div>
      <div className="white f3">{`${name}, your current rank is...`}</div>
      <div className="white f1">{`#${ranking}`}</div>
    </div>
  );
}
