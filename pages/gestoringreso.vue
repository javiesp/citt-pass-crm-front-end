<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import { getAllcheckIn } from "../api/checkInApi";
import img1 from "/images/profile/1.jpg";

const checkInHeader = ['Fecha de entrada', 'Motivo'];

const checkInData = ref([]);
const checkInArray = ref([]);
const elementVisible = ref(false);
const loading = ref(false);
// Fetch the check-in data
const fetchCheckIn = async () => {
  try {
    loading.value = true;
    const response = await getAllcheckIn();
    checkInArray.value = response.data;
    console.log("CHECK IN");
    console.log(checkInArray.value);
    loading.value = false;
  } catch (error) {
    console.error(error);
  }
};

function saveFile(blob: any, fname: any) {
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = fname + '.csv';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function createCsv() {
  const arrayValue = checkInArray.value;
  let cvsContent = "id,uid_user,entry_date,entry_reason,times_entered";

  checkInArray.value.forEach((checkin) => {
    let row = checkin._id + "," + checkin.uid_user + ","  + checkin.entry_date + ","  + checkin.entry_reason + ","  + checkin.times_entered + "\n"  
    cvsContent += row
  });

  var data = new Blob([cvsContent], {type: 'text/csv'});

  const todayDate = "ingresos_citt_" + Date.now();   
  saveFile(data, todayDate)
}

onMounted(fetchCheckIn);

const chartOptions = computed(() => {
  return {
    grid: {
      show: false,
      borderColor: "transparent",
      padding: { left: 0, right: 0, bottom: 0 },
    },
    plotOptions: {
      bar: { horizontal: false, columnWidth: "35%", borderRadius: 0 },
    },
    colors: ["#1e88e5", "#0cb9c5"],
    fill: { type: "solid", opacity: 1 },
    chart: {
      type: "bar",
      height: 250,
      offsetX: -15,
      toolbar: { show: false },
      foreColor: "#adb0bb",
      fontFamily: `inherit`,
      sparkline: { enabled: false },
    },
    dataLabels: { enabled: false },
    markers: { size: 0 },
    legend: { show: false },
    xaxis: {
      type: "category",
      categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      labels: {
        style: { cssClass: "grey--text lighten-2--text fill-color" },
      },
    },
    yaxis: {
      show: true,
      min: 1,
      max: 40,
      tickAmount: 3,
      labels: {
        style: {
          cssClass: "grey--text lighten-2--text fill-color",
        },
      },
    },
    stroke: {
      show: true,
      width: 5,
      lineCap: "butt",
      colors: ["transparent"],
    },
    tooltip: { theme: "dark" },
  };
});

const Chart = {
  series: [{ name: "Flexy", data: [3, 10, 30, 2, 8, 12, 4] }],
};

onMounted(() => {
  setTimeout(() => (elementVisible.value = true), 10);
});

function href() {
  return undefined; 
}

</script>

<template>
  <div>
    <IngresoSemanal />

    <v-row>
      <!-- Grafico de ingreso semanal -->
      <v-col cols="8">
        <VCard class="pa-3" elevation="10">
          <v-card-text>
            <div class="d-sm-flex align-center">
              <div>
                <h3 class="text-h5 title mb-1">Días más concurridos</h3>
                <h5 class="text-subtitle-1">Análisis semanal</h5>
              </div>
              <div class="ml-auto">
                <div class="d-flex align-center">
                  <div class="d-flex align-center px-2">
                    <span class="text-primary">
                      <span class="text-overline">
                        <i class="mdi mdi-brightness-1 mx-1"></i>
                      </span>
                      <span class="font-weight-regular">Alumnos</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div v-show="elementVisible" class="mt-5">
              <apexchart
                type="bar"
                height="320"
                :options="chartOptions"
                :series="Chart.series"
              ></apexchart>
            </div>
          </v-card-text>
        </VCard>
      </v-col>

      <!-- Ultimos ingresos al citt -->
      <v-col cols="4">
        <v-btn @click="createCsv"  variant="tonal" color="primary">Descargar ingresos</v-btn>
        <VCard elevation="10" class="overflow-hidden">
          <v-card-text class="pa-0">
            <div class="bg-primary pa-5">
              <v-row>
                <v-col>
                  <v-date-picker></v-date-picker>
                </v-col>
              </v-row>
              <h2 class="text-h5 mb-1">Últimos ingresos</h2>
              <h5 class="text-subtitle-1">Ingresos diarios</h5>
            </div>
            <div class="pa-4">
              <v-col v-if="loading" cols="12" class="text-center">
                <v-progress-circular
                  :size="200"
                  :width="17"
                  color="primary"
                  indeterminate
                ></v-progress-circular>
              </v-col>
              <v-col v-else>
                <v-list>
                  <v-list-item
                    v-for="(checkIn, i) in checkInArray.slice(0, 8)" 
                    :key="checkIn._id"
                    @click="href"
                  >
                    <v-list-item-title>
                      <div class="d-flex align-center py-3">
                        <div class="mr-3">
                        </div>
                        <div class="mx-3">
                          <h4 class="text-h6 mt-n1 mb-1">{{ checkIn.uid_user }}</h4>
                          <div class="truncate-text text-subtitle-2 textSecondary">
                            Motivo: {{ checkIn.entry_reason }}
                          </div>
                          <div class="text-muted">Fecha de entrada: {{ new Date(checkIn.entry_date).toLocaleDateString() }}</div>
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
</template>
