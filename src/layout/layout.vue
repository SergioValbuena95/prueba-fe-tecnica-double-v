<template>
    <div class="flex w-full">
        <div
            class="relative flex h-screen w-full max-w-[20rem] flex-col rounded-e-xl bg-white bg-clip-border p-4 text-gray-700 shadow-xl shadow-blue-gray-900/5">
            <div class="p-4 mb-2">
                <h5 class="block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                    {{ route.name === 'users' ? 'Users' : 'Pokemones' }}
                </h5>
            </div>
            <nav  class="flex min-w-[240px] flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700">
                <div role="button" class="flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
                    <router-link :to="{ name: 'home' }">Pokemons</router-link>
                </div>
                <div role="button" class="flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
                    <router-link :to="{ name: 'team' }">Equipo <span>({{myTeam.length}})</span> </router-link>
                </div>
                <hr>
                <div role="button" class="flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
                    <router-link :to="{ name: 'users' }">Users</router-link>
                </div>
            </nav>
        </div>
        <div class="p-5 w-full overflow-auto h-screen">
            <router-view />
        </div>
    </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router'

import { usePokemonStore } from '../store/pokemon.js';

const route = useRoute()

const pokemonsStore = usePokemonStore();
const { myTeam } = storeToRefs(pokemonsStore);


</script>

<style lang="scss" scoped>

</style>