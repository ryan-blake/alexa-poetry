/**
 Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
 http://aws.amazon.com/apache2.0/
 or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 */

/**
 * This sample shows how to create a simple Trivia skill with a multiple choice format. The skill
 * supports 1 player at a time, and does not support games across sessions.
 */

'use strict';

/**
 * When editing your questions pay attention to your punctuation. Make sure you use question marks or periods.
 * Make sure the first answer is the correct one. Set at least 4 answers, any extras will be shuffled in.
 */
var questions = [
    {
        "A poem that has five lines and creates a mood, picture, or feeling. Lines 1 through 4 are made up of words, phrases or clauses while the first word of each line is in alphabetical order. Line 5 is one sentence long and begins with any letter.": [
            "A B C",
            "Limerick",
            "boston bobby",
            "tony stanza"
        ]
    },
    {
        "Poetry that certain letters, usually the first in each line form a word or message when read in a sequence. Example: Edgar Allan Poe's 'A Valentine'.": [
            "Acrostic",
            "verse tense",
            "rondo",
            "post initial"
        ]
    },
    {
        "A poem that tells a story similar to a folk tale or legend which often has a repeated refrain.": [
            "Ballad",
            "Reminiscent",
            "Sonnet",
            "Salad"
        ]
    },
    {
        "Poetry which has three stanzas of seven, eight or ten lines and a shorter final stanza of four or five. All stanzas end with the same one line refrain.": [
            "Ballade",
            "Lyric",
            "Milly win",
            "listener"
        ]
    },
    {
        "A poem written in unrhymed iambic pentameter and is often unobtrusive. The iambic pentameter form often resembles the rhythms of speech. Example: Alfred Tennyson's 'Ulysses'.": [
            "Blank verse",
            "A B C",
            "Burlesque",
            "Metronome grid"
        ]
    },
    {
        "A poem written about one self's life, personality traits, and ambitions. Example: Jean Ingelow's 'One Morning, Oh! So Early'.": [
            "Bio",
            "Eco",
            "Auto",
            "Etho"
        ]
    },
    {
        "Poetry that treats a serious subject as humor. Example: E. E. Cummings 'O Distinct'.": [
            "Burlesque",
            "Ghazal",
            "gorilla",
            "ode"
        ]
    },
    {
        "Medieval Italian lyric style poetry with five or six stanzas and a shorter ending stanza.": [
            "Canzone",
            "an early italian",
            "Italian sonnet",
            "import retort"
        ]
    },
    {
        "Latin expression that means 'seize the day.' with a theme of living for today.": [
            "Carpe Diem",
            "la presence",
            "Epitaph",
            "Idyll"
        ]
    },
    {
        "Poetry with five lines. Line 1 has one word, a title. Line 2 has two words that describe the title. Line 3 has three words that tell the action. Line 4 has four words that express the feeling, and line 5 has one word which recalls the title.": [
            "Cinquain",
            "verse",
            "shape",
            "burp bark"
        ]
    },
    {
        "Poetry which holds the principles and ideals of beauty that are characteristic of Greek and Roman art, architecture, and literature.": [
            "Classicism",
            "reasoning",
            "tangle ridge",
            "enlightenment"
        ]
    },
    {
        "Also known as 'size poetry'. This poetry uses typographical arrangements to display an element of the poem. It can either be through re-arrangement of letters of a word or by arranging the words as a shape.": [
            "Concrete",
            "Abstraction",
            "Solid",
            "formative"
        ]
    },
    {
        "This type of poem is two lines which may be rhymed or unrhymed. Example: Walt Whitman's 'To You'.": [
            "Couplet",
            "timid",
            "mute",
            "compute"
        ]
    },
    {
        "A type of poem which is spoken to a listener. The speaker addresses a specific topic while the listener unwittingly reveals details about him/herself.": [
            "Dramatic Monologue",
            "wrap around",
            "presidential",
            "north star"
        ]
    },
    {
        "A sad and thoughtful poem about the death of an individual. Example: Gary R. Hess's '1983'.": [
            "Elegy",
            "effigy",
            "eulogy",
            "vogue on poetry"
        ]
    },
    {
        "An extensive, serious poem that tells the story about a heroic figure.": [
            "epic",
            "drama",
            "instance remedy",
            "run amok"
        ]
    },
    {
        "A very short, ironic and witty poem usually written as a brief couplet or quatrain. The term is derived from Greek meaning inscription.": [
            "Epigram",
            "colonies",
            "Irregular",
            "consonance"
        ]
    },
    {
        "A commemorative inscription on a tomb or mortuary monument written to praise the deceased. Example: Ben Jonson's 'On My First Sonne'.": [
            "Epitaph",
            "mediocre",
            "somber",
            "mirage"
        ]
    },
    {
        "A poem written in honor of the bride and groom.": [
            "Epithalamium",
            "memorian",
            "rhyme royal",
            "strain"
        ]
    },
    {
        "Poetry written in either rhyme or unrhymed lines that have no set fixed metrical pattern.": [
            "Free verse",
            "Animal",
            "wall",
            "endless river"
        ]
    },
    {
        "Poetry created by taking words, phrases, and passages from other sources and re-framing them by adding spaces, lines, or by altering the text with additions or subtractions.": [
            "Found",
            "crochet",
            "stringing",
            "post diction"
        ]
    },
    {
        "A short lyrical poem that arose in Urdu. It is between 5 and 15 couplets long. Each couplet contains its own poetic thought but is linked in rhyme that is established in the first couplet and continued in the second line of each pair. The lines of each couplet are equal in length. Themes are usually connected to love and romance. The closing signature often includes the poet's name or allusion to it.": [
            "Ghazal",
            "abacus",
            "non binary",
            "haiku"
        ]
    },
    {
        "A Japanese poem composed of three unrhymed lines of five, seven, and five morae, usually containing a season word.": [
            "Haiku",
            "tanka",
            "raw bee",
            "pindaric"
        ]
    },
    {
        "Short lyric poem written in two or four-line stanzas, each with its the same metrical pattern, often addressed to a friend and deal with friendship, love and the practice of poetry. It is named after its creator, Horace.": [
            "Horatian ode",
            "horace",
            "rondeau",
            "Arthur"
        ]
    },
    {
        "One short syllable followed by one long one five sets in a row. Used extensively in sonnets.": [
            "Iambic pentameter",
            "purity",
            "carbonite",
            "Ode"
        ]
    },
    {
        "Poetry that either depicts a peaceful, idealized country scene or a long poem telling a story about heroes of a bye gone age.": [
            "Idyll",
            "memorian",
            "inquiry",
            "sophistication"
        ]
    },
    {
        "Neither the three part form of the pindaric ode nor the two or four-line stanza of the Horatian ode. It is characterized by lack of correspondence between the parts.": [
            "Irregular ode",
            "ambiguous ode",
            "sleepy ode",
            "authoritative ode"
        ]
    },
    {
        "A sonnet consisting of an octave with the rhyme pattern a b b a a b b a followed by six lines with a rhyme pattern of c d e c d e or c d c d c d": [
            "Italian sonnet",
            "Oblivious sonnet",
            "ornery sonnet",
            "gullible sonnet"
        ]
    },
    {
        "A long narrative poem, especially one that was sung by medieval minstrels.": [
            "Lay",
            "giga fly",
            "one count",
            "Shape"
        ]
    },
    {
        "A short sometimes vulgar, humorous poem consisting of five anapestic lines. Lines 1, 2, and 5 have seven to ten syllables, rhyme and have the same verbal rhythm. The 3rd and 4th lines have five to seven syllables, rhyme and have the same rhythm.": [
            "Limerick",
            "river",
            "zest",
            "ghazal"
        ]
    },
    {
        "A poem that is made up of items or events. It can be any length and rhymed or unrhymed.": [
            "list",
            "happens",
            "can",
            "report"
        ]
    },
    {
        "A poem that expresses the thoughts and feelings of the poet. Many songs are written using this type of writing.": [
            "Lyric",
            "Towel",
            "limb",
            "rapid communication"
        ]
    },
    {
        "A quatrain in iambic tetrameter with a rhyme scheme of abba named after the pattern used by Lord Tennyson.": [
            "Memoriam stanza",
            "flying stanza",
            "seasonal stanza",
            "quad stanza"
        ]
    },
    {
        "Poetry that tells about the word. It uses the letters of the word for the first letter of each line.": [
            "Name",
            "define",
            "refrain",
            "informative"
        ]
    },
    {
        "A poem that tells a story.": [
            "Narrative",
            "what a lovely a day it is",
            "brief eternity",
            "the moment"
        ]
    },
    {
        "A poem that depicts rural life in a peaceful, romanticized way.": [
            "Pastoral",
            "Sestina",
            "Western",
            "Insight"
        ]
    },
    {
        "A ceremonious poem consisting of a strophe. Followed by a an antistrophe with the same metrical pattern and concluding with a summary line in a different meter. Named after Pindar, a Greek professional lyrist of the 5th century B.C.": [
            "Pindaric ode",
            "Pandaring ode",
            "pen written ode",
            "pinching ode"
        ]
    },
    {
        "A stanza or poem consisting of four lines. Lines 2 and 4 must rhyme while having a similar number of syllables.": [
            "Quatrain",
            "cubed stanza",
            "multi ode",
            "double sonnet"
        ]
    },
    {
        "A poem that has the repetition of the same or similar sounds of two or more words, often at the end of the line": [
            "rhyme",
            "trance",
            "beauty ode",
            "repetition"
        ]
    },
    {
        "A type of poetry consisting of stanzas having seven lines in iambic pentameter.": [
            "Rhyme royal",
            "scribe",
            "Visual ode",
            "per line"
        ]
    },
    {
        "A poem about nature and love while having emphasis on the personal experience.": [
            "romanticism",
            "thoreau",
            "supertramp",
            "rogue"
        ]
    },
    {
        "A lyrical poem of French origin having 10 or 13 lines with two rhymes and with the opening phrase repeated twice as the refrain.": [
            "Rondeau",
            "Cacophony",
            "Gobbledygook",
            "momentum"
        ]
    },
    {
        "A short Japanese style poem, similar to haiku in structure that treats human beings rather than nature: Often in a humorous or satiric way.": [
            "Senryu",
            "Poppycock",
            "Flummox",
            "macrosmatic"
        ]
    },
    {
        "A poem consisting of six six-line stanzas and a three-line envoy. The end words of the first stanza are repeated in varied order as end words in the other stanzas and also recur in the envoy.": [
            "Sestina",
            "entry",
            "Shakespearean",
            "quire"
        ]
    },
    {
        "A 14-line sonnet consisting of three quatrains of a b a b c d c d e f e f followed by a couplet, g g. They generally use iambic pentameter.": [
            "Shakespearean",
            "xertz",
            "salopettes",
            "oxter"
        ]
    },
    {
        "Poetry written in the form of an object. This is a type of concrete poetry.": [
            "shape",
            "descriptive",
            "jentacular",
            "bibble"
        ]
    },
    {
        "": [
            "Sestina",
            "entry",
            "Shakespearean",
            "quire"
        ]
    },
    {
        "A lyric poem that consists of 14 lines which usually have one or more conventional rhyme schemes.": [
            "sonnet",
            "nudiustertian",
            "Shakespearean",
            "pauciloquent"
        ]
    },
    {
        "This form is seen as the bridging between literary and musical composition in which the phonetics of human speech are used to create a poem.": [
            "sound",
            "performance",
            "welter",
            "yonder"
        ]
    },
    {
        "A Japanese poem of five lines, the first and third composed of five syllables and the other seven.": [
            "tanka",
            "muggle",
            "totes",
            "senryu"
        ]
    },
    {
        "A type of poetry consisting of 10 or 11 syllable lines arranged in three-line tercets.": [
            "Terza Rima",
            "entry",
            "Villanelle",
            "quire"
        ]
    },
    {
        "A 19-line poem consisting of five tercets and a final quatrain on two rhymes. The first and third lines of the first tercet repeat alternately as a refrain closing the succeeding stanzas and joined as the final couplet of the quatrain.": [
            "Villanelle",
            "quad tercet",
            "sonnet solo",
            "fenced"
        ]
    },
    {
        "A lengthy lyric poem typically of a serious or meditative nature and having an elevated style and formal stanza structure.": [
            "Ode",
            "torus",
            "dynamic",
            "Sound"
        ]
    }
];

