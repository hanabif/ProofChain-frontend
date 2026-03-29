import { api } from '../client';

export const uploadAssetAndLicense = (formData: FormData): Promise<any> => {
  return api.post('/api/assets/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }).then((res) => res.data);
};
