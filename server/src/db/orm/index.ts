import { MikroORM } from '@mikro-orm/core';

import config from './mikro-orm.config';
import { CreateConnectionTuple } from '../../types/db/orm';

const createConnection = async (): Promise<CreateConnectionTuple> => {
    try {
        const orm = await MikroORM.init(config);
        await orm.getMigrator().up();
        return [orm, undefined];
    } catch (e) {
        return [undefined, e];
    }
};

export default createConnection;
