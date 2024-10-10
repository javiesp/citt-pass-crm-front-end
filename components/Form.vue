<script>
import { userLogin } from "../api/userApi.ts";

export default {
  data() {
    return {
      dialog: false,
      dialogError: false,
      step: 1,
      loginDto: {
        email: null,
        hashed_password: null,
      },
      loginArray: [],
      loading: false,
      bearerToken: null,
      mail: null,
      showPassword: false,
    };
  },
  methods: {
    navigate(){
      this.$router.push("/gestoringreso");
    },
    async login() {
      this.loading = true;
      console.log("INICIANDO SESION");
      console.log('LOGIN DTO', this.loginDto);

      if (!this.loginDto.email || !this.loginDto.hashed_password) {
        this.loading = false;
        this.dialog = true; // Muestra el diálogo si faltan credenciales
        return;
      }

      try {
        const loginResponse = await userLogin(this.loginDto);

        this.mail = this.loginDto.email;
        this.loginArray = loginResponse.data;
        this.bearerToken = this.loginArray.accessToken;

        const accessToken = this.loginArray.accessToken;

        localStorage.setItem("email", this.mail);
        localStorage.setItem("accessToken", accessToken);

        this.navigate();
        console.log('Success !!!')
      } catch (error) {
        console.error("Error al iniciar:", error);
        this.dialogError = true;
        
      } finally {
        this.loading = false;
      }
    },
    toggleShowPassword() {
      this.showPassword = !this.showPassword;
    },
  },
};
</script>

<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="5">
        <v-card class="elevation-6 mt-10">
          <v-img
            height="250"
            src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
            cover
          ></v-img>

          <v-window v-model="step">
            <v-window-item :value="1">
              <v-card-text class="mt-12" align="center">
                <img
                  class="img2"
                  src="assets/Imagenes/citt_logo.png"
                  alt=""
                  style="width: 400px; height: 100px; border-radius: 5px"
                />
                <h4>Inicia sesión con tu cuenta</h4>
                <h6 class="text-center grey--text">
                  Inicia sesión con tu cuenta para continuar
                </h6>
                <v-row align="center" justify="center">
                  <v-col v-if="loading" cols="12" class="text-center">
                    <v-progress-circular
                      :size="100"
                      :width="10"
                      color="primary"
                      indeterminate
                    ></v-progress-circular>
                  </v-col>
                  <v-col v-else cols="12" sm="8">
                    <v-text-field
                      v-model="loginDto.email"
                      label="Email"
                      outlinedF
                      dense
                      color="blue"
                      autocomplete="false"
                      class="mt-16"
                    />
                    <v-text-field
                      v-model="loginDto.hashed_password"
                      label="Password"
                      outlined
                      dense
                      color="blue"
                      autocomplete="off"
                      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                      @click:append="toggleShowPassword"
                      :type="showPassword ? 'text' : 'password'"
                    />
                    <div style="padding: 20px 0">
                      <v-btn block @click="login">Iniciar Sesión</v-btn>
                    </div>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-window-item>
          </v-window>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <!-- Dialog flujo sin credenciales de ingreso -->
  <v-dialog v-model="dialog" max-width="450">
    <v-card>
      <v-card-title>
        <v-icon color="error">mdi-alert</v-icon>
        Por favor, ingrese sus credenciales
      </v-card-title>
    </v-card>
  </v-dialog>
  <!-- Dialog flujo de error -->
  <v-dialog v-model="dialogError" max-width="611">
    <v-card>
      <v-card-title>
        <v-icon color="error">mdi-alert</v-icon>
        Email o contraseña incorrectos, intente nuevamente
      </v-card-title>
    </v-card>
  </v-dialog>
</template>
