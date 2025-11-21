const ajouterNewWorker = document.querySelector("#btnAdd");
const display = document.querySelector("#displayAllWorkers");

const SalleConférence = document.querySelector("#SalleConférence");
const SalleServeur = document.querySelector("#SalleServeurs");
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
const btnSubmit= document.querySelector("#btnSubmit");


let workers = JSON.parse(localStorage.getItem("workers")) || [];

let SalleConférences = JSON.parse(localStorage.getItem("SalleConférences")) || [];
let SalleServeurs = JSON.parse(localStorage.getItem("SalleServeurs")) || [];
let SalleSécurités = JSON.parse(localStorage.getItem("SalleSécurités")) || [];
let SallePersonnels = JSON.parse(localStorage.getItem("SallePersonnels")) || [];
let SalleArchives = JSON.parse(localStorage.getItem("SalleArchives")) || [];

ajouterNewWorker.addEventListener("click" , (e) => {
    e.preventDefault();
    formulaire.classList.remove("hidden");
})

btnExp.addEventListener("click" , (e) => {
    e.preventDefault();
    const box = document.createElement("div");
    box.className = ("flex flex-col w-[90%] font-semibold");
    box.innerHTML =`
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
    formulaire.insertBefore(box,btnExp.parentElement);
})

btnSubmit.addEventListener("click" , (e) =>{
    e.preventDefault();
    let worker = {
        workerPhoto : photo.value ,
        workerName : fullName.value ,
        workerAge : age.value ,
        workerTel : tel.value ,
        workerEmail : email.value ,
        workerEperience : allExperience
    }
    let allExperience = [];
    const descrexper = document.querySelectorAll(".descrexper");
    const debutexper = document.querySelectorAll(".debutexper");
    const finexper = document.querySelectorAll(".finexper");
    descrexper.forEach((e,index)=>{
        exp = {
            description : e[index].value,
            debut : debutexper[index].value,
            fin : finexper[index].value
        }
        allExperience.push(exp);
    })
    
} )








