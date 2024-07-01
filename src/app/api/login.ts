import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../config/db";
import User from "../../../models/user";
import bcrypt from 'bcryptjs';
