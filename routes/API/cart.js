const { PrismaClient } = require('@jordynmsonne/capstone-db');
const prisma = new PrismaClient();
const express = require('express');
const router = express.Router();
const { authenticate } = require('../../middleware/authentication')

// add product to cart
router.post('/user:id/cart', authenticate("USER", "ADMIN", "GUEST"), async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;
    } catch (error) {

    }
})