<script setup>
import { ref } from 'vue'

const form = ref({
  // BASIC INFO
  lmp: '',
  edc: '',
  gpal: '',

  // Obstetric Risk Factors
  obstetricRisk: {
    multiplePregnancy: false,
    ovarianCyst: false,
    myomaUteri: false,
    thyroidDisorder: false,
    miscarriage: false,
    preeclampsia: false,
    eclampsia: false,
    prematureContraction: false
  },

  // Medical / Surgical History
  medical: {
    hypertension: false,
    heartDisease: false,
    diabetes: false,
    thyroidDisorder: false,
    obesity: false,
    asthma: false,
    epilepsy: false,
    renalDisease: false,
    bleedingDisorder: false,
    previousCS: false,
    myomectomy: false
  },

  // Abdomen / Leopold
  abdomen: {
    bowelSounds: '',
    fetalMovement: '',
    fundalHeight: '',
    fetalHeartTone: ''
  },
  leopold: {
    l1: '',
    l2: '',
    l3: '',
    l4: ''
  },

  // Diagnosis / Delivery
  diagnosis: '',
  expectedDelivery: '',
  deliveryPlace: 'TATING’S BIRTHING HOME',

  // Lab Results
  labs: {
    ua: '',
    cbc: '',
    rbc: '',
    hemoglobin: '',
    hbsag: '',
    vdrl: '',
    hiv: '',
    ultrasound: '',
    tetanus: ''
  },

  // FOLLOW-UP VISITS
  visits: Array.from({ length: 10 }, (_, i) => ({
    visit: i + 1,
    date: '',
    aog: '',
    fht: '',
    fh: '',
    position: '',
    presentation: '',
    weight: '',
    rr: '',
    hr: '',
    bp: '',
    temp: '',
    nextVisit: ''
  })),

  // Treatment / Management
  treatment: {
    palpation: false,
    labExam: false,
    dietAdvice: false,
    hydration: false,
    walking: false,
    hygiene: false,
    avoidHeavy: false,
    vitamins: false,
    referred: false,
    remarks: ''
  }
})

function submitForm() {
  console.log('Prenatal Record:', form.value)
  alert('Prenatal record saved successfully!')
}
</script>

