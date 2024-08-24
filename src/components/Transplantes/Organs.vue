<template>
    <div>
        <!-- Tabla de Órganos -->
        <form class="p-4">
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                <div class="flex flex-col sm:flex-row flex-wrap space-y-4 sm:space-y-0 sm:items-center sm:justify-between pb-4">
                    <!-- Búsqueda -->
                    <div class="relative w-full sm:w-auto">
                        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor"
                                viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd"
                                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                    clip-rule="evenodd"></path>
                            </svg>
                        </div>
                        <input type="text" v-model="searchQuery" @input="searchOrgano"
                            class="block w-full sm:w-80 p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Buscar órgano...">
                    </div>
    
                    <!-- Botón Agregar Órgano -->
                    <div class="w-full sm:w-auto">
                        <RouterLink to="/organform">
                            <button id="dropdownRadioButton" data-dropdown-toggle="dropdownRadio"
                                class="w-full sm:w-auto inline-flex items-center text-white bg-blue-500 border border-blue-300 focus:outline-none hover:bg-blue-400 focus:ring-4 focus:ring-blue-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-blue-800 dark:text-white dark:border-blue-600 dark:hover:bg-blue-700 dark:hover:border-blue-600 dark:focus:ring-blue-700"
                                type="button">
                                Agregar Órgano
                            </button>
                        </RouterLink>
                    </div>
                </div>
    
                <!-- Tabla -->
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="p-4"></th>
                            <th scope="col" class="px-6 py-3">NOMBRE</th>
                            <th scope="col" class="px-6 py-3">EDAD DEL DONANTE</th>
                            <th scope="col" class="px-6 py-3">FECHA DE EXTRACCIÓN</th>
                            <th scope="col" class="px-6 py-3">APARATOS Y SISTEMAS</th>
                            <th scope="col" class="px-6 py-3">TIPO</th>
                            <th scope="col" class="px-6 py-3">GRUPO SANGUÍNEO</th>
                            <th scope="col" class="px-6 py-3">ESTADO DE SALUD</th>
                            <th scope="col" class="px-6 py-3">ENFERMEDADES TRANSMISIBLES</th>
                            <th scope="col" class="px-6 py-3">DETALLES ADICIONALES</th>
                            <th scope="col" class="px-6 py-3">DISPONIBILIDAD</th>
                            <th scope="col" class="px-6 py-3">FECHA DE ACTUALIZACIÓN</th>
                            <th scope="col" class="px-6 py-3">FECHA DE REGISTRO</th>
                            <th scope="col" class="px-6 py-3">ESTATUS</th>
                            <th scope="col" class="px-6 py-3">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="organo in filteredOrganos" :key="organo.ID"
                            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td class="w-4 p-4"></td>
                            <td class="px-6 py-4">{{ organo.Nombre }}</td>
                            <td class="px-6 py-4">{{ organo.Edad_Donante }}</td>
                            <td class="px-6 py-4">{{ organo.Fecha_Extraccion }}</td>
                            <td class="px-6 py-4">{{ organo.Aparato_Sistema }}</td>
                            <td class="px-6 py-4">{{ organo.Tipo }}</td>
                            <td class="px-6 py-4">{{ organo.Grupo_Sanguineo }}</td>
                            <td class="px-6 py-4">{{ organo.Estado_Salud }}</td>
                            <td class="px-6 py-4">{{ organo.Enfermedades_Transmisibles ? 'Sí' : 'No' }}</td>
                            <td class="px-6 py-4">{{ organo.Detalles_Adicionales }}</td>
                            <td class="px-6 py-4">{{ organo.Disponibilidad }}</td>
                            <td class="px-6 py-4">{{ organo.Fecha_Actualizacion }}</td>
                            <td class="px-6 py-4">{{ organo.Fecha_Registro }}</td>
                            <td class="px-6 py-4">{{ organo.Estatus }}</td>
                            <td class="px-6 py-4">
                                <a href="#" @click.prevent="editOrgano(organo)"
                                    class="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-2">
                                    <span class="material-symbols-outlined">edit</span>
                                </a>
                                <a href="#" @click="confirmDeleteOrgano(organo.ID)"
                                    class="font-medium text-red-600 dark:text-red-500 hover:underline">
                                    <span class="material-symbols-outlined">delete</span>
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </form>
    
        <!-- Modal de Edición -->
        <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-2xl max-h-[80vh] overflow-auto">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Editar Órgano</h3>
                <form @submit.prevent="updateOrgano" class="grid grid-cols-1 sm:grid-cols-2 gap-4">
    
                    <!-- Nombre -->
                    <div class="col-span-1">
                        <label for="nombre"
                            class="block text-sm font-medium text-gray-700 dark:text-gray-300">Nombre</label>
                        <input v-model="selectedOrgano.Nombre" type="text" id="nombre"
                            class="mt-1 block w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    </div>
    
                    <!-- Edad del Donante -->
                    <div class="col-span-1">
                        <label for="edad_donante"
                            class="block text-sm font-medium text-gray-700 dark:text-gray-300">Edad del
                            Donante</label>
                        <input v-model="selectedOrgano.Edad_Donante" type="number" id="edad_donante"
                            class="mt-1 block w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    </div>
    
                    <!-- Fecha de Extracción -->
                    <div class="col-span-2">
                        <label for="fecha_extraccion"
                            class="block text-sm font-medium text-gray-700 dark:text-gray-300">Fecha de
                            Extracción</label>
                        <input v-model="selectedOrgano.Fecha_Extraccion" type="datetime-local" id="fecha_extraccion"
                            class="mt-1 block w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    </div>
    
                    <!-- Aparato Sistema -->
                    <div class="col-span-1">
                        <label for="aparatosistema"
                            class="block text-sm font-medium text-gray-700 dark:text-white">Aparato
                            Sistema</label>
                        <select v-model="selectedOrgano.Aparato_Sistema" id="aparatosistema"
                            class="mt-1 block w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                            <option value="Respiratorio">Respiratorio</option>
                            <option value="Circulatorio">Circulatorio</option>
                            <option value="Digestivo">Digestivo</option>
                            <option value="Urinario">Urinario</option>
                            <option value="Endocrino">Endocrino</option>
                            <option value="Nervioso">Nervioso</option>
                        </select>
                    </div>
    
                    <!-- Tipo -->
                    <div class="col-span-1">
                        <label for="tipo" class="block text-sm font-medium text-gray-700 dark:text-white">Tipo</label>
                        <select v-model="selectedOrgano.Tipo" id="tipo"
                            class="mt-1 block w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                            <option value="Corazon">Corazón</option>
                            <option value="Pulmon">Pulmón</option>
                            <option value="Higado">Hígado</option>
                            <option value="Riñon">Riñón</option>
                            <option value="Pancreas">Páncreas</option>
                            <option value="Intestino">Intestino</option>
                        </select>
                    </div>
    
                    <!-- Grupo Sanguíneo -->
                    <div class="col-span-1">
                        <label for="gruposanguineo"
                            class="block text-sm font-medium text-gray-700 dark:text-white">Grupo
                            Sanguíneo</label>
                        <select v-model="selectedOrgano.Grupo_Sanguineo" id="gruposanguineo"
                            class="mt-1 block w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                        </select>
                    </div>
    
                    <!-- Estado de Salud -->
                    <div class="col-span-1">
                        <label for="estadosalud"
                            class="block text-sm font-medium text-gray-700 dark:text-white">Estado de
                            Salud</label>
                        <input v-model="selectedOrgano.Estado_Salud" type="text" id="estadosalud"
                            class="mt-1 block w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    </div>
    
                    <!-- Enfermedades Transmisibles -->
                    <div class="col-span-1">
                        <label for="enfermedadestransmisibles"
                            class="block text-sm font-medium text-gray-700 dark:text-white">Enfermedades
                            Transmisibles</label>
                        <select v-model="selectedOrgano.Enfermedades_Transmisibles" id="enfermedadestransmisibles"
                            class="mt-1 block w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                            <option value="Si">Sí</option>
                            <option value="No">No</option>
                        </select>
                    </div>
    
                    <!-- Detalles Adicionales -->
                    <div class="col-span-2">
                        <label for="detallesadicionales"
                            class="block text-sm font-medium text-gray-700 dark:text-white">Detalles
                            Adicionales</label>
                        <textarea v-model="selectedOrgano.Detalles_Adicionales" id="detallesadicionales" rows="3"
                            class="mt-1 block w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"></textarea>
                    </div>
    
                    <!-- Disponibilidad -->
                    <div class="col-span-1">
                        <label for="disponibilidad"
                            class="block text-sm font-medium text-gray-700 dark:text-white">Disponibilidad</label>
                        <select v-model="selectedOrgano.Disponibilidad" id="disponibilidad"
                            class="mt-1 block w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                            <option value="Disponible">Disponible</option>
                            <option value="No Disponible">No Disponible</option>
                        </select>
                    </div>
    
                    <!-- Estatus -->
                    <div class="col-span-1">
                        <label for="estatus" class="block text-sm font-medium text-gray-700 dark:text-white">Estatus</label>
                        <select v-model="selectedOrgano.Estatus" id="estatus"
                            class="mt-1 block w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                            <option value="Activo">Activo</option>
                            <option value="Inactivo">Inactivo</option>
                        </select>
                    </div>
    
                    <!-- Fecha de Actualización -->
                    <div class="col-span-1">
                        <label for="fechaactualizacion"
                            class="block text-sm font-medium text-gray-700 dark:text-white">Fecha de
                            Actualización</label>
                        <input v-model="selectedOrgano.Fecha_Actualizacion" type="datetime-local" id="fechaactualizacion"
                            class="mt-1 block w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    </div>
    
                    <!-- Fecha de Registro -->
                    <div class="col-span-1">
                        <label for="fecharegistro"
                            class="block text-sm font-medium text-gray-700 dark:text-white">Fecha de Registro</label>
                        <input v-model="selectedOrgano.Fecha_Registro" type="datetime-local" id="fecharegistro"
                            class="mt-1 block w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    </div>
    
                    <!-- Botones -->
                    <div class="col-span-2 flex justify-end">
                        <button type="button" @click="closeModal"
                            class="text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-4 py-2 mr-2 dark:bg-gray-600 dark:hover:bg-gray-700 dark:text-white dark:focus:ring-gray-600">
                            Cancelar
                        </button>
                        <button type="submit"
                            class="text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-800 dark:hover:bg-blue-900 dark:focus:ring-blue-700">
                            Guardar Cambios
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    
</template>

