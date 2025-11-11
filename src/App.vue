<template>
	<router-view>
		<component :is="layout" key="layout-main" />
	</router-view>
</template>
<script setup>
import { computed, defineAsyncComponent, watch } from 'vue';
import { useRoute } from 'vue-router';

const base = defineAsyncComponent(() => import('./layout/layout.vue'));

const layouts = {
	'base': base,
};

const route = useRoute();

const layout = computed(() => {
	if (route?.name && route?.meta?.layout) return layouts[route.meta.layout];
	else return null;
});

</script>
<style scoped>
</style>
