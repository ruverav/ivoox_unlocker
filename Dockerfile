FROM node
COPY app/ /app/
RUN cd /app && npm install -y
CMD cd /app && npm start
EXPOSE 3000