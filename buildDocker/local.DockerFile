FROM node:10

COPY ["package.json" , "/usr/local/nodeapps/"]

WORKDIR /usr/local/nodeapps

RUN npm install

COPY ["." ,  "."]

EXPOSE 2049

CMD ["npm" ,"run" ,"local"]