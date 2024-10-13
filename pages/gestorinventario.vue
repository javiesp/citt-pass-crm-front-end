<script>
import { defineComponent, ref } from "vue";
import {
  getAllinventory,
  deleteInventory,
  createInventory,
  updateInventory,
  getInventoryByRackId,
  getWishlist,
} from "../api/inventoryApi";
import { getAllrack } from "../api/rackApi";

export default defineComponent({
  name: "inventoryItem",
  data () {
    return {
      loading: false,
      search: '',
      itemsPerPage: 5,
      rowsPerPageItems: [
        { title: "5", value: 5 },
        { title: "10", value: 10 },
        { title: "25", value: 25 },
        { title: "50", value: 50 },
      ],
      headers: [
        { title: "ID", value: "inventory_id" },
        { title: "Nombre", value: "inventory_name" },
        { title: "Productos", value: "product_id" },
        { title: "Rack ID", value: "rack_id" },
        { title: "Acciones", value: "actions" },
      ],
      dialog: false,
      dialogRack: true,
      selectItem: null,
      inventoryArray: [],
      inventoryNames: [],
      rackIds: [],
      rackNames: [],
      rackArray: [],
      productArray: [],
      rackId: null,
      inventoryId: ref(null),
      searchQuery: "",
      dialogVisible: false,
      dialogUpdateVisible: false,
      alertVisible: false,
      errorAlertVisible: false,
      selectedItem: {},
      objectDto: {
        inventory_id: null,
        inventory_name: "",
        rack_id: null,
      },
      max: 12312312,
    };
  },
  computed: {
    filteredInventory() {
      if (!this.searchQuery) {
        return this.inventoryArray;
      }
      return this.inventoryArray.filter((inventory) =>
        inventory.inventory_name
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase())
      );
    },
  },
  async created() {
    let local_project = localStorage.getItem('rack_id_cach');

    if (!local_project || local_project.trim() === '') {
      this.dialogRack = true;
    } else {
      this.dialogRack = false;
    }

    await this.getUsers();
    await this.getProjects();
  },
  methods: {
    async getInventory() {
      this.loading = true;
      try {
        const inventoryResponse = await getAllinventory();
        this.inventoryArray = inventoryResponse.data;
        this.inventoryNames = this.productArray.results.map((inventory) => inventory_name.name);
        console.log("INVENTARIOS");
        console.log(this.inventoryNames);
      } catch (error) {
        console.error("Error al obtener Inventarios:", error);
        this.errorAlertVisible = true;
      } finally {
        this.loading = false;
      }
    },
    async getWishlist() {
      try {
        const productResponse = await getWishlist();
        this.productArray = productResponse.data;
        console.log("ACA MIRA");
        console.log(this.productArray);
      } catch (error) {
        console.error("Error al obtener PRODUCTOS:", error);
      }
    },
    async getRack() {
      try {
        const rackResponse = await getAllrack();
        this.rackArray = rackResponse.data;
      } catch (error) {
        console.error("Error al obtener Racks:", error);
      }
    },
    downloadPdf() {
      const link = document.createElement("a");
      link.href = this.pdfUrl;
      link.target = "_blank";
      link.download = this.pdfFileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    getRandomInt() {
        const rand = Math.floor(Math.random() * this.max); 
        this.objectDto.inventory_id = rand; 
        console.log('NUMERO', rand);
        return rand;
    },
    async saveInventory() {
      this.getRandomInt();
      const post = {
        inventory_id: this.objectDto.inventory_id,
        inventory_name: this.objectDto.inventory_name,
        rack_id: this.objectDto.rack_id,
      }

      console.log(post)
      try {
        const createResponse = await createInventory(post);
        this.getInventory();
        console.log("CREATED", createResponse);
        
        this.cleanInput();
        this.alertVisible = true;
        this.dialog = false;
      } catch (error) {
        console.error(
          "No se ha podido crear el inventario",
          this.objectDto.inventory_id,
          error
        );
        this.errorAlertVisible = true;
      }
    },
    openDeleteDialog(items) {
      console.log("ITEM", items._id);
      this.inventoryId = items._id; 
      this.dialogVisible = true;
    },
    closeDeleteDialog() {
      this.dialogVisible = false;
    },
    async confirmDeleteInventory() {
      try {
        const deleteResponse = await deleteInventory(this.inventoryId);
        this.dialogVisible = false;
        this.getInventory();
        console.log("DELETED", deleteResponse);
        this.alertVisible = true;
      } catch (error) {
        console.error(
          "No se ha podido eliminar el inventario",
          this.inventoryId,
          error
        );
        this.errorAlertVisible = true;
      }
    },
    openUpdateDialog(items) {
      this.objectDto = {
        inventory_name: items.inventory_name,
        rack_id: items.rack_id,
      };

      this.inventoryId = items._id; 
      this.dialogUpdateVisible = true;
    },
    closeUpdateDialog() {
      this.dialogUpdateVisible = false;
      this.cleanInput();
    },
    async updateInventory() {
      console.log("DTO", this.objectDto);
      const put = {
        inventory_name: this.objectDto.inventory_name,
        rack_id: this.objectDto.rack_id,
      };

      try {
        const updateResponse = await updateInventory(this.inventoryId, put);
        this.dialogVisible = false;
        this.getInventory();

        console.log("UPDATED", updateResponse);

        this.cleanInput();
        this.alertVisible = true;
        this.dialogUpdateVisible = false;
      } catch (error) {
        console.error(
          "No se ha podido actualizar el proyecto",
          this.inventoryId,
          error
        );
        this.errorAlertVisible = true;
      }
    },
    async selectProject() {
      console.log("SELECTED")
      localStorage.setItem("rack_id_cach", this.selectedItem);
      console.log(this.selectedItem, '<---')
      try {
        this.loading = true;
        const response = await getInventoryByRackId(this.selectedItem);
        console.log(response);
        this.inventoryArray = response.data;

        this.loading = false;
        this.dialogRack = false;
      } catch (error) {
        console.error(error);
      }
    },
    openCreateDialog() {
      this.dialog = true;
    },
    closeCreateDialog() {
      this.dialog = false;
    },
    customTitle() {
      return "Seleccione un rack";
    },
    cleanInput() {
      this.objectDto = {
        inventory_id: null,
        inventory_name: null,
        rack_id: null
      }

      console.log(this.objectDto)
    }
  },
  mounted() {
    this.getInventory();
    this.getRack();
    this.getWishlist();
  },
});
</script>

