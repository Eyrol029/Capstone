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
                    path: '/uikit/input',
                    name: 'input',
                    component: () => import('@/views/uikit/InputDoc.vue')
                },
                {
                    path: '/uikit/button',
                    name: 'button',
                    component: () => import('@/views/uikit/ButtonDoc.vue')
                },
                {
                    path: '/uikit/panel',
                    name: 'panel',
                    component: () => import('@/views/uikit/PanelsDoc.vue')
                },
                {
                    path: '/uikit/PatientsMain',
                    name: 'PatientsMain',
                    component: () => import('@/views/uikit/PatientsMain.vue')
                },
                {
                    path: '/uikit/media',
                    name: 'media',
                    component: () => import('@/views/uikit/MediaDoc.vue')
                },
                {
                    path: '/uikit/message',
                    name: 'message',
                    component: () => import('@/views/uikit/MessagesDoc.vue')
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
                    path: '/uikit/charts',
                    name: 'charts',
                    component: () => import('@/views/uikit/ChartDoc.vue')
                },
                {
                    path: '/uikit/tree',
                    name: 'tree',
                    component: () => import('@/views/uikit/ManageApp.vue')
                },
                {
                    path: '/uikit/timeline',
                    name: 'timeline',
                    component: () => import('@/views/uikit/ManageApp.vue')
                },
                {
                    path: '/pages/empty',
                    name: 'empty',
                    component: () => import('@/views/pages/Empty.vue')
                },
                {
                    path: '/pages/crud',
                    name: 'crud',
                    component: () => import('@/views/pages/Crud.vue')
                },
                {
                    path: '/documentation',
                    name: 'documentation',
                    component: () => import('@/views/pages/Documentation.vue')
                },
                {
                    path: '/uikit/PaymentDashboard',
                    name: 'PaymentDashboard',
                    component: () => import('@/views/uikit/PaymentDashboard.vue')
                }
            ]
        },
        {
            path: '/landing',
            name: 'landing',
            component: () => import('@/views/pages/Landing.vue')
        },
        {
            path: '/pages/notfound',
            name: 'notfound',
            component: () => import('@/views/pages/NotFound.vue')
        },

        {
            path: '/auth/login',
            name: 'login',
            component: () => import('@/views/pages/auth/Login.vue')
        },
        {
            path: '/auth/access',
            name: 'accessDenied',
            component: () => import('@/views/pages/auth/Access.vue')
        },
        {
            path: '/auth/error',
            name: 'error',
            component: () => import('@/views/pages/auth/Error.vue')
        },
        {
            path: '/uikit/ReferralForm',
            name: 'ReferralForm',
            component: () => import('@/views/uikit/ReferralForm.vue')
        },
        {
            path: '/uikit/Summary',
            name: 'Summary',
            component: () => import('@/views/uikit/PaymentDashboard.vue')
        },
        {
            path: '/uikit/PaymentDetails',
            name: 'PaymentDetails',
            component: () => import('@/views/uikit/PaymentDetails.vue')
        }
    ]
});

export default router;
