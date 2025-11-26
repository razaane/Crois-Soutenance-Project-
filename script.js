const ajouterNewWorker = document.querySelector("#btnAdd");
const display = document.querySelector("#displayAllWorkers");
const fermerleajouter = document.querySelector("#fermerleajouter");

const SalleConférence = document.querySelector("#SalleConférence");
const SalleServeur = document.querySelector("#SalleServeurs");
const SalleRéception = document.querySelector("#SalleRéception");
const SalleSécurité = document.querySelector("#SalleSécurité");
const SallePersonnel = document.querySelector("#SallePersonnel");
const SalleArchive = document.querySelector("#SalleArchive");

const formulaire = document.querySelector("#Formwrk");

const photo = document.querySelector("#photo");
const fullName = document.querySelector("#fullName");
const age = document.querySelector("#age");
const email = document.querySelector("#email");
const tel = document.querySelector("#tel");
const roles = document.querySelector("#roles");

const btnExp = document.querySelector("#btnExp");
const btnSubmit = document.querySelector("#btnSubmit");


let nomRegex = /^[A-Za-z\s]+$/;
let ageRegex = /^(1[0-9]|[2-9][0-9])$/;
let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
let telRegex = /^[0-9]{10}$/;






let workers = JSON.parse(localStorage.getItem("workers")) || [];

let SalleConférences = JSON.parse(localStorage.getItem("SalleConférences")) || [];
let SalleServeurs = JSON.parse(localStorage.getItem("SalleServeurs")) || [];
let SalleSécurités = JSON.parse(localStorage.getItem("SalleSécurités")) || [];
let SallePersonnels = JSON.parse(localStorage.getItem("SallePersonnels")) || [];
let SalleArchives = JSON.parse(localStorage.getItem("SalleArchives")) || [];
let SalleRéceptions = JSON.parse(localStorage.getItem("SalleRéceptions")) || [];
AfficherWorkers();
let id = 0;

function saveAll() {
    localStorage.setItem("workers", JSON.stringify(workers));
    localStorage.setItem("SalleConférences", JSON.stringify(SalleConférences));
    localStorage.setItem("SalleServeurs", JSON.stringify(SalleServeurs));
    localStorage.setItem("SalleSécurités", JSON.stringify(SalleSécurités));
    localStorage.setItem("SallePersonnels", JSON.stringify(SallePersonnels));
    localStorage.setItem("SalleArchives", JSON.stringify(SalleArchives));
    localStorage.setItem("SalleRéceptions", JSON.stringify(SalleRéceptions));
}


ajouterNewWorker.addEventListener("click", (e) => {
    e.preventDefault();
    formulaire.classList.remove("hidden");
})

fermerleajouter.addEventListener('click', (e) => {
    formulaire.classList.add("hidden");
    e.preventDefault();
    formulaire.reset();
    formulaire.querySelectorAll(".descrexper , .debutexper , .finexper").forEach((ele) => ele.parentElement.remove());
    AfficherWorkers();
})



btnExp.addEventListener("click", (e) => {
    e.preventDefault();
    const box = document.createElement("div");
    box.className = ("flex flex-col w-[90%] font-semibold");
    box.innerHTML = `
                <div class="flex flex-col w-[100%] font-semibold">
                    <label for="exper">Votre Experience :</label>
                    <input type="text" id="exper" placeholder="Entrer votre Expérience" class="descrexper border border-black p-1 rounded-md">
                </div>

                <div class="flex flex-col w-[100%] font-semibold">
                    <label for="debut">Début :</label>
                    <input type="date" id="debut" placeholder="le début d'expérience" class="debutexper border border-black p-1 rounded-md">
                </div>

                <div class="flex flex-col w-[100%] font-semibold">
                    <label for="fin">Fin :</label>
                    <input type="date" id="fin" placeholder="la fin d'expérience" class="finexper border border-black p-1 rounded-md">
                </div>
    `
    formulaire.insertBefore(box, btnExp.parentElement);
})

