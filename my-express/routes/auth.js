// const { urlencoded } = require('express')
const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const router = express.Router();
const User = require('../models/User');



router.post('/register', async (req, res) => {

    const { username, password, name } = req.body //รับ username password name มาจาก body
    // simple validation
    if (!name || !username || !password) {
      return res.render('register', { message: 'Please try again' })
    }

    const passwordHash = bcrypt.hashSync(password, 10)
    const user = new User({
      name,
      username,
      password: passwordHash
    })

    await user.save()
    
    res.render('index',{User})
});

router.post('/login', passport.authenticate('local',{
    successRedirect: '/',
    failureRedirect:'/login'
}),
 async (req, res) => {
  const { username, password } = req.body ;

  return res.redirect('/');

//   const user = await User.findOne({
//     username
//   })
//   if (user) {
//     const isCorrect = bcrypt.compareSync(password, user.password)
//     if (isCorrect) {
//         req.session.user = user;
//         return res.redirect('/');
//     } else {
//         return res.render('login', { message: 'Username or Password incorrect' })
//     }
//   } else {
//         return res.render('login', { message: 'Username does not exist.' })
//   }

});
module.exports = router;