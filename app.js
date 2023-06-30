const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const express = require('express');
const socketIO = require('socket.io');
const qrcode = require('qrcode');
const http = require('http');
const fileUpload = require('express-fileupload');
const port = 8000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const mysql = require('mysql2/promise');
const nodeCron = require("node-cron");

// Função para criar conexão com o banco de dados
const createConnection = async () => {
    return await mysql.createConnection({
        host: '212.1.208.101',
        user: 'u896627913_riolargo01',
        password: 'Felipe.91118825',
        database: 'u896627913_riolargo'
    });
}

// Função para atualizar o statusco no banco de dados
const updateStatuscob = async (id) => {
    try {
        const connection = await createConnection();
        const query = 'UPDATE cobranca SET statusco = "enviado" WHERE id = ?';
        const [result] = await connection.execute(query, [id]);
        return result.affectedRows > 0;
    } catch (error) {
        console.error('Erro ao atualizar o statusco:', error);
        return false;
    }
};

// Função para atualizar o statusvd no banco de dados
const updateStatusvd = async (id) => {
    try {
        const connection = await createConnection();
        const query = 'UPDATE controle_os SET statusvd = "enviado" WHERE id = ?';
        const [result] = await connection.execute(query, [id]);
        return result.affectedRows > 0;
    } catch (error) {
        console.error('Erro ao atualizar o statusvd:', error);
        return false;
    }
};
// Função para atualizar o statusdf no banco de dados
const updateStatusdf = async (id) => {
    try {
        const connection = await createConnection();
        const query = 'UPDATE controle_os SET statusdf = "enviado" WHERE id = ?';
        const [result] = await connection.execute(query, [id]);
        return result.affectedRows > 0;
    } catch (error) {
        console.error('Erro ao atualizar o statusdf:', error);
        return false;
    }
};
// Função para atualizar o status1m no banco de dados
const updateStatus1m = async (id) => {
    try {
        const connection = await createConnection();
        const query = 'UPDATE controle_os SET status1m = "enviado" WHERE id = ?';
        const [result] = await connection.execute(query, [id]);
        return result.affectedRows > 0;
    } catch (error) {
        console.error('Erro ao atualizar o status1m:', error);
        return false;
    }
};
// Função para atualizar o status3m no banco de dados
const updateStatus3m = async (id) => {
    try {
        const connection = await createConnection();
        const query = 'UPDATE controle_os SET status3m = "enviado" WHERE id = ?';
        const [result] = await connection.execute(query, [id]);
        return result.affectedRows > 0;
    } catch (error) {
        console.error('Erro ao atualizar o status3m:', error);
        return false;
    }
};
// Função para atualizar o status6m no banco de dados
const updateStatus6m = async (id) => {
    try {
        const connection = await createConnection();
        const query = 'UPDATE controle_os SET status6m = "enviado" WHERE id = ?';
        const [result] = await connection.execute(query, [id]);
        return result.affectedRows > 0;
    } catch (error) {
        console.error('Erro ao atualizar o status6m:', error);
        return false;
    }
};
// Função para atualizar o status12m no banco de dados
const updateStatus12m = async (id) => {
    try {
        const connection = await createConnection();
        const query = 'UPDATE controle_os SET status12m = "enviado" WHERE id = ?';
        const [result] = await connection.execute(query, [id]);
        return result.affectedRows > 0;
    } catch (error) {
        console.error('Erro ao atualizar o status12m:', error);
        return false;
    }
};
// Função para atualizar o statusan no banco de dados
const updateStatusan = async (id) => {
    try {
        const connection = await createConnection();
        const query = 'UPDATE controle_os SET statusan = "enviado" WHERE id = ?';
        const [result] = await connection.execute(query, [id]);
        return result.affectedRows > 0;
    } catch (error) {
        console.error('Erro ao atualizar o statusan:', error);
        return false;
    }
};
// Função para atualizar o statusan no banco de dados GARANTIA
const updateStatusga = async (id) => {
    try {
        const connection = await createConnection();
        const query = 'UPDATE controle_garantia SET statuss = "enviado" WHERE id = ?';
        const [result] = await connection.execute(query, [id]);
        return result.affectedRows > 0;
    } catch (error) {
        console.error('Erro ao atualizar o statuss:', error);
        return false;
    }
};
// Função para atualizar o statusan no banco de dados GARANTIA
const updateStatusgaf = async (id) => {
    try {
        const connection = await createConnection();
        const query = 'UPDATE controle_garantia SET statusf = "enviado" WHERE id = ?';
        const [result] = await connection.execute(query, [id]);
        return result.affectedRows > 0;
    } catch (error) {
        console.error('Erro ao atualizar o statusf:', error);
        return false;
    }
};
// Função para atualizar o statusan no banco de dados pap
const updateStatusag = async (id) => {
    try {
        const connection = await createConnection();
        const query = 'UPDATE controle_pap SET statusen = "enviado" WHERE id = ?';
        const [result] = await connection.execute(query, [id]);
        return result.affectedRows > 0;
    } catch (error) {
        console.error('Erro ao atualizar o statusen:', error);
        return false;
    }
};
// Função para atualizar o statusan no banco de dados pap
const updateStatusco = async (id) => {
    try {
        const connection = await createConnection();
        const query = 'UPDATE controle_pap SET statusco = "enviado" WHERE id = ?';
        const [result] = await connection.execute(query, [id]);
        return result.affectedRows > 0;
    } catch (error) {
        console.error('Erro ao atualizar o statusco:', error);
        return false;
    }
};

