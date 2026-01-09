import {init, i} from '@instantdb/react';

const schema = i.schema({
    entities: {
        interactions: i.entity({
            type: i.string(), // 'like' | 'emoji' | 'comment'
            imageId: i.string(),
            payload: i.string(),
            username: i.string(),
            userColor: i.string(),
            timestamp: i.number(),
        }),
    },
});


export const db = init({ appId: "9d549577-d0af-4e6b-835a-70a6e518a5c2", schema });