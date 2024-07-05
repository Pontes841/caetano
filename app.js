const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const qrcode = require('qrcode');
const fileUpload = require('express-fileupload');
const port = 8089;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const path = require('path');


const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const mysql = require('mysql2/promise');
const nodeCron = require('node-cron');


// FunÃƒÂ§ÃƒÂ£o para criar conexÃƒÂ£o com o banco de dados
const createConnection = async () => {
    return await mysql.createConnection({
        host: '212.1.208.101',
        user: 'u896627913_clinica02',
        password: 'Felipe.91118825',
        database: 'u896627913_clinica02',
    });;
}
// Mantenha uma conexão global
let globalConnection = null;

// Função para criar conexão se não existir ou reutilizar se existir
async function getConnection() {
    if (!globalConnection || globalConnection.connection._closing) {
        globalConnection = await createConnection();
    }
    return globalConnection;
}




// FunÃ§Ã£o para atualizar o statusinc no banco de dados (controle OS)
const updatestatusinc = async (id) => {
    try {
        const connection = await getConnection();
        const query = 'UPDATE agendamento SET statusinc = "enviado" WHERE id = ?';
        const [result] = await connection.execute(query, [id]);
        return result.affectedRows > 0;
    } catch (error) {
        console.error('Erro ao atualizar o statusinc:', error);
        return false;
    }
};
// FunÃ§Ã£o para atualizar o statuscond no banco de dados finalizaÃ§Ã£o
const updatestatuscond = async (id) => {
    try {
        const connection = await getConnection();
        const query = 'UPDATE agendamento SET statuscond = "enviado" WHERE id = ?';
        const [result] = await connection.execute(query, [id]);
        return result.affectedRows > 0;
    } catch (error) {
        console.error('Erro ao atualizar o statuscond:', error);
        return false;
    }
};
// FunÃ§Ã£o para atualizar o statuscon no banco de dados AdaptaÃ§Ã£o (controle OS)
const updatestatuscon = async (id) => {
    try {
        const connection = await getConnection();
        const query = 'UPDATE agendamento SET statuscon = "enviado" WHERE id = ?';
        const [result] = await connection.execute(query, [id]);
        return result.affectedRows > 0;
    } catch (error) {
        console.error('Erro ao atualizar o statuscon:', error);
        return false;
    }
};
// FunÃ§Ã£o para atualizar o statusan no banco de dados importancia de cuidar do seus oculos (controle OS)
const updatestatusan = async (id) => {
    try {
        const connection = await getConnection();
        const query = 'UPDATE agendamento SET statusan = "enviado" WHERE id = ?';
        const [result] = await connection.execute(query, [id]);
        return result.affectedRows > 0;
    } catch (error) {
        console.error('Erro ao atualizar o statusan:', error);
        return false;
    }
};
// FunÃ§Ã£o para atualizar o statusreno no banco de dados Desconto (controle OS)
const updatestatusreno = async (id) => {
    try {
        const connection = await getConnection();
        const query = 'UPDATE agendamento SET statusreno = "enviado" WHERE id = ?';
        const [result] = await connection.execute(query, [id]);
        return result.affectedRows > 0;
    } catch (error) {
        console.error('Erro ao atualizar o statusreno:', error);
        return false;
    }
};


// FunÃ§Ã£o para obter os registros de agendamento do banco de dados
const agendamentoZDG = async () => {
    try {
        const connection = await getConnection();
        const [rows] = await connection.execute('SELECT * FROM agendamento WHERE statusinc IS NULL OR statusinc = ""');
        return rows;
    } catch (error) {
        console.error('Erro ao obter os registros de agendamento:', error);
        return [];
    }
};
// FunÃ§Ã£o para obter os registros de agendamento do banco de dados
const agendamentoZDG2 = async () => {
    try {
        const connection = await getConnection();
        const [rows] = await connection.execute('SELECT * FROM agendamento WHERE statuscond IS NULL OR statuscond = ""');
        return rows;
    } catch (error) {
        console.error('Erro ao obter os registros de agendamento:', error);
        return [];
    }
};
// FunÃ§Ã£o para obter os registros de agendamento do banco de dados statuscon (controle OS)
const agendamentoZDG3 = async () => {
    try {
        const connection = await getConnection();
        const [rows] = await connection.execute('SELECT * FROM agendamento WHERE statuscon IS NULL OR statuscon = ""');
        return rows;
    } catch (error) {
        console.error('Erro ao obter os registros de agendamento:', error);
        return [];
    }
};
// FunÃ§Ã£o para obter os registros de agendamento do banco de dados statusan importancia de cuidar dos seus oculos (controle OS)
const agendamentoZDG4 = async () => {
    try {
        const connection = await getConnection();
        const [rows] = await connection.execute('SELECT * FROM agendamento WHERE statusan IS NULL OR statusan = ""');
        return rows;
    } catch (error) {
        console.error('Erro ao obter os registros de agendamento:', error);
        return [];
    }
};
// FunÃ§Ã£o para obter os registros de agendamento do banco de dados desconto (controle OS)
const agendamentoZDG5 = async () => {
    try {
        const connection = await getConnection();
        const [rows] = await connection.execute('SELECT * FROM agendamento WHERE statusreno IS NULL OR statusreno = ""');
        return rows;
    } catch (error) {
        console.error('Erro ao obter os registros de agendamento:', error);
        return [];
    }
};

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(fileUpload({
    debug: true
}));

