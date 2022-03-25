<template>
	<form v-if="isValidFeeback" class="form" action="/" @submit.prevent="auth">
		<h1 class="title">Authorization</h1>
		<input v-model="state.login" type="text" placeholder="login" class="input-text" />
		<input v-model="state.password" type="password" placeholder="password" class="input-text" />
		<input type="submit" class="button" />
	</form>
	<section v-else>
		<h1 class="title">Error something wrong.</h1>
	</section>
</template>

<script setup>
	import Cookies from 'js-cookie';
	import { reactive, ref } from "vue";
	import serviceAuth from './services/auth';
	import { COOK_JWT, COOK_USER } from './constants';

	const state = reactive({
		login: "",
		password: ""
	});
	const isValidFeeback = ref(true);
	const service = new serviceAuth();
	const auth = async () => {
		try{
			const res = await service.login(state);
			if (res?.user_jwt) {
				Cookies.set(COOK_JWT, res.user_jwt);
				Cookies.set(COOK_USER, state.login);
				location = process.env.BASE_URL;
			}
		} catch(err) {
			isValidFeeback.value = false;
			console.error(err);
		}
	}
</script>

<style lang="scss" scoped>
.form{
	height: calc(100vh - 150px);
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	margin: auto;
	width: 320px;

	.title{
		margin-top: 0 !important;
		padding-top: 0 !important;
	}
	input{
		width: 100%;
	}
	.button{
		height: 45px;
	}
}
</style>
