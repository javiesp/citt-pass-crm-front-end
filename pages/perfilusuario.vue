<script>
import {
  getAllRoles,
  getRoleByRoleId,
  getAllUserRoles,
  getUserRoleByUID,
  getAllUsersByMail,
  updateUserRole,
  updateUserPassword,
} from '../api/roleApi'

export default {
  data() {
    return {
      loading: false,
      loading2: false,
      settingDialog: false,
      loginDto: {
        email: null,
        hashed_password: null,
      },
      showPassword: false,
      open: ['Users'],
      admins: [
        ['Management', 'mdi-account-multiple-outline'],
        ['Settings', 'mdi-cog-outline'],
      ],
      cruds: [
        ['Create', 'mdi-plus-outline'],
        ['Read', 'mdi-file-outline'],
        ['Update', 'mdi-update'],
        ['Delete', 'mdi-delete'],
      ],
      majors: [
        { title: "Informática Biomédica", value: 'Informática Biomédica' },
        { title: "Ingeniería en Conectividad y Redes", value: 'Ingeniería en Conectividad y Redes' },
        { title: "Ingeniería en Informática", value: 'Ingeniería en Informática' },
        { title: "Analista Programador", value: 'Analista Programador' },
        { title: "Analista Programador Computacional", value: 'Analista Programador Computacional' },
        { title: "Administración de Redes y Telecomunicaciones", value: 'Administración de Redes y Telecomunicaciones' },
        { title: "Técnico en Electricidad y Autom. Industrial", value: 'Técnico en Electricidad y Autom. Industrial' },
        { title: "Ingeniería en Electricidad y Autom. Industrial", value: 'Ingeniería en Electricidad y Autom. Industrial' },
      ],
      emailUser: '',
      user_major: '',
      user_permissions: [],
      major_school: '',
      current_semester: null,
      items: [],
      post: {},
      passwordDTO: {
        id: '',
        hashed_password: ''
      }
    };
  },
  created() {
    const accessToken = localStorage.getItem('accessToken');
    this.verifyTokenAuth(accessToken);
    this.getUserData();

    console.log('LOG', this.user_major)
    this.items = [
      { text: this.emailUser, icon: 'mdi-account' },
      { text: this.user_major, icon: 'mdi-school' },
      { text: this.major_school, icon: 'mdi-office-building' },
      { text: this.current_semester + ' ' + 'semestre', icon: 'mdi-calendar' }
    ];
  },
  methods: {
    verifyTokenAuth(token) {
      const router = useRouter();

      if (!token) {
        router.push("/login"); 
      }

      const isValidJWT = typeof token === 'string' && token.split('.').length !== 3 ? router.push("/login") : true
    },
    toggleShowPassword() {
      this.showPassword = !this.showPassword;
    },
    async getUserData() {
      this.loading = true;
      this.emailUser = localStorage.getItem('email')

      try {
        const response = await getAllUsersByMail(this.emailUser);

        this.passwordDTO._id = response.data._id;
        this.passwordDTO.hashed_password = response.data.hashed_password;

        const uid_user = response.data.uid_user;

        const responseRole = await getUserRoleByUID(uid_user);

        this.post = responseRole.data;

        this.user_major = responseRole.data.user_major;
        this.user_permissions = responseRole.data.user_permissions;
        this.major_school = responseRole.data.major_school;
        this.current_semester = responseRole.data.current_semester;

        // Ahora que los datos están disponibles, puedes actualizar la propiedad 'items'
        this.items = [
          { text: this.emailUser, icon: 'mdi-account' },
          { text: this.user_major, icon: 'mdi-school' },
          { text: this.major_school, icon: 'mdi-office-building' },
          { text: this.current_semester + ' semestre', icon: 'mdi-calendar' }
        ];

        this.loading = false;
      } catch (error) {
        console.log(error)
        this.loding = false;
      }
    },
    sortSchool(user_major) {
      let major_school = '';

      // Condición para "Informática Biomédica"
      if (this.user_major === "Informática Biomédica") {
        major_school = "Escuela de Salud";
      }

      // Condición para la Escuela de Informática y Telecomunicaciones
      if (this.user_major === "Ingeniería en Conectividad y Redes" ||
        this.user_major === "Ingeniería en Informática" ||
        this.user_major === "Analista Programador" ||
        this.user_major === "Analista Programador Computacional" ||
        this.user_major === "Administración de Redes y Telecomunicaciones") {
        major_school = "Escuela de Informática y Telecomunicaciones";
      }

      // Condición para "Escuela de Ingeniería y Recursos Naturales"
      if (this.user_major === "Técnico en Electricidad y Autom. Industrial" ||
        this.user_major === "Ingeniería en Electricidad y Autom. Industrial") {
        major_school = "Escuela de Ingeniería y Recursos Naturales";
      }

      return major_school;
    },
    async updateUserRole() {
      this.loading = true;

      console.log(this.post)

      let major_school = this.sortSchool(this.user_major)
      console.log(this.user_major)
      console.log(major_school)

      const post = {
        user_role_id: this.post.user_role_id,
        role_id: this.post.role_id,
        uid_user: this.post.uid_user,
        user_role: this.post.user_role,
        user_major: this.user_major,
        user_permissions: this.post.user_permissions,
        major_school: major_school,
        current_semester: this.current_semester
      }

      try {
        const response = await updateUserRole(this.post._id, post);

        if (response) {
          this.getUserData();
          this.settingDialog = false;
          this.loading = false;
        }
      } catch (error) {
        console.log(error)
        this.settingDialog = false;
        this.loading = false;
      }
    },
    async updatePassword() {
      this.loading2 = true
      const post = {
        hashed_password: this.passwordDTO.hashed_password
      }
      try {
        const response = await updateUserPassword(this.passwordDTO._id, post);
        this.loading2 = false
      } catch (error) {
        this.loading2 = false
      }
    }
  }
}
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h2>Perfil Usuario</h2>
        <p>Modifica tu perfil</p>
      </v-col>
      <v-row class="row-container mb-6" no-gutters>
        <v-col class="loading-container" v-if="loading" md="12" sm="5">
          <v-card>
            <v-skeleton-loader type="list-item-avatar"></v-skeleton-loader>
            <v-skeleton-loader type="list-item-avatar"></v-skeleton-loader>
            <v-skeleton-loader type="list-item-avatar"></v-skeleton-loader>
            <v-skeleton-loader type="list-item-avatar"></v-skeleton-loader>
            <v-skeleton-loader type="list-item-avatar"></v-skeleton-loader>
            <v-skeleton-loader type="list-item-avatar"></v-skeleton-loader>
            <v-skeleton-loader type="article"></v-skeleton-loader>
            <v-skeleton-loader type="list-item"></v-skeleton-loader>
          </v-card>
        </v-col>
        <v-col v-else md="12" sm="5">
          <v-card title="Información de perfil">
            <v-card-text>
              <v-list-item :prepend-avatar="'/images/profile/user2.jpg'">
                <v-list-title>{{ emailUser }}</v-list-title>
                <h3>{{ user_major }}</h3>
              </v-list-item>
              <v-list v-model:opened="open">
                <v-list-item prepend-icon="mdi-cog" title="Ajustes de perfil"></v-list-item>

                <v-list-group value="Users">
                  <template v-slot:activator="{ props }">
                    <v-list-item v-bind="props" prepend-icon="mdi-account-circle" title="Users"></v-list-item>
                  </template>

                  <v-card>
                    <v-card-title>Datos del usuario</v-card-title>
                    <v-card-text>
                      <v-list>
                        <v-list-item v-for="(item, i) in items" :key="i">
                          <template v-slot:prepend>
                            <v-icon :icon="item.icon"></v-icon>
                          </template>

                          <v-list-item-title v-text="item.text"></v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-card-text>
                    <v-card-actions>
                      <v-btn @click="settingDialog = true" prepend-icon="mdi-account-edit">
                        Actualizar configuración de perfil
                      </v-btn>
                    </v-card-actions>
                  </v-card>

                  <v-dialog v-model="settingDialog" width="600px">
                    <v-card title="Actualizar">
                      <v-card-text>
                        <v-row>
                          <v-col>
                            <v-autocomplete label="Carreras" v-model="user_major" :items="majors"
                              variant="underlined"></v-autocomplete>
                            <v-text-field label="Semestre" v-model="current_semester" type="number" min="1" max="12"
                              step="1" />

                          </v-col>
                        </v-row>
                      </v-card-text>
                      <v-card-actions>
                        <v-btn @click="updateUserRole()" prepend-icon="mdi-account-edit">
                          Actualizar
                        </v-btn>
                      </v-card-actions>

                    </v-card>
                  </v-dialog>
                </v-list-group>
              </v-list>
            </v-card-text>
            <v-card title="Actualizar contraseña" :loading="loading2">
              <v-card-text>
                <v-text-field v-model="passwordDTO.hashed_password" label="Password" outlined dense color="blue"
                  autocomplete="off" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="toggleShowPassword" :type="showPassword ? 'text' : 'password'" />
              </v-card-text>
              <v-card-actions>
                <v-btn @click="updatePassword()" prepend-icon="mdi-lock-reset">
                  Actualizar contraseña
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-card>
        </v-col>
      </v-row>
    </v-row>
  </v-container>
</template>

<style scoped>
.row-container {
  background-color: #e0e0e0;
  padding: 10px;
  border-radius: 10px;
}
</style>