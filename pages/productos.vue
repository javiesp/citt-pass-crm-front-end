<script>
import { defineComponent } from "vue";
import { getsbProducts } from "../api/integracionApi";
import { getAllWishlists } from "../api/wishlistApi";

export default defineComponent({
  data() {
    return {
      dialog: false,
      dialogWishlist: false,
      productArray: [],
      productNames: [],
      wishlistId: null, // Variable para almacenar el ID de la wishlist seleccionada
      wishlistArray: [],
      wishNames: [],
      productSearchQuery: "",
      selectedProducts: [],
      dialogVisible: false,
      alertVisible: false,
      errorAlertVisible: false,
      loading: false,
      selectedWishlist: "", // Nombre de la wishlist seleccionada
      wishlistNameToIdMap: {} // Mapa de nombres de wishlists a IDs
    };
  },
  computed: {
    filteredProducts() {
      if (!this.productSearchQuery) {
        return this.productArray.results || [];
      }
      return (this.productArray.results || []).filter((product) =>
        product.name.toLowerCase().includes(this.productSearchQuery.toLowerCase())
      );
    },
  },
  methods: {
    async getProduct() {
      this.loading = true;
      try {
        const response = await getsbProducts();
        this.productArray = response.data;
        this.productNames = this.productArray.results.map((product) => product.name);
      } catch (error) {
        console.error("PRODUCT_ERROR:", error);
        this.errorAlertVisible = true;
      } finally {
        this.loading = false;
      }
    },
    async getWishlist() {
      try {
        const response = await getAllWishlists();
        this.wishlistArray = response.data;
        // Crea un mapa de nombres de wishlists a IDs para buscar rápido por nombre
        this.wishlistNameToIdMap = this.wishlistArray.reduce((map, wishlist) => {
          map[wishlist.wishlist_name] = wishlist.wishlist_id; // Usa `wishlist_id` directamente
          return map;
        }, {});
        this.wishNames = this.wishlistArray.map((wishlist) => wishlist.wishlist_name);
      } catch (error) {
        console.error("Error fetching wishlists:", error);
        this.errorAlertVisible = true;
      }
    },
    addProductToWishlist(product) {
      const selectedProduct = {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1, // Se asume que la cantidad inicial es 1
      };
      this.selectedProducts.push(selectedProduct);
      this.dialogWishlist = true; // Muestra el diálogo de la wishlist
    },
    openCreateDialog() {
      this.dialog = true;
    },
    closeCreateDialog() {
      this.dialogWishlist = false; // Cierra el diálogo de la wishlist
    },
    onWishlistChange(selectedName) {
      this.selectedWishlist = selectedName; // Almacena el nombre de la wishlist seleccionada
    },
    saveWishlistId() {
      // Busca el ID de la wishlist usando el nombre y lo guarda
      if (this.selectedWishlist in this.wishlistNameToIdMap) {
        this.wishlistId = this.wishlistNameToIdMap[this.selectedWishlist];
        this.dialogWishlist = false; // Cierra el diálogo después de guardar el ID
        console.log("Wishlist ID guardado:", this.wishlistId);
        // Aquí puedes agregar el resto de la lógica para manejar la operación de guardar
      } else {
        console.error("Wishlist no encontrada:", this.selectedWishlist);
        this.errorAlertVisible = true;
      }
    },
  },
  mounted() {
    this.getProduct(); // Obtiene los productos al montar el componente
    this.getWishlist(); // Obtiene las wishlists al montar el componente
  },
});
</script>





<template>
  <h2>Productos</h2>
  <v-row class="month-table">
    <v-col cols="3">
      <v-autocomplete
        :items="productNames"
        item-value="productArray.name"
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
        item-props
        hint="Escriba para buscar"
        rounded
      ></v-autocomplete>
    </v-col>
    <v-col cols="6" class="text-right">
      <v-btn
        variant="tonal"
        color="primary"
        prepend-icon="mdi-folder-outline"
        @click="openCreateDialog"
        >Ver wishlist</v-btn
      >
    </v-col>
    <v-col>
      <v-row>
        <v-col
          v-for="(product, index) in filteredProducts"
          :key="index"
          cols="12"
          md="4"
        >
          <v-card>
            <v-img
              v-if="product.images && product.images.length > 0"
              :src="product.images[0]"
              height="200"
            ></v-img>
            <v-card-title>{{ product.name }}</v-card-title>
            <v-card-text>
              <p>Price: {{ product.price }}</p>
              <p>Discount: {{ product.discount }}</p>
              <v-btn icon @click="addProductToWishlist(product)">
                <v-icon>mdi-heart</v-icon>
              </v-btn>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>

  <v-dialog v-model="dialogWishlist" max-width="500px">
      <template #default>
        <v-card>
          <v-card-title>Wishlist</v-card-title>
          <v-card-text>
            <ul>
              <li v-for="product in selectedProducts" :key="product.id">
                PRODUCTO: {{ product.name }} PRECIO: ${{ product.price }}
              </li>
              <v-select
                :items="wishNames"
                label="Selecciona la wishlist"
                v-model="selectedWishlist"
                @change="onWishlistChange"
                dense
              ></v-select>
            </ul>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="closeCreateDialog">Cerrar</v-btn>
            <v-btn @click="saveWishlistId">Guardar</v-btn> <!-- Botón de guardar -->
          </v-card-actions>
        </v-card>
      </template>
  </v-dialog>




  <v-alert
    v-model="errorAlertVisible"
    dismissible
    color="red"
    border="left"
    elevation="2"
    colored-border
    icon="mdi-alert"
    timeout="5000"
  >
    Oops! Ha ocurrido un problema.
  </v-alert>
</template>
