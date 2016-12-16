DROP TABLE IF EXISTS rating, solutions, kata, users;

CREATE TABLE users (
  id serial primary key,
  github_id varchar(255),
  first_name varchar(40),
  last_name varchar(40),
  email varchar(255),
  username varchar (40)

);

CREATE TABLE kata (
  id serial primary key,
  kyu integer not null,
  test text not null,
  description text,
  starter_code text not null,
  name varchar(255)
);

CREATE TABLE solutions (
  id serial primary key,
  user_id integer references users(id),
  kata_id integer references kata(id),
  script text not null
);

CREATE TABLE rating (
  id serial primary key,
  user_id integer references users(id),
  kata_id integer references kata(id),
  solution_id integer references solutions(id),
  liked boolean not null
);

INSERT INTO users (github_id, first_name, last_name, email, username)
VALUES (null, 'bob', 'smith', 'bob@smith.com', 'bobIScool');

INSERT INTO kata (kyu, test, description, starter_code, name)
VALUES (8, 'Test.assertEquals(a, 1)', 'a should equal 1', 'var a = 1', 'Sumbit This');

INSERT INTO solutions (user_id, kata_id, script)
VALUES (1, 1, 'var a = 1'),
(1,1, 'let a = 1');

INSERT INTO rating (user_id, solution_id, liked)
VALUES (1, 1, true);