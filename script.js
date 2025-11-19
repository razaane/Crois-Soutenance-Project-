document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("modal");
    const btnAfficher = document.getElementById("btnAfficher");
    const closeModal = document.getElementById("closeModal");
    const container = document.getElementById("experience_container");
    const photoUrlInput = document.getElementById("photo_url");
    const photoPreview = document.getElementById("photo_preview");
    const photoText = document.getElementById("text_container_photo");
    const form = document.getElementById("formulaire");
    const employeesList = document.getElementById("employeesList");
    const profileModal = document.getElementById("profileModal");
    const profileContent = document.getElementById("profileContent");
    const btnEmploye = document.getElementById("btnEmploye");

    let employees = JSON.parse(localStorage.getItem("employees")) || [];

    btnAfficher.addEventListener("click", () => modal.classList.remove("hidden"));
    closeModal.addEventListener("click", () => modal.classList.add("hidden"));
    btnEmploye.addEventListener("click", () => {
        renderEmployeesList();
    });



    photoUrlInput.addEventListener("input", () => {
        const url = photoUrlInput.value.trim();
        if (!url) {
            photoPreview.classList.add("hidden");
            photoText.classList.remove("hidden");
            return;
        }
        photoPreview.src = url;
        photoPreview.classList.remove("hidden");
        photoText.classList.add("hidden");
    });

    container.addEventListener("click", (e) => {
        if (!e.target.classList.contains("btn-add")) return;
        const newExp = document.createElement("div");
        newExp.classList.add("flex", "items-center", "gap-2", "experience-item");
        newExp.innerHTML = `
            <textarea class="experience-input border border-2 rounded-lg w-full p-2 text-sm" rows="1"
                placeholder="Décrire une autre expérience"></textarea>
            <button type="button"
                class="btn-add bg-green-500 hover:bg-green-400 text-white font-bold rounded-lg px-3 py-2">+</button>
        `;
        container.appendChild(newExp);
    });

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const nom = document.getElementById("nom").value.trim();
        const email = document.getElementById("email").value.trim();
        const tel = document.getElementById("Téléphone").value.trim();
        const role = document.getElementById("role").value;
        const photo = photoUrlInput.value.trim();
        const experiences = [...document.querySelectorAll(".experience-input")]
            .map(exp => exp.value.trim())
            .filter(exp => exp !== "");

        const employee = { nom, email, tel, role, photo, experiences };
        employees.push(employee);
        localStorage.setItem("employees", JSON.stringify(employees));
        modal.classList.add("hidden");
        form.reset();
        photoPreview.classList.add("hidden");
        photoText.classList.remove("hidden");

        renderEmployeesList();
    });

    function openProfileModal(emp) {
        profileContent.innerHTML = `
            <div class="flex flex-col gap-3">
                <button id="profileClose" class=" rounded-lg bg-gray-300 h-8 w-6 font-bold">X</button>
                <img src="${emp.photo}" alt="${emp.nom}" class="w-32 h-32 object-cover rounded-full mx-auto" />
                <h2 class="text-lg font-bold text-center">${emp.nom}</h2>
                <p class="text-sm text-center font-semibold">${emp.role}</p>
                <p class="text-sm">Email: ${emp.email}</p>
                <p class="text-sm">Téléphone: ${emp.tel}</p>
                <p class="text-sm">Expériences: ${(emp.experiences || []).join(", ")}</p>
                <button id="profileRemove" style="background:red;color:white;padding:5px 10px;">Supprimer</button>
            </div>
        `;
        profileModal.classList.remove("hidden");

        document.getElementById("profileClose").addEventListener("click", () => profileModal.classList.add("hidden"));
        document.getElementById("profileRemove").addEventListener("click", () => {
            employees = employees.filter(e => e.nom !== emp.nom || e.email !== emp.email);
            localStorage.setItem("employees", JSON.stringify(employees));
            profileModal.classList.add("hidden");
            renderEmployeesList();
        });
    }

    function renderEmployeesList() {
        employeesList.innerHTML = "";
        if (employees.length === 0) {
            employeesList.innerHTML = "<p class='text-red-500 font-bold mt-3'>Aucun employé trouvé.</p>";
            return;
        }
        employees.forEach(emp => {
            const div = document.createElement("div");
            div.className = "rounded-xl p-3 bg-white shadow mt-3 flex items-center gap-3 border cursor-pointer";
            div.innerHTML = `
                <img src="${emp.photo}" class="w-12 h-12 rounded-full object-cover" />
                <div>
                    <p class="font-bold">${emp.nom}</p>
                    <p class="text-sm text-gray-600">${emp.role}</p>
                </div>
            `;
            div.addEventListener("click", () => openProfileModal(emp));
            employeesList.appendChild(div);
        });
    }

    renderEmployeesList();
});
