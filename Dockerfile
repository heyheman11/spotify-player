FROM alpine:3.11.3 as BUILDER

WORKDIR /usr/app/src

COPY . .

RUN apk add --no-cache --update nodejs npm

RUN npm install -g yarn

RUN yarn
RUN yarn build

# FROM nginx:latest

# COPY ./nginx.conf ./nginx.conf

# COPY --from=NODE /usr/app/src/build /nginx/html

# CMD ["nginx", "-g", "dameon"]