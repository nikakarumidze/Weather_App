// Add Options (Tagname) for Datalist
const addOptions = element => {
    let createOption = document.createElement("option");
    createOption.value = element;
    if (element !== undefined) {
        document.getElementById("array_locations").appendChild(createOption);
    }
};

// Get Cities
function getAllCities() {
    fetch("../top-1000-cities.json")
    .then(e => e.json())
    .then(data => {
        for (let x of data) {
            addOptions(x.name);
        }
    });
}
getAllCities();