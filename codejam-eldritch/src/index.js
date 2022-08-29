import { blueCards, brownCards, greenCards } from "./data/mythicCards"
import { ancientsData } from "./data/ancients"

let currentAncient;
let stageOne = []
let stageTwo = []
let stageThree =[]

const lastCardElement = document.querySelector('.last-card');
const submitElement = document.querySelector('.select-submit')
const ancientSelectElement = document.querySelector('.ancient-select');
const difficultySelectElemnt = document.querySelector('.difficulty-select');
const newCardElement = document.querySelector('.new-card')
const ancientImgElement = document.querySelector('.ancient-img')

//Кнопка замешивания колоды

submitElement.addEventListener('click', function(e) {
    e.preventDefault();
    stageOne = []
    stageTwo = []
    stageThree =[]
    lastCardElement.classList.add('hidden')
    document.querySelector('.ancient').classList.remove('hidden')
    document.querySelector('.status-table').classList.remove('hidden')
    document.querySelector('.back-wrapper').classList.remove('hidden')
    newCardElement.classList.remove('hidden')
    currentAncient = ancientsData[ancientSelectElement.value]
    ancientImgElement.src = `../assets/Ancients/${currentAncient.name.replace(currentAncient.name[0], currentAncient.name[0].toUpperCase())}.png`
    const greenDeck = createDeck(greenCards, 'greenCards', difficultySelectElemnt.value)
    const brownDeck = createDeck(brownCards, 'brownCards', difficultySelectElemnt.value)
    const blueDeck = createDeck(blueCards, 'blueCards', difficultySelectElemnt.value)
    const [green1, green2, green3] = sortDeck(greenDeck, 'greenCards')
    const [brown1, brown2, brown3] = sortDeck(brownDeck, 'brownCards')
    const [blue1, blue2, blue3] = sortDeck(blueDeck, 'blueCards')
    const tempOne = [...green1,...brown1,...blue1]
    while (stageOne.length < tempOne.length) {
        let x = randomNum(tempOne.length)
        if(!stageOne.includes(tempOne[x])) stageOne.push(tempOne[x])
    }
    const tempTwo = [...green2,...brown2,...blue2]
    while (stageTwo.length < tempTwo.length) {
        let x = randomNum(tempTwo.length)
        if(!stageTwo.includes(tempTwo[x])) stageTwo.push(tempTwo[x])
    }
    const tempThree = [...green3,...brown3,...blue3]
    while (stageThree.length < tempThree.length) {
        let x = randomNum(tempThree.length)
        if(!stageThree.includes(tempThree[x])) stageThree.push(tempThree[x])
    }

    document.querySelector('.green1').textContent = `${currentAncient.firstStage.greenCards}`
    document.querySelector('.green2').textContent = `${currentAncient.secondStage.greenCards}`
    document.querySelector('.green3').textContent = `${currentAncient.thirdStage.greenCards}`
    document.querySelector('.brown1').textContent = `${currentAncient.firstStage.brownCards}`
    document.querySelector('.brown2').textContent = `${currentAncient.secondStage.brownCards}`
    document.querySelector('.brown3').textContent = `${currentAncient.thirdStage.brownCards}`
    document.querySelector('.blue1').textContent = `${currentAncient.firstStage.blueCards}`
    document.querySelector('.blue2').textContent = `${currentAncient.secondStage.blueCards}`
    document.querySelector('.blue3').textContent = `${currentAncient.thirdStage.blueCards}`
})

//Функция для генерации случайных чисел для перемешивания колоды

const randomNum = function (length) {
    return Math.round(Math.random()*(length-1))
 }


//Функция для создания базовой колоды с сортировкой по цвету и сложности

