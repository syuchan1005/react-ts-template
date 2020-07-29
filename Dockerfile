FROM node:12.13.0-alpine as build

COPY . /build

WORKDIR /build

RUN apk add --no-cache python build-base \
    && npm i && npm run build \
    && mkdir /work \
    && mkdir /work/src \
    && mv dist/ /work/ \
    && mv node_modules/ /work/ \
    && cp -r /work/dist/client /work/public/ \
    && mv src/server/ /work/src/server/ \
    && mv package.json /work/ \
    && mv package-lock.json /work/

FROM node:12.13.0-alpine

LABEL maintainer="__replace__"
LABEL name="__replace__"

ENV PORT=80
EXPOSE 80

COPY --from=build /work /work

WORKDIR /work

ENTRYPOINT ["npm", "run", "start"]