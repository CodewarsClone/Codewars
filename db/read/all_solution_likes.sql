SELECT COUNT(*) AS dislikes, solution_id FROM sol_ratings WHERE liked = true
GROUP BY solution_id;