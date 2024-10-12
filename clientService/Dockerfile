# Dockerfile
FROM node:14

# Define o diretório de trabalho
WORKDIR /usr/src/app

# Copia os arquivos de package.json e package-lock.json
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o código-fonte para o contêiner
COPY . .

# Expõe a porta em que a aplicação vai rodar
EXPOSE 3002

# Comando para iniciar a aplicação
CMD ["npm", "index.js"]
