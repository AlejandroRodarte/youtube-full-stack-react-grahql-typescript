import { MikroORM } from '@mikro-orm/core';
import { Post } from './entities/Post';

import config from './mikro-orm.config';

const main = async () => {

    const orm = await MikroORM.init(config);

    await orm.getMigrator().up();

    // equal to new Post('My first post.'). Does not interact with database.
    // it also invokes the Post constructor
    const post = orm.em.create(Post, { title: 'My first post.' });

    // INSERT into the database
    await orm.em.persistAndFlush(post);

    // same as persistAndFlush, but we do not have access to the returned 'post' object
    // is does NOT invoke the Post constructor: created_at and updated_at fail
    // await orm.em.nativeInsert(Post, { title: 'My second post.' });

    // fetching all posts
    const posts = await orm.em.find(Post, {});
    console.log(posts);

};

main();
