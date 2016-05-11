'use strict';

const controller = require('lib/wiring/controller');
const models = require('app/models');
const Example = models.example;

const authenticate = require('./concerns/authenticate');

// next basically throws errors
const index = (req, res, next) => {
  // Find all example - empty parens
  Example.find()
  // Return all examles as json - result of find() passed as examples arg
    .then(examples => res.json({ examples }))
    .catch(err => next(err));
};

const show = (req, res, next) => {
  // Find an example by id contained in req.params body
  Example.findById(req.params.id)
  // If the id exists in an example, render it as json, if not, throw an error
    .then(example => example ? res.json({ example }) : next()) // next() will return 404, based on middleware
    .catch(err => next(err));
};

const create = (req, res, next) => {
  // Object.assign copies the body of one object into a new one
  let example = Object.assign(req.body.example, {
    _owner: req.currentUser._id,
  });
  Example.create(example)
    .then(example => res.json({ example }))
    .catch(err => next(err));
};

const update = (req, res, next) => {
  let search = { _id: req.params.id, _owner: req.currentUser._id };
  Example.findOne(search)
    .then(example => {
      if (!example) {
        return next();
      }

      delete req.body._owner;  // disallow owner reassignment.
      return example.update(req.body.example)
        .then(() => res.sendStatus(200));
    })
    .catch(err => next(err));
};

const destroy = (req, res, next) => {
  let search = { _id: req.params.id, _owner: req.currentUser._id };
  Example.findOne(search)
    .then(example => {
      if (!example) {
        return next();
      }

      return example.remove()
        .then(() => res.sendStatus(200));
    })
    .catch(err => next(err));
};

module.exports = controller({
  index,
  show,
  create,
  update,
  destroy,
}, { before: [
  { method: authenticate, except: ['index', 'show'] },
], });
