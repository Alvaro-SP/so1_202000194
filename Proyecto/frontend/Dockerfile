FROM node:18.14.0-buster-slim
ENV REACT_APP_BACKEND='34.72.220.209'
# Copy app
COPY . /opt/app

WORKDIR /opt/app

# Npm install
RUN npm install

RUN npm run build

RUN npm install -g serve


# Container Startup
CMD ["serve", "-s", "build"]

#! sudo docker build -t proy1_frontend . --force-rm --no-cache
#! sudo docker run  -p 3000:80 proy1_frontend