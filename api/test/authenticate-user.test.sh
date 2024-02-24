source pepetest.sh

TEST "authenticate-user"

CASE "success on correct credentials"

curl 'http://localhost:8000/users/auth' \
-H 'Content-Type: application/json' \
-d '{ "email": "josefa@gmail.com", "password": "$2a$08$DV4rlCn73wMUnQhGvIOxWOM7.F.TFunWlBZzyxQF4R8yb7ioTxGYa" }' \
-v


