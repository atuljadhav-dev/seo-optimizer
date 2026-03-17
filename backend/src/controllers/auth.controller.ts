import { type Request, type Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../models/user.model.js";

const generateToken = (id: string): string => {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error("JWT_SECRET environmental variable is missing.");
    }
    return jwt.sign({ id }, secret, { expiresIn: "30d" });
};

export const signUp = async (req: Request, res: Response): Promise<void> => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            res.status(400).json({ message: "Request body is required" });
            return;
        }
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            res.status(400).json({
                message: "Name, email, and password are required",
            });
            return;
        }
        // Validate if the user record already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            res.status(400).json({
                message: "User already exists with this email address",
            });
            return;
        }

        // Instantiating the new model instance automatically triggers pre-save password hash hook
        const user = await User.create({ name, email, password });

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id.toString()),
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

export const signIn = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({
                message: "Email and password are required",
            });
            return;
        }
        // Validate if the user record exists in the database
        const user = await User.findOne({ email });
        if (!user || !user.password) {
            res.status(401).json({ message: "Invalid email or password" });
            return;
        }

        // Explicit verification of password text signatures via bcrypt comparison
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            res.status(401).json({ message: "Invalid email or password" });
            return;
        }

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id.toString()),
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};
