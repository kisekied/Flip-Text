var rotateMap = {
  "a": "ɐ", "b": "q", "c": "ɔ", "d": "p", "e": "ǝ", "f": "ɟ", "g": "ƃ",
  "h": "ɥ", "i": "ᴉ", "j": "ꓩ", "k": "ʞ", "l": "ן", "m": "ɯ", "n": "u",
  "o": "o", "p": "d", "q": "b", "r": "ɹ", "s": "s", "t": "ʇ",
  "u": "n", "v": "ʌ", "w": "ʍ", "x": "x", "y": "ʎ", "z": "z",
  "A": "Ɐ", "B": "ꓭ", "C": "Ͻ", "D": "ᗡ", "E": "Ǝ", "F": "Ⅎ", "G": "⅁",
  "H": "H", "I": "I", "J": "ᒋ", "K": "ꓘ", "L": "⅂", "M": "​ꟽ", "N": "N",
  "O": "O", "P": "Ԁ", "Q": "Ꝺ", "R": "ꓤ", "S": "S", "T": "ꓕ",
  "U": "Ո", "V": "Ʌ", "W": "𐊰", "X": "X", "Y": "⅄", "Z": "Z",
}

var mirrorMap = {
  "a": "ɕ", "b": "d", "c": "ɔ", "d": "b", "e": "ɘ", "f": "ꠧ", "g": "ϱ",
  "h": "ᖽ", "i": "i", "j": "ṫ", "k": "ʞ", "l": "l", "m": "m", "n": "n",
  "o": "o", "p": "q", "q": "p", "r": "℩", "s": "ꙅ", "t": "ታ",
  "u": "u", "v": "v", "w": "w", "x": "​x", "y": "ჸ", "z": "s",
  "A": "A", "B": "ꓭ", "C": "Ͻ", "D": "ᗡ", "E": "Ǝ", "F": "ꟻ", "G": "ᘐ",
  "H": "H", "I": "I", "J": "ᒐ", "K": "ꓘ", "L": "⅃​", "M": "M", "N": "И",
  "O": "O", "P": "ꟼ", "Q": "Ϙ", "R": "Я", "S": "Ꙅ", "T": "T",
  "U": "U", "V": "V", "W": "W", "X": "X", "Y": "Y", "Z": "S",
}

var reflectMap = {
  "a": "ɘ", "b": "p", "c": "c", "d": "q", "e": "ᧈ", "f": "ʈ", "g": "მ",
  "h": "μ", "i": "ᴉ", "j": "᥄", "k": "κ", "l": "ן", "m": "ɯ", "n": "u",
  "o": "o", "p": "b", "q": "d", "r": "ι", "s": "ƨ", "t": "f",
  "u": "n", "v": "ʌ", "w": "ʍ", "x": "​x", "y": "λ", "z": "s",
  "A": "Ɐ", "B": "B", "C": "C", "D": "D", "E": "E", "F": "ᖶ", "G": "Ҽ",
  "H": "H", "I": "I", "J": "Ⴄ", "K": "ꓘ", "L": "Γ​", "M": "ꟽ", "N": "И",
  "O": "O", "P": "Ь", "Q": "О́", "R": "ʁ", "S": "Ƨ", "T": "ꓕ",
  "U": "Ո", "V": "Ʌ", "W": "ꤵ", "X": "X", "Y": "⅄", "Z": "S",
}

const lineReducer = (flipMap, reverse) => {
  const reducer = (a, c) => {
    var char = flipMap[c] || " "
    return reverse ? (char + a) : (a + char);
  }
  return reducer;
}

const paragraphReducer = (flipMap, reverse) => {
  const reducer = (a, c) => {
    return a + c.split("").reduce(lineReducer(flipMap, reverse), "") + "<br>";
  }
  return reducer;
}

const rotateText = (srcText) => { return srcText.split("\n").reverse().reduce(paragraphReducer(rotateMap, true), "") }

const mirrorText = (srcText) => { return srcText.split("\n").reduce(paragraphReducer(mirrorMap, true), "") }

const reflectText = (srcText) => { return srcText.split("\n").reverse().reduce(paragraphReducer(reflectMap, false), "") }

function onConvertButtonAction() {
  var src_text = document.getElementById("src_text_area").value;
  var flipType = 0
  document.getElementsByName("flip_type").forEach(element => {
    if (element.checked) {
      flipType = parseInt(element.value);
      return;
    }
  });
  var mapFn = [rotateText, mirrorText, reflectText][flipType]
  document.getElementById("flip_result").innerHTML = mapFn(src_text);
}