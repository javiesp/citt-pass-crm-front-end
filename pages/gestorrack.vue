<script>
import { defineComponent} from 'vue';
import { getAllrack , deleteRack , updateRack, createRack} from '../api/rackApi';

export default defineComponent({
  data() {
    return {
      dialog: false,
      rackArray: [],
      rackNames: [],
      rackId: null,
      searchQuery: '',
      totalRows: 0,
      selectedRack: null,
      dialogVisible: false,
      dialogUpdateVisible: false,
      alertVisible: false,
      errorAlertVisible: false,
      objectDto: {
        rack_id: null,
        rack_type: '',
        rack_name: '',
      },
      loading: false,
    };
  },
  computed: {
    filteredRack() {
      if (!this.searchQuery) {
        return this.rackArray;
      }
      return this.rackArray.filter(rack => 
        rack.rack_name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  },
  methods: {

    // Metodo Listar Rack
    async getRack() {
      this.loading = true;
      try {
        const rackResponse = await getAllrack();
        console.log(rackResponse.data); // Verificar los datos recibidos
        this.rackArray = rackResponse.data;
        this.rackNames = this.rackArray.map(rack => rack.rack_name);
      } catch (error) {
        console.error('Error al obtener Racks:', error);
        this.errorAlertVisible = true;
      } finally {
        this.loading = false;
      }
    },

    // Metodo Descargar PDF
    downloadPdf() {
      const link = document.createElement('a');
      link.href = this.pdfUrl;
      link.target = '_blank';
      link.download = this.pdfFileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },

    // Metodo Agregar
    openCreateDialog() {
      this.dialog = true;
    },
    closeCreateDialog() {
      this.dialog = false;
    },
    async saveRack() {
      console.log('Guardar Rack', this.objectDto);
      try {
        const createResponse = await createRack(this.objectDto);
        this.dialog = false;
        this.getRack();
        console.log("CREATED", createResponse);
        this.alertVisible = true;  

        // Limpiar los campos del formulario
        this.objectDto = {
          rack_id: null,
          rack_type: '',
          rack_name: '',
        };

      } catch (error) {
        console.error("No se ha podido crear el rack", this.objectDto.rack_id, error);
        this.errorAlertVisible = true;
      }
    },


    // Metodo Eliminar Rack
    openDeleteDialog(rackId) {
      this.rackId = rackId;
      this.dialogVisible = true;
    },
    closeDeleteDialog() {
      this.dialogVisible = false;
    },
    async confirmDeleteRack() {
      console.log('aaaaaaaaaaaaaaaaa', this.rackId)
      try {
                const deleteResponse = await deleteRack(this.rackId);
                this.dialogVisible = false
                this.getRack()
                console.log("DELETED", deleteResponse)
                this.alertVisible = true;
            } catch (error) {
                console.error("No se ha podido eliminar el rack", this.rackId, error)
                this.errorAlertVisible = true;
            }
    },

    // Metodo Actualizar Rack
    openUpdateDialog(rackId) {
      console.log('ERORRRRRRRRRR',this.rackId)
      this.rackId = rackId; // Copiar los datos del inventario seleccionado
      this.dialogUpdateVisible = true;
      
    },
    closeUpdateDialog() {
      this.dialogUpdateVisible = false;
    },
    async updateRack() {
            console.log('ERORRRRRRRRRR',this.objectDto)
            const put = {
              rack_id: this.objectDto.rack_id,
              rack_type: this.objectDto.rack_type,
              rack_name: this.objectDto.rack_name,
            }

            try {
                const updateResponse = await updateRack(this.rackId, put);
                this.dialogVisible = false
                this.getRack()
                console.log("UPDATED",updateResponse)
                this.alertVisible = true; 
                this.dialogUpdateVisible = false;
            } catch (error) {
                console.error("No se ha podido actualizar el rack", this.rackId, error)
                this.errorAlertVisible = true;
            }
    },

  },
  mounted() {
    this.getRack();
  },
  watch: {
    // Watch route changes and reload data if necessary
    $route(to, from) {
      if (to.name === 'GestorRack') {
        this.getRack();
      }
    }
  },
  onBeforeUnmount() {
    // Clear data or do some cleanup if necessary
    this.rackArray = [];
    this.rackNames = [];
    this.searchQuery = '';
  }
});
</script>

<template>
  <h2>Gestor Rack</h2>
  <v-row class="month-table" v-if="!loading">
    <v-col cols="3">
      <v-autocomplete
        :items="rackNames"
        item-value="rackArray.rack_name"
        class="mx-auto"
        density="comfortable"
        menu-icon=""
        placeholder="Buscar Rack"
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
    <v-col cols="6" class="text-right">
      <v-btn variant="tonal" color="primary" prepend-icon="mdi-folder-outline" @click="openCreateDialog">Agregar Inventario</v-btn>
    </v-col>
    <v-col cols="12" sm="12">
      <v-table>
        <thead>
          <tr>
            <th class="text-left">ID Rack</th>
            <th class="text-left">Tipo</th>
            <th class="text-left">Nombre</th>
            <th class="text-left">Accion</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="rack in filteredRack" :key="rack.rack_name">
            <td>{{ rack.rack_id }}</td>
            <td>{{ rack.rack_type }}</td>
            <td>{{ rack.rack_name }}</td>
            <td>
              <v-col>
                <v-btn class="ml-2" color="primary" icon size="x-small" flat @click="openUpdateDialog(rack._id)">
                  <v-icon>mdi-pencil</v-icon> 
                </v-btn>
                <v-btn class="ml-2" color="error" icon size="x-small" flat @click="openDeleteDialog(rack._id)">
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
      <v-card-text>¿Estás seguro de que deseas eliminar este rack?</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="error" text @click="closeDeleteDialog">Cancelar</v-btn>
        <v-btn color="primary" text @click="confirmDeleteRack">Eliminar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>


    <!--Modal de Agregar-->
    <div class="pa-4 text-center">
    <v-dialog v-model="dialog" max-width="600">
      <v-card prepend-icon="mdi-folder-outline" title="Agregar Rack">
        <v-card-text>
          <v-row dense>
            <v-col cols="12" md="4" sm="6">
              <v-text-field label="Rack Id" required v-model="objectDto.rack_id"></v-text-field>
            </v-col>
            <v-col cols="12" md="4" sm="6">
              <v-text-field label="Tipo Rack" required v-model="objectDto.rack_type"></v-text-field>
            </v-col>
            <v-col cols="12" md="4" sm="6">
              <v-text-field hint="Rack" label="Nombre Rack" v-model="objectDto.rack_name"></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text="Cancelar" variant="plain" @click="closeCreateDialog"></v-btn>
          <v-btn color="primary" text="Guardar Inventario" variant="tonal" @click="saveRack"></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>


    <!--Modal de actualizar-->
    <div class="pa-4 text-center">
    <v-dialog v-model="dialogUpdateVisible" max-width="600">
      <v-card prepend-icon="mdi-folder-outline" title="Actualizar Rack">
        <v-card-text>
          <v-row dense>
            <v-col cols="12" md="4" sm="6">
              <v-text-field label="ID Rack" required v-model="objectDto.rack_id"></v-text-field>
            </v-col>
            <v-col cols="12" md="4" sm="6">
              <v-text-field label="Tipo Rack" required v-model="objectDto.rack_type"></v-text-field>
            </v-col>
            <v-col cols="12" md="4" sm="6">
              <v-text-field hint="Rack" label="Nombre Rack" v-model="objectDto.rack_name"></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="error" text @click="closeUpdateDialog">Cancelar</v-btn>
          <v-btn color="primary" text @click="updateRack">Actualizar</v-btn>
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
