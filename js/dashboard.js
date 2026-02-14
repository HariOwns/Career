document.addEventListener("DOMContentLoaded", function () {

    /* =========================
       AUTH CHECK (MATCH INDEX)
    ========================== */

    const storedLogin = sessionStorage.getItem("isLoggedIn");
    const storedUser = sessionStorage.getItem("currentUser");

    const welcomeText = document.getElementById("welcomeText");
    const emptyState = document.getElementById("emptyState");
    const recommendationSection = document.getElementById("recommendationSection");
    const startBtn = document.getElementById("startAssessmentBtn");
    const logoutBtn = document.querySelector(".nav-outline");
    const homeBtn = document.getElementById("homeBtn");

    if (homeBtn) {
        homeBtn.addEventListener("click", function () {
            window.location.href = "index.html";
        });
    }


    if (storedLogin !== "true" || !storedUser) {
        window.location.href = "index.html";
        return;
    }

    const user = JSON.parse(storedUser);

    /* =========================
       SHOW USER NAME
    ========================== */

    if (welcomeText) {
        welcomeText.textContent = `Welcome back, ${user.name}!`;
    }

    /* =========================
       CHECK RECOMMENDATIONS
    ========================== */

    const recommendations =
        JSON.parse(localStorage.getItem("careerRecommendations")) || [];

    if (recommendations.length === 0) {
        if (emptyState) emptyState.style.display = "block";
        if (recommendationSection) recommendationSection.style.display = "none";
    } else {
        if (emptyState) emptyState.style.display = "none";
        if (recommendationSection) {
            recommendationSection.style.display = "grid";
            renderRecommendations(recommendations);
        }
    }

    /* =========================
       START BUTTON
    ========================== */

    if (startBtn) {
        startBtn.addEventListener("click", function () {
            window.location.href = "assessment.html";
        });
    }

    /* =========================
       LOGOUT
    ========================== */

    if (logoutBtn) {
        logoutBtn.addEventListener("click", function () {

            sessionStorage.removeItem("isLoggedIn");
            sessionStorage.removeItem("currentUser");

            window.location.href = "index.html";
        });
    }

});

/* =========================
   RENDER CARDS
========================== */

function renderRecommendations(data) {

    const container = document.getElementById("recommendationSection");
    container.innerHTML = "";

    data.forEach(item => {

        const card = document.createElement("div");
        card.className = "recommendation-card";

        card.innerHTML = `
            <div class="card-header">
                <i data-lucide="file-text"></i>
                <span class="card-type">${item.type}</span>
            </div>

            <h3>Career Analysis</h3>

            <div class="card-meta">
                <i data-lucide="calendar"></i>
                <span>${item.date}</span>
            </div>

            <div class="card-stats">
                <span>${item.paths} Career Paths</span>
                <span>${item.roles} Job Roles</span>
            </div>

            <button class="view-btn">View Details</button>
        `;

        container.appendChild(card);
    });

    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    }
}
