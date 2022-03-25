import { JWT_TOKEN } from '../constants';

const setOptions = (method, body) => {
	const _opt = {
		baseURL: process.env.APP_API_URL,
		method,
		headers: {
			'Content-Type': 'application/json'
		}
	};

	if (body) _opt.body = JSON.stringify(body);
	if (JWT_TOKEN) _opt.headers['user-jwt'] = JWT_TOKEN;

	return _opt;
}

export const $fetch = {
	get: async (path) => await fetch(process.env.APP_API_URL + path, setOptions('GET')),
	post: async (path, body) => await fetch(process.env.APP_API_URL + path, setOptions('POST', body)),
	patch: async (path, body) => await fetch(process.env.APP_API_URL + path, setOptions('PATCH', body)),
	delete: async (path) => await fetch(process.env.APP_API_URL + path, setOptions('DELETE'))
};
