import {
    useParams
  } from "react-router-dom";
import { useEffect, useState } from 'react';
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

  function Recipe() {
    const [recipe, setRecipe] = useState(null)
    const {recipeId} = useParams()

    useEffect(() => {
      const query = `
      {
        recipe(id: "${recipeId}"){
          sys{id}
          name
          course
          instructions
          picture {url}
          ingredients {json}
        }
      }
      `
      window
        .fetch(`https://graphql.contentful.com/content/v1/spaces/65v4hlxp2rbo/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Authenticate the request
            Authorization: "Bearer egIOXKI2lzCStMt7p1-Quk_ogpIJJL7xR4VKQt58cdg",
          },
          // send the GraphQL query
          body: JSON.stringify({ query }),
        })
        .then((response) => response.json())
        .then(({ data, errors }) => {
          if (errors) {
            console.error(errors);
          }
          console.log(data)
          // rerender the entire component with new data
          setRecipe(data.recipe);
          console.log(data.recipe)
          //let recipe = data.recipeCollection.items[0]
          //const ingredients = recipe.ingredients.json.content[0]
          //ingredients.content.forEach(element => {
          //    console.log(element.content[0].content[0].value)
          //});
        });
    }, []);

    if (!recipe) {
      return 'Loading ...'
    }

    return (
      <div>
        <h1>{recipe.name}</h1>
        <div>
        {documentToReactComponents(recipe.ingredients.json)}
        </div>
      </div>

    )
  }

  export default Recipe