// Função para obter os registros de agendamento do banco de dados
const agendamentoZDG0 = async () => {
    try {
        const connection = await createConnection();
        const [rows] = await connection.execute('SELECT * FROM cobranca WHERE statusco IS NULL OR statusco = ""');
        return rows;
    } catch (error) {
        console.error('Erro ao obter os registros de agendamento:', error);
        return [];
    }
};

// Função para obter os registros de agendamento do banco de dados
const agendamentoZDG = async () => {
    try {
        const connection = await createConnection();
        const [rows] = await connection.execute('SELECT * FROM controle_os WHERE statusvd IS NULL OR statusvd = ""');
        return rows;
    } catch (error) {
        console.error('Erro ao obter os registros de agendamento:', error);
        return [];
    }
};
// Função para obter os registros de agendamento do banco de dados
const agendamentoZDG2 = async () => {
    try {
        const connection = await createConnection();
        const [rows] = await connection.execute('SELECT * FROM controle_os WHERE statusdf IS NULL OR statusdf = ""');
        return rows;
    } catch (error) {
        console.error('Erro ao obter os registros de agendamento:', error);
        return [];
    }
};
// Função para obter os registros de agendamento do banco de dados status1m
const agendamentoZDG3 = async () => {
    try {
        const connection = await createConnection();
        const [rows] = await connection.execute('SELECT * FROM controle_os WHERE status1m IS NULL OR status1m = ""');
        return rows;
    } catch (error) {
        console.error('Erro ao obter os registros de agendamento:', error);
        return [];
    }
};
// Função para obter os registros de agendamento do banco de dados status3m
const agendamentoZDG4 = async () => {
    try {
        const connection = await createConnection();
        const [rows] = await connection.execute('SELECT * FROM controle_os WHERE status3m IS NULL OR status3m = ""');
        return rows;
    } catch (error) {
        console.error('Erro ao obter os registros de agendamento:', error);
        return [];
    }
};
// Função para obter os registros de agendamento do banco de dados status6m
const agendamentoZDG5 = async () => {
    try {
        const connection = await createConnection();
        const [rows] = await connection.execute('SELECT * FROM controle_os WHERE status6m IS NULL OR status6m = ""');
        return rows;
    } catch (error) {
        console.error('Erro ao obter os registros de agendamento:', error);
        return [];
    }
};
// Função para obter os registros de agendamento do banco de dados status12m
const agendamentoZDG6 = async () => {
    try {
        const connection = await createConnection();
        const [rows] = await connection.execute('SELECT * FROM controle_os WHERE status12m IS NULL OR status12m = ""');
        return rows;
    } catch (error) {
        console.error('Erro ao obter os registros de agendamento:', error);
        return [];
    }
};
// Função para obter os registros de agendamento do banco de dados statusan
const agendamentoZDG7 = async () => {
    try {
        const connection = await createConnection();
        const [rows] = await connection.execute('SELECT * FROM controle_os WHERE statusan IS NULL OR statusan = ""');
        return rows;
    } catch (error) {
        console.error('Erro ao obter os registros de agendamento:', error);
        return [];
    }
};
// Função para obter os registros de agendamento do banco de dados statuss garantia
const agendamentoZDG8 = async () => {
    try {
        const connection = await createConnection();
        const [rows] = await connection.execute('SELECT * FROM controle_garantia WHERE statuss IS NULL OR statuss = ""');
        return rows;
    } catch (error) {
        console.error('Erro ao obter os registros de agendamento:', error);
        return [];
    }
};
// Função para obter os registros de agendamento do banco de dados statusf garantiafi
const agendamentoZDG9 = async () => {
    try {
        const connection = await createConnection();
        const [rows] = await connection.execute('SELECT * FROM controle_garantia WHERE statusf IS NULL OR statusf = ""');
        return rows;
    } catch (error) {
        console.error('Erro ao obter os registros de agendamento:', error);
        return [];
    }
};
// Função para obter os registros de agendamento do banco de dados statusen pap
const agendamentoZDG10 = async () => {
    try {
        const connection = await createConnection();
        const [rows] = await connection.execute('SELECT * FROM controle_pap WHERE statusen IS NULL OR statusen = ""');
        return rows;
    } catch (error) {
        console.error('Erro ao obter os registros de agendamento:', error);
        return [];
    }
};
// Função para obter os registros de agendamento do banco de dados statusco pap
const agendamentoZDG11 = async () => {
    try {
        const connection = await createConnection();
        const [rows] = await connection.execute('SELECT * FROM controle_pap WHERE statusco IS NULL OR statusco = ""');
        return rows;
    } catch (error) {
        console.error('Erro ao obter os registros de agendamento:', error);
        return [];
    }
};

