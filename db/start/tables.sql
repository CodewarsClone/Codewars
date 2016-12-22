DROP TABLE IF EXISTS ratings, rating,  solutions, katas, kata, users;

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

CREATE TABLE ratings (
  id serial primary key,
  user_id integer references users(id),
  kata_id integer references katas(id),
  solution_id integer references solutions(id),
  liked boolean not null
);

INSERT INTO users (github_id, name, email, username, picture_url, points)
VALUES ('12', 'Bob Smith', 'bob@smith.com', 'bobIScool', null, 25);

INSERT INTO katas (kyu, description, starter_code, name, tags, languages, examples, test_script)
VALUES (8, 'var a should equal 1', 'var a = 1', 'Sumbit This','["Fake"]', '["Javascript"]', '[{"test":"Test.assertEquals(a, 1)","result":""}]', '[{"test":"Test.assertEquals(a, 0)","result":""},{"test":"Test.assertEquals(a, 2)","result":""},{"test":"Test.assertEquals(a, 1)","result":""}]');

INSERT INTO solutions (user_id, kata_id, script)
VALUES (1, 1, 'var a = 1'),
(1,1, 'let a = 1');

INSERT INTO ratings (user_id, solution_id, liked)
VALUES (1, 1, true);