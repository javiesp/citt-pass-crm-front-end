<script>
import { defineComponent } from "vue";
import {
  getAllWishlists,
  updateWishlistProducts,
  createWishlist,
  updateWishlist
} from "../api/wishlistApi";
import {
  getAllItems
} from "../api/itemApi";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "productItem",
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
      isDisabled: true,
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
      productName: null,
      productStock: null,
      wihslistBudget: null,
      itemArray: [],
      itemNames: null,
      itemsPerPage: 9,
      currentPage: 1,
      allItems: [],
    };
  },
  computed: {
    filteredProducts() {
      if (!this.productSearchQuery) {
        return this.itemArray;
      }
      return this.allItems
        .filter((product) =>
          product.item_name.toLowerCase().includes(this.productSearchQuery.toLowerCase())
        )
        .slice(
          (this.currentPage - 1) * this.itemsPerPage,
          this.currentPage * this.itemsPerPage
        );
    },
    totalPages() {
      const filteredLength = !this.productSearchQuery
        ? this.allItems.length
        : this.allItems.filter((product) =>
            product.item_name.toLowerCase().includes(this.productSearchQuery.toLowerCase())
          ).length;
      return Math.ceil(filteredLength / this.itemsPerPage);
    }
  },
  watch: {
    productSearchQuery() {
      this.currentPage = 1;
      this.fetchItemsForPage(1);
    }
  },
  methods: {
    verifyTokenAuth(token) {
      const router = useRouter();

      if (!token) {
        router.push("/login");
      }

      const isValidJWT = typeof token === 'string' && token.split('.').length !== 3 ? router.push("/login") : true
    },
    async getItem() {
      try {
        this.loading = true;
        const response = await getAllItems();
        this.allItems = response.data;
        this.fetchItemsForPage(1);
        this.loading = false;
      } catch (error) {
        console.error("PRODUCT_ERROR:", error);
        this.errorAlertVisible = true;
        this.loading = false;
      }
    },
    fetchItemsForPage(page) {
      this.currentPage = page;
      const start = (page - 1) * this.itemsPerPage;
      const end = page * this.itemsPerPage;
      
      if (!this.productSearchQuery) {
        this.itemArray = this.allItems.slice(start, end);
      } else {
        this.itemArray = this.filteredProducts;
      }
    },
    handlePageChange(page) {
      this.fetchItemsForPage(page);
    },
    async getWishlist() {
      try {
        const response = await getAllWishlists();
        this.wishlistArray = response.data;
        this.wishlistNameToIdMap = this.wishlistArray.reduce((map, wishlist) => {
          map[wishlist.wishlist_name] = wishlist.wishlist_id;
          return map;
        }, {});
        this.wishNames = this.wishlistArray.map((wishlist) => wishlist.wishlist_name);
      } catch (error) {
        console.error("Error fetching wishlists:", error);
        this.errorAlertVisible = true;
      }
    },
    addProductToWishlist(product) {
      const productos = {
        product_id: product.id,
        product_name: product.item_name,
        price: product.item_price,
        quantity: this.count
      };
      this.selectedProducts = productos;
      this.productName = this.selectedProducts.product_name;
      this.productStock = product.stock;
      this.dialogWishlist = true;
      this.isDisabled = false;
    },
    incrementCount() {
      this.isDisabled = true;
      if (this.count < this.productStock) {
        this.count++;
        this.totalPrice += this.selectedProducts.price;
        this.selectedProducts.quantity = this.count;
      }
    },
    decrementCount() {
      if (this.count > 0) {
        this.count--;
        this.totalPrice -= this.selectedProducts.price;
      } else {
        this.isDisabled = false;
      }
    },
    async createWishlist() {
      const post = {
        wishlist_id: Math.random(),
        wishlist_name: this.post.wishlist_name,
        budget: 0,
        product: this.ProductDto
      };
      try {
        this.loading = true;
        await createWishlist(post);
        this.loading = false;
        this.dialogCreateWishlist = false;
      } catch (error) {
        console.error("item error:", error);
        this.errorAlertVisible = true;
      }
    },
    async saveWishlistId() {
      try {
        this.loading = true;
        const selectedWishlistObj = this.wishlistArray.find(wishlist => wishlist._id === this.selectedWishlist);

        if (!selectedWishlistObj) {
          throw new Error("Wishlist no encontrada");
        }

        const currentBudget = selectedWishlistObj.budget || 0;

        await updateWishlistProducts(this.selectedWishlist, this.selectedProducts);

        const finalBudget = currentBudget + this.totalPrice;

        const put = {
          budget: finalBudget
        };

        await updateWishlist(this.selectedWishlist, put);
        this.dialogWishlist = false;
        this.selectedProducts = {};
        this.loading = false;
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
      this.resetFields();
    },
    resetFields() {
      this.totalPrice = 0;
      this.count = 0;
      this.post.wishlist_name = '';
    },
    closeCreateDialog() {
      this.dialogWishlist = false;
      this.resetFields();
    }
  },
  mounted() {
    const accessToken = localStorage.getItem('accessToken');
    this.verifyTokenAuth(accessToken);
    this.getWishlist();
    this.getItem();
  },
});
</script>

