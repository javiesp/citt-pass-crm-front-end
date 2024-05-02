<script>
import { defineComponent } from 'vue';
import { getAllUsers } from '../api/userApi';
import { getAllProjects } from '../api/projectApi';

export default defineComponent({
    data() {
        return {
            dialog: false,
            usersArray: [],
            projectArray: [
                { 
                    project_id: 1, 
                    project_name: 'Proyecto Alpha', 
                    project_description: 'Descripción Alpha', 
                    project_status: 'Activo', 
                    project_id_team: 'Team Alpha' 
                },
                { 
                    project_id: 2, 
                    project_name: 'Proyecto Beta', 
                    project_description: 'Descripción Beta', 
                    project_status: 'Pendiente', 
                    project_id_team: 'Team Beta' 
                },
                { 
                    project_id: 3, 
                    project_name: 'Proyecto Gamma', 
                    project_description: 'Descripción Gamma', 
                    project_status: 'Completo', 
                    project_id_team: 'Team Gamma' 
                }
            ],
            projectsNames: ["Proyecto Alpha", "Proyecto Beta", "Proyecto Gamma"],
            projectId: 0,
            totalRows: 0,
            selectedProyect: null,
            pdfUrl: "",
            pdfFileName: ""
        };
    },
    methods: {
        async getUsers() {
            this.loading = true;
            try {
                const usersResponse = await getAllUsers(this.selectedProyect);
                this.usersArray = usersResponse.data;
                this.totalRows = usersResponse.data.total;
            } catch (error) {
                console.error('Error al obtener usuarios:', error);
            } finally {
                this.loading = false;
            }
        },
        async getProjects() {
            this.loading = true;
            try {
                const projectResponse = await getAllProjects();
                this.projectArray = projectResponse.data;
                this.projectsNames = this.projectArray.map(project => project.project_name);
            } catch (error) {
                console.error('Error al obtener proyectos:', error);
            } finally {
                this.loading = false;
            }
        },
        selectProjectId() {
            const selectedProject = this.projectArray.find(project => project.project_name === this.selectedProyect);
            if (selectedProject) {
                this.projectId = selectedProject.project_id;
            } else {
                console.error("No se encontró el projectId para el proyecto seleccionado");
            }
        },
        downloadPdf() {
            const link = document.createElement('a');
            link.href = this.pdfUrl;
            link.target = '_blank';
            link.download = this.pdfFileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    },
    watch: {
        selectedProyect(newValue, oldValue) {
            if (newValue !== oldValue) {
                this.getUsers();
            }
        },
    },
    async created() {
        await this.getUsers();
        await this.getProjects();
    },
});
</script>

<template>
    <h2>Proyectos Citt</h2>
    <BR></BR>
    <v-row  class="month-table">
        <v-col cols="3">
            <v-combobox
                v-model="selectedProjectName"
                :items="projectsNames"
                label="Proyecto"
                outlined
                @change="selectProjectId"
            ></v-combobox>
        </v-col>
        <v-col cols="3">
            <v-btn variant="tonal" color="primary" @click="downloadPdf">Generar archivo .csv</v-btn>
        </v-col>
        <v-col cols="6" class="text-right">
            <v-btn variant="tonal" color="primary" prepend-icon="mdi-folder-outline" @click="dialog = true">Agregar Proyecto</v-btn>
        </v-col>
        <v-col cols="12" sm="12">
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
                <!-- Botones -->
                <v-btn class="ml-2" color="primary" icon size="x-small" flat>
                  <v-icon>mdi-pencil</v-icon> 
                </v-btn>
                <v-btn class="ml-2" color="error" icon size="x-small" flat>
                  <v-icon>mdi-delete</v-icon> 
                </v-btn>
                <v-btn class="ml-2" color="warning" icon size="x-small" flat>
                  <v-icon>mdi-refresh</v-icon> 
                </v-btn>
              </v-col>
                        </td>
                    </tr>
                </tbody>
            </v-table>
        </v-col>
    </v-row>
    <!-- ABRIR DIALOG -->
    <div class="pa-4 text-center">
        <v-dialog
            v-model="dialog"
            max-width="600"
        >
            <v-card
                prepend-icon="mdi-folder-outline"
                title="Agregar Proyecto"
            >
                <v-card-text>
                    <v-row dense>
                        <v-col cols="12" md="4" sm="6">
                            <v-text-field label="Nombre Proyecto" required></v-text-field>
                        </v-col>
                        <v-col cols="12" md="4" sm="6">
                            <v-text-field hint="Descripcion" label="Descripcion"></v-text-field>
                        </v-col>
                        <v-col cols="12" md="4" sm="6">
                            <v-text-field hint="Status" label="Status"></v-text-field>
                        </v-col>
                        <v-col cols="12" md="4" sm="6">
                            <v-text-field hint="Proyect Team" label="Proyect Team"></v-text-field>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text="Close" variant="plain" @click="dialog = false"></v-btn>
                    <v-btn color="primary" text="Save" variant="tonal" @click="dialog = false"></v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
