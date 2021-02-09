import React, { useState } from 'react';

export default function SignIn({ onRouteChange, onUpdateUser }) {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const handleEmailChange = ({ target }) => setUserEmail(target.value);
  const handlePasswordChange = ({ target }) => setUserPassword(target.value);

  const handleSignInClick = () => {
    fetch('http://localhost:8080/signin', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: userEmail, password: userPassword }),
    })
      .then((response) => response.json())
      .then((user) => {
        if (user) {
          onUpdateUser(user);
          onRouteChange('home');
        }
      });
  };
  const handleRegisterClick = () => onRouteChange('register');
  return (
    <div>
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l shadow-5 mw6 center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f2 fw6 ph0 mh0">Sign In</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">
                  Email
                </label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                  value={userEmail}
                  onChange={handleEmailChange}
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
                  value={userPassword}
                  onChange={handlePasswordChange}
                />
              </div>
            </fieldset>
            <div className="">
              <input
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Sign in"
                onClick={handleSignInClick}
              />
            </div>
            <div className="lh-copy mt3">
              <p
                onClick={handleRegisterClick}
                className="f6 link dim black db pointer"
              >
                Register
              </p>
            </div>
          </div>
        </main>
      </article>
    </div>
  );
}
