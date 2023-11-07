const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const qrcode = require('qrcode');
const fileUpload = require('express-fileupload');
const port = 8020;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Importe a lógica relacionada ao WhatsApp de outro arquivo
const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const mysql = require('mysql2/promise');
const nodeCron = require('node-cron');

const createConnection = async () => {
    return await mysql.createConnection({
        host: '212.1.208.101',
        user: 'u896627913_teste',
        password: 'Felipe.91118825',
        database: 'u896627913_teste'
    });
};

// FunÃ§Ã£o para atualizar o statusvd no banco de dados (controle OS)
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

// FunÃ§Ã£o para obter os registros de agendamento do banco de dados
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

// Crie o cliente do WhatsApp fora da conexão Socket.IO
const client = new Client({
    authStrategy: new LocalAuth({ clientId: 'bot-zdg' }),
    puppeteer: {
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            // ...
        ]
    }
});

// Inicialize o cliente do WhatsApp
client.initialize();

// Configure os ouvintes de eventos para o cliente
client.on('ready', async () => {
    // Adicione sua tarefa agendada aqui
    nodeCron.schedule('*/60 * * * * *', async function () {
        try {
            const agendamentosSolicitacao = await agendamentoZDG();

            const hoje = new Date();

            for (const agendamento of agendamentosSolicitacao) {
                if (agendamento.data_inclusao && agendamento.data_inclusao <= hoje && !agendamento.enviado) {
                    // Marcar o agendamento como enviado
                    agendamento.enviado = true;

                    if (agendamento.nome !== '') {
                        client.sendMessage(agendamento.fone + '@c.us', agendamento.nome);
                    }

                    if (agendamento.mensagemvd && agendamento.mensagemvd !== '') {
                        console.log('URL da mensagemvd:', agendamento.mensagemvd);
                        try {
                            const media = await MessageMedia.fromUrl(agendamento.mensagemvd);
                            const linkURL = 'https://www.instagram.com/oticasdiniz.penedo/'; // Replace this with your desired link URL
                            const textBelowImage = 'Olá! Que tal nos seguir no Instagram ? Temos um conteúdo incrível que você vai adorar! Basta clicar no link abaixo.Se já nos segue, ignore essa mensagem.';
                            const linkText = 'Clique aqui para avaliar'; // Replace this with the text you want to display for the link

                            const caption = `${textBelowImage}\n\n${linkText}: ${linkURL}`;

                            client.sendMessage(agendamento.fone + '@c.us', media, { caption });
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

        } catch (error) {
            console.error('Erro na tarefa agendada:', error);
        }
    });

    console.log('Cliente WhatsApp está pronto.');
});

client.on('authenticated', () => {
    // Lidere com a autenticação
});

// ... outros ouvintes de eventos para o cliente ...

// Configure as conexões Socket.IO
io.on('connection', function (socket) {
    socket.emit('message', 'Conectando...');

    // ... (seus ouvintes de eventos Socket.IO existentes)

    // Lide com desconexões e reinicializações conforme necessário
    socket.on('disconnect', () => {
        console.log('Socket desconectado');
    });
});

// Inicialize o servidor
server.listen(port, function () {
    console.log('BOT-ZDG rodando na porta *:' + port);
});
