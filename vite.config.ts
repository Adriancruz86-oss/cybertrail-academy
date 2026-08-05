import { defineConfig } from 'vite'

export default defineConfig({
  base: '/cybertrail-academy/',
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['tests/**/*.test.ts']
  }
})
