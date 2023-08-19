import axios from 'axios';

import { apiBaseUrl } from 'shared/constants/configurations';

const USERS: string = `${apiBaseUrl}/Users`

export const updateAvatar = (formData: FormData) => axios.put(`${USERS}/update-avatar`, formData).then(response => response.data);
