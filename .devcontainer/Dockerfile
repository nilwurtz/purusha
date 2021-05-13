FROM node:14-slim

RUN apt update && \
    apt install -y --no-install-recommends git ssh

WORKDIR /app
COPY . app
CMD [ "/bin/bash" ]