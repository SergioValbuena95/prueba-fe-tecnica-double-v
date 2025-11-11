<template>
    <div class="flex flex-col">
        <div class="mb-5">
            <p class="font-bold">Users ({{ userList.length }})</p>
            <hr class="bg-white w-full">
        </div>
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <cardUser
                v-for="user in userList"
                :key="user.id"
                :id="user.id"
                :name="user.name"
                :username="user.username"
                :email="user.email"
                :phone="user.phone"
                :website="user.website"
                :company="user.company"
                :address="user.address"
                @click="getUserInfo(user)"
            />
        </div>
    </div>

    <!-- Modal -->
    <div v-if="isOpen && userSelected" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-2xl shadow-lg p-6 relative max-h-[650px] min-w-[640px] max-w-[50vw]">
            <h2 class="text-xl font-semibold  text-black">
                {{ userSelectedName }} - {{ completedCount }}/{{ userSelected.length }}
            </h2>
            <hr>
            <input
                v-model="searchTodos"
                type="text"
                placeholder="Search todos..."
                class="w-full my-2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            />
            <hr>
            <div v-if="filteredTodos.length" class="flex flex-col gap-2 overflow-auto h-[445px] my-4 pe-2">
                <li
                    v-for="item in filteredTodos"
                    :key="item.id"
                    class="border rounded-sm p-2 flex items-center justify-between"
                >
                    <div class="flex items-center gap-2">
                        <p class="text-sm  text-gray-800 font-medium">
                            {{ item.id }}.
                        </p>
                        <p
                        class="text-gray-500 first-letter:uppercase truncate max-w-[425px]"
                        v-html="highlightMatch(item.title)"
                        ></p>
                    </div>
                    <span
                        class="px-3 py-1 text-sm rounded-full"
                        :class="item.completed ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-700'"
                    >
                        {{ item.completed ? 'Completed' : 'Pending' }}
                    </span>
                </li>
            </div>
            <p v-if="filteredTodos.length === 0" class="text-center text-gray-500 mt-6">
                No todos found.
            </p>
            <div class="flex justify-end space-x-2">
                <button
                    @click="isOpen = false"
                    class="bg-gray-200 text-gray-800 px-4 py-2 rounded-md"
                >
                    Close
                </button>
            </div>
            <button @click="isOpen = false" class="absolute top-2 right-2 text-gray-400">
                ✕
            </button>
        </div>
    </div>
</template>

<script setup>
import { computed, onBeforeMount, ref, reactive } from 'vue'
import axios from 'axios'
import cardUser from '../../components/cardUser.vue'

const searchTodos = ref('')
const userList = ref([])
const userSelected = ref({})
const userSelectedName = ref('')
const isOpen = ref(false)


onBeforeMount(() => {
    getUsersList()
})

const filteredTodos = computed(() => {
    const query = searchTodos.value.trim().toLowerCase()
    if (!query) return userSelected.value
    return userSelected.value.filter(todo =>
        todo.title.toLowerCase().includes(query)
    )
})

const completedCount = computed(() =>
  userSelected.value.filter(todo => todo.completed).length
)

const pendingCount = computed(() =>
  userSelected.value.filter(todo => !todo.completed).length
)


async function getUsersList() {
    axios.get(`https://jsonplaceholder.typicode.com/users`)
    .then(response => {
        userList.value = response.data
    })
    .catch(error => {
        console.error('There was an error!', error)
    })
}

async function getUserInfo({name, id}) {
    userSelectedName.value = name
    axios.get(`https://jsonplaceholder.typicode.com/users/${id}/todos`)
    .then(response => {
        userSelected.value = response.data.sort((a, b) => a.completed - b.completed);
        if (userSelected){
            isOpen.value = true
        }
    })
    .catch(error => {
        console.error('There was an error!', error)
    })
}

function highlightMatch(text) {
    const query = searchTodos.value.trim();
    if (!query) return text;
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, `<mark class="bg-yellow-200 text-black">$1</mark>`);
}

</script>

<style lang="scss" scoped>

</style>