const createDeck = function (arr, prop, diff) {
    const filterCards = []
    const cardsTotal = currentAncient.firstStage[`${prop}`] + currentAncient.secondStage[`${prop}`] + currentAncient.thirdStage[`${prop}`]
    const easyCards = arr.filter(el => el.difficulty === 'easy')
    const normalCards = arr.filter(el => el.difficulty === 'normal')
    const hardCards = arr.filter(el => el.difficulty === 'hard')
    if(diff === 'veryEasy') {
        const cardsPull = [...easyCards]
    while (cardsPull.length < cardsTotal) {
        let x = randomNum(normalCards.length)
        if (!cardsPull.includes(normalCards[x])) cardsPull.push(normalCards[x])
    }
    while (filterCards.length < cardsTotal) {
        let x = randomNum(cardsPull.length)
        if (!filterCards.includes(cardsPull[x])) filterCards.push(cardsPull[x])
    }
    }
    if(diff === 'easy') {
        const cardsPull = [...easyCards,...normalCards]
        while (filterCards.length < cardsTotal) {
            let x = randomNum(cardsPull.length)
            if (!filterCards.includes(cardsPull[x])) filterCards.push(cardsPull[x])
        }
    }
    if(diff === 'normal') {
        const cardsPull = [...easyCards,...normalCards,...hardCards]
        while (filterCards.length < cardsTotal) {
            let x = randomNum(cardsPull.length)
            if (!filterCards.includes(cardsPull[x])) filterCards.push(cardsPull[x])
        }
    }
    if(diff === 'hard') {
        const cardsPull = [...normalCards,...hardCards]
        while (filterCards.length < cardsTotal) {
            let x = randomNum(cardsPull.length)
            if (!filterCards.includes(cardsPull[x])) filterCards.push(cardsPull[x])
        }
    }
    if(diff === 'veryHard') {
        const cardsPull = [...hardCards]
    while (cardsPull.length < cardsTotal) {
        let x = randomNum(normalCards.length)
        if (!cardsPull.includes(normalCards[x])) cardsPull.push(normalCards[x])
    }
    while (filterCards.length < cardsTotal) {
        let x = randomNum(cardsPull.length)
        if (!filterCards.includes(cardsPull[x])) filterCards.push(cardsPull[x])
    }
    }
    return filterCards
}

//Функция для сортировки колоды по фазам

const sortDeck = function(arr, color) {
    let x = arr
    const z= x.splice(-currentAncient.thirdStage[`${color}`], currentAncient.thirdStage[`${color}`]);
    const v = x.splice(-currentAncient.secondStage[`${color}`], currentAncient.secondStage[`${color}`]);
    const c = x.slice();
    return [c,v,z]
}

//Кнопка для перелистывания колоды

newCardElement.addEventListener('click', function(){
    if(stageThree.length > 0) {
    lastCardElement.classList.add('hidden')
    newCardElement.classList.add('transition')
    newCardElement.classList.add('move')
    lastCardElement.src = '../assets/mythicCardBackground.png'
    setTimeout(function(){
        newCardElement.classList.remove('transition')
        newCardElement.classList.add('hidden')
        newCardElement.classList.remove('move') 
        lastCardElement.classList.remove('hidden')
        newCardElement.classList.remove('hidden')
    }, 300)
    setTimeout(function(){
        lastCardElement.classList.add('transition')
        lastCardElement.classList.add('rotate')  
    }, 600)
    setTimeout(function(){
        nextCard();
        lastCardElement.classList.remove('rotate')
    }, 900)
    lastCardElement.classList.remove('transition')
}
})

//Функция для пролистывания колоды

const nextCard = function() {
   if(stageOne.length>0) {
        const x = stageOne.splice(0,1)
        const y = document.querySelector(`.${x[0].color}1`)
        const z = Number(y.textContent)
        y.textContent = `${z-1}`
        lastCardElement.src = `..${x[0].cardFace.split('..')[1]}`
    } else if(stageOne.length === 0 && stageTwo.length >0) {
        const x = stageTwo.splice(0,1)
        const y = document.querySelector(`.${x[0].color}2`)
        const z = Number(y.textContent)
        y.textContent = `${z-1}`
        lastCardElement.src = `..${x[0].cardFace.split('..')[1]}`
    } else if(stageOne.length === 0 && stageTwo.length === 0 && stageThree.length >0) {
        const x = stageThree.splice(0,1)
        const y = document.querySelector(`.${x[0].color}3`)
        const z = Number(y.textContent)
        y.textContent = `${z-1}`
        lastCardElement.src = `..${x[0].cardFace.split('..')[1]}`
    } 
}