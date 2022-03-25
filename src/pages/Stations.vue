<template>
	<h1 class="title">Stations list</h1>
	<div class="container">
		<div class="row">
			<section class="section">
				<h3 class="title blue-txt">New<br />station</h3>
				<input v-model="name" type="text" class="input-text" :class="{'error': notValid}" placeholder="name" />
				<input v-model="comment" type="text" class="input-text" placeholder="comment" />
				<div class="button" @click="add">Save</div>
			</section>
			<Station
				v-for="e in state.stations"
				:key="`station-${e.id}`"
				:state="e"
				class="section"
				@loadData="loadData"
			/>
		</div>
	</div>
</template>

<script setup>
	import { onMounted, reactive, ref } from "vue";
	import serviceStations from '../services/stations'
	import Station from '../components/Station';

	const state = reactive({
		stations: null
	});
	const notValid = ref(false);
	const name = ref("");
	const comment = ref("");
	const service = new serviceStations();
	const loadData = async () => state.stations = await service.load();
	const add = async () => {
		await service.create({name: name.value, comment: comment.value});
		name.value = "";
		comment.value = "";
		await loadData();
	}

	onMounted(async () => {
		await loadData();
	});
</script>
