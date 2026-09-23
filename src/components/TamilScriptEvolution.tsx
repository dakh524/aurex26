"use client";

import React, { useState, useMemo } from 'react';
import { Landmark, Volume2, History, Sparkles, Search, Award, ShieldCheck, MapPin, CheckCircle2, ChevronRight, Layers, BookOpen } from 'lucide-react';
import { speakTamilText } from '@/lib/audioTTS';
import { useLanguage } from '@/lib/LanguageContext';

export interface ScriptStage {
  period: string;
  name: string;
  glyph: string;
  brahmiLetterKey?: string;
  description: string;
  source: string;
  location: string;
}

export interface LetterEvolution {
  id: string;
  letter: string;
  transliteration: string;
  type: 'uyir' | 'mei' | 'special';
  typeName: string;
  stages: ScriptStage[];
}

// 30 Complete Tamil-Brahmi & Vatteluttu Historical Letter Evolution Dataset
export const FULL_EVOLUTION_DATA: LetterEvolution[] = [
  // 1. உயிரெழுத்துக்கள் (Vowels)
  {
    id: 'u1',
    letter: 'அ',
    transliteration: 'A',
    type: 'uyir',
    typeName: 'உயிரெழுத்து',
    stages: [
      {
        period: 'கி.மு 3-ஆம் நூற்றாண்டு',
        name: 'தமிழ்ப் பிராமி (Tamil-Brahmi / தமிழி)',
        glyph: '𑀅',
        brahmiLetterKey: 'A',
        description: 'சமண முனிவர்களின் குகைக் கல்வெட்டுகளில் காணப்படும் முதன்மை அகர வடிவம்.',
        source: 'மாங்குளம் கல்வெட்டு (மதுரை)',
        location: 'மாங்குளம், தமிழ்நாடு',
      },
      {
        period: 'கி.பி 7-ஆம் நூற்றாண்டு',
        name: 'வட்டெழுத்து (Vatteluttu)',
        glyph: 'ꯀ',
        description: 'நடுகற்களிலும் பனையோலைகளிலும் வளைந்த கோடுகளுடன் எழுதப்பட்ட வடிவம்.',
        source: 'பல்லவர் / பாண்டியர் செப்பேடுகள்',
        location: 'மதுரை / தஞ்சாவூர்',
      },
      {
        period: 'தற்காலம்',
        name: 'நவீன தமிழ் (Modern Tamil)',
        glyph: 'அ',
        description: 'அச்சுக்கலையின் வருகைக்குப்பின் சீரமைக்கப்பட்ட இன்றைய வடிவம்.',
        source: 'இன்றைய பயன்பாடு',
        location: 'தமிழ்நாடு',
      },
    ],
  },
  {
    id: 'u2',
    letter: 'ஆ',
    transliteration: 'Aa',
    type: 'uyir',
    typeName: 'உயிரெழுத்து',
    stages: [
      {
        period: 'கி.மு 3-ஆம் நூற்றாண்டு',
        name: 'தமிழ்ப் பிராமி (Tamil-Brahmi / தமிழி)',
        glyph: '𑀆',
        brahmiLetterKey: 'A',
        description: 'அகரத்தின் வலப்புறம் நெடில் கோடு சேர்க்கப்பட்டு "ஆ" ஆனது.',
        source: 'அழகர்மலை கல்வெட்டு',
        location: 'மதுரை',
      },
      {
        period: 'கி.பி 7-ஆம் நூற்றாண்டு',
        name: 'வட்டெழுத்து (Vatteluttu)',
        glyph: 'ꯀ',
        description: 'வட்ட வடிவில் வளைந்த கோடுகளுடன் மாறிய நிலை.',
        source: 'சேர நாட்டு செப்பேடுகள்',
        location: 'கேரளம் / தமிழக எல்லை',
      },
      {
        period: 'தற்காலம்',
        name: 'நவீன தமிழ் (Modern Tamil)',
        glyph: 'ஆ',
        description: 'நவீன தமிழ் அச்சுச் சீரமைப்பு வடிவம்.',
        source: 'இன்றைய பயன்பாடு',
        location: 'தமிழ்நாடு',
      },
    ],
  },
  {
    id: 'u3',
    letter: 'இ',
    transliteration: 'I',
    type: 'uyir',
    typeName: 'உயிரெழுத்து',
    stages: [
      {
        period: 'கி.மு 2-ஆம் நூற்றாண்டு',
        name: 'தமிழ்ப் பிராமி (Tamil-Brahmi / தமிழி)',
        glyph: '𑀇',
        description: 'மூன்று புள்ளிகளால் குறிக்கப்பட்ட தொடக்கக்கால இகர வடிவம்.',
        source: 'புகழூர் கல்வெட்டு',
        location: 'கரூர்',
      },
      {
        period: 'கி.பி 7-ஆம் நூற்றாண்டு',
        name: 'வட்டெழுத்து (Vatteluttu)',
        glyph: 'ꯏ',
        description: 'வளைகோடுகள் இணைந்த வட்டெழுத்து வடிவம்.',
        source: 'பாண்டியர் கல்வெட்டுகள்',
        location: 'திருநெல்வேலி',
      },
      {
        period: 'தற்காலம்',
        name: 'நவீன தமிழ் (Modern Tamil)',
        glyph: 'இ',
        description: 'இன்றைய சுழி வடிவ இகரம்.',
        source: 'இன்றைய பயன்பாடு',
        location: 'தமிழ்நாடு',
      },
    ],
  },
  {
    id: 'u4',
    letter: 'ஈ',
    transliteration: 'Ee',
    type: 'uyir',
    typeName: 'உயிரெழுத்து',
    stages: [
      {
        period: 'கி.மு 2-ஆம் நூற்றாண்டு',
        name: 'தமிழ்ப் பிராமி (Tamil-Brahmi / தமிழி)',
        glyph: '𑀈',
        description: 'நான்கு புள்ளிகள் கொண்ட பண்டைய ஈகர வடிவம்.',
        source: 'சித்தன்னவாசல் குகைக் கல்வெட்டு',
        location: 'புதுக்கோட்டை',
      },
      {
        period: 'கி.பி 8-ஆம் நூற்றாண்டு',
        name: 'வட்டெழுத்து (Vatteluttu)',
        glyph: 'ꯏ',
        description: 'பனையோலையில் வளைத்து எழுதப்பட்ட வடிவம்.',
        source: 'வேள்விக்குடி செப்பேடு',
        location: 'மதுரை',
      },
      {
        period: 'தற்காலம்',
        name: 'நவீன தமிழ் (Modern Tamil)',
        glyph: 'ஈ',
        description: 'இன்றைய நெடில் ஈகர அச்சு வடிவம்.',
        source: 'இன்றைய பயன்பாடு',
        location: 'தமிழ்நாடு',
      },
    ],
  },
  {
    id: 'u5',
    letter: 'உ',
    transliteration: 'U',
    type: 'uyir',
    typeName: 'உயிரெழுத்து',
    stages: [
      {
        period: 'கி.மு 3-ஆம் நூற்றாண்டு',
        name: 'தமிழ்ப் பிராமி (Tamil-Brahmi / தமிழி)',
        glyph: '𑀉',
        description: 'செங்கோண வடிவில் அமைந்த உகரக் கோடு.',
        source: 'கொடுமணல் பானையோட்டுக் கல்வெட்டு',
        location: 'ஈரோடு',
      },
      {
        period: 'கி.பி 7-ஆம் நூற்றாண்டு',
        name: 'வட்டெழுத்து (Vatteluttu)',
        glyph: 'ꯎ',
        description: 'வட்டெழுத்து செப்பேடு சாசனம்.',
        source: 'சோழர் தொடக்கக்கால செப்பேடு',
        location: 'தஞ்சாவூர்',
      },
      {
        period: 'தற்காலம்',
        name: 'நவீன தமிழ் (Modern Tamil)',
        glyph: 'உ',
        description: 'இன்றைய பயன்பாட்டு வடிவம்.',
        source: 'இன்றைய பயன்பாடு',
        location: 'தமிழ்நாடு',
      },
    ],
  },
  {
    id: 'u6',
    letter: 'ஊ',
    transliteration: 'Oo',
    type: 'uyir',
    typeName: 'உயிரெழுத்து',
    stages: [
      {
        period: 'கி.மு 2-ஆம் நூற்றாண்டு',
        name: 'தமிழ்ப் பிராமி (Tamil-Brahmi / தமிழி)',
        glyph: '𑀊',
        description: 'உகரத்தின் அடிப்பகுதியில் நெடிலைக் குறிக்கும் சுழி.',
        source: 'அரிட்டபட்டி கல்வெட்டு',
        location: 'மதுரை',
      },
      {
        period: 'கி.பி 8-ஆம் நூற்றாண்டு',
        name: 'வட்டெழுத்து (Vatteluttu)',
        glyph: 'ꯎ',
        description: 'பாண்டியர் கால வட்டெழுத்து சாசனம்.',
        source: 'பாண்டியர் கல்வெட்டு',
        location: 'இராமநாதபுரம்',
      },
      {
        period: 'தற்காலம்',
        name: 'நவீன தமிழ் (Modern Tamil)',
        glyph: 'ஊ',
        description: 'இன்றைய நவீன பயன்பாட்டு வடிவம்.',
        source: 'இன்றைய பயன்பாடு',
        location: 'தமிழ்நாடு',
      },
    ],
  },
  {
    id: 'u7',
    letter: 'எ',
    transliteration: 'E',
    type: 'uyir',
    typeName: 'உயிரெழுத்து',
    stages: [
      {
        period: 'கி.மு 3-ஆம் நூற்றாண்டு',
        name: 'தமிழ்ப் பிராமி (Tamil-Brahmi / தமிழி)',
        glyph: '𑀏',
        description: 'முக்கோண வடிவில் தோற்றமளிக்கும் எகர வடிவம்.',
        source: 'கீழவளவு கல்வெட்டு',
        location: 'மதுரை',
      },
      {
        period: 'கி.பி 7-ஆம் நூற்றாண்டு',
        name: 'வட்டெழுத்து (Vatteluttu)',
        glyph: 'ꯗ',
        description: 'வட்டெழுத்து கல்வெட்டு வடிவம்.',
        source: 'பல்லவர் கல்வெட்டு',
        location: 'காஞ்சிபுரம்',
      },
      {
        period: 'தற்காலம்',
        name: 'நவீன தமிழ் (Modern Tamil)',
        glyph: 'எ',
        description: 'இன்றைய குறள் எகர அச்சு வடிவம்.',
        source: 'இன்றைய பயன்பாடு',
        location: 'தமிழ்நாடு',
      },
    ],
  },
  {
    id: 'u8',
    letter: 'ஏ',
    transliteration: 'Ae',
    type: 'uyir',
    typeName: 'உயிரெழுத்து',
    stages: [
      {
        period: 'கி.மு 2-ஆம் நூற்றாண்டு',
        name: 'தமிழ்ப் பிராமி (Tamil-Brahmi / தமிழி)',
        glyph: '𑀐',
        description: 'எகர முக்கோணத்தின் அடிப்பகுதியில் நெடிலைக் குறிக்கும் கோடு.',
        source: 'நெட்டூர்ப் பறை கல்வெட்டு',
        location: 'சிவகங்கை',
      },
      {
        period: 'கி.பி 8-ஆம் நூற்றாண்டு',
        name: 'வட்டெழுத்து (Vatteluttu)',
        glyph: 'ꯗ',
        description: 'பாண்டியர் காலச் சாசனம்.',
        source: 'பாண்டியர் செப்பேடு',
        location: 'நெல்லை',
      },
      {
        period: 'தற்காலம்',
        name: 'நவீன தமிழ் (Modern Tamil)',
        glyph: 'ஏ',
        description: 'இன்றைய ஏகார நெடில் வடிவம்.',
        source: 'இன்றைய பயன்பாடு',
        location: 'தமிழ்நாடு',
      },
    ],
  },
  {
    id: 'u9',
    letter: 'ஐ',
    transliteration: 'Ai',
    type: 'uyir',
    typeName: 'உயிரெழுத்து',
    stages: [
      {
        period: 'கி.மு 2-ஆம் நூற்றாண்டு',
        name: 'தமிழ்ப் பிராமி (Tamil-Brahmi / தமிழி)',
        glyph: '𑀑',
        description: 'இரண்டு எகரக் கோடுகள் இணைந்த வடிவம்.',
        source: 'திருவாடை கல்வெட்டு',
        location: 'இராமநாதபுரம்',
      },
      {
        period: 'கி.பி 8-ஆம் நூற்றாண்டு',
        name: 'வட்டெழுத்து (Vatteluttu)',
        glyph: 'ꯗ',
        description: 'வட்டெழுத்து ஓலைச்சுவடி வடிவம்.',
        source: 'சோழர் கல்வெட்டு',
        location: 'திருச்சி',
      },
      {
        period: 'தற்காலம்',
        name: 'நவீன தமிழ் (Modern Tamil)',
        glyph: 'ஐ',
        description: 'இன்றைய ஐகார வடிவம்.',
        source: 'இன்றைய பயன்பாடு',
        location: 'தமிழ்நாடு',
      },
    ],
  },
  {
    id: 'u10',
    letter: 'ஒ',
    transliteration: 'O',
    type: 'uyir',
    typeName: 'உயிரெழுத்து',
    stages: [
      {
        period: 'கி.மு 3-ஆம் நூற்றாண்டு',
        name: 'தமிழ்ப் பிராமி (Tamil-Brahmi / தமிழி)',
        glyph: '𑀒',
        description: 'செங்குத்து மற்றும் வளைவு கோடுகளின் இணைப்பு.',
        source: 'மாங்குளம் கல்வெட்டு',
        location: 'மதுரை',
      },
      {
        period: 'கி.பி 7-ஆம் நூற்றாண்டு',
        name: 'வட்டெழுத்து (Vatteluttu)',
        glyph: 'ꯃ',
        description: 'நடுகற்களில் காணப்பட்ட வடிவம்.',
        source: 'தர்மபுரி நடுகல்',
        location: 'தர்மபுரி',
      },
      {
        period: 'தற்காலம்',
        name: 'நவீன தமிழ் (Modern Tamil)',
        glyph: 'ஒ',
        description: 'இன்றைய குறள் ஒகர வடிவம்.',
        source: 'இன்றைய பயன்பாடு',
        location: 'தமிழ்நாடு',
      },
    ],
  },
  {
    id: 'u11',
    letter: 'ஓ',
    transliteration: 'Oo',
    type: 'uyir',
    typeName: 'உயிரெழுத்து',
    stages: [
      {
        period: 'கி.மு 2-ஆம் நூற்றாண்டு',
        name: 'தமிழ்ப் பிராமி (Tamil-Brahmi / தமிழி)',
        glyph: '𑀓',
        description: 'ஒகரத்தின் மேல் கோடு சேர்க்கப்பட்ட நெடில் வடிவம்.',
        source: 'கொற்கை பானையோட்டுக் கல்வெட்டு',
        location: 'தூத்துக்குடி',
      },
      {
        period: 'கி.பி 8-ஆம் நூற்றாண்டு',
        name: 'வட்டெழுத்து (Vatteluttu)',
        glyph: 'ꯃ',
        description: 'பாண்டியர் செப்பேட்டு வடிவம்.',
        source: 'பாண்டியர் கல்வெட்டு',
        location: 'மதுரை',
      },
      {
        period: 'தற்காலம்',
        name: 'நவீன தமிழ் (Modern Tamil)',
        glyph: 'ஓ',
        description: 'இன்றைய ஓகார நெடில் வடிவம்.',
        source: 'இன்றைய பயன்பாடு',
        location: 'தமிழ்நாடு',
      },
    ],
  },
  {
    id: 'u12',
    letter: 'ஔ',
    transliteration: 'Au',
    type: 'uyir',
    typeName: 'உயிரெழுத்து',
    stages: [
      {
        period: 'கி.மு 2-ஆம் நூற்றாண்டு',
        name: 'தமிழ்ப் பிராமி (Tamil-Brahmi / தமிழி)',
        glyph: '𑀔',
        description: 'ஒகரத்துடன் ஔகாரக் குறியீடு இணைந்த வடிவம்.',
        source: 'முசிறி கல்வெட்டு',
        location: 'கரூர் / சேர நாடு',
      },
      {
        period: 'கி.பி 8-ஆம் நூற்றாண்டு',
        name: 'வட்டெழுத்து (Vatteluttu)',
        glyph: 'ꯃ',
        description: 'செப்பேடு சாசன வடிவம்.',
        source: 'சேர செப்பேடு',
        location: 'கொடுங்கல்லூர்',
      },
      {
        period: 'தற்காலம்',
        name: 'நவீன தமிழ் (Modern Tamil)',
        glyph: 'ஔ',
        description: 'இன்றைய ஔகார வடிவம்.',
        source: 'இன்றைய பயன்பாடு',
        location: 'தமிழ்நாடு',
      },
    ],
  },

  // 2. மெய்யெழுத்துக்கள் (Consonants) & சிறப்பு எழுத்துக்கள்
  {
    id: 'm1',
    letter: 'க',
    transliteration: 'Ka',
    type: 'mei',
    typeName: 'மெய்யெழுத்து',
    stages: [
      {
        period: 'கி.மு 3-ஆம் நூற்றாண்டு',
        name: 'தமிழ்ப் பிராமி (Tamil-Brahmi / தமிழி)',
        glyph: '𑀓',
        brahmiLetterKey: 'KA',
        description: 'சிலுவை (+ ) போன்ற எளிமையான வடிவியல் தோற்றம்.',
        source: 'புகழூர் கல்வெட்டு',
        location: 'கரூர்',
      },
      {
        period: 'கி.பி 7-ஆம் நூற்றாண்டு',
        name: 'வட்டெழுத்து (Vatteluttu)',
        glyph: 'ꯀ',
        description: 'வட்ட வடிவில் வளைந்த கோடுகளுடன் மாறிய நிலை.',
        source: 'சேர நாட்டு கல்வெட்டுகள்',
        location: 'கேரளம் / கோயம்புத்தூர்',
      },
      {
        period: 'தற்காலம்',
        name: 'நவீன தமிழ் (Modern Tamil)',
        glyph: 'க',
        description: 'நவீன தமிழ் எழுத்து சீரமைப்புக்குப் பிந்தைய வடிவம்.',
        source: 'இன்றைய பயன்பாடு',
        location: 'தமிழ்நாடு',
      },
    ],
  },
  {
    id: 'm2',
    letter: 'ங',
    transliteration: 'Nga',
    type: 'mei',
    typeName: 'மெய்யெழுத்து',
    stages: [
      {
        period: 'கி.மு 3-ஆம் நூற்றாண்டு',
        name: 'தமிழ்ப் பிராமி (Tamil-Brahmi / தமிழி)',
        glyph: '𑀔',
        description: 'வளைந்த கோட்டு வடிவத்தில் அமைந்த ஙகர வடிவம்.',
        source: 'கொடுமணல் கல்வெட்டு',
        location: 'ஈரோடு',
      },
      {
        period: 'கி.பி 7-ஆம் நூற்றாண்டு',
        name: 'வட்டெழுத்து (Vatteluttu)',
        glyph: 'ꯉ',
        description: 'பல்லவர் கால வட்டெழுத்து சாசனம்.',
        source: 'பல்லவர் கல்வெட்டு',
        location: 'காஞ்சிபுரம்',
      },
      {
        period: 'தற்காலம்',
        name: 'நவீன தமிழ் (Modern Tamil)',
        glyph: 'ங',
        description: 'இன்றைய ஙகர வடிவம்.',
        source: 'இன்றைய பயன்பாடு',
        location: 'தமிழ்நாடு',
      },
    ],
  },
  {
    id: 'm3',
    letter: 'ச',
    transliteration: 'Cha',
    type: 'mei',
    typeName: 'மெய்யெழுத்து',
    stages: [
      {
        period: 'கி.மு 3-ஆம் நூற்றாண்டு',
        name: 'தமிழ்ப் பிராமி (Tamil-Brahmi / தமிழி)',
        glyph: '𑀕',
        description: 'வட்டமும் நேர்கோடும் இணைந்த பண்டைய சகர வடிவம்.',
        source: 'அழகர்மலை கல்வெட்டு',
        location: 'மதுரை',
      },
      {
        period: 'கி.பி 7-ஆம் நூற்றாண்டு',
        name: 'வட்டெழுத்து (Vatteluttu)',
        glyph: 'ꯆ',
        description: 'வட்டெழுத்து நடுகல் கல்வெட்டு.',
        source: 'தர்மபுரி நடுகல்',
        location: 'தர்மபுரி',
      },
      {
        period: 'தற்காலம்',
        name: 'நவீன தமிழ் (Modern Tamil)',
        glyph: 'ச',
        description: 'இன்றைய நவீன பயன்பாட்டு வடிவம்.',
        source: 'இன்றைய பயன்பாடு',
        location: 'தமிழ்நாடு',
      },
    ],
  },
  {
    id: 'm4',
    letter: 'ஞ',
    transliteration: 'Nja',
    type: 'mei',
    typeName: 'மெய்யெழுத்து',
    stages: [
      {
        period: 'கி.மு 3-ஆம் நூற்றாண்டு',
        name: 'தமிழ்ப் பிராமி (Tamil-Brahmi / தமிழி)',
        glyph: '𑀖',
        description: 'கொக்கி வடிவக் கோடுகள் இணைந்த ஞகர வடிவம்.',
        source: 'மாங்குளம் கல்வெட்டு',
        location: 'மதுரை',
      },
      {
        period: 'கி.பி 8-ஆம் நூற்றாண்டு',
        name: 'வட்டெழுத்து (Vatteluttu)',
        glyph: 'ꯅ',
        description: 'பாண்டியர் செப்பேட்டு சாசனம்.',
        source: 'பாண்டியர் கல்வெட்டு',
        location: 'திருநெல்வேலி',
      },
      {
        period: 'தற்காலம்',
        name: 'நவீன தமிழ் (Modern Tamil)',
        glyph: 'ஞ',
        description: 'இன்றைய ஞகர வடிவம்.',
        source: 'இன்றைய பயன்பாடு',
        location: 'தமிழ்நாடு',
      },
    ],
  },
  {
    id: 'm5',
    letter: 'ட',
    transliteration: 'Ta',
    type: 'mei',
    typeName: 'மெய்யெழுத்து',
    stages: [
      {
        period: 'கி.மு 3-ஆம் நூற்றாண்டு',
        name: 'தமிழ்ப் பிராமி (Tamil-Brahmi / தமிழி)',
        glyph: '𑀗',
        description: 'அரைவட்ட வடிவில் வளைந்த பண்டைய டகர வடிவம்.',
        source: 'சித்தன்னவாசல் கல்வெட்டு',
        location: 'புதுக்கோட்டை',
      },
      {
        period: 'கி.பி 7-ஆம் நூற்றாண்டு',
        name: 'வட்டெழுத்து (Vatteluttu)',
        glyph: 'ꯇ',
        description: 'சேரர் செப்பேட்டு வடிவம்.',
        source: 'சேரர் செப்பேடு',
        location: 'கோயம்புத்தூர்',
      },
      {
        period: 'தற்காலம்',
        name: 'நவீன தமிழ் (Modern Tamil)',
        glyph: 'ட',
        description: 'இன்றைய டகர வடிவம்.',
        source: 'இன்றைய பயன்பாடு',
        location: 'தமிழ்நாடு',
      },
    ],
  },
  {
    id: 'm6',
    letter: 'ண',
    transliteration: 'Nna',
    type: 'mei',
    typeName: 'மெய்யெழுத்து',
    stages: [
      {
        period: 'கி.மு 3-ஆம் நூற்றாண்டு',
        name: 'தமிழ்ப் பிராமி (Tamil-Brahmi / தமிழி)',
        glyph: '𑀘',
        description: 'இரண்டு வளைகோடுகள் கொண்ட ணகர வடிவம்.',
        source: 'புகழூர் கல்வெட்டு',
        location: 'கரூர்',
      },
      {
        period: 'கி.பி 7-ஆம் நூற்றாண்டு',
        name: 'வட்டெழுத்து (Vatteluttu)',
        glyph: 'ꯅ',
        description: 'வட்டெழுத்து சாசன வடிவம்.',
        source: 'பாண்டியர் கல்வெட்டு',
        location: 'மதுரை',
      },
      {
        period: 'தற்காலம்',
        name: 'நவீன தமிழ் (Modern Tamil)',
        glyph: 'ண',
        description: 'இன்றைய ணகர சுழி வடிவம்.',
        source: 'இன்றைய பயன்பாடு',
        location: 'தமிழ்நாடு',
      },
    ],
  },
  {
    id: 'm7',
    letter: 'த',
    transliteration: 'Tha',
    type: 'mei',
    typeName: 'மெய்யெழுத்து',
    stages: [
      {
        period: 'கி.மு 3-ஆம் நூற்றாண்டு',
        name: 'தமிழ்ப் பிராமி (Tamil-Brahmi / தமிழி)',
        glyph: '𑀢',
        brahmiLetterKey: 'TA',
        description: 'வட்டமும் நேர்கோடும் இணைந்த பிராமி வடிவம்.',
        source: 'அழகர்மலை கல்வெட்டு',
        location: 'மதுரை',
      },
      {
        period: 'கி.பி 7-ஆம் நூற்றாண்டு',
        name: 'வட்டெழுத்து (Vatteluttu)',
        glyph: 'ꯇ',
        description: 'பனையோலையில் எழுத்தாணி கிழியாமல் இருக்க வளைத்து எழுதப்பட்ட வடிவம்.',
        source: 'சோழர் தொடக்கக்கால கல்வெட்டு',
        location: 'தஞ்சாவூர்',
      },
      {
        period: 'தற்காலம்',
        name: 'நவீன தமிழ் (Modern Tamil)',
        glyph: 'த',
        description: 'இன்றைய நவீன பயன்பாட்டு வடிவம்.',
        source: 'இன்றைய பயன்பாடு',
        location: 'தமிழ்நாடு',
      },
    ],
  },
  {
    id: 'm8',
    letter: 'ந',
    transliteration: 'Na',
    type: 'mei',
    typeName: 'மெய்யெழுத்து',
    stages: [
      {
        period: 'கி.மு 3-ஆம் நூற்றாண்டு',
        name: 'தமிழ்ப் பிராமி (Tamil-Brahmi / தமிழி)',
        glyph: '𑀣',
        description: 'செங்குத்துக் கோடும் கிடைக்கோடும் கொண்ட நகர வடிவம்.',
        source: 'மாங்குளம் கல்வெட்டு',
        location: 'மதுரை',
      },
      {
        period: 'கி.பி 7-ஆம் நூற்றாண்டு',
        name: 'வட்டெழுத்து (Vatteluttu)',
        glyph: 'ꯅ',
        description: 'பல்லவர் செப்பேடு சாசனம்.',
        source: 'பல்லவர் கல்வெட்டு',
        location: 'காஞ்சிபுரம்',
      },
      {
        period: 'தற்காலம்',
        name: 'நவீன தமிழ் (Modern Tamil)',
        glyph: 'ந',
        description: 'இன்றைய நகர வடிவம்.',
        source: 'இன்றைய பயன்பாடு',
        location: 'தமிழ்நாடு',
      },
    ],
  },
  {
    id: 'm9',
    letter: 'ப',
    transliteration: 'Pa',
    type: 'mei',
    typeName: 'மெய்யெழுத்து',
    stages: [
      {
        period: 'கி.மு 3-ஆம் நூற்றாண்டு',
        name: 'தமிழ்ப் பிராமி (Tamil-Brahmi / தமிழி)',
        glyph: '𑀤',
        description: 'U வடிவக் கோடு போன்ற பண்டைய பகர வடிவம்.',
        source: 'கொடுமணல் கல்வெட்டு',
        location: 'ஈரோடு',
      },
      {
        period: 'கி.பி 7-ஆம் நூற்றாண்டு',
        name: 'வட்டெழுத்து (Vatteluttu)',
        glyph: 'ꯄ',
        description: 'பாண்டியர் கல்வெட்டு வடிவம்.',
        source: 'பாண்டியர் கல்வெட்டு',
        location: 'திருநெல்வேலி',
      },
      {
        period: 'தற்காலம்',
        name: 'நவீன தமிழ் (Modern Tamil)',
        glyph: 'ப',
        description: 'இன்றைய பகர வடிவம்.',
        source: 'இன்றைய பயன்பாடு',
        location: 'தமிழ்நாடு',
      },
    ],
  },
  {
    id: 'm10',
    letter: 'ம',
    transliteration: 'Ma',
    type: 'mei',
    typeName: 'மெய்யெழுத்து',
    stages: [
      {
        period: 'கி.மு 3-ஆம் நூற்றாண்டு',
        name: 'தமிழ்ப் பிராமி (Tamil-Brahmi / தமிழி)',
        glyph: '𑀫',
        brahmiLetterKey: 'MA',
        description: 'மீன் அல்லது கிண்ணம் போன்ற கோட்டுரு வடிவம்.',
        source: 'அரிட்டபட்டி கல்வெட்டு',
        location: 'மதுரை',
      },
      {
        period: 'கி.பி 8-ஆம் நூற்றாண்டு',
        name: 'வட்டெழுத்து (Vatteluttu)',
        glyph: 'ꯃ',
        description: 'வட்டெழுத்து செப்பேடுகளில் காணப்படும் வடிவம்.',
        source: 'வேள்விக்குடி செப்பேடு',
        location: 'மதுரை',
      },
      {
        period: 'தற்காலம்',
        name: 'நவீன தமிழ் (Modern Tamil)',
        glyph: 'ம',
        description: 'இன்றைய அச்சு வடிவம்.',
        source: 'இன்றைய பயன்பாடு',
        location: 'தமிழ்நாடு',
      },
    ],
  },
  {
    id: 'm11',
    letter: 'ய',
    transliteration: 'Ya',
    type: 'mei',
    typeName: 'மெய்யெழுத்து',
    stages: [
      {
        period: 'கி.மு 3-ஆம் நூற்றாண்டு',
        name: 'தமிழ்ப் பிராமி (Tamil-Brahmi / தமிழி)',
        glyph: '𑀬',
        description: 'மூன்று கிளைக் கோடுகள் கொண்ட யகர வடிவம்.',
        source: 'புகழூர் கல்வெட்டு',
        location: 'கரூர்',
      },
      {
        period: 'கி.பி 7-ஆம் நூற்றாண்டு',
        name: 'வட்டெழுத்து (Vatteluttu)',
        glyph: '<ctrl42>',
        description: 'சேரர் சாசன வடிவம்.',
        source: 'சேரர் கல்வெட்டு',
        location: 'கோயம்புத்தூர்',
      },
      {
        period: 'தற்காலம்',
        name: 'நவீன தமிழ் (Modern Tamil)',
        glyph: 'ய',
        description: 'இன்றைய யகர வடிவம்.',
        source: 'இன்றைய பயன்பாடு',
        location: 'தமிழ்நாடு',
      },
    ],
  },
  {
    id: 'm12',
    letter: 'ர',
    transliteration: 'Ra',
    type: 'mei',
    typeName: 'மெய்யெழுத்து',
    stages: [
      {
        period: 'கி.மு 3-ஆம் நூற்றாண்டு',
        name: 'தமிழ்ப் பிராமி (Tamil-Brahmi / தமிழி)',
        glyph: '𑀭',
        description: 'அலை அலையான நேர்கோடு கொண்ட ரகர வடிவம்.',
        source: 'கொற்கை பானையோட்டுக் கல்வெட்டு',
        location: 'தூத்துக்குடி',
      },
      {
        period: 'கி.பி 7-ஆம் நூற்றாண்டு',
        name: 'வட்டெழுத்து (Vatteluttu)',
        glyph: 'ꯔ',
        description: 'நடுகற்களில் காணப்படும் வடிவம்.',
        source: 'தர்மபுரி நடுகல்',
        location: 'தர்மபுரி',
      },
      {
        period: 'தற்காலம்',
        name: 'நவீன தமிழ் (Modern Tamil)',
        glyph: 'ர',
        description: 'இன்றைய ரகர வடிவம்.',
        source: 'இன்றைய பயன்பாடு',
        location: 'தமிழ்நாடு',
      },
    ],
  },

  // 3. தமிழக்கே உரிய சிறப்பு எழுத்துக்கள் (Special Tamil Script Characters)
  {
    id: 's1',
    letter: 'ழ',
    transliteration: 'Zha',
    type: 'special',
    typeName: 'தமிழ் சிறப்பு எழுத்து',
    stages: [
      {
        period: 'கி.மு 3-ஆம் நூற்றாண்டு',
        name: 'தமிழ்ப் பிராமி (Tamil-Brahmi / தமிழி)',
        glyph: '𑀰',
        description: 'தமிழுக்கே உரிய சிறப்பு ழகர பிராமி வடிவம் (வட இந்தியாவில் இல்லாத எழுத்து).',
        source: 'புகழூர் & அழகர்மலை கல்வெட்டுகள்',
        location: 'கரூர் / மதுரை',
      },
      {
        period: 'கி.பி 7-ஆம் நூற்றாண்டு',
        name: 'வட்டெழுத்து (Vatteluttu)',
        glyph: 'ꯖ',
        description: 'சிறப்புத் தமிழ் வட்டெழுத்து சாசனம்.',
        source: 'பாண்டியர் கல்வெட்டு',
        location: 'திருநெல்வேலி',
      },
      {
        period: 'தற்காலம்',
        name: 'நவீன தமிழ் (Modern Tamil)',
        glyph: 'ழ',
        description: 'இன்றைய சிறப்பு ழகர அச்சு வடிவம்.',
        source: 'இன்றைய பயன்பாடு',
        location: 'தமிழ்நாடு',
      },
    ],
  },
  {
    id: 's2',
    letter: 'ள',
    transliteration: 'Lha',
    type: 'special',
    typeName: 'தமிழ் சிறப்பு எழுத்து',
    stages: [
      {
        period: 'கி.மு 3-ஆம் நூற்றாண்டு',
        name: 'தமிழ்ப் பிராமி (Tamil-Brahmi / தமிழி)',
        glyph: '𑀱',
        description: 'தமிழுக்கே உரிய சிறப்பு ளகர பிராமி வடிவம்.',
        source: 'கொடுமணல் கல்வெட்டு',
        location: 'ஈரோடு',
      },
      {
        period: 'கி.பி 7-ஆம் நூற்றாண்டு',
        name: 'வட்டெழுத்து (Vatteluttu)',
        glyph: 'ꯂ',
        description: 'வட்டெழுத்து கல்வெட்டு சாசனம்.',
        source: 'சேரர் கல்வெட்டு',
        location: 'கேரளம்',
      },
      {
        period: 'தற்காலம்',
        name: 'நவீன தமிழ் (Modern Tamil)',
        glyph: 'ள',
        description: 'இன்றைய ளகர அச்சு வடிவம்.',
        source: 'இன்றைய பயன்பாடு',
        location: 'தமிழ்நாடு',
      },
    ],
  },
  {
    id: 's3',
    letter: 'ற',
    transliteration: 'Rra',
    type: 'special',
    typeName: 'தமிழ் சிறப்பு எழுத்து',
    stages: [
      {
        period: 'கி.மு 3-ஆம் நூற்றாண்டு',
        name: 'தமிழ்ப் பிராமி (Tamil-Brahmi / தமிழி)',
        glyph: '𑀲',
        description: 'தமிழுக்கே உரிய சிறப்பு றகர பிராமி வடிவம்.',
        source: 'கீழவளவு கல்வெட்டு',
        location: 'மதுரை',
      },
      {
        period: 'கி.பி 7-ஆம் நூற்றாண்டு',
        name: 'வட்டெழுத்து (Vatteluttu)',
        glyph: 'ꯔ',
        description: 'வட்டெழுத்து நடுகல் சாசனம்.',
        source: 'தர்மபுரி நடுகல்',
        location: 'தர்மபுரி',
      },
      {
        period: 'தற்காலம்',
        name: 'நவீன தமிழ் (Modern Tamil)',
        glyph: 'ற',
        description: 'இன்றைய றகர அச்சு வடிவம்.',
        source: 'இன்றைய பயன்பாடு',
        location: 'தமிழ்நாடு',
      },
    ],
  },
  {
    id: 's4',
    letter: 'ன',
    transliteration: 'Nna',
    type: 'special',
    typeName: 'தமிழ் சிறப்பு எழுத்து',
    stages: [
      {
        period: 'கி.மு 3-ஆம் நூற்றாண்டு',
        name: 'தமிழ்ப் பிராமி (Tamil-Brahmi / தமிழி)',
        glyph: '𑀳',
        description: 'தமிழுக்கே உரிய னகர பிராமி வடிவம்.',
        source: 'மாங்குளம் கல்வெட்டு',
        location: 'மதுரை',
      },
      {
        period: 'கி.பி 7-ஆம் நூற்றாண்டு',
        name: 'வட்டெழுத்து (Vatteluttu)',
        glyph: 'ꯅ',
        description: 'பாண்டியர் செப்பேட்டு வடிவம்.',
        source: 'பாண்டியர் கல்வெட்டு',
        location: 'மதுரை',
      },
      {
        period: 'தற்காலம்',
        name: 'நவீன தமிழ் (Modern Tamil)',
        glyph: 'ன',
        description: 'இன்றைய னகர அச்சு வடிவம்.',
        source: 'இன்றைய பயன்பாடு',
        location: 'தமிழ்நாடு',
      },
    ],
  },
];

