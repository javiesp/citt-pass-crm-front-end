<script setup lang="ts">
import { ref } from 'vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import UiChildCard from '@/components/shared/UiChildCard.vue';

import Basic from '@/components/ui-components/alert/Basic.vue';
import Filled from '@/components/ui-components/alert/Filled.vue';
import Closable from '@/components/ui-components/alert/Closable.vue';
import { getAllProjects } from '../../api/projectApi';

const loading = ref(false);
const projectArray = ref([]);
const projectsNames = ref([]);
let totalRows = 0;

const getProjects = async () => {
    loading.value = true;
    try {
        const projectResponse = await getAllProjects();
        projectArray.value = projectResponse.data;
        // projectsNames.value = projectArray.value.map((project: any) => project.project_name) as never[];
        totalRows = projectResponse.data.total;
    } catch (error) {
        console.error('Error al obtener proyectos:', error);
    } finally {
        loading.value = false;
    }
};

const onUpdateProjects = async () => {
    await getProjects();
    console.log("PROJECTS");
    console.log(projectArray.value);
};

onMounted(() => {
    onUpdateProjects();
});

</script>

<template>

    <v-row>
        <v-col cols="12">
            <v-row>
                <v-col cols="12">
                    <UiChildCard title="Proyectos CITT">
                        <v-table>
                        <thead>
                            <tr>
                            <th class="text-left">Proyecto</th>
                            <th class="text-left">Descripción</th>
                            <th class="text-left">Status</th>
                            <th class="text-left">Proyect team</th>
                            <th class="text-left">Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="project in projectArray" :key="project.project_id">
                            <td>{{ project.project_name }}</td>
                            <td>{{ project.project_description }}</td>
                            <td>{{ project.project_status }}</td>
                            <td>{{ project.project_id_team }}</td>
                            <td>
                            <v-col>
                                <v-btn
                                class="margin-left" 
                                color="primary" 
                                icon 
                                size="x-small" 
                                flat>
                                <IconEdit stroke={2} />
                                </v-btn>
                                <v-btn
                                class="margin-left" 
                                color="primary" 
                                icon 
                                size="x-small" 
                                flat>
                                <BellIcon stroke-width="1.5"  />
                                </v-btn>
                            </v-col>
                            </td>
                            </tr>
                        </tbody>
                        </v-table>
                    </UiChildCard>
                </v-col>
                <!-- Basic -->
                <v-col cols="12">
                    <UiChildCard title="Alert Basic">
                        <Basic />
                    </UiChildCard>
                </v-col>
                <!-- Filled -->
                <v-col cols="12">
                    <UiChildCard title="Alert Filled">
                        <Filled />
                    </UiChildCard>
                </v-col>
                <!-- Closable -->
                <v-col cols="12">
                    <UiChildCard title="Alert Closable">
                        <Closable />
                    </UiChildCard>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>
