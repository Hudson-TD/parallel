import { Request, Response, NextFunction } from "express";
import User from "../models/User.js";
import { compare, hash } from "bcrypt";
import { createToken } from "../utils/token-manager.js";
import { COOKIE_LIFE, COOKIE_NAME, DOMAIN_NAME } from "../utils/constants.js";

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find();
    return res.status(200).json({ message: "Get all users route hit", users });
  } catch (error) {
    return res.status(200).json({ message: "Error", cause: error.message });
  }
};

export const userSignup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Extract JSON payload properties
    const { name, email, password } = req.body;
    // Hash password
    const hashedPassword = await hash(password, 10);
    // User already exists?
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(401).json({
        message: "Email is already in use by another account",
      });
    }
    // Instantiate a new istance of the user model with secured password
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    // Clear existing cookie
    res.clearCookie(COOKIE_NAME, {
      path: "/",
      domain: DOMAIN_NAME,
      httpOnly: true,
      signed: true,
    });
    // Assign JWT with 24hr life
    const token = createToken(
      existingUser._id.toString(),
      existingUser.email,
      "1d"
    );
    res.cookie(COOKIE_NAME, token, {
      path: "/",
      domain: DOMAIN_NAME,
      expires: COOKIE_LIFE,
      httpOnly: true,
      signed: true,
    });

    return res.status(201).json({
      message: "Success",
      name: existingUser.name,
      email: existingUser.email,
    });
  } catch (error) {
    return res.status(200).json({ message: "Error", cause: error.message });
  }
};

export const userLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Grab credentials from request
    const { email, password } = req.body;
    // Find matching email in db
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res
        .status(401)
        .send("The provided email does not match any existing accounts.");
    }
    // Verify password
    const isPasswordValid = await compare(password, existingUser.password);

    if (!isPasswordValid) {
      return res.status(403).send("Incorrect password.");
    }
    // Clear existing cookie
    res.clearCookie(COOKIE_NAME, {
      path: "/",
      domain: DOMAIN_NAME,
      httpOnly: true,
      signed: true,
    });
    // Assign JWT with 24hr life
    const token = createToken(
      existingUser._id.toString(),
      existingUser.email,
      "1d"
    );
    res.cookie(COOKIE_NAME, token, {
      path: "/",
      domain: DOMAIN_NAME,
      expires: COOKIE_LIFE,
      httpOnly: true,
      signed: true,
    });

    // Successful Auth
    return res.status(200).json({
      message: "Success",
      name: existingUser.name,
      email: existingUser.email,
    });
  } catch (error) {
    return res
      .status(200)
      .json({ message: "User login error encountered", cause: error.message });
  }
};

export const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(res.locals.jwtData.id);

    if (!user) {
      return res
        .status(401)
        .send("User not registered or issue validating token.");
    }

    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions do not match.");
    }

    // Successful Auth
    return res.status(200).json({
      message: "Success",
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    return res
      .status(200)
      .json({ message: "User login error encountered", cause: error.message });
  }
};

export const userLogout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(res.locals.jwtData.id);

    if (!user) {
      return res
        .status(401)
        .send("User not registered or issue validating token.");
    }

    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions do not match.");
    }

    // Clear existing cookie
    res.clearCookie(COOKIE_NAME, {
      path: "/",
      domain: DOMAIN_NAME,
      httpOnly: true,
      signed: true,
    });

    // Successful Auth
    return res.status(200).json({
      message: "Success",
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    return res
      .status(200)
      .json({ message: "User login error encountered", cause: error.message });
  }
};
