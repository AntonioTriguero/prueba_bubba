import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, ScrollView } from 'react-native';
import axios from 'axios';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// Asumiendo que tienes esta definición en algún lugar de tu proyecto
type RootStackParamList = {
  EditBook: {
    bookId: string;
  };
  // ... otros nombres de pantallas y sus parámetros
};
interface Book {
  title: string;
  author: string;
  genre: string;
  year: string;  // Aunque el año es un número, lo manejaremos como un string para el TextInput
  description: string;
  url: string;
}

interface EditBookScreenProps {
    route: RouteProp<RootStackParamList, 'EditBook'>;
    navigation: StackNavigationProp<RootStackParamList, 'EditBook'>;
  }

const EditBookScreen: React.FC<EditBookScreenProps> = ({ route, navigation }) => {
  const { bookId } = route.params;
  const [book, setBook] = useState<Book>({
    title: '',
    author: '',
    genre: '',
    year: '',
    description: '',
    url: '',
  });

  useEffect(() => {
    fetch(`http://192.168.0.13:3000/books/${bookId}`)
    .then(response => response.json())
    .then(data => {
      setBook({ ...data, year: data.year.toString() });
    })
    .catch(error => console.error(error));
  }, [bookId]);

  const handleUpdateBook = () => {
    const updatedBook = { ...book, year: parseInt(book.year, 10) };
  
    fetch(`http://192.168.0.13:3000/books/${bookId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedBook),
    })
    .then(() => {
      Alert.alert("Libro Actualizado", "El libro ha sido actualizado con éxito");
      navigation.goBack();
    })
    .catch(error => {
      console.error(error);
      Alert.alert("Error", "Hubo un problema al actualizar el libro");
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        placeholder="Título"
        value={book.title}
        onChangeText={(text) => setBook({ ...book, title: text })}
        style={styles.input}
      />
      <TextInput
        placeholder="Autor"
        value={book.author}
        onChangeText={(text) => setBook({ ...book, author: text })}
        style={styles.input}
      />
      <TextInput
        placeholder="Género"
        value={book.genre}
        onChangeText={(text) => setBook({ ...book, genre: text })}
        style={styles.input}
      />
      <TextInput
        placeholder="Año"
        value={book.year}
        onChangeText={(text) => setBook({ ...book, year: text })}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Descripción"
        value={book.description}
        onChangeText={(text) => setBook({ ...book, description: text })}
        style={styles.input}
        multiline
      />
      <TextInput
        placeholder="URL de la imagen"
        value={book.url}
        onChangeText={(text) => setBook({ ...book, url: text })}
        style={styles.input}
      />
      <Button title="Actualizar Libro" onPress={handleUpdateBook} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 10,
  },
});

export default EditBookScreen;
