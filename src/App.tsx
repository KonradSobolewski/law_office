import React, {useState, useMemo} from 'react';
import logo from './logo.svg';
import './App.css';
import NavBar from './components/navBar'
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core'
import {amber} from '@material-ui/core/colors'
import TextService from './config/textService'
import { CookiesProvider, useCookies } from 'react-cookie';
import Cookies from './components/cookies';
import SliderShow from './components/slider'
import { ScrollTo } from "react-scroll-to";

let textConfig = require('./config/text');

export const LawContext = React.createContext({
    switchState: true,
    tab: 1,
    setSwitch: (value: boolean) => {},
    setNavBarTab: (value: number, scrollTo: () => {}) => {}
});

const theme = createMuiTheme({
    palette: {
        primary: {
            main: amber.A100,
        },
        secondary: {
            main: '#111'
        },
        type: 'dark'
    }
});

const App: React.FC = () => {
    const [switchState, setSwitchState] = useState<boolean>(true);
    const [tab, setTab] = useState<number>(1);
    const [showCookies, setShowCookies] = useState<boolean>(true);
    const [acceptCookies, setAcceptCookies] = useState<boolean>(false);
    const [cookies, setCookie] = useCookies(['switch']);

    useMemo(() => {
        if(cookies.switch !== undefined) {
            setShowCookies(false);
            setAcceptCookies(true);
            TextService.text = cookies.switch === "true" ? textConfig.pl : textConfig.eng;
            setSwitchState(cookies.switch === "true");
        }
    },[cookies]);

    const setSwitch = (value: boolean) => {
        setSwitchState(value);
        TextService.text = value ? textConfig.pl : textConfig.eng;
        if(acceptCookies) {
            setCookie('switch', value, {path: '/'});
        }
    };

    const setNavBarTab = (value: number, scrollTo: ({}) => {}) => {
        let height;
        switch (value) {
            case 1:
                height = 0;
                break;
            case 2:
                height = 1000;
                break;
            default:
                height = 0;
        }
        scrollTo({x: 0, y: height, smooth: true});
        setTab(value);
    };

    const accept = () => {
        setCookie('switch', switchState, {path: '/'});
    };

    const close = () => {
        setAcceptCookies(false);
        setShowCookies(false);
    };

    return (
        <CookiesProvider>
            <MuiThemeProvider theme={theme}>
                <LawContext.Provider value={{switchState, tab, setSwitch, setNavBarTab}}>
                    {showCookies ? <Cookies close={close} accept={accept}/> : null}
                    <div className="App">
                        <ScrollTo>
                            {({scrollTo}) => <NavBar scroll={scrollTo}/>}
                        </ScrollTo>
                        <SliderShow/>
                        <header className="App-header">
                            <img src={logo} className="App-logo" alt="logo"/>
                            <p>test
                                <code>src/App.tsx</code> and save to reload. test {tab}
                            </p>
                        </header>
                    </div>
                </LawContext.Provider>
            </MuiThemeProvider>
        </CookiesProvider>
    );
};

export default App;
