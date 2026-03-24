# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

## Course Audio

Pre-generated Japanese audio lives in Supabase Storage and is indexed by [`public/audio/manifest.json`](/Users/jonirajala/Documents/code/moshimoshi/public/audio/manifest.json). The app preloads only the clips for the active lesson and falls back to browser speech if a clip is missing.

Quick check:

```bash
npm run audio:status
```

Build or refresh the manifest:

```bash
npm run audio:manifest
```

Generate only missing `jf_alpha` clips and upload them:

```bash
npm run audio:generate
```

Useful options:

```bash
npm run audio:status
npm run audio:status -- --lesson=u1-l1 --missing
scripts/.venv/bin/python3 scripts/generate_course_audio.py --dry-run
scripts/.venv/bin/python3 scripts/generate_course_audio.py --lesson u1-l1
scripts/.venv/bin/python3 scripts/generate_course_audio.py --force
```

Upload requires `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`. The bucket defaults to `tts-audio` and can be changed with `SUPABASE_TTS_BUCKET`.

Storage object keys are deterministic: `VOICE/CLIP_ID.wav`, where `CLIP_ID` is a stable hash of the normalized Japanese text. Apply [`supabase-storage-audio.sql`](/Users/jonirajala/Documents/code/moshimoshi/supabase/migrations/supabase-storage-audio.sql) so the bucket is public-read only and uploads remain restricted to the service role used by the generator script.

For local use, the generator also reads `.env.local` first and then `.env` if present:

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
SUPABASE_TTS_BUCKET=tts-audio
```
