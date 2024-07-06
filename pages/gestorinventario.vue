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
//importas el rack
import { getAllrack } from "../api/rackApi";

export default defineComponent({
  data() {
    return {
      // data table
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
      // variables
      dialog: false,
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
      objectDto: {
        inventory_id: null,
        inventory_name: "",
        rack_id: null,
      },
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
        this.rackNames = this.rackArray.map((rack) => rack.rack_name);
        this.rackIds = this.rackArray.map((rack) => rack.rack_id);
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
    async saveInventory() {
      console.log("Guardar inventario", this.objectDto);
      try {
        const createResponse = await createInventory(this.objectDto);
        this.dialog = false;
        this.getInventory();
        console.log("CREATED", createResponse);
        this.alertVisible = true;

        // Limpiar los campos del formulario
        this.objectDto = {
          inventory_id: null,
          inventory_name: "",
          rack_id: null,
        };
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
      console.log("aaaaaaaaaaaaaaaaa", this.inventoryId);
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
      console.log("ITEM", items._id);
      this.inventoryId = items._id; // Copiar los datos del inventario seleccionado
      this.dialogUpdateVisible = true;
    },
    closeUpdateDialog() {
      this.dialogUpdateVisible = false;
    },
    async updateInventory() {
      console.log("DTO", this.objectDto);
      const put = {
        inventory_id: this.objectDto.inventory_id,
        inventory_name: this.objectDto.inventory_name,
        rack_id: this.objectDto.rack_id,
      };

      try {
        const updateResponse = await updateInventory(this.inventoryId, put);
        this.dialogVisible = false;
        this.getInventory();
        console.log("UPDATED", updateResponse);
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
    openCreateDialog() {
      this.dialog = true;
    },
    closeCreateDialog() {
      this.dialog = false;
    },
  },
  mounted() {
    this.getInventory();
    this.getRack();
    console.log("aaaaaaaaaaaaa");
    this.getWishlist();
  },
});
</script>

<template>
  <h2>Inventarios Citt</h2>

  <v-row class="month-table">
    <v-col cols="3">
      <!-- aca no va mostrar el nombre, ya que le estoy pasando el objeto, necesito mostrar el nombre -->
      <v-select
        v-model="rackId"
        label="Rack Nombre"
        :items="rackNames"
        item-value="_id"
      ></v-select>
    </v-col>
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
      <v-btn variant="tonal" color="primary" @click="downloadPdf"
        >Generar archivo .csv</v-btn
      >
    </v-col>
    <v-col cols="3" class="text-right">
      <v-btn
        variant="tonal"
        color="primary"
        prepend-icon="mdi-folder-outline"
        @click="openCreateDialog"
        >Agregar Inventario</v-btn
      >
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
                label="Inventario ID"
                required
                v-model="objectDto.inventory_id"
              ></v-text-field>
            </v-col>
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
                label="ID"
                required
                v-model="objectDto.inventory_id"
              ></v-text-field>
            </v-col>
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
    border="left"
    elevation="2"
    colored-border
    icon="mdi-alert"
    timeout="5000"
  >
    Oops! Ha ocurrido un problema.
  </v-alert>
</template>
