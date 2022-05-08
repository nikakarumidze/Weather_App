// Add Options (Tagname) for Datalist
const addOptions = (element) => {
  let createOption = document.createElement('option');
  createOption.value = element;
  if (element !== undefined) {
    document.getElementById('array_locations').appendChild(createOption);
  }
};

const get1000City = () => {
  fetch('./top-1000-cities.json')
    .then((response) => response.json())
    .then((data) => {
      for (let x of data) {
        addOptions(x.name);
      }
    });
};
get1000City();
