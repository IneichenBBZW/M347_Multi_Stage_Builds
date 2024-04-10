FROM node:18 as builder
RUN npm i -g --save @vue/cli
WORKDIR /src/vue
COPY terminkalender/package* /src/vue/
RUN chown -R node:node /src
USER node
RUN npm install
COPY terminkalender/ /src/vue/
RUN npm run build
CMD [ "npm", "run", "serve" ]

FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY --from=builder /src/vue/dist/ .
EXPOSE 80
# Der HEALTHCHECK gibt rasch Auskunft über den Status des Containers.
# Sie könnten hier curl oder wget verwenden,um die eigens angelegte Route auf dem API-Server zu überprüfen.
HEALTHCHECK --interval=10s --timeout=3s CMD wget -O - \
  http://localhost:80/ || exit 1

