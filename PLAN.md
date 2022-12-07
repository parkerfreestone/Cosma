# COSMA (Completely Original Social Media App)

COSMA is a completely original, never conceived social media app where
users can share what's really on their mind. Heavily inspired by current, yet
inferior apps like twitter, and TRUTH Social.

> Note this design doc is not comprehensive documentation, simply a plan for me to follow in the beginning... (I won't update it often)

## Requirements

- [ ] User can log in and view their profile.
- [ ] User can follow, and unfollow people (and block people hehe #malicious).
- [ ] User can see profiles of those they are following.
- [ ] User can make a post in plain text.
- [ ] A main page will display all followers posts.
- [ ] Ability to updoot posts.
- [ ] Ability to comment on posts.

## Database

As the phoenix gods demand, it will use PostgreSQL...

The database will most likely follow this barebones schema:

1. A users table to store user data
2. A posts table to store all things posts
3. Comments table linked to a post

### User

```
id: primary key,
username: string,
password: hash,
posts: foreign number[] references post.id,
comments: foreign number[] references comment.id,
follwers: foreign number[] references user.id,
following: foreign number[] references user.id,
```

### Post

```
id: primary key,
body: string,
user_id: foreign number references user.id,
updoots: number,
created_at: timestamp,
```

### Comment

```
id: primary key,
body: string,
post: foreign number references user.id,
user_id: foreign number references user.id,
```
