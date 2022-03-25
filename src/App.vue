<template>
	<Layout>
		<router-view />
	</Layout>
</template>

<script>
import "the-new-css-reset/css/reset.css";
import './assets/main.scss';
import Layout from './Layout.vue'

export default {
	components: {
		Layout
	}
}
</script>
