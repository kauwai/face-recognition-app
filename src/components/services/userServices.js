const apiRoot = 'https://smart-brain-api-kauwai.herokuapp.com';

const create = async (user) => {
  try {
    const response = await fetch(`${apiRoot}/register`, {
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
    const response = await fetch(`${apiRoot}/signin`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
    const signedUser = await response.json();
    return signedUser;
  } catch (error) {
    console.log(error);
  }
};

const update = async (currentUser) => {
  try {
    const updatedUser = await fetch(`${apiRoot}/image`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(currentUser),
    });
    const jsonUser = await updatedUser.json();
    return jsonUser;
  } catch (error) {
    console.log(error);
  }
};

const getAll = async () => {
  try {
    const users = await fetch(apiRoot);
    const jsonUsers = await users.json();
    return jsonUsers;
  } catch (error) {
    console.log(error);
  }
};

const callClarifai = async (input) => {
  try {
    const response = await fetch(`${apiRoot}/apiCall`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input }),
    });
    const jsonResponse = await response.json();
    return jsonResponse;
  } catch (error) {
    console.log(error);
  }
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { create, signIn, update, getAll, callClarifai };
