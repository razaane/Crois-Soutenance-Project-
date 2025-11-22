const ajouterNewWorker = document.querySelector("#btnAdd");
const display = document.querySelector("#displayAllWorkers");

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




let workers = JSON.parse(localStorage.getItem("workers")) || [];

let SalleConférences = JSON.parse(localStorage.getItem("SalleConférences")) || [];
let SalleServeurs = JSON.parse(localStorage.getItem("SalleServeurs")) || [];
let SalleSécurités = JSON.parse(localStorage.getItem("SalleSécurités")) || [];
let SallePersonnels = JSON.parse(localStorage.getItem("SallePersonnels")) || [];
let SalleArchives = JSON.parse(localStorage.getItem("SalleArchives")) || [];
AfficherWorkers();


function saveAll() {
    localStorage.setItem("workers", JSON.stringify(workers));
    localStorage.setItem("SalleConférences", JSON.stringify(SalleConférences));
    localStorage.setItem("SalleServeurs", JSON.stringify(SalleServeurs));
    localStorage.setItem("SalleSécurités", JSON.stringify(SalleSécurités));
    localStorage.setItem("SallePersonnels", JSON.stringify(SallePersonnels));
    localStorage.setItem("SalleArchives", JSON.stringify(SalleArchives));
}


ajouterNewWorker.addEventListener("click", (e) => {
    e.preventDefault();
    formulaire.classList.remove("hidden");
})

