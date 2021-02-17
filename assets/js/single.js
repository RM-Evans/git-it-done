//reference the issues container in single-repo.html so we can write to it
var issueContainerEl = document.querySelector("#issues-container");

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

var getRepoIssues = function(repo) {
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";

    fetch(apiUrl).then(function(response) {
        //request was successful
        if (response.ok) {
            response.json().then(function(data){
            //pass response data to dom function
            displayIssues(data);
            });
        }
        else {
            alert("There was a problem with your request!");
        }
    });

    console.log(repo);
};

getRepoIssues("rm-evans/run-buddy");