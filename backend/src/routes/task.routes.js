const express = require('express');
const router = new express.Router();
const auth = require('../middleware/auth.header');
const TaskController = require('../controllers/task.controller');


router
    .route('/tasks/:id')
    .get(auth, TaskController.getTaskById)
    .patch(auth, TaskController.updateTask)
    .delete(auth, TaskController.deleteTask)

router
    .route('/tasks')
    .post(auth, TaskController.createTask)
    .get(auth, TaskController.getTasks);

module.exports = router;

// # Route 2 i.e /tasks
/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: This API is to get the task of the logged-in user
 *     description: Get all the tasks that the current user has created
 *     tags:
 *       - Task
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       500:
 *         description: Internal Server Error
 *       400:
 *         description: Unauthorized
 *       200:
 *         description: Tasks
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *
 *   post:
 *     summary: This API is to create a task for the current user
 *     description: Enter the task description and status
 *     tags:
 *       - Task
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#components/schemas/Task'
 *     responses:
 *       500:
 *         description: Internal Server Error
 *       400:
 *         description: Unauthorized
 *       201:
 *         description: Created Successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#components/schemas/Task'
 */

// # Route 1 i.e /tasks/id
/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Get a particular task of the current user
 *     description: Retrieve a specific task based on the provided task ID.
 *     tags:
 *       - Task
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Task ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Fetched Successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       400:
 *         description: Unauthorized
 *
 *   patch:
 *     summary: Patch a particular task of the current user
 *     description: Retrieve a specific task and modify it.
 *     tags:
 *       - Task
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Task ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#components/schemas/Task'
 *     responses:
 *       200:
 *         description: Updated Successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       400:
 *         description: Unauthorized
 *
 *   delete:
 *     summary: Delete a particular task of the current user
 *     description: Delete a specific task of the current user 
 *     tags:
 *       - Task
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Task ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Deleted Successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#components/schemas/Task'
 *       400:
 *         description: Unauthorized
 */
