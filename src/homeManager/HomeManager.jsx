import React from 'react'
import HomeManagerLogo from '../assets/HomeManager.png'
import "./homeManager.css"
import { AiOutlinePlus } from "react-icons/ai";
import { AiFillLock } from "react-icons/ai";
import { AiFillUnlock } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import { SiHomeassistant } from "react-icons/si";
import { RiShareLine } from "react-icons/ri";
import { MdArrowRight } from "react-icons/md";
import { FiPower } from "react-icons/fi";
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { app } from '../config/firebase-config';
import { getDatabase, ref, child, push, update, get, set, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";


const MenuBar = () => {
    let [logOutBtn, setLogOutBtn] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.removeItem('Auth Token');
        navigate('/login')
    }

    return (
        <div className="menuBar">
            <div >
                <img src={HomeManagerLogo} alt="" srcset="" style={{ height: 50, width: 142 }} />
            </div>
            <div className="menuSearch">
                <input className="menuBarInput" placeholder='Search your devices' type="text" />
                <button className='searchIcon' href="http://" target="_blank"><FiSearch color='505050' size={35} /></button>
            </div>
            <div className="menuProfile"><button className="profileButton" onClick={() => { setLogOutBtn(!logOutBtn) }} type='button'><div className='circle'></div></button>
                {
                    logOutBtn &&
                    <button type='button' className="logOutBtn" onClick={handleLogout} >
                        <p>Log Out</p>
                    </button>
                }
            </div>
        </div>
    )
}

let writeToDB = (deviceType, configName, location, newState) => {
    const database = getDatabase(app);
    const auth = getAuth(app);
    const uid = auth.currentUser.uid;

    set(ref(database, 'users/' + uid + '/devices/' + configName), {
        type: deviceType,
        state: newState,
        location: location
    });

}

const SmartLock = (props) => {
    const currentState = props.state == "locked";
    let toggleLock = () => {
        if (currentState) {
            writeToDB(props.type, props.configName, props.location, "unlocked")
        } else {
            writeToDB(props.type, props.configName, props.location, "locked")
        }
    }
    return (
        <div className="device smartLock">
            <div className="deviceTextArea">
                <h2>Smart Door Lock</h2>
                <h4>{props.location}</h4>
            </div>
            <div className="deviceStateArea">
                <button onClick={toggleLock} className='lockButton'>{currentState ? <AiFillLock size={125} /> : <AiFillUnlock size={125} />}</button>
            </div>
            <div className="currentState">
                <h3>{currentState ? " Door Locked" : "Door Unlocked"}</h3>
            </div>
        </div>
    )
}

const SmartSwitch = (props) => {
    const currentState = props.state === "true";
    return (
        <div className="device smartLock">
            <div className="deviceTextArea">
                <h2>Smart Light Switch</h2>
                <h4>{props.location}</h4>
            </div>
            <div className="deviceStateArea">
                <button onClick={() => { writeToDB(props.type, props.configName, props.location, currentState ? "false" : "true") }} className='lockButton'>{currentState ? <FiPower size={125} /> : <FiPower size={125} />}</button>
            </div>
            <div className="currentState">
                <h3>{currentState ? " Light On" : "Light Off"}</h3>
            </div>
        </div>
    )
}

const DeviceLocation = (props) => {
    return (
        <button className='sourceButton'><MdArrowRight size={30} />{props.icon}<span className='locationText'>{props.name}</span></button>
    )
}

const saveDeviceToDB = (deviceType, configName, location) => {
    const database = getDatabase(app);
    const auth = getAuth(app);
    const uid = auth.currentUser.uid;

    const deviceData = {
        type: deviceType,
        state: false,
        location: location,
    };
    const updates = {};
    updates['/users/' + uid + '/devices/' + configName] = deviceData;
    return update(ref(database), updates);
}

