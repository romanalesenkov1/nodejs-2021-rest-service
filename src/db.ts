import {createConnection} from "typeorm";

import { POSTGRES_DB, POSTGRES_PORT, POSTGRES_HOST, POSTGRES_PASSWORD, POSTGRES_USER } from './common/config';


const init = () => {
    createConnection({
        type: 'postgres',
        host: POSTGRES_HOST,
        port: parseInt(POSTGRES_PORT!, 10),
        username: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
        database: POSTGRES_DB,
        name: 'postgres'
    })
        .then(()=>console.log('Connected to DB'))
        .catch((e)=>console.error(e, 'Failed to connect to DB'))
}

export default {init};