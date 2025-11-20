document.addEventListener("DOMContentLoaded", () => {

    const employeesList = document.getElementById("employeesList");
    const rooms = document.querySelectorAll(".room");
    let employees = JSON.parse(localStorage.getItem("employees")) || [];

    // ASSIGN MODAL
    const assignModal = document.createElement("div");
    assignModal.id = "assignModal";
    assignModal.className = "fixed inset-0 bg-black/50 flex items-center justify-center hidden z-50";
    assignModal.innerHTML = `
        <div class="bg-white p-5 rounded-xl w-96 max-h-[70vh] overflow-y-auto">
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
            div.innerHTML = `
                <img src="${emp.photo}" class="w-12 h-12 rounded-full object-cover"/>
                <div class="flex-1">
                    <p class="font-bold">${emp.nom}</p>
                    <p class="text-sm text-gray-600">${emp.role}</p>
                </div>
                <button class="deleteEmp bg-red-500 text-white px-2 py-1 rounded">Supprimer</button>
            `;
            div.querySelector(".deleteEmp").addEventListener("click", (e) => {
                e.stopPropagation();
                employees = employees.filter(e2 => e2.email !== emp.email);
                localStorage.setItem("employees", JSON.stringify(employees));
                renderEmployeesList();
                renderRooms();
            });
            div.addEventListener("click", () => renderZonesHighlight(emp));
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
                div.innerHTML = `
                    <img src="${emp.photo}" class="w-8 h-8 rounded-full"/>
                    <p class="text-sm font-bold">${emp.nom}</p>
                    <button class="removeFromRoom text-red-500 font-bold">X</button>
                `;
                div.querySelector(".removeFromRoom").addEventListener("click", () => {
                    emp.zone = null;
                    localStorage.setItem("employees", JSON.stringify(employees));
                    renderEmployeesList();
                    renderRooms();
                });
                container.appendChild(div);
            });

            room.onclick = () => chooseEmployeeForRoom(zone);
        });
    }

    function renderZonesHighlight(emp=null) {
        rooms.forEach(room => {
            const zone = room.dataset.room;
            if (!emp) {
                room.style.backgroundColor = "rgba(255,0,0,0.1)";
            } else {
                room.style.backgroundColor = canAccessZone(emp.role, zone) 
                    ? "rgba(0,255,0,0.25)" 
                    : "rgba(255,0,0,0.3)";
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
            div.innerHTML = `
                <img src="${emp.photo}" class="w-10 h-10 rounded-full"/>
                <p class="font-bold">${emp.nom}</p>
                <p class="text-sm">${emp.role}</p>
            `;
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
