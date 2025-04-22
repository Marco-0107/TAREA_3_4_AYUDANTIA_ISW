import { DataSource } from "typeorm";
import { DATABASE, DB_USERNAME, PASSWORD, HOST } from "./configEnv.js";

export const appDataSource = new DataSource({
    type: 'postgres',
    host: `${HOST}`,
    port: `5432`,
    username: `${DB_USERNAME}`,
    password: `${PASSWORD}`,
    database: `${DATABASE}`,
    entities: ['src/entity/**/*.js'],
    logging: false,
    synchronize: true
});

export async function connectDB() {
    try {
        await appDataSource.initialize();
        console.log("Conexion a la base de datos exitosa");
    } catch (error) {
        console.error("Ocurrio un error en: ", error);
    }
}