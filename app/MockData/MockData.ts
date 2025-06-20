export const matches: Record<string, any> = {
    '12345678': {
        deadlock_id: '12345678',
        length: 2345,
        date: Math.floor(Date.now() / 1000) - 86400,
        SF_team: ['10', '11', '12', '13', '14', '15'],
        AH_team: ['16', '17', '19', '1', '20', '25'],
        victor: '1',
        average_rank: '/images/ranks/52.png'
    },
    '12345679': {
        deadlock_id: '12345679',
        length: 2122,
        date: Math.floor(Date.now() / 1000) - 9000,
        SF_team: ['16', '2', '25', '4', '50', '11'],
        AH_team: ['13', '52', '8', '7', '12', '15'],
        victor: '1',
        average_rank: '/images/ranks/43.png'
    },
    '12345680': {
        deadlock_id: '12345680',
        length: 1856,
        date: Math.floor(Date.now() / 1000) - 10000,
        SF_team: ['58', '3', '54', '11', '7', '10'],
        AH_team: ['6', '35', '31', '48', '60', '12'],
        victor: '0',
        average_rank: '/images/ranks/112.png'
    }
}

export const players: Record<string, any> = {
    "12345678": {
        id: "12345678",
        name: "Cool_Gamer11",
        icon: "/images/avatars/avatar1.png",
        region: "EU",
        lastMatchAverageRank: {
            name: "Gold",
            image: "/images/ranks/44.png"
        }
    },
    "12345679": {
        id: "12345679",
        name: "Cool_Gamer12",
        icon: "/images/avatars/avatar2.png",
        region: "NA",
        lastMatchAverageRank: {
            name: "Diamond",
            image: "/images/ranks/43.png"
        }
    }
}