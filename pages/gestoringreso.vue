<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import { getAllcheckIn } from "../api/checkInApi";
import img1 from "/images/profile/1.jpg";
import { useRouter } from "vue-router";

const router = useRouter();
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      alert('Debes iniciar sesión !!');
      router.push("/login"); 
    }


const checkInHeader = ['Fecha de entrada', 'Motivo'];

const checkInData = ref([]);
const checkInArray = ref([]);
const elementVisible = ref(false);
const loading = ref(false);

const Chart = {
  series: [{ name: "Ingresos", data: [] }],
};

// Función para contar ingresos por día
function countCheckInsByDay() {
  const daysCount = { Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0, Sun: 0 };

  checkInArray.value.forEach((checkin) => {
    const date = new Date(checkin.entry_date);
    const day = date.toLocaleDateString('en-US', { weekday: 'short' });

    if (daysCount[day] !== undefined) {
      daysCount[day] += 1;
    }
  });

  return Object.values(daysCount);
}

// Fetch the check-in data
const fetchCheckIn = async () => {
  try {
    loading.value = true;
    const response = await getAllcheckIn();
    checkInArray.value = response.data;

    // Actualiza la serie del gráfico
    Chart.series[0].data = countCheckInsByDay();

    loading.value = false;
  } catch (error) {
    console.error(error);
  }
};

function saveFile(blob: any, fname: any) {
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = fname + '.tsv';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function createCsv() {
  const arrayValue = checkInArray.value;
  let tsvContent = "FECHA DE ENTRADA\tNOMBRE DE USUARIO\tMOTIVO\tVECES ENTRADA\tCITT\n";

  arrayValue.forEach((checkin) => {
    let nombreUsuario = "";
    let motivo = "";
    let citt = "";

    if (checkin.entry_reason) {
      // Separar entry_reason para obtener el nombre de usuario y el motivo
      [nombreUsuario, motivo] = checkin.entry_reason.split(':').map(part => part.trim());

      // Extraer CITT si existe
      const cittMatch = checkin.entry_reason.split('-'); // Cambiar para usar entry_reason directamente
      if (cittMatch.length > 1) {
        citt = cittMatch[1].trim(); // Tomar lo que está después del "-"
        motivo = cittMatch[0].trim(); // Mantener el motivo original
      }
    } else {
      // Manejar el caso donde entry_reason es null o no existe
      motivo = "Sin motivo";
    }

    // Crear la fila con la nueva columna CITT
    let row = `${checkin.entry_date}\t${nombreUsuario}\t${motivo}\t${checkin.times_entered}\t${citt}\n`;
    tsvContent += row;
  });

  const data = new Blob([tsvContent], { type: 'text/tab-separated-values' }); // Tipo MIME

  const todayDate = "ingresos_citt_" + Date.now();
  saveFile(data, todayDate);
}


// onMounted(fetchCheckIn);

const chartOptions = computed(() => {
  return {
    grid: {
      show: true,
      borderColor: "transparent",
      padding: { left: 0, right: 0, bottom: 0 },
    },
    plotOptions: {
      bar: { horizontal: false, columnWidth: "35%", borderRadius: 4 },
    },
    colors: ["#1e88e5"],
    chart: {
      type: "bar",
      height: 250,
      toolbar: { show: false },
      foreColor: "#adb0bb",
    },
    dataLabels: { enabled: false },
    xaxis: {
      categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      labels: {
        style: { cssClass: "grey--text lighten-2--text fill-color" },
      },
    },
    yaxis: {
      title: { text: "Número de ingresos" },
      labels: {
        style: {
          cssClass: "grey--text lighten-2--text fill-color",
        },
      },
    },
    tooltip: { theme: "dark" },
  };
});

onMounted(() => {
  setTimeout(() => (elementVisible.value = true), 10);
});

fetchCheckIn();

function href() {
  return undefined;
}

</script>

<template>
  <div>
    <IngresoSemanal />

    <v-row>
      <!-- Grafico de ingreso semanal -->
      <div>
        <v-row>
          <v-col cols="8">
            <VCard class="pa-3" elevation="10">
              <v-card-text>
                <div class="d-sm-flex align-center">
                  <div>
                    <h3 class="text-h5 title mb-1">Días más concurridos</h3>
                    <h5 class="text-subtitle-1">Análisis semanal</h5>
                  </div>
                </div>
                <div v-show="elementVisible" class="mt-5">
                  <apexchart type="bar" height="320" :options="chartOptions" :series="Chart.series"></apexchart>
                </div>
              </v-card-text>
            </VCard>
          </v-col>

          <v-col cols="4">
            <v-row style="margin-bottom: 5px;">
              <v-col>
                <v-btn @click="createCsv" variant="tonal" color="primary">Descargar ingresos</v-btn>
              </v-col>
              <v-col>
                <v-spacer></v-spacer>
              </v-col>
            </v-row>

            <VCard elevation="10" class="overflow-hidden" style="width: 500px;">
              <v-card-text class="pa-0">
                <div class="bg-primary pa-5">
                  <v-row>
                    <v-col>
                      <!-- <v-date-picker></v-date-picker> -->
                    </v-col>
                  </v-row>
                  <h2 class="text-h5 mb-1">Últimos ingresos</h2>
                  <h5 class="text-subtitle-1">Ingresos diarios</h5>
                </div>
                <div class="pa-4">
                  <v-col v-if="loading" cols="12" class="text-center">
                    <v-progress-circular :size="200" :width="17" color="primary" indeterminate></v-progress-circular>
                  </v-col>
                  <v-col v-else>
                    <v-list>
                      <v-list-item v-for="(checkIn, i) in checkInArray.slice(0, 8)" :key="checkIn._id" @click="href">
                        <v-list-item-title>
                          <div class="d-flex align-center py-3">
                            <div class="mr-3">
                            </div>
                            <div class="mx-3">
                              <h4 class="text-h6 mt-n1 mb-1">{{ checkIn.entry_reason }}</h4>
                              <div class="text-muted">Fecha de entrada: {{ new
                                Date(checkIn.entry_date).toLocaleDateString() }}</div>
                              <div class="truncate-text text-subtitle-2 textSecondary">
                                id: {{ checkIn.uid_user }}
                              </div>
                            </div>
                          </div>
                        </v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-col>
                </div>
              </v-card-text>
            </VCard>

          </v-col>
        </v-row>
      </div>
    </v-row>
  </div>
</template>