// Route the incoming request based on type (LaunchRequest, IntentRequest,
// etc.) The JSON body of the request is provided in the event parameter.
exports.handler = function (event, context) {
    try {
        console.log("event.session.application.applicationId=" + event.session.application.applicationId);

        /**
         * Uncomment this if statement and populate with your skill's application ID to
         * prevent someone else from configuring a skill that sends requests to this function.
         */

//     if (event.session.application.applicationId !== "amzn1.echo-sdk-ams.app.05aecccb3-1461-48fb-a008-822ddrt6b516") {
//         context.fail("Invalid Application ID");
//      }

        if (event.session.new) {
            onSessionStarted({requestId: event.request.requestId}, event.session);
        }

        if (event.request.type === "LaunchRequest") {
            onLaunch(event.request,
                event.session,
                function callback(sessionAttributes, speechletResponse) {
                    context.succeed(buildResponse(sessionAttributes, speechletResponse));
                });
        } else if (event.request.type === "IntentRequest") {
            onIntent(event.request,
                event.session,
                function callback(sessionAttributes, speechletResponse) {
                    context.succeed(buildResponse(sessionAttributes, speechletResponse));
                });
        } else if (event.request.type === "SessionEndedRequest") {
            onSessionEnded(event.request, event.session);
            context.succeed();
        }
    } catch (e) {
        context.fail("Exception: " + e);
    }
};

