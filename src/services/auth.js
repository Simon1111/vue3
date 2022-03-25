import { $fetch } from './api-service';
import serviceUsers from './users';

const service = new serviceUsers();

class Auth{
	async login(body) {
		const resAuth = await $fetch.post('users/auth', body);
		let result = await resAuth.json();
		if (!result.user_jwt) {
			await service.create({
				...body,
				name: body.login,
				comment: body.login
			});
			const resSecondAuth = await $fetch.post('users/auth', body);
			result = await resSecondAuth.json();
		}
		if (result.user_jwt) return result;
	}
}

export default Auth;
