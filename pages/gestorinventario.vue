<script>
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      dialog: false,
      usersArray: [], // Asumiendo que no necesitas datos de usuarios para este ejemplo
      inventoryArray: [
        {
          invenId: 1,
          nombreInventario: 'Inventario Alpha',
          descripcionInventario: 'Descripción Alpha',
          stockInventario: 5,
          idTeam: 1
        },
        {
          invenId: 2,
          nombreInventario: 'Inventario Beta',
          descripcionInventario: 'Descripción Beta',
          stockInventario: 15,
          idTeam: 2
        },
        {
          invenId: 3,
          nombreInventario: 'Inventario Gamma',
          descripcionInventario: 'Descripción Gamma',
          stockInventario: 0,
          idTeam: 3
        }
      ],
      inventoryNames: ["Inventario Alpha", "Inventario Beta", "Inventario Gamma"],
      inventoryId: 0,
      totalRows: 3,
      selectedInventory: null,
      pdfUrl: "",
      pdfFileName: ""
    };
  },
  methods: {
    selectInventoryId() {
      const selectedInventory = this.inventoryArray.find(inventory => inventory.nombreInventario === this.selectedInventory);
      if (selectedInventory) {
        this.inventoryId = selectedInventory.invenId;
      } else {
        console.error("No se encontró el inventoryId para el inventario seleccionado");
      }
    },
    downloadPdf() {
      const link = document.createElement('a');
      link.href = this.pdfUrl;
      link.target = '_blank';
      link.download = this.pdfFileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  },
});
</script>


<template>
  <h2>Inventarios Citt</h2>
  <BR></BR>
  <v-row class="month-table">
    <v-col cols="3">
      <v-combobox v-model="selectedInventoryName" :items="inventoryNames" label="Inventario" outlined
        @change="selectInventoryId"></v-combobox>
    </v-col>
    <v-col cols="3">
      <v-btn variant="tonal" color="primary" @click="downloadPdf">Generar archivo .csv</v-btn>
    </v-col>
    <v-col cols="6" class="text-right">
      <v-btn variant="tonal" color="primary" prepend-icon="mdi-folder-outline" @click="dialog = true">Agregar
        Inventario</v-btn>
    </v-col>
    <v-col cols="12" sm="12">
      <v-table>
        <thead>
          <tr>
            <th class="text-left">ID</th>
            <th class="text-left">Item</th>
            <th class="text-left">Rack</th>
            <th class="text-left">Stock</th>
            <th class="text-left">ID Producto</th>
            <th class="text-left">Acción</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="inventory in inventoryArray" :key="inventory.invenId">
            <td>{{ inventory.invenId }}</td>
            <td>{{ inventory.nombreInventario }}</td>
            <td>{{ inventory.descripcionInventario }}</td>
            <td>{{ inventory.stockInventario }}</td>
            <td>{{ inventory.idTeam }}</td>
            <td>
              <v-col>
                <!-- Botones -->
                <v-btn class="ml-2" color="primary" icon size="x-small" flat>
                  <v-icon>mdi-pencil</v-icon> <!-- Icono de editar usando Vuetify -->
                </v-btn>
                <v-btn class="ml-2" color="error" icon size="x-small" flat>
                  <v-icon>mdi-delete</v-icon> <!-- Icono de eliminar usando Vuetify -->
                </v-btn>
                <v-btn class="ml-2" color="warning" icon size="x-small" flat>
                  <v-icon>mdi-refresh</v-icon> <!-- Icono de refrescar usando Vuetify -->
                </v-btn>
              </v-col>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-col>
  </v-row>
  <!-- Dialogo para añadir inventario -->
  <div class="pa-4 text-center">
    <v-dialog v-model="dialog" max-width="600">
      <v-card prepend-icon="mdi-folder-outline" title="Agregar Inventario">
        <!-- Campos de texto -->
        <v-card-text>
          <v-row dense>
            <v-col cols="12" md="4" sm="6">
              <v-text-field label="Item" required></v-text-field>
            </v-col>
            <v-col cols="12" md="4" sm="6">
              <v-text-field hint="Rack" label="Rack"></v-text-field>
            </v-col>
            <v-col cols="12" md="4" sm="6">
              <v-text-field hint="Stock" label="Stock"></v-text-field>
            </v-col>
            <v-col cols="12" md="4" sm="6">
              <v-text-field hint="ID Producto" label="ID Producto"></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text="Close" variant="plain" @click="dialog = false"></v-btn>
          <v-btn color="primary" text="Save" variant="tonal" @click="dialog = false"></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
