<template>
    <div
        class="bg-white shadow-md rounded-lg p-5 border border-gray-200 hover:shadow-lg transition"
    >
        <h3 class="text-xl font-bold text-blue-600 mb-2">
            {{ name }}
        </h3>
        <p class="text-gray-600 mb-1">
            <span class="font-medium">Username:</span>
            {{ username }}
        </p>
        <p class="text-gray-600 mb-1">
            <span class="font-medium">Email:</span>
            {{ email }}
        </p>
        <p class="text-gray-600 mb-1">
            <span class="font-medium">Phone:</span>
            {{ phone }}
        </p>
        <p class="text-gray-600 mb-1">
            <span class="font-medium">Website:</span>
            <a
                :href="'https://' + website"
                target="_blank"
                class="text-blue-500 hover:underline"
            >
                {{ website }}
            </a>
        </p>

        <div class="mt-3">
            <p class="text-gray-700 font-medium">Company:</p>
            <p class="text-gray-600">{{ company.name }}</p>
        </div>

        <div class="mt-3">
            <p class="text-gray-700 font-medium">Address:</p>
            <p class="text-gray-600 text-sm">
                {{ address.suite }}, {{ address.street }},<br />
                {{ address.city }} ({{ address.zipcode }})
            </p>
        </div>
    </div>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import { storeToRefs } from 'pinia';
import { usePokemonStore } from '../store/pokemon.js';
import { useRouter } from 'vue-router';

const props = defineProps({
    id:{
        type: Number,
        required: true,
    },
    name:{
        type: String,
        required: true,
        default: 'John Doe'
    },
    username:{
        type: String,
        default: 'JohnDoe'
    },
    email:{
        type: String,
        default: 'nombre@mail.com'
    },
    phone:{
        type: String,
        default: '000000000'

    },
    website:{
        type: String,
        required: true,
        default: 'https://website.com'
    },
    company:{
        type: Object,
        default: () => {}
    },
    address:{
        type: Object,
        default: () => {}
    },
});

</script>

<style lang="scss" scoped>

</style>