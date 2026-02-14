function generateRecommendations(profile, rolesData, selectedLevel, selectedCategory) {

    let results = [];

    for (let roleName in rolesData) {

        const role = rolesData[roleName];

        // Level filter
        if (selectedLevel && role.level !== selectedLevel) continue;

        // Category filter
        if (selectedCategory && role.category !== selectedCategory) continue;

        let score = 0;

        // Major match (30)
        if (role.majors.includes(profile.major)) {
            score += 30;
        }

        // Skills match (10 each)
        profile.skills.forEach(skill => {
            if (role.skills.includes(skill)) {
                score += 10;
            }
        });

        // Certification match (15 each)
        if (profile.certifications) {
            profile.certifications.forEach(cert => {
                if (role.certifications && role.certifications.includes(cert)) {
                    score += 15;
                }
            });
        }

        // Freelance bonus
        if (profile.freelance && role.freelance) {
            score += 10;
        }

        // Trending badge logic
        let trending = false;
        if (["AI", "Cloud", "Cybersecurity", "Emerging Tech", "Data"].includes(role.category)) {
            trending = true;
            score += 5; // slight boost
        }

        results.push({
            role: roleName,
            score: score,
            category: role.category,
            level: role.level,
            trending: trending,
            salary: role.salaryINR,
            careerPath: role.careerPath
        });
    }

    // Sort highest first
    results.sort((a, b) => b.score - a.score);

    return results;
}
