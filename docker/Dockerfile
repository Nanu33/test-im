FROM nginx:1.22.1
RUN rm -rf /etc/nginx/conf.d/default.conf
COPY default.conf /etc/nginx/conf.d/default.conf
RUN apt-get autoremove
RUN apt-get --purge remove
RUN apt-get update 
RUN apt-get --fix-broken install
RUN apt-get install -y nginx-extras
RUN rm -rf /etc/nginx/nginx.conf
COPY nginx.conf /etc/nginx/nginx.conf
COPY build /var/www/html
RUN cd /var/www/html && mkdir root_folder
