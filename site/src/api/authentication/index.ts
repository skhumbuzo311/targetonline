import axios from 'axios';

import { apiBaseUrl } from 'shared/constants/configurations';
import { User } from './types';

const Authentication = `${apiBaseUrl}/Authentication`

export const postSignup = (user: User) => axios.post(`${Authentication}/signup`, user).then(response => response.data)
export const postLogin = (user: User) => axios.post(`${Authentication}/login`, user).then(response => response.data)
export const passwordResetRequest = (user: User) => axios.post(`${Authentication}/password-reset-request`, user).then(response => response.data)
export const verifyPhoneNumber = (user: User) => axios.post(`${Authentication}/verify-phone-number`, user).then(response => response.data)
export const sendPhoneNumberVerificationCode = (user: User) => axios.post(`${Authentication}/send-phone-verification-code`, user).then(response => response.data)
export const requestPasswordResetVerificationCode = (user: User) => axios.post(`${Authentication}/password-reset-verification-code-request`, user).then(response => response.data)