<template>
  <v-col cols="3">
    <v-autocomplete 
      :items="itemArray" 
      item-value="item_name" 
      class="mx-auto" 
      density="comfortable"
      placeholder="Buscar Producto" 
      prepend-inner-icon="mdi-magnify" 
      style="max-width: 350px" 
      theme="light"
      variant="solo" 
      auto-select-first 
      v-model="productSearchQuery" 
      item-props 
      hint="Escriba para buscar"
      rounded>
    </v-autocomplete>
  </v-col>

  <v-row v-if="loading" class="month-table">
    <v-col v-for="n in 10" :key="n" cols="12" md="4">
      <v-skeleton-loader :elevation="6" type="card-avatar"></v-skeleton-loader>
    </v-col>
  </v-row>

  <v-row v-else class="month-table">
    <v-col v-for="item in filteredProducts" :key="item.id" class="item-card" cols="12" md="4">
      <v-card>
        <v-img height="200px" src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" cover></v-img>
        <v-card-title>{{ item.item_name }}</v-card-title>
        <v-card-text>
          <p>Price: {{ item.item_price }}</p>
          <v-btn icon @click="addProductToWishlist(item)">
            <v-icon>mdi-heart</v-icon>
          </v-btn>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>

  <v-pagination 
    v-model="currentPage" 
    :length="totalPages" 
    :total-visible="5" 
    class="mt-4"
    @update:model-value="handlePageChange">
  </v-pagination>

  <v-dialog v-model="dialogWishlist" max-width="500px" persistent scrollable>
    <v-card>
      <v-card-title>
        Agregar a la Wishlist
      </v-card-title>
      <v-card-subtitle>
        <p>Desea agregar el producto seleccionado a la wishlist?</p>
      </v-card-subtitle>
      <v-card-text>
        <v-select
          v-model="selectedWishlist"
          :items="wishNames"
          label="Seleccionar Wishlist"
          required
        ></v-select>
        <v-row align="center" justify="center">
          <v-btn icon @click="decrementCount">
            <v-icon>mdi-minus</v-icon>
          </v-btn>
          <span class="mx-4">{{ count }}</span>
          <v-btn icon @click="incrementCount">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-row>
        <p class="mt-4">Total: {{ totalPrice }}</p>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="closeCreateDialog" text color="green">Cerrar</v-btn>
        <v-btn @click="saveWishlistId" text color="green" :disabled="!selectedWishlist || count === 0">Guardar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.month-table {
  margin: 20px;
}
.item-card {
  margin-bottom: 20px;
}
</style>