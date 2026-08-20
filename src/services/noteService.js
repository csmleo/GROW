import api from '../api/axiosConfig';

/** Upload a PDF note with metadata (multipart/form-data) */
export const uploadNote = (formData) =>
    api.post('/notes/upload', formData, {
        // Let the browser set multipart boundary (do not force application/json)
        headers: { 'Content-Type': 'multipart/form-data' },
        transformRequest: [
            (data, headers) => {
                if (data instanceof FormData) {
                    delete headers['Content-Type'];
                }
                return data;
            },
        ],
    });

/** Fetch all notes for Browse */
export const getNotes = () => api.get('/notes');

/** Fetch a single note by id */
export const getNoteById = (id) => api.get(`/notes/${id}`);