const AddDevice = (props) => {
    let [configName, setConfigName] = useState("");
    let [location, setLocation] = useState("");
    let [deviceType, setDeviceType] = useState("");
    let clearAndCall = () => {
        if (location == "" || deviceType == "" || configName == "") {

        } else {
            saveDeviceToDB(deviceType, configName, location)
            setConfigName("")
            setLocation("")
            setDeviceType("")
        }
    }
    return (
        <div className="addDeviceContainer">
            <h2>Add Smart Device</h2>
            <div className="deviceToAdd">
                <div className="deviceType" style={{ backgroundColor: deviceType == "smartDoorLock" ? "lightBlue" : "white" }}>
                    <button onClick={() => { setDeviceType("smartDoorLock") }} className='deviceTypeBtn'>Door Lock</button>
                </div>
                <div className="deviceType" style={{ backgroundColor: deviceType == "smartPowerOutlet" ? "lightBlue" : "white" }}>
                    <button onClick={() => { setDeviceType("smartPowerOutlet") }} className='deviceTypeBtn'>Power Outlet</button>
                </div>
                <div className="deviceType" style={{ backgroundColor: deviceType == "smartLightSwitch" ? "lightBlue" : "white" }}>
                    <button onClick={() => { setDeviceType("smartLightSwitch") }} className='deviceTypeBtn'>Light Switch</button>
                </div>
                <div className="deviceType" style={{ backgroundColor: deviceType == "smartDimmerSwitch" ? "lightBlue" : "white" }}>
                    <button onClick={() => { setDeviceType("smartDimmerSwitch") }} className='deviceTypeBtn'>Dimmer Switch</button>
                </div>
                <div className="deviceType" style={{ backgroundColor: deviceType == "smartThermostat" ? "lightBlue" : "white" }}>
                    <button onClick={() => { setDeviceType("smartThermostat") }} className='deviceTypeBtn'>Thermostat</button>
                </div>
            </div>
            <div className="deviceConfiguration">
                <div className="deviceInputContainer">
                    <label className="deviceLabel">Config Name</label>
                    <input value={configName} onChange={(e) => { setConfigName(e.target.value) }} className="deviceInput" type="text" />
                </div>
                <div className="deviceInputContainer">
                    <label className="deviceLabel">Location</label>
                    <input value={location} onChange={(e) => { setLocation(e.target.value) }} className="deviceInput" type="text" />
                </div>

            </div>
            <div className="deviceButtonContainer">
                <button onClick={clearAndCall} className="deviceSave">Save</button>
                <button onClick={props.disable} className="deviceCancel">Cancel</button>
            </div>
        </div>
    );
}


export const HomeManager = () => {
    const { state } = useLocation();
    const [deviceWindow, setWindow] = useState(false);
    let user = null;
    let authToken = sessionStorage.getItem('Auth Token')
    let userId = sessionStorage.getItem('User ID')
    const navigate = useNavigate();
    let [allDevices, setDevices] = useState([]);

    if (userId) {
        user = userId;
    } else if (state != null) {
        user = state.uid;
    } else {
        sessionStorage.removeItem('Auth Token');
        navigate('/login')
    }


    let disableWindow = () => {
        setWindow(false);
    }

    useEffect(() => {
        let authToken = sessionStorage.getItem('Auth Token')
        if (authToken) {
            const db = getDatabase(app);
            const allDataRef = ref(db, `users/${user}/devices`);
            onValue(allDataRef, (snapshot) => {
                let allDev = [];
                const data = snapshot.val();
                Object.entries(data).forEach((element) => { allDev.push(element) });
                setDevices([...allDev]);
            });
            if (allDevices.length === 0) {
                get(child(ref(db), `users/${user}/devices`)).then((snapshot) => {
                    if (snapshot.exists()) {
                        setDevices(Object.entries(snapshot.val()));
                    }
                }).catch((error) => {
                    console.error(error);
                });
            }

            navigate('/home')
        } else {
            navigate('/login')
        }
    }, [])

    return (
        <div className="rootContainer">
            <MenuBar />
            {deviceWindow && <AddDevice disable={disableWindow} />}
            <div className="mainContainer">
                <div className="homeContainer">
                    <button onClick={() => { setWindow(true) }} className='newBtn'><AiOutlinePlus style={{ verticalAlign: 'top', paddingTop: 3 }} /><span className='newBtnText'>New</span></button>
                    <div className="homeSection">
                        <DeviceLocation name="My Home" icon={<SiHomeassistant />} />
                        <DeviceLocation name="Shared With Me" icon={<RiShareLine />} />
                    </div>
                </div>
                <div className="deviceContainer">
                    {allDevices.map((device) => {
                        console.log(device[1].type)
                        if (device[1].type === "smartLightSwitch") {
                            return <SmartSwitch uid={user} location={device[1].location} state={device[1].state} type={device[1].type} configName={device[0]} />
                        } else if (device[1].type === "smartDoorLock") {
                            return <SmartLock uid={user} location={device[1].location} type={device[1].type} configName={device[0]} state={device[1].state} />
                        }
                    })}
                </div>
            </div>
        </div>

    )
}
