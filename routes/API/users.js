const { PrismaClient } = require('@jordynmsonne/capstone-db');
const prisma = new PrismaClient();
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Fetches all users
router.get('/users', async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.status(200).json(users)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal server error." })
    }
});

// Fetches a unique user by id
router.get('/user/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await prisma.user.findUnique({
            where: {
                id: parseInt(id)
            }
        })

        if (!user) {
            return res.status(404).json({ error: "User not found." })
        }

        res.status(200).json({ message: "User found.", user })
        console.log(user);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal server error." })
    }
})

// Deletes user by id
router.delete('/user/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await prisma.user.findUnique({
            where: {
                id: parseInt(id)
            }
        });
        if (!user) {
            return res.status(404).json({ error: "User not found." })
        }
        res.status(200).json(user, { message: "User deleted." })
        console.log("User deleted.")

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal server error." })
    }
});

// Creates a new user
router.post('/register', async (req, res) => {
    const { username, password, name, email, role } = req.body;
    try {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt)
        const user = await prisma.user.create({
            data: {
                username,
                password: hashedPassword,
                name,
                email,
                role


            }
        });
        console.log(user)
        res.status(200).json({ message: "User created!" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal server error." })
    }
});

// login API
router.post('/login', async (req, res) => {


    try {
        const { email, password } = req.body;
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) {
            const payload = {
                id: user.id,
                username: user.username,
                email: user.email,
                name: user.name,
                role: user.role,
            };
            const accessToken = jwt.sign(payload, process.env.SECRET_KEY, {
                expiresIn: "10d",
            });
            res.status(200).json({ accessToken, userId: user.id });
        } else {
            res.status(401).json({ error: "Failed to login" })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal server error" })
    }
})


module.exports = router;