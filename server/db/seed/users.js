var mongoose = require('mongoose'),
  User = mongoose.model('User');

function seed(){
  var users = [
      {
          email: 'testing@fsa.com',
          password: 'password',
          isAdmin: true
      },
      {
          email: 'obama@gmail.com',
          password: 'potus'
      },
      {
        email: 'jarjar@gmail.com',
        password: 'binks'
      },
      {
        email: 'darth@gmail.com',
        password: 'father'
      },
      {
        email: 'han@gmail.com',
        password: 'solo'
      }
  ];
  console.log('seeding users...');
  return User.create(users);
}

module.exports = seed;