<template>
  <h2>Inventarios Citt</h2>

  <v-row class="month-table">
    <v-col cols="3">
      <v-text-field
        v-model="search"
        class="mx-auto"
        density="comfortable"
        menu-icon=""
        placeholder="Buscar inventario"
        prepend-inner-icon="mdi-magnify"
        theme="light"
        variant="solo"
        auto-select-first
        item-props
        hint="Escriba para buscar"
        rounded
      ></v-text-field>
    </v-col>
    <v-col cols="3">
      <v-btn
        variant="tonal"
        color="primary"
        prepend-icon="mdi-folder-outline"
        @click="openCreateDialog"
        >Agregar Inventario</v-btn
      >
    </v-col>
    <v-col cols="3">
      <v-spacer></v-spacer>
      <v-btn variant="tonal" color="red" prepend-icon="mdi-logout" @click="dialogRack = true" text="cambiar de rack"></v-btn>
    </v-col>
    <v-col cols="12" sm="12">
      <v-card :variant="variant" class="mx-auto">
        <v-divider />
        <v-col>
          <v-data-table
            v-model:items-per-page="itemsPerPage"
            :items-per-page-options="rowsPerPageItems"
            :headers="headers"
            :items="inventoryArray"
            :loading="loading"
            :search="search"
          >
            <template v-slot:item.actions="{ item }">
              <v-btn class="ml-2" color="primary" icon size="x-small" flat @click="openUpdateDialog(item)">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn class="ml-2" color="error" icon size="x-small" flat @click="openDeleteDialog(item)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </template>
          </v-data-table>
        </v-col>
      </v-card>
    </v-col>
  </v-row>

  <!--Modal de eliminacion-->
  <v-dialog v-model="dialogVisible" max-width="400">
    <v-card>
      <v-spacer></v-spacer>
      <v-card-title class="text-h5">Confirmar Eliminación</v-card-title>
      <v-card-text
        >¿Estás seguro de que deseas eliminar este inventario?</v-card-text
      >
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="error" text @click="closeDeleteDialog">Cancelar</v-btn>
        <v-btn color="primary" text @click="confirmDeleteInventory"
          >Eliminar</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!--Modal de Agregar-->
  <div class="pa-4 text-center">
    <v-dialog v-model="dialog" max-width="600">
      <v-card prepend-icon="mdi-folder-outline" title="Agregar Inventario">
        <v-card-text>
          <v-row dense>
            <v-col cols="12" md="4" sm="6">
              <v-text-field
                label="Nombre Inventario"
                required
                v-model="objectDto.inventory_name"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" sm="6">
              <v-combobox
                :items="rackIds"
                label="Nombre Rack"
                v-model="objectDto.rack_id"
                outlined
              ></v-combobox>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="error"
            text="Cancelar"
            variant="plain"
            @click="closeCreateDialog"
          ></v-btn>
          <v-btn
            color="primary"
            text="Guardar Inventario"
            variant="tonal"
            @click="saveInventory"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>

  <!--Modal de actualizar-->
  <div class="pa-4 text-center">
    <v-dialog v-model="dialogUpdateVisible" max-width="600">
      <v-card prepend-icon="mdi-folder-outline" title="Actualizar Inventario">
        <v-card-text>
          <v-row dense>
            <v-col cols="12" md="4" sm="6">
              <v-text-field
                label="Nombre Inventario"
                required
                v-model="objectDto.inventory_name"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" sm="6">
              <v-text-field
                hint="Rack"
                label="Rack ID"
                v-model="objectDto.rack_id"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="error" text @click="closeUpdateDialog">Cancelar</v-btn>
          <v-btn color="primary" text @click="updateInventory"
            >Actualizar</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>

  <!--Alerta-->
  <v-alert
    v-model="errorAlertVisible"
    dismissible
    color="red"
    elevation="2"
    colored-border
    icon="mdi-alert"
    timeout="5000"
  >
    Oops! Ha ocurrido un problema.
  </v-alert>

  <v-dialog v-model="dialogRack" persistent width="600">
      <v-card>
        <v-card-title>
          <span class="my-letra">Rack</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-autocomplete 
                  v-model="selectedItem"
                  label="Selecciona un proyecto..."
                  :items="rackArray" 
                  item-value="rack_id"
                  item-title="rack_name"
                  variant="underlined"
                ></v-autocomplete>
                <p class="letra-abajo">Es necesario que seleccione su grupo para poder gestionar</p>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" :rounded="true" elevation="2" variant="text" @click="selectProject">
            Login
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>