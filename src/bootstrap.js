  import React from "react";
  import { createRoot } from "react-dom/client";
  import { SnackbarProvider } from 'notistack';
  import { Provider } from "react-redux";
  import App from "./App";
  import * as serviceWorker from "./serviceWorker";
  import store from "./store/index";

  const container = document.getElementById('root');
  const root = createRoot(container);

  const MemoizedApp = React.memo(App);

  root.render(
    <Provider store={store}>
      <SnackbarProvider
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        maxSnack={3}
      >
        <MemoizedApp />
      </SnackbarProvider>
    </Provider>
  );

serviceWorker.register();