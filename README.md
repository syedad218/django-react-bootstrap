
# ticketmanagement

### Tools
- Setup [editorconfig](http://editorconfig.org/), [prospector](https://prospector.landscape.io/en/master/) and [ESLint](http://eslint.org/) in the text editor you will use to develop.

### Running the project
- Open a command line window and go to the project's directory.
- `pipenv install --dev`
- `npm install`
- `npm run start`
- Open another command line window and go to the `backend` directory.
- `pipenv shell`
- `python manage.py runserver`

#### Celery
- Open a command line window and go to the project's directory
- `pipenv shell`
- `python manage.py celery`

### Testing
`make test`

Will run django tests using `--keepdb` and `--parallel`. You may pass a path to the desired test module in the make command. E.g.:

`make test someapp.tests.test_views`

### Adding new pypi libs
Just run `pipenv install LIB_NAME_ON_PYPI` and then `pipenv lock` to lock the version in Pipfile.lock file

## Deployment 
### Setup
This project comes with a `app.json` file for heroku, that can be used to create an app on heroku from a GitHub repository.

After setting up the project, you can init a repository and push it on GitHub. If your repository is public, you can use the following button:

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy) 

If you are in a private repository, access the following link replacing `$YOUR_REPOSITORY_LINK$` with your repository link.

`https://heroku.com/deploy?template=$YOUR_REPOSITORY_LINK$`

Remember to fill the `ALLOWED_HOSTS` with the URL of your app, the default on heroku is `appname.herokuapp.com`. Replace `appname` with your heroku app name.

### Sentry

[Sentry](https://sentry.io) is already set up on the project. For production, add `SENTRY_DSN` environment variable on Heroku, with your Sentry DSN as the value.

You can test your Sentry configuration by deploying the boilerplate with the sample page and clicking on the corresponding button.  

## Linting
- Manually with `prospector` and `npm run lint` on project root.
- During development with an editor compatible with prospector and ESLint.

## Pre-commit hooks
- Run `pre-commit install` to enable the hook into your git repo. The hook will run automatically for each commit.
- Run `git commit -m "Your message" -n` to skip the hook if you need.


[MIT License](LICENSE.txt)
