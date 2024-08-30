const { UserProfile } = require('../models');
const {sendResponse} = require('../utils/responseHelper');


const ping = async (req, res) => {
  try {
    const userData = req.user;
    console.log("User Data: ", userData);

    const UID = userData.uid;
    // const user = await Person.findById(uid);
    const pingDAta = await UserProfile.findOne({
      where: { UID }
    });

    sendResponse(res, 200, 'Ping-Pong Test Successful', {profile: pingDAta });
  } catch (error) {
    console.error('Error occurred while querying the database:', error);
    sendResponse(res, 500, 'Internal Server Error');
  }
};

module.exports = { ping };
