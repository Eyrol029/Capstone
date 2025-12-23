<script setup>
import { useLayout } from '@/layout/composables/layout';
import { onMounted, ref, watch } from 'vue';

const barData = ref(null);
const barOptions = ref(null);
const { getPrimary, getSurface, isDarkTheme } = useLayout();

onMounted(() => {
    setColorOptions();
});

function setColorOptions() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    barData.value = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'REVENUE',
                backgroundColor: documentStyle.getPropertyValue('--p-primary-500'),
                borderColor: documentStyle.getPropertyValue('--p-primary-500'),
                data: [65000, 59000, 80000, 81000, 56000, 55000, 40000, 72000, 68000, 75000, 82000, 88000]
            },
            {
                label: 'EXPENSES',
                backgroundColor: documentStyle.getPropertyValue('--p-primary-200'),
                borderColor: documentStyle.getPropertyValue('--p-primary-200'),
                data: [28000, 48000, 40000, 19000, 86000, 27000, 90000, 35000, 42000, 38000, 45000, 52000]
            }
        ]
    };
    barOptions.value = {
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: {
                    fontColor: textColor
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary,
                    font: {
                        weight: 500
                    }
                },
                grid: {
                    display: false,
                    drawBorder: false
                }
            },
            y: {
                min: 0,
                max: 100000,
                ticks: {
                    color: textColorSecondary,
                    stepSize: 10000,
                    callback: function (value) {
                        return value.toLocaleString();
                    }
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false
                }
            }
        }
    };
}

watch(
    [getPrimary, getSurface, isDarkTheme],
    () => {
        setColorOptions();
    },
    { immediate: true }
);
</script>

<template>
    <Fluid class="flex justify-center">
        <div class="w-full px-4">
            <div class="card">
                <div class="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-4">
                    <div class="font-semibold text-xl cursor-pointer hover:text-primary transition-colors" @click="$router.push('/uikit/menu')">REVENUE AND EXPENSES</div>
                    <div class="flex flex-wrap gap-2">
                        <select class="px-3 py-2 border rounded-lg text-sm bg-white flex-1 md:flex-initial">
                            <option>January</option>
                            <option>February</option>
                            <option>March</option>
                            <option>April</option>
                            <option>May</option>
                            <option>June</option>
                            <option>July</option>
                            <option>August</option>
                            <option>September</option>
                            <option>October</option>
                            <option>November</option>
                            <option>December</option>
                        </select>
                        <select class="px-3 py-2 border rounded-lg text-sm bg-white flex-1 md:flex-initial">
                            <option>2024</option>
                            <option>2023</option>
                            <option>2022</option>
                            <option>2021</option>
                        </select>
                    </div>
                </div>
                <div class="w-full h-64 md:h-96">
                    <Chart type="bar" :data="barData" :options="barOptions" style="width: 100%; height: 100%"></Chart>
                </div>
            </div>
        </div>
    </Fluid>
</template>