<template>
  <div class="max-w-7xl mx-auto p-6 bg-white shadow-lg rounded-lg">
    <h1 class="text-2xl font-bold text-center mb-6">Prenatal Consultation Form</h1>

    <!-- BASIC INFO -->
    <div class="grid grid-cols-3 gap-4 mb-4">
      <div>
        <label>LMP</label>
        <input type="date" v-model="form.lmp" class="input" />
      </div>
      <div>
        <label>EDC</label>
        <input type="date" v-model="form.edc" class="input" />
      </div>
      <div>
        <label>G-P-T-A-L</label>
        <input type="text" v-model="form.gpal" class="input" />
      </div>
    </div>

    <!-- OBSTETRIC RISK -->
    <h3 class="section-title">Obstetric Risk Factors</h3>
    <div class="grid grid-cols-2 gap-2">
      <label><input type="checkbox" v-model="form.obstetricRisk.multiplePregnancy" /> Multiple Pregnancy</label>
      <label><input type="checkbox" v-model="form.obstetricRisk.ovarianCyst" /> Ovarian Cyst</label>
      <label><input type="checkbox" v-model="form.obstetricRisk.myomaUteri" /> Myoma Uteri</label>
      <label><input type="checkbox" v-model="form.obstetricRisk.thyroidDisorder" /> Thyroid Disorder</label>
      <label><input type="checkbox" v-model="form.obstetricRisk.miscarriage" /> History of Miscarriage</label>
      <label><input type="checkbox" v-model="form.obstetricRisk.preeclampsia" /> Preeclampsia</label>
      <label><input type="checkbox" v-model="form.obstetricRisk.eclampsia" /> Eclampsia</label>
      <label><input type="checkbox" v-model="form.obstetricRisk.prematureContraction" /> Premature Contraction</label>
    </div>

    <!-- MEDICAL HISTORY -->
    <h3 class="section-title mt-6">Medical / Surgical History</h3>
    <div class="grid grid-cols-2 gap-2">
      <label><input type="checkbox" v-model="form.medical.hypertension" /> Hypertension</label>
      <label><input type="checkbox" v-model="form.medical.heartDisease" /> Heart Disease</label>
      <label><input type="checkbox" v-model="form.medical.diabetes" /> Diabetes</label>
      <label><input type="checkbox" v-model="form.medical.thyroidDisorder" /> Thyroid Disorder</label>
      <label><input type="checkbox" v-model="form.medical.obesity" /> Obesity</label>
      <label><input type="checkbox" v-model="form.medical.asthma" /> Asthma</label>
      <label><input type="checkbox" v-model="form.medical.epilepsy" /> Epilepsy</label>
      <label><input type="checkbox" v-model="form.medical.renalDisease" /> Renal Disease</label>
      <label><input type="checkbox" v-model="form.medical.bleedingDisorder" /> Bleeding Disorder</label>
      <label><input type="checkbox" v-model="form.medical.previousCS" /> Previous CS</label>
      <label><input type="checkbox" v-model="form.medical.myomectomy" /> Myomectomy</label>
    </div>

    <!-- FOLLOW-UP TABLE -->
    <h3 class="text-lg font-semibold mt-6 mb-2">Follow-Up Visits</h3>
    <div class="overflow-x-auto">
      <table class="min-w-full border text-sm">
        <thead class="bg-gray-100">
          <tr>
            <th class="th">Visit</th>
            <th class="th">Date</th>
            <th class="th">AOG</th>
            <th class="th">FHT</th>
            <th class="th">FH</th>
            <th class="th">Position</th>
            <th class="th">Presentation</th>
            <th class="th">Weight</th>
            <th class="th">RR</th>
            <th class="th">HR</th>
            <th class="th">BP</th>
            <th class="th">Temp</th>
            <th class="th">Next Visit</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="v in form.visits" :key="v.visit">
            <td class="td">{{ v.visit }}</td>
            <td class="td"><input v-model="v.date" type="date" class="input"/></td>
            <td class="td"><input v-model="v.aog" class="input"/></td>
            <td class="td"><input v-model="v.fht" class="input"/></td>
            <td class="td"><input v-model="v.fh" class="input"/></td>
            <td class="td"><input v-model="v.position" class="input"/></td>
            <td class="td"><input v-model="v.presentation" class="input"/></td>
            <td class="td"><input v-model="v.weight" class="input"/></td>
            <td class="td"><input v-model="v.rr" class="input"/></td>
            <td class="td"><input v-model="v.hr" class="input"/></td>
            <td class="td"><input v-model="v.bp" class="input"/></td>
            <td class="td"><input v-model="v.temp" class="input"/></td>
            <td class="td"><input v-model="v.nextVisit" type="date" class="input"/></td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- TREATMENT / MANAGEMENT -->
    <h3 class="text-lg font-semibold mt-8">Treatment / Management</h3>
    <div class="grid grid-cols-2 gap-3 mt-2">
      <label><input type="checkbox" v-model="form.treatment.palpation" /> Palpation done</label>
      <label><input type="checkbox" v-model="form.treatment.labExam" /> Refer for lab exams</label>
      <label><input type="checkbox" v-model="form.treatment.dietAdvice" /> Diet counseling</label>
      <label><input type="checkbox" v-model="form.treatment.hydration" /> Increase water intake</label>
      <label><input type="checkbox" v-model="form.treatment.walking" /> Walking exercise</label>
      <label><input type="checkbox" v-model="form.treatment.hygiene" /> Hygiene education</label>
      <label><input type="checkbox" v-model="form.treatment.avoidHeavy" /> Avoid heavy lifting</label>
      <label><input type="checkbox" v-model="form.treatment.vitamins" /> Vitamins prescribed</label>
      <label><input type="checkbox" v-model="form.treatment.referred" /> Referred to physician</label>
    </div>

    <div class="mt-6">
      <button
        @click="submitForm"
        class="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700"
      >
        Save Prenatal Record
      </button>
    </div>
  </div>
</template>

<style scoped>
.input {
  width: 100%;
  padding: 6px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
th, td {
  border: 1px solid #ddd;
  padding: 4px;
  text-align: center;
}
.section-title {
  font-weight: 600;
  margin-top: 20px;
  margin-bottom: 10px;
}
</style>
