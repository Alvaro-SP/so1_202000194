FROM node:14 as build-stage
WORKDIR /app
# Copy the package.json file
COPY ["package.json", "package-lock.json*", "./"]
# Install the dependencies
RUN npm install
COPY . .
# Build the React application
RUN npm run build
EXPOSE 3000
# Start the application when the container is started
CMD [ "npm", "start" ]