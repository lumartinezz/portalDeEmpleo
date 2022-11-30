
const $ = (selector) => document.querySelector(selector)
const $$ = (selector) => document.querySelectorAll(selector)


/////////////////// FUNCIONES NAVEGACION ////////////////////
navHome.addEventListener("click", () => {
  $("#container").classList.remove("hidden")
  $("#seeDetails").classList.add("hidden")
  $("#filters").classList.remove("hidden")
})

navNewJob.addEventListener("click", () => {
  $("#newJobForm").classList.remove("hidden")
  $("#seeDetails").classList.add("hidden")
  $("#container").classList.add("hidden")
  $("#filters").classList.add("hidden")
})


/////////////////// FUNCIONES DOM ////////////////////

const viewDetails = (job) => {
  $("#container").classList.add("hidden")
  $("#seeDetails").classList.remove("hidden")
  $("#filters").classList.add("hidden")
}

/////////////////// FUNCION GET PARA LLAMAR A LA API ////////////////////

const getJobs = () => {
  fetch(`https://63853647beaa6458265b9975.mockapi.io/Jobs`) 
.then(response => response.json()) //parseo la info recibida 
.then(data => generateCards(data))
}


getJobs()

const getJob = (id) => {
fetch(`https://63853647beaa6458265b9975.mockapi.io/Jobs/${id}`) 
.then(response => response.json()) //parseo la info recibida 
.then(data => viewDetails(data))
}

/////////////////// FUNCION QUE GENERA LAS TARJETAS ////////////////////
const generateCards = (jobs) => {
for (const {id, name, description, location, seniority, category} of jobs){

  $("#container").innerHTML += `
    <div class="p-10">

        <div class=" w-full lg:max-w-full lg:flex">

              <div class="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" style="background-image: url('/mountain.jpg')" title="Mountain">
              </div>

            <div class="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
              
            <div class="mb-8">
                
            <div class="text-gray-900 font-bold text-xl mb-2">${name}</div>
                
            <p class="text-gray-700 text-base">${description}</p>
              
            </div>
            
            <div class="flex items-center">
                <img class="h-20 w-20 rounded-full mr-4" src="./assets/juicy-man-programmer-writing-code-and-make-web-design-on-a-pc.gif" alt="Avatar of Writer">
                
                <div class="px-6 pt-4 pb-2">
                <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">${category}</span>
                <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">${location}</span>
                <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">${seniority}</span>
            </div>

            <div class="flex justify-end mt-4">
              <button class="px-6 h-[44px] text-white bg-[#d4d4d8] rounded hover:bg-[#d9f99d] hover:text-lg
              btn-details" onclick ="getJob(${id})">
                Ver Detalles
              </button>
            </div>

          </div>

            
          </div>
        </div>
    </div>`

}
}






// const user = {
//   name: "test EDICION PUT",
//   age: 20,
//   email: "lala@lala.com"
// }

// fetch(`https://63853647beaa6458265b9975.mockapi.io/Jobs`,{
//   method: "POST",
//   headers:{
//     'Content-Type': 'Application/json'
//   },
//   body: JSON.stringify(user)
// })

// fetch(`https://63853647beaa6458265b9975.mockapi.io/Jobs/1`,{
//   method: "PUT",
//   headers:{
//     'Content-Type': 'Application/json'
//   },
//   body: JSON.stringify(user)
// })


// fetch(`https://63853647beaa6458265b9975.mockapi.io/Jobs/1`,{
//   method: "DELETE"
// })