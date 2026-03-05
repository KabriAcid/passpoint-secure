import { User } from "@/types/user";

export const users: User[] = [
  {
    user_id: 1,
    username: "demo",
    email: "demo@mail.com",
    phone: "+1234567890",
    image_id: "image1",
    created_at: Date.now() - 86400000,
    last_login: Date.now() - 3600000,
  },
];

let nextId = 2;

export function addUser(user: Omit<User, "user_id" | "created_at">): User {
  const newUser: User = { ...user, user_id: nextId++, created_at: Date.now() };
  users.push(newUser);
  return newUser;
}

export function findUserByUsername(username: string): User | undefined {
  return users.find((u) => u.username.toLowerCase() === username.toLowerCase());
}

export function updateLastLogin(userId: number) {
  const user = users.find((u) => u.user_id === userId);
  if (user) user.last_login = Date.now();
}
