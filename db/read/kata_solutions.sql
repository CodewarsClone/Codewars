SELECT script, username FROM solutions
JOIN users ON solutions.user_id = users.id
WHERE kata_id = $1;
