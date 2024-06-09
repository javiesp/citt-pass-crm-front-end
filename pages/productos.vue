<script>
import { defineComponent } from "vue";
import { getsbProducts } from "../api/integracionApi";

export default defineComponent({
  data() {
    return {
      dialog: false,
      productArray: [],
      productNames: [],
      productSearchQuery: "",
      selectedProducts: [],
      dialogVisible: false,
      alertVisible: false,
      errorAlertVisible: false,
      loading: false,
    };
  },
  computed: {
    filteredProducts() {
      if (!this.productSearchQuery) {
        return this.productArray.results || [];
      }
      return (this.productArray.results || []).filter((product) =>
        product.name
          .toLowerCase()
          .includes(this.productSearchQuery.toLowerCase())
      );
    },
  },
  methods: {
    async getProduct() {
      this.loading = true;
      try {
        const productResponse = await getsbProducts();
        console.log(productResponse.data);
        this.productArray = productResponse.data;
        this.productNames = this.productArray.results.map(
          (product) => product.name
        );
        console.log(this.productArray);
      } catch (error) {
        console.error("PRODUCT_ERROR:", error);
        this.errorAlertVisible = true;
      } finally {
        this.loading = false;
      }
    },
    addProductToWishlist(product) {
      const selectedProduct = {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1, // Inicialmente 1, se puede ajustar según necesidad
      };
      this.selectedProducts.push(selectedProduct);
      console.log("Producto añadido:", selectedProduct);
    },
    openCreateDialog() {
      this.dialog = true;
    },
    closeCreateDialog() {
      this.dialog = false;
    },
  },
  mounted() {
    this.getProduct();
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
