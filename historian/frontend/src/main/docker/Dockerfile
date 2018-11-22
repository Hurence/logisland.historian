#########################
### build environment ###
#########################

# base image
FROM node:8.12.0 as builder

# set working directory
RUN mkdir /usr/src/app
WORKDIR /usr/src/app

# add `/usr/src/app/node_modules/.bin` to $PATH, not sure this is usefull but make sure of that before removing
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# add app
COPY . /usr/src/app
RUN yarn install

# generate build
RUN yarn build

##################
### production ###
##################

# base image
FROM nginx:1.13.9-alpine

# copy artifact build from the 'build environment'
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html
COPY src/main/docker/nginx.conf /etc/nginx/conf.d/default.conf

# expose port 80
EXPOSE 4200

# run nginx
CMD ["nginx", "-g", "daemon off;"]
