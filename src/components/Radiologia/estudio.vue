<template>
  <div class="container-fluid">
    <br />
    <b-row>
      <b-col>
        <h1 class="text-2xl font-bold text-center text-gray-800 mb-6">
      Estudios
    </h1>
        <div class="grid grid-cols-1">
          <div class="md:col-span-3">
            <!-- buscador de la tabla   -->
            <nav class="flex items-center justify-between bg-white p-4 shadow-md">
              <div class="flex items-center">
                <div class="">
                  <form action="#" class="flex items-center w-full">
                    <input type="text"
                      class="border border-gray-300 rounded-full pl-4 pr-12 py-2 bg-gray-50 focus:outline-none focus:border-blue-500 w-full placeholder-gray-500"
                      title="searchField" placeholder="Buscar" v-model="searchInput" />
                    <button class="absolute right-0 mr-3 text-gray-500 hover:text-gray-700">
                      <i class="ri-search-line"></i>
                    </button>
                  </form>
                </div>
              </div>

              <!-- Notificación -->
              <div v-if="notification.show"
                :class="`flex items-center px-4 py-3 ${notification.type === 'éxito' ? 'bg-red-500' : 'bg-green-500'} text-white text-sm font-bold border rounded-md`"
                role="alert">
                <!-- Debug: Mostrar el tipo de notificación -->
                <p>{{ notification.type }}</p>
                <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path v-if="notification.type === 'éxito'"
                    d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z" />
                  <path v-if="notification.type === 'error'"
                    d="M10 2C5.029 2 1 6.029 1 11s4.029 9 9 9 9-4.029 9-9S14.971 2 10 2zm0 16a7 7 0 1 1 0-14 7 7 0 0 1 0 14zm-.707-7.707a1 1 0 0 0 0-1.414L8.586 8.586a1 1 0 1 0-1.414 1.414L8.293 11l-1.707 1.707a1 1 0 0 0 1.414 1.414L9 12.414l1.707 1.707a1 1 0 0 0 1.414-1.414L10.707 11z" />
                </svg>
                <p>{{ notification.message }}</p>
              </div>

              <div>
                <button @click="showModal = true" class="flex items-center text-blue-500 hover:text-blue-700">
                  <svg class="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                    stroke-linecap="round" stroke-linejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <line x1="12" y1="8" x2="12" y2="16" />
                    <line x1="8" y1="12" x2="16" y2="12" />
                  </svg>
                  <h5 class="ml-2 uppercase font-bold">Añadir</h5>
                </button>
              </div>
            </nav>

            <div class="overflow-x-auto">

