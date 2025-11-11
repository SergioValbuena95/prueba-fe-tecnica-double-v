<template>
    <div class="flex flex-wrap gap-3 justify-center">
        <template v-if="myTeam.length">
            <cardPokemon v-for="(item, index) in myTeam" :key="index" :data="item" @add="addPokemonTeam(item)" @remove="removePokemonTeam(item)" >
                <div class="flex justify-center gap-x-4">
                    <div v-for="type in item.info.types" :key="type.id" class="capitalize">
                        {{ type.type.name }}
                    </div>
                </div>
            </cardPokemon>
        </template>
        <div v-else class=" border border-white rounded-md p-2 hover:bg-green-400 hover:border-green-400 transition-all duration-300 cursor-pointer" @click="goToHome">
            Agregar pokemones
        </div>
    </div>
</template>

<script setup>
import { computed, onBeforeMount, ref } from 'vue'
import cardPokemon from '../components/cardPokemon.vue'
import { storeToRefs } from 'pinia';
import { usePokemonStore } from '../store/pokemon.js';
import { useRouter } from 'vue-router';

const pokemonsStore = usePokemonStore();
const { myTeam, selectPokemon, unselectPokemon } = storeToRefs(pokemonsStore);

const router = useRouter()

const myTeam2 = ref([])

onBeforeMount(() => {
    getMyTeam()
})

function getMyTeam() {
    // pokemonsStore.GetMyTeam(pokemon)
}

function goToHome() {
    router.push({ name: 'home' })
}

function addPokemonTeam(pokemon) {
    pokemonsStore.selectPokemon(pokemon)
}

function removePokemonTeam(pokemon) {
    pokemonsStore.unselectPokemon(pokemon)
}



</script>

<style lang="scss" scoped>

</style>