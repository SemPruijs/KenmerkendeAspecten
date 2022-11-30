// --- GET INFORMATION ---

// Load chapters
async function getChapters(url: string): Promise<[Chapter]> {
    const res = await fetch(url);
    const body = await res.json();

    return body.chapters;
}


function indexToChapter(index: number, chapters: Array<Chapter>): Chapter {
    return chapters[index]
}

function indexesToChapters(indexs: Array<number>, chapters: Array<Chapter>): Array<Chapter> {
    const indexToChapterr = (index: number) => indexToChapter(index, chapters);
    return indexs.map(indexToChapterr)
}

function listAspectsFromChapters(chapters: Array<Chapter>): Array<Aspect> {
    return chapters.flatMap(chapter => chapter.aspects)
}

// function generateNewOrder(oldOrder: Array<Aspect>): Array<Aspect> {
//     const lastAspect = oldOrder[oldOrder.length - 1]
//     const newOrder: Array<Aspect> = shuffle(oldOrder.filter((aspect) => aspect.id != lastAspect.id)).concat([lastAspect])
//     return newOrder
// }

// The last 20% of the aspects will appear in the last 80% of the new older.
function generateNewOrder(oldOrder: Array<Aspect>): Array<Aspect> {
    // make 2 arrays, the firstSplit is the first 80%, last split the remaining 20%
    const firstSplit = oldOrder.slice(0, Math.floor(oldOrder.length * 0.8))
    const lastSplit = oldOrder.slice(Math.floor(oldOrder.length * 0.8), oldOrder.length)

    // shuffle the first 80%
    const shuffledFirstSplit = shuffle(firstSplit)

    // remove the first 20% of the shuffled 80%. These percentages are based on the whole list length.
    const noStartShuffleFirstSplit = shuffledFirstSplit.slice(lastSplit.length, shuffledFirstSplit.length)

    // make list based on the list above and append the aspects from the last 20% of the list (The second list in this function)
    let NSSFSWithLastPart = noStartShuffleFirstSplit 

    for (let i = 0; i < lastSplit.length; i++) {
        const randomIndex = Math.floor(NSSFSWithLastPart.length * Math.random())
        NSSFSWithLastPart.splice(randomIndex, 0, lastSplit[i])
    }

    // get the starting aspects of the shuffled first 80# that where not include in the new last 80%
    const start = shuffledFirstSplit.slice(0, lastSplit.length)

    // create the newOlder list, with the new 20% and the new 80$
    const newOrder = start.concat(NSSFSWithLastPart)

    return newOrder
}

function isCorrect(aspect:Aspect, input:string, mode: LearnMode): boolean {        
    const correctAnswer = mode == LearnMode.Value ? aspect.value : aspect.id
    return correctAnswer == input    
}

function messageAboutCorrectness(correct: boolean, aspect:Aspect, mode:LearnMode): string {
    if (correct) {
        return "Correct! Enter voor  volgende."
    } else {
        let correctAnswer = mode == LearnMode.Value ? aspect.value : aspect.id
        return `Fout. Goede antwoord: <b>${correctAnswer}</b>. Enter voor  volgende.`       
    }
}
