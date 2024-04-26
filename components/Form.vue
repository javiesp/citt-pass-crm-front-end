<template>
    <v-container>
        <v-row align="center" justify="center" >
            <v-col cols="12" sm="7">
              <v-card class="elevation-6 mt-10"  >
               <v-window v-model="step">
                  <v-window-item :value="1">
                    <v-row>
                      <v-col cols="12" md="6">
                        <v-card-text class="mt-12">
                          <img class="img2" src="assets\Imagenes\citt_logo.png" alt="" style="width: 400px; height: 100px; border-radius: 5px;">
                          <h4
                            class="text-center"
                          >Inicie sesión con tu cuenta</h4>
                          <br><br>
                          <h6
                            class="text-center  grey--text "
                          >Inicie sesión con tu cuenta para que pueda continuar</h6>
                          <v-row align="center" justify="center">
                            <v-col cols="12" sm="8">
                             
                            <v-text-field
                              label="Email"
                              outlined
                              dense
                              color="blue"
                              autocomplete="false"
                             class="mt-16"
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
                         
                          label="Recordarme"
                          class="mt-n1"
                          color="blue"
                        > </v-checkbox>
                                </v-col>
                          
                              </v-row>
                              <div style="padding: 20px 0;">
                            <v-btn block >Iniciar Sesion</v-btn>
                          </div>
                            </v-col>
                          </v-row>  
                        </v-card-text>
                      </v-col>
                      <v-col cols="12" md="6" class="blue rounded-bl-xl" >
                      <div style="  text-align: center; padding: 100px 0;">

                     <!-- Boton para registrar usuario
                        <v-card-text class="white--text" >
                          <h3 class="text-center ">¿Aún no tienes una cuenta?</h3>                      
                        </v-card-text>
                        <div class="text-center">
                          <v-btn tile outlined dark @click="step++">Regístrate</v-btn> 
                        </div>
                      fin del boton -->

                      <br><br><br>
                        <img class="img2" src="assets\Imagenes\img1.png" alt="" style="width: 400px; height: 290px; border-radius: 5px; opacity: 70%;">
                        </div>
                      </v-col>
                    </v-row>
                  </v-window-item>
                  <v-window-item :value="2">
                    <v-row >
                      <v-col cols="12" md="6" class="blue rounded-br-xl">
                       <div style="  text-align: center; padding: 50px 0;">
                        <v-card-text class="white--text" >
                          <img class="img2" src="assets\Imagenes\citt_logo.png" alt="" style="width: 400px; height: 100px; border-radius: 5px;">
                          <br><br>
                          <h3 class="text-center ">¿Ya te registraste?</h3>
                          <br>
                          <h6
                            class="text-center"
                          >Inicie sesión con tu cuenta para que pueda continuar</h6>
                        </v-card-text>
                        <div class="text-center">
                          <v-btn tile outlined dark @click="step--">Iniciar Sesion</v-btn>                  
                        </div><br><br>
                        <img class="img2" src="assets\Imagenes\img1.png" alt="" style="width: 320px; height: 250px; border-radius: 5px;">
                        </div>
                      </v-col>
  
                      <v-col cols="12" md="6">
                        <v-card-text class="mt-12">
                          <h4
                            class="text-center"
                          >Regístrese para obtener una cuenta</h4>
                          <h6
                            class="text-center  grey--text "
                          >Vamos a configurarlo todo para que pueda comenzar y ser un miembro Citt</h6>
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
                        > </v-checkbox>
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
  </template>
  
  <script>
  export default {
    data() {
      return {
        step: 1
      }
    }
  }
  </script>