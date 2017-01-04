UPDATE kata_ratings SET liked = $3
WHERE user_id = $1 AND kata_id = $2;