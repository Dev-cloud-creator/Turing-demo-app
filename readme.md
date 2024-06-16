
## Installation

Download postgresql from https://www.enterprisedb.com/download-postgresql-binaries (16.3)

Init the DB:

```cmd
  initdb.exe -D ../../../database -U postgres -A trust -E UTF8
```

Start DB:

```cmd
  pg_ctl.exe start -D ../../../database
```

Setup admin pwd:

```cmd
  psql.exe –U postgres -c "ALTER USER postgres WITH PASSWORD 'youradminpwd';"
```

Stop the DB (optional and when needed):

```cmd
  pg_ctl.exe stop -D ../../../database
```

Setup DB and seed admin:

```cmd
  set PGPASSWORD=youradminpwd && psql.exe –U postgres -c "CREATE DATABASE turingapp;" 
  set PGPASSWORD=youradminpwd && psql.exe –U postgres -d turingapp -a -f "<your-path-to-folder>\DbScripts\setup_schema_and_users.sql"
  set PGPASSWORD=youradminpwd && psql.exe –U postgres -d turingapp -a -f "<your-path-to-folder>\DbScripts\grant_permissions.sql"
```

Setup project:

```cmd
  npm install
  node .\build\index.js
```
--OUTPUT: API started at http://localhost:3000


Run Tests:

Import Postman environment and collection for functional tests:

Environments: <your-path-to-folder>\Functional_Tests\tuu_test.postman_environment.json

Collection: <your-path-to-folder>\Functional_Tests\tuu.postman_collection.json
