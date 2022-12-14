
const $ = (selector) => document.querySelector(selector)
const $$ = (selector) => document.querySelectorAll(selector)

let isEdit = false

/////////////////// FUNCIONES NAVEGACION ////////////////////

navHome.addEventListener("click", () => {
  $("#container").classList.remove("hidden")
  $("#seeDetails").classList.add("hidden")
  $("#filters").classList.remove("hidden")
  $("#editJobForm").classList.add("hidden")
  generateCards()

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
const generateCard = ({name, description,category, location, seniority, id}) => {
  let img = "";

      if (seniority === "Senior") {
        img =          "./assets/juicy-man-programmer-writing-code-and-make-web-design-on-a-pc.gif";
      } else if (seniority === "Junior") {
        img =
          "./assets/juicy-business-coach-explains-the-material-to-the-woman.gif";
      } else if (seniority === "Trainee") {
        img = "./assets/juicy-girl-working-at-home.gif";
      } 

      return   `
      <div class="rounded overflow-hidden shadow-lg">
        <img class="w-full" src=${img}>
        <div class="px-6 py-4">
          <div class="font-bold text-xl mb-2">${name}</div>
          <p class="text-gray-700 text-base">
           ${description}
          </p>
        </div>
        <div class="px-6 pt-4 pb-2">
        <p class="inline-block bg-gray-300 rounded-full px-3 py-1 text-sm font-semibold text-lime-700 mr-2 mb-2">${category}</p>
        <p class="inline-block bg-gray-300 rounded-full px-3 py-1 text-sm font-semibold text-lime-700 mr-2 mb-2">${location}</p>
        <p class="inline-block bg-gray-300 rounded-full px-3 py-1 text-sm font-semibold text-lime-700 mr-2 mb-2">${seniority}</p>
        </div>
        <button class="btn btn-detail px-6 ml-6 mb-5 h-[36px] text-gray-700 bg-[#d4d4d8] rounded hover:bg-[#d9f99d] hover:font-bold hover:text-lime-700"  data-id="${id}">
        Ver Detalles
      </button>
      </div>`

}
const generateCards = (jobs) => {

  $("#spinner").classList.remove("hidden")

  setTimeout(() => {

    $("#spinner").classList.add("hidden")


    for (let i = 0; i < jobs.length; i= i + 3) {
      const job1 = jobs[i];
      const job2 = jobs[i+1];
      const job3 = jobs[i+2];

      $("#container").innerHTML += `

      <div class="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
      <!--Card 1-->
      ${job1 ? generateCard(job1): ''}
      <!--Card 2-->
      ${job2 ? generateCard(job2): ''}
      <!--Card 3-->
      ${job3 ? generateCard(job3): ''}
      </div> `
    }

for (const btn of $$(".btn-detail")) {
  btn.addEventListener("click", () => {
    $("#seeDetails").classList.remove("hidden")
    $("#filters").classList.add("hidden")
    $("#container").classList.add("hidden")
  
      const jobId = btn.getAttribute("data-id")
      getJobAsync(jobId).then(data => jobDetails(data))
  }) 
}  

  }, 2000)
}

/////////////////// FUNCION QUE GENERA CARD DETALLES////////////////////

const jobDetails = (job) => {
  $("#spinner").classList.remove("hidden")

  setTimeout(() => {

    $("#spinner").classList.add("hidden")

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
              <button class="md:w-50 md:mx-1.5 px-6 h-[44px] text-gray-700 bg-[#d4d4d8] rounded hover:bg-[#d9f99d] hover:font-bold hover:text-lime-700 btn btn-edit"
                data-id="${job.id}">
                Editar Empleo
              </button>
              <button
                class="md:w-50 px-6 h-[44px] text-gray-700 bg-[#d4d4d8] rounded hover:bg-[#d9f99d] hover:font-bold hover:text-lime-700 btn btn-delete"
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
}, 2000)
} 

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
  
  
  $("#editJobForm").classList.add("hidden")
  $("#container").classList.remove("hidden")
  $("#filters").classList.remove("hidden")
})

