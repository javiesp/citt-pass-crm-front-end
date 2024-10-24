<script setup lang="ts">
import { ref } from 'vue';

let hublink = 'https://github.com/';
let photourl = 'https://avatars.githubusercontent.com/';

const users = ref([
    { name: "Javiera Espina", email: "ja.espinam@duocuc.cl", rol: "Desarrollador Full-Stack - Ingeniero de Software", icon: "mdi-code-tags", githublink: hublink + "javiesp", photo: photourl + "u/69701833?s=400&u=b147c29edb264c4b6697d98aa9a2b0c4b28b974b&v=4" },
    { name: "Wilson Maldonado", email: "wi.maldonado@duocuc.cl", rol: "Desarrollador Frontend", icon: "mdi-laptop", githublink: hublink + "MaldoWilson", photo: photourl + "u/127255876?v=4" },
    { name: "Bryan Delgado", email: "bry.delgado@duocuc.cl", rol: "Desarrollador Backend", icon: "mdi-database", githublink: hublink + "Jegal33", photo: photourl + "u/94422503?v=4" },
    { name: "Benjamin Astroza", email: "be.astroza@duocuc.cl", rol: "Desarrollador Backend", icon: "mdi-database", githublink: hublink + "seiya20depegaso", photo: photourl + "u/144739512?v=4" },
]);

console.log("usuarios", users);
</script>

<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <h2>Perfil Usuario</h2>
            </v-col>
            <v-col cols="12" md="6" v-for="(user, index) in users" :key="index">
                <v-card class="mx-auto" :subtitle="user.email" :title="user.name">
                    <template v-slot:prepend>
                        <v-avatar size="40" class="mr-3">
                            <img :src="user.photo" :alt="user.name" style="width: 100%; height: 100%; object-fit: cover;" />
                        </v-avatar>
                    </template>
                    <template v-slot:append>
                        <v-icon :icon="user.icon"></v-icon>
                    </template>
                    <v-card-text>{{ user.rol }}</v-card-text>
                    <v-card-actions>
                        <v-btn prepend-icon="mdi-github" :href="user.githublink" rounded elevation="1" target="_blank">Github</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<style scoped>
h2 {
    margin-bottom: 20px;
}
</style>