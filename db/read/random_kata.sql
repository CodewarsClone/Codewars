select id, kyu, description, starter_code, name, examples from katas
WHERE kyu >= $1 AND kyu <= $2;