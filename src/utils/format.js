const subjects = [
    "Artes",
    "Biologia",
    "Ciências",
    "Educação física",
    "Física", 
    "Geografia",
    "História",
    "Matemática",
    "Português",
    "Química",
]

const weekdays = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira", 
    "Sexta-feira",
    "Sábado",
]

function getSubject(subjectNumber) {
    const position = +subjectNumber -1; // +subjectNumber -1 = um número - 1
    return subjects[position];
}

function convertHoursToMinutes(time) {
    //const [convertHoursToMinutes] = time.split(":");
    const [hour, minutes] = time.split(":");
    return Number((hour * 60) + minutes); // retorna em formato de número Number
}

module.exports = {
    subjects,
    weekdays,
    getSubject,
    convertHoursToMinutes
}