import { createRouter, createWebHistory } from 'vue-router';

const routes = [
	{ path: '/stations', component: () => import('./pages/Stations.vue') },
	{ path: '/users', component: () => import('./pages/Users.vue') },
	{ path: '/*', component: () => import('./pages/Error.vue') }, // TODO 404
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
});

export default router;
