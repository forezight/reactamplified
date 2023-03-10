/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTodo = /* GraphQL */ `
  query GetTodo($id: ID!) {
    getTodo(id: $id) {
      rack
      slot
      ancho
      alto
      espesor
      dvh
      tipo
      presencia
      peso
      id
      createdAt
      updatedAt
    }
  }
`;
export const listTodos = /* GraphQL */ `
  query ListTodos(
    $filter: ModelTodoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTodos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        rack
        slot
        ancho
        alto
        espesor
        dvh
        tipo
        presencia
        peso
        id
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
