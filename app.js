const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const qrcode = require('qrcode');
const fileUpload = require('express-fileupload');
const port = 8063;
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
        user: 'u896627913_atacadaoalmira',
        password: 'Felipe.91118825',
        database: 'u896627913_atacadaoalmira'
    });
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

// FunÃ§Ã£o para atualizar o statuszap no banco de dados (controle OS)
const updateStatusvd = async (id) => {
    try {
        const connection = await getConnection();
        const query = 'UPDATE entregas SET statuszap = "enviado" WHERE id = ?';
        const [result] = await connection.execute(query, [id]);
        return result.affectedRows > 0;
    } catch (error) {
        console.error('Erro ao atualizar o statuszap:', error);
        return false;
    }
};


// FunÃ§Ã£o para obter os registros de agendamento do banco de dados
const agendamentoZDG = async () => {
    try {
        const connection = await getConnection();
        const [rows] = await connection.execute('SELECT * FROM entregas WHERE statuszap IS NULL OR statuszap = ""');
        return rows;
    } catch (error) {
        console.error('Erro ao obter os registros de agendamento:', error);
        return [];
    }
};

// FunÃ§Ã£o para atualizar o statusreclamacao no banco de dados (controle OS)
const updatestatusreclamacao = async (id) => {
    try {
        const connection = await getConnection();
        const query = 'UPDATE reclamacoes SET statusreclamacao = "enviado" WHERE id = ?';
        const [result] = await connection.execute(query, [id]);
        return result.affectedRows > 0;
    } catch (error) {
        console.error('Erro ao atualizar o statusreclamacao:', error);
        return false;
    }
};


// FunÃ§Ã£o para obter os registros de agendamento do banco de dados
const agendamentoreclamacao = async () => {
    try {
        const connection = await getConnection();
        const [rows] = await connection.execute('SELECT * FROM reclamacoes WHERE statusreclamacao IS NULL OR statusreclamacao = ""');
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
        clientId: 'bot-zdg_8062', // Provided clientId
        // Para o segundo cliente
        dataPath: path.join(__dirname, '..', 'sessions', 'instancia8011')
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
    nodeCron.schedule('* * * * *', async function () {
        try {
            const agendamentosSolicitacao = await agendamentoZDG();
            const agendamentosreclamacao = await agendamentoreclamacao();

            const hoje = new Date();

            

            for (const agendamento of agendamentosSolicitacao) {
                if (agendamento.data_inclusao && agendamento.data_inclusao <= hoje && !agendamento.enviado) {
                    // Marcar o agendamento como enviado
                    agendamento.enviado = true;
            
                    // Mensagem personalizada
                    if (agendamento.nome_cliente !== '' && agendamento.ticket) {
                        const messageWithEmoji = `Prezado(a) ${agendamento.nome_cliente} 🌟,\n\n` +
                            `Seu ticket: ${agendamento.ticket} 🎟️\n\n` +  // Adicionando o ticket aqui
                            `Agradecemos sinceramente por escolher o Almirante Mercado 💖 para suas compras! ` + 
                            `É sempre um prazer atendê-lo(a) 😊 e ficamos felizes em saber que você confia em nossos serviços. ` + 
                            `Logo sua compra será entregue! 🚚✨\n\n` +  // Texto modificado
                            `Estamos à disposição para qualquer coisa que precisar! ✨\n\n` + 
                            `Atenciosamente,\nAlmirante Mercado 🌸`;
            
                        // Enviar mensagem personalizada ao usuário
                        await client.sendMessage(agendamento.telefone + '@c.us', messageWithEmoji);
                    }
            
                    // Enviar link para Instagram
                    const linkURL = 'https://www.instagram.com/atacadaoalmirante/';
                    const textBelowImage = 'Olá! Que tal nos seguir no Instagram? Temos um conteúdo incrível que você vai adorar! Basta clicar no link abaixo. Se já nos segue, ignore essa mensagem.';
                    const linkText = 'Clique aqui para avaliar'; // Texto do link
            
                    const caption = `${textBelowImage}\n\n${linkText}: ${linkURL}`;
            
                    // Enviar o link do Instagram
                    await client.sendMessage(agendamento.telefone + '@c.us', caption);
            
                    // Atualizar o status do agendamento
                    const success = await updateStatusvd(agendamento.id);
                    if (success) {
                        console.log('BOT-ZDG - Mensagem ID: ' + agendamento.id + ' - statuszap atualizado para "enviado"');
                    } else {
                        console.log('BOT-ZDG - Falha ao atualizar o statuszap da mensagem ID: ' + agendamento.id);
                    }
                }
            }
            
            for (const agendamento of agendamentosreclamacao) {
                if (agendamento.data && agendamento.data <= hoje && !agendamento.enviado) {
                    // Marcar o agendamento como enviado
                    agendamento.enviado = true;
            
                    // Mensagem personalizada
                    const messageWithEmoji = `Prezado(a) ${agendamento.nome || 'cliente'} 🌟,\n\n` + // Utiliza "cliente" se nome estiver vazio
                        `Agradecemos sinceramente por escolher o Atacadão Almirante 💖 para suas compras! ` + 
                        `Queremos informar que logo resolveremos sua reclamação com a máxima atenção. ` +
                        `Estamos aqui para atender você! Atacadão Almirante 🌟\n\n` +  
                        `Se precisar de mais alguma coisa, estamos à disposição! ✨\n\n` + 
                        `Atenciosamente,\nAlmirante Mercado 🌸`;
            
                    // Enviar mensagem personalizada ao usuário
                    await client.sendMessage(agendamento.fone + '@c.us', messageWithEmoji);
            
                    // Atualizar o status do agendamento
                    const success = await updatestatusreclamacao(agendamento.id);
                    if (success) {
                        console.log('BOT-ZDG - Mensagem ID: ' + agendamento.id + ' - statusreclamacao atualizado para "enviado"');
                    } else {
                        console.log('BOT-ZDG - Falha ao atualizar o statusreclamacao da mensagem ID: ' + agendamento.id);
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


