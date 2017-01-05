SELECT COUNT(*) AS dislikes, solution_id FROM sol_ratings WHERE liked = false
GROUP BY solution_id;