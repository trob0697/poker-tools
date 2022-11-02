import { ReactElement, useState } from "react";
import { EventText, HomeCredentials } from "../../utils/models";

import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";


function Home() : ReactElement {
    const [isLogin, setIsLogin] = useState<Boolean>(true);
    const [credentials, setCredentials] = useState<HomeCredentials>({
        email: "",
        password: "",
        confirmPassword: ""
    });

    function clearAllFields() : void {
        setCredentials({
            email: "",
            password: "",
            confirmPassword: ""
        });
    };

    function login() : void {
        // TODO: API to login
        localStorage.setItem("accessToken", "token");
        localStorage.setItem("refreshToken", "token");
        clearAllFields();
    };

    function register() : void {
        // TODO: API to create account
        clearAllFields();
    };

    function onLogout() : void {
        // TODO: API to logout
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        clearAllFields()
    }

    function checkTokens() : Boolean {
        const accessToken : string|null = localStorage.getItem("accessToken");
        const refreshToken : string|null = localStorage.getItem("refreshToken");
        if(accessToken !== null && refreshToken !== null){
            return true;
        }
        else{
            return false;
        }
    }

    return(
        <div className="background">
            <div className="home-boxes-container">
                <div className="home-box" >
                    <div>
                        <h1 className="landing-description">Tools to improve your game and beat the pool!</h1>
                        <ul className="features-list">
                            <li>Preflop Charts</li>
                            <li>Equity Calculator</li>
                            <li>Hand History Database</li>
                            <li>Win Rate Graphs</li>
                            <li>and more!</li>
                        </ul>
                    </div>
                </div>
                {checkTokens()? 
                <div className="home-box">
                    <div>
                        <div className="logged-in-text">Welcome</div>
                        <Button className="form-item" variant="danger" onClick={() => onLogout()}>Logout</Button>
                    </div>
                </div>
                :
                <div className="home-box">
                    <div>
                        <div className="login-register">
                            <h1 className={isLogin ? "selected" : "not-selected"} onClick={() => {clearAllFields(); setIsLogin(true);}}>Login</h1>
                            <h1 className={!isLogin ? "selected" : "not-selected"} onClick={() => {clearAllFields(); setIsLogin(false);}}>Register</h1>
                        </div>
                        {isLogin ?
                        <div>
                            <Form className="form-group">
                                <FormControl type="email" placeholder="Email" value={credentials.email} onChange={(e: EventText) => setCredentials({...credentials, email: e.target.value})}/>
                                <FormControl type="password" placeholder="Password" value={credentials.password} onChange={(e: EventText) => setCredentials({...credentials, password: e.target.value})}/>
                                <Button variant="danger" onClick={() => login()}>Login</Button>
                            </Form>
                        </div>
                        :
                        <div>
                            <Form className="form-group">
                                <FormControl type="email" placeholder="Email" value={credentials.email} onChange={(e: EventText) => setCredentials({...credentials, email: e.target.value})}/>
                                <FormControl type="password" placeholder="Password" value={credentials.password} onChange={(e: EventText) => setCredentials({...credentials, password: e.target.value})}/>
                                <FormControl type="password" placeholder="Confirm Password" value={credentials.confirmPassword} onChange={(e: EventText) => setCredentials({...credentials, confirmPassword: e.target.value})}/>
                                <Button variant="danger" onClick={() => register()}>Create Account</Button>
                            </Form>
                        </div>
                        }
                    </div>
                </div>
                }
            </div>
        </div>
    )
};

export default Home;
