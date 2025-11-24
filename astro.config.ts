// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
    redirects: {
        '/': '/cpu',
    },

    output: 'server',
    integrations: [react()],
    adapter: netlify(),
});
