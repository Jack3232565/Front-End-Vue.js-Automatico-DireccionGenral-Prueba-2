import axios from 'axios';


export async function obtenerDatosConToken(token) {
  try {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJOb21icmVfVXN1YXJpbyI6IlByb2dyYW1hY2lvblEiLCJDb3JyZW9fRWxlY3Ryb25pY28iOiJwcm9ncmFtYWNpb25ALmdtYWlsIiwiQ29udHJhc2VuYSI6IlByb2dyYW1hY2lvblEiLCJOdW1lcm9fVGVsZWZvbmljb19Nb3ZpbCI6IjEyMzQ1Njc4OTkifQ.HgqCAey90hU2klU90K8yRs5HpyzFsCjXrK3CTx2oIjc"

    const response = await axios.get('https://renderbackend-dwke.onrender.com/cirugias/', {
      headers: {
        
        'Authorization': `Bearer ${token}`  // Incluye el token en los encabezados
      }
    });
    
    return response.data;  // Maneja la respuesta según lo necesites
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    throw error;  // Maneja el error adecuadamente
  }
}
