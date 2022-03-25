<template>
	<section class="section">
		<h3 class="title blue-txt">{{state.name}}</h3>
		<p class="date">{{moment(state.updated_at || state.created_at).format('DD.MM.YYYY')}}</p>
		<input v-model="name" type="text" class="input-text" placeholder="name" />
		<input v-model="comment" type="text" class="input-text" placeholder="comment" />
		<div class="button" @click="deleteIt">Delete</div>
	</section>
</template>

<script setup>
	import { watch, defineProps, ref, defineEmits } from "vue";
	import moment from 'moment';
	import serviceStations from '../services/stations';
	import debounce from 'lodash/debounce';

	const prop = defineProps({
		state: Object,
	});
	const emit = defineEmits();
	const name = ref(prop.state.name);
	const comment = ref(prop.state.comment);

	const service = new serviceStations();
	const deleteIt = async () => {
		await service.delete(prop.state.id);
		await service.load();
		emit('loadData');
	}

	watch(name, debounce(v => service.update(prop.state.id, { name: v }), 250));
	watch(comment, debounce(v => service.update(prop.state.id, { comment: v }), 250));
</script>
