export interface LetterMatchPair {
  id: string;
  historicalGlyph: string; // Unicode Brahmi character or SVG representation
  historicalName: string; // e.g. "தமிழ்-பிராமி 'அ'"
  modernLetter: string; // e.g. "அ"
  period: string; // e.g. "கி.மு. 3ஆம் நூற்றாண்டு"
  pronunciation: string; // e.g. "Short Vowel 'A'"
  description: string;
}

export const LETTER_MATCH_DATA: LetterMatchPair[] = [
  {
    id: 'a',
    historicalGlyph: '𑀅',
    historicalName: 'தமிழி (பிராமி) அ',
    modernLetter: 'அ',
    period: 'கி.மு. 3ஆம் நூற்றாண்டு',
    pronunciation: 'அ (A)',
    description: 'பண்டைய தமிழ்-பிராமி கல்வெட்டுகளில் "அ" என்னும் முதல் உயிரெழுத்தின் தொடக்க கால வடிவம்.'
  },
  {
    id: 'aa',
    historicalGlyph: '𑀆',
    historicalName: 'தமிழி (பிராமி) ஆ',
    modernLetter: 'ஆ',
    period: 'கி.மு. 3ஆம் நூற்றாண்டு',
    pronunciation: 'ஆ (Aa)',
    description: 'அகரத்தின் வலப்பக்கம் நெடிலைக் குறிக்க கோடு சேர்க்கப்பட்டு "ஆ" ஆனது.'
  },
  {
    id: 'i',
    historicalGlyph: '𑀇',
    historicalName: 'தமிழி (பிராமி) இ',
    modernLetter: 'இ',
    period: 'கி.மு. 3ஆம் நூற்றாண்டு',
    pronunciation: 'இ (I)',
    description: 'மூன்று புள்ளிகள்/கோடுகளால் ஆன பண்டைய "இ" கரத்தின் தோற்றம்.'
  },
  {
    id: 'ka',
    historicalGlyph: '𑀓',
    historicalName: 'தமிழி (பிராமி) க',
    modernLetter: 'க',
    period: 'கி.மு. 3ஆம் நூற்றாண்டு',
    pronunciation: 'க (Ka)',
    description: 'சிலுவை போன்ற வடிவத்தில் தொடங்கப்பட்ட பண்டைய "க" மெய்யெழுத்து.'
  },
  {
    id: 'ta',
    historicalGlyph: '𑀢',
    historicalName: 'தமிழி (பிராமி) த',
    modernLetter: 'த',
    period: 'கி.மு. 3ஆம் நூற்றாண்டு',
    pronunciation: 'த (Tha)',
    description: 'பண்டைய தமிழ்-பிராமியில் தலைகீழ் "V" வடிவத்தில் இருந்த "த" எழுத்து.'
  },
  {
    id: 'ma',
    historicalGlyph: '𑀫',
    historicalName: 'தமிழி (பிராமி) ம',
    modernLetter: 'ம',
    period: 'கி.மு. 3ஆம் நூற்றாண்டு',
    pronunciation: 'ம (Ma)',
    description: 'வட்டமும் மேலே கோடும் கொண்ட பண்டைய "ம" எழுத்தின் வடிவம்.'
  },
  {
    id: 'ra',
    historicalGlyph: '𑀭',
    historicalName: 'தமிழி (பிராமி) ர',
    modernLetter: 'ர',
    period: 'கி.மு. 3ஆம் நூற்றாண்டு',
    pronunciation: 'ர (Ra)',
    description: 'நேர்கோடு போன்ற எளிமையான வடிவத்தில் அமைந்த "ர" எழுத்து.'
  },
  {
    id: 'na',
    historicalGlyph: '𑀦',
    historicalName: 'தமிழி (பிராமி) ந',
    modernLetter: 'ந',
    period: 'கி.மு. 3ஆம் நூற்றாண்டு',
    pronunciation: 'ந (Na)',
    description: 'கிடைமட்டமும் செங்குத்துக்கோடும் இணைந்த பண்டைய "ந" மெய்யெழுத்து.'
  }
];
