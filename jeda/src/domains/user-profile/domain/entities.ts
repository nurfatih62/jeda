export interface UserProfile {
  id: string;
  name: string;
  email: string;
  bio?: string;
  avatarUrl?: string;
  linkedTopics: string[];
  role: string;
}

export function isValidBio(bio: string): boolean {
  return bio.length <= 200;
}

export function isValidName(name: string): boolean {
  return name.trim().length >= 3 && name.trim().length <= 40;
}
