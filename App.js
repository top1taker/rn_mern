import {Provider} from 'react-redux'
import {TailwindProvider} from 'tailwind-rn'
import {StatusBar} from 'react-native'
import {NavigationContainer} from '@react-navigation/native'

import store from './redux/store'
import utilities from './tailwind.json'
import RootNavigation from './RootNavigation'

export default function App() {
  return (
    <Provider store={store}>
      <TailwindProvider utilities={utilities}>
        <StatusBar />
        <NavigationContainer>
          <RootNavigation />
        </NavigationContainer>
      </TailwindProvider>
    </Provider>
  )
}
