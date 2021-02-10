import React, { useState } from 'react';
import userServices from '../services/userServices.js';

export default function Form({ type, onRouteChange, onUpdateUser }) {
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '' });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setNewUser({ ...newUser, [name]: value });
  };
  const handleRegisterClick = () => onRouteChange('register');
  const handleClick = async () => {
    if (type === 'Register') {
      const registeredUser = await userServices.create(newUser);
      if (registeredUser.id) {
        onUpdateUser(registeredUser);
        onRouteChange('home');
      }
    } else {
      const signedInUser = await userServices.signIn(newUser);
      if (signedInUser.id) {
        onUpdateUser(signedInUser);
        onRouteChange('home');
      }
    }
  };
  return (
    <form onSubmit={(event) => event.preventDefault()}>
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l shadow-5 mw6 center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f2 fw6 ph0 mh0">{type}</legend>
              {type === 'Register' && (
                <div className="mt3">
                  <label className="db fw6 lh-copy f6" htmlFor="name">
                    Name
                  </label>
                  <input
                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                    type="text"
                    name="name"
                    id="name"
                    value={newUser.name}
                    onChange={handleChange}
                  />
                </div>
              )}
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email">
                  Email
                </label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="email"
                  value={newUser.email}
                  onChange={handleChange}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">
                  Password
                </label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                  autoComplete="new-password"
                  value={newUser.password}
                  onChange={handleChange}
                />
              </div>
            </fieldset>
            <div className="">
              <input
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value={type}
                onClick={handleClick}
              />
            </div>
            {type === 'Sign In' && (
              <div className="lh-copy mt3">
                <p
                  onClick={handleRegisterClick}
                  className="f6 link dim black db pointer"
                >
                  Register
                </p>
              </div>
            )}
          </div>
        </main>
      </article>
    </form>
  );
}
