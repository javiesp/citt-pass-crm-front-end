<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'ProductCard',
    data() {
        return {
            dialog: false,
            usersArray: [], // Asumiendo que no necesitas datos de usuarios para este ejemplo
            inventoryArray: [
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
    <h2>Wish-List Productos</h2>
    <BR></BR>
    <v-row class="month-table">
        <v-col cols="3">
            <v-combobox v-model="selectedInventoryName" :items="inventoryNames" label="Proyecto" outlined
                @change="selectInventoryId"></v-combobox>
        </v-col>
        <v-col cols="3">
            <v-btn variant="tonal" color="primary" @click="downloadPdf">Generar archivo .csv</v-btn>
        </v-col>
        <v-col cols="6" class="text-right">
            <v-btn variant="tonal" color="primary" prepend-icon="mdi-folder-outline" @click="dialog = true">Agregar
                Wish-List</v-btn>
        </v-col> 
    </v-row>
    <!-- Productos -->
    <v-card class="mb-3" max-width="540">
    <v-row no-gutters>
      <v-col cols="4">
        <v-img height="150px"  src="https://store.arduino.cc/cdn/shop/products/ABX00021_01.iso_f3744158-2e27-4f58-8e3d-15862a685540_934x700.jpg?v=1615971615" cover></v-img>
      </v-col>
      <v-col cols="7" style="padding: 10px;">
        <v-card-body>
          <h3 class="card-title">Arduino NFC Reader</h3>
          <br>
        <h5>Precio : $20.000</h5>
        <br>
        <h5>Cantidad : 5</h5>
        </v-card-body>
      </v-col>
    </v-row>
  </v-card>
  
     <!-- Productos -->
     <v-card class="mb-3" max-width="540">
    <v-row no-gutters>
      <v-col cols="4">
        <v-img height="150px"   src="https://altronics.cl/image/cache/catalog/productos/electronica/accesorios/tag_rfid_1356mhz/rfid-nfc-tag-1356-mhz-1-500x500.jpg" cover></v-img>
      </v-col>
      <v-col cols="7" style="padding: 10px;">
        <v-card-body>
          <h3 class="card-title">Llavero RFID NFC</h3>
          <br>
        <h5>Precio : $10.000</h5>
        <br>
        <h5>Cantidad : 30</h5>
        </v-card-body>
      </v-col>
    </v-row>
  </v-card>
       <!-- Productos -->
       <v-card class="mb-3" max-width="540">
    <v-row no-gutters>
      <v-col cols="4">
        <v-img height="150px"   src="https://maxelectronica.cl/4060-thickbox_default/transistor-npn-to-220-modelo-tip31c.jpg" cover></v-img>
      </v-col>
      <v-col cols="7" style="padding: 10px;">
        <v-card-body>
          <h3 class="card-title">Transistor NPN TO-220</h3>
          <br>
        <h5>Precio : $690</h5>
        <br>
        <h5>Cantidad : 8</h5>
        </v-card-body>
      </v-col>
    </v-row>
  </v-card>
    <!-- Dialogo para añadir inventario -->
    <div class="pa-4 text-center">
        <v-dialog v-model="dialog" max-width="600">
            <v-card prepend-icon="mdi-folder-outline" title="Agregar Wish-List">
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
                            <v-text-field hint="ID" label="ID"></v-text-field>
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
