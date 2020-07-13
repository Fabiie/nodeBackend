const db = require('../database/db');
var bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const login = (request, response) => {
  const {correo, password} = request.body;
  db.pool.query('SELECT * FROM usuario  WHERE correo = $1', [correo]).then(res => {
    if (res.rowCount == 0) {
      response.send({ message: 'Usuario no existe.' });
    } else{
        const result = res.rows[0];
        if (result && bcrypt.compareSync(password, result.password)) {
          let token = generateToken(res.rows);
          response.send({ token });
        } else{
          response.send({ message: 'Contraseña incorrecta.' });;
        }
      }
  }).catch(e => response.send(e.stack));
}

const generateToken = (rows) => {
  const tokenData = {
    id: rows[0].id,
    nombre: rows[0].nombre,
    correo: rows[0].correo
  }
  const token = jwt.sign({ tokenData }, 'pRu38aN0d3', {
    expiresIn: 600 * 60 * 24
  });
  return (token);
}

const get = (request, response) => {
  db.pool.query('SELECT * FROM usuario').then(res => {
    response.send(res.rows);
  }).catch( e => response.send("Error"));
}

const getUser = (request, response) => {
  const {id} = request.params;
  db.pool.query('SELECT * FROM usuario WHERE id = $1', [id]).then(res => {
    response.send(res.rows);
  }).catch(e => response.send("Error"));
}

const create = (request, response) => {
  const {nombre, correo, password} = request.body;
  db.pool.query('INSERT INTO usuario(nombre, correo, password) VALUES ($1, $2, $3)', [nombre, correo, password]).then(res => {
    response.send("Usuario agregado correctamente");
  }).catch( e => response.send("Error"));
}

const update = (request, response) => {
  const {id} = request.params;
  const {nombre, correo, password} = request.body;
  db.pool.query('UPDATE usuario SET nombre = $2, correo = $3, password WHERE id = $1', [id, nombre, correo, password]).then(res => {
    response.send(res.rows);
  }).catch(e => response.send("Error"));
}

const borrar = (request, response) => {
  const {id} = request.params;
  db.pool.query('DELETE FROM usuario WHERE id = $1', [id]).then(res => {
    response.send(res.rows);
  }).catch(e => response.send("Error"));
}


module.exports = {
login,
create,
get,
getUser,
update,
borrar
}
