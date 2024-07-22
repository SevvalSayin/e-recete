import React from "react";
import PropTypes from "prop-types";

export const MaterialTailwindContext = React.createContext(null);
MaterialTailwindContext.displayName = "MaterialTailwindContext";

export const StatisticsDataContext = React.createContext(null);
StatisticsDataContext.displayName = "StatisticsDataContext";

export const NotificationsContext = React.createContext(null);

export const actionTypes = {
  OPEN_SIDENAV: "OPEN_SIDENAV",
  SIDENAV_TYPE: "SIDENAV_TYPE",
  SIDENAV_COLOR: "SIDENAV_COLOR",
  TRANSPARENT_NAVBAR: "TRANSPARENT_NAVBAR",
  FIXED_NAVBAR: "FIXED_NAVBAR",
  OPEN_CONFIGURATOR: "OPEN_CONFIGURATOR",
};

export function reducer(state, action) {
  switch (action.type) {
    case actionTypes.OPEN_SIDENAV:
      return { ...state, openSidenav: action.value };
    case actionTypes.SIDENAV_TYPE:
      return { ...state, sidenavType: action.value };
    case actionTypes.SIDENAV_COLOR:
      return { ...state, sidenavColor: action.value };
    case actionTypes.TRANSPARENT_NAVBAR:
      return { ...state, transparentNavbar: action.value };
    case actionTypes.FIXED_NAVBAR:
      return { ...state, fixedNavbar: action.value };
    case actionTypes.OPEN_CONFIGURATOR:
      return { ...state, openConfigurator: action.value };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

export function MaterialTailwindControllerProvider({ children }) {
  const initialState = {
    openSidenav: false,
    sidenavColor: "white",
    sidenavType: "white",
    transparentNavbar: true,
    fixedNavbar: false,
    openConfigurator: false,
  };

  const [controller, dispatch] = React.useReducer(reducer, initialState);
  const value = React.useMemo(() => [controller, dispatch], [controller]);

  return (
    <MaterialTailwindContext.Provider value={value}>
      {children}
    </MaterialTailwindContext.Provider>
  );
}

export function useMaterialTailwindController() {
  const context = React.useContext(MaterialTailwindContext);

  if (!context) {
    throw new Error(
      "useMaterialTailwindController should be used inside the MaterialTailwindControllerProvider."
    );
  }

  return context;
}

MaterialTailwindControllerProvider.displayName = "MaterialTailwindControllerProvider";

MaterialTailwindControllerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const setOpenSidenav = (dispatch, value) =>
  dispatch({ type: actionTypes.OPEN_SIDENAV, value });
export const setSidenavType = (dispatch, value) =>
  dispatch({ type: actionTypes.SIDENAV_TYPE, value });
export const setSidenavColor = (dispatch, value) =>
  dispatch({ type: actionTypes.SIDENAV_COLOR, value });
export const setTransparentNavbar = (dispatch, value) =>
  dispatch({ type: actionTypes.TRANSPARENT_NAVBAR, value });
export const setFixedNavbar = (dispatch, value) =>
  dispatch({ type: actionTypes.FIXED_NAVBAR, value });
export const setOpenConfigurator = (dispatch, value) =>
  dispatch({ type: actionTypes.OPEN_CONFIGURATOR, value });
