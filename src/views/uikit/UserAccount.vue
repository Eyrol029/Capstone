<script setup>
import { ref, computed } from 'vue';

const view = ref('list');
const selectedUser = ref(null);

const users = ref([
  { 
    id: 'U001', 
    username: 'admin', 
    fullName: 'System Administrator', 
    role: 'Administrator', 
    email: 'admin@clinic.com', 
    status: 'Active' 
  },
  { 
    id: 'U002', 
    username: 'dr.reyes', 
    fullName: 'Dr. Carmen Reyes', 
    role: 'Doctor', 
    email: 'carmen.reyes@clinic.com', 
    status: 'Active' 
  },
  { 
    id: 'U003', 
    username: 'nurse.elena', 
    fullName: 'Nurse Elena Santos', 
    role: 'Nurse', 
    email: 'elena.santos@clinic.com', 
    status: 'Active' 
  }
]);

const formData = ref({
  username: '',
  fullName: '',
  role: 'Nurse',
  email: '',
  password: '',
  confirmPassword: '',
  status: 'Active'
});

const userList = computed(() => users.value);

const searchQuery = ref('');
const roleFilter = ref('');
const filteredUsers = computed(() => {
  const q = searchQuery.value.trim().toLowerCase();
  return userList.value.filter(u => {
    // Role filters: '' = all, 'Employee' = non-patients, 'Patient' = patients
    if (roleFilter.value === 'Patient' && u.role !== 'Patient') return false;
    if (roleFilter.value === 'Employee' && u.role === 'Patient') return false;
    if (!q) return true;
    return (
      (u.username || '').toLowerCase().includes(q) ||
      (u.fullName || '').toLowerCase().includes(q) ||
      (u.role || '').toLowerCase().includes(q) ||
      (u.email || '').toLowerCase().includes(q) ||
      (u.status || '').toLowerCase().includes(q)
    );
  });
});

function clearSearch() {
  searchQuery.value = '';
}

function openAddForm() {
  resetForm();
  view.value = 'add';
} 

function resetForm() {
  formData.value = {
    username: '',
    fullName: '',
    role: 'Nurse',
    email: '',
    password: '',
    confirmPassword: '',
    status: 'Active'
  };
  selectedUser.value = null;
  view.value = 'list';
} 

function handleAddUser() {
  if (formData.value.password !== formData.value.confirmPassword) {
    alert('Passwords do not match');
    return;
  }

  users.value.push({
    id: `U${String(users.value.length + 1).padStart(3, '0')}`,
    username: formData.value.username,
    fullName: formData.value.fullName,
    role: formData.value.role,
    email: formData.value.email,
    status: formData.value.status
  });

  resetForm();
  alert('User added successfully!');
}

function openEditForm(user) {
  selectedUser.value = user;
  formData.value = {
    username: user.username,
    fullName: user.fullName,
    role: user.role,
    email: user.email,
    password: '',
    confirmPassword: '',
    status: user.status
  };
  view.value = 'edit';
}  

function handleEditUser() {
  if (formData.value.password && formData.value.password !== formData.value.confirmPassword) {
    alert('Passwords do not match');
    return;
  }

  const index = users.value.findIndex(u => u.id === selectedUser.value.id);
  if (index !== -1) {
    users.value[index] = {
      ...selectedUser.value,
      username: formData.value.username,
      fullName: formData.value.fullName,
      role: formData.value.role,
      email: formData.value.email,
      status: formData.value.status
    };
  }

  resetForm();
  alert('User updated successfully!');
}

function handleDeleteUser(id) {
  if (id === 'U001') {
    alert('Cannot delete system administrator');
    return;
  }
  if (confirm('Are you sure you want to delete this user?')) {
    users.value = users.value.filter(u => u.id !== id);
    alert('User deleted successfully!');
  }
}
</script>

