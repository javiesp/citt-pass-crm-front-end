<script>
import { defineComponent } from "vue";
import { getAllUsers } from "../api/userApi";
import {
  getAllProjects,
  deleteProject,
  updateProject,
  createProject,
  searchProjectByName,
} from "../api/projectApi";

export default defineComponent({
  name: "projectItem",
  data () {
    return {
      // data table
      loading: false,
      search: '',
      itemsPerPage: 5,
      rowsPerPageItems: [
        { title: "5", value: 5 },
        { title: "10", value: 10 },
        { title: "25", value: 25 },
        { title: "50", value: 50 },
      ],
      headers: [
        { title: "ID", value: "project_id" },
        { title: "Nombre", value: "project_name" },
        { title: "Descripción", value: "project_description" },
        { title: "Estatus proyecto", value: "project_status" },
        { title: "ID lista de deseo", value: "wishlist_id" },
        { title: "Acciones", value: "actions" },
      ],
      dialogCreate: false,
      usersArray: [],
      projectArray: [],
      projectsNamesArray: [],
      statusArray: [
        "En proceso",
        "En pausa",
        "Completo",
        "Sin iniciar",
        "Descartado",
      ],
      projectId: ref(null),
      totalRows: 0,
      searchQuery: "",
      selectedProyect: null,
      pdfUrl: "",
      pdfFileName: "",
      dialogVisible: false,
      dialogUpdateVisible: false,
      alertVisible: false,
      errorAlertVisible: false,
      objectDto: {
        project_id: null,
        project_name: "",
        project_description: "",
        project_status: "",
        wishlist_id: null,
        project_team_id: null,
      },
      max: 238452345,
    };
  },
  computed: {
    filteredRack() {
      if (!this.searchQuery) {
        return this.projectArray;
      }
      return this.projectArray.filter((project) =>
        project.project_name
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase())
      );
    },
  },
  methods: {
    async getProjects() {
      this.loading = true;
      try {
        const projectResponse = await getAllProjects();
        this.projectArray = projectResponse.data;
        this.projectsNamesArray = this.projectArray.map(
          (project) => project.project_name
        );
      } catch (error) {
        console.error("Error al obtener proyectos:", error);
        this.errorAlertVisible = true;
      } finally {
        this.loading = false;
      }
    },
    async searchItemByName() {
      console.log("id", this.projectId);
      if (this.projectId === null) {
        this.getProjects();
      } else {
        try {
          const searchResponse = await searchProjectByName(this.projectId);
          this.projectArray = searchResponse.data;
          this.alertVisible = true;
        } catch (error) {
          console.error("Error al obtener proyectos:", error);
          this.errorAlertVisible = true;
        }
      }
    },
    downloadPdf() {
      const link = document.createElement("a");
      link.href = this.pdfUrl;
      link.target = "_blank";
      link.download = this.pdfFileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },

    openUpdateDialog(item) {
      this.objectDto = {
        project_name: item.project_name,
        project_description: item.project_description,
        project_status: item.project_status,
        wishlist_id: item.wishlist_id,
        project_team_id: item.project_team_id,
      },

      this.projectId = item._id;
      this.dialogUpdateVisible = true;
    },

    closeUpdateDialog() {
      this.clearInput();
      this.dialogUpdateVisible = false;
    },

    async updateProject() {
      console.log(this.objectDto);
      const put = {
        project_name: this.objectDto.project_name,
        project_description: this.objectDto.project_description,
        project_status: this.objectDto.project_status,
        wishlist_id: this.objectDto.wishlist_id,
        project_team_id: this.objectDto.project_team_id,
      };

      try {
        const updateResponse = await updateProject(this.projectId, put);
        this.getProjects();
        console.log("UPDATED", updateResponse);

        this.clearInput();
        this.dialogVisible = false;
        this.alertVisible = true;
        this.dialogUpdateVisible = false;
      } catch (error) {
        console.error(
          "No se ha podido actualizar el proyecto",
          this.projectId,
          error
        );
        this.errorAlertVisible = true;
      }
    },
    openDeleteDialog(projectId) {
      this.projectId = projectId._id;
      this.dialogVisible = true;
      console.log('MIRA ACA')
      console.log(this.projectId);
    },
    closeDeleteDialog() {
      this.dialogCreate = false;
    },
    async deleteProject() {
      console.log("aaaaaaaaaaaaaaaaa", this.projectId);
      try {
        const deleteResponse = await deleteProject(this.projectId);
        this.dialogVisible = false;
        this.getProjects();
        console.log("DELETED", deleteResponse);
        this.alertVisible = true;
      } catch (error) {
        console.error(
          "No se ha podido eliminar el proyecto",
          this.projectId,
          error
        );
        this.errorAlertVisible = true;
      }
    },
    openCreateDialog() {
      this.dialogCreate = true;
    },
    getRandomInt() {
        const rand = Math.floor(Math.random() * this.max); 
        this.objectDto.project_id = rand; 
        console.log('NUMERO', rand);
        return rand;
    },
    async createProject() {
      this.getRandomInt();
      const post = {
        project_id: this.objectDto.project_id,
        project_name: this.objectDto.project_name,
        project_description: this.objectDto.project_description,
        project_status: this.objectDto.project_status,
        wishlist_id: this.objectDto.wishlist_id,
        project_team_id: this.objectDto.project_team_id,
      };
      console.log("asd", this.objectDto);
      try {
        const createResponse = await createProject(post);

        this.getProjects();

        console.log("CREATED", createResponse);

        this.clearInput();
        this.dialogCreate = false;
        this.alertVisible = true;
      } catch (error) {
        console.error(
          "No se ha podido eliminar el proyecto",
          this.objectDto.project_id,
          error
        );
        this.errorAlertVisible = true;
      }
    },

    clearInput() {
      this.objectDto = {
        project_id: null,
        project_name: null,
        project_description: null,
        project_status: null,
        wishlist_id: null,
        project_team_id: null,
      } 
    }
  },
  watch: {},
  async created() {
    await this.getProjects();
    console.log(this.projectArray);
    console.log("sel", this.projectId);
  },
});
</script>

