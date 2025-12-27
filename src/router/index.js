import AppLayout from '@/layout/AppLayout.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: AppLayout,
            children: [
                {
                    path: '/',
                    name: 'dashboard',
                    component: () => import('@/views/Dashboard.vue')
                },
                {
                    path: '/uikit/PrenatalAdmission',
                    name: 'PrenatalAdmission',
                    component: () => import('@/views/uikit/PrenatalAdmission.vue')
                },
                {
                    path: '/uikit/FamilyPlanningAdmission',
                    name: 'FamilyPlanningAdmission',
                    component: () => import('@/views/uikit/FamilyPlanningAdmission.vue')
                },
                {
                    path: '/uikit/UserAccountPatient',
                    name: 'UserAccountPatient',
                    component: () => import('@/views/uikit/UserAccountPatient.vue')
                },
                {
                    path: '/uikit/Patient',
                    name: 'Patient',
                    component: () => import('@/views/uikit/Patient.vue')
                },
                {
                    path: '/uikit/Staff',
                    name: 'Staff',
                    component: () => import('@/views/uikit/Staff.vue')
                },
                {
                    path: '/uikit/Wards',
                    name: 'Wards',
                    component: () => import('@/views/uikit/Wards.vue')
                },
                {
                    path: '/uikit/PatientsMain',
                    name: 'PatientsMain',
                    component: () => import('@/views/uikit/PatientsMain.vue')
                },
                {
                    path: '/uikit/Service',
                    name: 'Service',
                    component: () => import('@/views/uikit/Service.vue')
                },
                {
                    path: '/uikit/menu',
                    name: 'menu',
                    component: () => import('@/views/uikit/PaymentDashboard.vue')
                },
                {
                    path: '/uikit/tree',
                    name: 'tree',
                    component: () => import('@/views/uikit/ManageApp.vue')
                },
                {
                    path: '/uikit/PaymentDashboard',
                    name: 'PaymentDashboard',
                    component: () => import('@/views/uikit/PaymentDashboard.vue')
                },
                {
                    path: '/uikit/UserAccount',
                    name: 'UserAccount',
                    component: () => import('@/views/uikit/UserAccount.vue')
                },
                {
                    path: '/uikit/PatientProfiling',
                    name: 'PatientProfiling',
                    component: () => import('@/views/uikit/PatientProfiling.vue')
                },
                {
                    path: '/uikit/PaymentDetails',
                    name: 'PaymentDetails',
                    component: () => import('@/views/uikit/PaymentDetails.vue')
                },
                {
                    path: '/uikit/patientIndividual',
                    name: 'patientIndividual',
                    component: () => import('@/views/uikit/PatientIndividual.vue')
                },
                {
                    path: '/uikit/ReferralForm',
                    name: 'ReferralForm',
                    component: () => import('@/views/uikit/ReferralForm.vue')
                },
                {
                    path: '/uikit/Summary',
                    name: 'Summary',
                    omponent: () => import('@/views/uikit/PaymentDashboard.vue')
                },
                {
                    path: '/uikit/Admission',
                    name: 'Admission',
                    component: () => import('@/views/uikit/Admission.vue')
                }
            ]
        },
        {
            path: '/uikit/Login',
            name: 'Login',
            component: () => import('@/views/uikit/Login.vue')
        }
    ]
});

export default router;
