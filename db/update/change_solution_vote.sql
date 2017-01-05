UPDATE sol_ratings SET liked = $3
WHERE user_id = $1 AND solution_id = $2;