FROM php:8.1-apache as base

# Install dependencies
RUN apt update && apt install -y sqlite3

# Copy page source
COPY ./class /var/www/html

# Apache config file
COPY ./DockerFiles/apache2.conf /etc/apache2/apache2.conf

# Create folder for setup scripts
RUN mkdir /scripts
COPY ./DockerFiles/setup.php /scripts

# Create DB file
RUN cd /var/www/html/db && sqlite3 class.db < SQL/SETUP.sql

# Setup DB
RUN php /scripts/setup.php

# Setup the web server
RUN a2enmod rewrite
RUN chown www-data:www-data -R /var/www/html
