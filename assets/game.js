const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
     question: 'What country has the longest coastline in the world?',
     choice1: 'USA',
     choice2: 'Australia',
     choice3: 'UK',
     choice4: 'Canada',
     answer: 4,
    },
    {
    question: 'What country is the newest in the world to be recognised by the UN?',
    choice1: 'South Sudan',
    choice2: 'UAE',
    choice3: 'Albania',
    choice4: 'Columbia',
    answer: 1,
    },
    {
    question: 'In which UK city would you find the river Clyde?',
    choice1: 'London',
    choice2: 'Glasgow',
    choice3: 'Manchester',
    choice4: 'Devon',
    answer: 2,
    },
    {
    question: 'What is the oldest recorded town in the UK?',
    choice1: 'Windsor',
    choice2: 'Whitechapel',
    choice3: 'Cambridge',
    choice4: 'Colchester',
    answer: 4
    },
    {
    question: 'If you travelled to the city of Volgograd, which country would be in?',
    choice1: 'Croatia',
    choice2: 'Syria',
    choice3: 'Russia',
    choice4: 'Dominican Republic',
    answer: 3,
    },
    {
    question: 'What is the name of the largest river to flow through Paris?',
    choice1: 'The Seine River',
    choice2: 'The River Nile',
    choice3: 'Amazon River',
    choice4: 'Danube River',
    answer: 1,
    },
    {
    question: 'What did Ceylon change its name to in 1972?',
    choice1: 'Indonesia',
    choice2: 'Qatar',
    choice3: 'Sri Lanka',
    choice4: 'Pakistan',
    answer: 3,
    },
    {
    question: 'What is the highest mountain in Britain?',
    choice1: 'Ben Nevis',
    choice2: 'Snowdon',
    choice3: 'Scafell Pike',
    choice4: 'Skiddaw',
    answer: 1,
    },
    {
    question: 'What is the most populous city in the US state of Illinois?',
    choice1: 'Chicago',
    choice2: 'New York',
    choice3: 'San Francisco',
    choice4: 'Los Angeles',
    answer: 1,
    },
    {
    question: 'What continent is Australia a part of?',
    choice1: 'Asia',
    choice2: 'Europe',
    choice3: 'Australasia',
    choice4: 'South America',
    answer: 3,
    }
    ]

const scorePoints = 100
const maxQuestions = 10

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > maxQuestions) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }
    
    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${maxQuestions}`
    progressBarFull.style.width = `${(questionCounter/maxQuestions) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choices => {
    choices.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct'){
            incrementScore(scorePoints)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()