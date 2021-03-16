import firebase from './firebase';

const firestore = firebase.firestore();

export const createSite = async (name, url) => {
  console.log('createSite');
  const res = firestore.collection('sites')
    .add({
      name,
      url,
    })
    .then((data) => console.log('data', data))
    .catch((e) => console.error(e));
  console.log('res', await res);
  return res;
};