/**
 * Called when the session starts.
 */
function onSessionStarted(sessionStartedRequest, session) {
    console.log("onSessionStarted requestId=" + sessionStartedRequest.requestId
        + ", sessionId=" + session.sessionId);

    // add any session init logic here
}

/**
 * Called when the user invokes the skill without specifying what they want.
 */
function onLaunch(launchRequest, session, callback) {
    console.log("onLaunch requestId=" + launchRequest.requestId
        + ", sessionId=" + session.sessionId);

    getWelcomeResponse(callback);
}

/**
 * Called when the user specifies an intent for this skill.
 */
function onIntent(intentRequest, session, callback) {
    console.log("onIntent requestId=" + intentRequest.requestId
        + ", sessionId=" + session.sessionId);

    var intent = intentRequest.intent,
        intentName = intentRequest.intent.name;

    // handle yes/no intent after the user has been prompted
    if (session.attributes && session.attributes.userPromptedToContinue) {
        delete session.attributes.userPromptedToContinue;
        if ("AMAZON.NoIntent" === intentName) {
            handleFinishSessionRequest(intent, session, callback);
        } else if ("AMAZON.YesIntent" === intentName) {
            handleRepeatRequest(intent, session, callback);
        }
    }

    // dispatch custom intents to handlers here
    if ("AnswerIntent" === intentName) {
        handleAnswerRequest(intent, session, callback);
    } else if ("AnswerOnlyIntent" === intentName) {
        handleAnswerRequest(intent, session, callback);
    } else if ("DontKnowIntent" === intentName) {
        handleAnswerRequest(intent, session, callback);
    } else if ("AMAZON.YesIntent" === intentName) {
        handleAnswerRequest(intent, session, callback);
    } else if ("AMAZON.NoIntent" === intentName) {
        handleAnswerRequest(intent, session, callback);
    } else if ("AMAZON.StartOverIntent" === intentName) {
        getWelcomeResponse(callback);
    } else if ("AMAZON.RepeatIntent" === intentName) {
        handleRepeatRequest(intent, session, callback);
    } else if ("AMAZON.HelpIntent" === intentName) {
        handleGetHelpRequest(intent, session, callback);
    } else if ("AMAZON.StopIntent" === intentName) {
        handleFinishSessionRequest(intent, session, callback);
    } else if ("AMAZON.CancelIntent" === intentName) {
        handleFinishSessionRequest(intent, session, callback);
    } else {
        throw "Invalid intent";
    }
}

