
<script setup>
import { reactive } from 'vue'

const patientData = reactive({
  id: 'P001',
  name: 'Althea Mae Santos',
  birthDate: '1990-05-12',
  currentAge: 34,
  address: {
    houseNo: '123',
    street: 'Rizal St.',
    barangay: 'Barangay 1',
    municipality: 'Initao',
    province: 'Misamis Oriental'
  },
  contact: '0917 123 4567',
  religion: 'Roman Catholic',
  education: 'College Graduate',
  occupation: 'Web Designer'
})

const services = [
  {
    id: 1,
    service: 'Prenatal',
    employee: 'Rowena Roxa',
    ward: 'Ward 1',
    dateAvailed: '2025-12-14',
    remarks: '---'
  }
]
</script>

<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-semibold text-gray-800">Patient Profile</h1>
        <button class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
          Add New Service
        </button>
      </div>

      <!-- Patient Name -->
      <h2 class="text-3xl font-bold text-gray-900 mb-6">
        {{ patientData.name }}
      </h2>

      <!-- General Information -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-semibold text-gray-800">
            General Information
          </h3>
          <button class="bg-blue-600 text-white px-4 py-1.5 rounded text-sm hover:bg-blue-700 transition">
            Edit
          </button>
        </div>

        <div class="grid grid-cols-3 gap-6">
          <div>
            <p class="text-sm text-gray-500">Patient ID</p>
            <p class="font-medium text-gray-900">{{ patientData.id }}</p>
          </div>

          <div>
            <p class="text-sm text-gray-500">Age</p>
            <p class="font-medium text-gray-900">{{ patientData.currentAge }}</p>
          </div>

          <div>
            <p class="text-sm text-gray-500">Birth Date</p>
            <p class="font-medium text-gray-900">{{ patientData.birthDate }}</p>
          </div>

          <div>
            <p class="text-sm text-gray-500">House No</p>
            <p class="font-medium text-gray-900">{{ patientData.address.houseNo }}</p>
          </div>

          <div>
            <p class="text-sm text-gray-500">Street</p>
            <p class="font-medium text-gray-900">{{ patientData.address.street }}</p>
          </div>

          <div>
            <p class="text-sm text-gray-500">Barangay</p>
            <p class="font-medium text-gray-900">{{ patientData.address.barangay }}</p>
          </div>

          <div>
            <p class="text-sm text-gray-500">Contact Number</p>
            <p class="font-medium text-gray-900">{{ patientData.contact }}</p>
          </div>

          <div>
            <p class="text-sm text-gray-500">Municipality</p>
            <p class="font-medium text-gray-900">{{ patientData.address.municipality }}</p>
          </div>

          <div>
            <p class="text-sm text-gray-500">Province</p>
            <p class="font-medium text-gray-900">{{ patientData.address.province }}</p>
          </div>

          <div>
            <p class="text-sm text-gray-500">Religion</p>
            <p class="font-medium text-gray-900">{{ patientData.religion }}</p>
          </div>

          <div>
            <p class="text-sm text-gray-500">Education</p>
            <p class="font-medium text-gray-900">{{ patientData.education }}</p>
          </div>

          <div>
            <p class="text-sm text-gray-500">Occupation</p>
            <p class="font-medium text-gray-900">{{ patientData.occupation }}</p>
          </div>
        </div>"},{ 
      </div>

      <!-- Services Table -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table class="w-full">
          <thead class="bg-gray-100">
            <tr>
              <th class="th">Service</th>
              <th class="th">Employee</th>
              <th class="th">Ward</th>
              <th class="th">Date Availed</th>
              <th class="th">Remarks</th>
              <th class="th">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="service in services"
              :key="service.id"
              class="border-b hover:bg-gray-50"
            >
              <td class="td">{{ service.service }}</td>
              <td class="td">{{ service.employee }}</td>
              <td class="td">{{ service.ward }}</td>
              <td class="td">{{ service.dateAvailed }}</td>
              <td class="td">{{ service.remarks }}</td>
              <td class="td">
                <button
                    @click="$router.push('/uikit/PatientIndividual')"
                  class="bg-blue-600 text-white px-3 py-1.5 rounded text-sm hover:bg-blue-700"
                >
                  View
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<style scoped>
.th {
  @apply px-6 py-3 text-sm font-medium text-gray-600 text-left;
}
.td {
  @apply px-6 py-4 text-sm text-gray-900;
}
.btn-primary {
  @apply px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700;
}
.btn-outline {
  @apply px-4 py-2 border rounded hover:bg-gray-50;
}
</style>
