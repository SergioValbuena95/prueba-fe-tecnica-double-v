<template>
    <div>
        <p class="text-center mb-5">Pokemon selected</p>
        <div class="shadow bg-white text-black rounded-lg py-4 w-full lg:w-8/12 mx-auto">
            <p class="text-4xl text-center font-bold capitalize mb-5">{{pokemonSelected.name}}</p>
            <div class="flex w-full gap-x-4">
                <div class="w-5/12">
                    <img :src="pokemonSelected?.sprites?.front_default" alt="" class="mx-auto size-40">
                    <div class="flex flex-col gap-y-1 px-4">
                        <div class="flex justify-center gap-x-2">
                            <p class="font-bold">Altura: </p>
                            <span class="font-light">{{ pokemonSelected.height }}</span>
                        </div>
                        <hr>
                        <div class="flex justify-center gap-x-2">
                            <p class="font-bold">Peso: </p>
                            <span class="font-light">{{ pokemonSelected.weight }}</span>
                        </div>
                        <hr>
                        <p class="text-xl text-center font-bold capitalize mb-1 mt-4">Evolutions</p>
                        <ul class="px-10">
                            <li v-for="item in evolutionsChainGroup" :key="item.id">
                                {{ item.name }}
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="w-7/12">
                    <div id="chartStats" ref="chartRef" :style="{ width: '100%', height: '400px' }"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router';

const router = useRouter()
const route = useRoute()

const chartRef = ref(null);

const pokemonSelected = ref([])
const pokemonStats = ref([])
const pokemonStatsNames = ref([])
const pokemonStatsValues = ref([])
const pokemonEvolutionChain = ref([])

const evolutionsChainGroup = ref([]);



onMounted(() => {
    getPokemon()
    getPokemonsEvolutionChain()
    const myChart = echarts.init(document.getElementById('chartStats'));
    if(pokemonStats){
        setTimeout(() => {
            pokemonStatsNames.value = pokemonStats.value.map(stat => stat?.stat?.name)
            pokemonStatsValues.value = pokemonStats.value.map(stat => stat.base_stat)
            myChart.setOption({
                tooltip: {},
                xAxis: {
                    data: pokemonStatsNames.value
                },
                yAxis: {},
                series: [
                    {
                        name: 'Stat',
                        type: 'bar',
                        data: pokemonStatsValues.value
                    }
                ]
            });
        }, 500);
    }
});

const idPokemon = computed(() => {
    return route.params.id
})

function getPokemon() {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${idPokemon.value}`)
    .then(response => {
        pokemonSelected.value = response.data
        pokemonStats.value = response.data.stats
    })
    .catch(error => {
        console.error('There was an error!', error)
    })
}

function getPokemonsEvolutionChain() {
    axios.get(`https://pokeapi.co/api/v2/evolution-chain/${idPokemon.value}/`)
    .then(response => {
        pokemonEvolutionChain.value = response.data
        extractSpecies(pokemonEvolutionChain.value)
    })
    .catch(error => {
        console.error('There was an error!', error)
    })
}

function traverseChain(chain) {
    if (chain.species) {
        evolutionsChainGroup.value.push(chain.species);
    }
    if (chain.evolves_to) {
        chain.evolves_to.forEach(evolution => traverseChain(evolution));
    }
}

function extractSpecies(data) {
    traverseChain(data.chain);
}



</script>

<style>
ul{
    list-style-type: disc !important;
}
</style>