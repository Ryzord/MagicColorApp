import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const COLORS = [
  { name: 'white', label: 'Blanco', colorCode: '#FFFFFF' },
  { name: 'blue', label: 'Azul', colorCode: '#0000FF' },
  { name: 'black', label: 'Negro', colorCode: '#000000' },
  { name: 'red', label: 'Rojo', colorCode: '#FF0000' },
  { name: 'green', label: 'Verde', colorCode: '#008000' },
];

// Definición COMBINACIONES igual que antes, omito por brevedad (igual que en tu código original)

const COMBINACIONES: Record<string, { nombre: string; imagen?: any }> = {
  'black': { nombre: 'Negro' },
  'black,blue': { nombre: 'Dimir' },
  'black,green': { nombre: 'Golgari' },
  'black,red': { nombre: 'Rakdos' },
  'black,white': { nombre: 'Orzhov' },
  'blue': { nombre: 'Azul' },
  'blue,green': { nombre: 'Simic' },
  'blue,red': { nombre: 'Izzet' },
  'blue,white': { nombre: 'Azorius' },
  'green': { nombre: 'Verde' },
  'green,red': { nombre: 'Gruul' },
  'green,white': { nombre: 'Selesnya' },
  'red': { nombre: 'Rojo' },
  'red,white': { nombre: 'Boros' },
  'white': { nombre: 'Blanco' },
  'black,blue,red': { nombre: 'Grixis' },
  'black,green,white': { nombre: 'Abzan' },
  'blue,green,red': { nombre: 'Temur' },
  'green,red,white': { nombre: 'Naya' },
  'black,red,white': { nombre: 'Mardu' },
  'black,blue,green': { nombre: 'Sultai' },
  'blue,red,white': { nombre: 'Jeskai' },
  'blue,green,white': { nombre: 'Bant' },
  'black,green,red': { nombre: 'Jund' },
  'black,blue,white': { nombre: 'Esper' },
  'black,blue,green,red': { nombre: 'Glint' },
  'black,blue,green,white': { nombre: 'Witch' },
  'black,green,red,white': { nombre: 'Dune' },
  'blue,green,red,white': { nombre: 'Ink' },
  'black,blue,red,white': { nombre: 'Yore' },
  'black,blue,green,red,white': { nombre: 'Dominio' },
};

export default function App() {
  const [seleccionados, setSeleccionados] = useState<string[]>([]);
  const [busqueda, setBusqueda] = useState('');
  const [resultado, setResultado] = useState<{ nombre: string; imagen?: any } | null>(null);

  const toggleColor = (color: string) => {
    setResultado(null);
    setBusqueda('');
    setSeleccionados(prev =>
      prev.includes(color)
        ? prev.filter(c => c !== color)
        : [...prev, color]
    );
  };

  const obtenerCombinacion = () => {
    const clave = seleccionados.sort().join(',');
    const combinacion = COMBINACIONES[clave];
    if (combinacion) {
      setResultado(combinacion);
    } else {
      setResultado({ nombre: 'Sin coincidencia' });
    }
  };

  const buscarPorNombre = (texto: string) => {
    setBusqueda(texto);
    const entrada = texto.trim().toLowerCase();
    const claveEncontrada = Object.entries(COMBINACIONES).find(
      ([, value]) => value.nombre.toLowerCase() === entrada
    );

    if (claveEncontrada) {
      const [clave, combinacion] = claveEncontrada;
      const colores = clave.split(',');
      setSeleccionados(colores);
      setResultado(combinacion);
    } else if (texto === '') {
      setSeleccionados([]);
      setResultado(null);
    } else {
      setResultado({ nombre: 'Sin coincidencia' });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Colores Magic: The Gathering</Text>
      <Text style={styles.subtitulo}>Selecciona los colores</Text>

      <View style={styles.botonesContainer}>
        {COLORS.map(color => {
          const seleccionado = seleccionados.includes(color.name);
          return (
            <TouchableOpacity
              key={color.name}
              style={[
                styles.botonColor,
                { backgroundColor: color.colorCode },
                seleccionado && styles.botonColorSeleccionado,
              ]}
              onPress={() => toggleColor(color.name)}
              activeOpacity={0.7}
            >
              <Text style={[
                styles.botonTextoColor,
                color.name === 'white' ? { color: '#000' } : { color: '#FFF' }
              ]}>
                {color.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <Text style={styles.subtitulo}>Colores seleccionados:</Text>
      <Text style={{ marginBottom: 10 }}>
        {seleccionados.length > 0 ? seleccionados.join(', ') : 'Ninguno'}
      </Text>

      <Text style={styles.subtitulo}>Buscar por Nombre</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej: Rakdos, Dimir..."
        value={busqueda}
        onChangeText={buscarPorNombre}
      />

      <TouchableOpacity style={styles.boton} onPress={obtenerCombinacion}>
        <Text style={styles.botonTexto}>Obtener por colores</Text>
      </TouchableOpacity>

      <Text style={styles.resultadoTitulo}>Resultado:</Text>
      {resultado && (
        <View style={styles.resultado}>
          <Text style={styles.resultadoNombre}>{resultado.nombre}</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, alignItems: 'center' },
  titulo: { fontSize: 24, fontWeight: 'bold', color: 'green', marginBottom: 20, marginTop: 35 },
  subtitulo: { fontSize: 18, marginTop: 10, marginBottom: 10 },
  botonesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    flexWrap: 'wrap',
  },
  botonColor: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    margin: 5,
    opacity: 0.1,
  },
  botonColorSeleccionado: {
    opacity: 1,
    borderWidth: 3,
    borderColor: 'purple',
  },
  botonTextoColor: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    width: 200,
    padding: 8,
    marginVertical: 10,
    borderRadius: 5,
  },
  boton: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  botonTexto: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  resultadoTitulo: { fontSize: 20, marginTop: 20 },
  resultado: { alignItems: 'center', marginTop: 10 },
  resultadoNombre: { fontSize: 18, fontWeight: 'bold' },
});
