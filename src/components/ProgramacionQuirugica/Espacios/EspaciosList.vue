<template>
    <div class="container mt-4">
      <h1 class="display-4 text-center mb-4">Lista de Espacios</h1>
      <div class="d-flex justify-content-between mb-3">
        <input 
          v-model="filtro" 
          @input="buscarEspacios" 
          type="text" 
          class="form-control form-control-sm w-25" 
          placeholder="Buscar Espacios por Nombre..."
        />
        <button @click="irACrearEspacio" class="btn btn-primary">Crear Espacio</button>
      </div>
      <div>
        <table class="table table-bordered">
          <thead class="table-dark">
            <tr>
              <th>ID</th>
              <th>Tipo</th>
              <th>Nombre</th>
              <th>Departamento</th>
              <th>Estatus</th>
              <th>Fecha Registro</th>
              <th>Fecha Actualización</th>
              <th>Capacidad</th>
              <th>Espacio Superior ID</th>
              <th>Espacio Colaboración</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="espacio in espaciosFiltrados" :key="espacio.ID">
              <td>{{ espacio.ID }}</td>
              <td>{{ espacio.Tipo }}</td>
              <td>{{ espacio.Nombre }}</td>
              <td>{{ espacio.Departamento_ID }}</td>
              <td>{{ espacio.Estatus }}</td>
              <td>{{ espacio.Fecha_Registro }}</td>
              <td>{{ espacio.Fecha_Actualizacion }}</td>
              <td>{{ espacio.Capacidad }}</td>
              <td>{{ espacio.Espacio_superior_ID }}</td>
              <td>{{ espacio.tbc_espacioscol }}</td>
              <td>
                <button @click="editarEspacio(espacio.ID)" class="btn btn-warning btn-sm">Editar</button>
                <button @click="eliminarEspacio(espacio.ID)" class="btn btn-danger btn-sm">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        espacios: [],
        filtro: '',
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJOb21icmVfVXN1YXJpbyI6IkJydW5vIiwiQ29ycmVvX0VsZWN0cm9uaWNvIjoic3RyaW5nIiwiQ29udHJhc2VuYSI6ImJydW5vIiwiTnVtZXJvX1RlbGVmb25pY29fTW92aWwiOiJzdHJpbmcifQ.x2mprKqz7Af2HLrWycpWLlYqI9xtG9SWJOQ8Pgn4qqg'
      };
    },
    computed: {
      espaciosFiltrados() {
        return this.espacios.filter(espacio => {
          return espacio.Nombre.toLowerCase().includes(this.filtro.toLowerCase());
        });
      }
    },
    created() {
      this.obtenerEspacios();
    },
    methods: {
      obtenerEspacios() {
        axios.get('http://127.0.0.1:8000/espacios/', {
          headers: {
            'Authorization': `Bearer ${this.token}`
          }
        })
        .then(response => {
          this.espacios = response.data;
        })
        .catch(error => {
          console.error('Error al obtener los espacios:', error);
        });
      },
      buscarEspacios() {
        // Este método se invoca automáticamente con v-model y @input en la barra de búsqueda
      },
      irACrearEspacio() {
        this.$router.push({ name: 'CrearEspacio' });
      },
      editarEspacio(id) {
        this.$router.push({ name: 'EditarEspacio', params: { id } });
      },
      eliminarEspacio(id) {
        axios.delete(`http://127.0.0.1:8000/espacios/${id}/`, {
          headers: {
            'Authorization': `Bearer ${this.token}`
          }
        })
        .then(() => {
          this.obtenerEspacios();
        })
        .catch(error => {
          console.error('Error al eliminar el espacio:', error);
        });
      }
    }
  };
  </script>
  