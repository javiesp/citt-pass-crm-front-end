<script>
import { defineComponent } from "vue";
import { getsbProducts } from "../api/integracionApi";
import { getAllWishlists, updateWishlistProducts } from "../api/wishlistApi";

export default defineComponent({
  data() {
    return {
      dialog: false,
      dialogWishlist: false,
      productArray: [],
      productNames: [],
      wishlistId: null, 
      wishlistArray: [],
      wishNames: [],
      productSearchQuery: "",
      selectedProducts: {},
      dialogVisible: false,
      alertVisible: false,
      errorAlertVisible: false,
      loading: false,
      selectedWishlist: "", 
      wishlistNameToIdMap: {} 
    };
  },
  computed: {
    filteredProducts() {
      console.log('INPUT: ', this.productSearchQuery)
      if (!this.productSearchQuery) {
        console.log('OUTPUT: ', this.productArray.results)
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
        console.log('INPUT: ', response);
        this.productArray = response.data;
        this.productNames = this.productArray.results.map((product) => product.name);
        console.log('OUTPUT: ', this.productArray)
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
        console.log('INPUT: ', response);
        this.wishlistArray = response.data;
        this.wishlistNameToIdMap = this.wishlistArray.reduce((map, wishlist) => {
          map[wishlist.wishlist_name] = wishlist.wishlist_id; 
          return map;
        }, {});
        this.wishNames = this.wishlistArray.map((wishlist) => wishlist.wishlist_name);
        console.log('OUTPUT: ', this.wishlistArray)
      } catch (error) {
        console.error("Error fetching wishlists:", error);
        this.errorAlertVisible = true;
      }
    },
    addProductToWishlist(product) {
      console.log('HOLA');
      const productos = {
        product_id: product.id,
        product_name: product.name,
        price: product.price,
        quantity: 2
      }
      this.selectedProducts = productos; 
      console.log('INPUT: ', product);
      this.dialogWishlist = true;
      console.log('OUTPUT: ',this.selectedWishlist,'/', this.selectedProducts); 
    },
    openCreateDialog() {
      this.dialog = true;
    },
    closeCreateDialog() {
      this.dialogWishlist = false; 
    },
    async saveWishlistId() {
      console.log('WISHLIST SELECCIONADA')
      console.log(this.selectedWishlist)
      console.log('PRODUCTOS SELECCIONADOS')
      console.log(this.selectedProducts)

      try {
        const respose = await updateWishlistProducts(this.selectedWishlist, this.selectedProducts)
        console.log(respose)
        this.dialogWishlist = false; 
        this.selectedProducts = {};
        console.log('AGREGADO')
      } catch (error) {
        console.log(error)
      }
    },
  },
  mounted() {
    this.getProduct(); 
    this.getWishlist(); 
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
                :items="wishlistArray"
                label="Selecciona la wishlist"
                v-model="selectedWishlist"
                item-value="_id"
                item-title="wishlist_name"
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
