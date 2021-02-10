import React from 'react';
import Form from '../Form/Form';

export default function Register({ onRouteChange, onUpdateUser }) {
  return (
    <Form
      type={'Register'}
      onRouteChange={onRouteChange}
      onUpdateUser={onUpdateUser}
    />
  );
}