<table class="min-w-full bg-white border border-gray-300 table-hover">
  <thead>
    <tr class="bg-gray-200 text-gray-600 uppercase text-xs leading-normal">
      <th class="py-3 px-6 text-left">ID</th>
      <th class="py-3 px-6 text-left">Tipo de Estudio</th>
      <th class="py-3 px-6 text-left">Fecha Registro</th>
      <th class="py-3 px-6 text-left">Fecha Actualización</th>
      <th class="py-3 px-6 text-left">Total Costo</th>
      <th class="py-3 px-6 text-left">Estatus</th>
      <th class="py-3 px-6 text-left">Dirigido a</th>
      <th class="py-3 px-6 text-left">Observaciones</th>
      <th class="py-3 px-6 text-left">Nivel de Urgencia</th>
      <th class="py-3 px-6 text-left">Solicitud</th>
      <th class="py-3 px-6 text-left">Consumible</th>
      <th class="py-3 px-6 text-left">Editar</th>
      <th class="py-3 px-6 text-left">Eliminar</th>
    </tr>
  </thead>
  <tbody class="text-gray-600 text-xs font-light">
    <tr v-for="(solicitud, id) in paginatedData" :key="id" class="text-center">
      <!-- ID -->
      <td class="py-3 px-6 text-left whitespace-nowrap truncate">
        {{ solicitud.id }}
      </td>
      
      <!-- Tipo de Estudio -->
      <td class="text-center px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        <div class="flex flex-col items-center text-black-600 font-bold">
          <h5 class="text-sm">{{ solicitud.Tipo }}</h5>
        </div>
      </td>
      
      <!-- Fecha Registro -->
      <td class="text-sm">
        {{ formatearFecha(solicitud.Fecha_Registro) }}
      </td>
      
      <!-- Fecha Actualización -->
      <td class="text-sm">
        {{ formatearFecha(solicitud.Fecha_Actualizacion) }}
      </td>
      
      <!-- Total Costo -->
      <td class="text-sm">
        {{ solicitud.Total_Costo }}
      </td>
      
      <!-- Estatus -->
      <td>
        <div v-if="solicitud.Estatus === 'Activo'" class="text-center">
          <a class="iq-icons-list" target="_self">
            <div class="icon" style="color: green">
              <i class="fa fa-check"></i>
            </div>
            <span style="color: green; font-weight: bold; font-size: 12px;" class="text-sm">Activo</span>
          </a>
        </div>
        <div v-else-if="solicitud.Estatus === 'Inactivo'" class="text-center">
          <a class="iq-icons-list" target="_self">
            <div class="icon" style="color: red">
              <i class="fa fa-spinner fa-spin"></i>
            </div>
            <span style="color: red; font-weight: bold;">Inactivo</span>
          </a>
        </div>

   
        <div v-else class="col-12 col-md-6 col-lg-3">
          {{ solicitud.Estatus }}
        </div>
      </td>
      
      <!-- Dirigido a -->
      <td class="text-sm">
        {{ solicitud.Dirigido_A }}
      </td>
      
      <!-- Observaciones -->
      <td class="text-sm">
        {{ solicitud.Observaciones }}
      </td>
      
      <!-- Nivel de Urgencia -->
      <td class="text-center">
  <div v-if="solicitud.Nivel_Urgencia === 'Baja'">
    <a class="iq-icons-list" target="_self">
      <div class="icon" style="color: blue">
        <i class="fa fa-circle"></i>
      </div>
      <span style="color: blue; font-weight: bold; font-size: 12px;" class="text-sm">Baja</span>
    </a>
  </div>
  <div v-else-if="solicitud.Nivel_Urgencia === 'Media'">
    <a class="iq-icons-list" target="_self">
      <div class="icon" style="color: orange">
        <i class="fa fa-circle"></i>
      </div>
      <span style="color: orange; font-weight: bold; font-size: 12px;" class="text-sm">Media</span>
    </a>
  </div>
  <div v-else-if="solicitud.Nivel_Urgencia === 'Alta'">
    <a class="iq-icons-list" target="_self">
      <div class="icon" style="color: red">
        <i class="fa fa-circle"></i>
      </div>
      <span style="color: red; font-weight: bold; font-size: 12px;" class="text-sm">Alta</span>
    </a>
  </div>
  <div v-else-if="solicitud.Nivel_Urgencia === 'Urgente'">
    <a class="iq-icons-list" target="_self">
      <div class="icon" style="color: darkred">
        <i class="fa fa-circle"></i>
      </div>
      <span style="color: darkred; font-weight: bold; font-size: 12px;" class="text-sm">Urgente</span>
    </a>
  </div>
</td>

      
      <!-- Solicitud -->
      <td class="text-justify px-6 py-4 text-sm font-medium text-gray-900">
        <div class="flex flex-col items-center text-back-200">
          {{solicitud.Solicitud_ID }}
        </div>
      </td>

      <td class="text-justify px-6 py-4 text-sm font-medium text-gray-900">
        <div class="flex flex-col items-center text-back-200">
          {{solicitud.Consumibles_ID}}
        </div>
      </td>
      
      <!-- Edita -->
      <td class="text-center px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        <a class="iq-icons-list " href="#" target="_self"
          @click.showModal="editBtn(solicitud.id); showModal = true">
          <div class="icon" style="color: blue; font-size: 25px; ">
            <svg class="h-7 w-7 text-blue-500 hover:text-blue-900" viewBox="0 0 24 24" stroke-width="2"
              stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" />
              <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
              <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
              <line x1="16" y1="5" x2="19" y2="8" />
            </svg>
          </div>
        </a>
      </td>
      
      <!-- Elimina -->
      <td class="text-center px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        <a class="iq-icons-list" href="#" target="_self" @click.prevent="deleteSolicitud(solicitud.id)">
          <div class="icon" style="color: red; font-size: 25px; text-align: center;">
            <svg class="h-7 w-7 text-red-500 hover:text-red-900" width="24" height="24"
              viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
              stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" />
              <line x1="4" y1="7" x2="20" y2="7" />
              <line x1="10" y1="11" x2="10" y2="17" />
              <line x1="14" y1="11" x2="14" y2="17" />
              <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
              <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
            </svg>
          </div>
        </a>
      </td>
    </tr>
  </tbody>
