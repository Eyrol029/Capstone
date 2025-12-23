<script setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

const searchQuery = ref('');
const statusFilter = ref('all');
const serviceFilter = ref('all');
const sortField = ref('name');
const sortOrder = ref('asc');

// Sample patient data
const patients = ref([
    {
        id: 'P001',
        name: 'Maria Santos',
        email: 'maria.santos@email.com',
        phone: '09123456789',
        service: 'Prenatal Checkup',
        totalBill: 5000,
        amountPaid: 5000,
        paymentStatus: 'paid'
    },
    {
        id: 'P002',
        name: 'Ana Cruz',
        email: 'ana.cruz@email.com',
        phone: '09234567890',
        service: 'Normal Delivery',
        totalBill: 25000,
        amountPaid: 15000,
        paymentStatus: 'partial'
    },
    {
        id: 'P003',
        name: 'Rosa Mendoza',
        email: 'rosa.mendoza@email.com',
        phone: '09345678901',
        service: 'Family Planning',
        totalBill: 2000,
        amountPaid: 0,
        paymentStatus: 'pending'
    },
    {
        id: 'P004',
        name: 'Elena Reyes',
        email: 'elena.reyes@email.com',
        phone: '09456789012',
        service: 'Postnatal Care',
        totalBill: 3500,
        amountPaid: 1500,
        paymentStatus: 'partial'
    },
    {
        id: 'P005',
        name: 'Carmen Garcia',
        email: 'carmen.garcia@email.com',
        phone: '09567890123',
        service: 'Prenatal Checkup',
        totalBill: 5000,
        amountPaid: 5000,
        paymentStatus: 'paid'
    }
]);

const services = computed(() => {
    return ['all', ...new Set(patients.value.map((p) => p.service))];
});

const filteredPatients = computed(() => {
    return patients.value.filter((patient) => {
        const matchesSearch = patient.name.toLowerCase().includes(searchQuery.value.toLowerCase()) || patient.email.toLowerCase().includes(searchQuery.value.toLowerCase()) || patient.phone.includes(searchQuery.value);

        const matchesStatus = statusFilter.value === 'all' || patient.paymentStatus === statusFilter.value;

        const matchesService = serviceFilter.value === 'all' || patient.service === serviceFilter.value;

        return matchesSearch && matchesStatus && matchesService;
    });
});

const sortedPatients = computed(() => {
    const copy = [...filteredPatients.value];
    copy.sort((a, b) => {
        let aVal, bVal;

        switch (sortField.value) {
            case 'name':
                aVal = a.name;
                bVal = b.name;
                break;
            case 'totalBill':
                aVal = a.totalBill;
                bVal = b.totalBill;
                break;
            case 'amountPaid':
                aVal = a.amountPaid;
                bVal = b.amountPaid;
                break;
            case 'outstanding':
                aVal = calculateOutstandingBalance(a);
                bVal = calculateOutstandingBalance(b);
                break;
        }

        if (typeof aVal === 'string') {
            return sortOrder.value === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
        }

        return sortOrder.value === 'asc' ? aVal - bVal : bVal - aVal;
    });

    return copy;
});

const statsFullyPaid = computed(() => sortedPatients.value.filter((p) => p.paymentStatus === 'paid').length);

const statsPartial = computed(() => sortedPatients.value.filter((p) => p.paymentStatus === 'partial').length);

const statsPending = computed(() => sortedPatients.value.filter((p) => p.paymentStatus === 'pending').length);

function calculateOutstandingBalance(patient) {
    return patient.totalBill - patient.amountPaid;
}

function getPaymentPercentage(patient) {
    if (patient.totalBill === 0) return 0;
    return Math.round((patient.amountPaid / patient.totalBill) * 100);
}

function formatCurrency(amount) {
    return '₱' + amount.toLocaleString();
}

function handleSort(field) {
    if (sortField.value === field) {
        sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
    } else {
        sortField.value = field;
        sortOrder.value = 'asc';
    }
}

function getStatusBg(status) {
    switch (status) {
        case 'paid':
            return 'bg-green-100 text-green-700';
        case 'partial':
            return 'bg-yellow-100 text-yellow-700';
        case 'pending':
            return 'bg-red-100 text-red-700';
    }
}

const router = useRouter();

function viewPaymentDetails(patient) {
    // store a fallback in localStorage and pass patient via query
    try {
        localStorage.setItem('payment_patient', JSON.stringify(patient));
    } catch (e) {
        // ignore storage errors
    }

    router.push({
        name: 'PaymentDetails',
        query: { patient: JSON.stringify(patient) }
    });
}
</script>

