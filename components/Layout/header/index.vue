<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

function logout() {
  console.log('LOGOUT');
  localStorage.removeItem("email");
  localStorage.removeItem("accessToken");
  router.push('/login'); // Navigate to login page
  console.log('SESION CERRADA');
}

const userprofile = ref([
  {
    title: "Mi perfil",
    desc: "Configuración de la cuenta",
    to: "/cards" // Path for "Mi perfil"
  },
  {
    title: "Colaboradores",
    desc: "Colaboradores del proyecto",
    to: "/colaborators" // Path for "Colaboradores"
  },
]);

// Function to handle navigation when a user profile item is clicked
const navigateTo = (to: string) => {
  if (to) {
    router.push(to); // Navigate to the specified route
  }
};
</script>

<template>
  <v-menu :close-on-content-click="false">
    <template v-slot:activator="{ props }">
      <v-btn class="custom-hover-primary" variant="text" v-bind="props" icon>
        <v-avatar size="35">
          <img src="/images/profile/user2.jpg" width="35" alt="User" />
        </v-avatar>
      </v-btn>
    </template>
    <v-sheet rounded="md" width="250" elevation="10">
      <v-list class="pa-4" elevation="10" rounded="md">
        <!-- User profile items -->
        <v-list-item 
          class="py-2 mb-2" 
          v-for="(item, i) in userprofile" 
          :key="i" 
          :value="item" 
          :title="item.title"
          :subtitle="item.desc" 
          rounded="md"
          @click="navigateTo(item.to)"> <!-- Added click event to navigate -->
        </v-list-item>
        
        <!-- Logout button -->
        <v-btn block color="error" class="mt-4 py-4" @click="logout">Cerrar sesión</v-btn>
      </v-list>
    </v-sheet>
  </v-menu>
</template>