/////////////////// EVENTO QUE CANCELA DESDE EDITAR ////////////////////
$("#btnCancel").addEventListener("click", () => {
  window.location.href = "index.html"
  $("#container").classList.remove("hidden")
  $("#filters").classList.remove("hidden")
  $("#deleteJob").classList.add("hidden")
})

/////////////////// FILTROS ////////////////////
const searchLocation = (location) => {

  $("#spinner").classList.remove("hidden")

  setTimeout(() => {

    $("#spinner").classList.add("hidden")
    $("#filtersLocation").classList.add("hidden")
    $("#filtersCategory").classList.add("hidden")
    $("#filtersSeniority").classList.add("hidden")

  fetch(`https://63853647beaa6458265b9975.mockapi.io//Jobs?location=${location}`)
    .then(res => res.json())
    .then(data => generateCards(data))
  }, 2000)
}


$("#btnSearch").addEventListener("click", () => {
    $("#container").innerHTML = ""
   searchLocation($("#filtersLocation").value)
})


const searchSeniority = (seniority) => {

  $("#spinner").classList.remove("hidden")

  setTimeout(() => {

    $("#spinner").classList.add("hidden")
    $("#filtersLocation").classList.add("hidden")
    $("#filtersCategory").classList.add("hidden")
    $("#filtersSeniority").classList.add("hidden")

  fetch(`https://63853647beaa6458265b9975.mockapi.io//Jobs?seniority=${seniority}`)
    .then(res => res.json())
    .then(data => generateCards(data))
  }, 2000)
}

$("#btnSearch").addEventListener("click", () => {
    $("#container").innerHTML = ""
    searchSeniority($("#filtersSeniority").value)
})

const searchCategory = (category) => {
  
  $("#spinner").classList.remove("hidden")

  setTimeout(() => {

    $("#spinner").classList.add("hidden")
    $("#filtersLocation").classList.add("hidden")
    $("#filtersCategory").classList.add("hidden")
    $("#filtersSeniority").classList.add("hidden")

  fetch(`https://63853647beaa6458265b9975.mockapi.io//Jobs?category=${category}`)
    .then(res => res.json())
    .then(data => generateCards(data))
  }, 2000)
}

$("#btnSearch").addEventListener("click", () => {
    $("#container").innerHTML = ""
    searchCategory($("#filtersCategory").value)
})

/////////////////// FUNCION QUE LIMPIA  ////////////////////

$("#btnClear").addEventListener("click", () => {
  if ( $("#filtersCategory").value !== "Categorias" ||  $("#filtersLocation").value !== "Ubicacion" ||  $("#filtersSeniority").value !== "Seniority") {
    $("#filtersCategory").value = "Categorias"
    $("#filtersLocation").value = "Ubicacion"
    $("#filtersSeniority").value = "Seniority"
  }

  $("#container").innerHTML = ""
  $("#filtersLocation").classList.remove("hidden")
  $("#filtersCategory").classList.remove("hidden")
  $("#filtersSeniority").classList.remove("hidden")
  getJobs()
})


/////////////// RESPONSIVE ////////////////////////
const $navBurguer = $("#navBurguer");
const $burguerMobile = $("#burguerMobile");
const $crussMobile = $("#crussMobile");

const $mobileNewJob = $("#mobileNewJob")
const $mobileHome = $("#mobileHome")

$("#burguerMobile").addEventListener("click", () => {
  $navBurguer.classList.remove("hidden");
  $crussMobile.classList.remove("hidden");
  $burguerMobile.classList.add("hidden");
});

$("#crussMobile").addEventListener("click", () => {
  $navBurguer.classList.add("hidden");
  $burguerMobile.classList.remove("hidden");
  $crussMobile.classList.add("hidden");
});

$mobileHome.addEventListener("click", () => {
  $("#container").classList.remove("hidden")
  $("#seeDetails").classList.add("hidden")
  $("#filters").classList.remove("hidden")
  $("#editJobForm").classList.add("hidden")
  generateCards()

})

$mobileNewJob.addEventListener("click", () => {
  $("#editJobForm").classList.remove("hidden")
  $("#seeDetails").classList.add("hidden")
  $("#container").classList.add("hidden")
  $("#filters").classList.add("hidden")
  isEdit = true
})