import React, { useState, useEffect, useRef, useContext } from "react";
import TodoCreate from "./TodoCreate.js";
import TodoList from "./TodoList.js";
import TodoCalendar from "./TodoCalendar.js";
import "../../css/Todo/TodoCalendar.css";
import "../../css/Todo/Template.css";
import axios from "axios";
import { LoginInfoContext } from './../../App';

const Template = () => {
    const [today, setToday] = useState("");
    const [list, setList] = useState([]);
    const [calendarToggle,setCalendarToggle] = useState(false);
    const Cal_on = () => {
        setCalendarToggle(true);
        if(calendarToggle===true) {
            setCalendarToggle(false);
        }
    }

    const loginUserInfo = useContext(LoginInfoContext);

    const apiTodo = () => {
        // return new Promise((resolve, reject) => {
        let date = new Date();
        let Year = date.getFullYear();
        let Month = date.getMonth() + 1;
        if (Month < 10) {
            Month = "0" + Month;
        }
        let day = date.getDate();
        if (day < 10) {
            day = "0" + day;
        }
        setToday(`${Year}-${Month}-${day}`);
        axios({
            url: "/api/todo",
            method: "post",
            params: {
                iuser: loginUserInfo.iuser,
            },
        })
            .then((response) => {
                setList(response.data);
            })
            .catch((err) => {
                console.error("에러 : " + err);
            })
    };

    useEffect(() => {
        apiTodo();
    }, []);

    const prev = () => {
        const _date = new Date(today);
        _date.setDate(_date.getDate() - 1);

        const cYear = _date.getFullYear();
        let cMonth = _date.getMonth() + 1;
        if (cMonth < 10) {
            cMonth = "0" + cMonth;
        }
        let cDay = _date.getDate();
        if (cDay < 10) {
            cDay = "0" + cDay;
        }
        const selday = `${cYear}-${cMonth}-${cDay}`;

        setToday(`${cYear}-${cMonth}-${cDay}`);
        console.log(selday);

        axios
            .get(`/api/todo?regdt=${cYear}-${cMonth}-${cDay}`)
            .then((response) => {
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const next = () => {
        const _date = new Date(today);
        _date.setDate(_date.getDate() + 1);

        const cYear = _date.getFullYear();
        let cMonth = _date.getMonth() + 1;
        if (cMonth < 10) {
            cMonth = "0" + cMonth;
        }
        let cDay = _date.getDate();
        if (cDay < 10) {
            cDay = "0" + cDay;
        }

        setToday(`${cYear}-${cMonth}-${cDay}`);

        axios
            .get(`/api/todo?regdt=${cYear}-${cMonth}-${cDay}`)
            .then((response) => {
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div id="template">
            <div id="todo">
                <div id="head">
                    <div>
                    <i
                        className="fas fa-left fa-angle-left fa-2x"
                        onClick={prev}
                    ></i>
                    </div>
                    <div id="today">
                        <h1>{today}</h1>
                    </div>
                    <div>
                    <i
                        className="fas fa-right fa-angle-right fa-2x"
                        onClick={next}
                    ></i>
                    </div>
                </div>
                    <TodoCreate list={list} setList={setList} today={today} Cal_on={Cal_on}/>
                <TodoList list={list} setList={setList} today={today} />
            </div>
            {calendarToggle === false ?<TodoCalendar today={today} setToday={setToday} Cal_on={Cal_on}/> : null}
        </div>
    );
};

export default Template;