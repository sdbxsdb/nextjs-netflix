export async function queryHasuraGQL(operationsDoc, operationName, variables) {

  const result = await fetch(process.env.NEXT_PUBLIC_HASURA_ADMIN_URL, {
    method: "POST",
    headers: {
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3N1ZXIiOiJkaWQ6ZXRocjoweDA4N0UyNjcyQ0MxNzlkQzQyN0UyMzQyRUE1MGZiYUIyNjUzQzE5YjQiLCJwdWJsaWNBZGRyZXNzIjoiMHgwODdFMjY3MkNDMTc5ZEM0MjdFMjM0MkVBNTBmYmFCMjY1M0MxOWI0IiwiZW1haWwiOiJzYW1kb25hZ2h5YmVsbEBnbWFpbC5jb20iLCJvYXV0aFByb3ZpZGVyIjpudWxsLCJwaG9uZU51bWJlciI6bnVsbCwiaWF0IjoxNjUzNTc1MjA0LCJleHAiOjE2NTQxODAwMDQsImh0dHBzOi8vaGFzdXJhLmlvL2p3dC9jbGFpbXMiOnsieC1oYXN1cmEtYWxsb3dlZC1yb2xlcyI6WyJ1c2VyIiwiYWRtaW4iXSwieC1oYXN1cmEtZGVmYXVsdC1yb2xlIjoidXNlciIsIngtaGFzdXJhLXVzZXItaWQiOiJkaWQ6ZXRocjoweDA4N0UyNjcyQ0MxNzlkQzQyN0UyMzQyRUE1MGZiYUIyNjUzQzE5YjQifX0.RFYhVZ-DyTec0gK9Jpswb1pKpWlLSETO1i64-oYhc3A',
    },
    body: JSON.stringify({
      query: operationsDoc,
      variables: variables,
      operationName: operationName,
    }),
    
  });

  return await result.json();
}


