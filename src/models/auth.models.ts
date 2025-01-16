import { User } from './user.models';

export interface Auth {
  user: User | null;
  sessionCookie: { value: string } | null;
  getUser: () => Promise<User | null>;
  createSession: (formData: FormData) => Promise<void>;
  deleteSession: () => Promise<void>;
}
