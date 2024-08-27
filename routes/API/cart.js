const { PrismaClient } = require('@jordynmsonne/capstone-db');
const prisma = new PrismaClient();
const express = require('express');
const router = express.Router();

router.post('/cartcreate', async (req, res) => {
    const { userId, productId, quantity } = req.body;

    try {
        // Check if the user already has a cart
        let cart = await prisma.cart.findUnique({
            where: { userId: userId },
            include: { cartItems: true }
        });

        // If no cart exists, create a new one
        if (!cart) {
            cart = await prisma.cart.create({
                data: {
                    user: { connect: { id: userId } },
                },
            });
        }

        // Check if the product is already in the cart
        const existingCartItem = cart.cartItems.find(item => item.productId === productId);

        if (existingCartItem) {
            // If the product is already in the cart, update the quantity
            await prisma.cartItem.update({
                where: { id: existingCartItem.id },
                data: { quantity: existingCartItem.quantity + quantity },
            });
        } else {
            // If the product is not in the cart, add it as a new cart item
            await prisma.cartItem.create({
                data: {
                    product: { connect: { id: productId } },
                    quantity: quantity,
                    cart: { connect: { id: cart.id } },
                },
            });
        }

        res.json({ message: "Product added to cart successfully" });
    } catch (error) {
        console.error('Error adding product to cart:', error);
        res.status(500).json({ error: "Failed to add product to cart" });
    }
});

module.exports = router;