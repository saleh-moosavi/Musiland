import { User } from "@models/user.js"; // Adjust path as needed
import type { Request, Response } from "express";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getByIdUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "ID required" });
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ error: "Name, email, password required" });
    const user = await User.create({ name, email, password });
    res.status(201).json(user);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "ID required" });
    const { role } = req.body;
    if (!role || !["admin", "user", "manager"].includes(role))
      return res.status(400).json({ error: "Valid role required" });
    const user = await User.findByIdAndUpdate(id, { role }, { new: true });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "ID required" });
    const user = await User.findByIdAndDelete(id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ message: "User deleted" });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
