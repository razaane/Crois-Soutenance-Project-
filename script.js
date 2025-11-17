document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("modal");
    const btnAfficher = document.getElementById("btnAfficher");

    btnAfficher.addEventListener("click", () => modal.classList.remove("hidden"));
    closeModal.addEventListener("click", () => modal.classList.add("hidden"));





    const nameRegex = /^[a-zA-ZÀ-ÿ\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^(\+212|0)(6|7)\d{8}$/;
    const urlRegex = /^(https?:\/\/)[\w\-]+(\.[\w\-]+)+/;

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

        if (!nameRegex.test(nom)) return alert(" Nom invalide !");
        if (!emailRegex.test(email)) return alert(" Email invalide !");
        if (!phoneRegex.test(tel)) return alert(" Téléphone invalide !");
        if (!urlRegex.test(photo)) return alert(" URL de photo invalide !");
        if (role === "Choisir un rôle") return alert(" Choisissez un rôle !");
        if (experiences.length === 0) return alert(" Ajoutez au moins une expérience !");

        const employee = { nom, email, tel, role, photo, experiences };
        employees.push(employee);
        localStorage.setItem("employees", JSON.stringify(employees));

        alert(" Employé ajouté avec succès !");
        modal.classList.add("hidden");
        form.reset();
        photoPreview.classList.add("hidden");
        photoText.classList.remove("hidden");
    });

});