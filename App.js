import React from "react";
import ScreensNavigator from "./src";
import { Provider as AuthProvide } from "./src/context/AuthContext";
import { Provider as LocationProvider } from "./src/context/LocationContext";
import { Provider as TrackProvider } from "./src/context/TrackContext";
import { setNavigation } from "./src/navigationRef";

const App = () => {
  return (
    <TrackProvider>
      <LocationProvider>
        <AuthProvide>
          <ScreensNavigator
            ref={navigator => {
              setNavigation(navigator);
            }}
          />
        </AuthProvide>
      </LocationProvider>
    </TrackProvider>
  );
};

export default App;
