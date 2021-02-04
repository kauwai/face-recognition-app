import React from 'react';

export default function Navigation({ onRouteChange }) {
  const handleClick = () => onRouteChange('sign-in');

  return (
    <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <p
        onClick={handleClick}
        className="f3 link dim black underline pa3 pointer"
      >
        Sign Out
      </p>
    </nav>
  );
}
