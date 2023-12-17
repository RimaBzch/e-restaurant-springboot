FROM  node:14.20

RUN  mkdir /resto-front
WORKDIR  /resto-front

COPY . . 
RUN  npm install -g @angular/cli
RUN yarn install
CMD ["ng", "serve", "--host", "0.0.0.0"]