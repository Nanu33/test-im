import { MuiThemeProvider } from '@material-ui/core';
import React, { Component ,Suspense, lazy } from 'react'

import 'Remote/styles'
const RemoteDDReport = lazy(() => import('Remote/DDReport'))


export default class VA_Layout extends Component {
  constructor(props) {
    super(props);
    this.state = { theme: null };
  }

  componentDidMount() {
    import('Remote/theme')
      .then((sharedTheme) => {
        console.log('Imported Theme', sharedTheme.theme)
        this.setState({ theme: sharedTheme.theme });
      })
      .catch((error) => console.error('Error loading shared theme', error));
  }
  render() {
    const { theme } = this.state;
    console.log(theme, "theme")

    if (!theme) {
      return <div>Loading theme...</div>;
    }
    return (
      <MuiThemeProvider theme={theme}>
        <React.Fragment>
          <Suspense fallback={<div style={{ textAlign: 'center' }}>Loading...</div>}>
            <RemoteDDReport />
          </Suspense>
        </React.Fragment>
      </MuiThemeProvider>
    )
  }
}
