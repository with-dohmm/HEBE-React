import React, { useState, useEffect, useContext } from "react";
import "../../css/Todo/TodoCreate.css";
import axios from "axios";
import { LoginInfoContext } from './../../App';

const TodoCreate = ({ list, setList, today , Cal_on}) => {

    let t_num = list.length;

    const loginUserInfo = useContext(LoginInfoContext);

    const [text, setText] = useState("");
    const handleChange = (e) => {
        setText(e.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            save();
        }
    };

    let newArr = [...list];
    const save = () => {
        if (text === "") {
            alert("내용을 입력해 주세요!");
            return;
        }
        if (t_num !== 0) {
            t_num = list[list.length - 1].t_num;
        }
        newArr.push({
            iuser : loginUserInfo.iuser,
            t_num: t_num + 1,
            t_text: text,
            done: false,
            regdt: today,
        });
        setList(newArr);
        console.log(newArr);
    };

    useEffect(() => {
        axios({
            url: "/api/todo/insert",
            method: "post",
            data: {
                list,
            },
        })
            .then((response) => {
                console.log("Todo 추가/삭제");
            })
            .catch((err) => {
                console.error("에러 : " + err);
            });
    }, [list]);

    return (
        <div className="insertForm">
            <input
                type="text"
                className="insert"
                onChange={handleChange}
                placeholder="  입력 후 , Enter "
                onKeyPress={handleKeyPress}
                maxlength='54'
            />
            <i onClick={save} className="plus far fa-plus-square fa-2x"></i>
            <i onClick={Cal_on} className="cal far fa-calendar-alt fa-2x"></i>
        </div>
    );
};

export default TodoCreate;