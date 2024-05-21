import React , {Component} from 'react';
import packageJson from '../package.json';
global.appVersion = packageJson.version;
 
// version from response - first param, local version second param
const semverGreaterThan = (versionA, versionB) => {
 const versionsA = versionA.split(/\./g);
 
 const versionsB = versionB.split(/\./g);
 while (versionsA.length || versionsB.length) {
   const a = Number(versionsA.shift());
 
   const b = Number(versionsB.shift());
   // eslint-disable-next-line no-continue
   if (a === b) continue;
   // eslint-disable-next-line no-restricted-globals
   return a > b || isNaN(b);
 }
 return false;
};
 
class CacheBuster extends Component {
 constructor(props) {
   super(props);
   this.state = {
     loading: true,
     isLatestVersion: false,
      refreshCacheAndReload: () => {
        var timeout1 = 100; // clear cache
        var timeout2 = 6000; // refresh browser
        if (caches) {
        setTimeout(function () {
          // Service worker cache should be cleared with caches.delete()

           console.log('Refresh Cache : Step 1');

           if (caches) {

               console.log(caches.keys().length + ' keys found');

              caches.keys().then(async(names) => {
                  // eslint-disable-next-line no-restricted-syntax
                  for (var _i = 0, names_1 = names; _i < names_1.length; _i++) {
                      var name_1 = await names_1[_i];
                      await caches.delete(name_1);
                      console.log(name_1 + ' keys removed');
                  }
              });
          }
      }, timeout1);
    }

      setTimeout(function () {
                    
        console.log('Refresh Cache : Step 2');
            // clear browser cache and reload page                
            window.location.reload();
        
    }, timeout2);
     }
   };
 }
 
 componentDidMount() {
   fetch(`/meta.json?${new Date().getTime()}`, { cache: 'no-cache' })
     .then((response) => response.json())
     .then((meta) => {
       const latestVersion = meta.version;
       const currentVersion = global.appVersion;
 
       const shouldForceRefresh = semverGreaterThan(latestVersion, currentVersion);
       if (shouldForceRefresh) {
         console.log(`We have a new version - ${latestVersion}. Should force refresh`);
         this.setState({ loading: false, isLatestVersion: false });
       } else {
         console.log(`You already have the latest version - ${latestVersion}. No cache refresh needed.`);
         this.setState({ loading: false, isLatestVersion: true });
       }
     });
 }
 render() {
   const { loading, isLatestVersion, refreshCacheAndReload } = this.state;
  //  if (loading === undefined || isLatestVersion === undefined || refreshCacheAndReload === undefined) {
  //   return null; // Or render a loading state, return an empty div, or take appropriate action
  // }
   return this.props.children({ loading, isLatestVersion, refreshCacheAndReload });
 }
}
 
export default CacheBuster;