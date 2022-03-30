## Docker Stack

### production deploy

```
docker stack deploy -c docker-compose.yml gn-cp-api --prune --with-registry-auth
```

### remove

```
docker stack remove gn-cp-api
```

### local deploy

```
docker stack deploy -c docker-compose-local.yml mystack
```

### local stack service remove

```
docker stack rm mystack
```

## [minIO SDK](https://docs.min.io)

- Javascript: <https://docs.min.io/docs/javascript-client-quickstart-guide.html>

## 배포하기