</table>

            </div>
          </div>


          <!-- Modal -->
          <div v-if="showModal" class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div class="bg-white p-6 rounded shadow-lg w-full max-w-md relative">
              <button @click="showModal = false, this.currentSolicitud = {}"
                class="absolute top-3 right-3 text-gray-600 hover:text-gray-900">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor"
                  aria-hidden="true">
                  <path fill-rule="evenodd"
                    d="M10 9.293L14.707 4.586a1 1 0 10-1.414-1.414L10 7.465 5.707 3.293a1 1 0 00-1.414 1.414L8.586 9.293 4.293 13.586a1 1 0 101.414 1.414L10 10.707l4.293 4.293a1 1 0 001.414-1.414L10 9.293z"
                    clip-rule="evenodd" />
                </svg>
              </button>
              <h2 class="text-lg font-semibold text-center mb-4">
                {{ currentSolicitud.id ? 'Editar Estudio' : 'Nuevo Estudio' }}
              </h2>
              <form @submit.prevent="handleSubmit" class="px-8 pt-6 pb-8 mb-4 bg-white dark:bg-gray-800 rounded">
  <!-- Nombre del Estudio y Tipo Estudio -->
  <div class="mb-4 md:flex md:justify-between">

    <div class="mt-4">
      <label class="block mb-2 text-sm font-bold text-gray-700 dark:text-white" for="tipoEstudio">
        Tipo Estudio
      </label>
      <input
        class="w-full px-3 py-2 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
        id="tipoEstudio"
        type="text"
        v-model="currentSolicitud.Tipo"
        placeholder="Tipo Estudio"
        required
      />
    </div>
    <div class="mt-4">
      <label class="block mb-2 text-sm font-bold text-gray-700 dark:text-white" for="fechaRegistro">
        Fecha Registro
      </label>
      <input
        class="w-full px-3 py-2 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
        id="fechaRegistro"
        type="date"
        v-model="currentSolicitud.Fecha_Registro"
        required
      />
    </div>
  </div>

  <!-- Fecha Actualizacion, Total Costo, Estatus -->
  <div class="mb-4 md:flex md:justify-between">
    <div class="mt-4">
      <label class="block mb-2 text-sm font-bold text-gray-700 dark:text-white" for="fechaActualizacion">
        Fecha Actualizacion
      </label>
      <input
        class="w-full px-3 py-2 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
        id="fechaActualizacion"
        type="date"
        v-model="currentSolicitud.Fecha_Actualizacion"
        required
      />
    </div>
    <div class="mt-4">
      <label class="block mb-2 text-sm font-bold text-gray-700 dark:text-white" for="totalCosto">
        Total Costo
      </label>
      <input
        class="w-full px-3 py-2 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
        id="totalCosto"
        type="text"
        v-model="currentSolicitud.Total_Costo"
        placeholder="Total Costo"
        required
      />
    </div>
    <div class="mt-4">
      <label class="block mb-2 text-sm font-bold text-gray-700 dark:text-white" for="estatus">
        Estatus
      </label>
      <select
        id="estatus"
        class="w-full px-3 py-2 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
        v-model="currentSolicitud.Estatus"
        required
      >
        <option value="Activo">Activo</option>
        <option value="Inactivo">Inactivo</option>
      </select>
    </div>
  </div>

  <!-- Dirigido a, Observaciones -->
  <div class="mb-4 md:flex md:justify-between">
    <div class="mt-4">
      <label class="block mb-2 text-sm font-bold text-gray-700 dark:text-white" for="dirigidoA">
        Dirigido a
      </label>
      <input
        id="dirigidoA"
        name="dirigidoA"
        type="text"
        v-model="currentSolicitud.Dirigido_A"
        placeholder="Dirigido a"
        required
        class="w-full px-3 py-2 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
      />
    </div>
    <div class="mt-4">
      <label class="block mb-2 text-sm font-bold text-gray-700 dark:text-white" for="Observaciones">
        Observaciones
      </label>
      <input
        class="w-full px-3 py-2 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
        id="Observaciones"
        type="text"
        v-model="currentSolicitud.Observaciones"
        placeholder="Observaciones"
      />
    </div>
    <div class="mt-4">
      <label class="block mb-2 text-sm font-bold text-gray-700 dark:text-white" for="Consumible">
        Consumible
      </label>
      <input
        class="w-full px-3 py-2 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
        id="Consumible"
        type="text"
        v-model="currentSolicitud.Consumibles_ID"
        placeholder="Consumible"
      />
    </div>
  </div>

  <!-- Nivel de Urgencia, Solicitud -->
  <div class="mb-4 md:flex md:justify-between">
    <div class="mt-4">
    <label class="block mb-2 text-sm font-bold text-gray-700 dark:text-white" for="nivelUrgencia">
      Nivel de Urgencia
    </label>
    <select
      id="nivelUrgencia"
      name="nivelUrgencia"
      v-model="currentSolicitud.Nivel_Urgencia"
      class="w-full px-3 py-2 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
    >
      <option value="Baja">Baja</option>
      <option value="Media">Media</option>
      <option value="Alta">Alta</option>
      <option value="Urgente">Urgente</option>
    </select>
  </div>
    
    <div class="mt-4">
      <label class="block mb-2 text-sm font-bold text-gray-700 dark:text-white" for="Solicitud">
        Solicitud
      </label>
      <input
        class="w-full px-3 py-2 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
        id="Solicitud"
        type="text"
        v-model="currentSolicitud.Solicitud_ID"
        placeholder="Solicitud"
      />
    </div>
  </div>

  <div class="text-center">
    <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
      {{ currentSolicitud.id ? 'Actualizar' : 'Añadir' }}
    </button>
  </div>
