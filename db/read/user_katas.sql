SELECT script, kyu, description, name FROM katas
WHERE user_id = $1;
