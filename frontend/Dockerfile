FROM node:14.4.0 as build
WORKDIR /home/node/app
COPY ./ /home/node/app
RUN npm install
RUN npm run build-production

FROM nginx:1.20.0
RUN rm -f /etc/nginx/conf.d/*
COPY --from=build /home/node/app/build /var/www
COPY ./nginx.conf /etc/nginx/conf.d/
CMD /usr/sbin/nginx -g 'daemon off;' -c /etc/nginx/nginx.conf