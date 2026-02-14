document.addEventListener("DOMContentLoaded", function () {

    const tabs = document.querySelectorAll(".tab-btn");
    const content = document.getElementById("tabContent");

    function loadTab(type) {

        /* =========================
           CAREER PATHS
        ========================== */
        if (type === "paths") {
            content.innerHTML = `
                <div class="card">
                    <span class="badge badge-high">High</span>
                    <h3>Recommended Career Path</h3>
                    <p>Based on your profile, here are structured growth tracks.</p>
                </div>
            `;
        }

        /* =========================
           JOB ROLES
        ========================== */
        if (type === "roles") {
            content.innerHTML = `
                <div class="role-card">
                    <div class="role-top">
                        <h3>Top Matched Role</h3>
                        <div class="match-score">
                            <span>Match Score</span>
                            <strong>85%</strong>
                        </div>
                    </div>
                    <p class="role-desc">
                        This role aligns with your skills and interests.
                    </p>
                </div>
            `;
        }

        /* =========================
           SKILLS
        ========================== */
        if (type === "skills") {
            content.innerHTML = `
                <div class="card">
                    <span class="badge badge-medium">Medium</span>
                    <h3>Skill Enhancement Areas</h3>
                    <p>Improve these areas to increase match strength.</p>
                </div>
            `;
        }

        /* =========================
           RESOURCES
        ========================== */
        if (type === "resources") {
            content.innerHTML = `
                <div class="card">
                    <span class="badge badge-dark">Course</span>
                    <h3>Recommended Learning Resource</h3>
                    <p>Structured pathway to achieve your career goal.</p>
                </div>
            `;
        }

        lucide.createIcons();
    }

    tabs.forEach(tab => {
        tab.addEventListener("click", function () {

            tabs.forEach(t => t.classList.remove("active"));
            this.classList.add("active");

            const tabType = this.getAttribute("data-tab");
            loadTab(tabType);
        });
    });

    loadTab("paths");
    lucide.createIcons();
});
