SELECT COUNT(*) AS dislikes, kata_id FROM kata_ratings WHERE liked = false
GROUP BY kata_id;