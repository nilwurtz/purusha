FROM node:14-slim

RUN apt update && \
    apt install -y --no-install-recommends git

WORKDIR /app
COPY . app
CMD [ "/bin/bash" ]