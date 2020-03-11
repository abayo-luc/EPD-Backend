# edp-backend

Project description [link](https://docs.google.com/document/d/1vHg6q6T6Nu9dptnJ1wEv_xnpK6Cj_QO9nqJz_uKYIPs/edit?usp=sharing)

# Links

- EDP API:
  - [Staging](https://edp-backend-staging.herokuapp.com/api)
  - [Production](#)
- EDP Frontend:
  - [GitHub-repo](https://github.com/NkFab/EPD-Front)
  - [Wep App](#)

# API Endpoints

## Authentication

### Login

`POST /users/authenticate/sign-in`

```source-json
{
    "Content-type": "application/json"
    "body":{
        "phoneNumber":"0789374675",
        "password":"string345"
    }
}
```

### Current user

`GET /users/authenticate/current`

```source-json
{
    "Content-type": "application/json"
    "Authorization":{{TOKEN}}
}
```

## Users

### Create a new user

`POST /users`

```source-json
{
    "Content-type": "application/json"
    "Authorization":{{TOKEN}}
    "body":{
        "username":"abayo",
        "password":"password",
        "phoneNumber":"0789277287",
        "companyId":"6faa1986-d9c9-42ab-a40e-477c1124581f"
    }
}
```

### Get all users

`GET /users`

```source-json
{
    "Content-type": "application/json"
    "Authorization":{{TOKEN}}
}
```

### Get one users

`GET /users/:id`

```source-json
{
    "Content-type": "application/json",
    "Authorization":{{TOKEN}}
}
```

### Update user

`PUT /users/:id`

```source-json
{
    "Content-type": "application/json",
    "Authorization":{{TOKEN}}
    "body":{
        "name":"Luc Abayo",
        "username":"abayo_luc",
        "email":"me@gexample"
    }
}
```

### Update password

`PUT /users/:id/passwords`

```source-json
{
    "Content-type": "application/json",
    "Authorization":{{TOKEN}}
    "body":{
       "password":"new-password"
    }
}
```

# Company

### Create a new company

`POST /companies`

```source-json
{
    "Content-type": "application/json"
    "Authorization":{{ADMIN_TOKEN}}
    "body":{
        "name":"123 Inc.",
        "email":"info@123inc.com",
        "address":"KG 11 Av",
        "phoneNumber":"0789277275"
    }
}
```

### Get all companies

`GET /companies`

```source-json
{
    "Content-type": "application/json"
    "Authorization":{{TOKEN}}
}
```

### Get one company

`GET /company/:id`

```source-json
{
    "Content-type": "application/json",
    "Authorization":{{TOKEN}}
}
```

### Update company

`PUT /companies/:id/passwords`

```source-json
{
    "Content-type": "application/json",
    "Authorization":{{TOKEN}}
    "body":{
        "name":"EDP Ltd",
        "email":"info@edp.com",
        "address":"GG 11 St",
        "phoneNumber":"0789866365"
    }
}
```

### Delete company

`DELETE /companies/:id`

```source-json
{
    "Content-type": "application/json",
    "Authorization":{{TOKEN}}
}
```
