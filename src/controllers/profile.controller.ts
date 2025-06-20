import { Request, Response } from "express";
import { createProfileService } from "../services/profile.sevice";

interface ProfileData {
  userId: number;
  name: string;
  email: string;
  githubUrl: string;
  linkedinUrl: string;
  websiteUrl: string;
  city: string;
  phone: string;
  about: string;
  stacks: string[];
}

export const createProfile = async (
  req: Request,
  res: Response
): Promise<any> => {
  // const userId = req.userId; // vindo do middleware de autenticação

  const userId = 12345; // Placeholder for userId, replace with actual logic
  const data = req.body;

  try {
    if (!userId) {
      res.status(401).json({
        message: "user not authenticated!",
      });
      return;
    }

    if (
      !data.name ||
      !data.email ||
      !data.githubUrl ||
      !data.linkedinUrl ||
      !data.websiteUrl ||
      !data.city ||
      !data.phone ||
      !data.about ||
      !data.stacks
    ) {
      res.status(400).json({ message: "All fields are required!!!" });
    }

    const profileData: ProfileData = {
      userId: userId,
      name: data.name,
      email: data.email,
      githubUrl: data.githubUrl,
      linkedinUrl: data.linkedinUrl,
      websiteUrl: data.websiteUrl,
      city: data.city,
      phone: data.phone,
      about: data.about,
      stacks: data.stacks || [],
    };

    const profile = await createProfileService(profileData);
    res.status(201).json({ message: "Profile Saved Successfully", profile });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error creating Profile...",
    });
  }
};
