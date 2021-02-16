var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
//yay with these I can write to my html and generate the search results in span
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");

var formSubmitHandler = function(event) {
    event.preventDefault();
    //get value from input element
    var username = nameInputEl.value.trim();

    if(username) {
        getUserRepos(username);
        nameInputEl.value = "";
    } else {
        alert("Please enter github username");
    }
    console.log(event);
};

var getUserRepos = function (user) {
    // format the github api url
    var apiUrl = "https://api.github.com/users/" + user + "/repos";
    
    // make a get request to url
    //fetch request *
    //and also error handling
    fetch(apiUrl).then(function (response) {
        //request was successful
        if(response.ok) {
            
            response.json().then(function (data) {
                //console.log(data);
                displayRepos(data, user);
            });
        } else {
            //TODO: where is this? response.statusText is not showing up
            alert("Error: " + response.statusText)
        }
        //console.log(response);
    })
    .catch(function(error) {
        //catching network errors
        //notice this `.catch()` getting chained onto end of the `.then()` method --.then...catch
        alert("Unable to connect to Github")
    })
};

var displayRepos = function(repos, searchTerm) {

    //check if api returned any repos
    //if there are no repos, it must not be a valid search entry so it will give error and display in place
    if (repos.length === 0) {
        repoContainerEl.textContent = "No repositories found!";
        return;
    }

    //be sure to clear old content b4 displaying new content
    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm;
    
    //loop over repos
    for(var i = 0; i < repos.length; i++) {
        //format repo name -- i = where it is in array
        var repoName = repos[i].owner.login + "/" + repos[i].name;
        
        //create container for each repo
        var repoEl = document.createElement("div");
        //make this div look like a fancy boi
        repoEl.classList = "list-item flex-row justify-space-between align-center";
        
        // create a span element to hold the repository name
        var titleEl = document.createElement("span");
        //add the pulled repo name to the span element
        titleEl.textContent = repoName;
        
        //append to container -  just write it in
        repoEl.appendChild(titleEl);

        //create a status element
        var statusEl = document.createElement("span");
        statusEl.classList = "flex-row align-center";

        //check if the repo has issues or not. tell them the count of issues
        if(repos[i].open_issues_count > 0) {
            statusEl.innerHTML = 
            "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
        } else {
            statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
        }
        //append to container
        repoEl.appendChild(statusEl);


        
        //append the container to the DOM (remember to check the web dev tools html: ~is dom)
        //note to self: should study this part more
        repoContainerEl.appendChild(repoEl);
    }
    
    console.log(repos);
    console.log(searchTerm);
};

//getUserRepos("lernantino");

userFormEl.addEventListener("submit", formSubmitHandler);