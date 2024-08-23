<template>
    <div class="container">
      <h1 class="text-center">Crear Espacio</h1>
      <form @submit.prevent="crearEspacio">
        <!-- Campos del formulario -->
        <div class="mb-3">
          <label for="tipo" class="form-label">Tipo</label>
          <select v-model="espacio.Tipo" class="form-control" id="tipo" required>
            <option v-for="(tipo, index) in tipos" :key="index" :value="tipo">
              {{ tipo }}
            </option>
          </select>
        </div>
        <div class="mb-3">
          <label for="nombre" class="form-label">Nombre</label>
          <input v-model="espacio.Nombre" type="text" class="form-control" id="nombre" required>
        </div>
        <div class="mb-3">
          <label for="departamento" class="form-label">Departamento ID</label>
          <input v-model="espacio.Departamento_ID" type="number" class="form-control" id="departamento" required>
        </div>
        <div class="mb-3">
          <label for="estatus" class="form-label">Estatus</label>
          <select v-model="espacio.Estatus" class="form-control" id="estatus" required>
            <option v-for="(estatus, index) in estatuses" :key="index" :value="estatus">
              {{ estatus }}
            </option>
          </select>
        </div>
        <div class="mb-3">
          <label for="capacidad" class="form-label">Capacidad</label>
          <input v-model.number="espacio.Capacidad" type="number" class="form-control" id="capacidad">
        </div>
        <div class="mb-3">
          <label for="espacioSuperior" class="form-label">Espacio Superior ID</label>
          <input v-model.number="espacio.Espacio_superior_ID" type="number" class="form-control" id="espacioSuperior">
        </div>
        <div class="mb-3">
          <label for="tbcEspacioscol" class="form-label">Espacio Colaboración</label>
          <input v-model="espacio.tbc_espacioscol" type="text" class="form-control" id="tbcEspacioscol">
        </div>
        <!-- Botones separados con un margen -->
        <button type="submit" class="btn btn-success me-2">Crear</button>
        <button type="button" @click="cancelar" class="btn btn-secondary">Cancelar</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        espacio: {
          Tipo: '',
          Nombre: '',
          Departamento_ID: null,
          Estatus: '',
          Capacidad: null,
          Espacio_superior_ID: null,
          tbc_espacioscol: ''
        },
        tipos: [
          'Consultorio', 'Laboratorio', 'Quirófano', 'Sala de Espera', 'Edificio', 
          'Estacionamiento', 'Habitación', 'Cama', 'Sala Maternidad', 'Cunero', 
          'Anfiteatro', 'Oficina', 'Sala de Juntas', 'Auditorio', 'Cafeteria', 
          'Capilla', 'Farmacia', 'Ventanilla', 'Recepción', 'Piso'
        ],
        estatuses: [
          'Activo', 'Inactivo', 'En remodelación', 'Clausurado', 'Reubicado', 'Temporal'
        ],
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJOb21icmVfVXN1YXJpbyI6IkJydW5vIiwiQ29ycmVvX0VsZWN0cm9uaWNvIjoic3RyaW5nIiwiQ29udHJhc2VuYSI6ImJydW5vIiwiTnVtZXJvX1RlbGVmb25pY29fTW92aWwiOiJzdHJpbmcifQ.x2mprKqz7Af2HLrWycpWLlYqI9xtG9SWJOQ8Pgn4qqg' // Asegúrate de usar un token válido
      };
    },
    methods: {
      crearEspacio() {
        axios.post('http://127.0.0.1:8000/espacios/', this.espacio, {
          headers: {
            'Authorization': `Bearer ${this.token}`,
            'Content-Type': 'application/json'
          }
        })
        .then(response => {
          console.log('Espacio creado:', response.data);
          this.$router.push({ name: 'EspaciosList' });
        })
        .catch(error => {
          console.error('Error al crear el espacio:', error.response ? error.response.data : error.message);
        });
      },
      cancelar() {
        this.$router.push({ name: 'EspaciosList' });
      }
    }
  };
  </script>
  