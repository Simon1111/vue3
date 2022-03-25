<template>
	<div>
		<header class="header" :class="{'center': !isValid}">
			<div class="container">
				<img :src="APP_LOGO" alt="Logo" />
				<nav v-if="isValid" class="header-nav">
					<router-link to="/users">Users</router-link>
					<router-link to="/stations">Stations</router-link>
					<span class="button" @click="exit">Exit</span>
				</nav>
			</div>
		</header>
		<main>
			<slot v-if="isValid" />
			<Auth v-else />
		</main>
	</div>
	<footer class="footer">
		© 2021 {{APP_COMPANY_NAME}}
	</footer>
</template>

<script setup>
	import Cookies from 'js-cookie';
	import { onMounted, ref } from "vue";
	import { useRouter, useRoute } from 'vue-router';
	import Auth from './Auth.vue';
	import { COOK_JWT, COOK_USER, JWT_TOKEN, APP_LOGO, APP_COMPANY_NAME } from './constants';

	const isValid = ref(false);
	const router = useRouter();
	const currentRoute = useRoute().path;
	const exit = () => {
		Cookies.remove(COOK_JWT);
		Cookies.remove(COOK_USER);
		isValid.value = !isValid.value;
	};

	onMounted(() => {
		if (JWT_TOKEN) {
			isValid.value = true;
			if (currentRoute.value === '/') router.push('stations');
		}
	});
</script>

<style lang="scss" scoped>
	.header{
		-webkit-box-shadow: 0px 20px 50px 0px rgb(0 0 0 / 5%);
		box-shadow: 0px 20px 50px 0px rgb(0 0 0 / 5%);
    background: $white;
		position: fixed;
		width: 100%;
		z-index: 9;
		&.center{
			.container{
				justify-content: center;
			}
		}
		.container{
			align-items: center;
			justify-content: space-between;
			height: 75px;
			display: flex;
			width: 100%;
		}
	}
	.footer{
		display: flex;
		align-items: center;
		justify-content: center;
		font-family: "Lato", sans-serif;
		font-weight: normal;
		font-style: normal;
		background: $darkBlue;
		color: $white;
		height: 75px;
	}
	.header-nav{
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		:deep(.router-link-active){
			border-color: $blue;
		}
		a{
			align-items: center;
			border-top: 4px solid $white;
			color: $grey;
			display: flex;
			font-size: 16px;
			font-weight: 400;
			margin-right: 45px;
			transition: all 0.4s ease-out 0s;
			height: 100%;
			&:hover{
				border-color: $blue;
			}
		}
	}
</style>
