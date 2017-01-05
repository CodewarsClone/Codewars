SELECT COUNT(*) AS dislikes FROM sol_ratings WHERE liked = true
GROUP BY solution_id;