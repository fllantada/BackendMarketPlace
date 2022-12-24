import dotenv from "dotenv";

dotenv.config();

export default {
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || "mysecret",
  sessionConfig: {
    secret: process.env.SESSION_SECRET || "my secret key", // Clave secreta para cifrar la información de sesión
    resave: false, // No guardar la sesión si no ha cambiado
    saveUninitialized: false, // No guardar la sesión si no ha sido inicializada
    cookie: {
      secure: true, // Solo enviar la cookie de sesión a través de una conexión segura HTTPS
      maxAge: 1000 * 60 * 60, // Caducidad de la cookie en una hora
    },
    userId: null,
  },
};
