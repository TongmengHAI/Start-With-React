import {title,isAlert,students} from './constantHead.js'
export function H1() {
    return (
        <h1>H1 from export by name</h1>
    );
}
export function H3() {
    return (
        <h3>H3 from export by name</h3>
    );
}

function _alertMsg(name) {
    isAlert ? alert("Hello, is " + name) : alert("Hello, is not Meng")
}

export function ListName() {
    return (
        <>
            <h2>{title}</h2>
            <ol>
                {students.map((item) => (
                    <>
                        <li key={item}>
                            <span> Name: {item.name}, </span>
                            <span> Age: {item.age}, </span>
                            <button onClick={() => { _alertMsg(item.name) }}>Alert</button>
                        </li>

                    </>
                ))}
            </ol>
        </>
    );
}
