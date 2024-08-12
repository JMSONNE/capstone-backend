const { PrismaClient } = require('@jordynmsonne/capstone-db');
const prisma = new PrismaClient();
const express = require('express');
const router = express.Router();
const { authenticate } = require('../../middleware/authentication')

// create a cart with an added item
router.post('/user:id/cart', authenticate("USER", "ADMIN"), async (req, res) => {
    try {
        const { userId, user, cartItems } = req.body;

        const cart = await prisma.cart.create({
            data: {
                userId,
                user,
                cartItems
            }
        });
        console.log(cart)
        res.status(200).json(cart)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal server error." })
    }
});

// Fetch the users cart
router.get('/user:id/cart', authenticate("USER", "ADMIN"), async (req, res) => {
    try {
        const { id } = req.params;

        const cart = await prisma.cart.findUnique({
            where: {
                id: parseInt(id)
            }
        });
        console.log(cart)
        res.status(200).json(cart)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal server error." })
    }
});