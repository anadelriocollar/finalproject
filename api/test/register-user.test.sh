source pepetest.sh 

TEST "register-user"

CASE "success on new user"

curl 'http://localhost:8000/users' \
-H 'Content-Type: application/json' \
-d '{ "name":"Alcachofa", "email": "alcachofa@gmail.com", "password": "123123123" }
' \
-v 

# with the header -v I ask it to show me the return of the call 
# with the header H I ask for the type of data that I am going to send 

CASE "fail on already existing user"

curl 'http://localhost:8000/users' \
-H 'Content-Type: application/json' \
-d '{ "name":"Alcachofa", "email": "alcachofa@gmail.com", "password": "123123123" }
' \
-v