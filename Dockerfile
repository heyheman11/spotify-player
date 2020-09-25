FROM alpine:3.11.3 as BUILDER

WORKDIR /usr/app/src

COPY . .

RUN apk add --no-cache --update nodejs npm

RUN npm install -g yarn

RUN yarn
RUN yarn build

FROM nginx:latest

COPY ./nginx.conf /etc/nginx/nginx.conf

COPY --from=BUILDER /usr/app/src/dist/ /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]