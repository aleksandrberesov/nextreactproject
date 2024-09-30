import { useEffect, useState, useRef, useCallback } from 'react';
import { TStringElement } from '../libs/lib.types';   
import { TNumberToStringFunc, TStringProc } from '../libs/lib.types';        

type TLanguage = 'en' | 'ru';

type TWord = {
    id: number;
    word: string;
    annotation?: string;  
}; 

type TDictionaryWord = {
    id: number; 
    en: string; 
    ru: string; 
    annotation: string;
};

interface ILocalizator {
    getWord: TNumberToStringFunc;
    setLanguage: TStringProc;
};

const AvailableLanguages: TLanguage[] = ["en", 'ru'];
const LanguageIDs : TStringElement[] = [
    {
        id: 0,  
        element: "en"
    },
    {
        id: 1,
        element: "ru"
    }
];

function useLocalizaion(lang: string): ILocalizator {
    const dictionaryRef = useRef<TDictionaryWord[]>([]);
    const [words, setWords] = useState<TWord[]>([]);
  
    useEffect(() => {
      fetch('/words.json')
        .then((response) => response.json())
        .then((data) => {
            dictionaryRef.current = data;
            setLanguage(lang);
        });
    }, [lang]);

    function PushWords(lang: keyof TDictionaryWord = "en"): TWord[]{
        let w: TWord[] = [];
        dictionaryRef.current.forEach((_word: TDictionaryWord) => {
            w.push({id: _word.id, word: String(_word[lang]), annotation: _word.annotation});    
        });
        return w;
    };

    const setLanguage = useCallback((lang: string) => {
        let selectedLang: keyof TDictionaryWord = lang as keyof TDictionaryWord;
        setWords(PushWords(selectedLang));
    }, []);

    function getWord(id: number): string{
        const word = words.find((word: TWord) => word.id === id);
        if (word) {
          return word.word;
        }
        return String(id);
    };
    
    return {
        getWord,
        setLanguage
    };
};

export default useLocalizaion;
export type { TLanguage };
export { AvailableLanguages, LanguageIDs };