import faker from "faker"

function createFakeRow(index) {

    return {
        id: index,
        nombres: faker.name(),
        apellidos: faker.firstname(),
        edad: 16
    }

}

export default function createRowData(count) {
    
    return [...Array(count).keys()].map(i => createFakeRow(i))

}