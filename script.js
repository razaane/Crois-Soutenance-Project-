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


let nomRegex = /^[A-Za-z\s]+$/;
let ageRegex = /^(1[0-9]|[2-9][0-9])$/;
let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
let telRegex = /^[0-9]{10}$/;
let roleRegex = /^(Manager|Nettoyage|Techniciens IT|Agents de sécurité|Réceptionnistes|Autres rôles)$/;




let workers = JSON.parse(localStorage.getItem("workers")) || [];

let SalleConférences = JSON.parse(localStorage.getItem("SalleConférences")) || [];
let SalleServeurs = JSON.parse(localStorage.getItem("SalleServeurs")) || [];
let SalleSécurités = JSON.parse(localStorage.getItem("SalleSécurités")) || [];
let SallePersonnels = JSON.parse(localStorage.getItem("SallePersonnels")) || [];
let SalleArchives = JSON.parse(localStorage.getItem("SalleArchives")) || [];
let SalleRéceptions = JSON.parse(localStorage.getItem("SalleRéceptions")) || [];
AfficherWorkers();


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

  if (!roleRegex.test(roles.value)) {
    alert("Role invalid");
    return;
  }
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
        id: Date.now(),
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
        box.className = "bg-purple-300  min-w-[70%] max-w-[50%] h-[65px] rounded-md flex justify-evenly";

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
        bigBox.remove();

    })
}

// const buttons = document.getElementsByClassName(".salle-btn");

// const accessRules = {
//     recep: ["Récéptioniste", "Manager", "Nettoyage"],
//     sec: ["Agents Sécurités", "Manager", "Nettoyage"],
//     serv: ["Nettoyage", "Manager", "Théchniciens IT"],
//     arc: ["Manager"]
// };




// buttons.forEach(btn => {
//     btn.addEventListener("click", () => {
//         const salleName = btn.dataset.salle;
//         const allowedRoles = accessRules[salleName];

//         const salleDiv = document.getElementById(salleName);
//         salleDiv.innerHTML = "";

//         workers.forEach(emp => {
//             const role = emp.dataset.role;

//             if (allowedRoles.includes(role)) {
//                 const clone = emp.cloneNode(true);
//                 salleDiv.appendChild(clone);
//             }
//         });
//     })
// })

const btnConf = document.querySelector("#btnConf");
const btnRécp = document.querySelector("#btnRécp");
const btnSécu = document.querySelector("#btnSécu");
const btnServ = document.querySelector("#btnServ");
const btnPers = document.querySelector("#btnPers");
const btnArc = document.querySelector("#btnArc");


// drna hna event ela kola btn ykhadm lina function dyl lfiltrage 
btnConf.addEventListener('click',()=>{
   filtrage("SalleConférence"); 
})
btnRécp.addEventListener('click',()=>{
   filtrage("SalleRéception"); 
})
btnSécu.addEventListener('click',()=>{
   filtrage("SalleSécurité"); 
})
btnServ.addEventListener('click',()=>{
   filtrage("SalleServeur"); 
})
btnPers.addEventListener('click',()=>{
   filtrage("SallePersonnel"); 
})
btnArc.addEventListener('click',()=>{
   filtrage("SalleArchive"); 
})


// had function katfiltri liya kola wa7d ela 7sab role dyalo  o kan9arnoh mea id dyl la salle 

function filtrage(room) {
    let  filtrwrk = workers.filter((e)=> {
        if(room === "SalleSécurité"){
            return e.workerrole === "Agents Sécurités" ||  e.workerrole ===  "Nettoyage"
        }
        if(room === "SalleRéception"){
            return e.workerrole === "Récéptioniste" || e.workerrole === "Nettoyage" || e.workerrole === "Manager" || e.workerrole === "Autres rôles" || e.workerrole === "Théchniciens IT" || e.workerrole === "Agents Sécurités"
        }
        if(room === 'SalleConférence'){
            return e.workerrole === "Nettoyage" || e.workerrole === "Manager" || e.workerrole === "Théchniciens IT"
        }
        if(room === "SallePersonnel"){
            return e.workerrole === "Récéptioniste" || e.workerrole === "Nettoyage" || e.workerrole === "Manager" || e.workerrole === "Théchniciens IT" || e.workerrole ==="Agents Sécurités"
        }
        if(room === "SalleArchive"){
            return e.workerrole === "Manager"
        }
        if(room === "SalleServeur"){
            return e.workerrole === "Nettoyage" || e.workerrole === "Manager" || e.workerrole === "Théchniciens IT"
        }
    })

    console.log(filtrwrk);
    

    const box = document.createElement("div"); // hna knsawbo modal li ghadi n7oto fiha kola carta dyl l workers 
    box.className = "absolute bg-white w-[90%] h-[63vh] rounded-md flex flex-col items-center gap-2 m-4 sm:w-[40%]";
    box.innerHTML = `
        <button class="fermer absolute top-1 right-1 bg-red-600 w-fit text-white px-3 py-1 rounded-lg text-[12px] hover:bg-red-700 transition">X</button>
    `
    const fermer = box.querySelector('.fermer');
    fermer.addEventListener('click', () => {
        box.remove();
    });
    filtrwrk.forEach((index)=>{   // hna knjibo hadak array li filtrina fih o kanbiyno hadachi li fih matalan ila filtrina ela server hadak array kywali 3amr bi nas li endhom l7a9 ydokhlo lserver  o kabynohom hna kola wa7d fi carda kndiro foreach
        let worker = document.createElement("div")
        worker.id = index.id;
        worker.innerHTML = `
        <div class="flex bg-purple-500 justify-center items-center w-[260px] ">
        <div class="w-[50%] flex flex-col justify-center items-center">
        <h2 class="text-center text-[17px] font-bold">${index.workerName}</h2>
         <p> ${index.workerrole}</p></div>
         <div class="w-[50%]">
         <button class="ajouterdans bg-red-600 text-white px-3 py-2 h-[40px] rounded-lg text-[12px] hover:bg-red-700 transition">ajouter</button>
        </div>
        </div>
        `; 
        box.appendChild(worker);
        const ajo = worker.querySelector('.ajouterdans');
        ajo.addEventListener('click',()=>{
            ajouterdanslasalle(index,room);
            box.remove();
        })
    })
    parent.appendChild(box);
}


