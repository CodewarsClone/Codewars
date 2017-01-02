UPDATE kata_ratings SET liked = false 
WHERE user_id = $1 AND kata_id = $2;