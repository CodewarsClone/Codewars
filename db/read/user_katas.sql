SELECT script, kyu, description, name, katas.id, s.id as solution_id, katas.creator FROM katas
JOIN solutions s ON katas.id = s.kata_id
WHERE s.user_id = $1;
