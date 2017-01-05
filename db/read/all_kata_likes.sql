SELECT COUNT(*) AS likes FROM kata_ratings WHERE liked = true
GROUP BY kata_id;