btnSubmit.addEventListener("click", (e) => {
    e.preventDefault();
    if (!nomRegex.test(fullName.value)) {
        alert("Name invalid");
        return;
    }

    if (!ageRegex.test(age.value)) {
        alert("Age invalid");
        return;
    }

    if (!emailRegex.test(email.value)) {
        alert("Email invalid");
        return;
    }

    if (!telRegex.test(tel.value)) {
        alert("Phone invalid");
        return;
    }
    let allExperience = [];
    const descrexper = document.querySelectorAll(".descrexper");
    const debutexper = document.querySelectorAll(".debutexper");
    const finexper = document.querySelectorAll(".finexper");
    descrexper.forEach((e, index) => {
        let exp = {
            description: e.value,
            debut: debutexper[index].value,
            fin: finexper[index].value
        }
        allExperience.push(exp);
    })
    id++;
    let worker = {
        id: id,
        workerPhoto: photo.value,
        workerName: fullName.value,
        workerAge: age.value,
        workerTel: tel.value,
        workerEmail: email.value,
        workerrole: roles.value,
        workerEperience: allExperience
    }
    workers.push(worker);
    saveAll();
    console.log(workers);
    alert("Votre Employé à été ajouter avec succés!");
    formulaire.classList.add("hidden");
    formulaire.reset();
    formulaire.querySelectorAll(".descrexper , .debutexper , .finexper").forEach((ele) => ele.parentElement.remove());
    AfficherWorkers();
})

function AfficherWorkers() {
    display.innerHTML = "";

    workers.forEach((oneWorker, index) => {
        const box = document.createElement("div");
        box.className = `
            bg-white shadow-md hover:shadow-lg transition-shadow
            rounded-xl flex items-center gap-4 p-3
            w-full max-w-md mx-auto my-2
        `;
        box.innerHTML = `
            <div class="flex-shrink-0 w-16 h-16 rounded-full overflow-hidden border-2 border-purple-500">
                <button class="infoWorker w-full h-full">
                    <img src="${oneWorker.workerPhoto}" alt="${oneWorker.workerName}" class="w-full h-full object-cover">
                </button>
            </div>
            <div class="flex flex-col justify-center flex-1">
                <p class="font-bold text-lg text-gray-800">${oneWorker.workerName}</p>
                <p class="text-sm text-gray-500">${oneWorker.workerrole}</p>
            </div>
        `;
        display.appendChild(box);

        const infoWorker = box.querySelector(".infoWorker");
        infoWorker.addEventListener("click", (e) => {
            e.preventDefault();
            AfficherWorkersInfo(index , workers);
        });
    });
}


const parent = document.querySelector("#parent");
function AfficherWorkersInfo(index , array) {
    const worker = array[index];
    console.log(worker);
    const modal = document.createElement("div");
    modal.id = "modalInfo";
    modal.className = `
        fixed inset-0 bg-black/40 flex items-center justify-center z-50 flex-col 
    `;

    modal.innerHTML = `
        <div class="bg-pink-50 w-[90%] max-w-md rounded-2xl p-5 shadow-xl relative modaldiv">
            <div class="flex justify-center">
                <img src="${worker.workerPhoto}" alt="${worker.workerName}" 
                     class="w-32 h-32 rounded-full border-4 border-pink-300 object-cover">
            </div>
            <div class="text-center mt-4">
                <h2 class="text-xl font-bold text-pink-700">${worker.workerName}</h2>
                <p class="text-sm text-pink-500 mt-1">${worker.workerrole}</p>
            </div>
            <div class="mt-4 text-center space-y-1">
                <p class="text-gray-600"><span class="font-semibold">Age:</span> ${worker.workerAge || "N/A"}</p>
                <p class="text-gray-600"><span class="font-semibold">Email:</span> ${worker.workerEmail || "N/A"}</p>
                <p class="text-gray-600"><span class="font-semibold">Phone:</span> ${worker.workerTel || "N/A"}</p>
            </div>
            <button id="closeModalInfo" class="absolute top-3 right-3 w-8 h-8 bg-pink-300 rounded-full hover:bg-pink-400 flex items-center justify-center text-white font-bold"> X </button>
        </div>
    `;

    document.body.appendChild(modal);
    const modaldiv = document.querySelector('.modaldiv');
    if (worker.workerEperience.length > 0) {
        worker.workerEperience.forEach(exp => {
            let divExp = document.createElement("div")
            divExp.style.background = 'pink';
            divExp.classList.add('rounded-lg', 'mb-2', 'p-2')
            divExp.innerHTML = `
                        <p class="text-sm text-pink-500">${exp.description}</p>
                        <p class="text-sm text-pink-500">${exp.debut}</p>
                        <p class="text-sm text-pink-500">${exp.fin}</p>
                    `
            modaldiv.appendChild(divExp)
        })
    }
    modal.querySelector("#closeModalInfo").addEventListener("click", () => modal.remove());
    modal.addEventListener("click", e => {
        if (e.target.id === "modalInfo") modal.remove();
    });
}


