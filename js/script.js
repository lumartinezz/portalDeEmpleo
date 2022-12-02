
const $ = (selector) => document.querySelector(selector)
const $$ = (selector) => document.querySelectorAll(selector)

let isEdit = false

/////////////////// FUNCIONES NAVEGACION ////////////////////

navHome.addEventListener("click", () => {
  $("#container").classList.remove("hidden")
  $("#seeDetails").classList.add("hidden")
  $("#filters").classList.remove("hidden")
})

navNewJob.addEventListener("click", () => {
  $("#editJobForm").classList.remove("hidden")
  $("#seeDetails").classList.add("hidden")
  $("#container").classList.add("hidden")
  $("#filters").classList.add("hidden")
  isEdit = true
})

/////////////////// FUNCION GET PARA GENERAR CARDS ////////////////////

const getJobs = () => {
  fetch(`https://63853647beaa6458265b9975.mockapi.io/Jobs`) 
.then(response => response.json()) //parseo la info recibida 
.then(data => generateCards(data))
}


getJobs()

/////////////////// FUNCION GET PARA EDITAR ////////////////////

const getJobAsync = async (id) => {
  const response = await fetch(`https://63853647beaa6458265b9975.mockapi.io/Jobs/${id}`)
  const job = await response.json()
  return job
}

/////////////////// FUNCION PUT QUE ENVIA INFO EDITADA ////////////////////

const editJob = (id) => {
  fetch(`https://63853647beaa6458265b9975.mockapi.io/Jobs/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "Application/json",
    },
    body: JSON.stringify(saveJobInfo()),
  }).finally(() => (getJobs()));
};

const saveJobInfo = () => {
  return {
    name: firstName.value,
    description: description.value, 
    category: category.value ,
    location: location.value,
    seniority: seniority.value

  }
}

/////////////////// FUNCION DELET PARA ELIMINAR ////////////////////

const deleteJob = (id) => {
  fetch(`https://63853647beaa6458265b9975.mockapi.io/Jobs/${id}`, {
    method: "DELETE",
  }).finally(() => window.location.href = "index.html")
}
/////////////////// FUNCION POST PARA AGREGAR EMPLEO ////////////////////

const addJob = () => {
  fetch(`https://63853647beaa6458265b9975.mockapi.io/Jobs`, {
    method: "POST",
    headers: {
      'Content-Type': 'Application/json'
    },
    body: JSON.stringify(saveJob())
  }).finally(() => window.location.href = "index.html")
}

const saveJob = () => {
  return {
    name: firstName.value,
    description: $("#description").value,
    category: $("#category").value,
    location: $("#location").value,
    seniority: $("#seniority").value
  }
}

/////////////////// FUNCION QUE GENERA LAS TARJETAS ////////////////////

const generateCards = (jobs) => {
  setTimeout(() => {

    $("#spinner").innerHTML = ""

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
              <button class="btn btn-detail px-6 m-1 h-[36px] text-white bg-[#d4d4d8] rounded hover:bg-[#d9f99d]"  data-id="${id}">
                Ver Detalles
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`
}

for (const btn of $$(".btn-detail")) {
  btn.addEventListener("click", () => {
    $("#container").classList.add("hidden")
    $("#seeDetails").classList.remove("hidden")
    $("#filters").classList.add("hidden")
      const jobId = btn.getAttribute("data-id")
      getJobAsync(jobId).then(data => jobDetails(data))
  })
}
  }, 2000)
}

/////////////////// FUNCION QUE GENERA CARD DETALLES////////////////////

const jobDetails = (job) => {
  $("#container").innerHTML = ""

  $("#seeDetails").innerHTML = `
  
      
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
              <button class="md:w-50 md:mx-1.5 px-6 h-[44px] text-white bg-[#d4d4d8] rounded hover:bg-[#d9f99d] hover:text-lg btn btn-edit"
                data-id="${job.id}"  
                
              >
                Editar Empleo
              </button>

              <button
                class="md:w-50 px-6 h-[44px] text-white bg-[#d4d4d8] rounded hover:bg-[#d9f99d] hover:text-lg btn btn-delete"
                data-id="${job.id}"
                id="btnDeletJob"
              >
                Eliminar Empleo
              </button>
            </div>
        </div>
      </section>
    `


    for (const btn of $$(".btn-edit")) {
      btn.addEventListener("click", () => {
        isEdit = false
          const jobId = btn.getAttribute("data-id")
          $("#btnEdit").setAttribute("data-id", jobId)
          getJobAsync(jobId).then(data => showForm(data))
      })
    }

    for (const btn of $$(".btn-delete")) {
      btn.addEventListener("click", () => {
        $("#seeDetails").classList.add("hidden")
        $("#deleteJob").classList.remove("hidden")
      })
    }
    

    for (const btn of $$(".btn-delete")) {
   $("#btnDelete").addEventListener("click", () => {
    const jobId = btn.getAttribute("data-id")
    $("#btnDelete").setAttribute("data-id", jobId)
    deleteJob(jobId)
  })
}
}

/////////////////// EVENTO QUE ELIMINA EL JOB


/////////////////// FUNCION QUE  PRECOPULA EL FORM ////////////////////
const showForm = (job) => {
  $("#seeDetails").classList.add("hidden")
  $("#container").innerHTML = ""
  $("#editJobForm").classList.remove("hidden")
  $("#firstName").value = job.name
  $("#description").value = job.description
  $("#category").value = job.category
  $("#location").value = job.location
  $("#seniority").value = job.seniority
}

/////////////////// EVENTO QUE ENVIA INFO EDITADA ////////////////////

$("#editJobForm").addEventListener("submit", (e) => {
  e.preventDefault()

  if (isEdit) {
    addJob()
  } else {
  const id = $("#btnEdit").getAttribute("data-id")
  editJob(id)
  }

  $("#container").innerHTML = ""
  $("#editJobForm").classList.add("hidden")
  $("#container").classList.remove("hidden")
})

/////////////////// EVENTO QUE CANCELA DESDE EDITAR ////////////////////

$("#btnCancel").addEventListener("click", () => {
  window.location.href = "index.html"
  $("#container").classList.remove("hidden")
  $("#filters").classList.remove("hidden")
  $("#deleteJob").classList.add("hidden")
})

/////////////////// FILTROS ////////////////////