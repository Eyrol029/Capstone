<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const role = ref('admin')
const username = ref('')
const password = ref('')
const error = ref('')

// HARD-CODED USERS
const users = {
    admin: {
        username: 'admin@gmail.com',
        password: 'admin123'
    },
    midwife: {
        username: 'midwife@gmail.com',
        password: 'midwife123'
    },
    'ob-gyne': {
        username: 'obgyne@gmail.com',
        password: 'obgyne123'
    },
    patient: {
        username: 'patient@gmail.com',
        password: 'patient123'
    }
}

function selectRole(selectedRole) {
    role.value = selectedRole
    error.value = ''
}

function login() {
    error.value = ''

    if (!username.value || !password.value) {
        error.value = 'Please enter both username and password.'
        return
    }

    const user = users[role.value]

    if (
        user &&
        username.value === user.username &&
        password.value === user.password
    ) {
        switch (role.value) {
            case 'admin':
                router.push({ name: 'AdminDashboard' })
                break
            case 'midwife':
                router.push({ name: 'MidwifeDashboard' })
                break
            case 'ob-gyne':
                router.push({ name: 'ObGyneDashboard' })
                break
            case 'patient':
                router.push({ name: 'PatientDashboard' })
                break
        }
    } else {
        error.value = 'Invalid username or password.'
    }
}

function handleKeyPress(event) {
    if (event.key === 'Enter') login()
}
</script>

<template>
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#8e4f70] to-[#6f3c58] p-6">
        <div class="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">

            <h1 class="text-3xl font-bold text-center text-gray-800 mb-2">
                Tating's Birthing Home
            </h1>
            <p class="text-center text-gray-600 mb-6">
                Select role and login
            </p>

            <!-- ERROR MESSAGE -->
            <div v-if="error" class="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg mb-4">
                {{ error }}
            </div>

            <!-- ROLE SELECTION -->
            <div class="grid grid-cols-2 gap-3 mb-6">
                <div
                    v-for="r in ['admin', 'midwife', 'ob-gyne', 'patient']"
                    :key="r"
                    @click="selectRole(r)"
                    :class="[
                        'cursor-pointer border-2 rounded-xl p-4 text-center transition-all',
                        role === r
                            ? 'border-indigo-500 bg-indigo-50 text-indigo-700 font-semibold'
                            : 'border-gray-300 hover:border-indigo-300'
                    ]"
                >
                    {{ r.toUpperCase() }}
                </div>
            </div>

            <!-- LOGIN FORM -->
            <div class="space-y-4">
                <div>
                    <label class="block text-sm font-semibold mb-1">Username</label>
                    <input
                        v-model="username"
                        type="text"
                        placeholder="Enter username"
                        @keypress="handleKeyPress"
                        class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div>
                    <label class="block text-sm font-semibold mb-1">Password</label>
                    <input
                        v-model="password"
                        type="password"
                        placeholder="Enter password"
                        @keypress="handleKeyPress"
                        class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <button
                    @click="login"
                    class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition"
                >
                    Login
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.login-container {
    animation: fadeIn 0.4s ease-in;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
