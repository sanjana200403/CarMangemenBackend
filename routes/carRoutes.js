const express = require('express');
const router = express.Router();
const { createCar, getCars, getCarById, updateCar, deleteCar ,getCarsByUserID } = require('../controllers/carController');  // Import the car controller

// Create a new car route
/**
 * @swagger
 * /api/cars:
 *   post:
 *     summary: Create a new car
 *     description: Add a new car to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               make:
 *                 type: string
 *               model:
 *                 type: string
 *               year:
 *                 type: integer
 *               price:
 *                 type: number
 *                 format: float
 *     responses:
 *       201:
 *         description: Car created successfully
 *       500:
 *         description: Failed to create car
 */
router.post('/', createCar);

// Get all cars route
/**
 * @swagger
 * /api/cars:
 *   get:
 *     summary: Get all cars
 *     description: Retrieve a list of all available cars.
 *     responses:
 *       200:
 *         description: List of cars
 *       500:
 *         description: Failed to retrieve cars
 */
router.get('/', getCars);

// Get a single car by ID route
/**
 * @swagger
 * /api/cars/{id}:
 *   get:
 *     summary: Get car details by ID
 *     description: Retrieve the details of a car by its ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the car
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Car details
 *       404:
 *         description: Car not found
 *       500:
 *         description: Failed to retrieve car
 */
router.get('/:id', getCarById);

// Update car details route
/**
 * @swagger
 * /api/cars/{id}:
 *   put:
 *     summary: Update car details
 *     description: Update the details of an existing car by its ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the car to update
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               make:
 *                 type: string
 *               model:
 *                 type: string
 *               year:
 *                 type: integer
 *               price:
 *                 type: number
 *                 format: float
 *     responses:
 *       200:
 *         description: Car updated successfully
 *       404:
 *         description: Car not found
 *       500:
 *         description: Failed to update car
 */
router.put('/:id', updateCar);

// Delete a car route
/**
 * @swagger
 * /api/cars/{id}:
 *   delete:
 *     summary: Delete a car
 *     description: Remove a car from the database by its ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the car to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Car deleted successfully
 *       404:
 *         description: Car not found
 *       500:
 *         description: Failed to delete car
 */
router.delete('/:id', deleteCar);

// Route to get cars by userID
/**
 * @swagger
 * /api/cars/user/{userID}:
 *   get:
 *     summary: Get cars by userID
 *     description: Retrieve a list of cars associated with a specific user.
 *     parameters:
 *       - name: userID
 *         in: path
 *         required: true
 *         description: The ID of the user
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of cars for the specified user
 *       500:
 *         description: Failed to retrieve cars
 */
router.get('/user/:userID', getCarsByUserID);



module.exports = router;
