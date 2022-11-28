## Nasch - Share Your Recipe with like-minded people

Nasch is an application to finde, create and share recipes with like-minded people. The application contains

- A landing page
- An overview of all user created recipes
- The single recipe page, where the user can see additional information as ingredients, cooking instructions and user comments. Only logged in users are authorized to leave acomment. Otherwise the user will be reroutet to the login page
- A login and register page
- A private profile page, where the user can update his/her account information, delete his/her account, see created recipes and delete them
- A create recipe page. Only logged in users are authorized to create a recipe

## Technologies

- Next.js
- Figma
- PostgreSQL
- DrawSQL
- React
- JavaScript
- Typescript
- REST API
- Cloudinary
- Fly.io

  ![Recipes Overview](recipes.png)
  ![Single Recipe](single%20recipe.png)
  ![Create Recipe](Create%20Recipe.png)
  ![Private Profile](Private%20Profile.png)
  ![DrawSQL Database Structure](drawsql.png)

The database structure was chosen in a way to be editable and flexible in the long run. Recipes and ingredients are managed in a join table making the ingredients easy to change/update. Same applies to the difficulties table.

The recipe creation and display is managed in three steps:

1. The user creates a recipe and the recipes table receive the corresponding information
2. The recipes table is filtered by userid and the last recipe id the user created. This recipe id is saved into the recipes_ingredients table and the corresponding ingredients are added.
3. Due to the structure of the recipes_ingredients table, all recipes are filtered and duplicates are excluded. Afterwards all recipes are display in the frontend.

![Figma Wireframes](figma.png)

## Setup instructions

- Clone the repository
- Setup a PostgreSQL database - Create a user and a database
- Create a .env file
- Copy the environment variables from .env-example into .env
- Replace the placeholders xxxxx with your username, password and name of database
- Install dotenv-cli
- Run yarn install in your command line
- Run the migrations with yarn migrate up
- Start the server by running yarn dev
