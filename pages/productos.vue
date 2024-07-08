<script>
import { defineComponent } from "vue";
import { getsbProducts } from "../api/integracionApi";
import { 
  getAllWishlists, 
  updateWishlistProducts, 
  createWishlist,
  updateWishlist
} from "../api/wishlistApi";

export default defineComponent({
  data() {
    return {
      dialog: false,
      dialogWishlist: false,
      dialogCreateWishlist: false,
      loading: false,
      productArray: [],
      productNames: [],
      wishlistId: null, 
      wishlistArray: [],
      wishNames: [],
      productSearchQuery: "",
      selectedProducts: {},
      productsFor: [],
      dialogVisible: false,
      alertVisible: false,
      errorAlertVisible: false,
      loading: false,
      selectedWishlist: "", 
      wishlistNameToIdMap: {},
      post: {
        wishlist_id: null,
        wishlist_name: null, 
        budget: null,
        product: null
      }, 
      ProductDto: [],
      count: 0,
      totalPrice: 0,
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
      try {
        this.loading = true
        const response = await getsbProducts();
        console.log('INPUT: ', response);
        this.productArray = response.data;
        this.productNames = this.productArray.results.map((product) => product.name);
        console.log('OUTPUT: ', this.productArray)
        this.loading = false
      } catch (error) {
        console.error("PRODUCT_ERROR:", error);
        this.errorAlertVisible = true;
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
        quantity: 1
      }
      this.selectedProducts = productos; 
      this.productsFor = this.selectedProducts
      console.log('tu wea',this.productsFor)
      console.log('INPUT: ', product);
      this.dialogWishlist = true;
      console.log('OUTPUT: ',this.selectedWishlist,'/', this.selectedProducts); 
    },
    incrementCount() {
      console.log('COUNT');
      this.count++;
      console.log('Contador:', this.count);

      this.totalPrice += this.selectedProducts.price;
      console.log('Precio Total:', this.totalPrice);
    },
    async createWishlist() {
      const post = {
        wishlist_id: Math.random(),
        wishlist_name: this.post.wishlist_name, 
        budget: 0,
        product: this.ProductDto
      };
      try {
        this.loading = true
        const response = await createWishlist(post);
        console.log('POST')
        console.log(response);
        this.loading = false
        this.dialogCreateWishlist = false;
      } catch (error) {
        console.error("PRODUCT_ERROR:", error);
        this.errorAlertVisible = true;
      }
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
        this.loading = true;
        const respose = await updateWishlistProducts(this.selectedWishlist, this.selectedProducts)
        console.log(respose)
        this.dialogWishlist = false; 
        this.selectedProducts = {};
        console.log('AGREGADO')
        this.loading = false;
      } catch (error) {
        console.log(error)
      }

      this.updateWishlist();
      console.log('PASS')
    },
    async updateWishlist() {
      console.log('PRECIO', this.totalPrice);
      const put = {
        budget: this.totalPrice
      };
      try {
        const updateResponse = await updateWishlist(this.selectedWishlist, put);
        console.log('PUT');
        console.log(updateResponse);
      } catch (error) {
        console.log(error)
      }
    }
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
    <v-col cols="6">
      <v-btn
        variant="tonal"
        color="primary"
        prepend-icon="mdi-folder-outline"
        @click="dialogCreateWishlist = true"
      >
        Crear wishlist
      </v-btn>
    </v-col>
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

  <v-dialog v-model="dialogWishlist" max-width="500px">
      <template #default>
        <v-card>
          <v-card-title>Agregar producto a lista de deseos</v-card-title>
          <v-card-text>
            <v-list-item
                :subtitle="precio"
                :title="nombre"
              >
                <template v-slot:prepend>
                  <v-avatar color="grey-lighten-1">
                    <v-icon color="white">mdi-shopping</v-icon>
                  </v-avatar>
                </template>

                <template v-slot:append>
                  <v-col>
                    <v-row>
                      <v-btn rounded>-</v-btn>
                      <v-btn rounded @click="incrementCount">+</v-btn>
                    </v-row>
                  </v-col>
                </template>
            </v-list-item>
            <v-col>
              <v-text>
                Total: {{ totalPrice }}
              </v-text>
            </v-col>
            <v-col>
              <v-select
                :items="wishlistArray"
                label="Selecciona la wishlist"
                v-model="selectedWishlist"
                item-value="_id"
                item-title="wishlist_name"
                dense
              ></v-select>
            </v-col>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="closeCreateDialog">Cerrar</v-btn>
            <v-btn @click="saveWishlistId">Guardar</v-btn> <!-- Botón de guardar -->
          </v-card-actions>
        </v-card>
      </template>
  </v-dialog>

    <!-- Dialogo para añadir inventario -->
  <div class="pa-4 text-center">
    <v-dialog v-model="dialogCreateWishlist" max-width="600">
      <v-card prepend-icon="mdi-heart" title="Crear lista de deseos">
        <!-- Campos de texto -->
        <v-card-text>
          <v-row dense>
            <v-col cols="12" md="12" sm="6">
              <v-text-field 
                v-model="post.wishlist_name"
                label="Nombre de la lista" 
                required
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text="Cerrar" variant="plain" @click="dialogCreateWishlist = false"></v-btn>
          <v-btn color="primary" text="Crear" variant="tonal" @click="createWishlist"></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>

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
