import { Request, Response } from "express";
import { createProfileService } from "../services/profile.sevice";

interface ProfileData {
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

  try {
    const data = req.body;

    const profileData: ProfileData = {
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
    res.status(500).json({
      message: "Error creating Profile...",
    });
  }
};


