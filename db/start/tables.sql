DROP TABLE IF EXISTS rating, solutions, kata, users;

CREATE TABLE users (
  id serial primary key,
  github_id varchar(255),
  first_name varchar(40),
  last_name varchar(40),
  email varchar(255),
  username varchar (40),
  picutre_url text

);

CREATE TABLE katas (
  id serial primary key,
  kyu integer not null,
  test_script text not null,
  description text,
  starter_code text not null,
  name varchar(255),
  examples text
);

CREATE TABLE solutions (
  id serial primary key,
  user_id integer references users(id),
  kata_id integer references kata(id),
  script text not null
);

CREATE TABLE ratings (
  id serial primary key,
  user_id integer references users(id),
  kata_id integer references kata(id),
  solution_id integer references solutions(id),
  liked boolean not null
);

INSERT INTO users (github_id, first_name, last_name, email, username, picture_url)
VALUES (null, 'bob', 'smith', 'bob@smith.com', 'bobIScool', null);

INSERT INTO katas (kyu, test_script, description, starter_code, name, examples)
VALUES (8, 'Test.assertEquals(a, 1)', 'a should equal 1', 'var a = 1', 'Sumbit This', null);

INSERT INTO solutions (user_id, kata_id, script)
VALUES (1, 1, 'var a = 1'),
(1,1, 'let a = 1');

INSERT INTO ratings (user_id, solution_id, liked)
VALUES (1, 1, true);