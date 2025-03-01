
document.addEventListener("DOMContentLoaded", function() {
    const taskCounter = document.getElementById("taskCounter");
    const completedCounter = document.getElementById("completedCounter");
    const bgChanger = document.getElementById("bgChanger");
    const completeButtons = document.querySelectorAll(".completeBtn");
    const logList = document.getElementById("logList");
    const clearLogButton = document.getElementById("clearLog");
    
    let totalTasks = completeButtons.length;
    let completedTasks = 0;
    function loadActivityLog() {
        const savedLogs = JSON.parse(localStorage.getItem("activityLog")) || [];
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
    taskCounter.textContent = totalTasks;

    completeButtons.forEach(button => {
        button.addEventListener("click", function() {
            if (!this.disabled) {
                const taskCard = this.closest(".task-card");
                const taskTitle = taskCard.dataset.task;
                
                alert(`🎉 Congrats! You completed: ${taskTitle}`);

                this.disabled = true;
                this.style.opacity = "0.5";
                completedTasks++;
                completedCounter.textContent = completedTasks;
                totalTasks--;
                taskCounter.textContent = totalTasks;
                const currentTime = getCurrentTime();
                addLog(`You have completed the task: ${taskTitle} at ${currentTime}`);

                if (completedTasks === completeButtons.length) {
                    alert("🎉 Congratulations! You completed all tasks!");
                }
            }
        });
    });

    bgChanger.addEventListener("click", function() {
        document.body.style.backgroundColor = `#${Math.floor(Math.random()*16777215).toString(16)}`;
    });

    clearLogButton.addEventListener("click", function() {
        logList.innerHTML = "";
        localStorage.removeItem("activityLog");
    });

});


    document.addEventListener("DOMContentLoaded", function() {
    const currentDate = new Date();
    const options = { weekday: 'short', month: 'short', day: '2-digit', year: 'numeric' };
    const formattedDate = currentDate.toLocaleDateString('en-US', options).replace(',', ' ,');
    document.getElementById("calendar").innerHTML = `
        <img src="asset/fi-sr-calendar.png" alt="">
        ${formattedDate}
    `;
});


