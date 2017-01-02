UPDATE sol_ratings SET liked = false 
WHERE user_id = $1 AND solution_id = $2;