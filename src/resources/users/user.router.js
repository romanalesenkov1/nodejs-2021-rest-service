const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  res.json(users.map(User.toResponse));
});

router.route('/').post(async (req, res) => {
  const user = await usersService.create(req.body);
  res.status(201).json(User.toResponse(user));
});

router.route('/:userId').get(async (req, res) => {
  const user = await usersService.getById(req.params.userId);
  if (!user) {
    res.status(404).send('User not found');
  } else {
    res.json(User.toResponse(user));
  }
});

router.route('/:userId').put(async (req, res) => {
  const user = await usersService.update(req.params.userId, req.body);
  if (!user) {
    res.status(404).send('User not found');
  } else {
    res.json(User.toResponse(user));
  }
});

router.route('/:userId').delete(async (req, res) => {
  const user = await usersService.remove(req.params.userId);
  if (!user) {
    res.status(404).send('User not found');
  } else {
    res.status(204).send();
  }
});

module.exports = router;
