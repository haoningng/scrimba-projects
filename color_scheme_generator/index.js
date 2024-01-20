document.getElementById("form").addEventListener("submit", function(event){
    event.preventDefault();
    let value = document.getElementById("color").value;
    let mode = document.getElementById("scheme-mode").value;
    
    fetch(`https://www.thecolorapi.com/scheme?hex=${value.slice(1)}&mode=${mode}`)
    .then(res => res.json())
    .then(data => {
        for (let i = 0; i < data.colors.length; i++) {
            document.getElementById(`color-${i + 1}`)
                .style.backgroundColor = `${data.colors[i].hex.value}`;
            document.getElementById(`color-text-${i + 1}`)
                .textContent = data.colors[i].hex.value;
        }
    })
})