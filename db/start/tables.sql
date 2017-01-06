DROP TABLE IF EXISTS kata_ratings, sol_ratings, solutions, katas, users;

CREATE TABLE users (
  id serial primary key,
  github_id varchar(255),
  name varchar(80),
  email varchar(255),
  username varchar (40),
  picture_url text,
  points integer
);

CREATE TABLE katas (
  id serial primary key,
  creator varchar(80),
  kyu integer not null,
  test_script json not null,
  description text,
  starter_code text not null,
  name varchar(255),
  examples json,
  tags json,
  languages json
);

CREATE TABLE solutions (
  id serial primary key,
  user_id integer references users(id),
  kata_id integer references katas(id),
  script text not null
);

CREATE TABLE sol_ratings (
  id serial primary key,
  user_id integer references users(id),
  solution_id integer references solutions(id),
  liked boolean not null
);

CREATE TABLE kata_ratings (
  id serial primary key,
  user_id integer references users(id),
  kata_id integer references katas(id),
  liked boolean not null
);

INSERT INTO users (github_id, name, email, username, picture_url, points)
VALUES ('22752236', 'Joshua Baert', 'developer@baert.io', 'JoshuaBaert', 'https://avatars.githubusercontent.com/u/22752236?v=3', 4);
