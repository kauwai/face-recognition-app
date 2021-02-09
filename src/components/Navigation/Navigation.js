import React from 'react';

export default function Navigation({ onRouteChange, route, onLogout }) {
  const handleClick = (destination) => onRouteChange(destination);
  const handleSignOut = () => {
    onLogout();
    handleClick('sign-in');
  };

  if (route === 'home') {
    return (
      <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <p
          onClick={handleSignOut}
          className="f3 link dim black underline pa3 pointer"
        >
          Sign Out
        </p>
      </nav>
    );
  } else {
    return (
      <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <p
          onClick={() => handleClick('sign-in')}
          className="f3 link dim black underline pa3 pointer"
        >
          Sign In
        </p>
        <p
          onClick={() => handleClick('register')}
          className="f3 link dim black underline pa3 pointer"
        >
          Register
        </p>
      </nav>
    );
  }
}
