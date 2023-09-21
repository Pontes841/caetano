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


// FunÃƒÂ§ÃƒÂ£o para criar conexÃƒÂ£o com o banco de dados
const createConnection = async () => {
    return await mysql.createConnection({
        host: '212.1.208.101',
        user: 'u896627913_clinica',
        password: 'Felipe.91118825',
        database: 'u896627913_clinica'
    });
}


// FunÃ§Ã£o para atualizar o statusinc no banco de dados 
const updatestatusinc = async (id) => {
    try {
        const connection = await createConnection();
        const query = 'UPDATE agendamento SET statusinc = "enviado" WHERE id = ?';
        const [result] = await connection.execute(query, [id]);
        return result.affectedRows > 0;
    } catch (error) {
        console.error('Erro ao atualizar o statusinc:', error);
        return false;
    }
};

// FunÃ§Ã£o para atualizar o statuscond no banco de dados (controle OS)
const updatestatuscond = async (id) => {
    try {
        const connection = await createConnection();
        const query = 'UPDATE agendamento SET statuscond = "enviado" WHERE id = ?';
        const [result] = await connection.execute(query, [id]);
        return result.affectedRows > 0;
    } catch (error) {
        console.error('Erro ao atualizar o statuscond:', error);
        return false;
    }
};
// FunÃ§Ã£o para atualizar o statuscon no banco de dados finalizaÃ§Ã£o
const updatestatuscon = async (id) => {
    try {
        const connection = await createConnection();
        const query = 'UPDATE agendamento SET statuscon = "enviado" WHERE id = ?';
        const [result] = await connection.execute(query, [id]);
        return result.affectedRows > 0;
    } catch (error) {
        console.error('Erro ao atualizar o statuscon:', error);
        return false;
    }
};
// FunÃ§Ã£o para atualizar o statusan no banco de dados AdaptaÃ§Ã£o (controle OS)
const updatestatusan = async (id) => {
    try {
        const connection = await createConnection();
        const query = 'UPDATE agendamento SET statusan = "enviado" WHERE id = ?';
        const [result] = await connection.execute(query, [id]);
        return result.affectedRows > 0;
    } catch (error) {
        console.error('Erro ao atualizar o statusan:', error);
        return false;
    }
};
// FunÃ§Ã£o para atualizar o statusreno no banco de dados importancia de cuidar do seus oculos (controle OS)
const updatestatusreno = async (id) => {
    try {
        const connection = await createConnection();
        const query = 'UPDATE agendamento SET statusreno = "enviado" WHERE id = ?';
        const [result] = await connection.execute(query, [id]);
        return result.affectedRows > 0;
    } catch (error) {
        console.error('Erro ao atualizar o statusreno:', error);
        return false;
    }
};


// FunÃ§Ã£o para obter os registros de agendamento do banco de dados
const agendamentoZDG0 = async () => {
    try {
        const connection = await createConnection();
        const [rows] = await connection.execute('SELECT * FROM agendamento WHERE statusinc IS NULL OR statusinc = ""');
        return rows;
    } catch (error) {
        console.error('Erro ao obter os registros de agendamento:', error);
        return [];
    }
};

// FunÃ§Ã£o para obter os registros de agendamento do banco de dados
const agendamentoZDG = async () => {
    try {
        const connection = await createConnection();
        const [rows] = await connection.execute('SELECT * FROM agendamento WHERE statuscond IS NULL OR statuscond = ""');
        return rows;
    } catch (error) {
        console.error('Erro ao obter os registros de agendamento:', error);
        return [];
    }
};
// FunÃ§Ã£o para obter os registros de agendamento do banco de dados
const agendamentoZDG2 = async () => {
    try {
        const connection = await createConnection();
        const [rows] = await connection.execute('SELECT * FROM agendamento WHERE statuscon IS NULL OR statuscon = ""');
        return rows;
    } catch (error) {
        console.error('Erro ao obter os registros de agendamento:', error);
        return [];
    }
};
// FunÃ§Ã£o para obter os registros de agendamento do banco de dados statusan (controle OS)
const agendamentoZDG3 = async () => {
    try {
        const connection = await createConnection();
        const [rows] = await connection.execute('SELECT * FROM agendamento WHERE statusan IS NULL OR statusan = ""');
        return rows;
    } catch (error) {
        console.error('Erro ao obter os registros de agendamento:', error);
        return [];
    }
};
// FunÃ§Ã£o para obter os registros de agendamento do banco de dados statusreno importancia de cuidar dos seus oculos (controle OS)
const agendamentoZDG4 = async () => {
    try {
        const connection = await createConnection();
        const [rows] = await connection.execute('SELECT * FROM agendamento WHERE statusreno IS NULL OR statusreno = ""');
        return rows;
    } catch (error) {
        console.error('Erro ao obter os registros de agendamento:', error);
        return [];
    }
};


// ConfiguraÃ§Ã£o do servidor Express e Socket.IO
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

// CriaÃ§Ã£o do cliente do WhatsApp
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

// InicializaÃ§Ã£o do cliente do WhatsApp
client.initialize();

// ConfiguraÃ§Ã£o do Socket.IO para comunicaÃ§Ã£o em tempo real
let authenticated = false;

io.on('connection', function (socket) {
    socket.emit('message', 'Conectando...');

    // Evento para receber o QR Code e exibi-lo na interface
    client.on('qr', (qr) => {
        console.log('QR RECEIVED', qr);
        qrcode.toDataURL(qr, (err, url) => {
            socket.emit('qr', url);
            socket.emit('message', 'QRCode recebido, aponte a Câmera do seu celular!');
        });
    });

    // Evento disparado quando o cliente estÃ¡ pronto para uso
    client.on('ready', async () => {
        socket.emit('ready', 'Dispositivo pronto!');
        socket.emit('message', 'Dispositivo pronto!');

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

    // InicializaÃ§Ã£o do servidor
    server.listen(port, function () {
        console.log('BOT-ZDG rodando na porta *:' + port);
    });


    // Tarefa agendada para executar a lÃ³gica de envio de mensagens periodicamente
    nodeCron.schedule('*/60 * * * * *', async function () {
        try {
            const agendamentosmensageminc = await agendamentoZDG0();
            const agendamentosmensagemcond = await agendamentoZDG();
            const agendamentosmensagemcon = await agendamentoZDG2();
            const agendamentosmensagemani = await agendamentoZDG3();
            const agendamentosmensagemani = await agendamentoZDG4();

            const hoje = new Date();

            for (const agendamento of agendamentosmensageminc) {
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


            for (const agendamento of agendamentosmensagemcond) {
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

            for (const agendamento of agendamentosmensagemcon) {
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

            for (const agendamento of agendamentosmensagemani) {
                if (agendamento.dataad && agendamento.dataad <= hoje && !agendamento.enviado) {
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

            // mensagem de cuidar do seus oculos (controle OS)

            for (const agendamento of agendamentosmensagemreno) {
                if (agendamento.dataip && agendamento.dataip <= hoje && !agendamento.enviado) {
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

});


