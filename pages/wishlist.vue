<script>
import { defineComponent, ref, onMounted } from "vue";
import { getAllWishlists } from "../api/wishlistApi";

export default defineComponent({
  name: "WishlistCard",
  setup() {
    const dialog = ref(false);
    const wishlistArray = ref([]);
    const inventoryNames = [
      "Inventario Alpha",
      "Inventario Beta",
      "Inventario Gamma",
    ];
    const selectedInventory = ref(null);
    const showDetails = ref({}); // Initial state for showing details for each wishlist

    const fetchWishlists = async () => {
      try {
        const response = await getAllWishlists();
        wishlistArray.value = response.data;
      } catch (error) {
        console.error("Error fetching wishlists:", error);
      }
    };

    const selectInventoryId = () => {
      console.log("Selected Inventory:", selectedInventory.value);
    };

    const downloadPdf = () => {
      console.log("Download PDF");
    };

    const toggleDetails = (wishlistId) => {
      showDetails.value[wishlistId] = !showDetails.value[wishlistId];
    };

    onMounted(() => {
      fetchWishlists();
    });

    return {
      dialog,
      wishlistArray,
      inventoryNames,
      selectedInventory,
      showDetails,
      selectInventoryId,
      downloadPdf,
      toggleDetails,
    };
  },
});
</script>

<template>
  <h2>Lista de deseos</h2>
  <br />
  <v-row class="month-table">
    <v-col cols="3">
      <v-combobox
        v-model="selectedInventory"
        :items="inventoryNames"
        label="Proyecto"
        outlined
        @change="selectInventoryId"
      ></v-combobox>
    </v-col>
    <v-col cols="3">
      <v-btn variant="tonal" color="primary" @click="downloadPdf"
        >Generar archivo .csv</v-btn
      >
    </v-col>
    <v-col cols="6" class="text-right">
      <v-btn
        variant="tonal"
        color="primary"
        prepend-icon="mdi-folder-outline"
        @click="dialog = true"
        >Agregar Wish-List</v-btn
      >
    </v-col>
  </v-row>
  
  <!-- Productos -->
  <v-row>
    <v-col v-for="(wishlist, index) in wishlistArray" :key="wishlist._id">
      <v-card class="mx-auto" max-width="344">
        <v-img height="200px" src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" cover></v-img>
        <v-card-title>{{ wishlist.wishlist_name }}</v-card-title>
        <v-card-subtitle>Presupuesto: {{ wishlist.budget }}</v-card-subtitle>
        <v-card-actions>
          <v-btn color="orange-lighten-2" @click="toggleDetails(wishlist._id)">Ver Productos</v-btn>
          <v-spacer></v-spacer>
          <v-btn :icon="showDetails[wishlist._id] ? 'mdi-chevron-up' : 'mdi-chevron-down'" @click="toggleDetails(wishlist._id)"></v-btn>
        </v-card-actions>
        <v-expand-transition>
          <div v-show="showDetails[wishlist._id]">
            <v-divider></v-divider>
            <v-card-text>
              <ul>
                <li v-for="product in wishlist.product" :key="product._id">
                  {{ product.product_name }} - Precio: {{ product.price }} - Cantidad: {{ product.quantity }}
                </li>
              </ul>
            </v-card-text>
          </div>
        </v-expand-transition>
        <v-col>
          <v-btn 
            @click="openModal" 
            color="red" 
            density="compact"
          >
            <v-icon>mdi-trash-can-outline</v-icon>
          </v-btn>
        </v-col>
      </v-card>
    </v-col>
  </v-row>

  <v-dialog v-model="modalOpen" persistent max-width="500px">
        <v-card>
          <v-card-title>
            <span>Confirmar Eliminación</span>
          </v-card-title>
          <v-card-text>
            ¿Estás seguro de que deseas eliminar esto?
          </v-card-text>
          <v-card-actions>
            <v-btn color="red" @click="confirmDeletion">Eliminar</v-btn>
            <v-btn @click="closeModal">Cancelar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
  
  <!-- Dialogo para añadir inventario -->
  <div class="pa-4 text-center">
    <v-dialog v-model="dialog" max-width="600">
      <v-card prepend-icon="mdi-folder-outline" title="Agregar Wish-List">
        <!-- Campos de texto -->
        <v-card-text>
          <v-row dense>
            <v-col cols="12" md="4" sm="6">
              <v-text-field label="Item" required></v-text-field>
            </v-col>
            <v-col cols="12" md="4" sm="6">
              <v-text-field hint="Rack" label="Rack"></v-text-field>
            </v-col>
            <v-col cols="12" md="4" sm="6">
              <v-text-field hint="Stock" label="Stock"></v-text-field>
            </v-col>
            <v-col cols="12" md="4" sm="6">
              <v-text-field hint="ID" label="ID"></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text="Close" variant="plain" @click="dialog = false"></v-btn>
          <v-btn color="primary" text="Save" variant="tonal" @click="dialog = false"></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
