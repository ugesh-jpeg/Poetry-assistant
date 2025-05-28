// Brief Description : Poetry Assistant to find rhyming words from a passage given

// Static Array *REQUIREMENT*
const rhymeDatabase = [
    { baseWord: "cat", poeticWords: ["chat", "splat", "gnat", "scat", "brat"] },
    { baseWord: "dog", poeticWords: ["cog", "jog", "smog", "snog", "prog"] },
    { baseWord: "tree", poeticWords: ["glee", "knee", "me", "flee", "tee", "agree"] },
    { baseWord: "sky", poeticWords: ["cry", "my", "why", "guy", "pie", "tie"] },
];

// Dynamic Array *REQUIREMENT*
class decentStorage {
    constructor() {
        this.elements = [];
    }

    addElement(element) {
        this.elements.push(element);
    }

    getElement(index) {
        return this.elements[index];
    }

    getSize() {
        return this.elements.length;
    }

    // Bubble Sort *REQUIREMENT*
    sortElements() {
        let n = this.elements.length;
        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                if (this.elements[j] > this.elements[j + 1]) {
                    let temp = this.elements[j];
                    this.elements[j] = this.elements[j + 1];
                    this.elements[j + 1] = temp;
                }
            }
        }
    }
}

const enteredWords = new decentStorage();

// Stack *REQUIREMENT*
class wordhistoryStack {
    constructor() {
        this.stackItems = [];
    }

    pushItem(element) {
        this.stackItems.push(element);
    }

    popItem() {
        if (this.stackItems.length === 0) return null;
        return this.stackItems.pop();
    }

    peekItem() {
        return this.stackItems[this.stackItems.length - 1];
    }

    isStackEmpty() {
        return this.stackItems.length === 0;
    }

    displayStack() {
        return this.stackItems;
    }
}

const rhymeHistory = new wordhistoryStack();

// Queue *REQUIREMENT*
class poeticwordQueue {
    constructor() {
        this.queueItems = [];
    }

    enqueueItem(element) {
        this.queueItems.push(element);
    }

    dequeueItem() {
        if (this.queueItems.length === 0) return null;
        return this.queueItems.shift();
    }

    displayQueue() {
        return this.queueItems;
    }
}

const searchQueue = new poeticwordQueue();

// Function to get rhymes from the static array
function getpoeticWords(word) {
    word = word.toLowerCase();
    for (let i = 0; i < rhymeDatabase.length; i++) {
        if (rhymeDatabase[i].baseWord === word) {
            return rhymeDatabase[i].poeticWords;
        }
    }
    return [];
}

// Function to find and display rhymes
function findRhymes() {
    const word = document.getElementById('wordInput').value.toLowerCase().trim();
    if (word === "") {
        document.getElementById('outputResults').innerHTML = `<h2>Please enter a word</h2>`;
        return;
    }
    searchQueue.enqueueItem(word);
    processQueue();
}

function processQueue() {
    while (searchQueue.queueItems.length > 0) {
        const word = searchQueue.dequeueItem();
        if (word !== null) {
            enteredWords.addElement(word);
            enteredWords.sortElements(); // Sort user words using bubble sort
            const rhymingWords = getpoeticWords(word);
            if (rhymingWords.length > 0) {
                rhymeHistory.pushItem(word);
                let resultHtml = `<h2>Words that rhyme with "${word}":</h2>`;
                resultHtml += '<ul>';
                rhymingWords.forEach(rhyme => {
                    resultHtml += `<li>${rhyme}</li>`;
                });
                resultHtml += '</ul>';
                document.getElementById('outputResults').innerHTML = resultHtml;
            } else {
                document.getElementById('outputResults').innerHTML = `<h2>No rhyming words found for "${word}"</h2>`;
            }
            document.getElementById('enteredWords').innerHTML = `<h3>All the user's searched words:</h3><p>${enteredWords.elements.join(', ')}</p>`;
            document.getElementById('rhymeHistory').innerHTML = `<h3>Searched words that rhyme:</h3><p>${rhymeHistory.displayStack().join(', ')}</p>`;
        }
    }
}