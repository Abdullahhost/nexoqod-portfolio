"use client"


import { useState, useRef } from "react"


import axios from "axios"
import { UserType } from "@/app/type/ProjectType"
import Input from "@/app/components/input/Input"
import { handleMouseMove, handleMouseOut } from "@/app/components/button/buttonEffect"
import Skeleton from "@/app/skeleton/Skeleton"


const Form = () => {


    const divRef = useRef<HTMLDivElement>(null)
    const textRef = useRef<HTMLSpanElement>(null);
    const [loading, setLoading] = useState<Boolean>(false)

    const [userInfo, setUserInfo] = useState<UserType>({
        userName: "",
        userEmail: "",
        userMessage: "",
        sendingEmail: false

    })


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value,
        })
    }


    const handleSubmit = async () => {


        setLoading(true)
        if (userInfo.userEmail !== "" &&
            userInfo.userMessage !== "" &&
            userInfo.userMessage !== ""
        ) {


            await axios.post("https://mail-sending.onrender.com/sendMail", userInfo)


                .then((data) => {
                    if (data.status === 200) {
                        alert("Message sent!")
                        console.log(data.data)
                    } else {
                        alert("Not!!!!")

                    }
                })
                .catch((err) => console.log(err)).finally(() => {
                    setLoading(false)
                });

            setUserInfo({
                userEmail: "",
                userMessage: "",
                userName: ""
            })
        } else {
            alert("please Insert All Field!");
            setLoading(false)
        }
    }
    return (
        <div>
            {loading && <div className="fixed top-0 left-0 backdrop-blur-sm w-full h-screen z-[1000]">

                <Skeleton />
            </div>
            }
            <form>

                <Input heading="What's Your Name?"
                    name="userName" type="input"
                    number={1} placeholder="Jhon, doe"
                    onChange={(e) => handleChange(e)}
                    userValue={userInfo.userName} />

                <Input heading="What's Your Email?"
                    name="userEmail" type="email"
                    number={2} placeholder="Jhon@gmail.com"
                    userValue={userInfo.userEmail}
                    onChange={(e) => handleChange(e)}
                />
                <Input heading="Project Details"
                    name="userMessage" textArea
                    number={4} placeholder="Hello Mamun. Can you help me with..."
                    userValue={userInfo.userMessage}
                    onChange={(e) => handleChange(e)} />

                <div className="text-white flex justify-between items-center w-fit gap-4 mt-12">
                    <input className="w-[40px] h-[40px]" onClick={(e) => setUserInfo({
                        ...userInfo, sendingEmail: !userInfo.sendingEmail
                    })} type="checkbox" />  <label htmlFor="ChelckBox">Got a project? Discuss our expert Team?</label>
                </div>



                <div className="flex justify-end p-10">
                    <div ref={divRef}
                        onClick={handleSubmit}
                        onMouseMove={(e) => handleMouseMove(e, divRef, textRef)}
                        onMouseOut={(e) => handleMouseOut(e, divRef, textRef)}
                        className={`buttonWrapper rounded-full relative overflow-hidden w-[10vw] h-[10vw]  min-w-32 min-h-32 `}
                    >
                        <button type="submit" className={`button rounded-full border border-neutral-600 border-l-2 border-r-2
                            grid place-items-center w-full h-full p-[10px]  md:p-[20px]`} >
                            <span ref={textRef} className={`inline-block text-xl relative z-40 pointer-events-none`}>
                                Send it
                            </span>
                        </button>

                        <div className="absolute top-0 left-0 w-full h-full">
                            <span className={`test before:rounded-full after:rounded-full w-full h-full`}></span>
                        </div>

                    </div>
                </div>
            </form>
        </div>
    )
}
export default Form




// services ID: service_0l4ubqg