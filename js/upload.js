document.addEventListener("DOMContentLoaded", function () {

    const dropArea = document.getElementById("dropArea");
    const browseBtn = document.getElementById("browseBtn");
    const fileInput = document.getElementById("fileInput");
    const uploadBtn = document.getElementById("uploadBtn");
    const dropTitle = document.getElementById("dropTitle");


    /* CLICK TO OPEN FILE */
    browseBtn.addEventListener("click", () => fileInput.click());
    dropArea.addEventListener("click", () => fileInput.click());

    /* FILE SELECT */
    fileInput.addEventListener("change", function () {
        handleFile(this.files[0]);
    });

    /* DRAG EVENTS */
    dropArea.addEventListener("dragover", (e) => {
        e.preventDefault();
        dropArea.classList.add("active");
    });

    dropArea.addEventListener("dragleave", () => {
        dropArea.classList.remove("active");
    });

    dropArea.addEventListener("drop", (e) => {
        e.preventDefault();
        dropArea.classList.remove("active");

        const file = e.dataTransfer.files[0];
        handleFile(file);
    });

    function handleFile(file) {
        if (!file) return;

        const allowedTypes = ["application/pdf",
                              "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                              "text/plain"];

        if (!allowedTypes.includes(file.type)) {
            alert("Unsupported file type.");
            return;
        }

        dropTitle.textContent = file.name;
        uploadBtn.classList.remove("disabled");
        uploadBtn.disabled = false;
    }

    /* GENERATE BUTTON */
    uploadBtn.addEventListener("click", function () {

        if (uploadBtn.classList.contains("disabled")) return;

        const overlay = document.getElementById("loadingOverlay");
        const timerText = document.getElementById("loadingTimer");
        const statusText = document.getElementById("loadingStatus");
        const iconContainer = document.getElementById("loadingIcon");

        overlay.style.display = "flex";

        const stages = [
            { text: "Parsing Resume...", icon: "file-text" },
            { text: "Matching Roles...", icon: "briefcase" },
            { text: "Ranking Careers...", icon: "trending-up" },
            { text: "Finalizing AI Results...", icon: "sparkles" }
        ];

        const totalTime = Math.floor(Math.random() * 11) + 15;
        let remaining = totalTime;

        timerText.textContent = `Redirecting in ${remaining}s`;

        function updateStage(progressPercent) {

            let stageIndex;

            if (progressPercent < 30) stageIndex = 0;
            else if (progressPercent < 60) stageIndex = 1;
            else if (progressPercent < 85) stageIndex = 2;
            else stageIndex = 3;

            statusText.textContent = stages[stageIndex].text;

            iconContainer.innerHTML =
                `<i data-lucide="${stages[stageIndex].icon}"></i>`;

            lucide.createIcons();
        }

        // Initial render
        updateStage(0);

        const timerInterval = setInterval(() => {

            remaining--;

            const progress =
                ((totalTime - remaining) / totalTime) * 100;

            updateStage(progress);

            timerText.textContent = `Redirecting in ${remaining}s`;

            if (remaining <= 0) {

                clearInterval(timerInterval);

                const storedUser =
                    JSON.parse(sessionStorage.getItem("currentUser"));

                const recommendationData = {
                    source: "Resume",
                    date: new Date().toLocaleDateString(),
                    user: storedUser?.name || "User",
                    skills: ["Extracted Skill 1", "Extracted Skill 2"],
                    interests: [],
                    industries: [],
                    generatedAt: new Date().toISOString()
                };

                localStorage.setItem(
                    "currentRecommendation",
                    JSON.stringify(recommendationData)
                );

                window.location.href = "recommendations.html";
            }

        }, 1000);
    });
    
    /* =========================
       AUTH CHECK
    ========================== */
    const storedLogin = sessionStorage.getItem("isLoggedIn");
    const storedUser = sessionStorage.getItem("currentUser");

    if (storedLogin !== "true" || !storedUser) {
        window.location.href = "index.html";
        return;
    }

    /* =========================
       NAVIGATION
    ========================== */

    const dashboardBtn = document.getElementById("dashboardBtn");
    const logoutBtn = document.getElementById("logoutBtn");
    const backBtn = document.getElementById("backBtn");

    // Dashboard
    dashboardBtn?.addEventListener("click", function () {
        window.location.href = "dashboard.html";
    });

    // Logout
    logoutBtn?.addEventListener("click", function () {
        sessionStorage.removeItem("isLoggedIn");
        sessionStorage.removeItem("currentUser");
        window.location.href = "index.html";
    });

    // Back button
    backBtn?.addEventListener("click", function () {
        window.location.href = "index.html";
    });
});
