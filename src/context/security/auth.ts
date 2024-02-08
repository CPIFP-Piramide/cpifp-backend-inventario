import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
dotenv.config();

const isAuth = async (req: Request, response: Response, next: NextFunction) => {
  try {
    const url = `${process.env.API_CORE_URL}/api/auth`;

    const authHeader = req.headers["authorization"];
    const token: string | undefined = authHeader && authHeader.split(" ")[1];
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "POST",
    });
    const data = await response.json();
    console.log(data);

    next();
  } catch (err) {
    console.log(err);

    const message = {
      message: "No autorizado",
    };
    response.status(401).json(message);
  }
};

export { isAuth };
