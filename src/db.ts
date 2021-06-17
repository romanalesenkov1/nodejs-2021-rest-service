import { createConnection } from 'typeorm';
import config from './common/ormconfig';

const init = () => {
  createConnection(config)
    .then(() => console.log('Connected to DB'))
    .catch((e) => console.error(e, 'Failed to connect to DB'));
};

export default { init };