app.get('/', (req, res) => {
    res.sendFile('index.html', {
        root: __dirname
    });
});

const client = new Client({
    restartOnAuthFail: true,
    puppeteer: {
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--single-process', 
            '--disable-gpu'
        ],
    },
    authStrategy: new LocalAuth({
        clientId: 'bot-zdg_8089', // Provided clientId
        // Para o primeiro cliente
        dataPath: path.join(__dirname, '..', 'sessions', 'instancia8089')
    }),
});


// Inicializa isAuthenticated com o valor das variáveis de ambiente ou false
let isAuthenticated = process.env.AUTHENTICATED === 'true';

// Configurações do Socket.IO
io.on('connection', function (socket) {
    // Envia uma mensagem para o cliente WebSocket quando a conexão é estabelecida
    if (isAuthenticated) {
        socket.emit('message', 'Cliente autenticado!');
    } else {
        socket.emit('message', 'Cliente não autenticado!');
    }

    // Event to receive the QR Code and display it on the interface
    client.on('qr', (qr) => {
        console.log('QR RECEIVED', qr);
        qrcode.toDataURL(qr, (err, url) => {
            socket.emit('qr', url);
            socket.emit('message', 'QRCode recebido, aponte a Câmera do seu celular!');
        });
    });

    // Event to inform that the QR Code connection has been successful
    client.on('authenticated', (session) => {
        isAuthenticated = true; // Define como true quando autenticado
        socket.emit('message', 'Conexão do QR Code realizada com sucesso!');
        process.env.AUTHENTICATED = 'true'; // Atualiza a variável de ambiente
    });

    // Handle disconnections
    socket.on('disconnect', () => {
        console.log('Socket disconnected');
    });

    // Evento para reiniciar o aplicativo
    socket.on('restartApp', function () {
        console.log('Reiniciando aplicativo...');
        const { exec } = require('child_process');
        exec('pm2 restart app.js', (error, stdout, stderr) => {
            if (error) {
                console.error(`Erro ao reiniciar o aplicativo: ${error.message}`);
                socket.emit('message', `Erro ao reiniciar o aplicativo: ${error.message}`);
                return;
            }
            if (stderr) {
                console.error(`Erro ao reiniciar o aplicativo: ${stderr}`);
                socket.emit('message', `Erro ao reiniciar o aplicativo: ${stderr}`);
                return;
            }
            console.log(`Aplicativo reiniciado: ${stdout}`);
            socket.emit('message', 'Aplicativo reiniciado com sucesso!');
        });
    });
});


// Inicia o cliente WhatsApp
client.initialize();


