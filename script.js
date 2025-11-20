document.addEventListener("DOMContentLoaded", () => {

    const employeesList = document.getElementById("employeesList");
    let employees = JSON.parse(localStorage.getItem("employees")) || [];
    const rooms = document.querySelectorAll(".room");

    // CREATE ASSIGN MODAL
    const assignModal = document.createElement("div");
    assignModal.id = "assignModal";
    assignModal.className = "fixed inset-0 bg-black/50 flex items-center justify-center hidden z-50";
    assignModal.innerHTML = `
        <div class="bg-white p-5 rounded-xl w-80 max-h-[70vh] overflow-y-auto">
            <h2 class="font-bold text-lg mb-3">Choisir un employé</h2>
            <div id="assignList" class="flex flex-col gap-2"></div>
            <button id="assignClose" class="mt-3 bg-gray-300 p-2 rounded">Fermer</button>
        </div>
    `;
    document.body.appendChild(assignModal);
    const assignList = document.getElementById("assignList");
    const assignClose = document.getElementById("assignClose");

    assignClose.addEventListener("click", () => assignModal.classList.add("hidden"));

    // ACCESS RULES
    function canAccessZone(role, zone) {
        if (zone === "reception") return role === "Réceptionniste";
        if (zone === "serveurs") return role === "Technicien IT";
        if (zone === "securite") return role === "Agent de sécurité";
        if (zone === "archive") return role === "Manager";
        if (role === "Nettoyage") return zone !== "archive";
        if (role === "Manager") return true;
        const restricted = ["reception","serveurs","securite","archive"];
        return !restricted.includes(zone);
    }

    function renderEmployeesList() {
        employeesList.innerHTML = "";
        const unassigned = employees.filter(e => !e.zone);
        if (unassigned.length === 0) {
            employeesList.innerHTML = "<p class='text-red-500 font-bold mt-3'>Aucun employé trouvé.</p>";
            return;
        }

        unassigned.forEach(emp => {
            const div = document.createElement("div");
            div.className = "rounded-xl p-3 bg-white shadow mt-3 flex items-center gap-3 border cursor-pointer";
            div.innerHTML = `<p class="font-bold">${emp.nom}</p> <p class="text-sm">${emp.role}</p>`;
            div.addEventListener("click", () => renderZonesHighlight(emp.role));
            employeesList.appendChild(div);
        });
    }

    function renderRooms() {
        rooms.forEach(room => {
            const zone = room.dataset.room;
            const container = room.querySelector(".room-employees");
            container.innerHTML = "";

            employees.filter(e => e.zone === zone).forEach(emp => {
                const div = document.createElement("div");
                div.className = "flex items-center gap-2 bg-white p-1 rounded shadow mt-1";
                div.innerHTML = `<p class="text-sm font-bold">${emp.nom}</p>
                                 <button class="removeFromRoom text-red-500 font-bold">X</button>`;
                div.querySelector(".removeFromRoom").addEventListener("click", () => {
                    emp.zone = null;
                    localStorage.setItem("employees", JSON.stringify(employees));
                    renderEmployeesList();
                    renderRooms();
                });
                container.appendChild(div);
            });

            // CLICK TO ASSIGN
            room.onclick = () => chooseEmployeeForRoom(zone);
        });
    }

    function renderZonesHighlight(role=null) {
        rooms.forEach(room => {
            const zone = room.dataset.room;
            if(!role){
                room.style.backgroundColor = "rgba(255,0,0,0.1)";
            } else if(canAccessZone(role, zone)){
                room.style.backgroundColor = "rgba(0,255,0,0.25)";
            } else {
                room.style.backgroundColor = "rgba(255,0,0,0.3)";
            }
        });
    }

    function chooseEmployeeForRoom(zone) {
        const eligible = employees.filter(emp => !emp.zone && canAccessZone(emp.role, zone));
        if(eligible.length===0){
            alert("Aucun employé éligible pour cette zone.");
            return;
        }
        assignList.innerHTML = "";
        eligible.forEach(emp => {
            const div = document.createElement("div");
            div.className = "flex items-center gap-2 p-2 border rounded cursor-pointer hover:bg-gray-100";
            div.innerHTML = `<p class="font-bold">${emp.nom}</p> <p class="text-sm">${emp.role}</p>`;
            div.addEventListener("click", () => {
                emp.zone = zone;
                localStorage.setItem("employees", JSON.stringify(employees));
                assignModal.classList.add("hidden");
                renderEmployeesList();
                renderRooms();
            });
            assignList.appendChild(div);
        });
        assignModal.classList.remove("hidden");
    }

    renderEmployeesList();
    renderRooms();
    renderZonesHighlight();

});
