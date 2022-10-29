var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var ASPECT_URL = "Content/KenmerkendeAspecten.json";
var ASYNC_ASPECTS = null;
var selectedAspect = null;
getAspects()
    .then(function (aspects) {
    ASYNC_ASPECTS = aspects;
    selectedAspect = randomAspectFromChapter(1);
    renderAspect();
});
var showingCorrectness = false;
function answerTextfieldOnEnter(event) {
    if (event.key === "Enter") {
        var userInput = document.getElementById("answerTextfield").value;
        clearTextField();
        // showCorrectness = !showCorrectness
        if (!showingCorrectness) {
            showingCorrectness = true;
            renderCorrectness(userInput, "id");
            setAspect();
        }
        else {
            showingCorrectness = false;
            hideCorrectness();
            renderAspect();
        }
    }
}
function clearTextField() {
    var textField = document.getElementById("answerTextfield");
    textField.value = "";
}
function isCorrect(aspect, input, mode) {
    // mode should represent the type of value that the user is typing.    var 
    var correctAnswer = mode === "value" ? aspect.value : aspect.id;
    return correctAnswer === input;
}
function messageAboutCorrectness(correct, aspect, mode) {
    if (correct) {
        return "Correct! Enter voor  volgende.";
    }
    else {
        // mode should represent the type of value that the user is typing.
        var correctAnswer = mode === "value" ? aspect.value : aspect.id;
        return "Fout. Goede antwoord: ".concat(correctAnswer, ". Enter voor  volgende.");
    }
}
// Should be a positive number
function getRandomNumberBelowNumber(number) {
    return Math.floor(Math.random() * number);
}
function randomIndexFromList(list) {
    // return Math.floor(Math.random() * list.length)
    return getRandomNumberBelowNumber(list.length);
}
// TODO: Call this function on a chapter
function randomIndexFromChapter(aspects, chapter) {
    // return randomIndexFromChapter(aspects.chapters[chapter])
    return randomIndexFromList(aspects.chapters[chapter].aspects);
}
function randomAspectFromChapter(chapter) {
    var aspects = ASYNC_ASPECTS;
    var RANDOM_INDEX = randomIndexFromChapter(aspects, chapter);
    var aspect = getAspect(aspects, chapter, RANDOM_INDEX);
    console.log(aspect);
    return aspect;
}
function getAspects() {
    return __awaiter(this, void 0, void 0, function () {
        var RES, BODY;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch(ASPECT_URL)];
                case 1:
                    RES = _a.sent();
                    return [4 /*yield*/, RES.json()];
                case 2:
                    BODY = _a.sent();
                    return [2 /*return*/, BODY];
            }
        });
    });
}
function getAspect(aspects, chapter, index) {
    return aspects.chapters[chapter].aspects[index];
}
function setAspect() {
    selectedAspect = randomAspectFromChapter(1);
}
function renderAspect() {
    var aspect = selectedAspect;
    document.getElementById("question").innerHTML = aspect.value;
}
// TODO: Saparate rendering and setting
function renderCorrectness(userInput, mode) {
    var aspect = selectedAspect;
    var correctness = isCorrect(aspect, userInput, mode);
    var message = messageAboutCorrectness(correctness, aspect, "id");
    document.getElementById("correctness").innerHTML = message;
}
function hideCorrectness() {
    document.getElementById("correctness").innerHTML = "";
}
