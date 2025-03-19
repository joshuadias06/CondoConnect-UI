document.getElementById("update-button").addEventListener("click", function() {
    document.getElementById("password-popup").classList.remove("hidden");
});

document.getElementById("cancel-popup").addEventListener("click", function() {
    document.getElementById("password-popup").classList.add("hidden");
});