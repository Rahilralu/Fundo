import { PrismaClient } from "@prisma/client";
import { v4 as uuid } from 'uuid';

const prisma = new PrismaClient();

//Create event
export async function createEventService({ title,description,date,location,price,capacity,type,image,createdBy }){
    const eventData = {
        title,
        description,
        date: new Date(date),
        location,
        price : parseFloat(price),
        capacity: parseInt(capacity),
        image: image || '',
        type: type === 'PRIVATE' ? 'PRIVATE' : 'PUBLIC',
        createdBy,
    };

    if(type === 'PRIVATE'){
        eventData.code = uuid().slice(0,8).toUpperCase();
    }

    return await prisma.Event.create({ data: eventData });
}

//Get public events
export async function getPublicEventsService() {
    return await prisma.Event.findMany({
        where: { type: 'PUBLIC' },
        include: {
            user: { select: { id : true , name : true , email : true } },
            _count : { select: { transactions: true }},
        },
        orderBy : { createdAt : "desc" },
    });
}

//Get private events - By primary uuid
export async function getEventByIdService(id){
    return await prisma.Event.findUnique({
        where: { id },
        include: {
            user: {select : { id: true , name: true , email : true }},
            _count: { select: {transactions : true }},
        },
    })
}

//Update event service
export async function updateEventService(id ,userid ,data ,imageUrl){
    const event = await prisma.Event.findUnique({ where : { id } });

    if(!event)throw new Error('NOT FOUND');
    if(event.createdBy !== userid) throw new Error('UNAUTHORIZED');

    return await prisma.Event.update({
        where: { id },
        data: {
        ...(data.title && { title: data.title }),
        ...(data.description && { description: data.description }),
        ...(data.date && { date: new Date(data.date) }),
        ...(data.location && { location: data.location }),
        ...(data.price && { price: parseFloat(data.price) }),
        ...(data.capacity && { capacity: parseInt(data.capacity) }),
        ...(imageUrl && { image: imageUrl }),
        },
    });
}

//Delete event service
export async function deleteEventService(id,userId){
    const event = await prisma.Event.findUnique({ where : { id } });

    if(!event)throw new Error('NOT FOUND');
    if(event.createdBy !== userId)throw new Error('UNAUTHORIZED');

    return await prisma.Event.delete({
        where: { id },
    });
}