import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const YOUR_APP_KEY = "e957c708958035c402653693f84f3d03"
const YOUR_APP_ID = "cbf43971"

export const recipeApi = createApi ({
reducerPath: "recipeApi",
baseQuery: fetchBaseQuery ({ baseUrl: "https://api.edamam.com/" }),
endpoints: (builder) => ({
getRecipes: builder.mutation ({
query: ({ query, health }) => {
return {
url:`search?q=${query}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&&health=${health}`,
method: 'get',
}
},
}),
}),
});
export const { useGetRecipesMutation } = recipeApi;