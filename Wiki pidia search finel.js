let searchResultsEle = document.getElementById("searchResults");
let searchInputEle = document.getElementById("searchInput");
let spinnerELe = document.getElementById("spinner");

function creatAndAppend(result) {

    let {
        description,
        link,
        title
    } = result;

    //1. searchResultcontEle -- div -- result-item 
    let searchResultcontEle = document.createElement("div");
    searchResultcontEle.classList.add("result-item");
    searchResultsEle.appendChild(searchResultcontEle);

    //2. resultTitelEle -- a -- result-title 
    let resultTitelEle = document.createElement("a");
    resultTitelEle.classList.add("result-title");
    resultTitelEle.href = link;
    resultTitelEle.target = "_blank";
    resultTitelEle.textContent = title;
    searchResultcontEle.appendChild(resultTitelEle);

    //3. titleBreak -- br 
    let titleBreakEle = document.createElement("br");
    searchResultcontEle.appendChild(titleBreakEle);

    //4. resultUrlEle -- a -- result-url 
    let resultUrlEle = document.createElement("a");
    resultUrlEle.classList.add("result-url");
    resultUrlEle.href = link;
    resultUrlEle.target = "_blank";
    resultUrlEle.textContent = link;
    searchResultcontEle.appendChild(resultUrlEle);

    //5. urlBreak -- br 
    let urlBreak = document.createElement("br");
    searchResultcontEle.appendChild(urlBreak);

    //6. descriptionEle -- p -- link-description
    let descriptionEle = document.createElement("p");
    descriptionEle.classList.add("link-description");
    descriptionEle.textContent = description;
    searchResultcontEle.appendChild(descriptionEle);

}

function displySearchResults(search_results) {
    spinnerELe.classList.toggle("d-none");
    for (let result of search_results) {
        creatAndAppend(result);
    }
}

function searchWikipedia(event) {

    if (event.key === "Enter") {
        searchResultsEle.textContent = "";
        spinnerELe.classList.toggle("d-none");
        let searchResult = searchInputEle.value;

        let url = "https://apis.ccbp.in/wiki-search?search=" + searchResult;
        let options = {
            method: "GET"
        };
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                displySearchResults(search_results);
            });

    }
}

searchInputEle.addEventListener("keydown", searchWikipedia);