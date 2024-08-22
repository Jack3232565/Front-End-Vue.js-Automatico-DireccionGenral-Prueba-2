<template>
  <div class="container mt-4">
    <!-- Título centrado, más grande y en negrita -->
    <h1 class="text-center mb-4 font-weight-bold" style="font-size: 36px;">Tabla de Cirugías</h1>
    
    <div class="d-flex justify-content-between mb-3">
      <!-- Botón para crear cirugía alineado a la derecha -->
      <button @click="irACrearCirugia" class="btn btn-secondary">Crear Cirugía</button>
      
      <!-- Barra de búsqueda centrada y con color verde -->
      <div class="input-group" style="max-width: 400px;">
        <input v-model="busqueda" type="text" class="form-control" placeholder="Buscar cirugía..." />
        <span class="input-group-text bg-success text-white">
          <i class="fas fa-search"></i>
        </span>
      </div>
    </div>
    
    <table class="table table-bordered">
      <thead class="bg-light">
        <tr>
          <th class="blue-column">Id de la Cirugía</th>
          <th>Tipo</th>
          <th>Nombre</th>
          <th>Descripción</th>
          <th>Nivel de Urgencia</th>
          <th>Horario</th>
          <th>Observaciones</th>
          <th>Estatus</th>
          <th>Consumible</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="cirugia in cirugiasFiltradas" :key="cirugia.ID">
          <td class="blue-column">{{ cirugia.ID }}</td>
          <td>{{ cirugia.Tipo }}</td>
          <td>{{ cirugia.Nombre }}</td>
          <td>{{ cirugia.Descripcion }}</td>
          <td>{{ cirugia.Nivel_Urgencia }}</td>
          <td>{{ cirugia.Horario }}</td>
          <td>{{ cirugia.Observaciones }}</td>
          <td>{{ cirugia.Estatus }}</td>
          <td>{{ cirugia.Consumible }}</td>
          <td>
            <button @click="eliminarCirugia(cirugia.ID)" class="btn btn-danger btn-sm">
              <i class="fas fa-trash-alt"></i> Eliminar
            </button>
            <button @click="editarCirugia(cirugia.ID)" class="btn btn-warning btn-sm">
              <i class="fas fa-edit"></i> Editar
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cirugias: [],
      busqueda: '', // Variable para almacenar el texto de búsqueda
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJOb21icmVfVXN1YXJpbyI6IkJydW5vIiwiQ29ycmVvX0VsZWN0cm9uaWNvIjoic3RyaW5nIiwiQ29udHJhc2VuYSI6ImJydW5vIiwiTnVtZXJvX1RlbGVmb25pY29fTW92aWwiOiJzdHJpbmcifQ.x2mprKqz7Af2HLrWycpWLlYqI9xtG9SWJOQ8Pgn4qqg', // Reemplaza con tu token real
    };
  },
  computed: {
    cirugiasFiltradas() {
      // Filtra las cirugías basadas en el texto de búsqueda
      return this.cirugias.filter(cirugia => {
        return (
          cirugia.Tipo.toLowerCase().includes(this.busqueda.toLowerCase()) ||
          cirugia.Nombre.toLowerCase().includes(this.busqueda.toLowerCase()) ||
          cirugia.Descripcion.toLowerCase().includes(this.busqueda.toLowerCase()) ||
          cirugia.Nivel_Urgencia.toLowerCase().includes(this.busqueda.toLowerCase()) ||
          cirugia.Estatus.toLowerCase().includes(this.busqueda.toLowerCase()) ||
          cirugia.Consumible.toLowerCase().includes(this.busqueda.toLowerCase())
        );
      });
    },
  },
  mounted() {
    // Hacer la solicitud a la API y obtener los datos de cirugías
    fetch('http://127.0.0.1:8000/cirugias/', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.token}`, // Incluye el token en el encabezado
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error en la respuesta del servidor');
      }
      return response.json();
    })
    .then(data => {
      this.cirugias = data; // Asignar los datos a la variable cirugias
    })
    .catch(error => console.error('Error al obtener los datos:', error));
  },
  methods: {
    irACrearCirugia() {
      this.$router.push({ name: 'crearC' }); // Redirecciona a la vista CrearCirugias
    },
    eliminarCirugia(id) {
  fetch(`http://127.0.0.1:8000/cirugia/${id}/`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${this.token}`,
    }
  })
  .then(response => {
    console.log('Response status:', response.status); // Imprime el estado de la respuesta
    if (!response.ok) {
      return response.text().then(text => { throw new Error(text || 'Hubo un problema al eliminar la cirugía.') });
    }
    // Si la eliminación es exitosa, actualizar la lista de cirugías
    this.obtenerCirugias();
  })
  .catch(error => console.error('Error al eliminar la cirugía:', error));
  },
  editarCirugia(id) {
  this.$router.push({ name: 'editarC', params: { id: id } });
  },
    obtenerCirugias() {
      // Método para obtener nuevamente las cirugías después de eliminar
      fetch('http://127.0.0.1:8000/cirugias/', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.token}`, // Incluye el token en el encabezado
        }
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error en la respuesta del servidor');
        }
        return response.json();
      })
      .then(data => {
        this.cirugias = data; // Asignar los datos a la variable cirugias
      })
      .catch(error => console.error('Error al obtener los datos:', error));
    }
  }
};
</script>

<style>
/* Estilos para iconos de Font Awesome */
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');

/* Estilos para la barra de búsqueda centrada y con color verde */
.input-group-text {
  background-color: #243e2a; /* Color verde de Bootstrap */
  color: rgb(66, 76, 75);
}

.form-control {
  border-right: none;
}

.table {
  margin-bottom: 0;
}

.table thead th {
  background-color: #4a4c4d; /* Gris claro */
  color: #495057; /* Color del texto para mejor contraste */
}

/* Fondo azul bajito para la primera columna */
.blue-column {
  background-color: #220c50; /* Azul bajito */
}
</style>
