/**
 * Convierte un color hexadecimal a RGB y determina el color de texto (negro o blanco)
 * que proporciona el mejor contraste.
 *
 * @param {string} hexColor - El color de fondo en formato hexadecimal (por ejemplo, "#2b5c3s").
 * @returns {string} - El color de texto recomendado ("black" o "white").
 */
export const getContrastColor = (hexColor) => {
  // Convertir hexadecimal a RGB
  if (hexColor) {
    const hexToRgb = (hex) => {
      let r = parseInt(hex.slice(1, 3), 16);
      let g = parseInt(hex.slice(3, 5), 16);
      let b = parseInt(hex.slice(5, 7), 16);
      return [r, g, b];
    };

    const [r, g, b] = hexToRgb(hexColor);

    const toLinear = (value) => {
      value /= 255;
      return value <= 0.03928
        ? value / 12.92
        : Math.pow((value + 0.055) / 1.055, 2.4);
    };

    const rLinear = toLinear(r);
    const gLinear = toLinear(g);
    const bLinear = toLinear(b);
    const luma = 0.2126 * rLinear + 0.7152 * gLinear + 0.0722 * bLinear;

    return luma > 0.179 ? "black" : "white";
  }
};