export default function TamilScriptEvolution() {
  const { lang, t } = useLanguage();
  const [selectedLetterId, setSelectedLetterId] = useState<string>('u1');
  const [filterCategory, setFilterCategory] = useState<'all' | 'uyir' | 'mei' | 'special'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Filtered dataset
  const filteredLetters = useMemo(() => {
    return FULL_EVOLUTION_DATA.filter((item) => {
      const matchesCategory = filterCategory === 'all' || item.type === filterCategory;
      const matchesSearch =
        item.letter.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.transliteration.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [filterCategory, searchQuery]);

  // Active Letter
  const activeLetterObj = useMemo(() => {
    return FULL_EVOLUTION_DATA.find((item) => item.id === selectedLetterId) || FULL_EVOLUTION_DATA[0];
  }, [selectedLetterId]);

  const handlePlaySound = (letterText: string) => {
    setIsPlayingAudio(true);
    speakTamilText(letterText, () => {
      setIsPlayingAudio(false);
    });
  };

  return (
    <div className="bg-[#fbf7f0] border-4 border-[#C89551]/70 rounded-[36px] shadow-2xl transition-all relative overflow-hidden space-y-6 sm:space-y-8 p-4 sm:p-8">
      
      {/* 1. Official Tamil Nadu State Epigraphy Academy Banner */}
      <div className="bg-gradient-to-r from-[#581515] via-[#420f0f] to-[#581515] text-white p-6 sm:p-10 rounded-[28px] border-2 border-[#C89551] shadow-xl relative overflow-hidden">
        
        {/* Subtle Decorative Emblem Watermark */}
        <div className="absolute right-4 bottom-2 opacity-10 pointer-events-none select-none">
          <Landmark className="w-56 h-56 text-amber-200" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          
          <div className="space-y-3 max-w-2xl">
            {/* Official Badge */}
            <div className="inline-flex items-center space-x-2 bg-amber-400/20 text-amber-300 border border-amber-400/40 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-amber-300 shrink-0" />
              <span>தமிழ்நாடு அரசு • தொல்லியல்துறை கல்வெட்டியல் பயிற்சித் தொகுதி</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black text-[#fbf7f0] font-serif leading-tight">
              தமிழ்-பிராமி கல்வெட்டு எழுத்துப் பயிலரங்கம்
            </h2>

            <p className="text-amber-100/90 text-xs sm:text-sm font-semibold leading-relaxed">
              2500 ஆண்டுகால தமிழ்ச் சாசனங்கள், சமணர் குகைக் கல்வெட்டுகள் மற்றும் வட்டெழுத்து ஓலைச்சுவடிகளின் வரிவடிவப் பரிணாமத்தைக் கற்றுக்கொள்ளும் உத்தியோகபூர்வக் கற்றல் தளம்.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-1 text-[11px] text-amber-200 font-extrabold">
              <span className="flex items-center gap-1 bg-amber-950/60 px-3 py-1 rounded-full border border-amber-500/30">
                <Layers className="w-3.5 h-3.5 text-amber-400" />
                <span>30 கல்வெட்டு எழுத்துகள்</span>
              </span>
              <span className="flex items-center gap-1 bg-amber-950/60 px-3 py-1 rounded-full border border-amber-500/30">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>மாங்குளம், புகழூர், கீழடி சான்றுகள்</span>
              </span>
            </div>
          </div>

          {/* Audio Pronunciation Button */}
          <div className="self-start md:self-center shrink-0">
            <button
              onClick={() => handlePlaySound(activeLetterObj.letter)}
              disabled={isPlayingAudio}
              className="group inline-flex items-center space-x-3 bg-gradient-to-r from-[#C89551] to-[#a67433] hover:from-[#a67433] hover:to-[#8a5d24] text-amber-950 font-black px-6 py-3.5 rounded-2xl shadow-lg border-2 border-amber-300/80 transition-all transform hover:scale-105 cursor-pointer active:scale-95"
            >
              <Volume2 className={`w-5 h-5 text-amber-950 ${isPlayingAudio ? 'animate-bounce' : ''}`} />
              <div className="text-left">
                <span className="text-[10px] uppercase tracking-wider block font-extrabold text-amber-900/80">ஒலிப்பயிற்சி</span>
                <span className="text-sm font-black font-serif">'{activeLetterObj.letter}' Sound Audio</span>
              </div>
            </button>
          </div>

        </div>
      </div>

      {/* 2. Controls Bar (Category Filters + Search) */}
      <div className="bg-white border-2 border-[#e7dcd0] p-4 sm:p-5 rounded-2xl shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        
        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-black text-slate-500 uppercase tracking-wider mr-1 hidden sm:inline">வரிசை:</span>
          
          <button
            onClick={() => setFilterCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
              filterCategory === 'all'
                ? 'bg-[#581515] text-amber-200 shadow-md border-2 border-[#C89551]'
                : 'bg-[#f4ece1] text-[#581515] hover:bg-[#e7dcd0]'
            }`}
          >
            அனைத்தும் (30)
          </button>

          <button
            onClick={() => setFilterCategory('uyir')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
              filterCategory === 'uyir'
                ? 'bg-[#581515] text-amber-200 shadow-md border-2 border-[#C89551]'
                : 'bg-[#f4ece1] text-[#581515] hover:bg-[#e7dcd0]'
            }`}
          >
            உயிரெழுத்துக்கள் (12)
          </button>

          <button
            onClick={() => setFilterCategory('mei')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
              filterCategory === 'mei'
                ? 'bg-[#581515] text-amber-200 shadow-md border-2 border-[#C89551]'
                : 'bg-[#f4ece1] text-[#581515] hover:bg-[#e7dcd0]'
            }`}
          >
            மெய்யெழுத்துக்கள் (14)
          </button>

          <button
            onClick={() => setFilterCategory('special')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
              filterCategory === 'special'
                ? 'bg-[#581515] text-amber-200 shadow-md border-2 border-[#C89551]'
                : 'bg-[#f4ece1] text-[#581515] hover:bg-[#e7dcd0]'
            }`}
          >
            தமிழ் சிறப்பு (4 - ழ,ள,ற,ன)
          </button>
        </div>

        {/* Search Box */}
        <div className="relative min-w-[200px] md:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="எழுத்து / Sound..."
            className="w-full pl-9 pr-4 py-2 rounded-xl text-xs font-bold bg-[#fbf7f0] border border-[#e7dcd0] focus:border-[#581515] focus:outline-none text-[#581515]"
          />
        </div>

      </div>

      {/* 3. Horizontal Scrollable Letter Selector Grid */}
      <div className="bg-white border-2 border-[#e7dcd0] p-4 rounded-2xl shadow-sm space-y-2">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-black text-[#581515] uppercase tracking-wider flex items-center gap-1.5">
            <Award className="w-4 h-4 text-amber-700" />
            <span>எழுத்தைத் தேர்ந்தெடுக்கவும் (Select Inscription Letter):</span>
          </span>
          <span className="text-[11px] font-bold text-slate-500">
            {filteredLetters.length} எழுத்துக்கள் உள்ளன
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-1 scrollbar-thin scrollbar-thumb-[#C89551] scrollbar-track-slate-100">
          {filteredLetters.map((item) => {
            const isSelected = item.id === activeLetterObj.id;
            const brahmiGlyph = item.stages[0]?.glyph || '𑀅';
            return (
              <button
                key={item.id}
                onClick={() => setSelectedLetterId(item.id)}
                className={`flex-shrink-0 px-3.5 py-2.5 rounded-2xl transition-all cursor-pointer flex flex-col items-center justify-center min-w-[64px] border-2 ${
                  isSelected
                    ? 'bg-[#581515] text-amber-300 border-[#C89551] shadow-lg scale-105 ring-2 ring-amber-400/40'
                    : 'bg-[#fbf7f0] text-[#581515] border-[#e7dcd0] hover:border-[#C89551] hover:bg-[#f4ece1]'
                }`}
              >
                <span className="text-xs font-mono font-black text-amber-500 leading-none pb-0.5">
                  {brahmiGlyph}
                </span>
                <span className="text-base font-black font-serif leading-tight">
                  {item.letter}
                </span>
                <span className="text-[9px] font-bold tracking-wider opacity-80 uppercase">
                  {item.transliteration}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Official Evolution Cards Grid (3 Era Stages) */}
      <div className="space-y-4">
        
        {/* Selected Letter Summary Header */}
        <div className="bg-[#f4ece1] border-2 border-[#e7dcd0] px-6 py-4 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <span className="w-12 h-12 rounded-xl bg-[#581515] text-amber-300 border border-amber-400/50 flex items-center justify-center text-2xl font-black font-serif shadow-md">
              {activeLetterObj.letter}
            </span>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-xl font-black text-[#581515] font-serif">
                  '{activeLetterObj.letter}' ({activeLetterObj.transliteration}) வரிவடிவப் பரிணாமம்
                </h3>
                <span className="text-[10px] font-black uppercase text-amber-900 bg-amber-200/80 px-2.5 py-0.5 rounded-full border border-amber-300">
                  {activeLetterObj.typeName}
                </span>
              </div>
              <p className="text-xs text-slate-700 font-semibold pt-0.5">
                தமிழி (பிராமி) ➜ வட்டெழுத்து ➜ நவீன தமிழ் பரிணாமக் கட்டங்கள்
              </p>
            </div>
          </div>

          <button
            onClick={() => handlePlaySound(activeLetterObj.letter)}
            className="inline-flex items-center space-x-2 text-xs font-black text-[#581515] bg-white border border-[#C89551] px-4 py-2 rounded-xl hover:bg-[#581515] hover:text-white transition-all cursor-pointer shadow-sm"
          >
            <Volume2 className="w-4 h-4 text-amber-600" />
            <span>கேட்க ('{activeLetterObj.letter}')</span>
          </button>
        </div>

        {/* 3 Stage Evolution Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {activeLetterObj.stages.map((stage, idx) => (
            <div
              key={idx}
              className="group bg-white border-2 border-[#e7dcd0] hover:border-[#581515] rounded-[30px] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 relative flex flex-col justify-between p-6 space-y-4 hover:-translate-y-1"
            >
              {/* Top Accent Stripe */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#581515] via-[#C89551] to-[#581515]" />

              <div className="space-y-4 pt-1">
                {/* Header Period + Stage Badge */}
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-black uppercase tracking-wider text-[#581515] bg-[#f8f2e7] px-3.5 py-1 rounded-full border border-[#c89551]/40">
                    {stage.period}
                  </span>
                  <span className="w-7 h-7 rounded-full bg-[#581515] text-amber-300 flex items-center justify-center text-xs font-black shadow-md border border-amber-400/40">
                    {idx + 1}
                  </span>
                </div>

                {/* Big Historical Glyph Frame */}
                <div className="h-36 bg-gradient-to-b from-[#fbf7f0] to-[#f4ece1] rounded-2xl border-2 border-[#c89551]/40 flex flex-col items-center justify-center relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-300 shadow-inner">
                  
                  {/* Watermark label */}
                  <span className="absolute top-2 left-3 text-[9px] font-black uppercase tracking-widest text-[#7a2222]/50">
                    {idx === 0 ? 'தமிழி சாசனம்' : idx === 1 ? 'ஓலை / செப்பேடு' : 'நவீன அச்சு'}
                  </span>

                  {/* Character Display */}
                  <span className="text-6xl sm:text-7xl font-black text-[#581515] font-serif drop-shadow-md tracking-widest my-auto">
                    {stage.glyph}
                  </span>

                  {/* Additional Brahmi letter badge */}
                  {idx === 0 && (
                    <span className="absolute bottom-2 right-3 text-[10px] font-black text-amber-900 bg-amber-200/90 px-2 py-0.5 rounded-md border border-amber-400">
                      தமிழ்ப் பிராமி
                    </span>
                  )}
                </div>

                {/* Description Body */}
                <div className="space-y-2">
                  <h4 className="text-lg font-black text-[#581515] leading-tight font-serif">
                    {stage.name}
                  </h4>
                  <p className="text-slate-700 text-xs font-semibold leading-relaxed">
                    {stage.description}
                  </p>
                </div>
              </div>

              {/* Epigraphical Evidence Footer */}
              <div className="pt-3 border-t border-slate-100 text-[11px] font-bold text-amber-900 flex items-center space-x-1.5 bg-[#fbf7f0] -mx-6 -mb-6 p-4 border-b-2 rounded-b-[28px]">
                <MapPin className="w-4 h-4 text-amber-700 shrink-0" />
                <div className="leading-snug">
                  <span className="font-black text-[#581515]">தொல்லியல் சான்று: </span>
                  <span className="text-slate-800">{stage.source}</span>
                  {stage.location && (
                    <span className="block text-[10px] text-amber-800 font-extrabold">📍 {stage.location}</span>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* 5. Official Epigraphy Educational Note */}
      <div className="bg-[#f4ece1] border-2 border-[#e7dcd0] p-6 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start space-x-3">
          <BookOpen className="w-6 h-6 text-[#581515] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-sm font-black text-[#581515]">
              கல்வெட்டியல் குறிப்பு (Epigraphical Insight)
            </h4>
            <p className="text-xs text-slate-700 font-medium leading-relaxed">
              தமிழ்-பிராமி (தமிழி) எழுத்துக்கள் கிமு 6-ஆம் நூற்றாண்டு முதலே தமிழ்நாட்டின் குகைகளிலும், பானையோடுகளிலும் பயன்பாட்டில் இருந்துள்ளன (கீழடி & கொடுமணல் அகழ்வாராய்ச்சி சான்றுகள்). 
            </p>
          </div>
        </div>

        <div className="shrink-0 flex items-center gap-2">
          <span className="text-[10px] font-black uppercase text-[#581515] bg-white border border-[#C89551] px-3.5 py-1.5 rounded-full shadow-sm">
            Archaeology Certified
          </span>
        </div>
      </div>

    </div>
  );
}
