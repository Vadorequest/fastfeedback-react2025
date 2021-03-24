import firebase from './firebase';

const firestore = firebase.firestore();

export const createSite = async (data, user) => {
  console.log('createSite', data, user);
  const siteToCreate = {
    name: data.name,
    url: data.url,
    ownerId: user.uid,
  };

  const res = firestore.collection('sites')
    .add(siteToCreate)
    .then((data) => console.log('data', data))
    .catch((e) => console.error(e));
  console.log('res', await res);
  return res;
};

export const getSitesByUser = async (user) => {
  const res = firestore.collection("sites")
    .where("owner", "==", user?.uid)
    .get()
    .then((querySnapshot) => {
      console.log(querySnapshot)
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });

  return res;
}