/**
 * Called when the user ends the session.
 * Is not called when the skill returns shouldEndSession=true.
 */
function onSessionEnded(sessionEndedRequest, session) {
    console.log("onSessionEnded requestId=" + sessionEndedRequest.requestId
        + ", sessionId=" + session.sessionId);

    // Add any cleanup logic here
}

// ------- Skill specific business logic -------

var ANSWER_COUNT = 4;
var GAME_LENGTH = 10;
var CARD_TITLE = "Forms of Poetry Trivia"; // Be sure to change this for your skill.

function getWelcomeResponse(callback) {
    var sessionAttributes = {},
        speechOutput = "I will ask you " + GAME_LENGTH.toString()
            + " questions, try to get as many right as you can. Just say the number of the answer. Let's begin. ",
        shouldEndSession = false,

        gameQuestions = populateGameQuestions(),
        correctAnswerIndex = Math.floor(Math.random() * (ANSWER_COUNT)), // Generate a random index for the correct answer, from 0 to 3
        roundAnswers = populateRoundAnswers(gameQuestions, 0, correctAnswerIndex),

        currentQuestionIndex = 0,
        spokenQuestion = Object.keys(questions[gameQuestions[currentQuestionIndex]])[0],
        repromptText = "Question 1. " + spokenQuestion + " ",

        i, j;

    for (i = 0; i < ANSWER_COUNT; i++) {
        repromptText += (i+1).toString() + ". " + roundAnswers[i] + ". "
    }
    speechOutput += repromptText;
    sessionAttributes = {
        "speechOutput": repromptText,
        "repromptText": repromptText,
        "currentQuestionIndex": currentQuestionIndex,
        "correctAnswerIndex": correctAnswerIndex + 1,
        "questions": gameQuestions,
        "score": 0,
        "correctAnswerText":
            questions[gameQuestions[currentQuestionIndex]][Object.keys(questions[gameQuestions[currentQuestionIndex]])[0]][0]
    };
    callback(sessionAttributes,
        buildSpeechletResponse(CARD_TITLE, speechOutput, repromptText, shouldEndSession));
}

