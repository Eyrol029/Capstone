<script setup>
/* eslint-disable */
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
// normalize line endings

const props = defineProps({
    patient: {
        type: Object,
        required: false
    }
});

const emit = defineEmits(['close', 'recordPayment', 'sendReminder']);

const paymentAmount = ref('');
const reminderType = ref('email');
const reminderMessage = ref('');

const route = useRoute();
const localPatient = ref(props.patient || null);

function tryResolvePatient() {
    if (localPatient.value) return;

    // Try route query
    try {
        const q = route.query.patient;
        if (q) {
            localPatient.value = typeof q === 'string' ? JSON.parse(q) : q;
            return;
        }
    } catch (e) {
        // ignore parsing errors
    }

    // Try history state
    try {
        const s = window.history && window.history.state && window.history.state.patient;
        if (s) {
            localPatient.value = s;
            return;
        }
    } catch (e) {
        /* ignore history state errors */
    }

    // Try localStorage fallback
    try {
        const stored = localStorage.getItem('payment_patient');
        if (stored) {
            localPatient.value = JSON.parse(stored);
            return;
        }
    } catch (e) {
        /* ignore storage errors */
    }
}

onMounted(() => {
    tryResolvePatient();
    if (localPatient.value) {
        reminderMessage.value = `Reminder: Outstanding balance of ${formatCurrency(outstanding.value)} due`;
    }
});

const outstanding = computed(() => (localPatient.value ? localPatient.value.totalBill - localPatient.value.amountPaid : 0));

function formatCurrency(amount) {
    return '₱' + amount.toLocaleString();
}

function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function handleRecordPayment() {
    if (paymentAmount.value && parseFloat(paymentAmount.value) > 0) {
        emit('recordPayment', parseFloat(paymentAmount.value));
        paymentAmount.value = '';
    }
}

function handleSendReminder() {
    if (reminderMessage.value.trim()) {
        emit('sendReminder', reminderType.value, reminderMessage.value);
        reminderMessage.value = `Reminder: Outstanding balance of ${formatCurrency(outstanding.value)} due`;
    }
}

const router = useRouter();
function handleClose() {
    emit('close');
    // If opened as a route, navigate back when possible
    try {
        router.back();
    } catch (e) {
        // ignore
    }
}
</script>

