var nameInput=document.getElementById("bookmarkName")
var urlInput=document.getElementById("bookmarkURL")
var submitBtn=document.getElementById("submitBtn")
var websitesList=[];

if(localStorage.getItem("websitesContainer")){
    websitesList=JSON.parse(localStorage.getItem("websitesContainer"))
    displayWebsites()
}
else{
    websitesList=[]
}

function addWebsite() {
    let name = nameInput.value.trim();
    let url = urlInput.value.trim();
    let isNameExists = websitesList.some(website => website.name.toLowerCase() === name.toLowerCase());

    if (validateName() && validateURL() && !isNameExists) {
        if (!/^https?:\/\//i.test(url)) {
            url = `http://${url}`;
        }

        var website = {
            name: name,
            url: url
        };

        websitesList.push(website);
        localStorage.setItem("websitesContainer", JSON.stringify(websitesList));

        displayWebsites();
        claerInputs();
    }else if (isNameExists) {
        Swal.fire({
            icon: "error",
            title: "This website name already exist",
            html:`The name of the site must  <strong> not already exist </strong> and must be at least 3 characters long.`,
            customClass: {
                title: "custom-swal-title"
            }
        });
    }else {
        Swal.fire({
            icon: "warning",
            title: "Site Name or URL is not valid,\n\n Please follow the rules below:",
            html: `
            <div style="text-align: left;">
            <ul style="list-style: none; padding-left: 0;">
                <li class="d-flex align-items-start gap-3">
                    <i class="fa fa-arrow-right" style="color: #dc3545;"></i>
                    <p>The name of the site must not already exist and must be at least <strong>3 characters</strong> long.</p>
                </li>
                <li class="d-flex align-items-start gap-3">
                    <i class="fa fa-arrow-right" style="color: #dc3545;"></i>
                    <p>The URL must be valid (e.g., <code>[https://][www.]example.com</code>).</p>
                </li>
            </ul>
            </div>
            `,
            customClass: {
                title: "custom-swal-title"
            }
        });
    }
}

function claerInputs(){
    nameInput.value='';
    urlInput.value='';
}
function displayWebsites(){
    var cartona=''

    for (let i = 0; i < websitesList.length; i++) {
        cartona+=`<tr>
        <td>${i+1}</td>
        <td>${websitesList[i].name}</td>              
        <td>
        <a href="${websitesList[i].url}" id="btn-visit" target="_blank" class="btn btn-primary">
        <i class="fa-solid fa-eye pe-2"></i>Visit
        </a>
        </td>
        <td>
          <button id="btn-delete" class="btn btn-danger pe-2" onclick="deleteWebsite(${i})">
            <i class="fa-solid fa-trash-can"></i>
            Delete
          </button>
        </td>
        </tr>`
    }
    document.getElementById("tableContent").innerHTML=cartona
}


function deleteWebsite(i) {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
    }).then((result) => {
        if (result.isConfirmed) {
            websitesList.splice(i, 1);
            localStorage.setItem("websitesContainer", JSON.stringify(websitesList));
            displayWebsites();
            Swal.fire({
                title: "Deleted!",
                text: "The website has been deleted.",
                icon: "success",
                timer: 2000, // Auto-close after 2 seconds
                showConfirmButton: false,
            });
        }
    });
}


function validateInput(inputElement, regex) {
    var text = inputElement.value;
  
    if(regex.test(text)){
      inputElement.classList.add("is-valid")
      inputElement.classList.remove("is-invalid")
      return true;
    }
    else{
      inputElement.classList.add("is-invalid")
      inputElement.classList.remove("is-valid")
      return false;
    }
}
function validateName() {
    var regex = /^.{3,19}$/;
    return validateInput(nameInput, regex);
  }
  
function validateURL() {
    var regex =/^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}([\/?][^\s#]*)?(#\S*)?$/    ;
    return validateInput(urlInput, regex);
}





