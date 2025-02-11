export interface DB_user {
  id: number;
  name: string;
  email: string;
  created_at: string;
}

export interface DB_user_asteroid {
  id: number;
  user_id: number;
  asteroid_id: number;
  created_at: string;
}
