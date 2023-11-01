import { defineConfig } from 'vite';
import imagemin from 'unplugin-imagemin/vite';

export default defineConfig(({ command, mode }) => ({
    base: '',
    css: {
        preprocessorOptions: {
          // Specify the entry point to your main CSS file
          // Adjust the path according to your project structure
          // For example, if your CSS file is in src/css/styles.css
          // then use: `src/css/styles.css`
            module: './src/css/style.css',
        },
    },
    plugins: [
        imagemin()
    ]
}));