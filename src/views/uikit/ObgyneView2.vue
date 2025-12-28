<script setup>
import { ref, computed } from 'vue';

const activeTab = ref('high-risk');

const patients = ref([
    {
        id: 'P001',
        name: 'Amanda-Chen',
        age: 30,
        bloodPressure: '148/94 mmHg',
        glucose: '98 mg/dL',
        fetalHeart: '132 bpm',
        fetalGrowth: 'Below average',
        contact: '09928376579',
        gestationalAge: '36 weeks',
        risk: 'high-risk'
    },
    {
        id: 'P002',
        name: 'Rachel',
        age: 21,
        bloodPressure: '148/94 mmHg',
        glucose: '98 mg/dL',
        fetalHeart: '132 bpm',
        fetalGrowth: 'Below average',
        contact: '09928376579',
        gestationalAge: '36 weeks',
        risk: 'high-risk'
    },
    {
        id: 'P003',
        name: 'Emily',
        age: 24,
        bloodPressure: '148/94 mmHg',
        glucose: '98 mg/dL',
        fetalHeart: '132 bpm',
        fetalGrowth: 'Below average',
        contact: '09928376579',
        gestationalAge: '36 weeks',
        risk: 'high-risk'
    },
    {
        id: 'P004',
        name: 'Sarah Johnson',
        age: 28,
        bloodPressure: '120/80 mmHg',
        glucose: '85 mg/dL',
        fetalHeart: '140 bpm',
        fetalGrowth: 'Normal',
        contact: '09123456789',
        gestationalAge: '32 weeks',
        risk: 'normal'
    },
    {
        id: 'P005',
        name: 'Maria Santos',
        age: 26,
        bloodPressure: '115/75 mmHg',
        glucose: '90 mg/dL',
        fetalHeart: '138 bpm',
        fetalGrowth: 'Normal',
        contact: '09234567890',
        gestationalAge: '28 weeks',
        risk: 'normal'
    }
]);

const filteredPatients = computed(() => {
    return patients.value.filter(p => p.risk === activeTab.value);
});

function viewRecord(patientId) {
    console.log('Viewing record for patient:', patientId);
    // Add navigation or modal logic here
}
</script>

<template>
    <div class="min-h-screen bg-[#b8a0b0] p-8">
        <!-- Tab Navigation -->
        <div class="flex gap-2 mb-6">
            <button
                @click="activeTab = 'high-risk'"
                :class="[
                    'px-8 py-2 rounded-t-lg font-medium transition-all duration-200',
                    activeTab === 'high-risk'
                        ? 'bg-[#e8d4e0] text-gray-800'
                        : 'bg-[#9d8a95] text-gray-200 hover:bg-[#b39aa8]'
                ]"
            >
                High-Risk
            </button>
            <button
                @click="activeTab = 'normal'"
                :class="[
                    'px-8 py-2 rounded-t-lg font-medium transition-all duration-200',
                    activeTab === 'normal'
                        ? 'bg-[#e8d4e0] text-gray-800'
                        : 'bg-[#9d8a95] text-gray-200 hover:bg-[#b39aa8]'
                ]"
            >
                Normal
            </button>
        </div>

        <!-- Patient Cards -->
        <div class="space-y-4">
            <div
                v-for="patient in filteredPatients"
                :key="patient.id"
                class="patient-card bg-white rounded-2xl p-6 border-2 transition-all duration-300 cursor-pointer"
                :class="patient.risk === 'high-risk' ? 'border-red-300 hover:border-red-400' : 'border-green-300 hover:border-green-400'"
            >
                <div class="mb-4">
                    <h2 class="text-2xl font-semibold text-gray-800">{{ patient.name }}</h2>
                    <p class="text-gray-600">Age: {{ patient.age }}</p>
                </div>

                <div class="bg-gray-200 rounded-lg p-4 flex items-center justify-between">
                    <div class="flex-1 grid grid-cols-4 gap-4">
                        <!-- Current Vital -->
                        <div>
                            <p class="text-xs text-gray-500 mb-1">Current vital</p>
                            <p class="text-xs text-gray-600 mb-1">Blood pressure</p>
                            <p 
                                class="text-sm font-semibold"
                                :class="patient.risk === 'high-risk' ? 'text-red-500' : 'text-green-600'"
                            >
                                {{ patient.bloodPressure }}
                            </p>
                        </div>

                        <!-- Contact -->
                        <div>
                            <p class="text-xs text-gray-500 mb-1">Contact no: {{ patient.contact }}</p>
                            <p class="text-xs text-gray-600 mb-1">Glucose</p>
                            <p class="text-sm font-semibold text-gray-700">{{ patient.glucose }}</p>
                        </div>

                        <!-- Gestational Age -->
                        <div>
                            <p class="text-xs text-gray-500 mb-1">Gestational Age: {{ patient.gestationalAge }}</p>
                            <p class="text-xs text-gray-600 mb-1">Fetal Health</p>
                            <p class="text-sm font-semibold text-gray-700">{{ patient.fetalHeart }}</p>
                        </div>

                        <!-- Fetal Growth -->
                        <div>
                            <p class="text-xs text-gray-600 mb-1">Fetal Growth</p>
                            <p 
                                class="text-sm font-semibold"
                                :class="patient.risk === 'high-risk' ? 'text-red-500' : 'text-green-600'"
                            >
                                {{ patient.fetalGrowth }}
                            </p>
                        </div>
                    </div>

                    <!-- View Record Button -->
                    <button
                        @click="viewRecord(patient.id)"
                        class="ml-6 px-8 py-2 rounded-lg font-medium transition-all duration-200 view-btn"
                        :class="patient.risk === 'high-risk' 
                            ? 'bg-red-500 hover:bg-red-600 text-white' 
                            : 'bg-green-500 hover:bg-green-600 text-white'"
                    >
                        View Record
                    </button>
                </div>
            </div>

            <!-- Empty State -->
            <div v-if="filteredPatients.length === 0" class="text-center py-12 bg-white rounded-2xl">
                <p class="text-gray-500 text-lg">No {{ activeTab }} patients found.</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* Patient Card Hover Effects */
.patient-card {
    transition: all 0.3s ease;
}

.patient-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

.patient-card:active {
    transform: translateY(-2px) scale(0.98);
    transition: all 0.1s ease;
}

/* View Record Button Effects */
.view-btn {
    transition: all 0.2s ease;
}

.view-btn:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.view-btn:active {
    transform: scale(0.95);
    transition: all 0.1s ease;
}

/* Responsive Design */
@media (max-width: 1024px) {
    .bg-gray-200 {
        flex-direction: column;
    }

    .flex-1.grid {
        grid-template-columns: repeat(2, 1fr);
    }

    .view-btn {
        margin-left: 0;
        margin-top: 1rem;
        width: 100%;
    }
}

@media (max-width: 640px) {
    .flex-1.grid {
        grid-template-columns: 1fr;
    }
}
</style>