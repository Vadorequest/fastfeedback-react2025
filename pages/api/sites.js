import { getSitesByUser } from '../../lib/db';

const get = async (req, res) => {
  const { user } = req?.cookies || {};
  const userAsObject = JSON.parse(user);
  const userId = userAsObject?.id;
  const sites = await getSitesByUser(userId);

  res.status(200).json({
    sites,
  });
};

export default get;
