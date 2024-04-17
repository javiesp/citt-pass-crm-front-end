<script setup>
import UiChildCard from '@/components/shared/UiChildCard.vue';

const desserts = ref([
    {
        name: "Alumno 1",
        calories: 159,
    },
    {
        name: "Alumno 2",
        calories: 237,
    },
    {
        name: "Alumno 3",
        calories: 262,
    },
    {
        name: "Alumno 4",
        calories: 305,
    },
    {
        name: "Alumno 5",
        calories: 356,
    },
    {
        name: "Alumno 6",
        calories: 375,
    },
    {
        name: "Alumno 7",
        calories: 392,
    },
    {
        name: "Alumno 8",
        calories: 408,
    },
    {
        name: "Alumno 9",
        calories: 452,
    },
    {
        name: "Alumno 10",
        calories: 518,
    },
]);
</script>

<template>
    <v-row class="month-table">
        <v-col cols="12" sm="12" >
            <UiChildCard title="Ingresos citt">
                <v-table>
                    <thead>
                        <tr>
                            <th class="text-left">Alumno</th>
                            <th class="text-left">Ingresos</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in desserts" :key="item.name">
                            <td>{{ item.name }}</td>
                            <td>{{ item.calories }}</td>
                        </tr>
                    </tbody>
                </v-table>

            </UiChildCard>
        </v-col>
 
        <v-col cols="12" sm="12">
            <UiChildCard title="Dark Table">
                <v-table theme="dark">
                    <thead>
                        <tr>
                            <th class="text-left">Name</th>
                            <th class="text-left">Calories</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in desserts" :key="item.name">
                            <td>{{ item.name }}</td>
                            <td>{{ item.calories }}</td>
                        </tr>
                    </tbody>
                </v-table>
            </UiChildCard>
        </v-col>

        <v-col cols="12" sm="12">
            <UiChildCard title="Header Fixed Table">
                <v-table fixed-header height="300px">
                    <thead>
                        <tr>
                            <th class="text-left">Name</th>
                            <th class="text-left">Calories</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in desserts" :key="item.name">
                            <td>{{ item.name }}</td>
                            <td>{{ item.calories }}</td>
                        </tr>
                    </tbody>
                </v-table>
            </UiChildCard>
        </v-col>
    </v-row>


    
</template>