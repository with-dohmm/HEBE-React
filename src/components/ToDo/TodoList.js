import React, { useState, useEffect } from "react";
import TodoItem from "./TodoItem";
import "../../css/Todo/TodoList.css";

const TodoList = ({ list, setList, today }) => {
    return (
        <div id="todolist">
            {list.map((item, index) => {
                return (
                    <TodoItem
                        list={list}
                        setList={setList}
                        item={list[index]}
                        key={index}
                        index={index}
                        today={today}
                    />
                );
            })}
        </div>
    );
};

export default TodoList;