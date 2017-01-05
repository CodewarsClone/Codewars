SELECT COUNT(*) AS likes, kata_id FROM kata_ratings WHERE liked = true
GROUP BY kata_id;