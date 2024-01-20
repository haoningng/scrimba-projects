import React from "react"
import About from "./About"
import Interests from "./Interests"

export default function Info() {
    return (
        <div className="container--info">
            <img src="https://media.licdn.com/dms/image/D4E03AQEb4WL4N0euXg/profile-displayphoto-shrink_800_800/0/1697150259136?e=1706745600&v=beta&t=73VTW_dvetd3YfGC7LspHjaWMkcFQahru2zWR8WYBsA" alt="Nick's Portrait Photo" width="317px" height="317px" />
            <h1 className="name" >Nick Ng</h1>
            <p className="position">Software Developer</p>
            <p className="text website"><a className="github" href="https://github.com/haoningng">https://github.com/haoningng</a></p>
            <div className="buttons">
                <a href="mailto:nick.nghn@gmail.com">
                    <button><i className="fa-solid fa-envelope"></i> Email</button>
                </a>
                <a href="https://www.linkedin.com/in/nick-ng-b27706b0/">
                    <button id="linkedin"><i className="fa-brands fa-linkedin"></i> Linkedin</button>
                </a>
            </div>
            <About />
            <Interests />
        </div>
    )
}