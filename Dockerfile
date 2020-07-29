FROM node:12.13.0-alpine as build

COPY . /build

WORKDIR /build

RUN apk add --no-cache python build-base \
    && npm ci && npm run build \
    && mkdir /work \
    && mkdir /work/src \
    && mv dist/ /work/ \
    && mv node_modules/ /work/ \
    && cp -r /work/dist/client /work/public/ \
    && mv src/server/ /work/src/server/ \
    && mv .sequelizerc /work/ \
    && mv scripts/ /work/scripts \
    && mv package.json /work/ \
    && mv package-lock.json /work/

FROM node:12.13.0-alpine

LABEL maintainer="__replace__"
LABEL name="__replace__"

ENV PORT=80
EXPOSE 80

WORKDIR /work

COPY --from=build /work /work

COPY docker-entrypoint.sh /work

RUN chmod +x docker-entrypoint.sh

ENTRYPOINT ["/work/docker-entrypoint.sh"]