import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image, Button, Alert } from 'react-native';
import axios from 'axios';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

// Definiciones de tipos para la navegación (ajustar según tu configuración de navegación)
type BookDetailsParamList = {
  BookDetails: { bookId: string };
  EditBook: { bookId: string }; // Asegúrate de que 'EditBook' coincida con el nombre de tu pantalla de edición
  // ... otros nombres de pantallas en tu stack de navegación, si es necesario
};

interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  description: string;
  year: number;
  fav: boolean;
  url: string;
}

interface BookDetailsScreenProps {
  route: RouteProp<BookDetailsParamList, 'BookDetails'>;
  navigation: StackNavigationProp<BookDetailsParamList, 'BookDetails'>;
}

const BookDetailsScreen: React.FC<BookDetailsScreenProps> = ({ route, navigation }) => {
  const { bookId } = route.params;
  const [book, setBook] = useState<Book | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://192.168.0.13:3000/books/${bookId}`)
      .then(response => {
        setBook(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error(error);
        setIsLoading(false);
      });
  }, [bookId]);

  if (isLoading) {
    return <ActivityIndicator size="large" />;
  }

  if (!book) {
    return <Text>No se encontró el libro.</Text>;
  }

  const handleDeleteBook = () => {
    fetch(`http://192.168.0.13:3000/books/${bookId}`, { method: 'DELETE' })
      .then(() => {
        Alert.alert("Libro Eliminado", "El libro ha sido eliminado con éxito");
        navigation.goBack();
      })
      .catch(error => {
        console.error(error);
        Alert.alert("Error", "Hubo un problema al eliminar el libro");
      });
  };
  

  const handleEditBook = () => {
    navigation.navigate('EditBook', { bookId });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{book.title}</Text>
      <Image source={{ uri: book.url }} style={styles.image} />
      <Text style={styles.details}>Autor: {book.author}</Text>
      <Text style={styles.details}>Género: {book.genre}</Text>
      <Text style={styles.details}>Año: {book.year}</Text>
      <Text style={styles.details}>Descripción: {book.description}</Text>
      <Button title="Editar" onPress={handleEditBook} />
      <Button title="Eliminar" onPress={handleDeleteBook} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  details: {
    fontSize: 16,
    marginVertical: 5,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    marginBottom: 20,
  },
});

export default BookDetailsScreen;
