import axios from 'axios';

import { apiBaseUrl } from 'shared/constants/configurations';
import { User } from './types';

export const postSignup = (user: User) => axios.post(`${apiBaseUrl}/Authentication/signup`, user).then(response => response.data)
export const postLogin = (user: User) => axios.post(`${apiBaseUrl}/Authentication/login`, user).then(response => response.data)