btnExp.addEventListener("click", (e) => {
    e.preventDefault();
    const box = document.createElement("div");
    box.className = ("flex flex-col w-[90%] font-semibold");
    box.innerHTML = `SZ
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
    let worker = {
        workerPhoto: photo.value,
        workerName: fullName.value,
        workerAge: age.value,
        workerTel: tel.value,
        workerEmail: email.value,
        workerrole: roles.value,
        workerEperience: allExperience
    }
    workers.push(worker);
    localStorage.setItem("workers", JSON.stringify(workers));
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
        box.className = "bg-purple-300 w-[100%] h-[65px] rounded-md flex justify-evenly";

        box.innerHTML = `
            <div class="w-[20%] h-[95%] p-2">
                <button class="infoWorker">
                    <img src="${oneWorker.workerPhoto}">
                </button>
            </div>
            <div class="flex flex-col w-[55%] h-[95%] gap-1 p-2">
                <p class="font-bold text-[15px]">${oneWorker.workerName}</p>
                <p class="text-[11px]">${oneWorker.workerrole}</p>
            </div>
        `;

        display.appendChild(box);

        const infoWorker = box.querySelector(".infoWorker");
        infoWorker.addEventListener("click", (e) => {
            e.preventDefault();
            AfficherWorkersInfo(index);
        });
    });
}

const parent = document.querySelector("#parent");
function AfficherWorkersInfo(index) {
    const bigBox = document.createElement("div");
    bigBox.className = " absolute bg-white w-[90%] h-[63vh] rounded-md flex flex-col items-center gap-6 m-4"
    bigBox.innerHTML = `
    <img class = "h-[40%]" src="${index.workerPhoto}">
    <div class ="flex flex-col gap-2 " >
        <p class="">Nom et Prénom : ${index.workerName}</p>
        <p class="">Le role : ${index.workerrole}</p>
        <p class="">L'age : ${index.workerAge}</p>
        <p class="">Adresse email : ${index.workerEmail}</p>
        <button class="closeinfo bg-red-500">fermer</button>
    `
    parent.appendChild(bigBox);
    const closeinfo = bigBox.querySelector('.closeinfo');
    closeinfo.addEventListener('click', (e) => {
        e.preventDefault();
        bigBox.classList.add("hidden");

    })
}

const buttons = document.getElementsByClassName(".salle-btn");

const accessRules = {
    recep: ["Récéptioniste", "Manager", "Nettoyage"],
    sec: ["Agents Sécurités", "Manager", "Nettoyage"],
    serv: ["Nettoyage", "Manager", "Théchniciens IT"],
    arc: ["Manager"]
};

buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        const salleName = btn.dataset.salle;
        const allowedRoles = accessRules[salleName];

        const salleDiv = document.getElementById(salleName);
        salleDiv.innerHTML = "";

        workers.forEach(emp => {
            const role = emp.dataset.role;

            if (allowedRoles.includes(role)) {
                const clone = emp.cloneNode(true);
                salleDiv.appendChild(clone);
            }
        });
    })
})

const btnConf = document.querySelector("#btnConf");
const btnRécp = document.querySelector("#btnRécp");
const btnSécu = document.querySelector("#btnSécu");
const btnServ = document.querySelector("#btnServ");
const btnPers = document.querySelector("#btnPers");
const btnArc = document.querySelector("#btnArc");

function moveToSalle(salleName) {
    let allowed = roles[salleName];
    let target;

    if (salleName === "recep") {
        target = SalleRéceptions;
    };
    if (salleName === "sec") {
        target = SalleSécurités;
    };
    if (salleName === "serv") {
        target = SalleServeurs;
    };
    if (salleName === "arc") {
        target = SalleArchives;
    };

    let newWorkers = [];

    workers.forEach(w => {
        if (allowed.includes(w.role)) {
            target.push(w);
        } else {
            newWorkers.push(w);
        }
    });

    workers = newWorkers;

    saveAll();
    AfficherWorkers();
    showSalle(salleName);

}

function renderSalle(salleName) {
    const allowedRoles = accessRules[salleName];
    const salleDiv = document.getElementById(salleName);

    salleDiv.innerHTML = ""; 

    workers.forEach(emp => {
        if (allowedRoles.includes(emp.workerrole)) {
            const card = document.createElement("div");
            card.className = "bg-blue-200 p-2 rounded-md flex items-center gap-3 w-full";

            card.innerHTML = `
                <img src="${emp.workerPhoto}" class="w-12 h-12 rounded-full">
                <div>
                    <p class="font-bold">${emp.workerName}</p>
                    <p class="text-sm">${emp.workerrole}</p>
                </div>
            `;

            salleDiv.appendChild(card);
        }
    });
}


document.getElementById("btnRecep").addEventListener("click", () => {
    moveToSalle("recep");
});

document.getElementById("btnSec").addEventListener("click", () => {
    moveToSalle("sec");
});

document.getElementById("btnServ").addEventListener("click", () => {
    moveToSalle("serv");
});

document.getElementById("btnArc").addEventListener("click", () => {
    moveToSalle("arc");
});



AfficherWorkers();









// // ==== SELECTEURS ====
// const ajouterNewWorker = document.querySelector("#btnAdd");
// const display = document.querySelector("#displayAllWorkers");

// const SalleConférence = document.querySelector("#SalleConférence");
// const SalleServeur = document.querySelector("#SalleServeurs");
// const SalleRéception = document.querySelector("#SalleRéception");
// const SalleSécurité = document.querySelector("#SalleSécurité");
// const SallePersonnel = document.querySelector("#SallePersonnel");
// const SalleArchive = document.querySelector("#SalleArchive");

// const formulaire = document.querySelector("#Formwrk");

// const photo = document.querySelector("#photo");
// const fullName = document.querySelector("#fullName");
// const age = document.querySelector("#age");
// const email = document.querySelector("#email");
// const tel = document.querySelector("#tel");
// const roles = document.querySelector("#roles");

// const btnExp = document.querySelector("#btnExp");
// const btnSubmit = document.querySelector("#btnSubmit");

// const parent = document.querySelector("#parent");

// // ==== LOCALSTORAGE ====
// let workers = JSON.parse(localStorage.getItem("workers")) || [];
// let SalleConférences = JSON.parse(localStorage.getItem("SalleConférences")) || [];
// let SalleServeurs = JSON.parse(localStorage.getItem("SalleServeurs")) || [];
// let SalleSécurités = JSON.parse(localStorage.getItem("SalleSécurités")) || [];
// let SallePersonnels = JSON.parse(localStorage.getItem("SallePersonnels")) || [];
// let SalleArchives = JSON.parse(localStorage.getItem("SalleArchives")) || [];

// // ==== ACCESS RULES ====
// const accessRules = {
//     recep: ["Récéptioniste", "Manager", "Nettoyage"],
//     sec: ["Agents Sécurités", "Manager", "Nettoyage"],
//     serv: ["Nettoyage", "Manager", "Théchniciens IT"],
//     arc: ["Manager"]
// };

// // ==== SAVE ====
// function saveAll() {
//     localStorage.setItem("workers", JSON.stringify(workers));
//     localStorage.setItem("SalleConférences", JSON.stringify(SalleConférences));
//     localStorage.setItem("SalleServeurs", JSON.stringify(SalleServeurs));
//     localStorage.setItem("SalleSécurités", JSON.stringify(SalleSécurités));
//     localStorage.setItem("SallePersonnels", JSON.stringify(SallePersonnels));
//     localStorage.setItem("SalleArchives", JSON.stringify(SalleArchives));
// }

// // ==== AJOUTER WORKER ====
// ajouterNewWorker.addEventListener("click", (e) => {
//     e.preventDefault();
//     formulaire.classList.remove("hidden");
// });

// // Ajouter expérience
// btnExp.addEventListener("click", (e) => {
//     e.preventDefault();
//     const box = document.createElement("div");
//     box.className = "flex flex-col w-[90%] font-semibold";
//     box.innerHTML = `
//         <div class="flex flex-col w-[100%] font-semibold">
//             <label>Votre Experience :</label>
//             <input type="text" class="descrexper border border-black p-1 rounded-md" placeholder="Entrer votre Expérience">
//         </div>
//         <div class="flex flex-col w-[100%] font-semibold">
//             <label>Début :</label>
//             <input type="date" class="debutexper border border-black p-1 rounded-md">
//         </div>
//         <div class="flex flex-col w-[100%] font-semibold">
//             <label>Fin :</label>
//             <input type="date" class="finexper border border-black p-1 rounded-md">
//         </div>
//     `;
//     formulaire.insertBefore(box, btnExp.parentElement);
// });

// // Submit worker
// btnSubmit.addEventListener("click", (e) => {
//     e.preventDefault();
//     let allExperience = [];
//     const descrexper = document.querySelectorAll(".descrexper");
//     const debutexper = document.querySelectorAll(".debutexper");
//     const finexper = document.querySelectorAll(".finexper");

//     descrexper.forEach((e, i) => {
//         allExperience.push({
//             description: e.value,
//             debut: debutexper[i].value,
//             fin: finexper[i].value
//         });
//     });

//     let worker = {
//         workerPhoto: photo.value,
//         workerName: fullName.value,
//         workerAge: age.value,
//         workerTel: tel.value,
//         workerEmail: email.value,
//         workerrole: roles.value,
//         workerExperience: allExperience
//     };

//     workers.push(worker);
//     saveAll();
//     alert("Votre Employé a été ajouté avec succès!");

//     formulaire.classList.add("hidden");
//     formulaire.reset();
//     formulaire.querySelectorAll(".descrexper, .debutexper, .finexper").forEach(el => el.parentElement.remove());

//     AfficherWorkers();
// });

// // ==== AFFICHER WORKERS ====
// function AfficherWorkers() {
//     display.innerHTML = "";
//     workers.forEach((w, i) => {
//         const box = document.createElement("div");
//         box.className = "bg-purple-300 w-[100%] h-[65px] rounded-md flex justify-evenly items-center";

//         box.innerHTML = `
//             <div class="w-[20%] h-[95%] p-2">
//                 <button class="infoWorker">
//                     <img src="${w.workerPhoto}" class="w-full h-full object-cover rounded-full">
//                 </button>
//             </div>
//             <div class="flex flex-col w-[55%] h-[95%] gap-1 p-2">
//                 <p class="font-bold text-[15px]">${w.workerName}</p>
//                 <p class="text-[11px]">${w.workerrole}</p>
//             </div>
//         `;
//         display.appendChild(box);

//         box.querySelector(".infoWorker").addEventListener("click", (e) => {
//             e.preventDefault();
//             AfficherWorkersInfo(i);
//         });
//     });
// }

// // ==== AFFICHER WORKER INFO ====
// function AfficherWorkersInfo(index) {
//     const emp = workers[index];
//     const bigBox = document.createElement("div");
//     bigBox.className = "absolute bg-white w-[90%] h-[63vh] rounded-md flex flex-col items-center gap-6 m-4";
//     bigBox.innerHTML = `
//         <img class="h-[40%]" src="${emp.workerPhoto}">
//         <div class="flex flex-col gap-2">
//             <p>Nom et Prénom: ${emp.workerName}</p>
//             <p>Role: ${emp.workerrole}</p>
//             <p>Age: ${emp.workerAge}</p>
//             <p>Email: ${emp.workerEmail}</p>
//         </div>
//         <button class="closeinfo bg-red-500 text-white p-1 rounded">Fermer</button>
//     `;
//     parent.appendChild(bigBox);

//     bigBox.querySelector(".closeinfo").addEventListener("click", () => {
//         bigBox.remove();
//     });
// }

// // ==== RENDER SALLE ====
// function renderSalle(salleName) {
//     const allowedRoles = accessRules[salleName];
//     const salleDiv = document.getElementById(salleName);
//     salleDiv.innerHTML = "";

//     workers.forEach(emp => {
//         if (allowedRoles.includes(emp.workerrole)) {
//             const card = document.createElement("div");
//             card.className = "bg-blue-200 p-2 rounded-md flex items-center gap-3 w-full";

//             card.innerHTML = `
//                 <img src="${emp.workerPhoto}" class="w-12 h-12 rounded-full">
//                 <div>
//                     <p class="font-bold">${emp.workerName}</p>
//                     <p class="text-sm">${emp.workerrole}</p>
//                 </div>
//             `;
//             salleDiv.appendChild(card);
//         }
//     });
// }

// // ==== BUTTONS SALLES ====
// document.getElementById("btnRecep").addEventListener("click", () => renderSalle("recep"));
// document.getElementById("btnSec").addEventListener("click", () => renderSalle("sec"));
// document.getElementById("btnServ").addEventListener("click", () => renderSalle("serv"));
// document.getElementById("btnArc").addEventListener("click", () => renderSalle("arc"));

// // ==== INIT ====
// AfficherWorkers();
