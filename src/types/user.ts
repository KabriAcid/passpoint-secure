export interface User {
  user_id: number;
  username: string;
  email: string;
  phone: string;
  image_id: string;
  created_at: number;
  last_login?: number;
}
