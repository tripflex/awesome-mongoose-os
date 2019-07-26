const GitHub = require('github-api')

function init(){
    return ( username ) => {
        const gh = new GitHub()
    
        const officialLibsUser = gh.getUser(username)
        
        return officialLibsUser.listRepos().then( (result) => {
            return result.data
        })
    }
}

module.exports = init