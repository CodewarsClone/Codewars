SELECT COUNT(*) AS dislikes FROM kata_ratings WHERE liked = false
GROUP BY kata_id;