// Configuração do servidor Express e Socket.IO
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(fileUpload({
    debug: true
}));

// Rota principal do aplicativo
app.get('/', (req, res) => {
    res.sendFile('index.html', {
        root: __dirname
    });
});

// Criação do cliente do WhatsApp
const client = new Client({
    authStrategy: new LocalAuth({ clientId: 'bot-zdg' }),
    puppeteer: {
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--single-process', // <- this one doesn't work in Windows
            '--disable-gpu'
        ]
    }
});

// Inicialização do cliente do WhatsApp
client.initialize();

// Configuração do Socket.IO para comunicação em tempo real
let authenticated = false;

io.on('connection', function (socket) {
    socket.emit('message', 'Conectando...');

    // Evento para receber o QR Code e exibi-lo na interface
    client.on('qr', (qr) => {
        console.log('QR RECEIVED', qr);
        qrcode.toDataURL(qr, (err, url) => {
            socket.emit('qr', url);
            socket.emit('message', 'QRCode recebido, aponte a câmera do seu celular!');
        });
    });

    // Evento disparado quando o cliente está pronto para uso
    client.on('ready', async () => {
        socket.emit('ready', 'Dispositivo pronto!');
        socket.emit('message', 'Dispositivo pronto!');


        // Tarefa agendada para executar a lógica de envio de mensagens periodicamente
        nodeCron.schedule('*/60 * * * * *', async function () {
            try {
                const agendamentoscobranca = await agendamentoZDG0()
                const agendamentosSolicitacao = await agendamentoZDG();
                const agendamentosFinalizacao = await agendamentoZDG2();
                const agendamentosdate1m = await agendamentoZDG3();
                const agendamentosdate3m = await agendamentoZDG4();
                const agendamentosdate6m = await agendamentoZDG5();
                const agendamentosdate12m = await agendamentoZDG6();
                const agendamentosdata_aniversario = await agendamentoZDG7();
                const agendamentosgarantia = await agendamentoZDG8();
                const agendamentosgarantiafi = await agendamentoZDG9();
                const agendamentospap = await agendamentoZDG10();
                const agendamentospapd = await agendamentoZDG11();

                const hoje = new Date();

                for (const agendamento of agendamentoscobranca) {
                    if (agendamento.data_cobranca && agendamento.data_cobranca <= hoje && !agendamento.enviado) {
                        // Marcar o agendamento como enviado
                        agendamento.enviado = true;
                        if (agendamento.nome !== '') {
                            client.sendMessage(agendamento.fone + '@c.us', agendamento.nome);
                        }
                        if (agendamento.mensagemco && agendamento.mensagemco !== '') {
                            console.log('URL da mensagemco:', agendamento.mensagemco);
                            try {
                                const media = await MessageMedia.fromUrl(agendamento.mensagemco);
                                client.sendMessage(agendamento.fone + '@c.us', media, { caption: 'Oticas Diniz' });
                            } catch (error) {
                                console.error('Erro ao obter a mensagemco:', error);
                            }
                        }
                        const success = await updateStatuscob(agendamento.id);
                        if (success) {
                            console.log('BOT-ZDG - Mensagem ID: ' + agendamento.id + ' - statusco atualizado para "enviado"');
                        } else {
                            console.log('BOT-ZDG - Falha ao atualizar o statusco da mensagem ID: ' + agendamento.id);
                        }
                    }
                }
                for (const agendamento of agendamentosSolicitacao) {
                    if (agendamento.data_solicitacao && agendamento.data_solicitacao <= hoje && !agendamento.enviado) {
                        // Marcar o agendamento como enviado
                        agendamento.enviado = true;
                        if (agendamento.nome !== '') {
                            client.sendMessage(agendamento.fone + '@c.us', agendamento.nome);
                        }
                        if (agendamento.mensagemvd && agendamento.mensagemvd !== '') {
                            console.log('URL da mensagemvd:', agendamento.mensagemvd);
                            try {
                                const media = await MessageMedia.fromUrl(agendamento.mensagemvd);
                                client.sendMessage(agendamento.fone + '@c.us', media, { caption: 'Oticas Diniz' });
                            } catch (error) {
                                console.error('Erro ao obter a mensagemvd:', error);
                            }
                        }
                        const success = await updateStatusvd(agendamento.id);
                        if (success) {
                            console.log('BOT-ZDG - Mensagem ID: ' + agendamento.id + ' - statusvd atualizado para "enviado"');
                        } else {
                            console.log('BOT-ZDG - Falha ao atualizar o statusvd da mensagem ID: ' + agendamento.id);
                        }
                    }
                }
                for (const agendamento of agendamentosFinalizacao) {
                    if (agendamento.data_finalizacao && agendamento.data_finalizacao <= hoje && !agendamento.enviado) {
                        // Marcar o agendamento como enviado
                        agendamento.enviado = true;
                        if (agendamento.nome !== '') {
                            client.sendMessage(agendamento.fone + '@c.us', agendamento.nome);
                        }
                        if (agendamento.mensagemdf && agendamento.mensagemdf !== '') {
                            console.log('URL da mensagemdf:', agendamento.mensagemdf);
                            try {
                                const media = await MessageMedia.fromUrl(agendamento.mensagemdf);
                                client.sendMessage(agendamento.fone + '@c.us', media, { caption: 'Oticas Diniz' });
                            } catch (error) {
                                console.error('Erro ao obter a mensagemdf:', error);
                            }
                        }
                        const success = await updateStatusdf(agendamento.id);
                        if (success) {
                            console.log('BOT-ZDG - Mensagem ID: ' + agendamento.id + ' - statusdf atualizado para "enviado"');
                        } else {
                            console.log('BOT-ZDG - Falha ao atualizar o statusdf da mensagem ID: ' + agendamento.id);
                        }
                    }
                }
                for (const agendamento of agendamentosdate1m) {
                    if (agendamento.date1m && agendamento.date1m <= hoje && !agendamento.enviado) {
                        // Marcar o agendamento como enviado
                        if (agendamento.nome !== '') {
                            client.sendMessage(agendamento.fone + '@c.us', agendamento.nome);
                        }
                        if (agendamento.mensagem1m && agendamento.mensagem1m !== '') {
                            console.log('URL da mensagem1m:', agendamento.mensagem1m);
                            try {
                                const media = await MessageMedia.fromUrl(agendamento.mensagem1m);
                                client.sendMessage(agendamento.fone + '@c.us', media, { caption: 'Oticas Diniz' });
                            } catch (error) {
                                console.error('Erro ao obter a mensagem1m:', error);
                            }
                        }
                        const success = await updateStatus1m(agendamento.id);
                        if (success) {
                            console.log('BOT-ZDG - Mensagem ID: ' + agendamento.id + ' - status1m atualizado para "enviado"');
                        } else {
                            console.log('BOT-ZDG - Falha ao atualizar o status1m da mensagem ID: ' + agendamento.id);
                        }
                    }
                }
                for (const agendamento of agendamentosdate3m) {
                    if (agendamento.date3m && agendamento.date3m <= hoje && !agendamento.enviado) {
                        // Marcar o agendamento como enviado
                        if (agendamento.nome !== '') {
                            client.sendMessage(agendamento.fone + '@c.us', agendamento.nome);
                        }
                        if (agendamento.mensagem3m && agendamento.mensagem3m !== '') {
                            console.log('URL da mensagem3m:', agendamento.mensagem3m);
                            try {
                                const media = await MessageMedia.fromUrl(agendamento.mensagem3m);
                                client.sendMessage(agendamento.fone + '@c.us', media, { caption: 'Oticas Diniz' });
                            } catch (error) {
                                console.error('Erro ao obter a mensagem3m:', error);
                            }
                        }
                        const success = await updateStatus3m(agendamento.id);
                        if (success) {
                            console.log('BOT-ZDG - Mensagem ID: ' + agendamento.id + ' - status3m atualizado para "enviado"');
                        } else {
                            console.log('BOT-ZDG - Falha ao atualizar o status3m da mensagem ID: ' + agendamento.id);
                        }
                    }
                }
                for (const agendamento of agendamentosdate6m) {
                    if (agendamento.date6m && agendamento.date6m <= hoje && !agendamento.enviado) {
                        // Marcar o agendamento como enviado
                        if (agendamento.nome !== '') {
                            client.sendMessage(agendamento.fone + '@c.us', agendamento.nome);
                        }
                        if (agendamento.mensagem6m && agendamento.mensagem6m !== '') {
                            console.log('URL da mensagem6m:', agendamento.mensagem6m);
                            try {
                                const media = await MessageMedia.fromUrl(agendamento.mensagem6m);
                                client.sendMessage(agendamento.fone + '@c.us', media, { caption: 'Oticas Diniz' });
                            } catch (error) {
                                console.error('Erro ao obter a mensagem6m:', error);
                            }
                        }
                        const success = await updateStatus6m(agendamento.id);
                        if (success) {
                            console.log('BOT-ZDG - Mensagem ID: ' + agendamento.id + ' - status6m atualizado para "enviado"');
                        } else {
                            console.log('BOT-ZDG - Falha ao atualizar o status6m da mensagem ID: ' + agendamento.id);
                        }
                    }
                }
                for (const agendamento of agendamentosdate12m) {
                    if (agendamento.date12m && agendamento.date12m <= hoje && !agendamento.enviado) {
                        // Marcar o agendamento como enviado
                        if (agendamento.nome !== '') {
                            client.sendMessage(agendamento.fone + '@c.us', agendamento.nome);
                        }
                        if (agendamento.mensagem12m && agendamento.mensagem12m !== '') {
                            console.log('URL da mensagem12m:', agendamento.mensagem12m);
                            try {
                                const media = await MessageMedia.fromUrl(agendamento.mensagem12m);
                                client.sendMessage(agendamento.fone + '@c.us', media, { caption: 'Oticas Diniz' });
                            } catch (error) {
                                console.error('Erro ao obter a mensagem12m:', error);
                            }
                        }
                        const success = await updateStatus12m(agendamento.id);
                        if (success) {
                            console.log('BOT-ZDG - Mensagem ID: ' + agendamento.id + ' - status12m atualizado para "enviado"');
                        } else {
                            console.log('BOT-ZDG - Falha ao atualizar o status12m da mensagem ID: ' + agendamento.id);
                        }
                    }
                }
                for (const agendamento of agendamentosdata_aniversario) {
                    if (agendamento.data_aniversario && agendamento.data_aniversario <= hoje && !agendamento.enviado) {
                        // Marcar o agendamento como enviado
                        if (agendamento.nome !== '') {
                            client.sendMessage(agendamento.fone + '@c.us', agendamento.nome);
                        }
                        if (agendamento.mensageman && agendamento.mensageman !== '') {
                            console.log('URL da mensageman:', agendamento.mensageman);
                            try {
                                const media = await MessageMedia.fromUrl(agendamento.mensageman);
                                client.sendMessage(agendamento.fone + '@c.us', media, { caption: 'Oticas Diniz' });
                            } catch (error) {
                                console.error('Erro ao obter a mensageman:', error);
                            }
                        }
                        const success = await updateStatusan(agendamento.id);
                        if (success) {
                            console.log('BOT-ZDG - Mensagem ID: ' + agendamento.id + ' - statusan atualizado para "enviado"');
                        } else {
                            console.log('BOT-ZDG - Falha ao atualizar o statusan da mensagem ID: ' + agendamento.id);
                        }
                    }
                }
                for (const agendamento of agendamentosgarantia) {
                    if (agendamento.data_solicitacao && agendamento.data_solicitacao <= hoje && !agendamento.enviado) {
                        // Marcar o agendamento como enviado
                        if (agendamento.nome !== '') {
                            client.sendMessage(agendamento.fone + '@c.us', agendamento.nome);
                        }
                        if (agendamento.mensagems && agendamento.mensagems !== '') {
                            console.log('URL da mensagems:', agendamento.mensagems);
                            try {
                                const media = await MessageMedia.fromUrl(agendamento.mensagems);
                                client.sendMessage(agendamento.fone + '@c.us', media, { caption: 'Oticas Diniz' });
                            } catch (error) {
                                console.error('Erro ao obter a mensagems:', error);
                            }
                        }
                        const success = await updateStatusga(agendamento.id);
                        if (success) {
                            console.log('BOT-ZDG - Mensagem ID: ' + agendamento.id + ' - statuss atualizado para "enviado"');
                        } else {
                            console.log('BOT-ZDG - Falha ao atualizar o statuss da mensagem ID: ' + agendamento.id);
                        }
                    }
                }
                for (const agendamento of agendamentosgarantiafi) {
                    if (agendamento.data_finalizacao && agendamento.data_finalizacao <= hoje && !agendamento.enviado) {
                        // Marcar o agendamento como enviado
                        if (agendamento.nome !== '') {
                            client.sendMessage(agendamento.fone + '@c.us', agendamento.nome);
                        }
                        if (agendamento.mensagemf && agendamento.mensagemf !== '') {
                            console.log('URL da mensagemf:', agendamento.mensagemf);
                            try {
                                const media = await MessageMedia.fromUrl(agendamento.mensagemf);
                                client.sendMessage(agendamento.fone + '@c.us', media, { caption: 'Oticas Diniz' });
                            } catch (error) {
                                console.error('Erro ao obter a mensagemf:', error);
                            }
                        }
                        const success = await updateStatusgaf(agendamento.id);
                        if (success) {
                            console.log('BOT-ZDG - Mensagem ID: ' + agendamento.id + ' - statusf atualizado para "enviado"');
                        } else {
                            console.log('BOT-ZDG - Falha ao atualizar o statusf da mensagem ID: ' + agendamento.id);
                        }
                    }
                }
                for (const agendamento of agendamentospap) {
                    if (agendamento.data_entrevista && agendamento.data_entrevista <= hoje && !agendamento.enviado) {
                        // Marcar o agendamento como enviado
                        if (agendamento.nome !== '') {
                            client.sendMessage(agendamento.fone + '@c.us', agendamento.nome);
                        }
                        if (agendamento.mensagemen && agendamento.mensagemen !== '') {
                            console.log('URL da mensagemen:', agendamento.mensagemen);
                            try {
                                const media = await MessageMedia.fromUrl(agendamento.mensagemen);
                                client.sendMessage(agendamento.fone + '@c.us', media, { caption: 'Oticas Diniz' });
                            } catch (error) {
                                console.error('Erro ao obter a mensagemen:', error);
                            }
                        }
                        const success = await updateStatusag(agendamento.id);
                        if (success) {
                            console.log('BOT-ZDG - Mensagem ID: ' + agendamento.id + ' - statusen atualizado para "enviado"');
                        } else {
                            console.log('BOT-ZDG - Falha ao atualizar o statusen da mensagem ID: ' + agendamento.id);
                        }
                    }
                }
                for (const agendamento of agendamentospapd) {
                    if (agendamento.data_consulta && agendamento.data_consulta <= hoje && !agendamento.enviado) {
                        // Marcar o agendamento como enviado
                        if (agendamento.nome !== '') {
                            client.sendMessage(agendamento.fone + '@c.us', agendamento.nome);
                        }
                        if (agendamento.mensagemco && agendamento.mensagemco !== '') {
                            console.log('URL da mensagemco:', agendamento.mensagemco);
                            try {
                                const media = await MessageMedia.fromUrl(agendamento.mensagemco);
                                client.sendMessage(agendamento.fone + '@c.us', media, { caption: 'Oticas Diniz' });
                            } catch (error) {
                                console.error('Erro ao obter a mensagemco:', error);
                            }
                        }
                        const success = await updateStatusco(agendamento.id);
                        if (success) {
                            console.log('BOT-ZDG - Mensagem ID: ' + agendamento.id + ' - statusco atualizado para "enviado"');
                        } else {
                            console.log('BOT-ZDG - Falha ao atualizar o statusco da mensagem ID: ' + agendamento.id);
                        }
                    }
                }
            } catch (error) {
                console.error('Erro na tarefa agendada:', error);
            }
        });

    });
    // Evento disparado quando o cliente é autenticado com sucesso
    client.on('authenticated', () => {
        if (!authenticated) {
            authenticated = true;
            socket.emit('authenticated', 'Autenticado!');
            socket.emit('message', 'Autenticado!');
            console.log('Autenticado');
        }
    });

    // Evento disparado quando a autenticação falha
    client.on('auth_failure', function () {
        socket.emit('message', 'Falha na autenticação, reiniciando...');
        console.error('Falha na autenticação');
    });

    // Evento disparado quando o estado de conexão do cliente muda
    client.on('change_state', state => {
        console.log('Status de conexão:', state);
    });

    // Evento disparado quando o cliente é desconectado
    client.on('disconnected', (reason) => {
        socket.emit('message', 'Cliente desconectado!');
        console.log('Cliente desconectado', reason);
        client.initialize();
    });
});

// Inicialização do servidor
server.listen(port, function () {
    console.log('BOT-ZDG rodando na porta *:' + port);
});