<template>
  <div class="p-6 bg-white min-h-screen">
    <!-- FORM -->
    <div v-if="view === 'add' || view === 'edit'" class="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
      <h3 class="text-xl font-semibold mb-6">
        {{ view === 'add' ? 'Add New User Account' : 'Edit User Account' }}
      </h3>

      <form @submit.prevent="view === 'add' ? handleAddUser() : handleEditUser()" class="space-y-4">
        <div>
          <label class="block text-sm font-semibold mb-2">Username *</label>
          <input 
            v-model="formData.username" 
            type="text"
            required 
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div>
          <label class="block text-sm font-semibold mb-2">Full Name *</label>
          <input 
            v-model="formData.fullName" 
            type="text"
            required 
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
          />
        </div>



        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-semibold mb-2">Role *</label>
            <select 
              v-model="formData.role" 
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
            >
              <option>Administrator</option>
              <option>Doctor</option>
              <option>Nurse</option>
              <option>Midwife</option>
              <option>Receptionist</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-semibold mb-2">Status *</label>
            <select 
              v-model="formData.status" 
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
            >
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
        </div>

        <div>
          <label class="block text-sm font-semibold mb-2">Email</label>
          <input 
            type="email" 
            v-model="formData.email" 
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-semibold mb-2">Password {{ view === 'edit' ? '(leave blank to keep current)' : '*' }}</label>
            <input 
              type="password" 
              v-model="formData.password" 
              :required="view === 'add'"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label class="block text-sm font-semibold mb-2">Confirm Password {{ view === 'edit' ? '' : '*' }}</label>
            <input 
              type="password" 
              v-model="formData.confirmPassword" 
              :required="view === 'add'"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>

        <div class="flex gap-3 pt-4">
          <button 
            type="submit"
            class="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
          >
            {{ view === 'add' ? 'Create Account' : 'Save Changes' }}
          </button>
          <button 
            type="button" 
            @click="resetForm"
            class="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>

    <!-- TABLE -->
    <div v-else>
      <div class="flex justify-between items-center mb-6">
        <div>
          <h3 class="text-2xl font-bold text-gray-800">Staff Accounts</h3>
          <p class="text-sm text-gray-500 mt-1">Manage Staff Users</p>
        </div>
        <div class="flex items-center gap-4">
          <div class="relative">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search users..."
              class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
            />
            <button
              v-if="searchQuery"
              @click="clearSearch"
              class="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-600 px-2 py-1"
              aria-label="Clear search"
            >
              ×
            </button>
          </div>

          <div class="flex items-center gap-2">
             <button @click="$router.push('/uikit/UserAccount')" class="px-3 py-2 rounded bg-teal-100 text-teal-700 hover:bg-teal-200">Employees</button>
          <button @click="$router.push('/uikit/UserAccountPatient')" class="px-3 py-2 rounded bg-teal-100 text-teal-700 hover:bg-teal-200">Patients</button>
          </div>
          <button 
            @click="openAddForm()" 
            class="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 flex items-center gap-2">

            <span class="text-xl">+</span>
            Add User
          </button>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50 border-b border-gray-200">
              <tr>
                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">ID</th>
                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Username</th>
                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Full Name</th>
                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Role</th>
                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Email</th>
                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                <th class="px-6 py-4 text-center text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>

            <tbody class="divide-y divide-gray-200">
              <tr v-for="user in filteredUsers" :key="user.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 text-sm text-gray-900">{{ user.id }}</td>
                <td class="px-6 py-4 text-sm text-gray-900">{{ user.username }}</td>
                <td class="px-6 py-4 text-sm text-gray-900">{{ user.fullName }}</td>
                <td class="px-6 py-4 text-sm text-gray-900">{{ user.role }}</td>
                <td class="px-6 py-4 text-sm text-gray-900">{{ user.email }}</td>
                <td class="px-6 py-4">
                  <span 
                    :class="[
                      'px-3 py-1 rounded-full text-xs font-semibold',
                      user.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-700'
                    ]"
                  >
                    {{ user.status }}
                  </span>
                </td>
                <td class="px-6 py-4">
                  <div class="flex justify-center gap-2">
                    <button 
                      @click="openEditForm(user)" 
                      class="px-3 py-1 bg-blue-50 text-blue-700 rounded hover:bg-blue-100 text-sm font-semibold"
                    >
                      Edit
                    </button>
                    <button
                      @click="handleDeleteUser(user.id)"
                      :disabled="user.id === 'U001'"
                      :class="[
                        'px-3 py-1 rounded text-sm font-semibold',
                        user.id === 'U001' 
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                          : 'bg-red-50 text-red-700 hover:bg-red-100'
                      ]"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div v-if="filteredUsers.length === 0" class="text-center py-12">
        <p class="text-gray-500">{{ searchQuery ? 'No users match your search' : 'No users found' }}</p>
      </div>
    </div>
  </div>
</template>
