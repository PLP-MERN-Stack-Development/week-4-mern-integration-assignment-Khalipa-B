import axios from 'axios';

const API = '/api/categories';

export const getAllCategories = () => axios.get(API);
export const createCategory = (data) => axios.post(API, data);
