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
    <div className="container">
      {
       recipe.map((r) => {
         return (
            <div key={r.sys.id} className="receipeRow">
                <div className="receipeRow-image">
                    <img src={r.picture.url} />
                </div>
                <div  className="receipeRow-link">
                    <Link to={`/recipe/${r.sys.id}`}>
                    {r.name}
                    </Link>
                </div>
            </div>
         )
       }) 
      }

  </div>
)
}

export default RecipeList