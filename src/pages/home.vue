<template>
    <div class="flex flex-col">
        <div class="text-center mb-5">
            <input
                v-model="searchPokemon"
                placeholder="Search pokemon"
                type="text"
                class="bg-white text-center rounded-full h-8 text-black px-2"
            >
        </div>
        <div class="flex flex-wrap gap-3 justify-center">
            <cardPokemon v-for="(item, index) in filteredPokemon"
                :key="index"
                :data="item"
                @add="addPokemonTeam(item)"
                @remove="removePokemonTeam(item)"
            />
        </div>
        <div class="flex justify-center gap-x-4 mt-2">
            <button class="bg-blue-500 text-white cursor-pointer rounded-md py-1 px-2" :disabled="isFirstPage" @click="prevPage">
                Prev
            </button>
            <button class="bg-blue-500 text-white cursor-pointer rounded-md py-1 px-2" :disabled="isLastPage" @click="nextPage">
                Next
            </button>
        </div>
    </div>
</template>

<script setup>
import { computed, onBeforeMount, ref } from 'vue'
import axios from 'axios'
import { storeToRefs } from 'pinia';
import cardPokemon from '../components/cardPokemon.vue'
import { usePokemonStore } from '../store/pokemon.js';

const searchPokemon = ref('')
const pokemonList = ref([])
const pokemonListData = ref([])
const limit = ref(25);
const offset = ref(0);
const total = ref(151);

const pokemonsStore = usePokemonStore();
const { selectPokemon, unselectPokemon } = storeToRefs(pokemonsStore);

onBeforeMount(() => {
    getPokemonsList()
})

const isFirstPage = computed(() => offset.value === 0);
const isLastPage = computed(() => offset.value + limit.value >= total.value);

const filteredPokemon = computed(() => {
    return pokemonList.value.filter(pokemon =>
        pokemon.name.toLowerCase().includes(searchPokemon.value.toLowerCase())
    );
});

async function getPokemonsList() {
    axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit.value}&offset=${offset.value}`)
    .then(response => {
        pokemonList.value = response.data?.results
        pokemonListData.value = pokemonList.value.forEach((element,index) => {
            axios.get(`https://pokeapi.co/api/v2/pokemon/${element.name}`)
            .then(response => {
                element.info = response.data
            })
            .catch(error => {
                console.error('There was an error!', error)
            })
        });
    })
    .catch(error => {
        console.error('There was an error!', error)
    })
}

function addPokemonTeam(pokemon) {
    pokemonsStore.selectPokemon(pokemon)
}

function removePokemonTeam(pokemon) {
    pokemonsStore.unselectPokemon(pokemon)
}

function prevPage() {
    if (offset.value >= limit.value) {
        offset.value -= limit.value;
        getPokemonsList();
    }
}

function nextPage() {
    offset.value += limit.value;
    getPokemonsList();
}

</script>

<style lang="scss" scoped>

</style>