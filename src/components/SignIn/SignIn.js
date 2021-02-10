import React from 'react';
import Form from '../Form/Form';

export default function SignIn({ onRouteChange, onUpdateUser }) {
  return (
    <Form
      type={'Sign In'}
      onRouteChange={onRouteChange}
      onUpdateUser={onUpdateUser}
    />
  );
}
