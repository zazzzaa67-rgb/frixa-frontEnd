const DEFAULT_LANGUAGE='en'
const SUPPORTED_LANGUAGES=['en' , 'ar']
async function loadTranslation(language){
    if (language == 'en'){
        return null
    }
    const response = await fetch(`./locales/${language}.json`)
    if(!response.ok){
        throw new Error(`Failed to load ${language}.json`)
    }
    return await response.json()
}
function getNestedValue(object , path){
    return path.split('.').reduce((current , key)=>{
        return current?.[key]
    } , object)
}
async function applyLanguage(language){
    if(!SUPPORTED_LANGUAGES.includes(language)){
        language = DEFAULT_LANGUAGE
    }
    try{
        const translations = await loadTranslation(language)
        document.querySelectorAll('[data-i18n]').forEach((element)=>{
            if(language === 'en'){
                return 
            }
            const key = element.dataset.i18n;
            const translation = getNestedValue(translations , key)
            if(translation !== undefined){
                element.textContent = translation ;
            }
        });
        document.documentElement.lang = language
        document.documentElement.dir = language === 'ar'? 'rtl' : 'ltr';
        localStorage.setItem("language" , language);
    }catch(error){
        console.error('Translation error : ' , error);
    }
}
function changeLanguage(language){
    if(language === 'en'){
        localStorage.setItem('language' , 'en');
        location.reload();
        return
    }
    applyLanguage(language);
}
const savedLanguage = localStorage.getItem('language') || DEFAULT_LANGUAGE
applyLanguage(savedLanguage)
const languageButton= document.getElementById('language-toggle')
if(languageButton){
    languageButton.addEventListener('click' , ()=>{
        const currentLanguage = localStorage.getItem('language') || DEFAULT_LANGUAGE;
        if (currentLanguage === 'en'){
            changeLanguage('ar')
        }else{
            changeLanguage('en')
        }
    });
}