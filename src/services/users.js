import { $fetch } from './api-service';

// CRUD
class Users{
	async load() {
		const responseStations = await $fetch.get('users');
		const result = await responseStations.json();
		return result;
	}

	async update(id, body) {
		await $fetch.patch('users/' + id, body);
	}

	async create(body) {
		await $fetch.post('users', body);
	}

	async delete(id) {
		await $fetch.delete('users/' + id);
	}
}

export default Users;
