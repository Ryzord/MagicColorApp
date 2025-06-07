import React, { useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const COLORS = [
  { name: 'white', label: 'Blanco', file: require('../../assets/images/combinations/MonoWhite.png') },
  { name: 'blue', label: 'Azul', file: require('../../assets/images/combinations/MonoBlue.png') },
  { name: 'black', label: 'Negro', file: require('../../assets/images/combinations/MonoBlack.png') },
  { name: 'red', label: 'Rojo', file: require('../../assets/images/combinations/MonoRed.png') },
  { name: 'green', label: 'Verde', file: require('../../assets/images/combinations/MonoGreen.png') },
];

const COMBINACIONES: Record<string, { nombre: string; imagen: any }> = {
  'black': { nombre: 'Negro', imagen: require('../../assets/images/combinations/MonoBlack.png') },
  'black,blue': { nombre: 'Dimir', imagen: require('../../assets/images/combinations/Dimir.png') },
  'black,green': { nombre: 'Golgari', imagen: require('../../assets/images/combinations/Golgari.png') },
  'black,red': { nombre: 'Rakdos', imagen: require('../../assets/images/combinations/Rakdos.png') },
  'black,white': { nombre: 'Orzhov', imagen: require('../../assets/images/combinations/Orzhov.png') },
  'blue': { nombre: 'Azul', imagen: require('../../assets/images/combinations/MonoBlue.png') },
  'blue,green': { nombre: 'Simic', imagen: require('../../assets/images/combinations/Simic.png') },
  'blue,red': { nombre: 'Izzet', imagen: require('../../assets/images/combinations/Izzet.png') },
  'blue,white': { nombre: 'Azorius', imagen: require('../../assets/images/combinations/Azorius.png') },
  'green': { nombre: 'Verde', imagen: require('../../assets/images/combinations/MonoGreen.png') },
  'green,red': { nombre: 'Gruul', imagen: require('../../assets/images/combinations/Gruul.png') },
  'green,white': { nombre: 'Selesnya', imagen: require('../../assets/images/combinations/Selesnya.png') },
  'red': { nombre: 'Rojo', imagen: require('../../assets/images/combinations/MonoRed.png') },
  'red,white': { nombre: 'Boros', imagen: require('../../assets/images/combinations/Boros.png') },
  'white': { nombre: 'Blanco', imagen: require('../../assets/images/combinations/MonoWhite.png') },

  // Tri-colores (ordenadas alfabéticamente también)
  'black,blue,red': { nombre: 'Grixis', imagen: require('../../assets/images/combinations/Grixis.png') },
  'black,green,white': { nombre: 'Abzan', imagen: require('../../assets/images/combinations/Abzan.png') },
  'blue,green,red': { nombre: 'Temur', imagen: require('../../assets/images/combinations/Temur.png') },
  'green,red,white': { nombre: 'Naya', imagen: require('../../assets/images/combinations/Naya.png') },
  'black,red,white': { nombre: 'Mardu', imagen: require('../../assets/images/combinations/Mardu.png') },
  'black,blue,green': { nombre: 'Sultai', imagen: require('../../assets/images/combinations/Sultai.png') },
  'blue,red,white': { nombre: 'Jeskai', imagen: require('../../assets/images/combinations/Jeskai.png') },
  'blue,green,white': { nombre: 'Bant', imagen: require('../../assets/images/combinations/Bant.png') },
  'black,green,red': { nombre: 'Jund', imagen: require('../../assets/images/combinations/Jund.png') },
  'black,blue,white': { nombre: 'Esper', imagen: require('../../assets/images/combinations/Esper.png') },

  // Cuatro y cinco colores: igual, orden alfabético
  'black,blue,green,red': { nombre: 'Glint', imagen: null/*require('../../assets/images/combinations/Glint.png')*/ },
  'black,blue,green,white': { nombre: 'Witch', imagen: null/*require('../../assets/images/combinations/Witch.png')*/ },
  'black,green,red,white': { nombre: 'Dune', imagen: null/*require('../../assets/images/combinations/Dune.png')*/ },
  'blue,green,red,white': { nombre: 'Ink', imagen: null/*require('../../assets/images/combinations/Ink.png')*/ },
  'black,blue,red,white': { nombre: 'Yore', imagen: null/*require('../../assets/images/combinations/Yore.png')*/ },

  'black,blue,green,red,white': { nombre: 'Dominio', imagen: null/*require('../../assets/images/combinations/FiveColor.png')*/ },
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

      <View style={styles.iconos}>
        {COLORS.map(color => (
          <TouchableOpacity key={color.name} onPress={() => toggleColor(color.name)}>
            <Image
              source={color.file}
              style={[
                styles.icono,
                seleccionados.includes(color.name) && styles.iconoSeleccionado,
              ]}
            />
          </TouchableOpacity>
        ))}
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
          {resultado.imagen && (
            <Image source={resultado.imagen} style={styles.resultadoImagen} />
          )}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, alignItems: 'center' },
  titulo: { fontSize: 24, fontWeight: 'bold', color: 'green', marginBottom: 20 },
  subtitulo: { fontSize: 18, marginTop: 10, marginBottom: 10 },
  iconos: { flexDirection: 'row', gap: 10, flexWrap: 'wrap', justifyContent: 'center' },
  icono: { width: 50, height: 50, opacity: 0.5, margin: 5 },
  iconoSeleccionado: { opacity: 1, borderWidth: 2, borderColor: 'green', borderRadius: 10 },
  input: { borderWidth: 1, width: 200, padding: 8, marginVertical: 10, borderRadius: 5 },
  boton: { backgroundColor: '#ccc', padding: 10, borderRadius: 5 },
  botonTexto: { fontWeight: 'bold' },
  resultadoTitulo: { fontSize: 20, marginTop: 20 },
  resultado: { alignItems: 'center', marginTop: 10 },
  resultadoNombre: { fontSize: 18, fontWeight: 'bold' },
  resultadoImagen: { width: 100, height: 100, marginTop: 10 },
});
