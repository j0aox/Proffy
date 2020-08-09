const db = require('./db.js'); // o ./ serve para pegar a pasta atual
const createProffy = require('./createProffy.js');

db.then(async (db) => { //
    // Inserir dados
    proffyValue = {
        name: "João Amador", 
        avatar: "https://avatars1.githubusercontent.com/u/40318112?s=460&u=378b876179ecaeeaafe4af93a7e4416c46be8e16&v=4",
        whatsapp: "84996663657", 
        bio: "Entusiasta das melhores tecnologias de química avançada.<br><br>Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.", 
    }

    classValue = {
        //subject: "Química", foi trcado pela linha de baixo
        subject: 1, 
        cost: "40", 
        // o proffy id virá pelo banco de dados
    }

    classScheduleValues = [
        // class_id virá pelo banco de daods, após cadastramos a class
        {
            weekday: 1,
            time_from: 720,
            time_to: 1220
        },
        {
            weekday: 0,
            time_from: 520,
            time_to: 1220
        }
    ]

    //await createProffy(db, {proffyValue, classValue, classScheduleValues}); // talvez tenha um aqui (classScheduleValue)  

    // Consultar os dados inseridos 

    // todos os proffys
    const selectedProffys = await db.all("SELECT * FROM proffys"); // selecione todos da tabela proffys
    //console.log(selectedProffys);

    // consultar as classes de um determinado professor 
    // e trazer junto os dados do professor 
    const selectClassesAndProffys = await db.all(`
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)  
        WHERE classes.proffy_id = 1;
    `)
    //console.log(selectClassesAndProffys);

    // o horário que a pessoa trabalha, por exemplo, é das 8h - 18h
    // o horário do time_from (8h) precisa ser antes ou igual ao horário solicitado
    // o time_to precisa ser acima 
    const selectClassesSchedules = await db.all(`
        SELECT class_schedule.*
        FROM class_schedule
        WHERE class_schedule.class_id = "1"
        AND class_schedule.weekday = "0"
        AND class_schedule.time_from <= "1300"
        AND class_schedule.time_to > "1300"
    `)
    //console.log(selectClassesSchedules);
    
})