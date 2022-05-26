export async function isNewUser(token) {
  const operationsDoc = `
query MyQuery {
  users(where: {issuer: {_eq: "did:ethr:0x087E2672CC179dC427E2342EA50fbaB2653C19b4"}}) {
    id
    email
    issuer
  }
}
`; 

const response = await queryHasuraGQL(operationsDoc, "MyQuery", {}, token);
console.log({response}) ;
return response?.users?.length === 0;
};


async function queryHasuraGQL(
  operationsDoc,
  operationName,
  variables,
  token
) {
  const result = await fetch(process.env.NEXT_PUBLIC_HASURA_ADMIN_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: operationsDoc,
      variables: variables,
      operationName: operationName,
    }),
  });

  return await result.json();
}

const operationsDoc = `
query MyQuery {
  users(where: {issuer: {_eq: "did:ethr:0x087E2672CC179dC427E2342EA50fbaB2653C19b4"}}) {
    id
    email
    issuer
  }
}
`;

function fetchMyQuery() {
  return queryHasuraGQL(operationsDoc, "MyQuery", {}, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3N1ZXIiOiJkaWQ6ZXRocjoweDA4N0UyNjcyQ0MxNzlkQzQyN0UyMzQyRUE1MGZiYUIyNjUzQzE5YjQiLCJwdWJsaWNBZGRyZXNzIjoiMHgwODdFMjY3MkNDMTc5ZEM0MjdFMjM0MkVBNTBmYmFCMjY1M0MxOWI0IiwiZW1haWwiOiJzYW1kb25hZ2h5YmVsbEBnbWFpbC5jb20iLCJvYXV0aFByb3ZpZGVyIjpudWxsLCJwaG9uZU51bWJlciI6bnVsbCwiaWF0IjoxNjUzNTc1NDc2LCJleHAiOjE2NTQxODAyNzYsImh0dHBzOi8vaGFzdXJhLmlvL2p3dC9jbGFpbXMiOnsieC1oYXN1cmEtYWxsb3dlZC1yb2xlcyI6WyJ1c2VyIiwiYWRtaW4iXSwieC1oYXN1cmEtZGVmYXVsdC1yb2xlIjoidXNlciIsIngtaGFzdXJhLXVzZXItaWQiOiJkaWQ6ZXRocjoweDA4N0UyNjcyQ0MxNzlkQzQyN0UyMzQyRUE1MGZiYUIyNjUzQzE5YjQifX0.m5jfpHz8fXOUf6lQtbtb6bIsAjH-J4SPcDlM5F-B6bA');
}
export async function startFetchMyQuery() {
  const { errors, data } = await fetchMyQuery();

  if (errors) {
    console.log({errors});
  } else {
    console.log({data});
  }
}
