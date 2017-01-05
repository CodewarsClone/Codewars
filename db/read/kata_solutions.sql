SELECT script, username, solutions.id FROM solutions
JOIN users ON solutions.user_id = users.id
WHERE kata_id = $1;
