const themeKey = "light_theme"

function isLight() {
    return localStorage.getItem(themeKey);
}

function setupTheme() {
    if (isLight()) {
        document.documentElement.classList.add(themeKey);
    }
}

function toggleTheme() {
    if (isLight()) {
        document.documentElement.classList.remove(themeKey);
        localStorage.removeItem(themeKey)
        return false
    } else {
        document.documentElement.classList.add(themeKey);
        localStorage.setItem(themeKey, "true")
        return true
    }
}

const theme = {
    setupTheme,
    toggleTheme,
    isLight
}

export default theme