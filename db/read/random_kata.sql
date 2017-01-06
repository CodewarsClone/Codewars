select id, kyu, languages, description, starter_code, name, examples, tags, creator from katas
WHERE kyu >= $1 AND kyu <= $2;
