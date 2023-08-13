import axios from 'axios';

import { apiBaseUrl } from 'shared/constants/configurations';

export const get = () => axios.get(`${apiBaseUrl}/AutoSpares`).then(response => response.data);
export const excelUpload = (excelFile: FormData) => axios.post(`${apiBaseUrl}/AutoSpares/excel-upload`, excelFile).then(response => response.data);