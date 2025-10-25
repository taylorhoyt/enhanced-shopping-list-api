import { Request, Response, NextFunction } from "express";
import { supabaseConnection } from "@/database/database";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email?: string;
        [key: string]: any;
      };
      supabase?: any;
    }
  }
}

export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        error:
          "Authorization header missing or invalid. Expected: Bearer <token>",
      });
    }

    const token = authHeader.split(" ")[1];

    const supabase = supabaseConnection();

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({
        error: "Invalid or expired token",
        details: error?.message,
      });
    }

    // Attach user and authenticated supabase client to request
    req.user = user;
    req.supabase = supabase;

    return next();
  } catch (error: any) {
    console.error("Authentication error:", error.message);
    return res.status(401).json({
      error: "Authentication failed",
      details: error.message,
    });
  }
};
