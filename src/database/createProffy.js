// para o await funcionar, é obrigado colocar async antes da function
module.exports = async function(db, { proffyValue, classValue, classScheduleValues }) {
    // inserir dados na table de proffys
    const insertedProffy = await db.run(`
        INSERT INTO proffys (
            name,
            avatar,
            whatsapp,
            bio
        ) VALUES (
            "${proffyValue.name}",
            "${proffyValue.avatar}",
            "${proffyValue.whatsapp}",
            "${proffyValue.bio}"
        );
    `); // o await serve para esperar db.run() ser executado 

    // pega o ID e coloca na variavel proffy_id
    const proffy_id = insertedProffy.lastID;

    // Innseriri dados na tabela classes
    const insertedClass = await db.run(`
            INSERT INTO classes (
                subject,
                cost,
                proffy_id
            ) VALUES (
                "${classValue.subject}",
                "${classValue.cost}",
                "${proffy_id}"
            );
    `)

    // pega o ID e coloca na variavel proffy_id
    const class_id = insertedClass.lastID;

    // Inserir dados na tabela class_schedule
    // o método map cria uma nova matriz com os resultados da chamada de uma função para cada elemento da matriz
    const insertedAllClassScheduleValues = classScheduleValues.map((classScheduleValue) => {
        return db.run(`
            INSERT INTO class_schedule (
                class_id,
                weekday,
                time_from,
                time_to
            ) VALUES (
                "${class_id}",
                "${classScheduleValue.weekday}",
                "${classScheduleValue.time_from}",
                "${classScheduleValue.time_to}"
            )
        `);
    })

    // Aqui vou executar todos os db.runs() das class_schedules
    await Promise.all(insertedAllClassScheduleValues);
}