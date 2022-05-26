export async function isNewUser(token, issuer) {
  const operationsDoc = `
query isNewUser($issuer: String!) {
  users(where: {issuer: {_eq: $issuer}}) {
    id
    email
    issuer
  }
}
`;

  const response = await queryHasuraGQL(
    operationsDoc,
    "isNewUser",
    {
      issuer: issuer,
    },
    token
  );
  console.log({ response, issuer });
  return response?.users?.length === 0;
}

async function queryHasuraGQL(operationsDoc, operationName, variables, token) {
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
