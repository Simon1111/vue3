import { $fetch } from './api-service';

// CRUD
class Stations{
	async load() {
		const responseStations = await $fetch.get('stations');
		const result = await responseStations.json();
		return result;
	}

	async create(body) {
		await $fetch.post('stations', body);
	}

	async update(id, body) {
		await $fetch.patch('stations/' + id, body);
	}

	async delete(id) {
		await $fetch.delete('stations/' + id);
	}
}

export default Stations;
