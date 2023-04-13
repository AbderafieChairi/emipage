import React, { useState } from 'react'
import "./Achievements.css"
export default function Achievements() {
    const [year, setYear] = useState("2020/2021")
    const [data, setData] = useState([
        {
            year: "2020/2021",
            achievments: [
                {
                    date: "01/2021",
                    achievement: "First achievement",
                    data: "First data"
                },
                {
                    date: "02/2021",
                    achievement: "Second achievement",
                    data: "Second data"
                }
            ]
        },
        {
            year: "2021/2022",
            achievments: [
                {
                    date: "01/2021",
                    achievement: "First achievement",
                    data: "ahmed data"
                },
                {
                    date: "02/2021",
                    achievement: "Second achievement",
                    data: "abderafie data"
                }
            ]
        },
        {
            year: "2022/2023",
            achievments: [
                {
                    date: "01/2021",
                    achievement: "First achievement",
                    data: "youssef data"
                },
                {
                    date: "02/2021",
                    achievement: "Second achievement",
                    data: "khadija data"
                }
            ]
        }
    ])
  return (
    <div>
        <h1 style={{textAlign:'center'}}>Achievements</h1>

    <div className="ach-container">
    <div>
        <div className="ach-years">
            {data.map((item, index) => (
                <div className="ach-year" key={index} onClick={() => setYear(item.year)}>
                    {item.year}
                </div>
            ))}

        </div>
    </div>
    <div className="ach1">
        <div className="achs">
            {
                data.filter(i=>i.year==year)[0].achievments.map((item, index) => (
                    <div className="ach">
                        <div className="ach-side">
                            <div className="ach-row">
                                <div>{item.date}</div>
                                <div className="timeline">
                                    <div className="cercle"></div>
                                    <div className="line"></div>
                                </div>
                            </div>
                        </div>
                        <div className="ach-cont">
                            <div className="ach-h">
                                {item.achievement}
                            </div>
                            <div className="ach-txt">
                                {item.data}
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    </div>
</div>
</div>

  )
}
