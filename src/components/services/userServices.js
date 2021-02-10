const create = async (user) => {
  try {
    const response = await fetch('http://localhost:8080/register', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
    const newUser = await response.json();
    return newUser;
  } catch (error) {
    console.log(error);
  }
};

const signIn = async (user) => {
  try {
    const response = await fetch('http://localhost:8080/signin', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
    const signedUser = await response.json();
    console.log(signedUser.id);
    return signedUser;
  } catch (error) {
    console.log(error);
  }
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { create, signIn };
