import { RegisterItem } from './register-item';

const items: RegisterItem[] = [];

export const register = (item: RegisterItem) => {
  items.push(item);
};
