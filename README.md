# freja

A microservice for the swedish swish payment method

## Setup

### Certs

* Add certificates from swish in a folder called cert/ in the code root
* run `openssl rsa -in private.key -text > private.pem` to convert the .key to a .pem (Deno only support .pem encoded certs)
