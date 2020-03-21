import React from 'react';
import { decode, encode } from 'base-64'

import Navigator from './routes/routes';

if (!global.btoa) { global.btoa = encode }

if (!global.atob) { global.atob = decode }

export default function App() {
  return (
    <Navigator />
  );
}