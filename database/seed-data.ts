
interface SeedData {
    entries: SeedEntry[];
}

interface SeedEntry {
    description: string;
    status: string;
    createdAt: number;
}

export const seedData: SeedData = {
    entries: [        
        {
            description: 'Pendiente: Elit pariatur officia nulla aliqua ullamco elit id.',
            status: 'pending',
            createdAt: Date.now()
        },
        {
            description: 'En-Progreso: Quis sunt laborum id non consectetur incididunt sit cillum sit aliqua est esse.',
            status: 'in-progress',
            createdAt: Date.now() - 1000000
        },
        {
            description: 'Terminada: Tempor ea dolore ex adipisicing eiusmod cupidatat anim aliqua pariatur.',
            status: 'finished',
            createdAt: Date.now() -100000
        }
    ]
}