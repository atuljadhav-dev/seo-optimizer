import { type Request, type Response, type NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthenticatedRequest extends Request {
    user?: {
        id: string;
    };
}

export const protect = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    let token: string | undefined;

    // Check if token exists in Authorization header (Bearer <token>)
    if (req.headers.authorization?.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1]; // Extract the token from the header
    }

    if (!token) {
        // If no token is provided, respond with a 401 Unauthorized status
        res.status(401).json({ message: "Not authorized, no token provided" });
        return;
    }

    try {
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            throw new Error("JWT_SECRET environmental variable is missing.");
        }

        // Verify token payload structural validity
        const decoded = jwt.verify(token, jwtSecret) as { id: string };

        // Inject the decoded user information dynamically into the request context
        req.user = { id: decoded.id };
        // Call the next middleware or route handler in the chain
        next();
    } catch (error) {
        res.status(401).json({ message: "Not authorized, invalid token" });
    }
};
