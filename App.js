import React, {Component, useState} from 'react';
import { StyleSheet, Text, View, TextInput, Button, Switch, ScrollView } from 'react-native';
import Constants from 'expo-constants';

const styles = StyleSheet.create({
  container: {
    paddingTop: 7,
    paddingLeft: 3,
    paddingRight: 3,
    flex: 1,
    flexDirection: "row",
    backgroundColor: '#fff',
    justifyContent: "space-around",
  },
  count:{
    fontSize: 10,
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  mainContainer:{
    paddingTop: Constants.statusBarHeight + 5,
  }
});



const ToDo = props => {
    return(
      <View style = {styles.container}>
      <Text style = {{flexGrow: 3}}>{props.toDo.todo}</Text>
      <Switch onValueChange = {props.toggle} value ={props.toDo.toggle} />  
      <Button title = "Delete" onPress = {props.delete}/>
      </View>
    )
  }

  let id = 0


export default class App extends Component{
  constructor(){
    super()
    this.state = {
      toDos: [],
      currentText: ""
    }
    this.addTodo = this.addTodo.bind(this)
  }


  addTodo(){
    if(this.state.currentText !== ""){
    this.setState({
      toDos:[...this.state.toDos,
      {id: id++, todo: this.state.currentText, toggle: false}],
    currentText: "",
    })
    console.log("")
  }
  }

  deleteTodo(id){
    this.setState(state =>({
      toDos: this.state.toDos.filter(todo => todo.id !== id)
    }))
  }

  toggleTodo(id){
    this.setState(state =>({
      toDos: this.state.toDos.map(todo =>{
        if(todo.id !== id) return todo
        return {
            id: todo.id,
            todo: todo.todo,
            toggle: !todo.toggle
          }
        }
      )
      }))
  }

  render(){
    return(
      <View style = {styles.mainContainer}>
        <View style = {styles.count}>
          <Text>Total Todo's: {this.state.toDos.length}</Text>
          <Text>Unchecked Todo's: {this.state.toDos.filter(todo => !todo.toggle).length}</Text>
        </View>
        <View style = {styles.count}>
          <TextInput
            placeholder = {"Type  Here!!"}
            onChangeText = {text => this.setState({currentText: text})}
            value = {this.state.currentText}
            style = {{flexGrow: 2}}
            />
          <Button title = {"Add Todo"} onPress = {this.addTodo} />
        </View>
        <ScrollView>
          {this.state.toDos.map(todo =>
           (
            <ToDo 
            toggle = {() => this.toggleTodo(todo.id)}
            delete = {() => this.deleteTodo(todo.id)}
            toDo = {todo}
            key = {todo.id}
             />
          ))
          }
        </ScrollView>
      </View>
    )
  }
}
