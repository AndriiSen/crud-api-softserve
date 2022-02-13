const express = require('express');
let router = express.Router();
const mongoose = require('mongoose')
const UserModel = require('../models/User')



mongoose.connect('mongodb+srv://andrii_sen_admin:wierdpassword@cluster0.hwcfe.mongodb.net/react_crud_app?retryWrites=true&w=majority', 
    {
    useNewUrlParser: true,
    }
)

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - firstname
 *         - lastname
 *         - email
 *       properties:
 *         id:
 *           type: number
 *           description: The auto-generated id of the user
 *         firstname:
 *           type: string
 *           description: User's firstname
 *         lastname:
 *           type: string
 *           description: User's lastname
 *         email:
 *           type: string
 *           description: User's email
 *         hobbies:
 *           type: string
 *           description: User's hobbies
 *       example: 
 *         id: 23
 *         firstname: Andrii
 *         lastname: Sen'
 *         email: senanven@gmail.com
 *         hobbies: Code, Subaru cars
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The users managing API
 */




router
    .route('/')
/**
 * @swagger
 * /user:
 *   get:
 *     summary: Returns the list of all users
 *     tags: [Users]
 *     responses: 
 *       200: 
 *         description: The list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *            
 */
    .get(async (req, res) => {
        res
            .status(200)
            .send(await getAll())
    })
/**
 * @swagger
 * /user:
 *   post:
 *     summary: Creating new user in databse and returns created user data
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *     responses: 
 *       200: 
 *         description: Single user was created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'       
 */
    .post(async (req, res) => {
        const newUser = req.body
        const user = new UserModel({
            id: await UserModel.count({}) + 1,
            firstname: newUser.firstname,
            lastname: newUser.lastname,
            email: newUser.email,
            hobbies: newUser.hobbies
        })
        try {
            await user.save()
            res.status(200)
            res.send(await getAll())
        } catch(err) {
            console.log(err)
        }
    })


router
    .route('/:id')
/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Returns the user by id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: The user id 
 *     responses: 
 *       200: 
 *         description: The user found by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *            
 */
    .get(async(req, res) => {
        const id = req.params.id
        res.send(await findOne({id: id}))
    })
/**
 * @swagger
 * /user/{id}:
 *   put:
 *     summary: Update user information
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: The user id 
 *     requestBody:
 *       required: true
 *       content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *     responses: 
 *       200: 
 *         description: The user found by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *            
 */

    .put(async(req, res) => {
        const id = req.params.id
        const updateInfo = req.body
        await findOneAndUpdate({id: id}, updateInfo)
        res.status(200).send(await getAll())
    })
/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     summary: Update user information
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: The user id 
 *     responses: 
 *       200: 
 *         description: Remove the user successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *            
 */
    .delete(async (req, res) => {
        const id = req.params.id
        await findOneAndDelete({id: id})
        res.status(200).send(await getAll())
    })

module.exports = router;



//Database interactions

function getAll() {
    return UserModel.find({})
}

function findOne(filterQuery) {
    return UserModel.findOne(filterQuery)
}

function findOneAndUpdate(filterQuery, updateInfo) {
    return UserModel.findOneAndUpdate(filterQuery, updateInfo)
}

function findOneAndDelete(filterQuery) {
    return UserModel.findOneAndDelete(filterQuery)
}