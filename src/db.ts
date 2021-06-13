import {Sequelize, Error} from 'sequelize';

import { POSTGRES_DB, POSTGRES_PORT, POSTGRES_HOST, POSTGRES_PASSWORD, POSTGRES_USER } from './common/config';

// database username   password
const sequelize = new Sequelize(POSTGRES_DB!, POSTGRES_USER!, POSTGRES_PASSWORD!, {
    port: parseInt(POSTGRES_PORT!, 10),
    host: POSTGRES_HOST,
    dialect: 'postgres'
})

sequelize.authenticate().then(
    () => {
        console.log("Connected to DB");
    },

    (err: Error) => {
        console.log(`Error: ${err}`);
    }
)

export default sequelize;