<template>
  <div :class="route.name === 'PaymentDetails' ? 'p-6' : 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50'" @click.self="route.name === 'PaymentDetails' ? null : handleClose">
    <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-auto max-h-[90vh] overflow-y-auto">

      <!-- Header -->
      <div v-if="localPatient" class="sticky top-0 flex items-center justify-between p-6 border-b border-gray-200 bg-white">
        <div>
          <h2 class="text-2xl font-bold">{{ localPatient.name }}</h2>
          <p class="text-sm text-gray-500 mt-1">{{ localPatient.service }}</p>
        </div>
        <button @click="handleClose" class="p-2 hover:bg-gray-100 rounded-lg">
          <span class="text-xl">✕</span>
        </button>
      </div>

      <div v-if="localPatient" class="p-6 space-y-6">
        <!-- Summary Cards -->
        <div class="grid grid-cols-3 gap-4">
          <div class="bg-gray-50 p-4 rounded-lg">
            <p class="text-sm text-gray-600 mb-1">Total Bill</p>
            <p class="text-2xl font-bold">{{ formatCurrency(localPatient.totalBill) }}</p>
          </div>
          <div class="bg-green-50 text-green-700 p-4 rounded-lg">
            <p class="text-sm mb-1 font-medium">Amount Paid</p>
            <p class="text-2xl font-bold">{{ formatCurrency(localPatient.amountPaid) }}</p>
          </div>
          <div class="bg-red-50 text-red-700 p-4 rounded-lg">
            <p class="text-sm mb-1 font-medium">Outstanding</p>
            <p class="text-2xl font-bold">{{ formatCurrency(outstanding) }}</p>
          </div>
        </div>

        <!-- Payment History -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Payment History</h3>
          <div v-if="localPatient.paymentHistory && localPatient.paymentHistory.length > 0" class="space-y-3">
            <div v-for="payment in localPatient.paymentHistory" :key="payment.id" class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p class="font-medium">{{ formatCurrency(payment.amount) }}</p>
                <p class="text-sm text-gray-500">{{ formatDate(payment.date) }} • {{ payment.method.replace('_', ' ') }}</p>
                <p v-if="payment.notes" class="text-sm text-gray-500 mt-1">{{ payment.notes }}</p>
              </div>
            </div>
          </div>
          <p v-else class="text-gray-500">No payments recorded yet</p>
        </div>

        <!-- Promissory Note -->
        <div v-if="localPatient.promissoryNote">
          <h3 class="text-lg font-semibold mb-4">Promissory Note</h3>
          <div class="border border-gray-200 rounded-lg p-4">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <p class="text-sm text-gray-500">Amount</p>
                <p class="text-lg font-bold">{{ formatCurrency(localPatient.promissoryNote.amount) }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-500">Due Date</p>
                <p class="text-lg font-bold">{{ formatDate(localPatient.promissoryNote.dueDate) }}</p>
              </div>
              <div class="col-span-2">
                <p class="text-sm text-gray-500">Terms</p>
                <p class="text-base">{{ localPatient.promissoryNote.terms }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-500">Status</p>
                <span :class="['inline-block px-3 py-1 rounded-full text-sm font-medium', localPatient.promissoryNote.status === 'overdue' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700']">
                  {{ localPatient.promissoryNote.status }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Record New Payment -->
        <div v-if="outstanding > 0">
          <h3 class="text-lg font-semibold mb-4">Record New Payment</h3>
          <div class="space-y-4">
            <div>
              <label class="block text-base font-semibold mb-2">Payment Amount</label>
              <input v-model="paymentAmount" type="number" placeholder="0.00" :max="outstanding" min="0" step="0.01" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              <p class="text-sm text-gray-500 mt-2">Maximum: {{ formatCurrency(outstanding) }}</p>
            </div>
            <button @click="handleRecordPayment" :disabled="!paymentAmount || parseFloat(paymentAmount) <= 0" class="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed">
              Record Payment
            </button>
          </div>
        </div>

        <!-- Send Reminder -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Send Reminder</h3>
          <div class="space-y-4">
            <div class="flex gap-3">
              <label class="flex items-center gap-2 cursor-pointer flex-1 p-3 border rounded-lg hover:bg-gray-50">
                <input v-model="reminderType" type="radio" value="email" class="w-4 h-4" />
                <span>📧</span>
                <span class="text-sm">Email to {{ localPatient.email }}</span>
              </label>
              <label class="flex items-center gap-2 cursor-pointer flex-1 p-3 border rounded-lg hover:bg-gray-50">
                <input v-model="reminderType" type="radio" value="sms" class="w-4 h-4" />
                <span>📱</span>
                <span class="text-sm">SMS to {{ localPatient.phone }}</span>
              </label>
            </div>
            <div>
              <label class="block text-base font-semibold mb-2">Message</label>
              <textarea v-model="reminderMessage" placeholder="Enter reminder message..." rows="3" class="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
            </div>
            <button @click="handleSendReminder" class="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2">
              <span>📤</span>
              Send Reminder
            </button>
          </div>
        </div>

        <!-- Recent Reminders -->
        <div v-if="localPatient.reminders && localPatient.reminders.length > 0">
          <h3 class="text-lg font-semibold mb-4">Recent Reminders</h3>
          <div class="space-y-3">
            <div v-for="reminder in localPatient.reminders.slice(0, 5)" :key="reminder.id" class="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <div class="flex-1">
                <div class="flex items-center gap-2 mb-1">
                  <span>{{ reminder.type === 'email' ? '📧' : '📱' }}</span>
                  <span class="text-sm font-medium capitalize">{{ reminder.type }}</span>
                  <span :class="['text-xs px-2 py-1 rounded', reminder.status === 'sent' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700']">
                    {{ reminder.status }}
                  </span>
                </div>
                <p class="text-sm">{{ reminder.message }}</p>
                <p class="text-xs text-gray-500 mt-1">{{ formatDate(reminder.sentDate) }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="p-6 text-center">
        <p class="text-gray-600">Patient details not found.</p>
      </div>
    </div>
  </div>
</template>
