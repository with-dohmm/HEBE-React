import axios from "axios";
import React, { useState, useContext } from "react";
import "../../css/Todo/TodoItem.css";
import { LoginInfoContext } from './../../App';

const TodoItem = ({ list, setList, index, item, today }) => {
    const [toggle1, setToggle1] = useState(true);
    const [toggle2, setToggle2] = useState(false);
    const [updateToggle, setUpdateToggle] = useState(false);
    const [text, setText] = useState("");

    const loginUserInfo = useContext(LoginInfoContext);

    const handleChange = (e) => {
        setText(e.target.value);
    };

    const check = () => {
        if (toggle1 === true) {
            setToggle1(false);
            setToggle2(true);
            item.done = true;
            let newArr = [...list];
            newArr[index].done = item.done;
            setList(newArr);
        } else {
            setToggle1(true);
            setToggle2(false);
            item.done = false;
            let newArr = [...list];
            newArr[index].done = item.done;
            setList(newArr);
        }
    };

    const update = () => {
        setUpdateToggle(true);
        let newArr = [...list];
        if (updateToggle === true) {
            setUpdateToggle(false);
            if (text === "") {
                alert("내용을 입력해 주세요!");
                setUpdateToggle(true);
                return;
            }
        }
        newArr.fill(
            {
                iuser : loginUserInfo.iuser,
                t_num: item.t_num,
                t_text: text,
                done: item.done,
                regdt: item.regdt,
            },
            index,
            index + 1
        );
        setList(newArr);
        axios({
            url: "/api/todo/update",
            method: "post",
            data: {
                list,
            },
        })
            .then((response) => {
            })
            .catch((err) => {
                console.error("에러 : " + err);
            });
    };

    const remove = () => {
        let newArr = [...list];
        newArr.splice(index, 1);
        setList(newArr);
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            update();
        }
    };

    return (
        <>
            {today === item.regdt 
            ? (
                <div className="item">
                    {/* 체크표시 부분 */}
                    {toggle1 && (<i className={item.done === true ? "check far fa-check-circle" : "far fa-circle"} onClick={check}></i>)}
                    {toggle2 && (<i className="check far fa-check-circle" onClick={check}></i>)}

                    {/* 체크 안했을 때 */}
                    {toggle1 && (<span className={item.done === false ? "check_out" : "check_in"}></span>)}
                    {toggle1 && !updateToggle && (<span className={item.done === false ? "check_out" : "check_in"}><p>{item.t_text}</p></span>)}

                    {/* 글 수정눌렀을 때 value 값 */}
                    {updateToggle && (<input className="input_text" type="text" onChange={handleChange} onKeyPress={handleKeyPress} maxlength='54'/>)}

                    {/* 체크했을 때 ( 글자색 회색으로 ) */}
                    {toggle2 && !updateToggle ? (<span className="check_in"><p>{item.t_text}</p></span>) : null}
                    
                    {/* 수정 버튼 클릭 시 버튼 모양 변화 토글 */}
                    {!updateToggle 
                        ? (<i className="upd_on far fa-edit" onClick={update}></i>) 
                        : (<i className="upd_off fas fa-edit" onClick={update}></i>)}
                    {!updateToggle 
                        ? (<i className="del_on far fa-trash-alt" onClick={remove}></i>) 
                        : (<i class="del_off fas fa-trash-alt" onClick={remove}></i>)}
                </div>
            ) : null}
        </>
    );
};

export default TodoItem;