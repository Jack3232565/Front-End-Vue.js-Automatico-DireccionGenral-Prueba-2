<template>
  <div class="p-6">
    <div v-if="message" class="my-4 text-center text-red-500">
      {{ message }}
    </div>

    <h1 class="text-2xl font-bold text-gray-700 text-center mb-6">Listado de Bebés</h1>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <div class="bg-blue-50 text-gray-600 p-4 rounded-lg shadow-md text-center">
        <p>Total de registros en la base de datos:</p>
        <h3 v-if="totalpSql !== null" class="text-xl font-semibold">{{ totalpSql }}</h3>
        <p v-else>Cargando...</p>
      </div>
      <div class="bg-blue-50 text-gray-600 p-4 rounded-lg shadow-md text-center">
        <p>Total de registros Femeninos:</p>
        <h3 v-if="totalFemenino !== null" class="text-xl font-semibold">{{ totalFemenino }}</h3>
        <p v-else>Cargando...</p>
      </div>
      <div class="bg-blue-50 text-gray-600 p-4 rounded-lg shadow-md text-center">
        <p>Total de registros Masculinos:</p>
        <h3 v-if="totalMasculino !== null" class="text-xl font-semibold">{{ totalMasculino }}</h3>
        <p v-else>Cargando...</p>
      </div>
    </div>

    <div class="mb-6">
      <input type="text" v-model="textoBusqueda" @input="buscarBebes"
        placeholder="Buscar por nombre del padre o madre..." class="w-full p-3 rounded-lg border-gray-300 shadow-sm">
    </div>

    <div class="overflow-x-auto">
      <table class="min-w-full bg-white rounded-lg shadow-lg">
        <thead>
          <tr class="bg-gray-800 text-white text-left">
            <th class="py-3 px-4">Id del Bebé</th>
            <th class="py-3 px-4">Sexo del Bebé</th>
            <th class="py-3 px-4">Nombre del Padre</th>
            <th class="py-3 px-4">Nombre de la Madre</th>
            <th class="py-3 px-4">Correo electrónico del contacto</th>
            <th class="py-3 px-4">Fecha de nacimiento</th>
            <th class="py-3 px-4">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(bebe, index) in bebesFiltrados" :key="index" class="border-b border-gray-200">
            <td class="py-3 px-4">{{ bebe.id }}</td>
            <td class="py-3 px-4">{{ bebe.sexo }}</td>
            <td class="py-3 px-4">{{ bebe.nombre_padre }}</td>
            <td class="py-3 px-4">{{ bebe.nombre_madre }}</td>
            <td class="py-3 px-4">{{ bebe.email_contacto }}</td>
            <td class="py-3 px-4">{{ bebe.fecha_nacimiento }}</td>
            <td class="py-3 px-4 flex items-center gap-2">
              <button @click="eliminarBebe(bebe.id)"
                class="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-700">
                <i class="fas fa-trash-alt"></i> Eliminar
              </button>
              <router-link :to="{ name: 'editar', params: { id: bebe.id } }"
                class="bg-orange-500 text-white px-3 py-1 rounded-lg hover:bg-orange-700">
                <button>
                  <i class="fas fa-edit"></i> Editar Bebé
                </button>
              </router-link>
              <router-link :to="{ name: 'TablaVacunas', params: { id: bebe.id } }"
                class="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-700">
                <button>
                  <i class="fas fa-syringe"></i> Ver Vacunas
                </button>
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="flex justify-center items-center my-6">
      <button @click="paginar('anterior')" :disabled="paginaActual === 1"
        class="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed">
        Anterior
      </button>
      <span class="mx-4">Página {{ paginaActual }}</span>
      <button @click="paginar('siguiente')" :disabled="bebes.length < itemsPorPagina"
        class="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed">
        Siguiente
      </button>
    </div>

    <div class="flex flex-col items-center space-y-4">
      <div class="">
        <Grafica2></Grafica2>
        <Grafica1></Grafica1>
      </div>
        <br>
      <div class="flex flex-col bg-aliceblue text-gray-600 rounded-lg w-full max-w-sm p-4 shadow-lg">
        <Grafica1></Grafica1>
      </div>
    </div>


  </div>
</template>

<style>
/* Estilos generales */

.chart-container {
  display: flex;
  /* Utiliza Flexbox para alinear horizontalmente */
  justify-content: space-between;
  /* Ajusta el espacio entre los elementos */
  gap: 20px;
  /* Espacio entre los gráficos (opcional) */
}

.grafica-container {
  width: 40%;
  height: 200;
  /* Ajusta la altura según tus necesidades */
}

.grafica-container1 {
  width: 60%;
  height: 200;
  /* Ajusta la altura según tus necesidades */
}

#buttons-actions {

  align-content: space-between;
  flex-grow: inherit;
  display: inline-flexbox;

}

#btndelete {
  background-color: red;
  color: white;
}

#btnupdate {
  background-color: orange;
  color: white
}

#btnvacunas {

  background-color: #2F79DA;
  color: white;

}

.titulo {
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
  color: rgb(31 41 55 / var(--tw-bg-opacity));
}


.container {
  max-width: 100%;
  margin: 0 auto;
  padding: 0 20px;
}

.search-bar input {
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
}

.stats-container {

  justify-content: space-around;
  margin-bottom: 20px;
}

.stat-box {
  background-color: #5f7892;
  padding: 8px;
  /* Espacio interno reducido */
  margin-bottom: 10px;
  /* Espacio entre cada contenedor */
  border-radius: 8px;
  box-shadow: 0px 0px 5px rgba(187, 29, 29, 0.1);
  text-align: center;
  /* Centra el texto y los elementos dentro del contenedor */
  font-size: 14px;
  /* Tamaño de fuente más pequeño */
}

