<template>
	<section class="section">
		<h3 class="title blue-txt">{{state.login}}</h3>
		<p>{{moment(state.updated_at || state.created_at).format('DD.MM.YYYY')}}</p>
		<input v-model="name" type="text" class="input-text" placeholder="name" />
		<input v-model="comment" type="text" class="input-text" placeholder="comment" />
		<div class="button" @click="deleleUser">Delete</div>
	</section>
</template>

<script setup>
	import { watch, defineProps, ref } from "vue";
	import moment from 'moment';
	import Cookies from 'js-cookie';
	import serviceUsers from '../services/users';
	import debounce from 'lodash/debounce';
	import { COOK_USER, COOK_JWT } from '../constants';

	const prop = defineProps({
		state: Object,
	});
	const name = ref(prop.state.name);
	const comment = ref(prop.state.comment);
	const service = new serviceUsers();
	const deleleUser = async () => {
		const next = 'If you delete this user, this session will close.';
		if (prop.state.login === Cookies.get(COOK_USER)) {
			if (confirm(next) !== true) return;
			Cookies.remove(COOK_JWT);
			Cookies.remove(COOK_USER);
			location = process.env.BASE_URL;
			await service.delete(prop.state.id);
			return;
		}
		await service.delete(prop.state.id);
		await service.load();
	}

	watch(name, debounce(v => service.update(prop.state.id, { name: v }), 250));
	watch(comment, debounce(v => service.update(prop.state.id, { comment: v }), 250));
</script>
