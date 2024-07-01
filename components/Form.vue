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
    async login() {
      this.loading = true;
      console.log("INICIANDO SESION");
      console.log(this.loginDto);

      if (!this.loginDto.email && !this.loginDto.hashed_password)
        return (this.dialog = true);
      console.log(this.dialog);

      try {
        const loginResponse = await userLogin(this.loginDto);

        this.mail = this.loginDto.email;

        this.loginArray = loginResponse.data;
        this.bearerToken = this.loginArray.accessToken;
        console.log("RESPONSE");

        const accessToken = this.loginArray.accessToken;

        localStorage.setItem("email", this.mail);
        localStorage.setItem("accessToken", accessToken);

        console.log(loginResponse);
        this.$router.push("/");
      } catch (error) {
        console.error("Error al obtener Inventarios:", error);
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
  <v-container class="my-container">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="5">
        <v-card class="elevation-6 mt-10">
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
                  <v-col cols="12" sm="8">
                    <v-text-field
                      v-model="loginDto.email"
                      label="Email"
                      outlined
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
                      <v-btn block @click="login">Iniciar Sesion</v-btn>
                    </div>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-window-item>
            <v-window-item :value="2">
              <v-row>
                <v-col cols="12" md="6" class="blue rounded-br-xl">
                  <div style="text-align: center; padding: 50px 0">
                    <v-card-text class="white--text">
                      <img
                        class="img2"
                        src="assets/Imagenes/citt_logo.png"
                        alt=""
                        style="width: 400px; height: 100px; border-radius: 5px"
                      />
                      <br /><br />
                      <h3 class="text-center">¿Ya te registraste?</h3>
                      <br />
                      <h6 class="text-center">
                        Inicie sesión con tu cuenta para que pueda continuar
                      </h6>
                    </v-card-text>
                    <div class="text-center">
                      <v-btn tile outlined dark @click="step--"
                        >Iniciar Sesion</v-btn
                      >
                    </div>
                    <br /><br />
                    <img
                      class="img2"
                      src="assets/Imagenes/img1.png"
                      alt=""
                      style="width: 320px; height: 250px; border-radius: 5px"
                    />
                  </div>
                </v-col>

                <v-col cols="12" md="6">
                  <v-card-text class="mt-12">
                    <h4 class="text-center">
                      Regístrese para obtener una cuenta
                    </h4>
                    <h6 class="text-center grey--text">
                      Vamos a configurarlo todo para que pueda comenzar y ser un
                      miembro Citt
                    </h6>
                    <v-row align="center" justify="center">
                      <v-col cols="12" sm="8">
                        <v-row>
                          <v-col cols="12" sm="6">
                            <v-text-field
                              label="Nombre"
                              outlined
                              dense
                              color="blue"
                              autocomplete="false"
                              class="mt-4"
                            />
                          </v-col>
                          <v-col cols="12" sm="6">
                            <v-text-field
                              label="Apellido"
                              outlined
                              dense
                              color="blue"
                              autocomplete="false"
                              class="mt-4"
                            />
                          </v-col>
                        </v-row>
                        <v-text-field
                          label="Email"
                          outlined
                          dense
                          color="blue"
                          autocomplete="false"
                        />
                        <v-text-field
                          label="Password"
                          outlined
                          dense
                          color="blue"
                          autocomplete="false"
                          type="password"
                        />
                        <v-row>
                          <v-col cols="12" sm="7">
                            <v-checkbox
                              label="Aceptas los Terminos"
                              class="mt-n1"
                              color="blue"
                            >
                            </v-checkbox>
                          </v-col>
                        </v-row>
                        <v-btn color="blue" dark block tile>Registrarte</v-btn>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-col>
              </v-row>
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

<style scoped>
.my-container {
  background-image: url("@/assets/Imagenes/img1.png");
  background-size: cover;
  background-position: center;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
