<script>
import { IconEdit } from "@tabler/icons-vue";
import { defineComponent } from "vue";
import {
  getAllUsersById,
  createUser,
  deleteUser,
  updateUser,
  getAllUsers
} from "../api/userApi.ts";
import {
  getAllcheckIn,
  getCheckInsByDay,
  getCheckInsByDayAndUser
} from "../api/checkInApi";
import { getAllProjects } from "../api/projectApi.ts";
import { createProject } from "../api/checkInApi";
import shortid from 'shortid';

export default defineComponent({
  data() {
    return {
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
      dialog: false,
      dialogCheckin: false,
      dialogProject: false,
      dialogDelete: false,
      dialogUpdate: false,
      errorAlertVisible: false,
      selectedItem: {},
      selectItem: null,
      variant: null,
      checkInArray: [],
      usersArray: [],
      projectArray: [],
      projectsNames: [],
      selectorOP: ['Proyecto CITT', 'MMT'],
      projectId: 0,
      totalRows: 0,
      selectedProyect: null,
      items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      userRole: ["Admin citt", "Profesor", "Alumno", "CIA", "MMT"],
      uidUser: ["OIUUYFASD", "ASDIUAD908", "908DKJHAS"],
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
      errorText: '',
      passwordVisible: false,
      studentName: null,
      motivoEntrada: null,
      messageError: true,
      local_project: null,
    };
  },
  computed: {
    formattedRun: {
      get() {
        return this.rutFormat(this.post.run);
      },
      set(value) {
        this.post.run = value.replace(/\./g, '').replace(/-/g, '');
      },
    },
  },
  async created() {
    this.local_project = localStorage.getItem('project_id');

    if (!this.local_project || this.local_project.trim() === '') {
      this.dialogProject = true;
    } else {
      this.dialogProject = false;
    }

    await this.getUsers(this.local_project);
    await this.getProjects();
  },
  methods: {
    async getAll() {
      this.loading = true;
      try {
        const usersResponse = await getAllUsers();
        this.usersArray = usersResponse.data;

        // Add the attendance status to each user
        const attendancePromises = this.usersArray.map(async (user) => {
          user.asistioHoy = await this.checkIfAttendedToday(user.uid_user);
        });

        await Promise.all(attendancePromises);
      } catch (error) {
        console.error("Error fetching users:", error);
        this.errorAlertVisible = true;
      } finally {
        this.loading = false;
      }
    },
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
    async getUsers(id) {
      this.local_project = localStorage.getItem('project_id');
      this.loading = true;
      try {
        const usersResponse = await getAllUsersById(this.local_project);
        this.usersArray = usersResponse.data;

        // Add the attendance status to each user
        const attendancePromises = this.usersArray.map(async (user) => {
          user.asistioHoy = await this.checkIfAttendedToday(user.uid_user);
        });

        await Promise.all(attendancePromises);
      } catch (error) {
        console.error("Error fetching users:", error);
        this.errorAlertVisible = true;
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
        this.totalRows = projectResponse.data.total;
      } catch (error) {
        console.error("Error al obtener proyectos:", error);
      } finally {
        this.loading = false;
      }
    },
    async editItem(item) {
      this.post = { ...item };
      this.dialogCheckin = true;
      this.userId = item.uid_user;
      this.studentName = item.name;
    },
    async updateItem(item) {
      this.post = { ...item };
      this.itemId = item._id;
      this.dialogUpdate = true;
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
      const post = {
        uid_user: this.userId,
        entry_date: null,
        entry_reason: `${this.studentName}: ${this.entryReason} - ${this.motivoEntrada}`,
        times_entered: null,
      };
      try {
        this.loading = true;
        const response = await createProject(post);
        window.location.reload();
        this.dialogCheckin = false;
        this.clearInput();
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
    async createUser() {
      const id = shortid.generate();
      console.log('porq no sale el fakin id' , id)

      this.post.email = this.post.email.toLowerCase();
      this.post.uid_user = id;

      console.log(this.post)

      const create = {
        uid_user: this.post.uid_user,
        email: this.post.email,
        phone: this.post.phone,
        name: this.post.name,
        hashed_password: this.post.hashed_password,
        run: this.post.run,
        proyect_id: this.post.project_id,
      };

      try {
        await createUser(create);

        this.local_project = this.post.project_id;
        localStorage.removeItem("project_id");
        localStorage.setItem("project_id", this.local_project)

        await this.getUsers(this.local_project);
        this.clearInput();
        this.dialog = false;
      } catch (error) {
        console.log(error);
      }
    },
    async updateUser() {
      const put = {
        email: this.post.email,
        phone: this.post.phone,
        name: this.post.name,
        run: this.post.run,
        proyect_id: this.post.project_id,
      };

      try {
        await updateUser(this.itemId, put);

        this.local_project = this.post.project_id;
        localStorage.removeItem("project_id");
        localStorage.setItem("project_id", this.local_project)

        await this.getUsers(this.local_project);
        this.clearInput();
        this.dialogUpdate = false;
      } catch (error) {
        console.log(error);
        this.errorAlertVisible = true;
      }
    },
    closeUpdate() {
      this.clearInput();
      this.dialogUpdate = false;
    },
    selectProject() {
      this.dialogProject = false;
      this.loading = true;
      const proyect_id = this.selectedItem.id;
      localStorage.setItem("project_id", proyect_id);
      this.getProjectById();
    },
    async getProjectById() {
      this.local_project = localStorage.getItem('project_id');
      try {
        const usersResponse = await getAllUsersById(this.local_project);
        this.usersArray = usersResponse.data;
        this.totalRows = usersResponse.data.total;

        const attendancePromises = this.usersArray.map(async (user) => {
          user.asistioHoy = await this.checkIfAttendedToday(user.uid_user);
        });

        await Promise.all(attendancePromises);
        window.location.reload();
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
      } finally {
        this.loading = false;
      }
    },
    openDeleteDialog(item) {
      this.dialogDelete = true;
      this.itemId = item._id;
    },
    rutFormat(value) {
      let rut = value.replace(/^0+/, '').replace(/\./g, '').replace(/-/g, '');
      if (rut.length > 1) {
        let cuerpo = rut.slice(0, -1);
        let dv = rut.slice(-1).toUpperCase();
        cuerpo = cuerpo.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        return `${cuerpo}-${dv}`;
      }
      return value;
    },
    validateRun(value) {
      if (!value) return 'El RUT es requerido';
      const rut = value.replace(/\./g, '').replace(/-/g, '');
      if (!/^\d{7,8}[0-9Kk]$/.test(rut)) return 'RUT inválido';
      const cuerpo = rut.slice(0, -1);
      const dv = rut.slice(-1).toUpperCase();
      let suma = 0;
      let multiplo = 2;
      for (let i = cuerpo.length - 1; i >= 0; i--) {
        suma += multiplo * parseInt(cuerpo.charAt(i), 10);
        multiplo = multiplo === 7 ? 2 : multiplo + 1;
      }
      const rest = suma % 11;
      const calculatedDv = rest === 0 ? '0' : rest === 1 ? 'K' : (11 - rest).toString();
      if (dv !== calculatedDv) return 'RUT inválido';
      return true;
    },
    phoneFormat(value) {
      let phone = value.replace(/\D/g, '');

      if (phone.length === 0) return value; 

      if (phone.startsWith('9') && (phone.length === 8 || phone.length === 9)) {
        return phone.length === 9 
          ? `${phone.slice(0, 1)}${phone.slice(1, 5)}${phone.slice(5)}` 
          : `${phone.slice(0, 1)}${phone.slice(1, 4)}${phone.slice(4)}`; 
      }

      return value;
    },
    validatePhone(value) {
      let phone = value.replace(/\D/g, '');

      if (!phone) return "El teléfono es obligatorio";

      if (!phone.startsWith('9') || !(phone.length === 8 || phone.length === 9)) {
        return "El teléfono debe comenzar con '9' y tener 8 o 9 dígitos";
      }

      return true;
    },
    validateEmail(value) {
      if (!value) return "El correo es obligatorio";
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) return "El correo debe tener un formato válido y no contener espacios ni símbolos inválidos";
      return true;
    },
    validatePassword(value) {
      if (!value) return "La contraseña es obligatoria";
      if (value.length < 9) return "La contraseña debe tener al menos 9 caracteres";

      const hasLetter = /[a-zA-Z]/.test(value);
      const hasSymbol = /[!@#$%^&*()_+{}\[\]:;"'<>,.?~`-]/.test(value);
      const hasNumber = /[0-9]/.test(value); 

      if (!hasLetter || !hasSymbol || !hasNumber) {
        return "La contraseña debe contener al menos una letra, un símbolo y un número";
      }
      
      return true;
    },
    isFormValid() {
      if (this.post.name && this.post.email && this.post.phone && this.post.hashed_password && this.post.project_id) {
        return true;
      } else {
        this.messageError = 'Todos los campos son obligatorios';
        return false;
      }
    },
    async deleteItem() {
      try {
        this.loading = true;
        await deleteUser(this.itemId);

        await this.getUsers(this.local_project);
        this.dialogDelete = false;
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    logout() {
      localStorage.removeItem("project_id");
      this.dialogProject = true;
    },
    closeCreate() {
      this.clearInput();
      this.dialog = false;
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
    clearInput() {
      this.post = {
        uid_user: null,
        email: null,
        phone: null,
        name: null,
        hashed_password: null,
        run: null,
        project_id: null,
      }
    }
  },
  watch: {
    selectedProyect: function (newValue, oldValue) {
      if (newValue !== oldValue) {
        this.getUsers(this.local_project);
      }
    },
  },
});
</script>

<template>
  <v-row class="month-table">
    <!-- SELECTOR DE PROYECTO -->
    <v-col cols="3">
      <v-text-field v-model="search" class="mx-auto" density="comfortable" menu-icon=""
        placeholder="Buscar Usuario asdsdf" prepend-inner-icon="mdi-magnify" theme="light" variant="solo"
        auto-select-first item-props hint="Escriba para buscar" rounded></v-text-field>
    </v-col>
    <!-- BOTONERA -->
    <v-col cols="3">
      <v-spacer></v-spacer>
      <v-btn variant="tonal" color="primary" prepend-icon="mdi-account" @click="dialog = true"
        text="Registrar nuevo usuario"></v-btn>
    </v-col>
    <v-col cols="3">
      <v-spacer></v-spacer>
      <v-btn variant="tonal" color="red" prepend-icon="mdi-logout" @click="logout">
        cambiar de proyecto
        <v-tooltip activator="parent" location="bottom">Muestra los usuarios según el proyecto</v-tooltip>
      </v-btn>
    </v-col>
    <v-col cols="3">
      <v-spacer></v-spacer>
      <v-btn variant="tonal" color="red" prepend-icon="mdi-account-search" @click="getAll">
        Buscar todos
      <v-tooltip activator="parent" location="bottom">Mustra todos los usuarios</v-tooltip>
      </v-btn>
    </v-col>
    <!-- TABLA DE USUARIOS -->
    <v-col cols="12" sm="12">
      <v-card class="mx-auto">
        <v-divider />
        <v-col>
          <v-data-table v-model:items-per-page="itemsPerPage" :items-per-page-options="rowsPerPageItems"
            :headers="headers" :items="usersArray" :loading="loading" :search="search" item-key="uid_user">
            <template v-slot:item.actions="{ item }">
              <v-btn class="ml-2" color="error" icon size="x-small" flat @click="openDeleteDialog(item)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
              <v-btn class="ml-2" color="primary" icon size="x-small" flat @click="updateItem(item)">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </template>
            <template v-slot:item.checkin="{ item }">
              <v-btn class="ml-2" color="primary" flat @click="editItem(item)">
                Ingresar
              </v-btn>
            </template>
            <template v-slot:item.asist="{ item }">
              <v-switch v-model="item.asistioHoy" inset color="primary"></v-switch>
            </template>
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
          <v-col>
            <v-select v-model="motivoEntrada" :items="selectorOP" label="Seleciona una opción">
            </v-select>
          </v-col>
        </v-row>
        <v-btn class="ml-2" flat @click="dialogCheckin = false">
          Cancelar
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
              <v-text-field v-model="post.name" label="Nombre*" required></v-text-field>
            </v-col>

            <v-col cols="12" md="4" sm="6">
              <v-text-field v-model="post.email" hint="email@duocuc.cl/ email@profesor.duoc.cl" label="Email*"
                :rules="[validateEmail]" required></v-text-field>
            </v-col>

            <v-col cols="12" md="4" sm="6">
              <v-text-field v-model="post.phone" hint="Ej: +56 9 XXXX XXXX" label="Teléfono*" required
                :rules="[validatePhone]" @input="post.phone = phoneFormat(post.phone)"></v-text-field>
            </v-col>

            <v-col cols="11" md="4" sm="6">
              <v-text-field v-model="post.run" hint="Ingresa el RUT sin puntos ni guion" label="RUT*"
                :rules="[validateRun]" required></v-text-field>
            </v-col>

            <v-col cols="12" md="4" sm="6">
              <v-text-field 
                v-model="post.hashed_password"
                hint="Debe tener al menos 9 caracteres y contener al menos una letra, símbolo o número"
                label="Contraseña*"
                :rules="[validatePassword]"
                required
                :type="passwordVisible ? 'text' : 'password'"  
                append-icon="mdi-eye"  
                @click:append="passwordVisible = !passwordVisible"  
              ></v-text-field>
            </v-col>


            <v-col cols="12" sm="6">
              <v-autocomplete v-model="post.project_id" label="Selecciona un proyecto..." :items="projectArray"
                item-value="project_id" item-title="project_name" variant="underlined"
                @change="selectItem"></v-autocomplete>
            </v-col>

          </v-row>

          <small class="text-caption text-medium-emphasis">* Indica que el campo es obligatorio</small>
          <small :disbled="!messageError" class="text-caption text-medium-emphasis">* Indica que el campo es obligatorio</small>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text="Cerrar" variant="plain" @click="closeCreate()"></v-btn>

          <v-btn color="primary" text="Crear usuario" variant="tonal" @click="createUser"
            :disabled="!isFormValid()"></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
  <!-- ABRIR DIALOG UPDATE -->
  <div class="pa-4 text-center">
    <v-dialog v-model="dialogUpdate" max-width="600">
      <v-card prepend-icon="mdi-account" title="Crear Usuario">
        <v-card-text>
          <v-row dense>
            <v-col cols="12" md="4" sm="6">
              <v-text-field v-model="post.name" label="Nombre*" required></v-text-field>
            </v-col>

            <v-col cols="12" md="4" sm="6">
              <v-text-field v-model="post.email" hint="email@duocuc.cl/ email@profesor.duoc.cl" label="Email*"
                :rules="[validateEmail]" required></v-text-field>
            </v-col>

            <v-col cols="12" md="4" sm="6">
              <v-text-field v-model="post.phone" hint="Ej: +56 9 XXXX XXXX" label="Teléfono*" required
                :rules="[validatePhone]" @input="post.phone = phoneFormat(post.phone)"></v-text-field>
            </v-col>

            <v-col cols="12" md="4" sm="6">
              <v-text-field v-model="post.run" hint="Ingresa el RUT sin puntos ni guion" label="RUT*"
                :rules="[validateRun]" required></v-text-field>
            </v-col>


            <v-col cols="12" sm="6">
              <v-autocomplete v-model="post.project_id" label="Selecciona un proyecto..." :items="projectArray"
                item-value="project_id" item-title="project_name" variant="underlined"
                @change="selectItem"></v-autocomplete>
            </v-col>

          </v-row>

          <small class="text-caption text-medium-emphasis">* Indica que el campo es obligatorio</small>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text="Cerrar" variant="plain" @click="closeUpdate()"></v-btn>

          <v-btn color="primary" text="Crear usuario" variant="tonal" @click="updateUser"></v-btn>
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
              <v-autocomplete v-model="selectedItem.id" label="Selecciona un proyecto..." :items="projectArray"
                item-value="project_id" item-title="project_name" variant="underlined"></v-autocomplete>
              <p class="letra-abajo">
                Es necesario que seleccione su proyecto para poder gestionar
              </p>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" :rounded="true" elevation="2" variant="text" @click="selectProject">
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

  <!--Alerta-->
  <v-alert v-model="errorAlertVisible" dismissible color="red" elevation="2" colored-border icon="mdi-alert"
    timeout="5000">
    Oops! Ha ocurrido un problema.
  </v-alert>

</template>