# Welcome to FOOD APP API!

Hello ! This project is built on express JS framework.

# Package
I am use many package for this project:
1. express
2. bcrypt
3. body-parser
4. cors
5. dotenv
6. express-validator
7. helmet
8. jsonwebtoken
9. multer
10. pg
11. xss-clean
12. eslint  

# Database 
users
1. id 
2. photo
3. name
4. email
5. phone
6. password
7. level = 0: admin, 1: customer
8. is_active = 0: not active, 1: active

recipe
 1. id
 2. photo
 3. title
 4. ingredients
 5. video
 6. date
 7. user_id
 8. is_active = 0: not active, 1: active

comment
 1. id
 2. recipe_id
 3. comment
 4. user_id
