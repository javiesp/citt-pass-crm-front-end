<script>
export default {
  data() {
    return {
      loading: false,
      loginDto: {
        email: null,
        hashed_password: null,
      },
      showPassword: false,
      items: [
        { text: 'My Files', icon: 'mdi-folder' },
        { text: 'Shared with me', icon: 'mdi-account-multiple' },
        { text: 'Starred', icon: 'mdi-star' },
        { text: 'Recent', icon: 'mdi-history' },
        { text: 'Offline', icon: 'mdi-check-circle' },
        { text: 'Uploads', icon: 'mdi-upload' },
        { text: 'Backups', icon: 'mdi-cloud-upload' },
      ],
      emailUser: ''
    };
  },
  created() {
    this.getUserData();
  },
  methods: {
    toggleShowPassword() {
      this.showPassword = !this.showPassword;
    },
    getUserData() {
      this.emailUser = localStorage.getItem('email')
      console.log('LOCAL STORAGE')
      console.log(this.emailUser)
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
          <v-skeleton-loader type="list-item-avatar"></v-skeleton-loader>
          <v-skeleton-loader type="list-item"></v-skeleton-loader>
          <v-skeleton-loader type="list-item"></v-skeleton-loader>
          <v-skeleton-loader type="list-item"></v-skeleton-loader>
          <v-skeleton-loader type="list-item"></v-skeleton-loader>
          <v-skeleton-loader type="list-item"></v-skeleton-loader>
          <v-skeleton-loader type="article"></v-skeleton-loader>
          <v-skeleton-loader type="list-item"></v-skeleton-loader>
        </v-col>
        <v-col v-else md="12" sm="5">
          <v-card title="Información de perfil">
            <v-card-text>
              <v-list-item prepend-avatar="https://cdn.vuetifyjs.com/images/john.png">
                <v-list-title>{{ emailUser }}</v-list-title>
              </v-list-item>
              <v-list>
                <v-list-subheader>REPORTS</v-list-subheader>

                <v-list-item v-for="(item, i) in items" :key="i" :value="item" color="primary" rounded="xl">
                  <template v-slot:prepend>
                    <v-icon :icon="item.icon"></v-icon>
                  </template>

                  <v-list-item-title v-text="item.text"></v-list-item-title>
                </v-list-item>
              </v-list>
            </v-card-text>
            <v-card-actions>
              <v-btn prepend-icon="mdi-lock-reset">
                Actualizar
              </v-btn>
            </v-card-actions>
            <v-card title="Actualizar contrasenia">
              <v-card-text>
                <v-text-field v-model="loginDto.hashed_password" label="Password" outlined dense color="blue"
                  autocomplete="off" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="toggleShowPassword" :type="showPassword ? 'text' : 'password'" />
              </v-card-text>
              <v-card-actions>
                <v-btn prepend-icon="mdi-lock-reset">
                  Actualizar
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