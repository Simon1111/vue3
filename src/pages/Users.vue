<template>
	<h1 class="title">Users list</h1>
	<div class="container">
		<div class="row">
			<form class="section">
				<h3 class="title blue-txt">New user</h3>
				<input v-model="name" type="text" placeholder="name" class="input-text" />
				<input v-model="comment" type="text" placeholder="comment" class="input-text" />
				<input v-model="login" type="text" placeholder="login" class="input-text" :class="{'error': errorLogin}" />
				<input v-model="password" type="password" placeholder="password" class="input-text" :class="{'error': errorPassword}" />
				<div class="button" @click="add">Save</div>
			</form>
			<User
				v-for="e in state.users"
				:key="`user-${e.id}`"
				:state="e"
			/>
		</div>
	</div>
</template>

<script setup>
	import { watch, onMounted, reactive, ref } from "vue";
	import User from '../components/User';
	import serviceUsers from '../services/users';

	const state = reactive({ users: null });
	const name = ref("");
	const comment = ref("");
	const login = ref("");
	const password = ref("");
	const errorLogin = ref(false);
	const errorPassword = ref(false);
	const usersMap = reactive([]);
	const service = new serviceUsers();
	const add = async () => {
		if (errorLogin.value || errorPassword.value) return;
		await service.create({name: name.value, comment: comment.value, login: login.value, password: password.value});
		await service.load();
	}

	onMounted(async () => {
		state.users = await service.load();
		usersMap.value = await state.users.map(u => u.login);
		console.log(Array.from(usersMap.value));
	});

	watch(login, (e) => errorLogin.value = e === "" || Array.from(usersMap.value).includes(e));
	watch(password, (e) => errorPassword.value = e === "");
</script>
