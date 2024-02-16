const texto = 'lse,"isDiscussion":false,"threadGroupUrlName":"xbox-one-x","imageUrls":{"avatar.avatar_web_square_38":"\/thread_groups\/raw\/avatar\/121_1\/re\/38x38\/qt\/70\/121_1.jpg","avatar.avatar_web_square_38_2x":"\/thread_groups\/raw\/avatar\/121_1\/re\/76x76\/qt\/70\/121_1.jpg"}}]}},"themedEvent":null,"pagination":{"currentPage":1,"lastPage":334,"nex';
const palabraClave = /lastPage":(.*?),/; // Utiliza / / para definir la expresión regular
const match = texto.match(palabraClave); // Usa match() para buscar coincidencias

if (match) {
    console.log("El contenido es :", match[1]); // match[1] contiene el texto capturado entre paréntesis
} else {
    console.log("La palabra clave no se encontró en el texto.");
}



// JSON como cadena
var jsonString = '{"nombre": "Juan", "apellido": "Pérez", "edad": 30}';

// Analizar el JSON para convertirlo en un objeto JavaScript
var objetoJSON = JSON.parse(jsonString);

// Acceder a las propiedades del objeto JSON
console.log("Nombre: " + objetoJSON.nombre);
console.log("Apellido: " + objetoJSON.apellido);
console.log("Edad: " + objetoJSON.edad);

