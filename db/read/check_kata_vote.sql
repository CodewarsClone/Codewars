SELECT * FROM kata_ratings
WHERE user_id = $1 AND kata_id = $2;