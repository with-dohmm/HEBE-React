import React, { useEffect, useState, useRef, useContext } from "react";
import moment from "moment";
import "../../css/Todo/TodoCalendar.css";
import axios from "axios";
import { LoginInfoContext } from './../../App';

const TodoCalendar = ({ today, setToday , Cal_on }) => {
    const [getMoment, setMoment] = useState(moment());
    const to_day = getMoment;
    const firstWeek = to_day.clone().startOf("month").week();
    const lastWeek =
        to_day.clone().endOf("month").week() === 1
            ? 53
            : to_day.clone().endOf("month").week();

    const [dayArr, setDayArr] = useState([]);

    const loginUserInfo = useContext(LoginInfoContext);

    const nowMonth = useRef(parseInt(to_day.format("M")));
    if (nowMonth.current === 0) {
        nowMonth.current = 12;
    } else if (nowMonth.current === 13) {
        nowMonth.current = 1;
    }

    const apiCalendar = (param) => {
        nowMonth.current = nowMonth.current + param;
        console.log(nowMonth.current);

        axios
            .post("api/todo/regdt", null, {
                params: { month: nowMonth.current, 
                iuser: loginUserInfo.iuser 
            },
            })
            .then((response) => {
                let tempArr = response.data.map(
                    (item, index) => Object.values(item)[0]
                );
                setDayArr(tempArr);
                console.log(tempArr);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const prev = () => {
        setMoment(getMoment.clone().subtract(1, "month"));
        apiCalendar(-1);
    };

    const next = () => {
        setMoment(getMoment.clone().add(1, "month"));
        apiCalendar(1);
    };


    const calendarArr = () => {
        let result = [];
        let week = firstWeek;
        for (week; week <= lastWeek; week++) {
            result = result.concat(
                <tr key={week}>
                    {Array(7)
                        .fill(0)
                        // eslint-disable-next-line no-loop-func
                        .map((data, index) => {
                            let days = to_day
                                .clone()
                                .startOf("year")
                                .week(week)
                                .startOf("week")
                                .add(index, "day");

                            if (
                                moment().format("YYYYMMDD") ===
                                days.format("YYYYMMDD")
                            ) {
                                return (
                                    <td key={days.format("D")}>
                                        <span
                                            className="day"
                                            style={{ backgroundColor: "red" }}  // 오늘 날짜
                                            onClick={() => {    // 오늘 날짜 클릭 시 달력 위 YYYY-MM-DD 변경
                                                setToday(   
                                                    to_day.format("YYYY-MM-") +
                                                        days.format("DD")
                                                );
                                                console.log(today);
                                            }}
                                        >
                                            {days.format("D")}
                                        </span>
                                        {dayArr.includes(
                                            parseInt(days.format("D"))
                                        ) ? (
                                            // 데이터 유,무
                                            <span className="day_todo"></span>
                                        ) : null}
                                    </td>
                                );
                            } else if (
                                days.format("MM") !== to_day.format("MM")
                            ) {
                                return (
                                    <td
                                        key={days.format("D")}
                                        style={{ backgroundColor: "black" , opacity:0.1}} // 지난 달 마지막 주 (29, 30, 31...), 다음 달 첫째 주 (1, 2, 3...)
                                    >
                                        <span
                                            className="day"
                                            style={{ color: "white" }}
                                        >
                                            {days.format("D")}
                                        </span>
                                    </td>
                                );
                            } else {
                                return (
                                    <td key={days.format("D")}>
                                        <span
                                            className="day"
                                            onClick={() => {    // 이번 달
                                                setToday(
                                                    to_day.format("YYYY-MM-") +
                                                        days.format("DD")
                                                );
                                                console.log(today);
                                            }}
                                        >
                                            {days.format("D")}
                                        </span>
                                        {dayArr.includes(
                                            parseInt(days.format("D"))
                                        ) ? (
                                            // 데이터 유,무
                                            <span className="day_todo"></span>
                                        ) : null}
                                    </td>
                                );
                            }
                        })}
                </tr>
            );
        }
        return result;
    };
    useEffect(() => {
        apiCalendar(0);
    }, []);

    return (
        <div className="calendar">
            <div className="calendar_image">
                <img
                    src={`img/calendarImg/${nowMonth.current}.jpg`}
                    onClick={() => {
                        console.log(nowMonth.current);
                    }}
                />
                <i className="close fas fa-times fa-2x" onClick={Cal_on}></i>
            </div>
            <div className="calendar_header">
                <div className="calendar_header_controller">
                    <i
                        className="prevBtn fas fa-angle-left fa-1x"
                        onClick={prev}
                    ></i>
                    <span onClick={calendarArr}>
                        {to_day.format("YYYY 년 MM 월")}
                    </span>
                    <i
                        className="nextBtn fas fa-angle-right fa-1x"
                        onClick={next}
                    ></i>
                </div>
            </div>

            <table>
                <tbody>
                    <tr className="days">
                        <th>
                            <span>Sun</span>
                        </th>
                        <th>
                            <span>Mon</span>
                        </th>
                        <th>
                            <span>Tue</span>
                        </th>
                        <th>
                            <span>Wed</span>
                        </th>
                        <th>
                            <span>Thu</span>
                        </th>
                        <th>
                            <span>Fri</span>
                        </th>
                        <th>
                            <span>Sat</span>
                        </th>
                    </tr>
                    {calendarArr()}
                </tbody>
            </table>
        </div>
    );
};

export default TodoCalendar;