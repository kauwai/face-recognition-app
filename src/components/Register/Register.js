import React, { useState } from 'react';

export default function Register({ onRouteChange, onUpdateUser }) {
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '' });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleClick = () => {
    fetch('http://localhost:8080/register', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser),
    })
      .then((response) => response.json())
      .then((newUser) => {
        if (newUser) {
          onUpdateUser(newUser);
          onRouteChange('home');
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <form onSubmit={(event) => event.preventDefault()}>
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l shadow-5 mw6 center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f2 fw6 ph0 mh0">Register</legend>
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
                value="Register"
                onClick={handleClick}
              />
            </div>
          </div>
        </main>
      </article>
    </form>
  );
}