const btnConf = document.querySelector("#btnConf");
const btnRécp = document.querySelector("#btnRécp");
const btnSécu = document.querySelector("#btnSécu");
const btnServ = document.querySelector("#btnServ");
const btnPers = document.querySelector("#btnPers");
const btnArc = document.querySelector("#btnArc");

btnConf.addEventListener('click', () => {
    filtrage("SalleConférence");
})
btnRécp.addEventListener('click', () => {
    filtrage("SalleRéception");
})
btnSécu.addEventListener('click', () => {
    filtrage("SalleSécurité");
})
btnServ.addEventListener('click', () => {
    filtrage("SalleServeur");
})
btnPers.addEventListener('click', () => {
    filtrage("SallePersonnel");
})
btnArc.addEventListener('click', () => {
    filtrage("SalleArchive");
})

function filtrage(room) {
    let filtrwrk = workers.filter((e) => {
        if (room === "SalleSécurité") return e.workerrole === "Agents Sécurités" || e.workerrole === "Nettoyage";
        if (room === "SalleRéception") return ["Récéptioniste", "Nettoyage", "Manager", "Théchniciens IT", "Agents Sécurités"].includes(e.workerrole);
        if (room === "SalleConférence") return ["Nettoyage", "Manager", "Théchniciens IT"].includes(e.workerrole);
        if (room === "SallePersonnel") return ["Récéptioniste", "Nettoyage", "Manager", "Théchniciens IT", "Agents Sécurités"].includes(e.workerrole);
        if (room === "SalleArchive") return e.workerrole === "Manager";
        if (room === "SalleServeur") return ["Nettoyage", "Manager", "Théchniciens IT"].includes(e.workerrole);
    });


    const box = document.createElement("div");
    box.className = `
        fixed inset-0 flex items-center justify-center z-50
    `;
    box.innerHTML = `
        <div class="absolute inset-0 bg-black/40"></div>
        <div class="relative bg-pink-50 w-[90%] max-w-md h-[70vh] rounded-2xl shadow-xl flex flex-col items-center p-4 overflow-y-auto">
            <button class="fermer absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-600 transition">X</button>
        </div>
    `;
    const modalContent = box.querySelector("div.relative");

    const fermer = box.querySelector('.fermer');
    fermer.addEventListener('click', () => box.remove());

    filtrwrk.forEach((index) => {
        let worker = document.createElement("div");
        worker.id = index.id;
        worker.className = `
            flex flex-col sm:flex-row items-center justify-between bg-pink-100 w-full p-3 rounded-xl shadow-md hover:shadow-lg gap-3
        `;
        worker.innerHTML = `
            <div class="flex items-center gap-3 w-full sm:w-[70%]">
                <img src="${index.workerPhoto}" alt="${index.workerName}" class="w-16 h-16 rounded-full border-2 border-pink-300 object-cover">
                <div class="flex flex-col">
                    <h2 class="text-lg font-bold text-pink-700">${index.workerName}</h2>
                    <p class="text-sm text-pink-500">${index.workerrole}</p>    
                </div>
            </div>
            <div class="w-full sm:w-[30%] flex justify-center mt-2 sm:mt-0">
                <button class="ajouterdans bg-purple-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-purple-600 transition">
                    Ajouter
                </button>
            </div>
        `;
        modalContent.appendChild(worker);

        const ajo = worker.querySelector('.ajouterdans');
        ajo.addEventListener('click', () => {
            ajouterdanslasalle(index, room);
            box.remove();
        });
    });

    parent.appendChild(box);
}

