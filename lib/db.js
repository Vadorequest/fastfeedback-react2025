import firebase from './firebase';

const firestore = firebase.firestore();

export const createSite = async (name, url, user) => {
  console.log('createSite', name, url, user);
  const res = firestore.collection('sites')
    .add({
      name,
      url,
      owner: user?.uid,
      at: new Date(),
    })
    .then((data) => console.log('data', data))
    .catch((e) => console.error(e));
  console.log('res', await res);
  return res;
};
