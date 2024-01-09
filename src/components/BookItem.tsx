import React from 'react';
import { Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

interface BookItemProps {
  book: {
    id: string;
    title: string;
    author: string;
    url: string; // URL de la imagen del libro
  };
  onPress: () => void;
}

const BookItem: React.FC<BookItemProps> = ({ book, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.container}>
    <Image source={{ uri: book.url }} style={styles.image} />
    <Text style={styles.title}>{book.title}</Text>
    <Text style={styles.author}>{book.author}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  image: {
    width: 50,
    height: 50,
    resizeMode: 'cover',
    marginRight: 10,
  },
  title: {
    fontWeight: 'bold',
  },
  author: {
    fontStyle: 'italic',
    marginLeft: 3
  },
});

export default BookItem;
