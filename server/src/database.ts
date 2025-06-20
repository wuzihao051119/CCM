export type User = {
  id: string;
  name: string;
  email: string;
};

export const columns = {
  user: ['users.id', 'users.name', 'users.email'],
} as const;
