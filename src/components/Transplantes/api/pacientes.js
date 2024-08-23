async function obtenerPersonas() {
    return new Promise((resolve, reject) => {
        fetch("https://privilegecare-deploy-gqmt.onrender.com/persons/")
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Error al obtener las personas");
                }
                return res.json();
            })
            .then((personas) => {
                resolve(personas);
            })
            .catch((error) => {
                console.error("Error al enviar la petición de personas al servidor: " + error);
                reject(error);
            });
    });
}


export { obtenerPersonas }