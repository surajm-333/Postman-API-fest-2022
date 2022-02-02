# F.A.B. Library
F.A.B. (Find Any Book) library is an API developed for users to download any book of their choice just within few clicks. It is a safe and secure platform for book lovers, students, teachers, professionals and any other person who wants to download a book.

This repository contains code of the API developed using Postman suring the Postman API Fest 2022.<br />
The APIs are deployed [here](https://library-books-api.herokuapp.com/ "F.A.B. Library API")


Presentation of F.A.B Library: [here](https://drive.google.com/file/d/1LGn8qGB9_W4khaAYSt5SF5UV73eARm9v/view?usp=sharing/ "Presentation")

# Achievements --
<img src="https://github.com/surajm-333/Postman-API-fest-2022/blob/main/backend/postman-apifest-top10.png"/>

# API EndPoints --
1. /api/books -- Fetch All Books from the Database [GET] <br />
2. /api/bookbysearch -- Fetch all the books with keyword for Book Name,Author or Genre of Book [GET] <br />
3. /api/admin/book/:userId -- Post the book info in database in body of req [POST] <br />
4. /api/admin/update -- Update the Book Info [POST] <br />
5. /api/admin/delete -- Delete the book from database [DELETE] <br />
5. /login -- For Login the user [POST] <br />
6. /signup -- For User Sign Up [POST] 

About Folder -- 
BookShelf/server.js and Bookshelf/controller/auth.js contains all APIs
BookShelf/models contains all the Database Schemas (User and Books)
# Demo --
Signup:
<img src="https://github.com/surajm-333/Postman-API-fest-2022/blob/main/backend/postman-demo-1.png"/>
Login:
<img src="https://github.com/surajm-333/Postman-API-fest-2022/blob/main/backend/postman-demo-2.png"/>
