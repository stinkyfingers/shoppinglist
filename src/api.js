const host = 'http://localhost:8084'

export const googleUser = async(token) => {
  const url = `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token}`;
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  });
  const data = await res.json();
  if (res.status !== 200) {
    return { error: data.error };
  }
  return data;
};

export const loginUser = async(token, user) => {
  const url = `${host}/user/login`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(user)
  });
  const data = await res.json();
  if (res.status !== 200) {
    return { error: data.error };
  }
  return data;
};

export const listUsers = async(token) => {
  const url = `${host}/users`;
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  const data = await res.json();
  if (res.status !== 200) {
    return { error: data.error };
  }
  return data;
};

export const listCollections = async(token) => {
  const url = `${host}/collections`;
  return await makeRequest(url, 'GET', token);
};

export const getCollection = async(token, id) => {
  const url = `${host}/collection/${id}`;
  return await makeRequest(url, 'GET', token);
};

export const saveCollection = async(token, collection) => {
  const url = `${host}/collection`;
  return await makeRequest(url, 'POST', token, collection);
};

const makeRequest = async(url, method, token, body) => {
  const res = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(body)
  });
  const data = await res.json();
  if (res.status !== 200) {
    return { error: data.error };
  }
  return data;
}