<template>
  <h2>Proyectos Citt</h2>

  <v-row class="month-table">
    <v-col cols="3">
      <v-text-field
        v-model="search"
        class="mx-auto"
        density="comfortable"
        menu-icon=""
        placeholder="Buscar proyecto"
        prepend-inner-icon="mdi-magnify"
        theme="light"
        variant="solo"
        auto-select-first
        item-props
        hint="Escriba para buscar"
        rounded
      ></v-text-field>
    </v-col>
    <v-col cols="3">
      <v-btn
        variant="tonal"
        color="primary"
        prepend-icon="mdi-folder-outline"
        @click="openCreateDialog"
        >Agregar Proyecto</v-btn
      >
    </v-col>
    <v-col cols="12" sm="12">
      <v-card :variant="variant" class="mx-auto">
        <v-divider />
        <v-col>
          <v-data-table
            v-model:items-per-page="itemsPerPage"
            :items-per-page-options="rowsPerPageItems"
            :headers="headers"
            :items="projectArray"
            :loading="loading"
            :search="search"
          >
            <template v-slot:item.actions="{ item }">
              <v-btn class="ml-2" color="primary" icon size="x-small" flat @click="openUpdateDialog(item)">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn class="ml-2" color="error" icon size="x-small" flat @click="openDeleteDialog(item)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </template>
          </v-data-table>
        </v-col>
      </v-card>
    </v-col>
  </v-row>
  <!-- botonera acciones -->
  <v-dialog v-model="dialogUpdateVisible" max-width="500px">
    <v-card>
      <v-card-title> Actualizar proyecto </v-card-title>
      <v-card-text>
        <v-card-text>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                label="Nombre Proyecto"
                v-model="objectDto.project_name"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-combobox
                hint="Status"
                label="Status"
                v-model="objectDto.project_status"
                :items="statusArray"
                variant="outlined"
              ></v-combobox>
            </v-col>
            <v-col cols="12" md="10">
              <v-textarea
                label="Descripcion"
                v-model="objectDto.project_description"
                variant="outlined"
                required
              ></v-textarea>
            </v-col>
            <!-- <v-col cols="12" md="4">
              <v-combobox
                hint="Proyect Team"
                label="Wishlist"
                v-model="objectDto.wishlist_id"
                variant="outlined"
              ></v-combobox>
            </v-col>
            <v-col cols="12" md="4">
              <v-combobox
                hint="Proyect Team"
                label="Proyect Team"
                v-model="objectDto.project_team_id"
                variant="outlined"
              ></v-combobox>
            </v-col> -->
          </v-row>
        </v-card-text>
      </v-card-text>
      <v-card-actions>
        <v-btn color="error" text @click="closeUpdateDialog">Cancelar</v-btn>
        <v-btn color="primary" text @click="updateProject">Actualizar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <!-- delete -->
  <v-dialog v-model="dialogVisible" max-width="500px">
    <v-card>
      <v-card-title> Eliminar proyecto </v-card-title>
      <v-card-text> ¿Está seguro de eliminar este proyecto? </v-card-text>
      <v-card-actions>
        <v-btn color="error" text @click="closeDeleteDialog">Cancelar</v-btn>
        <v-btn color="primary" text @click="deleteProject">Eliminar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <!-- ABRIR DIALOG -->
  <div class="pa-4 text-center">
    <v-dialog v-model="dialogCreate" max-width="600">
      <v-card prepend-icon="mdi-folder-outline" title="Agregar Proyecto">
        <v-card-text>
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field
                label="Nombre Proyecto"
                v-model="objectDto.project_name"
                variant="outlined"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-combobox
                hint="Status"
                label="Status"
                v-model="objectDto.project_status"
                :items="statusArray"
                variant="outlined"
                required
              ></v-combobox>
            </v-col>
            <v-col cols="12" md="10">
              <v-textarea
                label="Descripcion"
                v-model="objectDto.project_description"
                variant="outlined"
                required
              ></v-textarea>
            </v-col>
            <!-- <v-col cols="12" md="4">
              <v-combobox
                hint="Proyect Team"
                label="Wishlist"
                v-model="objectDto.wishlist_id"
                variant="outlined"
              ></v-combobox>
            </v-col>
            <v-col cols="12" md="4">
              <v-combobox
                hint="Proyect Team"
                label="Proyect Team"
                v-model="objectDto.project_team_id"
                variant="outlined"
              ></v-combobox>
            </v-col> -->
          </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="error"
            text="Cancelar"
            variant="plain"
            @click="closeDeleteDialog"
          ></v-btn>
          <v-btn
            color="primary"
            text="Crear proyecto"
            variant="tonal"
            @click="createProject"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>

  <div>
    <v-alert
      v-model="errorAlertVisible"
      dismissible
      color="red"
      border="left"
      elevation="2"
      colored-border
      icon="mdi-alert"
      timeout="5000"
    >
      Oops! Ha ocurrido un problema.
    </v-alert>
  </div>
</template>