<template>
    <div class="space-y-6 p-6 bg-white min-h-screen">
        <!-- Filters -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input v-model="searchQuery" type="text" placeholder="Search by name, email, or phone..." class="md:col-span-2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />

            <select v-model="statusFilter" class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="all">All Statuses</option>
                <option value="paid">Paid</option>
                <option value="partial">Partial</option>
                <option value="pending">Pending</option>
            </select>

            <select v-model="serviceFilter" class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option v-for="service in services" :key="service" :value="service">
                    {{ service === 'all' ? 'All Services' : service }}
                </option>
            </select>
        </div>

        <!-- Summary Stats -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div class="bg-gray-50 p-4 rounded-lg shadow">
                <p class="text-sm text-gray-600 mb-1">Total Patients</p>
                <p class="text-3xl font-bold">{{ sortedPatients.length }}</p>
            </div>
            <div class="bg-green-50 text-green-700 p-4 rounded-lg shadow">
                <p class="text-sm mb-1 font-medium">Fully Paid</p>
                <p class="text-3xl font-bold">{{ statsFullyPaid }}</p>
            </div>
            <div class="bg-yellow-50 text-yellow-700 p-4 rounded-lg shadow">
                <p class="text-sm mb-1 font-medium">Partial Payments</p>
                <p class="text-3xl font-bold">{{ statsPartial }}</p>
            </div>
            <div class="bg-red-50 text-red-700 p-4 rounded-lg shadow">
                <p class="text-sm mb-1 font-medium">Pending</p>
                <p class="text-3xl font-bold">{{ statsPending }}</p>
            </div>
        </div>

        <!-- Table -->
        <div class="border border-gray-200 rounded-lg overflow-hidden shadow">
            <div class="overflow-x-auto">
                <table class="w-full">
                    <thead class="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th class="px-6 py-4 text-left">
                                <button @click="handleSort('name')" class="flex items-center gap-2 font-semibold text-sm hover:text-blue-600">
                                    Patient Name
                                    <span v-if="sortField === 'name'">
                                        {{ sortOrder === 'asc' ? '↑' : '↓' }}
                                    </span>
                                </button>
                            </th>
                            <th class="px-6 py-4 text-left font-semibold text-sm">Service</th>
                            <th class="px-6 py-4 text-right">
                                <button @click="handleSort('totalBill')" class="flex items-center justify-end gap-2 font-semibold text-sm ml-auto hover:text-blue-600">
                                    Total Bill
                                    <span v-if="sortField === 'totalBill'">
                                        {{ sortOrder === 'asc' ? '↑' : '↓' }}
                                    </span>
                                </button>
                            </th>
                            <th class="px-6 py-4 text-right">
                                <button @click="handleSort('amountPaid')" class="flex items-center justify-end gap-2 font-semibold text-sm ml-auto hover:text-blue-600">
                                    Amount Paid
                                    <span v-if="sortField === 'amountPaid'">
                                        {{ sortOrder === 'asc' ? '↑' : '↓' }}
                                    </span>
                                </button>
                            </th>
                            <th class="px-6 py-4 text-right">
                                <button @click="handleSort('outstanding')" class="flex items-center justify-end gap-2 font-semibold text-sm ml-auto hover:text-blue-600">
                                    Outstanding
                                    <span v-if="sortField === 'outstanding'">
                                        {{ sortOrder === 'asc' ? '↑' : '↓' }}
                                    </span>
                                </button>
                            </th>
                            <th class="px-6 py-4 text-center font-semibold text-sm">Status</th>
                            <th class="px-6 py-4 text-center font-semibold text-sm">Progress</th>
                            <th class="px-6 py-4 text-center font-semibold text-sm">Action</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                        <tr v-for="patient in sortedPatients" :key="patient.id" class="hover:bg-gray-50 transition-colors">
                            <td class="px-6 py-4">
                                <div>
                                    <p class="font-medium">{{ patient.name }}</p>
                                    <p class="text-sm text-gray-500">{{ patient.email }}</p>
                                </div>
                            </td>
                            <td class="px-6 py-4 text-sm text-gray-600">{{ patient.service }}</td>
                            <td class="px-6 py-4 text-right font-medium">
                                {{ formatCurrency(patient.totalBill) }}
                            </td>
                            <td class="px-6 py-4 text-right font-medium text-green-600">
                                {{ formatCurrency(patient.amountPaid) }}
                            </td>
                            <td class="px-6 py-4 text-right font-medium text-red-600">
                                {{ formatCurrency(calculateOutstandingBalance(patient)) }}
                            </td>
                            <td class="px-6 py-4 text-center">
                                <span :class="['inline-block px-3 py-1 rounded-full text-sm font-medium capitalize', getStatusBg(patient.paymentStatus)]">
                                    {{ patient.paymentStatus }}
                                </span>
                            </td>
                            <td class="px-6 py-4">
                                <div class="flex items-center gap-2">
                                    <div class="w-24 bg-gray-200 rounded-full h-2">
                                        <div class="bg-green-500 h-2 rounded-full transition-all" :style="{ width: getPaymentPercentage(patient) + '%' }"></div>
                                    </div>
                                    <span class="text-sm font-medium text-gray-600"> {{ getPaymentPercentage(patient) }}% </span>
                                </div>
                            </td>
                            <td class="px-6 py-4 text-center">
                                <button @click="viewPaymentDetails(patient)" class="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 text-sm font-medium">View</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div v-if="sortedPatients.length === 0" class="text-center py-12">
            <p class="text-gray-500">No patients found matching your filters.</p>
        </div>
    </div>
</template>
