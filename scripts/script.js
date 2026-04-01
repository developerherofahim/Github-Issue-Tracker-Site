const loadIssue = () => {
  fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues") // promise of response
    .then((res) => res.json()) // promise of json data
    .then((json) => {
        allIssue = json.data
        displayIssueCard(allIssue)
    });
};

const displayTab = () => {
  //   1. get the container & empty
  const tabContainer = document.getElementById("tab-container");
  tabContainer.innerHTML = "";

    //         3. create Element
    const btnDiv = document.createElement("div");
    btnDiv.classList.add("mx-5","px-3","py-3","md:mx-15","md:px-5","md:py-5","bg-gray-50","rounded-sm")
    btnDiv.innerHTML = `
            <button onclick="filterIssues('all', this)" class="btn btn-neutral tab-btn ">All</button>
            <button onclick="filterIssues('open', this)" class="btn tab-btn">Open</button>
            <button onclick="filterIssues('closed', this)" class="btn tab-btn">Close</button>
    `;

    //         4. append into container

    tabContainer.append(btnDiv);
  
};

const filterIssues = (status, btn) => {
  // active button highlight
  document.querySelectorAll(".tab-btn").forEach(b =>
    b.classList.remove("btn-neutral")
  );
  btn.classList.add("btn-neutral");

  let issueLength = document.getElementById("issue-length")

  let filtered = [];

  if (status === "all") {
    filtered = allIssue;
  } 
  else if (status === "open") {
    filtered = allIssue.filter(issue => issue.status === "open");
  } 
  else if (status === "closed") {
    filtered = allIssue.filter(issue => issue.status === "closed");
  }

  issueLength.innerText = filtered.length;

  displayIssueCard(filtered);
};

displayTab();

// "id": 1,
// "title": "Fix navigation menu on mobile devices",
// "description": "The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.",
// "status": "open",
// "labels": [
// "bug",
// "help wanted"
// ],
// "priority": "high",
// "author": "john_doe",
// "assignee": "jane_smith",
// "createdAt": "2024-01-15T10:30:00Z",
// "updatedAt": "2024-01-15T10:30:00Z"
// },

const displayIssueCard = (issues) =>{
    const issueContainer = document.getElementById("issue-container");

    issueContainer.innerHTML ="";

    for(let issue of issues){
        
        const div = document.createElement("div");


        div.innerHTML = `
        <div class="issue-card space-y-3 bg-white rounded-2xl shadow-md p-5 flex flex-col h-full border-green-400 grow">
            <div class="flex justify-between items-center">
                <img class="open-status" src="./assets/Open-Status.png" alt="">
                <img class="close-status" src="./assets/Closed- Status .png" alt="">
                <button class="btn btn-soft bg-orange-200 rounded-full">${issue.priority}</button>
            </div>
            <div class="flex flex-col grow gap-2">
                <h3 class="text-xl font-bold text-[#1F2937]">${issue.title}</h3>
                <p class="font-normal text-[#64748B] grow">${issue.description}</p>
            </div>

            <div>
                ${issue.labels.map(label => {
                    if(label === "bug"){
                    return `<span class="badge bg-red-300 mr-2 rounded-full"> ${label}</span>`;
                    }
                    if(label === "help wanted"){
                    return `<span class="badge bg-blue-300 mr-2 rounded-full"> ${label}</span>`;
                    }
                    else{
                    return `<span class="badge bg-blue-300 mr-2 rounded-full">others</span>`;
                    }
                }).join("")}
            </div>

            <hr class="decoration-dashed">
            <div class="">
                <p class="font-normal text-[#64748B]">${issue.author}</p>
                <p class="font-normal text-[#64748B]">${new Date(issue.createdAt).toLocaleDateString()}</p>
            </div>
        </div>
        `;

        const issueCard = div.querySelector(".issue-card");
        const openStatus = div.querySelector(".open-status")
        const closedStatus = div.querySelector(".close-status")

        if(issue.status === "open"){
            issueCard.classList.add ("border-t-4", "border-green-400");
            issueCard.classList.remove ("border-violet-400");
            openStatus.classList.remove ("hidden")
            closedStatus.classList.add ("hidden")
        }
        else{
            issueCard.classList.remove ("border-green-400");
            issueCard.classList.add("border-t-4", "border-violet-400");
            openStatus.classList.add ("hidden")
            closedStatus.classList.remove ("hidden")
        }

        issueContainer.appendChild(div);
    }
}


// const displayTab = (issues) => {
//   const container = document.getElementById("tab-container");
//   container.innerHTML = "";

//   issues.forEach(issue => {

//     const div = document.createElement("div");
//     div.className = "bg-white rounded-2xl shadow-md p-5 flex flex-col h-full";

//     const uniqueLabels = [...new Set(issue.labels)];

//     div.innerHTML = `
//       <div class="flex justify-between items-center mb-4">
//         <span class="w-3 h-3 bg-green-400 rounded-full"></span>
//         <span class="bg-orange-200 text-orange-700 px-3 py-1 rounded-full text-sm">
//           ${issue.priority}
//         </span>
//       </div>

//       <h2 class="text-lg font-semibold mb-2">${issue.title}</h2>

//       <p class="text-gray-600 text-sm mb-4 grow">
//         ${issue.description}
//       </p>

//       <div class="mb-4">
//         ${uniqueLabels.map(label => `
//           <span class="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs mr-2">
//             ${label}
//           </span>
//         `).join("")}
//       </div>

//       <div class="border-t pt-3 text-sm text-gray-500">
//         ${issue.user} <br>
//         ${issue.date}
//       </div>
//     `;

//     container.appendChild(div);
//   });
// };

loadIssue();


document.getElementById("search-btn").addEventListener("click", () => {
  const input = document.getElementById("input-search");
  const searchValue = input.value.trim().toLowerCase();
  input.value = "";
  console.log(searchValue);

  const url = `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${encodeURIComponent(searchValue)}`
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const eachIssue = data.data;
      console.log(eachIssue);
      const filterIssue = eachIssue.filter((issue) =>
         issue.title.toLowerCase().includes(searchValue) ||
         issue.description.toLowerCase().includes(searchValue)
      );

     displayIssueCard(filterIssue);
    });
});
