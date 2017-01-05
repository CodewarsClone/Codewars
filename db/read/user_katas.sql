SELECT script, kyu, description, name, katas.id, s.id FROM katas
JOIN solutions s ON katas.id = s.kata_id
<<<<<<< HEAD
WHERE s.user_id = $1;
=======
WHERE s.user_id = $1;
>>>>>>> master
