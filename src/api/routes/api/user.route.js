const Router = require('express').Router();
const passport = require('passport');

const {
    getUser,
    getUsers,
    getUserById,
    delUsers
} = require('../../controllers/user.controller');

/**
 * @api {get} /api/user
 * @apiDescription Get current user
 * @apiGroup User
 * @apiPermission Private
 *
 * @apiSuccess (OK 200) {String} _id
 * @apiSuccess (OK 200) {String} email
 * @apiSuccess (OK 200) {String} password
 * @apiSuccess (OK 200) {String} name
 * @apiSuccess (OK 200) {String} role
 * @apiSuccess (OK 200) {String} gender
 * @apiSuccess (OK 200) {String} phone
 * @apiSuccess (OK 200) {Number} age
 * @apiSuccess (OK 200) {Date} createdAt
 * @apiSuccess (OK 200) {Date} updatedAt
 *
 * @apiError (Unauthorized 401) {String} Unauthorized
 */
Router.route('')
    .get(passport.authenticate('jwt', {
            session: false
        }),
        getUser);

/**
 * @api {get} /api/user/all
 * @apiDescription Get all users
 * @apiGroup User
 * @apiPermission Private
 *
 * @apiSuccess (OK 200) {Object[]} _id
 * @apiSuccess (OK 200) {Object[]} email
 * @apiSuccess (OK 200) {Object[]} password
 * @apiSuccess (OK 200) {Object[]} name
 * @apiSuccess (OK 200) {Object[]} role
 * @apiSuccess (OK 200) {Object[]} gender
 * @apiSuccess (OK 200) {Object[]} phone
 * @apiSuccess (OK 200) {Object[]} age
 * @apiSuccess (OK 200) {Object[]} createdAt
 * @apiSuccess (OK 200) {Object[]} updatedAt
 *
 * @apiError (Unauthorized 401) {String} Unauthorized
 */
Router.route('/all')
    .get(passport.authenticate('jwt', {
        session: false
    }), getUsers);

/**
 * @api {delete} /api/user/all
 * @apiDescription Delete all user in database with role user
 * @apiGroup User
 * @apiPermission Private
 *
 * @apiSuccess (OK 200) {Number} deletedCount - Number of account deleted
 *
 * @apiError (Bad Request 400) {Object} APIErorr - Invalid user id
 * @apiError (Unauthorized 401) {String} Unauthorized
 * @apiError (Not Found 404) {String} msg - No users found
 */
Router.route('/all')
    .delete(passport.authenticate('jwt', {
            session: false
        }),
        delUsers);

/**
 * @api {get} /api/user/id/:id
 * @apiDescription Get user by user id
 * @apiGroup User
 * @apiPermission Private
 *
 * @apiParam {String} id - Valid mongoose id
 *
 * @apiSuccess (OK 200) {String} _id
 * @apiSuccess (OK 200) {String} email
 * @apiSuccess (OK 200) {String} password
 * @apiSuccess (OK 200) {String} name
 * @apiSuccess (OK 200) {String} role
 * @apiSuccess (OK 200) {String} gender
 * @apiSuccess (OK 200) {String} phone
 * @apiSuccess (OK 200) {Number} age
 * @apiSuccess (OK 200) {Date} createdAt
 * @apiSuccess (OK 200) {Date} updatedAt
 *
 * @apiError (Bad Request 400) {Object} APIError - Invalid user id
 * @apiError (Unauthorized 401) {String} Unauthorized
 * @apiError (For Bidden 403) {String} msg - What are you trying to do?
 */
Router.route('/id/:id')
    .get(passport.authenticate('jwt', {
        session: false
    }), getUserById);

module.exports = Router;