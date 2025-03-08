## Routes

### Error object

This will be the object returned on any errors

```
{
    message: "You messed up"
}
```

- `auth/login`
  POST
- Req:
  ```
      {
          email: foo@email.com,
          password: password
      }
  ```
- Res:

  ```
      {
          id: int,
          fullName: string,
          email: string,
          password: string
      }
  ```

- `api/dashboard/expiringLeases`  
   GET
- Req:

  ```

  ```

- Res

  ```
  [{
    id: int,
    apt_num: string,
    tenant_id: string,
    first_name: string,
    last_name: string,
    landlord_id: int,
    lease_start_date: date,
    lease_end_date: date,
    renewal_term: string,
    status: string,
    notes: string,

  }]
  ```
