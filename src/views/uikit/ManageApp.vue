<script setup>
import { computed, ref } from 'vue';

const showEditModal = ref(false);
const showDeleteConfirm = ref(false);
const selectedAppointment = ref(null);
const searchQuery = ref('');

// Generate 50 appointments
const generateAppointments = () => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const addresses = ['Initial MLO8', 'Manticao MLO8', 'Naawan MLO8', 'Opol MLO8', 'Cagayan MLO8', 'Iligan MLO8'];
    const statuses = ['Completed', 'Cancel', 'In Progress'];
    const appointments = [];

    for (let i = 1; i <= 50; i++) {
        appointments.push({
            no: String(i).padStart(2, '0'),
            name: `Patient ${i}`,
            day: days[i % 7],
            date: '2025-11-30',
            address: addresses[i % addresses.length],
            status: statuses[i % statuses.length]
        });
    }
    return appointments;
};

const appointments = ref(generateAppointments());

const filteredAppointments = computed(() => {
    if (!searchQuery.value) return appointments.value;

    const query = searchQuery.value.toLowerCase();
    return appointments.value.filter(
        (appointment) =>
            appointment.name.toLowerCase().includes(query) ||
            appointment.no.toLowerCase().includes(query) ||
            appointment.day.toLowerCase().includes(query) ||
            appointment.address.toLowerCase().includes(query) ||
            appointment.status.toLowerCase().includes(query)
    );
});

function editAppointment(appointment) {
    selectedAppointment.value = { ...appointment };
    showEditModal.value = true;
}

function closeModal() {
    showEditModal.value = false;
    selectedAppointment.value = null;
}

function saveAppointment() {
    const index = appointments.value.findIndex((a) => a.no === selectedAppointment.value.no);
    if (index !== -1) {
        appointments.value[index] = { ...selectedAppointment.value };
    }
    closeModal();
}

function confirmDelete(appointment) {
    selectedAppointment.value = appointment;
    showDeleteConfirm.value = true;
}

function deleteAppointment() {
    const index = appointments.value.findIndex((a) => a.no === selectedAppointment.value.no);
    if (index !== -1) {
        appointments.value.splice(index, 1);
    }
    showDeleteConfirm.value = false;
    selectedAppointment.value = null;
}
function getStatusClass(status) {
    switch (status) {
        case 'Completed':
            return 'bg-gray-300 text-gray-800';
        case 'Cancel':
            return 'bg-gray-300 text-gray-800';
        case 'In Progress':
            return 'bg-gray-300 text-gray-800';
        default:
            return 'bg-gray-300 text-gray-800';
    }
}
</script>

<template>
    <div class="p-6">
        <div class="bg-white rounded-lg shadow-lg p-6">
            <h1 class="text-2xl font-bold text-center mb-6">MANAGE APPOINTMENT</h1>

            <!-- Search Bar -->
            <div class="mb-6">
                <input
                    v-model="searchQuery"
                    type="text"
                    placeholder="Search by name, appointment no., day, address, or status..."
                    class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                />
            </div>

            <!-- Table -->
            <div class="overflow-x-auto">
                <table class="w-full border-collapse">
                    <thead>
                        <tr class="border-b-2 border-gray-300">
                            <th class="text-left p-4 font-semibold text-sm">Appointment No.</th>
                            <th class="text-left p-4 font-semibold text-sm">NAME</th>
                            <th class="text-left p-4 font-semibold text-sm">Appointment day</th>
                            <th class="text-left p-4 font-semibold text-sm">Appointment Date</th>
                            <th class="text-left p-4 font-semibold text-sm">Address</th>
                            <th class="text-left p-4 font-semibold text-sm">Appointment status</th>
                            <th class="text-center p-4 font-semibold text-sm">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="appointment in filteredAppointments" :key="appointment.no" class="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                            <td class="p-4">{{ appointment.no }}</td>
                            <td class="p-4">{{ appointment.name }}</td>
                            <td class="p-4">{{ appointment.day }}</td>
                            <td class="p-4">{{ appointment.date }}</td>
                            <td class="p-4">{{ appointment.address }}</td>
                            <td class="p-4">
                                <button :class="['px-4 py-1 rounded text-sm font-medium', getStatusClass(appointment.status)]">
                                    {{ appointment.status }}
                                </button>
                            </td>
                            <td class="p-4">
                                <div class="flex justify-center gap-2">
                                    <button @click="editAppointment(appointment)" class="px-3 py-1 text-white rounded text-sm hover:opacity-80 transition-opacity" style="background-color: #aacf1f">Edit</button>
                                    <button @click="confirmDelete(appointment)" class="px-3 py-1 text-white rounded text-sm hover:opacity-80 transition-opacity" style="background-color: #a25a80">Delete</button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <!-- Edit Modal -->
    <div v-if="showEditModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" @click.self="closeModal">
        <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full">
            <div class="p-6">
                <h2 class="text-xl font-bold mb-4">Edit Appointment</h2>

                <div class="space-y-4">
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-semibold mb-2">Appointment No.</label>
                            <input v-model="selectedAppointment.no" type="text" class="w-full px-3 py-2 border rounded" disabled />
                        </div>
                        <div>
                            <label class="block text-sm font-semibold mb-2">Name</label>
                            <input v-model="selectedAppointment.name" type="text" class="w-full px-3 py-2 border rounded" />
                        </div>
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-semibold mb-2">Appointment Day</label>
                            <select v-model="selectedAppointment.day" class="w-full px-3 py-2 border rounded">
                                <option>Monday</option>
                                <option>Tuesday</option>
                                <option>Wednesday</option>
                                <option>Thursday</option>
                                <option>Friday</option>
                                <option>Saturday</option>
                                <option>Sunday</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold mb-2">Appointment Date</label>
                            <input v-model="selectedAppointment.date" type="date" class="w-full px-3 py-2 border rounded" />
                        </div>
                    </div>

                    <div>
                        <label class="block text-sm font-semibold mb-2">Address</label>
                        <input v-model="selectedAppointment.address" type="text" class="w-full px-3 py-2 border rounded" />
                    </div>

                    <div>
                        <label class="block text-sm font-semibold mb-2">Status</label>
                        <select v-model="selectedAppointment.status" class="w-full px-3 py-2 border rounded">
                            <option>Completed</option>
                            <option>Cancel</option>
                            <option>In Progress</option>
                        </select>
                    </div>

                    <div class="flex justify-end gap-4 mt-6">
                        <button @click="closeModal" class="px-6 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition-colors">Cancel</button>
                        <button @click="saveAppointment" class="px-6 py-2 text-white rounded hover:opacity-80 transition-opacity" style="background-color: #aacf1f">Update</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteConfirm" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" @click.self="showDeleteConfirm = false">
        <div class="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div class="p-6">
                <h2 class="text-xl font-bold mb-4 text-red-600">Confirm Delete</h2>
                <p class="mb-6">
                    Are you sure you want to delete appointment <strong>{{ selectedAppointment?.no }}</strong> for <strong>{{ selectedAppointment?.name }}</strong
                    >?
                </p>

                <div class="flex justify-end gap-4">
                    <button @click="showDeleteConfirm = false" class="px-6 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition-colors">Cancel</button>
                    <button @click="deleteAppointment" class="px-6 py-2 text-white rounded hover:opacity-80 transition-opacity" style="background-color: #a25a80">Delete</button>
                </div>
            </div>
        </div>
    </div>
</template>
