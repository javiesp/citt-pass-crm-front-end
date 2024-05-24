<script>
import { defineComponent, ref } from 'vue';
import { 
  getAllinventory, 
  deleteInventory, 
  createInventory, 
  updateInventory,
  getInventoryByRackId 
} from '../api/inventoryApi';
//importas el rack 
import { getAllrack } from '../api/rackApi'

export default defineComponent({
  data() {
    return {
      dialog: false,
      inventoryArray: [],
      inventoryNames: [],
      rackIds:[],   
      rackNames: [],
      rackArray: [],
      rackId: null, // aca hay que guardar el rack id seleccionado
      inventoryId: ref(null),
      searchQuery: '',
      dialogVisible: false,
      dialogUpdateVisible: false,
      alertVisible: false,
      errorAlertVisible: false,
      objectDto: {
        inventory_id: null,
        inventory_name: '',
        rack_id: null,
      }
    };
  },
  computed: {
    filteredInventory() {
      if (!this.searchQuery) {
        return this.inventoryArray;
      }
      return this.inventoryArray.filter(inventory => 
        inventory.inventory_name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  },
  methods: {
    async getInventory() {
      this.loading = true;
      try {
        const inventoryResponse = await getAllinventory();
        this.inventoryArray = inventoryResponse.data;
        this.inventoryNames = this.inventoryArray.map(inventory => inventory.inventory_name);
      } catch (error) {
        console.error('Error al obtener Inventarios:', error);
        this.errorAlertVisible = true;
      } finally {
        this.loading = false;
      }
    },
    async getRack(){
      try {
        const rackResponse = await getAllrack();
        this.rackArray = rackResponse.data;
        this.rackNames = this.rackArray.map(rack => rack.rack_name);
        this.rackIds = this.rackArray.map(rack => rack.rack_id);
      } catch (error) {
        console.error('Error al obtener Racks:', error);
      }
    },
    // una vez que obtinee el rack id, llamas la funcion que correcponde
    async getInventoryByRackId() {
      //aca creas la logica de la funcion
      // aca seteas response = awati getInventoryByRackId(ACA LA ID DEL RACK QUE CONSIGUES DEL SELECTOR)
      // la idea es que luego cuando logres qeu la funcion te retorne la data asignes
      // this.inventoryArray = response
      // deja ahcer commit
    },
    downloadPdf() {
      const link = document.createElement('a');
      link.href = this.pdfUrl;
      link.target = '_blank';
      link.download = this.pdfFileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    async saveInventory() {
      console.log('Guardar inventario', this.objectDto);
      try {
        const createResponse = await createInventory(this.objectDto);
        this.dialog = false;
        this.getInventory();
        console.log("CREATED", createResponse);
        this.alertVisible = true;  

        // Limpiar los campos del formulario
        this.objectDto = {
          inventory_id: null,
          inventory_name: '',
          rack_id: null
        };

      } catch (error) {
        console.error("No se ha podido crear el inventario", this.objectDto.inventory_id, error);
        this.errorAlertVisible = true;
      }
    },
    openDeleteDialog(inventoryId) {
      this.inventoryId = inventoryId;
      this.dialogVisible = true;
    },
    closeDeleteDialog() {
      this.dialogVisible = false;
    },
    async confirmDeleteInventory() {
      console.log('aaaaaaaaaaaaaaaaa', this.inventoryId)
      try {
                const deleteResponse = await deleteInventory(this.inventoryId);
                this.dialogVisible = false
                this.getInventory()
                console.log("DELETED", deleteResponse)
                this.alertVisible = true;
            } catch (error) {
                console.error("No se ha podido eliminar el inventario", this.inventoryId, error)
                this.errorAlertVisible = true;
            }
    },
    openUpdateDialog(inventoryId) {
      console.log('ERORRRRRRRRRR',this.inventoryId)
      this.inventoryId = inventoryId; // Copiar los datos del inventario seleccionado
      this.dialogUpdateVisible = true;
      
    },
    closeUpdateDialog() {
      this.dialogUpdateVisible = false;
    },
    async updateInventory() {
            console.log('ERORRRRRRRRRR',this.objectDto)
            const put = {
              inventory_id: this.objectDto.inventory_id,
              inventory_name: this.objectDto.inventory_name,
              rack_id: this.objectDto.rack_id,
            }

            try {
                const updateResponse = await updateInventory(this.inventoryId, put);
                this.dialogVisible = false
                this.getInventory()
                console.log("UPDATED",updateResponse)
                this.alertVisible = true; 
                this.dialogUpdateVisible = false;
            } catch (error) {
                console.error("No se ha podido actualizar el proyecto", this.inventoryId, error)
                this.errorAlertVisible = true;
            }
    },
    openCreateDialog() {
      this.dialog = true;
    },
    closeCreateDialog() {
      this.dialog = false;
    }
  },
  mounted() {
    this.getInventory();
    this.getRack();
  }
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
      ></v-select>
        </v-col>
    <v-col cols="3">
      <v-autocomplete
        :items="inventoryNames"
        item-value="inventoryArray.inventory_id"
        class="mx-auto"
        density="comfortable"
        menu-icon=""
        placeholder="Buscar Inventario"
        prepend-inner-icon="mdi-magnify"
        style="max-width: 350px;"
        theme="light"
        variant="solo"
        auto-select-first
        v-model="searchQuery"
        item-props
        hint="Escriba para buscar"
        rounded
      ></v-autocomplete>
    </v-col>
    <v-col cols="3">
      <v-btn variant="tonal" color="primary" @click="downloadPdf">Generar archivo .csv</v-btn>
    </v-col>
    <v-col cols="3" class="text-right">
      <v-btn variant="tonal" color="primary" prepend-icon="mdi-folder-outline" @click="openCreateDialog">Agregar Inventario</v-btn>
    </v-col>
    <v-col cols="12" sm="12">
      <v-table>
        <thead>
          <tr>
            <th class="text-left">ID</th>
            <th class="text-left">Nombre Inventario</th>
            <th class="text-left">Rack ID</th>
            <th class="text-left">Acción</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="inventory in filteredInventory" :key="inventory.inventory_id">
            <td>{{ inventory.inventory_id }}</td>
            <td>{{ inventory.inventory_name }}</td>
            <td>{{ inventory.rack_id }}</td>
            <td>
              <v-col>
                <v-btn class="ml-2" color="primary" icon size="x-small" flat @click="openUpdateDialog(inventory._id)">
                  <v-icon>mdi-pencil</v-icon> 
                </v-btn>
                <v-btn class="ml-2" color="error" icon size="x-small" flat @click="openDeleteDialog(inventory._id)">
                  <v-icon>mdi-delete</v-icon> 
                </v-btn>
              </v-col>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-col>
  </v-row>

  <!--Modal de eliminacion-->
  <v-dialog v-model="dialogVisible" max-width="400">
    <v-card>
      <v-spacer></v-spacer>
      <v-card-title class="text-h5">Confirmar Eliminación</v-card-title>
      <v-card-text>¿Estás seguro de que deseas eliminar este inventario?</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="error" text @click="closeDeleteDialog">Cancelar</v-btn>
        <v-btn color="primary" text @click="confirmDeleteInventory">Eliminar</v-btn>
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
              <v-text-field label="Inventario ID" required v-model="objectDto.inventory_id"></v-text-field>
            </v-col>
            <v-col cols="12" md="4" sm="6">
              <v-text-field label="Nombre Inventario" required v-model="objectDto.inventory_name"></v-text-field>
            </v-col>
            <v-col cols="12" md="4" sm="6">
              <v-combobox :items="rackIds" label="Nombre Rack" v-model="objectDto.rack_id" outlined
              ></v-combobox>
        </v-col>
          </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions> 
          <v-spacer></v-spacer>
          <v-btn color="error" text="Cancelar" variant="plain" @click="closeCreateDialog"></v-btn>
          <v-btn color="primary" text="Guardar Inventario" variant="tonal" @click="saveInventory"></v-btn>
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
              <v-text-field label="ID" required v-model="objectDto.inventory_id"></v-text-field>
            </v-col>
            <v-col cols="12" md="4" sm="6">
              <v-text-field label="Nombre Inventario" required v-model="objectDto.inventory_name"></v-text-field>
            </v-col>
            <v-col cols="12" md="4" sm="6">
              <v-text-field hint="Rack" label="Rack ID" v-model="objectDto.rack_id"></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="error" text @click="closeUpdateDialog">Cancelar</v-btn>
          <v-btn color="primary" text @click="updateInventory">Actualizar</v-btn>
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
