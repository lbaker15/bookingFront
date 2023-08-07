import React, {
    createContext,
    useReducer,
    useMemo,
    useEffect,
    Dispatch,
} from "react";

const number = 4;
const initialState = {
    auth: "",
    menuState: false,
    scroll: number,
};
export interface State {
    state: {
        auth: string;
        menuState: boolean;
        scroll: number;
        loader?: boolean;
        mainUrl?: string;
        token?: string;
        category?: string;
        sortBy?: string;
        darkMode?: boolean;
        displayData?: any;
    };
    dispatch?: React.Dispatch<any>;
}
export const Context = createContext<State>({ state: { ...initialState } });
interface Action {
    type: string;
    payload?: any;
}
export type AppDispatch = Dispatch<Action>;
export const DispatchContext = createContext<AppDispatch | null>(null);

const reducer = (state: any, action: any) => {
    switch (action.type) {
        case "darkMode": {
            return { ...state, darkMode: action.payload };
        }
        case "menu": {
            return { ...state, menuState: action.payload };
        }
        case "loader": {
            return { ...state, loader: action.payload };
        }
        case "auth": {
            return { ...state, auth: action.payload };
        }
        case "token": {
            return { ...state, token: action.payload };
        }
        case "category": {
            return { ...state, category: action.payload };
        }
        case "sortBy": {
            return { ...state, sortBy: action.payload };
        }
        case "displayData": {
            //the data on dashboard
            return { ...state, displayData: action.payload };
        }
        case "scrollData": {
            //the data on admin booking list
            return { ...state, scrollData: action.payload };
        }

        case "scroll": {
            //invoked when user scrolls down (value used in hook to get more posts)
            return { ...state, scroll: state.scroll + number };
        }
        case "mainUrl": {
            return { ...state, mainUrl: action.payload };
        }
        default: {
            return state;
        }
    }
};

export const ContextProvider = ({ children }: any) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    //remove dispatch from memo - already have dispatch context
    const value: any = React.useMemo(
        () => ({
            state,
            // dispatch,
        }),
        [state]
    );

    useEffect(() => {
        const prefersDarkMode = window.matchMedia(
            "(prefers-color-scheme: dark)"
        ).matches;
        dispatch({ type: "darkMode", payload: prefersDarkMode });

        (async function () {
            const mainUrlData = await fetch(
                "https://headless123321.000webhostapp.com/wp-json/acf/v2/options/main_url"
            );

            const mainUrlJson = await mainUrlData.json();
            const mainUrl = mainUrlJson.main_url;
            console.log("mainUrl", mainUrl);
            if (dispatch) {
                dispatch({ type: "mainUrl", payload: mainUrl });
            }
        })();
    }, []);

    return (
        <Context.Provider value={value}>
            <DispatchContext.Provider value={dispatch}>
                <div
                    className={
                        value.state.darkMode
                            ? "background--dark dark"
                            : "background"
                    }
                >
                    {children}
                </div>
            </DispatchContext.Provider>
        </Context.Provider>
    );
};