client.on('ready', async () => {
    // Add your scheduled task here
    nodeCron.schedule('*/1 7-23 * * *', async function () {
        try {

                const agendamentosSolicitacao = await agendamentoZDG();
                const agendamentosFinalizacao = await agendamentoZDG2();
                const agendamentosstatuscon = await agendamentoZDG3();
                const agendamentosdata_de_aniversario = await agendamentoZDG4();
                const agendamentosdatareno = await agendamentoZDG5();
                
                const hoje = new Date();


                for (const agendamento of agendamentosSolicitacao) {
                    if (agendamento.data_inclusao && agendamento.data_inclusao <= hoje && !agendamento.enviado) {
                        // Marcar o agendamento como enviado
                        agendamento.enviado = true;

                        if (agendamento.nome !== '') {
                            client.sendMessage(agendamento.fone + '@c.us', agendamento.nome);
                        }

                        if (agendamento.mensageminc && agendamento.mensageminc !== '') {
                            console.log('URL da mensageminc:', agendamento.mensageminc);
                            try {
                                const media = await MessageMedia.fromUrl(agendamento.mensageminc);
                                client.sendMessage(agendamento.fone + '@c.us', media, { caption: '' });
                            } catch (error) {
                                console.error('Erro ao obter a mensageminc:', error);
                            }
                        }

                        const success = await updatestatusinc(agendamento.id);
                        if (success) {
                            console.log('BOT-ZDG - Mensagem ID: ' + agendamento.id + ' - statusinc atualizado para "enviado"');
                        } else {
                            console.log('BOT-ZDG - Falha ao atualizar o statusinc da mensagem ID: ' + agendamento.id);
                        }
                    }
                }

                for (const agendamento of agendamentosFinalizacao) {
                    if (agendamento.datacond && agendamento.datacond <= hoje && !agendamento.enviado) {
                        // Marcar o agendamento como enviado
                        agendamento.enviado = true;

                        if (agendamento.nome !== '') {
                            client.sendMessage(agendamento.fone + '@c.us', agendamento.nome);
                        }

                        if (agendamento.mensagemcond && agendamento.mensagemcond !== '') {
                            console.log('URL da mensagemcond:', agendamento.mensagemcond);
                            try {
                                const media = await MessageMedia.fromUrl(agendamento.mensagemcond);
                                client.sendMessage(agendamento.fone + '@c.us', media, { caption: '' });
                            } catch (error) {
                                console.error('Erro ao obter a mensagemcond:', error);
                            }
                        }

                        const success = await updatestatuscond(agendamento.id);
                        if (success) {
                            console.log('BOT-ZDG - Mensagem ID: ' + agendamento.id + ' - statuscond atualizado para "enviado"');
                        } else {
                            console.log('BOT-ZDG - Falha ao atualizar o statuscond da mensagem ID: ' + agendamento.id);
                        }
                    }
                }


                for (const agendamento of agendamentosstatuscon) {
                    if (agendamento.data_consulta && agendamento.data_consulta <= hoje && !agendamento.enviado) {
                        // Marcar o agendamento como enviado
                        agendamento.enviado = true;

                        if (agendamento.nome !== '') {
                            client.sendMessage(agendamento.fone + '@c.us', agendamento.nome);
                        }
                        if (agendamento.mensagemcon && agendamento.mensagemcon !== '') {
                            console.log('URL da mensagemcon:', agendamento.mensagemcon);
                            try {
                                const media = await MessageMedia.fromUrl(agendamento.mensagemcon);
                                client.sendMessage(agendamento.fone + '@c.us', media, { caption: '' });
                            } catch (error) {
                                console.error('Erro ao obter a mensagemcon:', error);
                            }
                        }

                        const success = await updatestatuscon(agendamento.id);
                        if (success) {
                            console.log('BOT-ZDG - Mensagem ID: ' + agendamento.id + ' - statuscon atualizado para "enviado"');
                        } else {
                            console.log('BOT-ZDG - Falha ao atualizar o statuscon da mensagem ID: ' + agendamento.id);
                        }
                    }
                }

                // mensagem de cuidar do seus oculos (controle OS)

                for (const agendamento of agendamentosdata_de_aniversario) {
                    if (agendamento.data_de_aniversario && agendamento.data_de_aniversario <= hoje && !agendamento.enviado) {
                        // Marcar o agendamento como enviado
                        agendamento.enviado = true;

                        if (agendamento.nome !== '') {
                            client.sendMessage(agendamento.fone + '@c.us', agendamento.nome);
                        }

                        if (agendamento.mensagemani && agendamento.mensagemani !== '') {
                            console.log('URL da mensagemani:', agendamento.mensagemani);
                            try {
                                const media = await MessageMedia.fromUrl(agendamento.mensagemani);
                                client.sendMessage(agendamento.fone + '@c.us', media, { caption: '' });
                            } catch (error) {
                                console.error('Erro ao obter a mensagemani:', error);
                            }
                        }

                        const success = await updatestatusan(agendamento.id);
                        if (success) {
                            console.log('BOT-ZDG - Mensagem ID: ' + agendamento.id + ' - statusan atualizado para "enviado"');
                        } else {
                            console.log('BOT-ZDG - Falha ao atualizar o statusan da mensagem ID: ' + agendamento.id);
                        }
                    }
                }

                // mensagem desconto (controle OS)
                for (const agendamento of agendamentosdatareno) {
                    if (agendamento.datareno && agendamento.datareno <= hoje && !agendamento.enviado) {
                        // Marcar o agendamento como enviado
                        agendamento.enviado = true;

                        if (agendamento.nome !== '') {
                            client.sendMessage(agendamento.fone + '@c.us', agendamento.nome);
                        }

                        if (agendamento.mensagemreno && agendamento.mensagemreno !== '') {
                            console.log('URL da mensagemreno:', agendamento.mensagemreno);
                            try {
                                const media = await MessageMedia.fromUrl(agendamento.mensagemreno);
                                client.sendMessage(agendamento.fone + '@c.us', media, { caption: '' });
                            } catch (error) {
                                console.error('Erro ao obter a mensagemreno:', error);
                            }
                        }

                        const success = await updatestatusreno(agendamento.id);
                        if (success) {
                            console.log('BOT-ZDG - Mensagem ID: ' + agendamento.id + ' - statusreno atualizado para "enviado"');
                        } else {
                            console.log('BOT-ZDG - Falha ao atualizar o statusreno da mensagem ID: ' + agendamento.id);
                        }
                    }
                }

                

            } catch (error) {
                console.error('Erro na tarefa agendada:', error);
            }
        });
    
        console.log('Cliente WhatsApp está pronto.');
    });
    
    client.on('authenticated', () => {
        // Handle authentication
    });
    
    client.on('disconnected', (reason) => {
        console.log('Bot desconectado:', reason);
        io.emit('status', 'disconnected');
        // Adicione lógica para reiniciar o processo, se necessário
        // Exemplo: client.initialize();
    });
    
    
    
    server.listen(port, function () {
        console.log('BOT-ZDG rodando na porta *:' + port);
    });
