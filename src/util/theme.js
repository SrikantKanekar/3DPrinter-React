
export function setupTheme() {
    if (localStorage.getItem("light_theme") === "true") {
        document.documentElement.classList.add("light_theme");
        return false
    }
}

export function toggleTheme() {
    if (localStorage.getItem("light_theme") === "true") {
        document.documentElement.classList.remove("light_theme");
        localStorage.removeItem("light_theme")
        return true
    } else {
        document.documentElement.classList.add("light_theme");
        localStorage.setItem("light_theme", "true")
        return false
    }
}