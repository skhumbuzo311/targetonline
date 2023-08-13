import axios from 'axios';

import { User } from './types';
import { apiBaseUrl } from 'shared/constants/configurations';

export const getUser = (encryptedPassword: string) => axios.get(`${apiBaseUrl}/Users/user/${encryptedPassword}`).then(response => response.data);
export const resetPassword = (user: User) => axios.put(`${apiBaseUrl}/Users/reset-password`, user).then(response => response.data);