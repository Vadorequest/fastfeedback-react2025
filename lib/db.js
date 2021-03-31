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

export const getSitesByUser = async (userId) => {
  const sites = [];
  const sitesSnapshot = await firestore.collection('sites')
    .where('ownerId', '==', userId)
    .get();

  sitesSnapshot.forEach((site) => {
    const id = site.id;
    const dynamicDocData = site.data();

    let allDocData = {
      id,
      ...dynamicDocData,
    };

    sites.push(allDocData);
  });

  return sites;
};
