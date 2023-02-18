const tickets = [
    {
        "sum": 5000,
        "sym": [
            [
                9,
                true
            ],
            [
                1,
                true
            ],
            [
                2,
                true
            ],
            [
                3,
                true
            ],
            [
                4,
                true
            ]
        ],
        "ticket": "GR100080835-50",
        "win": 0
    },
    {
        "sum": 5000,
        "sym": [
            [
                10,
                false
            ],
            [
                6,
                true
            ],
            [
                7,
                true
            ],
            [
                8,
                true
            ],
            [
                2,
                false
            ]
        ],
        "ticket": "GR100080836-50",
        "win": 0
    },
    {
        "sum": 5000,
        "sym": [
            [
                11,
                false
            ],
            [
                6,
                false
            ],
            [
                6,
                true
            ],
            [
                6,
                false
            ],
            [
                6,
                false
            ]
        ],
        "ticket": "GR100080837-50",
        "win": 0
    }
];

export const getTickets = () => {
    return tickets
}
const sunBonusGame = {
    action: "bet-reply",
    data: {
        balance: 929463857,
        prize: 2573500,
        tickets: [
            {
                bonus: "sun",
                grande: true,
                sum: 0,
                turns: [
                    {
                        e: 3,
                        s: 3,
                        v: [
                            [
                                0,
                                2,
                                100
                            ],
                            [
                                2,
                                0,
                                20
                            ],
                            [
                                2,
                                1,
                                100
                            ],
                            [
                                2,
                                2,
                                10
                            ],
                            [
                                1,
                                1,
                                50
                            ]
                        ]
                    },
                    {
                        e: 3,
                        s: 3,
                        v: [
                            [
                                1,
                                3,
                                10
                            ],
                            [
                                2,
                                3,
                                50
                            ],
                            [
                                1,
                                4,
                                50
                            ]
                        ]
                    },
                    {
                        e: 3,
                        s: 3,
                        v: [
                            [
                                0,
                                1,
                                5000,
                                "mini"
                            ],
                            [
                                0,
                                3,
                                20
                            ]
                        ]
                    },
                    {
                        e: 2,
                        s: 3,
                        v: null
                    },
                    {
                        e: 1,
                        s: 2,
                        v: null
                    },
                    {
                        e: 0,
                        s: 1,
                        v: null
                    }
                ],
                win: 2569500
            },
            {
                sum: 1000,
                sym: [
                    [
                        7,
                        true
                    ],
                    [
                        6,
                        false
                    ],
                    [
                        7,
                        true
                    ],
                    [
                        7,
                        true
                    ],
                    [
                        8,
                        false
                    ]
                ],
                ticket: "AB597435009-10",
                win: 4000
            },
            {
                sum: 1000,
                sym: [
                    [
                        2,
                        false
                    ],
                    [
                        1,
                        false
                    ],
                    [
                        4,
                        false
                    ],
                    [
                        3,
                        true,
                        {
                            sun: 1500000,
                            type: "major"
                        }
                    ],
                    [
                        5,
                        false
                    ]
                ],
                ticket: "AB425463531-10",
                win: 0
            },
            {
                sum: 1000,
                sym: [
                    [
                        4,
                        false
                    ],
                    [
                        1,
                        false
                    ],
                    [
                        2,
                        false
                    ],
                    [
                        6,
                        false
                    ],
                    [
                        3,
                        false
                    ]
                ],
                ticket: "AB599715878-10",
                win: 0
            }
        ]
    }
};
export const getApi = () => {
    return sunBonusGame;
};

const freeSpineGame = [
    {
        action: "bet",
        data: {
            balance: 929463857,
            prize: 2573500,
            tickets: [
                {
                    sum: 1000,
                    sym: [
                        [
                            2,
                            true
                        ],
                        [
                            5,
                            false
                        ],
                        [
                            3,
                            true
                        ],
                        [
                            3,
                            true
                        ],
                        [
                            7,
                            false
                        ]
                    ],
                    ticket: "AB597435009-10",
                    win: 4000
                },
                {
                    sum: 1000,
                    sym: [
                        [
                            8,
                            false
                        ],
                        [
                            5,
                            false
                        ],
                        [
                            6,
                            false
                        ],
                        [
                            2,
                            true,
                            {
                                sun: 1500000,
                                type: "major"
                            }
                        ],
                        [
                            1,
                            false
                        ]
                    ],
                    ticket: "AB425463531-10",
                    win: 0
                },
                {
                    sum: 1000,
                    sym: [
                        [
                            2,
                            false
                        ],
                        [
                            5,
                            false
                        ],
                        [
                            3,
                            false
                        ],
                        [
                            7,
                            false
                        ],
                        [
                            8,
                            false
                        ]
                    ],
                    ticket: "AB599715878-10",
                    win: 0
                }
            ]
        }
    },
    {
        action: "free",
        data: {
            count: 1,
            balance: 929463857,
            prize: 2573500,
            tickets: [
                {
                    sum: 1000,
                    sym: [
                        [
                            6,
                            true
                        ],
                        [
                            4,
                            false
                        ],
                        [
                            5,
                            true
                        ],
                        [
                            3,
                            true
                        ],
                        [
                            2,
                            false
                        ]
                    ],
                    ticket: "AB597435009-10",
                    win: 4000
                },
                {
                    sum: 1000,
                    sym: [
                        [
                            2,
                            false
                        ],
                        [
                            8,
                            false
                        ],
                        [
                            4,
                            false
                        ],
                        [
                            1,
                            true,
                            {
                                sun: 1500000,
                                type: "major"
                            }
                        ],
                        [
                            5,
                            false
                        ]
                    ],
                    ticket: "AB425463531-10",
                    win: 0
                },
                {
                    sum: 1000,
                    sym: [
                        [
                            4,
                            false
                        ],
                        [
                            1,
                            false
                        ],
                        [
                            2,
                            false
                        ],
                        [
                            6,
                            false
                        ],
                        [
                            3,
                            false
                        ]
                    ],
                    ticket: "AB599715878-10",
                    win: 0
                }
            ]
        }
    },
    {
        action: "free",
        data: {
            count: 0,
            balance: 929463857,
            prize: 2573500,
            tickets: [
                {
                    sum: 1000,
                    sym: [
                        [
                            8,
                            false
                        ],
                        [
                            7,
                            false
                        ],
                        [
                            7,
                            false
                        ],
                        [
                            5,
                            false
                        ],
                        [
                            1,
                            false
                        ]
                    ],
                    ticket: "AB597435009-10",
                    win: 4000
                },
                {
                    sum: 1000,
                    sym: [
                        [
                            5,
                            false
                        ],
                        [
                            1,
                            false
                        ],
                        [
                            4,
                            false
                        ],
                        [
                            1,
                            false,
                            {
                                sun: 1500000,
                                type: "major"
                            }
                        ],
                        [
                            2,
                            false
                        ]
                    ],
                    ticket: "AB425463531-10",
                    win: 0
                },
                {
                    sum: 1000,
                    sym: [
                        [
                            4,
                            false
                        ],
                        [
                            1,
                            false
                        ],
                        [
                            2,
                            false
                        ],
                        [
                            6,
                            false
                        ],
                        [
                            3,
                            false
                        ]
                    ],
                    ticket: "AB599715878-10",
                    win: 0
                }
            ]
        }
    }
];
export const getFreeApi = () => {
    return freeSpineGame;
};