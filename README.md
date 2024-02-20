### finalproject

By Ana del Río


# READ TOGETHER 📕📗📙

## Summary

This web application will allow users to share, explore books and participate in book clubs. With an intuitive interface, it will encourage social interaction around a passion for reading, creating a community and facilitating the exchange of literary ideas.


![](https://media4.giphy.com/media/3otPonSG56cvNy9BNm/giphy.gif?cid=ecf05e47gvggq50e2f9prkuop2kzvw28umn3atjnaujhutd5&ep=v1_gifs_related&rid=giphy.gif&ct=g)


## Functional Description

### Use Cases

- search books
- add book
- add post
- toggle like
- add review to post 
- save book to your list (read, want to read, reading)


## Views

Home: 
- Search books
- Add book to your list (read, want to read, reading)
- Add friends (¿?)
- Make like
- Comments other's users comments (reviews, 
- exchange intention)

My list book
- See list: want to read,
- See list: Read
- See list:Saved
- Search books

Upload
- Add books in our DDBB
    - Scan books (react)
- Upload post
- Search books

Profile: 
- My profile
- Change details users (password, user name)
- View my books

Reading club (version II)
- Novel
- Hystoric
- Clasics 
- Science fiction / fantasy
- Change books 

    
## Technical Description

- Frontend: HTML, CSS, javascript, react, vite
- Backend: nodejs, express
- DDBB: mongodb
- Testing: mocha and chai

### Data Model

User
- id (string)
- name (string)
- email (string)
- password (string)

Book
- id (string)
- title (string)
- author (string)
- year (number)
- publisher (string)
- category (string, enum: ...))
- isbn (string)

Post
- user (User.id)
- book (Book.id)
- likes (array of User.id)

Review
- user (User.id)
- post (Post.id)
- comment (string, required)
- mark (number, enum : 1,2,3,4,5)
- date (date)