function populateGameQuestions() {
    var gameQuestions = [];
    var indexList = [];
    var index = questions.length;

    if (GAME_LENGTH > index){
        throw "Invalid Game Length.";
    }

    for (var i = 0; i < questions.length; i++){
        indexList.push(i);
    }

    // Pick GAME_LENGTH random questions from the list to ask the user, make sure there are no repeats.
    for (var j = 0; j < GAME_LENGTH; j++){
        var rand = Math.floor(Math.random() * index);
        index -= 1;

        var temp = indexList[index];
        indexList[index] = indexList[rand];
        indexList[rand] = temp;
        gameQuestions.push(indexList[index]);
    }

    return gameQuestions;
}

function populateRoundAnswers(gameQuestionIndexes, correctAnswerIndex, correctAnswerTargetLocation) {
    // Get the answers for a given question, and place the correct answer at the spot marked by the
    // correctAnswerTargetLocation variable. Note that you can have as many answers as you want but
    // only ANSWER_COUNT will be selected.
    var answers = [],
        answersCopy = questions[gameQuestionIndexes[correctAnswerIndex]][Object.keys(questions[gameQuestionIndexes[correctAnswerIndex]])[0]],
        temp, i;

    var index = answersCopy.length;

    if (index < ANSWER_COUNT){
        throw "Not enough answers for question.";
    }

    // Shuffle the answers, excluding the first element.
    for (var j = 1; j < answersCopy.length; j++){
        var rand = Math.floor(Math.random() * (index - 1)) + 1;
        index -= 1;

        var temp = answersCopy[index];
        answersCopy[index] = answersCopy[rand];
        answersCopy[rand] = temp;
    }

    // Swap the correct answer into the target location
    for (i = 0; i < ANSWER_COUNT; i++) {
        answers[i] = answersCopy[i];
    }
    temp = answers[0];
    answers[0] = answers[correctAnswerTargetLocation];
    answers[correctAnswerTargetLocation] = temp;
    return answers;
}

