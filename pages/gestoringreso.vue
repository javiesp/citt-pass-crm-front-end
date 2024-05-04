<script setup lang="ts">
import { onMounted,computed } from "vue";
import { ref } from "vue";
import img1 from '/images/profile/1.jpg';
import img2 from '/images/profile/2.jpg';
import img3 from '/images/profile/3.jpg';
import img4 from '/images/profile/4.jpg';
/*Chart*/
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
    colors: ['#1e88e5','#0cb9c5'],
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
  series: [
    { name: "Flexy", data: [3, 10, 30, 2, 8, 12, 4] },
  
  ],
};

const elementVisible = ref(false);
onMounted(() => {
  setTimeout(() => (elementVisible.value = true), 10);
});
const myContactsData = ref([
  {
    title: "Pavan Kumar",
    avatar: img1,
    avatarstatus: "success",
    desc: "info@wrappixel.com",
  },
  {
    title: "Sonu Nigam",
    avatar: img2,
    avatarstatus: "error",
    desc: "pamela1987@gmail.com",
  },
  {
    title: "Admin Wilson",
    avatar: img3,
    avatarstatus: "warning",
    desc: "AmigoKerido@gmail.com",
  },
  {
    title: "Pavan Kumar",
    avatar: img4,
    avatarstatus: "success",
    desc: "kat@gmail.com",
  },
]);
function href() {
  return undefined;
}

</script>


<template>
  <div>
      <IngresoSemanal />
  </div>
  <v-row>
<!-- Grafico de ingreso semanal -->
<v-col cols="8">
  <VCard class="pa-3" elevation="10">
    <v-card-text>
      <div class="d-sm-flex align-center">
        <div>
          <h3 class="text-h5 title mb-1">Días más concurridos</h3>
          <h5 class="text-subtitle-1">Analisís semanal</h5>
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
        type="bar" height="320" :options="chartOptions" :series="Chart.series"
        ></apexchart>
      </div>
    </v-card-text>
  </VCard>
</v-col>

<!-- Ultimos ingresos al citt -->

<v-col  cols="4">
  <VCard elevation="10" class="overflow-hidden">
    <v-card-text class="pa-0">
      <div class="bg-primary pa-5">
        <h2 class="text-h5 mb-1">Últimos ingresos</h2>
        <h5 class="text-subtitle-1">Ingresos diarios</h5>
      </div>

      <div class="pa-4">
        <v-list>
          <v-list-item v-for="(item, i) in myContactsData" :key="i" @click="href">
            <v-list-item-title>
              <div class="d-flex align-center py-3">
                <div class="mr-3">
                  <v-badge bordered bottom :color="item.avatarstatus" dot offset-x="0" offset-y="0">
                    <v-avatar size="40">
                      <img :src="item.avatar" :alt="item.title" width="40" />
                    </v-avatar>
                  </v-badge>
                </div>
                <div class="mx-3">
                  <h4 class="text-h6 mt-n1 mb-1">{{ item.title }}</h4>
                  <div class="truncate-text text-subtitle-2 textSecondary">{{ item.desc }}</div>
                </div>
              </div>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </div>
    </v-card-text>
  </VCard>
</v-col>
</v-row>
</template>    
                                                                                                                     