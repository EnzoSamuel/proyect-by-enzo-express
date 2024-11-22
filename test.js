// Importar las dependencias necesarias para las pruebas
import * as chai from 'chai';        // Chai es una librería de aserciones para pruebas (comprobaciones)
import supertest from 'supertest';    // Supertest es una librería para hacer solicitudes HTTP en las pruebas
import chaiHttp from 'chai-http';     // Plugin de Chai para realizar pruebas HTTP
import app from './index.js'          // Importar la aplicación Express desde el archivo 'index.js'

// Usar el plugin de Chai para manejar solicitudes HTTP
chai.use(chaiHttp);

// Crear un agente de Supertest para interactuar con la aplicación
const request = supertest.agent(app);

// Iniciar la suite de pruebas para la API
describe('API Tests', () => {

    // Test para la ruta POST /agregar-producto
    it('Debería agregar un nuevo producto', (done) => {
        // Definir los datos del nuevo producto a agregar
        const newProduct = {
            nombre: 'Nuevo Producto',
            precio: 19.99,
            descripcion: 'Descripción del nuevo producto'
        };

        // Realizar una solicitud POST a la ruta '/agregar-producto' y enviar los datos del nuevo producto
        request
            .post('/agregar-producto')  // Ruta a probar
            .send(newProduct)           // Enviar los datos del producto en el cuerpo de la solicitud
            .end((err, res) => {        // Al finalizar la solicitud, verificar la respuesta
                // Verificar que el código de estado HTTP sea 200 (OK)
                chai.expect(res).to.have.status(200);
                // Verificar que la respuesta del servidor sea el mensaje de éxito esperado
                chai.expect(res.text).to.equal('Producto agregado exitosamente');
                done();  // Llamar a done() para indicar que la prueba ha terminado
            });
    });

    // Test para la ruta GET /productos
    it('Debería obtener todos los productos', (done) => {
        // Realizar una solicitud GET a la ruta '/productos' para obtener todos los productos
        request
            .get('/productos')  // Ruta a probar
            .end((err, res) => {  // Al finalizar la solicitud, verificar la respuesta
                // Verificar que el código de estado HTTP sea 200 (OK)
                chai.expect(res).to.have.status(200);
                // Verificar que la respuesta sea un array (de productos)
                chai.expect(res.body).to.be.an('array');
                done();  // Llamar a done() para indicar que la prueba ha terminado
            });
    });
});
