import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

// Replace enum with plain object
export const UserRole = {
    ADMIN: 'ADMIN',
    MIDWIFE: 'MIDWIFE',
    OBGYNE: 'OBGYNE',
    PATIENT: 'PATIENT'
};

const STORAGE_KEY = 'user_data';

// Temporary mock users
const TEMPORARY_ACCOUNTS = {
    [UserRole.ADMIN]: {
        id: 1,
        name: 'Admin User',
        email: 'admin@gmail.com',
        role: UserRole.ADMIN,
        password: 'adminpassword1234'
    },
    [UserRole.MIDWIFE]: {
        id: 2,
        name: 'Midwife User',
        email: 'midwife@gmail.com',
        role: UserRole.MIDWIFE,
        password: 'midwifepassword1234'
    },
    [UserRole.OBGYNE]: {
        id: 3,
        name: 'OBGYNE User',
        email: 'obgyne@gmail.com',
        role: UserRole.OBGYNE,
        password: 'obgynepassword1234'
    },
    [UserRole.PATIENT]: {
        id: 4,
        name: 'Patient User',
        email: 'patient@gmail.com',
        role: UserRole.PATIENT,
        password: 'patientpassword1234'
    }
};

// Helper to check if localStorage is available
function isLocalStorageAvailable() {
    try {
        return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
    } catch {
        return false;
    }
}

export const useUserDataStore = defineStore('userData', () => {
    // state
    const user = ref(null);
    const isLoading = ref(false);

    // getters
    const isLoggedIn = computed(() => !!user.value);
    const displayName = computed(() => user.value?.name ?? 'Guest');

    // helpers
    function persist(payload) {
        if (!isLocalStorageAvailable()) return;
        try {
            if (payload) {
                localStorage.setItem(STORAGE_KEY, btoa(JSON.stringify(payload)));
            } else {
                localStorage.removeItem(STORAGE_KEY);
            }
        } catch (error) {
            console.error('Failed to persist user data:', error);
        }
    }

    // actions
    function hydrate() {
        if (!isLocalStorageAvailable()) return;
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                user.value = JSON.parse(atob(stored));
            }
        } catch (error) {
            console.error('Failed to hydrate user data:', error);
        }
    }

    function setUser(payload) {
        user.value = payload;
        persist(payload);
    }

    function clearUser() {
        user.value = null;
        persist(null);
    }

    async function login(email, password, role) {
        try {
            isLoading.value = true;

            const targetUser = TEMPORARY_ACCOUNTS[role];

            if (targetUser && targetUser.email === email && targetUser.password === password) {
                const { password: _, ...safeUser } = targetUser;
                setUser(safeUser);
                return true;
            }

            return false;
        } finally {
            isLoading.value = false;
        }
    }

    function logout() {
        clearUser();
    }

    return {
        user,
        isLoading,
        isLoggedIn,
        displayName,
        hydrate,
        setUser,
        clearUser,
        login,
        logout
    };
});