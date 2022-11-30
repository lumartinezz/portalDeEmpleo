
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
.then(data => jobDetails(data))
}

/////////////////// FUNCION QUE GENERA LAS TARJETAS ////////////////////
const generateCards = (jobs) => {
for (const {id, name, description, location, seniority, category} of jobs){

  $("#container").innerHTML += `

    <div class="p-10">
 
    <div class=" lg:max-w-full lg:flex w-full md:flex justify-center">
     
    <div class="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" style="background-image: url('./assets/juicy-man-programmer-writing-code-and-make-web-design-on-a-pc.gif')">
      </div>

      <div class="md:w-4/12 border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
        <div class="mb-8">
         
          <div class="text-gray-900 font-bold text-xl mb-2">${name}</div>
          <p class="text-gray-700 text-base">${description}</p>
        </div>
        <div class="flex items-center">
          <div class="text-sm">
            <p class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">${category}</p>
            <p class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">${location}</p>
            <p class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">${seniority}</p>

            <div>
              <button class="px-6 m-1 h-[36px] text-white bg-[#d4d4d8] rounded hover:bg-[#d9f99d] btn-details" onclick ="getJob(${id})">
                Ver Detalles
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`
}
}

/////////////////// FUNCION VER DETALLES ////////////////////
const jobDetails = (job) => {
  $("#seeDetails").innerHTML += `
  
      
      <section class="lg:max-w-4xl p-12 max-w-none w-full rounded bg-white drop-shadow-2xl">
        
          <h2 class="lg:text-4xl text-3xl font-bold">${job.name}</h2>
          
        <div class="flex flex-col mt-8">

          <div class="flex flex-col md:flex-row">
            <div>
              <img  src="./assets/juicy-man-programmer-writing-code-and-make-web-design-on-a-pc.gif">
            </div>

            <div class="md:w-1/2 mb-1 font-bold h-auto mb-2 p-2 rounded border-2 cursor-pointer focus:border-blue-600 focus:outline-none">
                <p>${job.description}</p>
            </div>
          </div>

          <div class="flex items-center">
          <div class="text-sm">
            <p class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">${job.category}</p>
            <p class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">${job.location}</p>
            <p class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">${job.seniority}</p>

            <div>
            </div>

            <div class="flex flex-col justify-end md:flex items-end md:flex-row">
              <button
                class="md:w-50 md:mx-1.5 px-6 h-[44px] text-white bg-[#d4d4d8] rounded hover:bg-[#d9f99d] hover:text-lg"
                data-id="${job.id}"
                id="btnEditJob"
                type="submit"
              >
                Editar Empleo
              </button>

              <button
                class="md:w-50 px-6 h-[44px] text-white bg-[#d4d4d8] rounded hover:bg-[#d9f99d] hover:text-lg"
                data-id="${job.id}"
                id="btnDeletJob"
                type="submit"
              >
                Eliminar Empleo
              </button>
            </div>
        </div>
      </section>
    `


    $("#container").classList.add("hidden")
    $("#seeDetails").classList.remove("hidden")
    $("#filters").classList.add("hidden")
}























// fetch(`https://63853647beaa6458265b9975.mockapi.io/Jobs/1`,{
//   method: "DELETE"
// })