<script>
import axios from "axios";

const apiClient = axios.create({
    baseURL: 'https://back-end-hospital2-0.onrender.com/',
});

export default {
    name: "CreacionDeTablaOrganos",
    data() {
        return {
            organos: [],
            filteredOrganos: [], // Para la búsqueda
            searchQuery: '', // Modelo para la búsqueda
            selectedOrgano: {
                Nombre: '',
                Edad_Donante: 0,
                Aparato_Sistema: '',
                Detalles_Adicionales: '',
                Disponibilidad: '',
                Tipo: '',
                Estatus: false,

                Fecha_Extraccion: '',

                Grupo_Sanguineo: '',
                Estado_Salud: '',
                Enfermedades_Transmisibles: false,
                ID: null
            },
            showModal: false,
            api: "organos/",
            aparatosSistemas: [
                'Circulatorio',
                'Digestivo',
                'Respiratorio',
                'Nervioso',
                'Muscular',
                'Esquelético',
                'Endocrino',
                'Linfático',
                'Inmunológico',
                'Reproductor',
                'Urinario',
                'Sensorial'
            ],
            disponibilidades: ['En Proceso', 'Disponible', 'No Disponible', 'Reservado', 'Entregado'],
            tipos: ['Vital', 'No Vital']
        };
    },
    methods: {
        editOrgano(organo) {
            this.selectedOrgano = { ...organo };
            this.showModal = true;
        },

        async updateOrgano() {
            try {
                const organoId = this.selectedOrgano.ID;
                if (organoId === null) {
                    console.error("ID del órgano no definido.");
                    return;
                }
                await apiClient.put(`https://back-end-hospital2-0.onrender.com/organo/${organoId}`, this.selectedOrgano);
                console.log("Órgano actualizado con éxito");

                this.fetchOrganos();  // Refresca la lista de órganos después de la actualización
                this.closeModal();    // Cierra el modal después de la actualización
            } catch (error) {
                console.error("Error al actualizar el órgano", error);
            }
        },

        closeModal() {
            this.showModal = false;
        },

        async fetchOrganos() {
            try {
                const response = await apiClient.get(this.api);
                console.log("Datos obtenidos del servidor:", response.data); // Debugging
                this.organos = response.data;
                this.filteredOrganos = this.organos; // Inicialmente muestra todos los órganos
            } catch (error) {
                console.error("Error al obtener los órganos", error);
            }
        },

        async deleteOrgano() {
            try {
                const organoId = this.selectedOrgano.ID;
                if (organoId === null) {
                    console.error("ID del órgano no definido.");
                    return;
                }
                const response = await axios.delete(`https://back-end-hospital2-0.onrender.com/organo/${organoId}`);
                console.log("Órgano eliminado con éxito", response.data);
                this.fetchOrganos(); // Refrescar la lista después de eliminar
                this.closeModal(); // Cerrar el modal después de eliminar
            } catch (error) {
                console.error("Error al eliminar el órgano", error);
            }
        },

        confirmDeleteOrgano(organoId) {
            if (confirm("¿Estás seguro de que deseas eliminar este órgano?")) {
                this.selectedOrgano.ID = organoId;
                this.deleteOrgano();
            }
        },

        searchOrgano() {
            if (this.searchQuery) {
                const query = this.searchQuery.toLowerCase();
                this.filteredOrganos = this.organos.filter(organo => {
                    return (
                        organo.Nombre.toLowerCase().includes(query)
                    );
                });
            } else {
                this.filteredOrganos = this.organos;
            }
        }
    },

    mounted() {
        this.fetchOrganos(); // Llama al método una vez al montar el componente
    }
};
</script>

<style scoped>
.modal {
    display: block;
}

.close {
    cursor: pointer;
}
</style>