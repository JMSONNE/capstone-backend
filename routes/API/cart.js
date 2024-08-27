const { PrismaClient } = require('@jordynmsonne/capstone-db');
const prisma = new PrismaClient();
const express = require('express');
const router = express.Router();

router.post('/cartcreate', async (req, res) => {
    const { userId, productId, quantity } = req.body;

    try {
        // Validate input
        if (!userId || !productId || !quantity) {
            return res.status(400).json({ error: "Missing userId, productId, or quantity" });
        }

        // Check if the user already has a cart
        let cart = await prisma.cart.findUnique({
            where: { userId: parseInt(userId) },
            include: { cartItems: true }
        });

        // If no cart exists, create a new one
        if (!cart) {
            cart = await prisma.cart.create({
                data: {
                    userId: parseInt(userId), // Ensure userId is an integer
                },
            });
        }

        // Check if the product is already in the cart
        const existingCartItem = cart.cartItems.find(item => item.productId === parseInt(productId));

        if (existingCartItem) {
            // If the product is already in the cart, update the quantity
            await prisma.cartItem.update({
                where: { id: existingCartItem.id },
                data: { quantity: 1 },
            });
        } else {
            // If the product is not in the cart, add it as a new cart item
            await prisma.cartItem.create({
                data: {
                    productId: parseInt(productId), // Ensure productId is an integer
                    quantity: parseInt(quantity),
                    cartId: cart.id,
                },
            });
        }

        res.json({ message: "Product added to cart successfully" });
    } catch (error) {
        console.error('Error adding product to cart:', error);
        res.status(500).json({ error: "Failed to add product to cart" });
    }
});

router.get('/user/:id/cart', async (req, res) => {
    const userId = parseInt(req.params.id); // Capture userId from the URL

    try {
        // Fetch the user's cart based on userId
        const cart = await prisma.cart.findUnique({
            where: { userId: userId },
            include: { cartItems: { include: { product: true } } }
        });

        if (!cart) {
            return res.status(404).json({ error: "Cart not found" });
        }

        res.json(cart);
    } catch (error) {
        console.error('Error fetching cart:', error);
        res.status(500).json({ error: "Failed to fetch cart" });
    }
});


module.exports = router;