function handleAnswerRequest(intent, session, callback) {
    var speechOutput = "";
    var sessionAttributes = {};
    var gameInProgress = session.attributes && session.attributes.questions;
    var answerSlotValid = isAnswerSlotValid(intent);
    var userGaveUp = intent.name === "DontKnowIntent";

    if (!gameInProgress) {
        // If the user responded with an answer but there is no game in progress, ask the user
        // if they want to start a new game. Set a flag to track that we've prompted the user.
        sessionAttributes.userPromptedToContinue = true;
        speechOutput = "There is no game in progress. Do you want to start a new game? ";
        callback(sessionAttributes,
            buildSpeechletResponse(CARD_TITLE, speechOutput, speechOutput, false));
    } else if (!answerSlotValid && !userGaveUp) {
        // If the user provided answer isn't a number > 0 and < ANSWER_COUNT,
        // return an error message to the user. Remember to guide the user into providing correct values.
        var reprompt = session.attributes.speechOutput;
        var speechOutput = "Your answer must be a number between 1 and " + ANSWER_COUNT + ". " + reprompt;
        callback(session.attributes,
            buildSpeechletResponse(CARD_TITLE, speechOutput, reprompt, false));
    } else {
        var gameQuestions = session.attributes.questions,
            correctAnswerIndex = parseInt(session.attributes.correctAnswerIndex),
            currentScore = parseInt(session.attributes.score),
            currentQuestionIndex = parseInt(session.attributes.currentQuestionIndex),
            correctAnswerText = session.attributes.correctAnswerText;

        var speechOutputAnalysis = "";

        if (answerSlotValid && parseInt(intent.slots.Answer.value) == correctAnswerIndex) {
            currentScore++;
            speechOutputAnalysis = "correct. ";
        } else {
            if (!userGaveUp) {
                speechOutputAnalysis = "wrong. ";
            }
            speechOutputAnalysis += "The correct answer is " + correctAnswerIndex + ": " + correctAnswerText + ". ";
        }
        // if currentQuestionIndex is 4, we've reached 10 questions (zero-indexed) and can exit the game session
        if (currentQuestionIndex == GAME_LENGTH - 1) {
            speechOutput = userGaveUp ? "" : "That answer is ";
            speechOutput += speechOutputAnalysis + "You got " + currentScore.toString() + " out of "
                + GAME_LENGTH.toString() + " questions correct. Thank you for playing!";
            callback(session.attributes,
                buildSpeechletResponse(CARD_TITLE, speechOutput, "", true));
        } else {
            currentQuestionIndex += 1;
            var spokenQuestion = Object.keys(questions[gameQuestions[currentQuestionIndex]])[0];
            // Generate a random index for the correct answer, from 0 to 3
            correctAnswerIndex = Math.floor(Math.random() * (ANSWER_COUNT));
            var roundAnswers = populateRoundAnswers(gameQuestions, currentQuestionIndex, correctAnswerIndex),

                questionIndexForSpeech = currentQuestionIndex + 1,
                repromptText = "Question " + questionIndexForSpeech.toString() + ". " + spokenQuestion + " ";
            for (var i = 0; i < ANSWER_COUNT; i++) {
                repromptText += (i+1).toString() + ". " + roundAnswers[i] + ". "
            }
            speechOutput += userGaveUp ? "" : "That answer is ";
            speechOutput += speechOutputAnalysis + "Your score is " + currentScore.toString() + ". " + repromptText;

            sessionAttributes = {
                "speechOutput": repromptText,
                "repromptText": repromptText,
                "currentQuestionIndex": currentQuestionIndex,
                "correctAnswerIndex": correctAnswerIndex + 1,
                "questions": gameQuestions,
                "score": currentScore,
                "correctAnswerText":
                    questions[gameQuestions[currentQuestionIndex]][Object.keys(questions[gameQuestions[currentQuestionIndex]])[0]][0]
            };
            callback(sessionAttributes,
                buildSpeechletResponse(CARD_TITLE, speechOutput, repromptText, false));
        }
    }
}

