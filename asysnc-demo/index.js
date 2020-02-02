
// console.log('Before');
// getUser(1, getRepositoriesByUser);
// console.log('After');

// getUser(1)
//     .then(user => getRepositories(user.gitHubUserName))
//     .then(respos => getCommits(respos[0]))
//     .then(commits => console.log('Commits', commits))
//     .catch(err => console.log('Error', err.message));


// Await and Asyncs
async function displayCommitAsyncs() {
    try {
        const user = await getUser(1);
        const respos = await getRepositories(user.gitHubUserName);
        const commits = await getCommits(respos[0]);
        console.log(commits);
    } catch (err) {
        console.log('Error', err.message);
    }
}

displayCommitAsyncs();

function getRepositoriesByUser(user) {
    getRepositories(user.gitHubUserName, getCommitsByRepos);
}

function getCommitsByRepos(repos) {
    getCommits(repos, displayCommits);
}

function displayCommits(commits) {
    console.log(commits);
}

function getUser(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Reading a user from a database...');
            resolve({id: id, gitHubUserName: 'nam'});
        }, 2000);
    });
}

function getRepositories(username) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Getting the respositories....');
            // resolve(['repo1', 'repo2', 'repo3']);
            reject(new Error('Could not get the repos'));
        }, 2000);
    });
}

function getCommits(repo) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Calling GitHub API...');
            resolve(['commit']);
        }, 2000);
    });
}