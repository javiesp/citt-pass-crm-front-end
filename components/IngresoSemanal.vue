<script> // setup lang="ts"
    import { IconEdit } from '@tabler/icons-vue';
    import { defineComponent } from 'vue'; 
    import { getAllUsers, getAllUsersById } from '../api/userApi.ts';
    import { getAllProjects } from '../api/projectApi.ts';
    import { createProject } from "../api/checkInApi";


    console.log("")
    export default defineComponent({
    data() {
        return {
        // data table
        loading: false,
        itemsPerPage: 5,
        rowsPerPageItems: [
          { title: "5", value: 5 },
          { title: "10", value: 10 },
          { title: "25", value: 25 },
          { title: "50", value: 50 },
        ],
        headers: [
          { title: "UID", value: "uid_user" },
          { title: "Nombre", value: "name" },
          { title: "Mail", value: "email" },
          { title: "Teléfono", value: "phone" },
          { title: "ID Proyecto", value: "proyect_id" },
          { title: "Acciones", value: "actions" },
          { title: "Lista", value: "checkin" },
        ],
        // VARAIBLES DESCARGA PDF
        name: 'DownloadPdfButton',
        props: {
            pdfUrl: {
            type: String,
            required: true
            },       
            pdfFileName: {
            type: String,
            required: true                                          
            }
        },
        // VARIEABLES 
        dialog: false,
        dialogCheckin: false,  
        usersArray: [],
        projectArray: [],
        projectsNames: [],
        projectId: 0,
        totalRows: 0,
        selectedProyect: null,
        // ARRAY SELECTORES 
        items: [1,2,3,4,5,6,7,8,9,10],
        userRole: ['Admin citt', 'Profesor', 'Alumno', 'CIA', 'MMT'],
        uidUser: ['OIUUYFASD', 'ASDIUAD908', '908DKJHAS'],
        loading: false, 
        userId: null,
        entryReason: null,
        };
    },
    methods: {
        // GET API Y AGUARDAR EN USERSARRAY
        async getUsers() {
            this.loading = true;
            const project_id = this.selectedProyect; 
            try {
                const usersResponse = await getAllUsers();
                this.usersArray = usersResponse.data;
                this.totalRows = usersResponse.data.total;
                console.log('ARRAY',this.usersArray)
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
            this.projectsNames = this.projectArray.map(project => project.project_name); // Llena el array con los nombres de proyecto
            this.totalRows = projectResponse.data.total;
          } catch (error) {
            console.error('Error al obtener proyectos:', error);
          } finally {
            this.loading = false;
          }
        },
        async editItem(item) {
          this.dialogCheckin = true;
          this.userId = item.uid_user;
          console.log(this.userId);
        },
        async createCheckIn() {
          console.log('CREATE CHECKIN')
          const post = {
            uid_user: this.userId,
            entry_date: null,
            entry_reason: this.entryReason,
            times_entered: null
          }; 
          try {
            this.loading = true;
            const response = await createProject(post);
            console.log(response);
            console.log('REGISTRADO');
            this.loading = false;
            this.dialogCheckin = false;
          } catch (error) {
            console.log(error)
          }
        },
        async selectProjectId() {
          // Busca el project_id correspondiente al nombre seleccionado
          const selectedProject = this.projectArray.find(project => project.project_name === this.selectedProyect);
          if (selectedProject) {
            this.projectId = selectedProject.project_id; // Guarda el projectId
            console.log("projectId seleccionado:", this.projectId);
          } else {
            console.error("No se encontró el projectId para el proyecto seleccionado");
          }
          try {
            const usersResponse = await getAllUsersById(this.projectId) 
          } catch (error) {
            console.log(error)
          }
        },
        // DESCARGAR PDF
        downloadPdf() {
            // create element <a> for download PDF
            console.log('PDFURLLLL')
            console.log(this.pdfUrl)
            const link = document.createElement('a');
            link.href = this.pdfUrl;
            link.target = '_blank';
            link.download = this.pdfFileName;
            // Simulate a click on the element <a>
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }        
    },
    watch: {
    selectedProyect: function(newValue, oldValue) {
        console.log(this.projectsNames)
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

  components: {
    IconEdit // Registra el componente IconEdit en el componente Vue
  }
</script>


<template>
    <v-row class="month-table">
        <!-- SELECTOR DE PROYECTO -->
        <v-col cols="3">
          <v-combobox
            v-model="selectedProjectName"
            :items="projectsNames"
            label="Proyecto"
            outlined
            @change="selectProjectId"
          ></v-combobox>
        </v-col>
        <!-- BOTONERA -->
        <v-col cols="3">
            <p class="font-weight-medium">
                Descargar PDF 
            </p>
            <v-btn 
            variant="tonal" 
            color="primary"
            @click="downloadPdf"
            >Generar archivo .cvs</v-btn>
        </v-col>
        <v-col cols="6" class="text-right">
            <p class="font-weight-medium">
                Agregar usuario
            </p>
            <v-btn 
                variant="tonal" 
                color="primary"
                prepend-icon="mdi-account"
                @click="dialog = true" 
            >Registrar</v-btn>
        </v-col>
        <!-- TABLA DE USUARIOS -->
        <v-col cols="12" sm="12">
        <UiChildCard title="Ingresos citt">
            <v-card :variant="variant" class="mx-auto">
              <v-divider />
              <v-col>
                <v-data-table
                  v-model:items-per-page="itemsPerPage"
                  :items-per-page-options="rowsPerPageItems"
                  :headers="headers"
                  :items="usersArray"
                  :loading="loading"
                >
                  <template v-slot:item.actions="{ item }">
                    <v-btn class="ml-2" color="primary" icon size="x-small" flat @click="openUpdateDialog(item)">
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn class="ml-2" color="error" icon size="x-small" flat @click="openDeleteDialog(item)">
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </template>
                  <template v-slot:item.checkin="{ item }">
                    <v-btn class="ml-2" color="primary" flat @click="editItem(item)">
                      Ingresar
                    </v-btn>
                  </template>
                </v-data-table>
              </v-col>
            </v-card>
        </UiChildCard>
        </v-col>
    </v-row>

    <!-- dialog ingreso -->
    <v-dialog v-model="dialogCheckin" max-width="600">
      <v-card>
        <v-card-title>Registrar ingreso citt</v-card-title>
        <v-card-text>
          <v-row>
            <v-col>
              <v-textarea v-model="entryReason" label="Motivo"></v-textarea>
            </v-col>
          </v-row>
          <v-btn class="ml-2" flat @click="dialogCheckin = false">
            cancelar
          </v-btn>
          <v-btn class="ml-2" color="primary" flat @click="createCheckIn">
            Registrar
          </v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>
    <!-- ABRIR DIALOG -->
    <div class="pa-4 text-center">
    <v-dialog
      v-model="dialog"
      max-width="600"
    >
      <v-card
        prepend-icon="mdi-account"
        title="Crear Usuario"
      >
        <v-card-text>
          <v-row dense>
            <v-col
              cols="12"
              md="4"
              sm="6"
            >
              <v-text-field
                label="Nombre*"
                required
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              md="4"
              sm="6"
            >
              <v-text-field
                hint="email@duocuc.cl/ email@profesor.duoc.cl"
                label="Email"
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              md="4"
              sm="6"
            >
              <v-text-field
                hint="Ej: 9 1112223345"
                label="Teléfono*"
                persistent-hint
                required
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              md="4"
              sm="6"
            >
              <v-text-field
                label="Email*"
                required
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              md="4"
              sm="6"
            >
              <v-text-field
                label="Constraseña*"
                type="password"
                required
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              md="4"
              sm="6"
            >
              <v-text-field
                hint="Ej: 11.111.111-1"
                label="RUN*"
                required
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              sm="6"
            >
              <v-select
                :items="items"
                label="ID proyecto"
                required
              ></v-select>
            </v-col>

            <v-col
              cols="12"
              sm="6"
            >
              <v-autocomplete
                :items="userRole"
                label="Rol"
                auto-select-first
                multiple
              ></v-autocomplete>
            </v-col>

            <v-col
              cols="12"
              sm="6"
            >
              <v-select
                :items="uidUser"
                label="UID*"
                auto-select-first
                hint="UID registrada por arduino"
                required
              ></v-select>
            </v-col>
          </v-row>

          <small class="text-caption text-medium-emphasis">* Indica que el campo es obligatorio</small>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            text="Close"
            variant="plain"
            @click="dialog = false"
          ></v-btn>

          <v-btn
            color="primary"
            text="Save"
            variant="tonal"
            @click="dialog = false"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>