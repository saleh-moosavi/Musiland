import { User } from "@models/user.js";
import type { Request, Response } from "express";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { username: name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        error: "Name, email, and password are required",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ ok: false, error: "Email already in use" });
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    res.status(201).json({ ok: true, user });
  } catch (err: any) {
    res.status(500).json({ ok: false, error: err.message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        ok: false,
        error: "Email and password are required",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ ok: false, error: "Invalid credentials" });
    }

    res.json({
      ok: true,
      user,
    });
  } catch (err: any) {
    res.status(500).json({ ok: false, error: err.message });
  }
};
