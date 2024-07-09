<script>
import { getAllWishlists, deleteWishlist } from "../api/wishlistApi";

export default {
  name: "WishlistCard",
  data() {
    return {
      dialogDelete: false,
      dialog: false,
      wishlistArray: [],
      inventoryNames: [
        "Inventario Alpha",
        "Inventario Beta",
        "Inventario Gamma",
      ],
      selectedInventory: null,
      showDetails: {},
      wishlistId: null,
      loading: false,
      productSearchQuery: '',
      wishNames: []
    };
  },
  computed: {
    filteredProducts() {
      console.log('INPUT: ', this.productSearchQuery);
      if (!this.productSearchQuery) {
        console.log('OUTPUT: ', this.wishlistArray);
        return this.wishlistArray;
      }
      return this.wishlistArray.map((wishlist) => {
        return {
          ...wishlist,
          products: wishlist.products.filter((product) =>
            product.name.toLowerCase().includes(this.productSearchQuery.toLowerCase())
          ),
        };
      }).filter(wishlist => wishlist.products.length > 0);
    },
  },
  methods: {
    async fetchWishlists() {
      try {
        this.loading = true;
        console.log("cargando", this.loading);
        const response = await getAllWishlists();
        this.wishlistArray = response.data;
        this.wishlistNameToIdMap = this.wishlistArray.reduce((map, wishlist) => {
          map[wishlist.wishlist_name] = wishlist.wishlist_id; 
          return map;
        }, {});
        this.wishNames = this.wishlistArray.map((wishlist) => wishlist.wishlist_name);
        this.loading = false;
        console.log("descargando", this.loading);
      } catch (error) {
        console.error("Error fetching wishlists:", error);
        this.loading = false; // Ensure loading is set to false on error as well
      }
    },
    openDelete(item) {
      console.log("ITEM");
      console.log(item);
      this.wishlistId = item;
      this.dialogDelete = true;
    },
    async deleteWishlist() {
      try {
        const response = deleteWishlist(this.wishlistId);
        console.log('DELETED', this.wishlistId);
        console.log(response);
        this.dialogDelete = false;
        this.fetchWishlists();
      } catch (error) {
        console.log(error);
      }
    },
    selectInventoryId() {
      console.log("Selected Inventory:", this.selectedInventory);
    },
    downloadPdf() {
      console.log("Download PDF");
    },
    toggleDetails(wishlistId) {
      this.showDetails[wishlistId] = !this.showDetails[wishlistId];
    },
  },
  mounted() {
    this.fetchWishlists();
  },
};
</script>

<template>
  <h2>Lista de deseos</h2>
  <br />
  <v-row class="month-table">
    <v-col cols="3">
      <v-autocomplete
        :items="wishNames"
        item-value="wishlist_name"
        class="mx-auto"
        density="comfortable"
        menu-icon=""
        placeholder="Buscar Producto"
        prepend-inner-icon="mdi-magnify"
        style="max-width: 350px"
        theme="light"
        variant="solo"
        auto-select-first
        v-model="productSearchQuery"
        hint="Escriba para buscar"
        rounded
      ></v-autocomplete>
    </v-col>
  </v-row>

  <!-- Productos -->
  <v-row>
    <v-col v-if="loading" cols="12" class="text-center">
      <v-progress-circular
        :size="200"
        :width="17"
        color="primary"
        indeterminate
      ></v-progress-circular>
    </v-col>
    <v-col
      v-else
      cols="3"
      v-for="(wishlist, index) in wishlistArray"
      :key="wishlist._id"
    >
      <v-card class="mx-auto" max-width="344">
        <v-img
          height="200px"
          src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
          cover
        ></v-img>
        <v-card-title>{{ wishlist.wishlist_name }}</v-card-title>
        <v-card-subtitle>Presupuesto: {{ wishlist.budget }}</v-card-subtitle>
        <v-card-actions>
          <v-btn color="orange-lighten-2" @click="toggleDetails(wishlist._id)"
            >Ver Productos</v-btn
          >
          <v-spacer></v-spacer>
          <v-btn
            :icon="
              showDetails[wishlist._id] ? 'mdi-chevron-up' : 'mdi-chevron-down'
            "
            @click="toggleDetails(wishlist._id)"
          ></v-btn>
        </v-card-actions>
        <v-expand-transition>
          <div v-show="showDetails[wishlist._id]">
            <v-divider></v-divider>
            <v-card-text>
              <v-list-item
                v-for="product in wishlist.product"
                :key="product._id"
                :subtitle="product.price"
                :title="product.product_name"
              >
                <v-list-item-content>Cantidad: {{ product.quantity }}</v-list-item-content>
                <template v-slot:prepend>
                  <v-avatar color="grey-lighten-1">
                    <v-icon color="white">mdi-shopping</v-icon>
                  </v-avatar>
                </template>

                <template v-slot:append>
                  <v-btn
                    color="grey-lighten-1"
                    icon="mdi-trash-can-outline"
                    variant="text"
                    click="dialogDelete = true"
                  ></v-btn>
                </template>
              </v-list-item>
            </v-card-text>
          </div>
        </v-expand-transition>
        <v-col>
          <v-btn
            @click="openDelete(wishlist._id)"
            color="red"
            density="compact"
          >
            <v-icon>mdi-trash-can-outline</v-icon>
          </v-btn>
        </v-col>
      </v-card>
    </v-col>
  </v-row>

  <v-dialog v-model="dialogDelete" persistent max-width="500px">
    <v-card>
      <v-card-title>
        <span>Confirmar Eliminación</span>
      </v-card-title>
      <v-card-text> ¿Estás seguro de que deseas eliminar esto? </v-card-text>
      <v-card-actions>
        <v-btn @click="dialogDelete = false">Cancelar</v-btn>
        <v-btn color="red" @click="deleteWishlist">Eliminar</v-btn>
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
          <v-btn
            color="primary"
            text="Save"
            variant="tonal"
            @click="dialog = false"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
