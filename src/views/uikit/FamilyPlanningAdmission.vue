<script setup>
import { ref } from 'vue';

const view = ref('list');
const selectedRecord = ref(null);

const records = ref([]);

const formData = ref({
    clientId: '',
    philhealthNo: '',
    spouseName: '',
    age: '',
    occupation: '',
    monthlyIncome: '',
    livingChildren: '',
    planMoreChildren: '',
    clientType: '',
    reasonFP: '',
    medicalHistory: {
        headache: false,
        hypertension: false,
        breastMass: false,
        smoker: false,
        disability: false
    },
    obstetric: {
        pregnancies: '',
        livingChildren: '',
        lastDelivery: '',
        lastMenstrualPeriod: '',
        menstrualFlow: ''
    },
    stiRisk: {
        discharge: false,
        sores: false,
        burning: false,
        hiv: false
    },
    vawRisk: {
        unpleasantRelationship: false,
        domesticViolence: false
    }
});

function resetForm() {
    formData.value = {
        clientId: '',
        philhealthNo: '',
        spouseName: '',
        age: '',
        occupation: '',
        monthlyIncome: '',
        livingChildren: '',
        planMoreChildren: '',
        clientType: '',
        reasonFP: '',
        medicalHistory: {
            headache: false,
            hypertension: false,
            breastMass: false,
            smoker: false,
            disability: false
        },
        obstetric: {
            pregnancies: '',
            livingChildren: '',
            lastDelivery: '',
            lastMenstrualPeriod: '',
            menstrualFlow: ''
        },
        stiRisk: {
            discharge: false,
            sores: false,
            burning: false,
            hiv: false
        },
        vawRisk: {
            unpleasantRelationship: false,
            domesticViolence: false
        }
    };
    selectedRecord.value = null;
}

function handleAddRecord() {
    records.value.push({
        id: `FP-${records.value.length + 1}`,
        ...formData.value
    });
    resetForm();
    view.value = 'list';
}

function openEditForm(record) {
    selectedRecord.value = record;
    formData.value = JSON.parse(JSON.stringify(record));
    view.value = 'edit';
}

function handleEditRecord() {
    const index = records.value.findIndex(r => r.id === selectedRecord.value.id);
    if (index !== -1) {
        records.value[index] = { ...selectedRecord.value, ...formData.value };
    }
    resetForm();
    view.value = 'list';
}

function handleDeleteRecord(id) {
    if (confirm('Delete this assessment record?')) {
        records.value = records.value.filter(r => r.id !== id);
    }
}
</script>

<template>
    <div class="p-6 space-y-6 bg-white min-h-screen">
        <!-- FORM -->
        <div v-if="view === 'add' || view === 'edit'" class="max-w-4xl">
            <div class="bg-white rounded-lg shadow p-6 space-y-6">
                <h3 class="text-2xl font-bold text-gray-800">
                    {{ view === 'add' ? 'New Family Planning Assessment' : 'Edit Family Planning Assessment' }}
                </h3>

                <form @submit.prevent="view === 'add' ? handleAddRecord() : handleEditRecord()" class="space-y-6">
                    <!-- BASIC INFO -->
                    <div class="grid grid-cols-3 gap-4">
                        <input v-model="formData.clientId" placeholder="Client ID" class="input" />
                        <input v-model="formData.philhealthNo" placeholder="PhilHealth No." class="input" />
                        <input v-model="formData.spouseName" placeholder="Spouse Name" class="input" />
                    </div>

                    <div class="grid grid-cols-4 gap-4">
                        <input v-model="formData.age" type="number" placeholder="Age" class="input" />
                        <input v-model="formData.occupation" placeholder="Occupation" class="input" />
                        <input v-model="formData.monthlyIncome" placeholder="Monthly Income" class="input" />
                        <input v-model="formData.livingChildren" placeholder="Living Children" class="input" />
                    </div>

                    <!-- CLIENT TYPE -->
                    <div>
                        <label class="font-semibold text-gray-700">Client Type</label>
                        <select v-model="formData.clientType" class="input">
                            <option value="">Select</option>
                            <option>New Acceptor</option>
                            <option>Current User</option>
                            <option>Changing Method</option>
                            <option>Dropout / Restart</option>
                        </select>
                    </div>

                    <!-- MEDICAL HISTORY -->
                    <div>
                        <h4 class="font-bold text-gray-800 mb-2">Medical History</h4>
                        <div class="grid grid-cols-3 gap-3 text-sm">
                            <label><input type="checkbox" v-model="formData.medicalHistory.headache" /> Headache / Migraine</label>
                            <label><input type="checkbox" v-model="formData.medicalHistory.hypertension" /> Hypertension</label>
                            <label><input type="checkbox" v-model="formData.medicalHistory.breastMass" /> Breast Mass</label>
                            <label><input type="checkbox" v-model="formData.medicalHistory.smoker" /> Smoker</label>
                            <label><input type="checkbox" v-model="formData.medicalHistory.disability" /> With Disability</label>
                        </div>
                    </div>

                    <!-- OBSTETRIC -->
                    <div>
                        <h4 class="font-bold text-gray-800 mb-2">Obstetric History</h4>
                        <div class="grid grid-cols-3 gap-4">
                            <input v-model="formData.obstetric.pregnancies" placeholder="Pregnancies" class="input" />
                            <input v-model="formData.obstetric.lastDelivery" type="date" class="input" />
                            <input v-model="formData.obstetric.lastMenstrualPeriod" type="date" class="input" />
                        </div>
                    </div>

                    <!-- ACTIONS -->
                    <div class="flex gap-3 pt-4">
                        <button type="submit" class="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700">
                            {{ view === 'add' ? 'Save Assessment' : 'Update Assessment' }}
                        </button>
                        <button type="button" @click="resetForm(); view='list'" class="px-6 py-2 bg-gray-200 rounded-lg">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>

        <!-- LIST -->
        <template v-else>
            <div class="flex justify-between items-center">
                <h3 class="text-2xl font-bold text-gray-800">Family Planning Assessments</h3>
                <button @click="view='add'" class="px-4 py-2 bg-teal-600 text-white rounded-lg">
                    + New Assessment
                </button>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div v-for="record in records" :key="record.id" class="bg-white rounded-lg shadow p-5">
                    <h4 class="font-bold text-gray-800">{{ record.clientId }}</h4>
                    <p class="text-sm text-gray-600">Spouse: {{ record.spouseName }}</p>
                    <p class="text-sm text-gray-600">Client Type: {{ record.clientType }}</p>

                    <div class="flex gap-2 mt-4">
                        <button @click="openEditForm(record)" class="flex-1 bg-teal-50 text-teal-700 py-2 rounded-lg">
                            Edit
                        </button>
                        <button @click="handleDeleteRecord(record.id)" class="flex-1 bg-red-50 text-red-700 py-2 rounded-lg">
                            Delete
                        </button>
                    </div>
                </div>
            </div>

            <div v-if="records.length === 0" class="text-center py-10 text-gray-500">
                No assessment records found
            </div>
        </template>
    </div>
</template>

<style scoped>
.input {
    @apply w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent;
}
</style>
