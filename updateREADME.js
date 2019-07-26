const path = require('path')
const markdownMagic = require('markdown-magic')
const init = require('sync-rpc')
const getReposSync = init(require.resolve('./scripts/getRepos.js'))

function generateRepoLinkMarkdown( repos ){
    let yamlOutput = ''

    repos.forEach( (val) =>{
        const description = val.description ? ` - ${val.description}` : ''
        yamlOutput += `[${val.name}](${val.html_url})${description}\n`
    })

    return yamlOutput
}

function getRepoLinkMarkdown( username ) {
    const repos = getReposSync( username )
    if( ! repos || ! Object.keys(repos).length ){
        return content
    }
    return generateRepoLinkMarkdown( repos )
}

const config = {
    transforms: {
    //   CONTRIBUTORS: require('markdown-magic-github-contributors'),
      OFFICIAL_APPS: ( content, options ) => {
          return getRepoLinkMarkdown( 'mongoose-os-apps' )
      },
      OFFICIAL_LIBS: ( content, options ) => {
          return getRepoLinkMarkdown( 'mongoose-os-libs' )
      }
    },
  }

const markdownPath = path.join(__dirname, 'README.md')
markdownMagic(markdownPath, config)