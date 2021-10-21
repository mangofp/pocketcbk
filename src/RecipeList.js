import { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";


const query = `
{recipeCollection {items {
  sys {id},
  contentfulMetadata {
    tags {name}
  }
	name,
  course,
  picture {url},
  ingredients {json}
}}}
`


function RecipeList() {
  const [recipe, setRecipe] = useState(null)

  useEffect(() => {
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
        setRecipe(data.recipeCollection.items);
        console.log(data.recipeCollection.items)
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
    <ul>
      {
       recipe.map((r) => {
         return (
          <li key={r.sys.id}>
            <Link to={`/recipe/${r.sys.id}`}>
              {r.name}
            </Link>
          </li>
         )
       }) 
      }
    </ul>
  </div>
)
}

export default RecipeList