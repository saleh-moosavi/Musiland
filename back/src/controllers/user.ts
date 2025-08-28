import { User } from "@models/user.js";
import type { Request, Response, NextFunction } from "express";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

export const getSingleUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.send(user);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

export const addUser = async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).send("Name and email are required");
    }
    const user = new User({ name, email });
    const result = await user.save();
    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

export const editUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const updates = req.body;
    const user = await User.findByIdAndUpdate(id, updates, { new: true });
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.send(user);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.send(user);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

export const deleteAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await User.deleteMany({});
    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};
