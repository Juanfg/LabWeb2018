# we use debian jessie as our base distro for this container
FROM debian:jessie

# Refresh apt-get
RUN apt-get update

# Install some utilities needed by node, npm , and ZeroMQ
RUN apt-get install -y curl make g++

# Install node.js and npm
RUN curl -SL https://deb.nodesource.com/setup | bash - 
RUN apt-get install -y nodejs

# Install required rmp packages
ADD package.json /package.json 
RUN npm install

# Set /src as the working directory for this container
WORKDIR /src

# Open up external access to port 80
EXPOSE 8080

# Run startup command
CMD ["node", "/src/server.js"]
