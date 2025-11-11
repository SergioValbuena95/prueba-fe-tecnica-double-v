<template>
    <div :class="`${data.selected ? 'bg-green-100 outline outline-emerald-500' : ''}`" class="shadow-md rounded-xl bg-white text-black p-4 w-full md:6/12 lg:w-3/12 text-center" @click="goToDetails(data)">
        <p class="capitalize">{{ data.name }}</p>
        <img :src="data?.info?.sprites.front_default" alt="" class="mx-auto">
        <slot />
        <div class="flex justify-center gap-x-4 mt-2">
            <div v-if="!data.selected" class="bg-blue-500 text-white cursor-pointer rounded-md py-1 px-2" @click.stop="selectPokemon(data)">
                + Team
            </div>
            <div v-else class="bg-red-500 text-white cursor-pointer rounded-md py-1 px-2" @click.stop="unSelectPokemon(data)">
                - Team
            </div>
        </div>
    </div>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import { storeToRefs } from 'pinia';
import { usePokemonStore } from '../store/pokemon.js';
import { useRouter } from 'vue-router';

const props = defineProps({
    data:{
        type: [Object, Array],
        required: true,
        default: () => {}
    }
});

const pokemonsStore = usePokemonStore();
const { myTeam } = storeToRefs(pokemonsStore);

const router = useRouter()

const emit = defineEmits(['add','remove']);


function selectPokemon(pokemon) {
    emit('add', pokemon);
}

function unSelectPokemon(pokemon) {
    emit('remove', pokemon);
}

function goToDetails(pokemon) {
    router.push({ name: 'team.details', params: { id: pokemon.info.id } })
}




</script>

<style lang="scss" scoped>

</style>