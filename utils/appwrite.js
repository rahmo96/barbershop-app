import { Client, TablesDB, Account } from "react-native-appwrite";

const client = new Client();
client
    .setEndpoint('https://fra.cloud.appwrite.io/v1')
    .setProject('68af96cc0021b43f6c90')   // Your Project ID
    .setPlatform('dev.barbershop.app');

export const account = new Account(client);
export const tablesDB = new TablesDB(client);
