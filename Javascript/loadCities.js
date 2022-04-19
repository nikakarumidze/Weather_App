// Add Options (Tagname) for Datalist
const addOptions = element => {
    let createOption = document.createElement("option");
    createOption.value = element;
    if (element !== undefined) {
        document.getElementById("array_locations").appendChild(createOption);
    }
};

// Get Cities
// function getAllCities() {
//     fetch("top-1000-cities.json")
//     .then(e => e.json())
//     .catch(err => console.log(err))
//     .then(data => {
//         for (let x of data) {
//             addOptions(x.name);
//         }
//         console.log(data);
//     });
// }
// getAllCities();


const get1000City = () => {
    fetch('./top-1000-cities.json')
    .then(e => e.json())
    .then(data => {
        for (let x of data) {
            addOptions(x.name);
        }
    })
    .catch(err => console.log(err))
}
get1000City();