function handleRepeatRequest(intent, session, callback) {
    // Repeat the previous speechOutput and repromptText from the session attributes if available
    // else start a new game session
    if (!session.attributes || !session.attributes.speechOutput) {
        getWelcomeResponse(callback);
    } else {
        callback(session.attributes,
            buildSpeechletResponseWithoutCard(session.attributes.speechOutput, session.attributes.repromptText, false));
    }
}

function handleGetHelpRequest(intent, session, callback) {
    // Provide a help prompt for the user, explaining how the game is played. Then, continue the game
    // if there is one in progress, or provide the option to start another one.

    // Set a flag to track that we're in the Help state.
    session.attributes.userPromptedToContinue = true;

    // Do not edit the help dialogue. This has been created by the Alexa team to demonstrate best practices.

    var speechOutput = "I will ask you " + GAME_LENGTH + " multiple choice questions. Respond with the number of the answer. "
        + "For example, say one, two, three, or four. To start a new game at any time, say, start game. "
        + "To repeat the last question, say, repeat. "
        + "Would you like to keep playing?",
        repromptText = "To give an answer to a question, respond with the number of the answer . "
        + "Would you like to keep playing?";
        var shouldEndSession = false;
    callback(session.attributes,
        buildSpeechletResponseWithoutCard(speechOutput, repromptText, shouldEndSession));
}

function handleFinishSessionRequest(intent, session, callback) {
    // End the session with a "Good bye!" if the user wants to quit the game
    callback(session.attributes,
        buildSpeechletResponseWithoutCard("Good bye!", "", true));
}

function isAnswerSlotValid(intent) {
    var answerSlotFilled = intent.slots && intent.slots.Answer && intent.slots.Answer.value;
    var answerSlotIsInt = answerSlotFilled && !isNaN(parseInt(intent.slots.Answer.value));
    return answerSlotIsInt && parseInt(intent.slots.Answer.value) < (ANSWER_COUNT + 1) && parseInt(intent.slots.Answer.value) > 0;
}

// ------- Helper functions to build responses -------


function buildSpeechletResponse(title, output, repromptText, shouldEndSession) {
    return {
        outputSpeech: {
            type: "PlainText",
            text: output
        },
        card: {
            type: "Simple",
            title: title,
            content: output
        },
        reprompt: {
            outputSpeech: {
                type: "PlainText",
                text: repromptText
            }
        },
        shouldEndSession: shouldEndSession
    };
}

function buildSpeechletResponseWithoutCard(output, repromptText, shouldEndSession) {
    return {
        outputSpeech: {
            type: "PlainText",
            text: output
        },
        reprompt: {
            outputSpeech: {
                type: "PlainText",
                text: repromptText
            }
        },
        shouldEndSession: shouldEndSession
    };
}

function buildResponse(sessionAttributes, speechletResponse) {
    return {
        version: "1.0",
        sessionAttributes: sessionAttributes,
        response: speechletResponse
    };
}
