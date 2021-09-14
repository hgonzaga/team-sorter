const TOTAL_NUMBER_OF_PLAYERS = 10;
const TEAM_SIZE = Math.ceil(TOTAL_NUMBER_OF_PLAYERS / 2);

const clearSortedResults = () => {
    document.getElementById("resultPanelTeam1").innerHTML = "";
    document.getElementById("resultPanelTeam2").innerHTML = "";
}

const unlockAddButton = () => {
    document.getElementById("playerNameInput").disabled = false;
    document.getElementById("addButton").disabled = false;
}

const lockSortButton = () => {
    document.getElementById("sortButton").disabled = true;
}

const mapToArrayFromTable = (table) => {
    const arrList = [...table.rows];
    return arrList.map((row) => row.cells[0].innerText);
}

const updateCounter = () => {
    const table = document.getElementById('table');
    document.getElementById("counter").innerHTML = "" + table.rows.length;
}

const removePlayer = (btn) => {
    const row = btn.parentNode.parentNode;
    row.parentNode.removeChild(row);
    unlockAddButton();
    lockSortButton();
}

const removeAllPlayers = () => {
    const table = document.getElementById('table');
    if(!table && !table.rows)
        return;
    table.innerHTML = "";
    document.getElementById("clearButton").disabled = true;
    document.getElementById('resultPanel').style.display = "none";
    updateCounter();
    unlockAddButton();
    lockSortButton();
}

const addPlayer = () => {
    const table = document.getElementById('table');
    const playerName = document.getElementById('playerNameInput').value.toUpperCase();
    const mappedList = mapToArrayFromTable(table);
    if (playerName && playerName.trim().length > 0) {
        if (mappedList.length === 0 || mappedList.length > 0 && mappedList.length < TOTAL_NUMBER_OF_PLAYERS && !mappedList.includes(playerName)) {
            const row = document.createElement('tr');
            const collPlayerName = document.createElement('td');
            const collRemoveButton = document.createElement('td');
            const button = document.createElement("button");
            button.innerText = 'X';
            button.onclick = () => removePlayer(button);
            collPlayerName.appendChild(document.createTextNode(playerName));
            collPlayerName.style.textAlign = "left";
            collRemoveButton.appendChild(button);
            collRemoveButton.style.textAlign = "right";
            row.appendChild(collPlayerName);
            row.appendChild(collRemoveButton);
            table.appendChild(row);
            document.getElementById('playerNameInput').value = "";
        } else {
            alert("There is already a player with that name on the list: " + playerName);
            return;
        }
        if (table.rows.length === TOTAL_NUMBER_OF_PLAYERS) {
            document.getElementById("playerNameInput").disabled = true;
            document.getElementById("addButton").disabled = true;
            document.getElementById("sortButton").disabled = false;
            updateCounter();
            return;
        }
        updateCounter();
        document.getElementById("clearButton").disabled = false;
    } else {
        alert("You must enter a name!");
        return;
    }
}

const shuffle = (array) => {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
    return array;
}

const sortTeams = () => {
    const table = document.getElementById('table');
    if (table.rows.length === TOTAL_NUMBER_OF_PLAYERS) {
        clearSortedResults();
        const mappedList = mapToArrayFromTable(table);
        const result = [...shuffle(mappedList)];
        const firstTeam = result.slice(0, TEAM_SIZE);
        const secondTeam = result.slice(-TEAM_SIZE);

        const resultPanelTeam1 = document.getElementById('resultPanelTeam1');
        firstTeam.forEach((player) => {
            const entry = document.createElement('li');
            entry.appendChild(document.createTextNode(player));
            resultPanelTeam1.appendChild(entry);
        });

        const resultPanelTeam2 = document.getElementById('resultPanelTeam2');
        secondTeam.forEach((player) => {
            const entry = document.createElement('li');
            entry.appendChild(document.createTextNode(player));
            resultPanelTeam2.appendChild(entry);
        });
        document.getElementById('resultPanel').style.display = "flex";
        document.getElementById("resultPanel").scrollIntoView();

    } else {
        alert("Number of players must be" + TOTAL_NUMBER_OF_PLAYERS);
        return;
    }
}
