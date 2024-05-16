// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'VueAI.tools',
    },
  },
  devtools: { enabled: true },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/variables.scss";',
        },
      },
    },
  },
  css: [
    'assets/base.css',
    'assets/utils.css',
    'primeflex/primeflex.css',
    'assets/theme/themes/material/material-dark/standard/indigo/theme.scss',
    'primeicons/primeicons.css',
  ],
  imports: {
    dirs: ['composables/stores/**'],
  },
  modules: ['@pinia/nuxt', 'nuxt-primevue', 'nuxt-security', '@nuxt/eslint'],
  primevue: {
    usePrimeVue: true,
    options: {
      ripple: true,
      inputStyle: 'filled',
    },
    cssLayerOrder: 'reset, primevue',
    components: {
      include: [
        'Button',
        'DataTable',
        'Menubar',
        'InputText',
        'Textarea',
        'Password',
        'Dialog',
        'ConfirmDialog',
        'ProgressSpinner',
        'TabMenu',
        'SelectButton',
        'Message',
        'Checkbox',
        'Toast',
        'Card',
        'Menu',
        'PanelMenu',
        'Sidebar',
        'Divider',
        'InputOtp',
        'Card',
      ],
    },
  },
  security: {
    headers: {
      crossOriginEmbedderPolicy: false,
      contentSecurityPolicy: {
        'script-src': [
          "'self'",
          'https:',
          "'unsafe-inline'",
          "'unsafe-eval'",
          "'strict-dynamic'",
          "'nonce-{{nonce}}'",
        ],
      },
    },
    xssValidator: false,
  },
  runtimeConfig: {
    // The private keys which are only available server-side
    openaiOrganization: 'org-AB12',
    openaiApiKey: 'sk-CD34',
    lemonsqueezyWebhookSecret: 'ab12',
    lemonsqueezyApiKey: 'ab12',
    sendgridApiKey: 'SG.12ab',
    public: {
      environment: 'dev',
      publicFolderUrl: 'http://localhost:3000/_nuxt',
      lemonsqueezyBasicSubKey: 'ab12',
    },
  },
});
