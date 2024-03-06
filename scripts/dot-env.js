// import { dotenv } from '../node_modules/dotenv/config'
// import { dotenv } from 'dotenv/config'
// dotenv.config();

require('dotenv').config();
const { mkdirSync, writeFileSync } = require('fs');

const destPath = 'src/environments/environtments.ts';

const fileContent =
`
export const environment = {
  maplibre_key: '${process.env['MAPLIBRE_KEY']}',
  otra: 'PROPIEDAD'
};
`;

mkdirSync('src/environments', { recursive: true });

writeFileSync( destPath, fileContent );

