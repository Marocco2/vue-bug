import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import vue from '@astrojs/vue';

import image from "@astrojs/image";

import NetlifyCMS from 'astro-netlify-cms';

// https://astro.build/config
export default defineConfig({
  integrations: [NetlifyCMS({
    disableIdentityWidgetInjection: true,
    adminPath: '/backyard',
    previewStyles: [
      // Path to a local CSS file, relative to your project’s root directory
      'src/styles/blog.css',
      'src/styles/preview.css',
    ],
    config: {
      locale: 'it',
      site_url: `https://example.com`,
      media_folder: '/public/assets/blog',
      public_folder: '/assets/blog',
      publish_mode: 'editorial_workflow',
      backend: {
        name: 'test-repo',
      },
      collections: [
        // Content collections
        {
          name: 'articoli',
          label: 'Articoli',
          label_singular: 'Articolo',
          folder: 'src/pages/articoli',
          identifier_field: 'title',
          path: '{{category}}/{{slug}}',
          preview_path: 'articoli/{{dirname}}/{{filename}}',
          media_folder: '{{media_folder}}',
          public_folder: '{{public_folder}}',
          create: true,
          delete: false,
          slug: "{{slug}}",
          fields: [
            { name: 'category', widget: 'select', label: "Categoria articolo", options: [
              { label: "Formula 1", value: "f1" },
              { label: "MotoGP", value: "motogp" },
              { label: "SBK", value: "sbk" },
            ]},
            { name: 'layout', widget: 'hidden', default: "@layouts/BlogPost.astro", label: "Layout articolo" },
            { name: 'title', widget: 'string', label: "Titolo articolo" },
            { name: 'description', widget: 'text', label: "Sottotitolo articolo" },
            { name: 'author', widget: 'string', label: "Autore articolo" },
            { name: 'publishDate', widget: 'datetime', format: 'DD MMM YYYY', date_format: 'DD MMM YYYY', time_format:false, label: "Data pubblicazione articolo" },
            { name: 'heroImage', widget: 'object', label: "Impostazioni copertina", fields: [
              { name: 'src', widget: 'image', label: "Percorso immagine copertina articolo", default: "/assets/blog/introducing-astro.jpg", allow_multiple: false, choose_url: false},
              { name: 'alt', widget: 'string', label: "Descrizione testuale della copertina articolo" },
              { name: 'altLink', widget: 'string', label: "Sorgente della copertina articolo" }, 
            ]},
            { name: 'body', widget: 'markdown', label: "Corpo articolo" },
          ],
        },
      ],
    },
  }), 
  preact(), 
  vue(),
  image({
    serviceEntryPoint: '@astrojs/image/sharp'
  }), ],
  site: `https://example.com`,
  output: 'static',
});