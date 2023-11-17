import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  root:"./src/pages",
  
  server:{
    host:true,
  },

  build:{
    outDir:'../../dist',
    sourcemap: true,
    rollupOptions:{
      input: {
        main: './src/pages/index.html',
        login: './src/pages/login/index.html',
        pagamento: './src/pages/pagamento/index.html',
        
        cadastro: './src/pages/cadastro/index.html',
        cadastroPessoaFisica: './src/pages/cadastro/fisica/index.html',      
        cadastroPessoaParceira: './src/pages/cadastro/parceiro/index.html',      
        cadastroPessoaJuridica: './src/pages/cadastro/juridica/index.html',      
      }
    }
  },

  
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@assets":path.resolve(__dirname, "./src/assets")
    },
  },
});
