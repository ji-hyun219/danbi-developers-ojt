  
## Making certificate authority

```
openssl genrsa -out danbi.key 2048
openssl req -new -x509 -days 36000 -key danbi.key -out danbi.crt
```

- Country Name: `KR`
- State or Province Name: `Seoul`
- Locality Name: `Seoul`
- Organization Name: `Danbi`
- Organization Unit Name: `Development`
- Common Name (**domain name**): `localhost`
- Email Address: `ec.park@danbicorp.com`

## Making Server certificate

```
openssl genrsa -out server.key 2048
openssl req -new -out server.csr -key server.key
```
- Country Name: `KR`
- State or Province Name: `Seoul`
- Locality Name: `Seoul`
- Organization Name: `Danbi`
- Organization Unit Name: `Development`
- Common Name (**domain name**): `localhost`
- Email Address: `ec.park@danbicorp.com`
- Password: `eksql123`

```
openssl x509 -req -in server.csr -CA danbi.crt -CAkey danbi.key -CAcreateserial -out server.crt -days 36000
openssl verify -CAfile danbi.crt server.crt
```

## Making Client certificate

same with [Making Server certificate](#making-server-certificate)