</form>

            </div>
          </div>


        </div>
      </b-col>
    </b-row>
    <br>
    <!-- Pagination Controls -->
    <div class="flex justify-between items-center mt-2">
      <button @click="previousPage" :disabled="currentPage === 1"
        class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
        Anterior
      </button>
      <span class="text-gray-700">Página {{ currentPage }} de {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages"
        class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
        Siguiente
      </button>
    </div>
    <br>




  </div>
</template>

<style>
.hover-zoom {
  transition: transform 0.3s;
}

.hover-zoom:hover {
  transform: scale(1.05);
}
</style>

<script>
import axios from "axios";
import moment from "moment";

const body = document.getElementsByTagName("body");

const apiClient = axios.create({
  baseURL: 'https://privilegecare-deploy-gqmt.onrender.com/',
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
});

export default {
  name: "EstudioModal",
  data() {
    return {
      solicitudes: [],
      currentSolicitud: {},
      api: "https://privilegecare-deploy-gqmt.onrender.com/estudios/",
      solicitud: {
        Tipo: "",
        Nivel_Urgencia: "",
        Solicitud_ID: "",
        Consumibles_ID:"",
        Estatus: "",
        Total_Costo: "",
        Dirigido_A: "",
        Observaciones: "",
        Fecha_Registro: "",
        Fecha_Actualizacion: "",
      },
      showModal: false,
      searchInput: "",
      currentPage: 1, // Página actual
      resultsPerPage: 10, // Resultados por página
      totalPages: 1, // Total de páginas
      paginatedData: [], // Datos de la página actual

      notification: {
        show: false,
        message: '',
        type: '' // "success" o "error"
      }
    };
  },

  mounted() {
    body[0].classList.add("sidebar-main-menu");
    console.log("DOM is rendered");
    this.fetchData();
  },

  unmounted() {
    body[0].classList.remove("sidebar-main-menu");
  },

  created() {
    console.log("DOM is created");
    this.getSolicitudes();
  },

  methods: {
    showNotification(message, type = 'info') {
      this.notification.message = message;
      this.notification.type = type;
      this.notification.show = true;
      setTimeout(() => {
        this.notification.show = false;
      }, 5000);
    },

    async handleSubmit() {
      try {
        if (this.currentSolicitud.id) {
          await apiClient.put(`${this.api}${this.currentSolicitud.id}/`, this.currentSolicitud);
        } else {
          await apiClient.post(this.api, this.currentSolicitud);
        }
        this.getSolicitudes();
        this.currentSolicitud = {}; // Limpia el formulario
        this.showModal = false; // Cierra el modal
        this.showNotification('Éxito', 'Estudio agregado.');
      } catch (error) {
        console.error('Error al agregar:', error);
      }
    },

    async getSolicitudes() {
      try {
        const response = await apiClient.get(this.api);
        this.solicitudes = response.data;
        this.updatePagination();
      } catch (error) {
        console.error('Error al obtener estudios:', error);
      }
    },

    saveSolicitud() {
      if (!this.solicitud.Fecha_Actualizacion) {
        this.solicitud.Fecha_Actualizacion = null;
      }

      const valid = this.solicitud.Tipo &&
        this.solicitud.Nivel_Urgencia &&
        this.solicitud.Solicitud_ID &&
        this.solicitud.Consumibles_ID &&
        this.solicitud.Estatus &&
        this.solicitud.Total_Costo &&
        this.solicitud.Dirigido_A &&
        this.solicitud.Observaciones &&
        this.solicitud.Fecha_Registro;

      if (!valid) {
        console.error('Todos los campos requeridos deben estar completos.');
        return;
      }

      apiClient.post(this.api, this.solicitud)
        .then((response) => {
          console.log('Estudio creado:', response.data);
          this.getSolicitudes();
          this.solicitud = {}; // Limpia el formulario
        })
        .catch((error) => {
          console.error('Error al crear el estudio:', error.response ? error.response.data : error.message);
        });
    },

    editBtn(id) {
      const solicitud = this.solicitudes.find(solicitud => solicitud.id === id);
      if (solicitud) {
        this.currentSolicitud = { ...solicitud };
      }
    },

    updateSolicitud(id) {
      if (!this.currentSolicitud.Fecha_Actualizacion) {
        this.currentSolicitud.Fecha_Actualizacion = null;
      }

      apiClient.put(`${this.api}${id}/`, this.currentSolicitud)
        .then((response) => {
          console.log(response.data);
          this.getSolicitudes();
          this.currentSolicitud = {};
        })
        .catch((error) => {
          console.log(error);
        });
    },

    deleteSolicitud(id) {
      const solicitud = this.solicitudes.find(solicitud => solicitud.id === id);

      if (confirm(`¿Deseas eliminar el Estudio?`)
      ) {
        apiClient.delete(`${this.api}${id}/`)
          .then((response) => {
            console.log(response.data);
            this.getSolicitudes();
          })
          .catch((error) => {
            console.log(error);
          });
      }
      this.showNotification('Éxito', 'Estudio eliminado.');
    },

    updatePagination() {
      const searchQuery = this.searchInput.toLowerCase();

      const filteredData = this.solicitudes.filter(solicitud => {
        const values = Object.values(solicitud).map(value => String(value).toLowerCase());
        return values.some(value => value.includes(searchQuery));
      });

      this.totalPages = Math.ceil(filteredData.length / this.resultsPerPage);
      this.paginatedData = filteredData.slice(
        (this.currentPage - 1) * this.resultsPerPage,
        this.currentPage * this.resultsPerPage
      );
    },

    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.updatePagination();
      }
    },

    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.updatePagination();
      }
    },

    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
        this.updatePagination();
      }
    },

    formatearFecha(fecha) {
      if (moment(fecha, moment.ISO_8601, true).isValid()) {
        return moment(fecha).format("DD/MM/YYYY HH:mm:ss");
      } else {
        return "Sin Fecha";
      }
    },

    async fetchData() {
      try {
        const response = await apiClient.get(this.api);
        this.solicitudes = response.data;
        console.log('Solicitudes:', this.solicitudes);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  },

  watch: {
    searchInput() {
      this.updatePagination();
    }
  },

  computed: {
    paginatedData() {
      const startIndex = (this.currentPage - 1) * this.resultsPerPage;
      const endIndex = startIndex + this.resultsPerPage;
      return this.filteredData.slice(startIndex, endIndex).map((item, index) => {
        return { ...item, index: startIndex + index + 1 };
      });
    },

    totalPages() {
      return Math.ceil(this.solicitudes.length / this.resultsPerPage);
    },

    filteredData() {
      return this.solicitudes.filter(solicitud => {
        const matchSearchInput = Object.values(solicitud).some(value =>
          String(value).toLowerCase().includes(this.searchInput.toLowerCase())
        );
        return matchSearchInput;
      });
    }
  }
};
</script>

