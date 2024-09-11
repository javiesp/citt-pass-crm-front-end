<script>
import { IconEdit } from "@tabler/icons-vue";
import { defineComponent } from "vue";
import {
  getAllUsers,
  getAllUsersById,
  createUser,
  deleteUser,
  getChecklist,
} from "../api/userApi.ts";
import { 
  getAllcheckIn,
  getCheckInsByDay,
  getCheckInsByDayAndUser
} from "../api/checkInApi";
import { getAllProjects } from "../api/projectApi.ts";
import { createProject } from "../api/checkInApi";
import shortid from 'shortid';

console.log("");
export default defineComponent({
  data() {
    return {
      // data table
      loading: false,
      search: "",
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
        { title: "Asistencia", value: "asist" },
      ],
      // VARAIBLES DESCARGA PDF
      name: "DownloadPdfButton",
      props: {
        pdfUrl: {
          type: String,
          required: true,
        },
        pdfFileName: {
          type: String,
          required: true,
        },
      },
      // VARIEABLES
      dialog: false,
      dialogCheckin: false,
      dialogProject: false,
      dialogDelete: false,
      selectedItem: {},
      selectItem: null,
      variant: null,
      checkInArray: [],
      usersArray: [],
      projectArray: [],
      projectsNames: [],
      projectId: 0,
      totalRows: 0,
      selectedProyect: null,
      // ARRAY SELECTORES
      items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      userRole: ["Admin citt", "Profesor", "Alumno", "CIA", "MMT"],
      uidUser: ["OIUUYFASD", "ASDIUAD908", "908DKJHAS"],
      loading: false,
      userId: null,
      UID_USER: [],
      entryReason: null,
      entryDate: null,
      assited: false,
      post: {
        uid_user: null,
        email: null,
        phone: null,
        name: null,
        hashed_password: null,
        run: null,
        project_id: null,
      },
      itemId: null,
    };
  },
  methods: {
    async checkIfAttendedToday(uid_user) {
      try {
        const today = new Date();
        const formattedToday = `${today.getDate().toString().padStart(2, '0')}/${(today.getMonth() + 1).toString().padStart(2, '0')}/${today.getFullYear()}`;

        const checkInsResponse = await getCheckInsByDayAndUser(formattedToday, uid_user);
        const checkIns = checkInsResponse.data;

        return checkIns.length > 0; // Return true or false based on attendance
      } catch (error) {
        console.error(`Error checking attendance for user ${uid_user}:`, error);
        return false;
      }
    },
    // GET API Y AGUARDAR EN USERSARRAY
    async getUsers() {
      let local_project = localStorage.getItem('project_id');
      console.log("get id", local_project)
      this.loading = true;
      try {
        const usersResponse = await getAllUsersById(local_project);
        this.usersArray = usersResponse.data;

        // Add the attendance status to each user
        const attendancePromises = this.usersArray.map(async (user) => {
          user.asistioHoy = await this.checkIfAttendedToday(user.uid_user);
        });

        await Promise.all(attendancePromises);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        this.loading = false;
      }
    },
    async getProjects() {
      this.loading = true;
      try {
        const projectResponse = await getAllProjects();
        this.projectArray = projectResponse.data;
        this.projectsNames = this.projectArray.map(
          (project) => project.project_name
        ); // Llena el array con los nombres de proyecto
        this.totalRows = projectResponse.data.total;
      } catch (error) {
        console.error("Error al obtener proyectos:", error);
      } finally {
        this.loading = false;
      }
    },
    async editItem(item) {
      this.dialogCheckin = true;
      this.userId = item.uid_user;
      console.log(this.userId);
    },
    async getCheckIn() {
      try {
        const response = await getAllcheckIn();
        this.checkInArray = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async createCheckIn() {
      console.log("CREATE CHECKIN");
      const post = {
        uid_user: this.userId,
        entry_date: null,
        entry_reason: this.entryReason,
        times_entered: null,
      };
      try {
        this.loading = true;
        const response = await createProject(post);
        console.log(response);
        console.log("REGISTRADO");
        window.location.reload();
        this.dialogCheckin = false;
        this.loading = false;
      } catch (error) {
        console.log(error);
      }
    },
    async createUser() {
      const id = shortid.generate();     

      const create = {
        uid_user: id,
        email: this.post.email,
        phone: this.post.phone,
        name: this.post.name,
        hashed_password: this.post.hashed_password,
        run: this.post.run,
        proyect_id: this.post.project_id,
      };
      try {
        const response = await createUser(create);
        this.getUsers();
        this.dialog = false;
      } catch (error) {
        console.log(error);
      }
    },
    selectProject() {
      this.dialogProject = false;
      this.loading = true;

      const proyect_id = this.selectedItem.id;
      localStorage.setItem("project_id", proyect_id);

      this.getProjectById();
    },
    async getProjectById() {
      let local_project = localStorage.getItem('project_id');
      console.log("get id", local_project)

      try {
        const usersResponse = await getAllUsersById(local_project);
        this.usersArray = usersResponse.data;
        this.totalRows = usersResponse.data.total;

        const attendancePromises = this.usersArray.map(async (user) => {
          user.asistioHoy = await this.checkIfAttendedToday(user.uid_user);
        });

        await Promise.all(attendancePromises);
        console.log("ARRAY", this.usersArray);
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
      } finally {
        this.loading = false;
      }
    },
    openDeleteDialog(item) {
      this.dialogDelete = true;
      this.itemId = item._id;
      console.log(this.itemId);
    },
    async deleteItem() {
      try {
        this.loading = true;
        const response = await deleteUser(this.itemId);
        this.getUsers();
        this.dialogDelete = false;
        this.loading = false;
      } catch (error) {
        console.error(error);
      }
    },
    logout() {
      localStorage.removeItem("project_id");
      this.dialogProject = true;
    },               

    // DESCARGAR PDF
    downloadPdf() {
      // create element <a> for download PDF
      console.log("PDFURLLLL");
      console.log(this.pdfUrl);
      const link = document.createElement("a");
      link.href = this.pdfUrl;
      link.target = "_blank";
      link.download = this.pdfFileName;
      // Simulate a click on the element <a>
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
  },
  watch: {
    selectedProyect: function (newValue, oldValue) {
      console.log(this.projectsNames);
      if (newValue !== oldValue) {
        this.getUsers();
      }
    },
  },
  async created() {
    let local_project = localStorage.getItem('project_id');

    if (!local_project || local_project.trim() === '') {
      this.dialogProject = true;
    } else {
        this.dialogProject = false;
    }
    
    await this.getUsers();
    await this.getProjects();
    // console.log('CHECK IN')
    // await this.getCheckIn();
    // const local = 
  },
});

</script>

<template>
  <v-row class="month-table">
    <!-- SELECTOR DE PROYECTO -->
    <v-col cols="3">
      <v-text-field
        v-model="search"
        class="mx-auto"
        density="comfortable"
        menu-icon=""
        placeholder="Buscar Usuario"
        prepend-inner-icon="mdi-magnify"
        theme="light"
        variant="solo"
        auto-select-first
        item-props
        hint="Escriba para buscar"
        rounded
      ></v-text-field>
    </v-col>
    <!-- BOTONERA -->
    <v-col cols="3">
      <v-spacer></v-spacer>
      <v-btn
        variant="tonal"
        color="primary"
        prepend-icon="mdi-account"
        @click="dialog = true"
        text="Registrar nuevo usuario"
        ></v-btn
      >
    </v-col>
    <v-col cols="3">
      <v-spacer></v-spacer>
      <v-btn
        variant="tonal"
        color="red"
        prepend-icon="mdi-logout"
        @click="logout"
        text="cambiar de proyecto"
        ></v-btn
      >
    </v-col>
    <!-- TABLA DE USUARIOS -->
    <v-col cols="12" sm="12">
        <v-card class="mx-auto">
          <v-divider />
          <v-col>
            <v-data-table
              v-model:items-per-page="itemsPerPage"
              :items-per-page-options="rowsPerPageItems"
              :headers="headers"
              :items="usersArray"
              :loading="loading"
              :search="search"
              item-key="uid_user"
            >
              <template v-slot:item.actions="{ item }">
                <v-btn
                  class="ml-2"
                  color="error"
                  icon
                  size="x-small"
                  flat
                  @click="openDeleteDialog(item)"
                >
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </template>
              <template v-slot:item.checkin="{ item }">
                <v-btn
                  class="ml-2"
                  color="primary"
                  flat
                  @click="editItem(item)"
                >
                  Ingresar
                </v-btn>
              </template>
              <template v-slot:item.asist="{ item }">
                <v-switch
                  v-model="item.asistioHoy"
                  inset
                  color="primary"
                ></v-switch>
              </template>

              <!-- <template v-slot:item.asist="{ item }">
                <div class="text-end">
                  <v-chip
                    :color="item.asist ? 'green' : 'green'"
                    :text="item.asist ? 'No asiste' : 'Asstio'"
                    class="text-uppercase"
                    size="small"
                    label
                  ></v-chip>
                </div>
              </template> -->
            </v-data-table>
          </v-col>
        </v-card>
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
    <v-dialog v-model="dialog" max-width="600">
      <v-card prepend-icon="mdi-account" title="Crear Usuario">
        <v-card-text>
          <v-row dense>
            <v-col cols="12" md="4" sm="6">
              <v-text-field
                v-model="post.name"
                label="Nombre*"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4" sm="6">
              <v-text-field
                v-model="post.email"
                hint="email@duocuc.cl/ email@profesor.duoc.cl"
                label="Email"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4" sm="6">
              <v-text-field
                v-model="post.phone"
                hint="Ej: 9 1112223345"
                label="Teléfono*"
                persistent-hint
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4" sm="6">
              <v-text-field
                v-model="post.hashed_password"
                label="Contrasenia"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4" sm="6">
              <v-text-field
                v-model="post.run"
                hint="Ej: 11.111.111-1"
                label="RUN*"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="6">
              <v-autocomplete
                v-model="post.project_id"
                label="Selecciona un proyecto..."
                :items="projectArray"
                item-value="project_id"
                item-title="project_name"
                variant="underlined"
                @change="selectItem"
              ></v-autocomplete>
            </v-col>

            <!-- <v-col cols="12" sm="6">
              <v-select
                v-model="post.uid_user"
                :items="uidUser"
                label="UID"
                auto-select-first
                hint="UID registrada por arduino"
                required
              ></v-select>
            </v-col> -->
          </v-row>

          <small class="text-caption text-medium-emphasis"
            >* Indica que el campo es obligatorio</small
          >
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text="Cerrar" variant="plain" @click="dialog = false"></v-btn>

          <v-btn
            color="primary"
            text="Crear usuario"
            variant="tonal"
            @click="createUser"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
  <!-- Elegir proyecto -->
  <v-dialog v-model="dialogProject" persistent width="600">
    <v-card>
      <v-card-title>
        <span class="my-letra">Proyecto</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-autocomplete
                v-model="selectedItem.id"
                label="Selecciona un proyecto..."
                :items="projectArray"
                item-value="project_id"
                item-title="project_name"
                variant="underlined"
                @change="selectItem"
              ></v-autocomplete>
              <p class="letra-abajo">
                Es necesario que seleccione su grupo para poder gestionar
              </p>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          :rounded="true"
          elevation="2"
          variant="text"
          @click="selectProject"
        >
          Login
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-dialog v-model="dialogDelete" persistent max-width="500px">
    <v-card>
      <v-card-title>
        <span>Confirmar Eliminación</span>
      </v-card-title>
      <v-card-text> ¿Estás seguro de que deseas eliminar esto? </v-card-text>
      <v-card-actions>
        <v-btn @click="dialogDelete = false">Cancelar</v-btn>
        <v-btn color="red" @click="deleteItem">Eliminar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
