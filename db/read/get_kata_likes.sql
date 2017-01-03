SELECT COUNT(liked) AS likes FROM kata_ratings WHERE liked = true AND kata_id = $1;


