const { PrismaClient } = require('@jordynmsonne/capstone-db');
const prisma = new PrismaClient();
const express = require('express');
const router = express.Router();


// API route to fetch all items
router.get("/products", async (req, res) => {
    try {
        const products = await prisma.product.findMany();
        res.status(200).json(products);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal server error." });
    }
});

// API route to fetch a single item by item ID
router.get("/products/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const product = await prisma.findUnique({
            where: {
                id: pareseInt(id)
            }
        });
        if (!product) {
            return res.status(404).json({ error: "product not found." })
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error.' })
    }
});

// API route to delete an item
router.delete("/products/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const product = await prisma.findUnique({
            where: {
                id: pareseInt(id)
            }
        });
        if (!product) {
            return res.status(404).json({ error: "Product cannot be deleted because the product does not exist." })
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal server error." })
    }
});

// API route to change a certain item
router.patch('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await prisma.product.update({
        where: {
            id: parseInt(id)
        },
        data: {
            name,
            description,
            price
        }
    })
})