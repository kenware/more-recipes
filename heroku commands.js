import { appendFile } from "fs";


heroku configuration
to share plan or database between many applications
|heroku addons:attach polar-journey-88446::DATABASE --app my-more-recipes
to make the shared plan a default database
|heroku pg:promote postgresql-flat-82523 --app my-more-recipes
to change heroku appendFile
|heroku git:remote -a [app name]