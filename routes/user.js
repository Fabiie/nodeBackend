module.exports = function(app) {
  var user = require('../modelos/user');

  app.route('/login')
    .post(user.login);

  app.route('/user')
    .get(user.get);

  app.route('/user/:id')
    .get(user.getUser);

  app.route('/user')
    .post(user.create);

  app.route('/user/:id')
    .put(user.update);

  app.route('/user/:id')
    .delete(user.borrar);
}
