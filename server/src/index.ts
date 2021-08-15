import createConnection from './db/orm';
import { Post } from './db/orm/entities/Post';

const main = async (): Promise<Error | undefined> => {

    const [orm, error] = await createConnection();
    if (typeof orm === 'undefined') return error;

    const posts = await orm.em.find(Post, {});
    console.log(posts);

    return undefined;

};

main().then((error) => {
    if (error) console.log(error)
});
