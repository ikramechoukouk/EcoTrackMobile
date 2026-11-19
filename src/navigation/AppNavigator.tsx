import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListeScreen from '../screens/ListeScreen';
import DetailsScreen from '../screens/DetailsScreen';
import CreationScreen from '../screens/CreationScreen';
import { COULEURS } from '../constants/theme';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
return (
<NavigationContainer>
<Stack.Navigator
initialRouteName="Liste"
screenOptions={{
headerStyle: { backgroundColor: COULEURS.principale },
headerTintColor: COULEURS.texteSurPrincipale,
}}
>
<Stack.Screen name="Liste" component={ListeScreen} options={{ title: 'EcoTrack' }} />
<Stack.Screen name="Details" component={DetailsScreen} options={{ title: 'Détails' }} />
<Stack.Screen name="Creation" component={CreationScreen} options={{ title: 'Nouveau signalement' }} />
</Stack.Navigator>
</NavigationContainer>
);
}