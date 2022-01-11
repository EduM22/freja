# freja

A microservice for the swedish swish payment method

## Setup

### Certs

- run `openssl rsa -in private.key -text > private.pem` to convert the .key to a
  .pem (Deno only support .pem encoded certs)

- convert the certs to bas64 encoded strings and add them to the .env file
