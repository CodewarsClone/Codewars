SELECT id, kyu, languages, description, starter_code, name, examples, tags, creator FROM katas
WHERE kyu = $1;
