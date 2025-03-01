document.addEventListener("DOMContentLoaded", function () {
    const taskCounter = document.getElementById("taskCounter");
    const completedCounter = document.getElementById("completedCounter");
    const bgChanger = document.getElementById("bgChanger");
    const completeButtons = document.querySelectorAll(".completeBtn");
    const logList = document.getElementById("logList");
    const clearLogButton = document.getElementById("clearLog");
    let totalTasks = localStorage.getItem("totalTasks") ? parseInt(localStorage.getItem("totalTasks")) : completeButtons.length;
    let completedTasks = localStorage.getItem("completedTasks") ? parseInt(localStorage.getItem("completedTasks")) : 0;

    function loadActivityLog() {
        const savedLogs = JSON.parse(localStorage.getItem("activityLog")) || [];
        logList.innerHTML = "";
        savedLogs.forEach(log => addLog(log, false));
    }

    function getCurrentTime() {
        const now = new Date();
        return now.toLocaleTimeString("en-US", { hour12: true });
    }

    function addLog(message, save = true) {
        const logItem = document.createElement("li");
        logItem.textContent = message;
        logList.appendChild(logItem);

        if (save) {
            let logs = JSON.parse(localStorage.getItem("activityLog")) || [];
            logs.push(message);
            localStorage.setItem("activityLog", JSON.stringify(logs));
        }
    }
    taskCounter.textContent = String(totalTasks).padStart(2, '0');
    completedCounter.textContent = String(completedTasks).padStart(2, '0');
    completeButtons.forEach((button, index) => {
        if (index < completedTasks) {
            button.disabled = true;
            button.style.opacity = "0.1";
        }
    });

    completeButtons.forEach((button, index) => {
        button.addEventListener("click", function () {
            if (!this.disabled) {
                const taskCard = this.closest(".task-card");
                const taskTitle = taskCard.dataset.task;

                alert(`Congratulation! You have completed - ${taskTitle}`);

                this.disabled = true;
                this.style.opacity = "0.1";
                completedTasks++;
                completedCounter.textContent = String(completedTasks).padStart(2, '0');
                totalTasks = Math.max(0, totalTasks - 1);
                taskCounter.textContent = String(totalTasks).padStart(2, '0');
                localStorage.setItem("completedTasks", completedTasks);
                localStorage.setItem("totalTasks", totalTasks);

                const currentTime = getCurrentTime();
                addLog(`You have Complete The Task ${taskTitle} at ${currentTime}`);

                if (completedTasks === completeButtons.length) {
                    alert("Congratulations! You have completed all tasks!");
                }
            }
        });
    });

    bgChanger.addEventListener("click", function () {
        document.body.style.backgroundColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    });

    clearLogButton.addEventListener("click", function () {
        logList.innerHTML = "";
        localStorage.removeItem("activityLog");
        localStorage.removeItem("completedTasks");
        localStorage.removeItem("totalTasks");

        completedTasks = 0;
        totalTasks = completeButtons.length;

        completedCounter.textContent = "00";
        taskCounter.textContent = String(totalTasks).padStart(2, '0');
        completeButtons.forEach((button) => {
            button.disabled = false;
            button.style.opacity = "1";
        });
    });
    loadActivityLog(); 
});

document.addEventListener("DOMContentLoaded", function () {
    const currentDate = new Date();
    const options = { weekday: "short", month: "short", day: "2-digit", year: "numeric" };
    const formattedDate = currentDate.toLocaleDateString("en-US", options).replace(",", " ,");
    document.getElementById("calendar").innerHTML = `
        <img src="asset/fi-sr-calendar.png" alt="">
        ${formattedDate}
    `;
});
