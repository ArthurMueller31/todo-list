/* eslint-disable no-undef */
import React, { Component } from "react";

// Form
import { FaPlus } from "react-icons/fa";

// Tarefas
import { FaEdit } from "react-icons/fa";

import "./Main.css";
import { FaTrash } from "react-icons/fa6";

export default class Main extends Component {
  state = {
    novaTarefa: "",
    tarefas: [],
    index: -1,
  };

  componentDidMount() {
    const tarefas = JSON.parse(localStorage.getItem("tarefas"));

    if (!tarefas) return;

    this.setState({tarefas});
  }

  componentDidUpdate(prevProps, prevState) {
    const { tarefas } = this.state;

    if (tarefas === prevState.tarefas) return;

    localStorage.setItem("tarefas", JSON.stringify(tarefas));
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { tarefas, index } = this.state;
    let { novaTarefa } = this.state;
    novaTarefa = novaTarefa.trim();

    if (tarefas.indexOf(novaTarefa) !== -1 || novaTarefa.length === 0) return; // checa se é repetida ou se não é vazia

    const novasTarefas = [...tarefas];

    if (index === -1) {
      this.setState({
        tarefas: [...novasTarefas, novaTarefa],
        novaTarefa: "",
      });
    } else {
      novasTarefas[index] = novaTarefa;

      this.setState({
        tarefas: [...novasTarefas],
        index: -1,
      });
    }
  };

  handleChange = (e) => {
    this.setState({
      novaTarefa: e.target.value,
    });
  };

  handleEdit = (e, index) => {
    const { tarefas } = this.state;
    this.setState({
      index,
      novaTarefa: tarefas[index],
    });


  };

  handleDelete = (e, index) => {
    const { tarefas } = this.state;
    const novasTarefas = [...tarefas];
    novasTarefas.splice(index, 1);

    this.setState({
      tarefas: [...novasTarefas],
    });
  };

  render() {
    const { novaTarefa } = this.state;

    return (
      <div className="main">
        <h1>Lista de Tarefas</h1>
        <p>Você pode criar novas tarefas, editar as que já foram criadas, e apagá-las assim que desejar. Sua lista de tarefas é salva no navegador, então pode-se sair do site sem risco de perder algo.</p>

        <form onSubmit={this.handleSubmit} action="#" className="form">
          <input onChange={this.handleChange} type="text" value={novaTarefa} />
          <button type="submit">
            <FaPlus />
          </button>
        </form>

        <ul className="tarefas">
          {this.state.tarefas.map((tarefa, index) => (
            <li key={tarefa}>
              {tarefa}
              <span>
                <FaEdit
                size={18}
                  onClick={(e) => this.handleEdit(e, index)}
                  className="edit"
                />
                <FaTrash
                size={16}
                  onClick={(e) => this.handleDelete(e, index)}
                  className="delete"
                />
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