function ajouterdanslasalle(index, room) {
    if (room === "SalleSécurité") {
        SalleSécurités.push(index);
    }
    if (room === "SalleRéception") {
        SalleRéceptions.push(index);
    }
    if (room === 'SalleConférence') {
        SalleConférences.push(index);
    }
    if (room === "SallePersonnel") {
        SallePersonnels.push(index);
    }
    if (room === "SalleArchive") {
        SalleArchives.push(index);
    }
    if (room === "SalleServeur") {
        SalleServeurs.push(index);
    }
    let deleteIndex = workers.findIndex(u => u.id === index.id)
    workers.splice(deleteIndex, 1);
    saveAll();
    renderroom(room);
    AfficherWorkers();
}


function renderroom(room) {
    let arr;
    let salle = document.querySelector(`#${room}`);

    if (room === "SalleSécurité") arr = SalleSécurités;
    if (room === "SalleRéception") arr = SalleRéceptions;
    if (room === 'SalleConférence') arr = SalleConférences;
    if (room === "SallePersonnel") arr = SallePersonnels;
    if (room === "SalleArchive") arr = SalleArchives;
    if (room === "SalleServeur") arr = SalleServeurs;

    salle.innerHTML = '';

    arr.forEach((elm , i) => {
        const card = document.createElement('div');
        card.className = `
            flex flex-col sm:flex-row items-center justify-between 
            w-full bg-pink-50/90 backdrop-blur-sm shadow-lg 
            border border-pink-200 rounded-2xl p-3 gap-3 
            hover:scale-105 transition-transform duration-200
        `
        card.innerHTML = `
            <div class="flex flex-col sm:flex-row items-center gap-3 w-full flex-wrap">
                <img src="${elm.workerPhoto}" alt="${elm.workerName}" 
                     class="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-pink-300 object-cover flex-shrink-0">
                <div class="flex flex-col min-w-0">
                    <h2 class="text-pink-700 font-bold text-sm sm:text-base truncate">${elm.workerName}</h2>
                    <p class="text-pink-500 text-xs sm:text-sm truncate">${elm.workerrole}</p>
                </div>
            </div>
            <button class="deleteinplace bg-red-400 w-fit text-white px-3 py-1 rounded-lg text-[12px] hover:bg-red-500 transition mt-2 sm:mt-0 flex-shrink-0">X</button>
        `;

        const infoinplace = card.querySelector('div.flex.flex-col');
        infoinplace.addEventListener('click', () => {
            AfficherWorkersInfo(i , arr);
        });

        const deleteinplace = card.querySelector('.deleteinplace');
        deleteinplace.addEventListener('click', () => {
            let deleteIndex = arr.findIndex(u => u.id === elm.id);
            let deletedUser = arr.splice(deleteIndex, 1);
            workers.push(deletedUser[0]);
            saveAll();
            renderroom(room);
            AfficherWorkers();
        });
        salle.appendChild(card);
    });
}

AfficherWorkers();
renderroom("SalleSécurité");
renderroom("SalleRéception");
renderroom("SalleConférence");
renderroom("SallePersonnel");
renderroom("SalleArchive");
renderroom("SalleServeur");
