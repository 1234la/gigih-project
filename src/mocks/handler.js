import { rest } from 'msw';
import dataAPI from './dataAPI';

export const handler = [
    rest.get("https://api.spotify.com/v1/search:q:type", (req, res, ctx)=> { return res(ctx.status(200), ctx.json(dataAPI));
    }),
  ];
