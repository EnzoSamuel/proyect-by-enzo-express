// Importar las dependencias necesarias
import mysql from 'mysql';  // Para interactuar con MySQL
import express from 'express';  // Framework para crear la API

// Crear una instancia de la aplicación Express
const app = express();

// Usar middleware para procesar JSON en las solicitudes
app.use(express.json());  // Permite manejar datos en formato JSON en el cuerpo de las solicitudes

// Usar middleware para procesar datos codificados en URL (formulario URL-encoded)
app.use(express.urlencoded({ extended: true }));  // Necesario para manejar datos de formularios

// Configurar el puerto en el que el servidor va a escuchar
const PORT = 3000;

// Configurar la conexión a la base de datos MySQL
const connection = mysql.createConnection({
    host: 'localhost',      // Dirección del servidor de la base de datos (localhost)
    user: 'root',           // Usuario para autenticar la conexión
    password: '',           // Contraseña para el usuario (vacío por defecto en muchos entornos)
    database: 'phpmyadmin'  // Nombre de la base de datos con la que se interactuará
});

// Ruta raíz para comprobar que la API está funcionando
app.get('/', (req, res) => {
    res.send('API funcionando correctamente');  // Responde con un mensaje de éxito
});

// Ruta para crear una tabla 'productos' en la base de datos
app.get('/crear-tabla', (req, res) => {
    // Consulta SQL para crear la tabla 'productos'
    const createTableQuery =
    `CREATE TABLE productos (
        id INT AUTO_INCREMENT PRIMARY KEY,  // 'id' es clave primaria y auto-incremental
        nombre VARCHAR(255) NOT NULL,       // 'nombre' no puede ser nulo
        precio DECIMAL(10,2) NOT NULL,      // 'precio' es un número decimal y no puede ser nulo
        descripcion TEXT                   // 'descripcion' es un texto y puede ser nulo
    )`;

    // Ejecutar la consulta para crear la tabla
    connection.query(createTableQuery, (err, results) => {
        if (err) {
            console.error('Error al crear la tabla', err);  // Si hay un error, lo mostramos en la consola
            res.status(500).send('Error al crear la tabla');  // Respondemos con un error 500
        } else {
            console.log('Tabla creada exitosamente');  // Si la creación fue exitosa, lo registramos
            res.send('Tabla creada exitosamente');  // Respondemos con un mensaje de éxito
        }
    });
});

// Ruta para agregar un producto a la tabla 'productos'
app.post('/agregar-producto', (req, res) => {
    // Desestructurar los datos enviados en el cuerpo de la solicitud (req.body)
    const { nombre, precio, descripcion } = req.body;

    // Consulta SQL para insertar un nuevo producto en la base de datos
    const insertQuery = 
    'INSERT INTO productos (nombre, precio, descripcion) VALUES (?, ?, ?)';

    // Ejecutar la consulta con los datos proporcionados
    connection.query(insertQuery, [nombre, precio, descripcion], (err, results) => {
        if (err) {
            console.error('Error al agregar producto:', err);  // Si ocurre un error, lo mostramos en la consola
            res.status(500).send('Error al agregar el producto');  // Respondemos con un error 500
        } else {
            console.log('Producto agregado exitosamente');  // Si la inserción fue exitosa, lo registramos
            res.send('Producto agregado exitosamente');  // Respondemos con un mensaje de éxito
        }
    });
});

// Ruta para obtener todos los productos de la tabla 'productos'
app.get('/productos', (req, res) => {
    // Consulta SQL para seleccionar todos los productos
    const selectQuery = 'SELECT * FROM productos';

    // Ejecutar la consulta y obtener los productos
    connection.query(selectQuery, (err, results) => {
        if (err) {
            console.error('Error al seleccionar productos', err);  // Si hay un error, lo mostramos en la consola
            res.status(500).send('Error al seleccionar productos');  // Respondemos con un error 500
        } else {
            console.log('Productos seleccionados exitosamente');  // Si la consulta fue exitosa, lo registramos
            res.json(results);  // Respondemos con los productos en formato JSON
        }
    });
});

// Iniciar el servidor y hacer que escuche en el puerto configurado
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);  // Mensaje que indica que el servidor está activo
});

// Exportar la aplicación para su uso en pruebas o integración
export default app;
