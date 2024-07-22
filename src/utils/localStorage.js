// src/utils/localStorage.js

export const saveToLocalStorage = (key, value) => {
    try {
        const serializedValue = JSON.stringify(value);
        localStorage.setItem(key, serializedValue);
    } catch (error) {
        console.error('Yerel depolamaya kaydedilirken hata oluştu', error);
    }
};

export const loadFromLocalStorage = (key) => {
    try {
        const serializedValue = localStorage.getItem(key);
        if (serializedValue === null) return undefined;
        return JSON.parse(serializedValue);
    } catch (error) {
        console.error('Yerel depolamadan yüklenirken hata oluştu', error);
        return undefined;
    }
};

export const removeFromLocalStorage = (key) => {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.error('Yerel depolamadan silinirken hata oluştu', error);
    }
};
