import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BookListScreen from './src/screens/BookListScreen';
import BookDetailsScreen from './src/screens/BookDetailsScreen';
import AddBookScreen from './src/screens/AddBookScreen';
import EditBookScreen from './src/screens/EditBookScreen';


type RootStackParamList = {
  BookList: undefined; 
  BookDetails: { bookId: string };
  AddBook: undefined; 
  EditBook: { bookId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="BookList" component={BookListScreen} />
      <Stack.Screen name="BookDetails" component={BookDetailsScreen} />
      <Stack.Screen name="AddBook" component={AddBookScreen} />
      <Stack.Screen name="EditBook" component={EditBookScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;
