import React, {useContext} from 'react';
import '../styles/main.scss'
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TextService from '../config/textService'
import {LawContext} from '../App';
import Switch from "react-switch";
import POLAND from "../assets/images/poland.svg";
import ENG from "../assets/images/eng.svg";
import logo from "../logo.svg";

const NavBar: React.FC = () => {
    const {switchState, tab, setSwitch, setNavBarTab} = useContext(LawContext);

    return (
        <div className={'navBar'}>
            <AppBar position="sticky" color="secondary">
                <Tabs
                    value={tab}
                    onChange={(event, value) => setNavBarTab(value)}
                    indicatorColor="primary"
                    textColor="primary"
                    centered={true}
                    variant={"standard"}
                >
                    <div className={'logoContainer'}>
                        <img src={logo} alt={"logo"} className={'logo'}/>
                        {TextService.isPL() ?
                            <div className={'title'}>
                                <div className={'upperPart'}>{TextService.text.office}</div>
                                <div className={'lowerPart'}>{TextService.text.law}</div>
                            </div>
                            :
                            <div className={'titleShort'}>
                                <div className={'upperPart'}>{TextService.text.law}</div>
                                <div className={'lowerPart'}>{TextService.text.office}</div>
                            </div>
                        }
                    </div>
                    <Tab label={TextService.text.aboutUs} className={'hide'}/>
                    <Tab label={TextService.text.services} className={'hide'}/>
                    <Tab label={TextService.text.contact} className={'hide'}/>
                    <div className={'switchContainer'}>
                        <Switch onChange={(value) => setSwitch(value)}
                                checked={switchState}
                                width={100}
                                onColor={'#888'}
                                checkedIcon={<img src={POLAND} alt={"pl"} className={'checkedSwitch'}/>}
                                uncheckedIcon={<img src={ENG} alt={"ENG"} className={'uncheckedSwitch'}/>}
                        />
                    </div>
                </Tabs>
            </AppBar>
        </div>
    )
};

export default NavBar;