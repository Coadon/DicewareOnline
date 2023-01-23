let diceware_index = [];

// Public
function setupRoutine() {
    // Fetch diceware
    fetch("../diceware_index.txt")
        .then((response) => response.text())
        .then((data) => {
            diceware_index = data.split("\n");

            // Make visible
            document.getElementById("loading-text").classList.add("hidden");
            document.getElementById("main-fields").classList.remove("hidden");
        })
        .catch((reason) => {
            console.error(reason)
            document.getElementById("loading-text").textContent = "An error occured while loading the diceware index.";
            document.getElementById("loading-text").classList.replace("text-green-700", "text-red-800");
        });
}

function beginGenerateRoutine() {
    let product = "";
    for (let i = 0; i < document.getElementById("length-field").value; i++) {
        product += diceware_index[getRandomInteger(0, 7777)];
    }
    document.getElementById("output-field").textContent = product;
}

async function copyOutputField() {
    try {
    await navigator.clipboard.writeText(document.getElementById("output-field").textContent);
    alert("Copied");
    } catch (error) {
        throw error;
    }
}

// Private ones

function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Entry point: Setup
setupRoutine();
