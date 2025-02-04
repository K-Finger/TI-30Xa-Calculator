fetch("static/data/buttons.json")
    .then((response) => response.json())
    .then((buttons) => {
        const gridContainer = document.getElementById("grid-container");

        buttons.forEach(({ text, id, alphaText, className }) => {
            const p = document.createElement("p");
            p.textContent = alphaText;

            const button = document.createElement("button");
            button.textContent = text;
            if (id) button.id = id;
            if (className) button.className = className;

            gridContainer.appendChild(p);
            gridContainer.appendChild(button);
        });
    })
    .catch((error) => console.error("Error loading button data:", error));
