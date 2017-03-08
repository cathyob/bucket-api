'use strict';

const controller = require('lib/wiring/controller');
const models = require('app/models');
const Restaurant = models.restaurant;

const authenticate = require('./concerns/authenticate');
const setUser = require('./concerns/set-current-user');
const setModel = require('./concerns/set-mongoose-model');

const index = (req, res, next) => {
  Restaurant.find({
    _owner: req.user._id,
  })
    .then(restaurants => res.json({
      restaurants: restaurants.map((e) =>
        e.toJSON({ virtuals: true, user: req.user })),
    }))
    .catch(next);
};

const show = (req, res) => {
  res.json({
    restaurant: req.restaurant.toJSON({ virtuals: true, user: req.user }),
  });
};

const create = (req, res, next) => {
  let restaurant = Object.assign(req.body.restaurant, {
    _owner: req.user._id,
  });
  Restaurant.create(restaurant)
    .then(restaurant =>
      res.status(201)
        .json({
          restaurant: restaurant.toJSON({ virtuals: true, user: req.user }),
        }))
    .catch(next);
};

const update = (req, res, next) => {
  delete req.body._owner;  // disallow owner reassignment.
  req.restaurant.update(req.body.restaurant)
    .then(() => res.sendStatus(204))
    .catch(next);
};

const destroy = (req, res, next) => {
  req.restaurant.remove()
    .then(() => res.sendStatus(204))
    .catch(next);
};

module.exports = controller({
  index,
  show,
  create,
  update,
  destroy,
}, { before: [
  { method: setUser, only: ['index', 'show'] },
  { method: authenticate, except: ['index', 'show'] },
  { method: setModel(Restaurant), only: ['show'] },
  { method: setModel(Restaurant, { forUser: true }), only: ['update', 'destroy'] },
], });
