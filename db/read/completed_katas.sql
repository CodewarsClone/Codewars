SELECT script, kyu, description, name FROM katas
JOIN solutions ON katas.id = solutions.kata_id
WHERE user_id = $1;