.stat-img {
  width: 50px;
  margin: 10px 0;
  display: block;
  /* Hace que la imagen sea un bloque */

}

.table-container {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  overflow-x: auto;
}

.styled-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  background-color: #a9adb1de;
}

.styled-table thead tr {
  background-color: #343a40;
  color: #666d86;
}

.styled-table th,
.styled-table td {
  padding: 12px;
  border: 1px solid #1c204e;
}

.styled-table tr:nth-child(even) {
  background-color: #f2f2f2;
}

/* Botones de acciones */
.action-btn {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 8px 12px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  cursor: pointer;
  border-radius: 4px;
  margin-right: 5px;
}

.action-btn:hover {
  background-color: #45a049;
}


th {
  color: #f2f2f2;
}

/* Controles de paginación */
.pagination-controls {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

.pagination-btn {
  background-color: #343a40;
  color: white;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 4px;
}

.pagination-btn:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
}

.pagination-btn:hover:not(:disabled) {
  background-color: #495057;
}
</style>

<script>
/* eslint-disable */

import Grafica1 from '/src/components/Pediatria/Grafica1.vue'
import Grafica2 from '/src/components/Pediatria/Grafica2.vue'

export default {
  data() {
    return {
      bebes: [],
      message: '',
      paginaActual: 1,
      itemsPorPagina: 10,
      totalpSql: null,
      totalMasculino: null,
      totalFemenino: null,
      textoBusqueda: '', // Nuevo dato para la búsqueda
    };
  },
  computed: {
    // Computed property para filtrar los bebés según la búsqueda
    bebesFiltrados() {
      if (this.textoBusqueda.trim() === '') {
        return this.bebes;
      }
      const busqueda = this.textoBusqueda.toLowerCase();
      return this.bebes.filter(bebe =>
        bebe.nombre_padre.toLowerCase().includes(busqueda) ||
        bebe.nombre_madre.toLowerCase().includes(busqueda)
      );
    }
  },
  mounted() {
    this.obtenerBebes();
    this.obtenerTotalSQL();
    setInterval(this.obtenerTotalSQL, 2000);
  },
  methods: {

    obtenerTotalSQL() {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJOb21icmVfVXN1YXJpbyI6InlhaXIiLCJDb3JyZW9fRWxlY3Ryb25pY28iOiJzdHJpbmciLCJDb250cmFzZW5hIjoiMTIzNCIsIk51bWVyb19UZWxlZm9uaWNvX01vdmlsIjoic3RyaW5nIn0.aEXy_fgDdUHif1wzhfpxddKVg4fWAyGR3fd1p-SWDOc';
      fetch('https://privilegecare-deploy.onrender.com/pediatria/nacimientogenero/', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Error al obtener los datos');
          }
          return response.json();
        })
        .then(data => {
          if (Array.isArray(data) && data.length > 0) {
            this.totalpSql = data[0].total_pacientes;
            this.totalMasculino = data[0].total_masculino;
            this.totalFemenino = data[0].total_femenino;
          } else {
            throw new Error('No se encontraron datos válidos');
          }
        })
        .catch(error => {
          this.totalpSql = 'Error al obtener los datos';
          this.totalMasculino = 'Error';
          this.totalFemenino = 'Error';
        });
    },

    obtenerBebes() {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJOb21icmVfVXN1YXJpbyI6InlhaXIiLCJDb3JyZW9fRWxlY3Ryb25pY28iOiJzdHJpbmciLCJDb250cmFzZW5hIjoiMTIzNCIsIk51bWVyb19UZWxlZm9uaWNvX01vdmlsIjoic3RyaW5nIn0.aEXy_fgDdUHif1wzhfpxddKVg4fWAyGR3fd1p-SWDOc';
      fetch(`https://privilegecare-deploy.onrender.com/pediatria/nacimientos/?page=${this.paginaActual - 1}&limit=${this.itemsPorPagina}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Hubo un problema al obtener la lista de bebés.');
          }
          return response.json();
        })
        .then(data => {
          this.bebes = data;
        })
        .catch(error => {
          this.message = "Error: " + error.message;
        });
    },

    eliminarBebe(id) {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJOb21icmVfVXN1YXJpbyI6InlhaXIiLCJDb3JyZW9fRWxlY3Ryb25pY28iOiJzdHJpbmciLCJDb250cmFzZW5hIjoiMTIzNCIsIk51bWVyb19UZWxlZm9uaWNvX01vdmlsIjoic3RyaW5nIn0.aEXy_fgDdUHif1wzhfpxddKVg4fWAyGR3fd1p-SWDOc';
      fetch(`https://privilegecare-deploy.onrender.com/pediatria/nacimiento/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Hubo un problema al eliminar el bebé.');
          }
          this.message = "¡Bebé eliminado exitosamente!";
          this.obtenerBebes();
          setTimeout(() => {
            this.message = '';
          }, 3000);
        })
        .catch(error => {
          this.message = "Error: " + error.message;
        });
    },

    buscarBebes() {
      // Este método se llama cada vez que se escribe en la barra de búsqueda.
    },

    paginar(direccion) {
      if (direccion === 'anterior' && this.paginaActual > 1) {
        this.paginaActual--;
      } else if (direccion === 'siguiente') {
        this.paginaActual++;
      }
      this.obtenerBebes();
    }
  }
}
</script>
