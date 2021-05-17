const User = require("../models/User");

exports.getPrivateDate = async (req, res, next) => {
  const { email } = req.user;
  try {
    const user = await User.findOne({ email });
    if (user) {
      res.status(200).json({
        success: true,
        user
      });
    } else {
      res.status(200).json({
        success: false,
        data: 'User Not Found'
      });
    }
  } catch (error) {
    next(error);
  }  
};
