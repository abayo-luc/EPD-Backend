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

### Search and filter

For searching and filter all GET all endpoints access the following query params:

- search: which is a text you are trying to search
- Page: page number form 1 to ...
- Limit: which is the size of results to be returned per page

  example: `/sales?page=2&limit=15&search=FAB`

## Authentication

### Login

`POST /authentication/sign-in`

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

`GET /authentication/current`

```source-json
{
    "Content-type": "application/json"
    "Authorization":{{TOKEN}}
}
```

## Users

### Create a new user

`POST /users` (for admin)

`POST /companies/:companyId/users` (for supervisor)

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

`GET /users` (for admin)

`GET /companies/:companyId/users` (for supervisor)

```source-json
{
    "Content-type": "application/json"
    "Authorization":{{TOKEN}}
}
```

### Get one users

`GET /users/:id` (for admin and owner)

`GET /companies/:companyId/users/:id` (for supervisor)

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

# Sales

### Get all sales

`GET /sales` (for only admins)

```source-json
{
    "Content-type": "application/json",
    "Authorization":{{TOKEN}}
}
```

### Get all company sales

`GET /companies/:companyId/sales`

### Get all agent sales

`GET /companies/:companyId/`
