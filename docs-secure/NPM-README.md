
#Pre-reqs

- Install [Node](https://nodejs.org/).
- Create [GitHub](https://github.com/) account.
- Create [npm](https://www.npmjs.com/signup) account, and confirm your email address.
- Create [Travis CL](https://travis-ci.org/) account using GitHub.
- Create [Coveralls](https://coveralls.io/) account using GitHub.

- npm set init.author.name "John Szwaronek"
- npm set init.author.email "johnsz9999@gmail.com"
- npm set init-license 'MIT'
- npm set save-exact true (save modules with an exact version)
- npm adduser

#New repo

- sudo npm install npm@latest -g
- npm login (or npm adduser)

- Create a GitHub repo stub
    - Create new repository from [your homepage](https://github.com/eddyystop).
    - Public
    - Include a Node .ignore
    - Include an MIT license
    
- Clone the GitHub repo locally
    - Click Clone or download button
    - Copy the {repo's web address} to the clipboard.
    - Go to the folder which will contain the repo's local folder
    - git clone {repo's web address}
    
- Update .gitignore
    - replace .gitignore with our standard .gitignore
    - customize 'Specific to project' section

- Install .npmignore as otherwise npm will use .gitignore
    - copy in our standard .npmignore
    
- Install eslint
    - npm i -D eslint eslint-config-airbnb babel-eslint
    - npm i -D eslint-plugin-jsx-a11y eslint-plugin-react eslint-plugin-import
    - copy .eslintignore and .eslintrc

- npm init -or- npm init --scope={your npm user name}
    - version: 0.0.1
    - test: mocha --reporter spec
    - npm i mocha -D
    - npm i chai -D
    - npm i coveralls -D
    - npm i istanbul -D
    
- initial files
    - delete the stub created by npm init: index.js
    - create the main file src/index.js(????) that will expose all the module’s functionalities.
----------
module.exports = {};
----------

- manually update package.json
    - add
    "scripts": {
      "test": "node_modules/.bin/mocha --reporter spec",
      "cover": "node_modules/istanbul/lib/cli.js cover node_modules/mocha/bin/_mocha -- -R spec test/*"
    },
    "engines": {
      "node": ">4.2.4"
    }

- write an introductory README
    - Use proper name of project, which might be {@github-username/}repo-name
    - https://pages.18f.gov/open-source-guide/making-readmes-readable/
    - template: https://gist.github.com/jxson/1784669
    
- initial publishing
    - check name in package.json is correct. Does it need a {@username/} perhaps?
    - git add .
    - git status
    - git commit -m "Initializing repositories." -or- git commit
    - git tag v0.0.1
    - git push origin master --tags
    - npm publish --access=public
    - The access option will remain set for all subsquent publishes
    
- Symlink
    - Check your repo name in package.json as that is the name that will be used.
    - cd /repo
    - npm install
      This creates a symlink in your user home folder pointing to the repo folder
    - cd /some-folder-needing-your-repo
    - npm install {@username/}repo-name
      This creates a symlink in node_modules pointing to the symlink in the user home folder. 
    - For repos with usernames: @eddystop/test-repo: node_modules/eddystop/test-repo/
    
#Local tests
    
- testing
    - tests only: npm test
    - tests and coverage: npm run cover
    
#Git commits

- local cycle
    - git add .
    - git status
    - git commit -m "the commit message" -or- git commit

#Releasing a new version to npm

- npm prune (remove any installed modules which are not listed as dependencies)
- update changelog either in README.md or CHANGELOG.md adding the day and saying what the change was
- Run Webpack if necessary.
- git add .
- git status
- git commit -m "..." -or- git commit
- git push origin master
- npm version {patch|minor|major} -m "Version %s - updating npm version"
- git push origin master --tags
- npm publish
- npm info {your repo name} to see its OK

#Releasing a beta version to npm

- bump version with suffix e.g. 1.3.1-beta.3
- git add
- git status
- git commit -m "..." -or- git commit
- git tag 1.3.1-be
- git push --tags
- npm publish --tag beta
- npm info {repo name}
- you install beta versions with npm i test-repo@1.3.1-beta.3
    
#Continuous integration

- add repo to Travis
    - go to [Travis profile page](https://travis-ci.org/profile/eddyystop)
    - sync account with GitHub
    - flick repository switch on for the new repo
    
- add repo to Coveralls
    - go to [add repo page](https://coveralls.io/repos/new)
    - sync repos with GitHub using buttom at bottom of page
    - click on switch for added repo
    
- add this .travis.yml file to the project root if you want only tests to run, not coverage
----------
language: node_js

node_js:
  - stable

install:
  - npm install

script:
  - npm test
----------

- add this .travis.yml file to the project root if you want to run tests and coverage
----------
language: node_js

node_js:
  - stable
  
install:
  - npm install

script:
  - npm run cover

# Send coverage data to Coveralls
after_script: "cat coverage/lcov.info | node_modules/coveralls/bin/coveralls.js"
----------
    
#Badges
- Travis
    - Go to [your page of repos](https://travis-ci.org/profile/eddyystop).
    - Click on the settings icon by the repo you want.
    - You will go to the [repo's page](https://travis-ci.org/eddyystop/test-repo/settings).
    - Click on the badge icon.
    - Choose Markdown and add the code to your README.
    - Or just modify the following
----------
[![Build Status](https://travis-ci.org/eddyystop/test-repo.svg?branch=master)](https://travis-ci.org/eddyystop/test-repo)
----------

- Coveral
    - Go to the [add repos page](https://coveralls.io/repos/new)
    - Click DETAILS on the repo of interest.
    - You will go to the [repo's page](https://coveralls.io/github/eddyystop/test-repo)
    - Click EMBED at the bottom of the page.
    - Copy the Markdown and add the code to your README.
    - Or just modify the following:
----------
[![Coverage Status](https://coveralls.io/repos/github/eddyystop/test-repo/badge.svg?branch=master)](https://coveralls.io/github/eddyystop/test-repo?branch=master)
----------
    

#Symlink

- cd to folder of repo which will be symbolically included elsewhere.
- sudo npm link

- cd to folder of project where repo is to be symbolically included.
- npm link {@eddystop/}repoName{@version}

- manually update your package.json