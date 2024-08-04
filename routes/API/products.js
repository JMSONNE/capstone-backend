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
router.get("/product/:id", async (req, res) => {
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
router.delete("/product/:id", async (req, res) => {
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
router.patch('/product/:id', async (req, res) => {
    try {
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

        if (!product) {
            return res.status(404).json({ error: "Product not found." })
        }

        console.log("Product succesfully modified.")
        res.status(200).json(product)

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal server error." })
    }
});

// API to create new products
router.post('/product', async (res, req) => {
    const { name, description, price } = req.body
    try {
        const product = await prisma.product.create({
            data: {
                name,
                description,
                price
            }
        });
        console.log(product)
        res.status(200).json({ message: "Product successfully created." })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal server error.' })
    }
});

module.exports = router;