<script>
import { defineComponent } from "vue";
import {
  getAllWishlists,
  updateWishlistProducts,
  createWishlist,
  updateWishlist
} from "../api/wishlistApi";
import {
  getProductByItem,
  createProduct,
  deleteProduct
} from '../api/productosApi';
import {
  getAllItems,
  createItem,
  deleteItem
} from "../api/itemApi";
import {
  getAllinventory
} from "../api/inventoryApi"
import { useRouter } from "vue-router";
import shortid from 'shortid';

export default defineComponent({
  name: "productItem",
  data() {
    return {
      dialog: false,
      dialogWishlist: false,
      dialogCreateWishlist: false,
      dialogCreateItem: false,
      productDialog: false,
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
      product: [],
      product_price: 0,
      product_stock: 0,
      productPost: {
        product_price: null,
        product_stock: null,
        item_id: null
      },
      itemPosts: {
        item_id: null,
        item_name: null,
        item_price: null,
        category: null,
        inventory_id: null
      },
      inventory_array: [],
      selectItem: null,
      item_id: null,
      product_id: null
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
    },
    'itemPosts.inventory_id': function (newVal) {
      console.log('Nuevo valor de inventory_id:', newVal); // Esto te muestra el ID seleccionado
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
    async getInventory() {
      try {
        const response = await getAllinventory();

        this.inventory_array = response.data;

      } catch (error) {
        console.error('Error fetching inventory:', error);
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
    async getProductByid(item_id) {
      this.productDialog = true;
      try {
        const response = await getProductByItem(item_id);
        this.product = response.data;
        this.product_price = this.product.product_price;
        this.product_stock = this.product.product_stock;
      } catch (error) {
        console.log(error)
      }
    },
    reset() {
      this.product = []
      this.product_price = 0
      this.product_stock = 0
      this.productDialog = false;
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
    async createItem() {
      this.itemPosts.item_id = Math.floor(Math.random() * (123123123123 - 1 + 1)) + 1

      const post = {
        item_id: this.itemPosts.item_id,
        item_name: this.itemPosts.item_name,
        item_price: this.itemPosts.item_price,
        category: this.itemPosts.category,
        inventory_id: this.itemPosts.inventory_id
      } 

      try {
        const response = await createItem(post);

        if (response) {
          this.getItem();
          this.createProduct();
          this.loading = false;
          this.resetPost();
        }
      } catch (error) {
        console.log(error);
      }
    },
    async createProduct() {
      const post = {
        product_id: Math.floor(Math.random() * (123123123123 - 1 + 1)) + 1,
        product_price: this.itemPosts.item_price,
        product_stock: this.productPost.product_stock,
        item_id: this.itemPosts.item_id
      }

      try {
        const response = await createProduct(post)
      } catch (error) {
        console.log(error);
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
    resetPost() {
      this.dialogCreateItem = false;

      this.product_price = 0;
      this.product_stock = 0;

      this.productPost = {
        product_price: null,
        product_stock: null,
        item_id: null
      },
        this.itemPosts = {
          item_name: null,
          item_price: null,
          category: null,
          inventory_id: null
        }
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
    this.getInventory();
    console.log('INVENTARIO', this.inventory_array)
  },
});
</script>

<template>
  <v-row>
    <v-col cols="2">
      <v-autocomplete :items="itemArray" item-text="item_name" class="mx-auto" density="comfortable"
        placeholder="Buscar Producto" prepend-inner-icon="mdi-magnify" style="max-width: 350px" theme="light"
        variant="solo" v-model="productSearchQuery" hint="Escriba para buscar" @change="selectItem" rounded>
      </v-autocomplete>
    </v-col>

    <v-col cols="2">
      <v-btn variant="tonal" color="primary" prepend-icon="mdi-folder-outline" @click="dialogCreateItem = true">
        Agregar Item
      </v-btn>
    </v-col>
  </v-row>


  <v-row v-if="loading" class="month-table">
    <v-col v-for="n in 10" :key="n" cols="12" md="4">
      <v-skeleton-loader :elevation="6" type="card-avatar"></v-skeleton-loader>
    </v-col>
  </v-row>

  <v-row v-else class="month-table">
    <v-col v-for="item in filteredProducts" :key="item.id" class="item-card" cols="12" md="4">
      <v-card>
        <v-card-title>{{ item.item_name }}</v-card-title>
        <v-card-text>
          <p>Price: {{ item.item_price }}</p>
          <v-btn icon @click="addProductToWishlist(item)">
            <v-icon>mdi-view-grid-plus</v-icon>
          </v-btn>
          <v-btn icon @click="addProductToWishlist(item)">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn icon @click="addProductToWishlist(item)">
            <v-icon>mdi-trash-can</v-icon>
          </v-btn>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="getProductByid(item.item_id)">
            Ver stock
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>

  <v-pagination v-model="currentPage" :length="totalPages" :total-visible="5" class="mt-4"
    @update:model-value="handlePageChange">
  </v-pagination>

  <v-dialog v-model="productDialog" max-width="500px" scrollable>
    <v-card class="elevation-10">
      <v-card-title class="headline text-center">
        Información del Producto
      </v-card-title>
      <v-card-text>
        <v-list two-line>
          <v-list-item>
            <v-list-item-title class="font-weight-bold">Stock</v-list-item-title>
            <v-list-item-subtitle>{{ product_stock }}</v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-list-item-title class="font-weight-bold">Precio</v-list-item-title>
            <v-list-item-subtitle>{{ product_price }}</v-list-item-subtitle>
          </v-list-item>
        </v-list>
        <v-btn @click="reset()">Actualizar producto</v-btn>
      </v-card-text>
      <v-card-actions class="d-flex justify-center">
        <v-btn @click="reset()">Cerrar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-dialog v-model="dialogCreateItem" max-width="600px" persistent>
    <v-card>
      <v-card-text>
        Crear Item
        <v-form v-model="valid">
          <v-container>
            <v-row>
              <v-col cols="12" md="4">
                <v-text-field v-model="itemPosts.item_name" label="Nombre Item" variant="underlined"
                  required></v-text-field>
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field v-model="itemPosts.item_price" label="Precio" type="number" variant="underlined"
                  required></v-text-field>
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field v-model="itemPosts.category" label="Categoria" variant="underlined"
                  required></v-text-field>
              </v-col>

              <v-col cols="12" md="4">
                <v-autocomplete v-model="itemPosts.inventory_id" label="Inventario" variant="underlined" required
                  :items="inventory_array" item-value="inventory_id" item-title="inventory_name" @change="selectItem" />
              </v-col>

              <v-divider></v-divider>

              <v-col cols="12" md="4">
                <v-text-field v-model="productPost.product_stock" label="Stock" type="number" min="0"
                  variant="underlined" required></v-text-field>
              </v-col>

            </v-row>
          </v-container>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="resetPost()">Cerrar</v-btn>
        <v-btn @click="createItem()">Guardar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>


  <v-dialog v-model="dialogWishlist" max-width="500px" persistent scrollable>
    <v-card>
      <v-card-title>
        Agregar a la Wishlist
      </v-card-title>
      <v-card-subtitle>
        <p>Desea agregar el producto seleccionado a la wishlist?</p>
      </v-card-subtitle>
      <v-card-text>
        <v-select v-model="selectedWishlist" :items="wishNames" label="Seleccionar Wishlist" required></v-select>
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