import React from 'react';

export default function Rank({ currentUser }) {
  const { name } = currentUser;
  return (
    <div>
      <div className="white f3">{`${name}, your current rank is...`}</div>
      <div className="white f1">{'#1'}</div>
    </div>
  );
}
