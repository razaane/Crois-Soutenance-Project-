document.addEventListener("DOMContentLoaded", () => {

    const modal = document.getElementById("modal");
    const btnAfficher = document.getElementById("btnAfficher");
    const closeModal = document.getElementById("closeModal");

    const container = document.getElementById("experience_container");
    const photoUrlInput = document.getElementById("photo_url");
    const photoPreview = document.getElementById("photo_preview");
    const photoText = document.getElementById("text_container_photo");

    const form = document.getElementById("formulaire");

    // Load employees
    let employees = JSON.parse(localStorage.getItem("employees")) || [];

    // --- OPEN / CLOSE MODAL ---
    btnAfficher.addEventListener("click", () => modal.classList.remove("hidden"));
    closeModal.addEventListener("click", () => modal.classList.add("hidden"));


    // -------- PHOTO PREVIEW --------
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


    // -------- AJOUTER EXPERIENCES --------
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


    // -------- AJOUT EMPLOYÉ --------
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

        alert("Employé ajouté !");
        modal.classList.add("hidden");

        form.reset();
        photoPreview.classList.add("hidden");
        photoText.classList.remove("hidden");
    });


    // -------- AFFICHAGE EMPLOYÉS --------
    function affichageEmployees() {
        const btnAfficherEmployees = document.getElementById("btnEmploye");
        const liste = document.getElementById("employeesList");

        btnAfficherEmployees.addEventListener("click", () => {
            liste.innerHTML = "";
            liste.classList.remove("hidden");

            const data = JSON.parse(localStorage.getItem("employees")) || [];

            if (data.length === 0) {
                liste.innerHTML = "<p class='text-red-500 font-bold mt-3'>Aucun employé trouvé.</p>";
                return;
            }

            data.forEach((emp) => {
                liste.innerHTML += `
                    <div class="rounded-xl p-3 bg-white shadow mt-3 flex items-center gap-3 border">
                        <img src="${emp.photo}" class="w-12 h-12 rounded-full object-cover" />
                        <div>
                            <p class="font-bold">${emp.nom}</p>
                            <p class="text-sm text-gray-600">${emp.role}</p>
                        </div>
                    </div>`;
            });
        });
    }

    affichageEmployees();

});
