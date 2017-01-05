SELECT COUNT(*) AS dislikes FROM sol_ratings WHERE liked = false
GROUP BY solution_id;