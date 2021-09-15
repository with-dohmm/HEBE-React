import React, { useState, useEffect, useContext } from "react";
import "../../css/Todo/TodoCreate.css";
import axios from "axios";
import { LoginInfoContext } from './../../App';

const TodoCreate = ({ list, setList, today }) => {
    const [on, setOn] = useState(true);
    const [off, setOff] = useState(false);
    let t_num = list.length;

    const loginUserInfo = useContext(LoginInfoContext);

    const onToggle = () => {
        if (on === true) {
            setOn(false);
            setOff(true);
        } else {
            setOn(true);
            setOff(false);
        }
    };

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
            {off && (
                <>
                    <input
                        type="text"
                        className="insert"
                        onChange={handleChange}
                        placeholder="  입력 후 , Enter "
                        onKeyPress={handleKeyPress}
                    />
                    <i onClick={save} className="plus fas fa-plus fa-2x"></i>
                </>
            )}
            {on && (
                <i
                    onClick={onToggle}
                    className="toggle fas fa-toggle-on fa-3x"
                ></i>
            )}
            {off && (
                <i
                    onClick={onToggle}
                    className="toggle fas fa-toggle-off fa-3x"
                ></i>
            )}
        </div>
    );
};

export default TodoCreate;
