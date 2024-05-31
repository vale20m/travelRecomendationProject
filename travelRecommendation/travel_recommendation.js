async function getResults() {
    try {
        const response = await fetch ("travel_recommendation_api.json", {
            method: "GET",
        });
        const result = await response.json();
        console.log("Success: ", result);
        return result;
    } catch (error) {
        console.log("Error: ", error.message);
    }
}

function clearResults(){
    const div = document.querySelector("#contentFound");
    div.innerHTML = "";
}

async function showResults(event) {
    event.preventDefault();
    event.stopPropagation();
    const content = document.querySelector("#searchBar").value.toLowerCase();
    const results = await getResults();
    const filteredResults = Object.keys(results).reduce((filtered, key) => {
        if (key.toLowerCase().includes(content)) {
            filtered[key] = results[key];
        }
        return filtered;
    }, {});
    console.log(filteredResults);
    const container = document.querySelector("#contentFound");
    if (filteredResults.countries != undefined) {
        filteredResults.countries.forEach(element => {
            element.cities.forEach(item => {
                const div =
                `<div>
                    <img src="${item.imageUrl}">
                    <h2>${item.name}</h2>
                    <p>${item.description}</p>
                </div`;
                container.innerHTML += div;
            });
        });
    } else if (filteredResults.temples != undefined) {

    } else if (filteredResults.beaches != undefined) {

    } else {

    }
};