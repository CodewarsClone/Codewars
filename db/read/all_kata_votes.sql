SELECT COUNT(*) AS votes, kata_id FROM kata_ratings
GROUP BY kata_id;