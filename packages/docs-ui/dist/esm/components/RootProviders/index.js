import React from "react";
import { BrowserProvider, ColorModeProvider, LayoutProvider, MobileProvider, ModalProvider, } from "../../providers";
export const RootProviders = ({ children, layoutProviderProps = {}, }) => {
    return (React.createElement(BrowserProvider, null,
        React.createElement(MobileProvider, null,
            React.createElement(LayoutProvider, { ...layoutProviderProps },
                React.createElement(ColorModeProvider, null,
                    React.createElement(ModalProvider, null, children))))));
};