// had lfuncton dyl knpushiw fi array dyl kola salle hadok nas li bghina n7oto drna lihom ajouter 
function ajouterdanslasalle(index,room){
    if(room === "SalleSécurité"){
        SalleSécurités.push(index);
    }
    if(room === "SalleRéception"){
        SalleRéceptions.push(index);  
    }
    if(room === 'SalleConférence'){
        SalleConférences.push(index);
    }
    if(room === "SallePersonnel"){
        SallePersonnels.push(index);
    }
    if(room === "SalleArchive"){
        SalleArchives.push(index);
    }
    if(room === "SalleServeur"){
        SalleServeurs.push(index);
    }
    let deleteIndex = workers.findIndex(u => u.id === index.id)
    workers.splice(deleteIndex,1); // hna knsms7ohom mn al array lwl 
    saveAll(); // o kn9ado 3awtani local storage 
    renderroom(room);
    AfficherWorkers(); // kn3yto eliha 3awtani bach tbyn lina chkon li b9a fi array dyl lworkers
}

// had lfunction dyl bach nbynohom fi blayshom wa7d bi wa7d o knswbo lihom card dylhom 

function renderroom(room) {

    let arr;
    let salle = document.querySelector(`#${room}`)

    if(room === "SalleSécurité"){
        arr = SalleSécurités;
    }
    if(room === "SalleRéception"){  
        arr = SalleRéceptions;
    }
    if(room === 'SalleConférence'){
        arr = SalleConférences;
    }
    if(room === "SallePersonnel"){
        arr = SallePersonnels;
    }
    if(room === "SalleArchive"){
        arr = SalleArchives;
    }
    if(room === "SalleServeur"){
        arr = SalleServeurs;
    }
    salle.innerHTML = '';
    
    arr.forEach((index) => {

        const card = document.createElement('div');
        card.className = "flex justify-evenly items-center  w-full h-[40px] bg-white/80 backdrop-blur-sm shadow-md border border-gray-300 rounded-xl hover:shadow-lg transition duration-200";
        card.innerHTML = `
            <button class="infoinplace">
                <h2 class="text-center w-[50%] text-[12px] font-bold">${index.workerName}</h2>
            </button>
            <button class="deleteinplace bg-red-600 w-fit text-white px-3 py-1 rounded-lg text-[12px] hover:bg-red-700 transition">X</button>
        `;

        const infoinplace = card.querySelector('.infoinplace');
        infoinplace.addEventListener('click', () => {
            AfficherWorkersInfo(index);
        });

        const deleteinplace = card.querySelector('.deleteinplace');
        deleteinplace.addEventListener('click', () => {
            let deleteIndex = arr.findIndex(u => u.id === index.id)
            let deletedUser = arr.splice(deleteIndex,1);
            workers.push(deletedUser[0]);
            saveAll();
            renderroom(room);
            AfficherWorkers();
        });
        salle.appendChild(card);
    });
}

// function moveToSalle(salleName) {
//     let allowed = roles[salleName];
//     let target;

//     if (salleName === "recep") {
//         target = SalleRéceptions;
//     };
//     if (salleName === "sec") {
//         target = SalleSécurités;
//     };
//     if (salleName === "serv") {
//         target = SalleServeurs;
//     };
//     if (salleName === "arc") {
//         target = SalleArchives;
//     };

//     let newWorkers = [];

//     workers.forEach(w => {
//         if (allowed.includes(w.role)) {
//             target.push(w);
//         } else {
//             newWorkers.push(w);
//         }
//     });

//     workers = newWorkers;

//     saveAll();
//     AfficherWorkers();
//     showSalle(salleName);

// }

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


// document.getElementById("btnRecep").addEventListener("click", () => {
//     moveToSalle("recep");
// });

// document.getElementById("btnSec").addEventListener("click", () => {
//     moveToSalle("sec");
// });

// document.getElementById("btnServ").addEventListener("click", () => {
//     moveToSalle("serv");
// });

// document.getElementById("btnArc").addEventListener("click", () => {
//     moveToSalle("arc");
// });



AfficherWorkers();
renderroom("SalleSécurité");
renderroom("SalleRéception");
renderroom("SalleConférence");
renderroom("SallePersonnel");
renderroom("SalleArchive");
renderroom("SalleServeur");









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
