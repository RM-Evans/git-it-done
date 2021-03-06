//reference the issues container in single-repo.html so we can write to it
var issueContainerEl = document.querySelector("#issues-container");
var limitWarningEl = document.querySelector('#limit-warning');


//add repo name to header
var repoNameEl = document.querySelector("#repo-name")

var getRepoName = function() {
    var queryString = document.location.search;
    //split at "=", get second item in array which is the user's input
    //isolate repo from query string
    var repoName = queryString.split("=")[1]
    //console. log(repoName)
    //only displays repo name and make fetch call if value for repoName exists
    if(repoName){
        //display repo name on the page
        repoNameEl.textContent = repoName
        getRepoIssues(repoName);
    } else {
        //go back to main page
        document.location.replace("file:///C:/Users/evans/Desktop/projects/git-it-done/index.html");
    }
    
    // OR return getRepoName
}



var displayIssues = function(issues) {
    if(issues.length === 0) {
        issueContainerEl.textContent = "This repo has no open issues!";
        return;
    }
    //looping over response data
    for (var i = 0; i < issues.length; i++) {
        //create link element to take users to the issue on github
        var issueEl = document.createElement ("a");
        issueEl.classList = "list-item flex-row justify-space-between align-center";
        issueEl.setAttribute("href", issues[i].html_url); //links to full issue on github
        issueEl.setAttribute("targer", "_blank");   //opens link in new tab
        //write to that issues container in html page
        issueContainerEl.appendChild(issueEl);
        
        //create span to hold issue title
        var titleEl = document.createElement("span");
        titleEl.textContent = issues[i].title;
    
        //append to container
        issueEl.appendChild(titleEl);
    
        //create a type element
        var typeEl = document.createElement("span");
    
        //check if issue is an actual issue or a pull request
        if (issues[i].pull_request) {
            typeEl.textContent = "(Pull request)";
        } else {
            typeEl.textContent = "(Issue)";
        }
    
        //append to container
    
        issueEl.appendChild(typeEl);
    };
    }
//passing in repo as a parameter into getRepoIssues function
var getRepoIssues = function(repo) {
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";

    fetch(apiUrl).then(function(response) {
        //request was successful
        if (response.ok) {
            response.json().then(function(data){
            //pass response data to dom function
            displayIssues(data);

            // check if api has paginated issues
            if (response.headers.get("Link")) {
                displayWarning(repo);
            }
            });
        }
        else {
            //if not successful redirect to homepage
            document.location.replace("file:///C:/Users/evans/Desktop/projects/git-it-done/index.html");
        }
        
    });


};

var displayWarning = function(repo) {
    //add text to warning container
    limitWarningEl.textContent= "To see more than 30 issues, visit ";

    //generate html
    var linkEl = document.createElement("a");
    linkEl.textContent = "See More Issues on Github.com";
    linkEl.setAttribute("href", "https://github.com/" + repo + "/issues");
    linkEl.setAttribute("target", "_blank");

    //append warning container
    limitWarningEl.appendChild(linkEl);
};

// OR first called is passed through getRepoName => getRepoIssues
//getRepoIssues(getRepoName())
getRepoName();