/*import model from '../models';
let jwt    = require('jsonwebtoken')
const user = model.User;

  const userSignIn = (req, res) => {
    user.findOne({ where: {
    username: req.body.username
  }
  }, function(err, user) {

    if (err) throw err;

    if (user) {
      res.json({ success: false, message: 'Authentication failed. Username not found.' });
    } else if (user) {

      // check if password matches
      if (user.password != req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {

        // if user is found and password is right
        // create a token with only our given payload
    // we don't want to pass in the entire user since that has the password
    const payload = {
      admin: user.admin 
    };
        let token = jwt.sign(payload, app.get('superSecret'), {
          expiresInMinutes: 1440 // expires in 24 hours
        });

        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Authentication sucessful',
          token: token
        });
      }   

    }

  });

  
};
export default {
  userSignIn
}
*/