/* src/App.jsx */
import React, { useEffect, useState } from 'react'
import { Amplify, API, graphqlOperation } from 'aws-amplify'
import { createTodo } from './graphql/mutations'
import { listTodos } from './graphql/queries'

import { withAuthenticator, Button, Heading } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsExports from "./aws-exports";

import Paper from '@mui/material/Paper';
import './App.css';

Amplify.configure(awsExports);

const initialState = { name: '', description: '' }

const App = ({ signOut, user }) => {
  const [formState, setFormState] = useState(initialState)
  const [todos, setTodos] = useState([])

  useEffect(() => {
    fetchTodos()
  }, [])

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value })
  }

  async function fetchTodos() {
    try {
      const todoData = await API.graphql(graphqlOperation(listTodos)) 
      const todos = todoData.data.listTodos.items
      console.log('todos',todos)
      setTodos(todos)
    } catch (err) { console.log('error fetching todos',err) }
  }

  async function addTodo() {
    try {
      if (!formState.name || !formState.description) return
      const todo = { ...formState }
      setTodos([...todos, todo])
      setFormState(initialState)
      await API.graphql(graphqlOperation(createTodo, {input: todo}))
    } catch (err) {
      console.log('error creating todo:', err)
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="auth">
          <Heading color="rgb(114, 161, 189)" flex="5"   display="inline-flex" padding="10px" level={4}>User: {user.username}</Heading>
          <Button color="rgb(114, 161, 189)" flex="1" display="inline-flex" padding="10px" onClick={signOut}>Sign out</Button>
        </div>
        <h2>Stock de Vidrios</h2>  
      </header>
      <div className="glassList">
          <Paper variant="outlined" elevation={0}>
            <div className="topRow">
                  <div className="toprowflex1">Rack</div>
                  <div className="toprowflex1">Slot</div>
                  <div className="toprowflex1">Ancho</div>
                  <div className="toprowflex1">Alto</div>
                  <div className="toprowflex1">Espesor</div>
                  <div className="toprowflex1">DVH</div>
                  <div className="toprowflex1">Peso</div>
                  <div className="toprowflex2">Tipo</div>
              </div>
            </Paper>
          {todos.map(todo => {
            if(todo.presencia){   
              let dvh;
              console.log("dvh after let:" + dvh + typeof dvh);
              console.log("todo.dvh:" + todo.dvh + typeof todo.dvh);         
              if (todo.dvh){
                dvh = 'SI';
              }
              else{
                dvh = 'NO';
              }
              console.log("dvh after if:" + dvh + typeof dvh);
              return (
                <Paper variant="outlined" elevation={2}>
                  <div className="glassEntry">
                    <div className="rack">{todo.rack}</div>
                    <div className="slot">{todo.slot}</div>
                    <div className="ancho">{todo.ancho}</div>
                    <div className="alto">{todo.alto}</div>
                    <div className="espesor">{todo.espesor}</div>
                    <div className="dvh">{dvh}</div>
                    <div className="dvh">{todo.peso}</div>
                    <div className="tipo">{todo.tipo}</div>
                  </div>
                </Paper>
              );
            }
          })}
        </div>
      </div>      
  )
}

const styles = {
  container: { width: 400, margin: '0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 20 },
  todo: {  marginBottom: 15 },
  input: { border: 'none', backgroundColor: '#ddd', marginBottom: 10, padding: 8, fontSize: 18 },
  todoName: { fontSize: 20, fontWeight: 'bold' },
  todoDescription: { marginBottom: 0 },
  button: { backgroundColor: 'black', color: 'white', outline: 'none', fontSize: 18, padding: '12px 0px' }
}

export default withAuthenticator (App);
