<template>
  <div class="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
    <h1 class="text-3xl font-bold mb-6 text-gray-800">Gestión de Áreas Médicas</h1>

    <!-- Formulario para agregar o editar área médica -->
    <form @submit.prevent="agregarOActualizarArea" class="space-y-4">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="form-group">
          <label for="nombre" class="block text-gray-700">Nombre</label>
          <input v-model="nuevaArea.Nombre" id="nombre" type="text" placeholder="Nombre" class="p-3 border border-gray-300 rounded-lg w-full" required />
        </div>
        <div class="form-group">
          <label for="descripcion" class="block text-gray-700">Descripción</label>
          <input v-model="nuevaArea.Descripcion" id="descripcion" type="text" placeholder="Descripción" class="p-3 border border-gray-300 rounded-lg w-full" />
        </div>
        <div class="form-group">
          <label for="estatus" class="block text-gray-700">Estatus</label>
          <select v-model="nuevaArea.Estatus" id="estatus" class="p-3 border border-gray-300 rounded-lg w-full">
            <option value="Activo">Activo</option>
            <option value="Inactivo">Inactivo</option>
          </select>
        </div>
      </div>
      <button type="submit" class="bg-blue-500 text-white p-3 rounded-lg w-full hover:bg-blue-600 transition duration-300">
        {{ editando ? 'Actualizar Área Médica' : 'Guardar Área Médica' }}
      </button>
    </form>

    <!-- Tabla para mostrar las áreas médicas -->
    <table class="mt-6 w-full bg-white rounded-lg shadow-md">
      <thead class="bg-gray-100 text-gray-600">
        <tr>
          <th class="py-3 px-4 border-b">Nombre</th>
          <th class="py-3 px-4 border-b">Descripción</th>
          <th class="py-3 px-4 border-b">Estatus</th>
          <th class="py-3 px-4 border-b">Fecha Registro</th>
          <th class="py-3 px-4 border-b">Fecha Actualización</th>
          <th class="py-3 px-4 border-b">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="area in areas" :key="area.ID">
          <td class="py-3 px-4 border-b">{{ area.Nombre }}</td>
          <td class="py-3 px-4 border-b">{{ area.Descripcion }}</td>
          <td class="py-3 px-4 border-b">{{ area.Estatus }}</td>
          <td class="py-3 px-4 border-b">{{ new Date(area.Fecha_Registro).toLocaleDateString() }}</td>
          <td class="py-3 px-4 border-b">{{ new Date(area.Fecha_Actualizacion).toLocaleDateString() }}</td>
          <td class="py-3 px-4 border-b text-center">
            <button @click="editarArea(area)" class="bg-yellow-500 text-white p-2 rounded-lg hover:bg-yellow-600 transition duration-300">Editar</button>
            <button @click="eliminarArea(area.ID)" class="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition duration-300 mt-2">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      areas: [],
      nuevaArea: {
        Nombre: '',
        Descripcion: '',
        Estatus: 'Activo',
      },
      editando: false,
      idEditando: null,
      token: 'tu_token_aqui'
    };
  },
  methods: {
    async obtenerAreas() {
      try {
        const response = await axios.get('https://privilegecare-deploy-gqmt.onrender.com/areas_medicas', {
          headers: {
            'Authorization': `Bearer ${this.token}`
          }
        });
        this.areas = response.data;
      } catch (error) {
        console.error('Error al obtener las áreas médicas:', error);
      }
    },
    async agregarOActualizarArea() {
      try {
        let response;
        const areaData = { ...this.nuevaArea };

        if (this.editando) {
          response = await axios.put(`https://privilegecare-deploy-gqmt.onrender.com/area_medica/${this.idEditando}`, areaData, {
            headers: {
              'Authorization': `Bearer ${this.token}`
            }
          });
          this.editando = false;
          this.idEditando = null;
        } else {


            // Obtener la fecha actual en el formato deseado
            const fechaRegistro = new Date().toISOString();

            // Agregar el campo Fecha_Registro al objeto
            areaData.Fecha_Registro = fechaRegistro;

            // Generar un nuevo objeto con el campo añadido
            const nuevoObjeto = { ...areaData };

            console.log(nuevoObjeto);
          
          response = await axios.post('https://privilegecare-deploy-gqmt.onrender.com/areas_medicas', nuevoObjeto, {
            headers: {
              'Authorization': `Bearer ${this.token2}`
            }
          });
        }

        if (response.status === 200 || response.status === 201) {
          this.nuevaArea = { Nombre: '', Descripcion: '', Estatus: 'Activo' };
          await this.obtenerAreas();
        } else {
          console.error('Error al guardar el área médica:', response.statusText);
        }
      } catch (error) {
        console.error('Error al agregar o actualizar el área médica:', error);
      }
    },
    editarArea(area) {
      this.nuevaArea = { ...area };
      this.editando = true;
      this.idEditando = area.ID;
    },
    async eliminarArea(id) {
      try {
        await axios.delete(`https://privilegecare-deploy-gqmt.onrender.com/area_medica/${id}`, {
          headers: {
            'Authorization': `Bearer ${this.token}`
          }
        });
        await this.obtenerAreas();
      } catch (error) {
        console.error('Error al eliminar el área médica:', error);
      }
    }
  },
  created() {
    this.obtenerAreas();
  }
};
</script>

<style scoped>
/* Estilos personalizados para una mejor apariencia */
.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #4a5568;
}

button {
  font-size: 1rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
}

button:hover {
  opacity: 0.9;
}

button:focus {
  outline: none;
}
</style>
