const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const qrcode = require('qrcode');
const fileUpload = require('express-fileupload');
const port = 8002;
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
        user: 'u896627913_propria04',
        password: 'Felipe.91118825',
        database: 'u896627913_propria'
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




// FunÃ§Ã£o para atualizar o statusvd no banco de dados (controle OS)
const updateStatusvd = async (id) => {
    try {
        const connection = await getConnection();
        const query = 'UPDATE controle_os SET statusvd = "enviado" WHERE id = ?';
        const [result] = await connection.execute(query, [id]);
        return result.affectedRows > 0;
    } catch (error) {
        console.error('Erro ao atualizar o statusvd:', error);
        return false;
    }
};
// FunÃ§Ã£o para atualizar o statusfn no banco de dados finalizaÃ§Ã£o
const updateStatusfn = async (id) => {
    try {
        const connection = await getConnection();
        const query = 'UPDATE controle_os SET statusfn = "enviado" WHERE id = ?';
        const [result] = await connection.execute(query, [id]);
        return result.affectedRows > 0;
    } catch (error) {
        console.error('Erro ao atualizar o statusfn:', error);
        return false;
    }
};
// FunÃ§Ã£o para atualizar o statusad no banco de dados AdaptaÃ§Ã£o (controle OS)
const updateStatusad = async (id) => {
    try {
        const connection = await getConnection();
        const query = 'UPDATE controle_os SET statusad = "enviado" WHERE id = ?';
        const [result] = await connection.execute(query, [id]);
        return result.affectedRows > 0;
    } catch (error) {
        console.error('Erro ao atualizar o statusad:', error);
        return false;
    }
};
// FunÃ§Ã£o para atualizar o statusip no banco de dados importancia de cuidar do seus oculos (controle OS)
const updateStatusip = async (id) => {
    try {
        const connection = await getConnection();
        const query = 'UPDATE controle_os SET statusip = "enviado" WHERE id = ?';
        const [result] = await connection.execute(query, [id]);
        return result.affectedRows > 0;
    } catch (error) {
        console.error('Erro ao atualizar o statusip:', error);
        return false;
    }
};
// FunÃ§Ã£o para atualizar o sattusde no banco de dados Desconto (controle OS)
const updateSattusde = async (id) => {
    try {
        const connection = await getConnection();
        const query = 'UPDATE controle_os SET sattusde = "enviado" WHERE id = ?';
        const [result] = await connection.execute(query, [id]);
        return result.affectedRows > 0;
    } catch (error) {
        console.error('Erro ao atualizar o sattusde:', error);
        return false;
    }
};
// FunÃ§Ã£o para atualizar o statuscol no banco de dados coleÃ§Ã£o nova (controle OS)
const updateStatuscol = async (id) => {
    try {
        const connection = await getConnection();
        const query = 'UPDATE controle_os SET statuscol = "enviado" WHERE id = ?';
        const [result] = await connection.execute(query, [id]);
        return result.affectedRows > 0;
    } catch (error) {
        console.error('Erro ao atualizar o statuscol:', error);
        return false;
    }
};
// FunÃ§Ã£o para atualizar o statusan no banco de dados aniversario (controle de OS)
const updateStatusan = async (id) => {
    try {
        const connection = await getConnection();
        const query = 'UPDATE controle_os SET statusan = "enviado" WHERE id = ?';
        const [result] = await connection.execute(query, [id]);
        return result.affectedRows > 0;
    } catch (error) {
        console.error('Erro ao atualizar o statusan:', error);
        return false;
    }
};
// FunÃ§Ã£o para atualizar o statusan no banco de dados GARANTIA
const updateStatusga = async (id) => {
    try {
        const connection = await getConnection();
        const query = 'UPDATE controle_garantia SET statuss = "enviado" WHERE id = ?';
        const [result] = await connection.execute(query, [id]);
        return result.affectedRows > 0;
    } catch (error) {
        console.error('Erro ao atualizar o statuss:', error);
        return false;
    }
};
// FunÃ§Ã£o para atualizar o statusan no banco de dados GARANTIA
const updateStatusgaf = async (id) => {
    try {
        const connection = await getConnection();
        const query = 'UPDATE controle_garantia SET statusf = "enviado" WHERE id = ?';
        const [result] = await connection.execute(query, [id]);
        return result.affectedRows > 0;
    } catch (error) {
        console.error('Erro ao atualizar o statusf:', error);
        return false;
    }
};
// FunÃ§Ã£o para atualizar o statusan no banco de dados GARANTIA LENTES
const updateStatusgale = async (id) => {
    try {
        const connection = await getConnection();
        const query = 'UPDATE controle_garantia_lentes SET statusgaleso = "enviado" WHERE id = ?';
        const [result] = await connection.execute(query, [id]);
        return result.affectedRows > 0;
    } catch (error) {
        console.error('Erro ao atualizar o statusgaleso:', error);
        return false;
    }
};
// FunÃ§Ã£o para atualizar o statusan no banco de dados GARANTIA LENTES
const updateStatusgafle = async (id) => {
    try {
        const connection = await getConnection();
        const query = 'UPDATE controle_garantia_lentes SET statusgalefi = "enviado" WHERE id = ?';
        const [result] = await connection.execute(query, [id]);
        return result.affectedRows > 0;
    } catch (error) {
        console.error('Erro ao atualizar o statusgalefi:', error);
        return false;
    }
};
// FunÃ§Ã£o para atualizar o statusan no banco de dados pap
const updateStatusag = async (id) => {
    try {
        const connection = await getConnection();
        const query = 'UPDATE controle_pap SET statusen = "enviado" WHERE id = ?';
        const [result] = await connection.execute(query, [id]);
        return result.affectedRows > 0;
    } catch (error) {
        console.error('Erro ao atualizar o statusen:', error);
        return false;
    }
};
// FunÃ§Ã£o para atualizar o statusan no banco de dados pap
const updateStatusco = async (id) => {
    try {
        const connection = await getConnection();
        const query = 'UPDATE controle_pap SET statusco = "enviado" WHERE id = ?';
        const [result] = await connection.execute(query, [id]);
        return result.affectedRows > 0;
    } catch (error) {
        console.error('Erro ao atualizar o statusco:', error);
        return false;
    }
};
// FunÃ§Ã£o para atualizar o statusan no banco de dados pap dia antes
const updateStatuscodia = async (id) => {
    try {
        const connection = await getConnection();
        const query = 'UPDATE controle_pap SET statusdiaantes = "enviado" WHERE id = ?';
        const [result] = await connection.execute(query, [id]);
        return result.affectedRows > 0;
    } catch (error) {
        console.error('Erro ao atualizar o statusdiaantes:', error);
        return false;
    }
};

// FunÃ§Ã£o para atualizar o statusip2 importancia de cuidar dos seus oculos (controle de OS) 2
const updateSatusip2 = async (id) => {
    try {
        const connection = await getConnection();
        const query = 'UPDATE controle_os SET statusip2 = "enviado" WHERE id = ?';
        const [result] = await connection.execute(query, [id]);
        return result.affectedRows > 0;
    } catch (error) {
        console.error('Erro ao atualizar o statusip2:', error);
        return false;
    }
};

// FunÃ§Ã£o para atualizar o statusip3 importancia de cuidar dos seus oculos (controle de OS) 3
const updatestatusip3 = async (id) => {
    try {
        const connection = await getConnection();
        const query = 'UPDATE controle_os SET statusip3 = "enviado" WHERE id = ?';
        const [result] = await connection.execute(query, [id]);
        return result.affectedRows > 0;
    } catch (error) {
        console.error('Erro ao atualizar o statusip3:', error);
        return false;
    }
};

// FunÃ§Ã£o para atualizar o statusiip4 importancia de cuidar dos seus oculos (controle de OS) 4
const updateStatusiip4 = async (id) => {
    try {
        const connection = await getConnection();
        const query = 'UPDATE controle_os SET statusiip4 = "enviado" WHERE id = ?';
        const [result] = await connection.execute(query, [id]);
        return result.affectedRows > 0;
    } catch (error) {
        console.error('Erro ao atualizar o statusiip4:', error);
        return false;
    }
};

// FunÃ§Ã£o para atualizar o statusiip5 importancia de cuidar dos seus oculos (controle de OS) 5
const updateStatusip5 = async (id) => {
    try {
        const connection = await getConnection();
        const query = 'UPDATE controle_os SET statusip5 = "enviado" WHERE id = ?';
        const [result] = await connection.execute(query, [id]);
        return result.affectedRows > 0;
    } catch (error) {
        console.error('Erro ao atualizar o statusip5:', error);
        return false;
    }
};

// FunÃ§Ã£o para atualizar o statusiip5 importancia de cuidar dos seus oculos (controle de OS) 6
const updateStatusip6 = async (id) => {
    try {
        const connection = await getConnection();
        const query = 'UPDATE controle_os SET statusip6 = "enviado" WHERE id = ?';
        const [result] = await connection.execute(query, [id]);
        return result.affectedRows > 0;
    } catch (error) {
        console.error('Erro ao atualizar o statusip6:', error);
        return false;
    }
};

// FunÃ§Ã£o para atualizar o renovaÃ§Ã£o dos oculos (controle de OS)
const updateStatusrn = async (id) => {
    try {
        const connection = await getConnection();
        const query = 'UPDATE controle_os SET statusrn = "enviado" WHERE id = ?';
        const [result] = await connection.execute(query, [id]);
        return result.affectedRows > 0;
    } catch (error) {
        console.error('Erro ao atualizar o statusrn:', error);
        return false;
    }
};

// FunÃ§Ã£o para atualizar o renovaÃ§Ã£o dos oculos (controle taxa)
const updateStatastaxa = async (id) => {
    try {
        const connection = await getConnection();
        const query = 'UPDATE taxa_conversao SET statustaxa = "enviado" WHERE id = ?';
        const [result] = await connection.execute(query, [id]);
        return result.affectedRows > 0;
    } catch (error) {
        console.error('Erro ao atualizar o statustaxa:', error);
        return false;
    }
};
// FunÃ§Ã£o para atualizar o renovaÃ§Ã£o dos oculos (controle taxa)
const updateStatasmensagem = async (id) => {
    try {
        const connection = await getConnection();
        const query = 'UPDATE mensagens SET status = "enviado" WHERE id = ?';
        const [result] = await connection.execute(query, [id]);
        return result.affectedRows > 0;
    } catch (error) {
        console.error('Erro ao atualizar o status:', error);
        return false;
    }
};


// FunÃ§Ã£o para obter os registros de agendamento do banco de dados
const agendamentoZDG = async () => {
    try {
        const connection = await getConnection();
        const [rows] = await connection.execute('SELECT * FROM controle_os WHERE statusvd IS NULL OR statusvd = ""');
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
        const [rows] = await connection.execute('SELECT * FROM controle_os WHERE statusfn IS NULL OR statusfn = ""');
        return rows;
    } catch (error) {
        console.error('Erro ao obter os registros de agendamento:', error);
        return [];
    }
};
// FunÃ§Ã£o para obter os registros de agendamento do banco de dados statusad (controle OS)
const agendamentoZDG3 = async () => {
    try {
        const connection = await getConnection();
        const [rows] = await connection.execute('SELECT * FROM controle_os WHERE statusad IS NULL OR statusad = ""');
        return rows;
    } catch (error) {
        console.error('Erro ao obter os registros de agendamento:', error);
        return [];
    }
};
// FunÃ§Ã£o para obter os registros de agendamento do banco de dados statusip importancia de cuidar dos seus oculos (controle OS)
const agendamentoZDG4 = async () => {
    try {
        const connection = await getConnection();
        const [rows] = await connection.execute('SELECT * FROM controle_os WHERE statusip IS NULL OR statusip = ""');
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
        const [rows] = await connection.execute('SELECT * FROM controle_os WHERE sattusde IS NULL OR sattusde = ""');
        return rows;
    } catch (error) {
        console.error('Erro ao obter os registros de agendamento:', error);
        return [];
    }
};
// FunÃ§Ã£o para obter os registros de agendamento do banco de dados coleÃ§Ã£p nova (controle OS)
const agendamentoZDG6 = async () => {
    try {
        const connection = await getConnection();
        const [rows] = await connection.execute('SELECT * FROM controle_os WHERE statuscol IS NULL OR statuscol = ""');
        return rows;
    } catch (error) {
        console.error('Erro ao obter os registros de agendamento:', error);
        return [];
    }
};
// FunÃ§Ã£o para obter os registros de agendamento do banco de dados statusan
const agendamentoZDG7 = async () => {
    try {
        const connection = await getConnection();
        const [rows] = await connection.execute('SELECT * FROM controle_os WHERE statusan IS NULL OR statusan = ""');
        return rows;
    } catch (error) {
        console.error('Erro ao obter os registros de agendamento:', error);
        return [];
    }
};
// FunÃ§Ã£o para obter os registros de agendamento do banco de dados statuss garantia
const agendamentoZDG8 = async () => {
    try {
        const connection = await getConnection();
        const [rows] = await connection.execute('SELECT * FROM controle_garantia WHERE statuss IS NULL OR statuss = ""');
        return rows;
    } catch (error) {
        console.error('Erro ao obter os registros de agendamento:', error);
        return [];
    }
};
// FunÃ§Ã£o para obter os registros de agendamento do banco de dados statusf garantiafi
const agendamentoZDG9 = async () => {
    try {
        const connection = await getConnection();
        const [rows] = await connection.execute('SELECT * FROM controle_garantia WHERE statusf IS NULL OR statusf = ""');
        return rows;
    } catch (error) {
        console.error('Erro ao obter os registros de agendamento:', error);
        return [];
    }
};
// FunÃ§Ã£o para obter os registros de agendamento do banco de dados statusgaleso garantia lentes
const agendamentoZDG18 = async () => {
    try {
        const connection = await getConnection();
        const [rows] = await connection.execute('SELECT * FROM controle_garantia_lentes WHERE statusgaleso IS NULL OR statusgaleso = ""');
        return rows;
    } catch (error) {
        console.error('Erro ao obter os registros de agendamento:', error);
        return [];
    }
};
// FunÃ§Ã£o para obter os registros de agendamento do banco de dados statusgalefi garantiafi lentes
const agendamentoZDG19 = async () => {
    try {
        const connection = await getConnection();
        const [rows] = await connection.execute('SELECT * FROM controle_garantia_lentes WHERE statusgalefi IS NULL OR statusgalefi = ""');
        return rows;
    } catch (error) {
        console.error('Erro ao obter os registros de agendamento:', error);
        return [];
    }
};
// FunÃ§Ã£o para obter os registros de agendamento do banco de dados statusen pap
const agendamentoZDG10 = async () => {
    try {
        const connection = await getConnection();
        const [rows] = await connection.execute('SELECT * FROM controle_pap WHERE statusen IS NULL OR statusen = ""');
        return rows;
    } catch (error) {
        console.error('Erro ao obter os registros de agendamento:', error);
        return [];
    }
};
// FunÃ§Ã£o para obter os registros de agendamento do banco de dados statusco pap
const agendamentoZDG11 = async () => {
    try {
        const connection = await getConnection();
        const [rows] = await connection.execute('SELECT * FROM controle_pap WHERE statusco IS NULL OR statusco = ""');
        return rows;
    } catch (error) {
        console.error('Erro ao obter os registros de agendamento:', error);
        return [];
    }
};
// FunÃ§Ã£o para obter os registros de agendamento do banco de dados statusco pap dia antes
const agendamentoZDG20 = async () => {
    try {
        const connection = await getConnection();
        const [rows] = await connection.execute('SELECT * FROM controle_pap WHERE statusdiaantes IS NULL OR statusdiaantes = ""');
        return rows;
    } catch (error) {
        console.error('Erro ao obter os registros de agendamento:', error);
        return [];
    }
};
// importancia de cuidar dos seus oculos (controle de OS) 2

const agendamentoZDG12 = async () => {
    try {
        const connection = await getConnection();
        const [rows] = await connection.execute('SELECT * FROM controle_os WHERE statusip2 IS NULL OR statusip2 = ""');
        return rows;
    } catch (error) {
        console.error('Erro ao obter os registros de agendamento:', error);
        return [];
    }
};

// importancia de cuidar dos seus oculos (controle de OS) 3

const agendamentoZDG13 = async () => {
    try {
        const connection = await getConnection();
        const [rows] = await connection.execute('SELECT * FROM controle_os WHERE statusip3 IS NULL OR statusip3 = ""');
        return rows;
    } catch (error) {
        console.error('Erro ao obter os registros de agendamento:', error);
        return [];
    }
};

// importancia de cuidar dos seus oculos (controle de OS) 4

const agendamentoZDG14 = async () => {
    try {
        const connection = await getConnection();
        const [rows] = await connection.execute('SELECT * FROM controle_os WHERE statusiip4 IS NULL OR statusiip4 = ""');
        return rows;
    } catch (error) {
        console.error('Erro ao obter os registros de agendamento:', error);
        return [];
    }
};

// importancia de cuidar dos seus oculos (controle de OS) 5

const agendamentoZDG15 = async () => {
    try {
        const connection = await getConnection();
        const [rows] = await connection.execute('SELECT * FROM controle_os WHERE statusip5 IS NULL OR statusip5 = ""');
        return rows;
    } catch (error) {
        console.error('Erro ao obter os registros de agendamento:', error);
        return [];
    }
};

// importancia de cuidar dos seus oculos (controle de OS) 6

const agendamentoZDG16 = async () => {
    try {
        const connection = await getConnection();
        const [rows] = await connection.execute('SELECT * FROM controle_os WHERE statusip6 IS NULL OR statusip6 = ""');
        return rows;
    } catch (error) {
        console.error('Erro ao obter os registros de agendamento:', error);
        return [];
    }
};


// RenovaÃ§Ã£o dos oculos (controle OS)

const agendamentoZDG17 = async () => {
    try {
        const connection = await getConnection();
        const [rows] = await connection.execute('SELECT * FROM controle_os WHERE statusrn IS NULL OR statusrn = ""');
        return rows;
    } catch (error) {
        console.error('Erro ao obter os registros de agendamento:', error);
        return [];
    }
};

// RenovaÃ§Ã£o dos oculos (controle taxa)

const agendamentoZDG21 = async () => {
    try {
        const connection = await getConnection();
        const [rows] = await connection.execute('SELECT * FROM taxa_conversao WHERE statustaxa IS NULL OR statustaxa = ""');
        return rows;
    } catch (error) {
        console.error('Erro ao obter os registros de agendamento:', error);
        return [];
    }
};

const agendamentoZDG22 = async () => {
    try {
        const connection = await getConnection();
        const [rows] = await connection.execute('SELECT * FROM mensagens WHERE status IS NULL OR status = ""');
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
        clientId: 'bot-zdg_8002', // Provided clientId
        // Para o primeiro cliente
        dataPath: path.join(__dirname, '..', 'sessions', 'instancia8002')
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

/////INICIO///////





// Estrutura para controlar o estado de clientes aguardando resposta
const clientesAguardandoResposta = {};

// Opções de categorias de despesa
const opcoesCategoria = {
    1: 'Despesas com Ocupação',
    2: 'Despesas Comunicação',
    3: 'Despesas com Pessoal',
    4: 'Despesas com Publicidade/MKT',
    5: 'Despesas Adm/Expediente',
    6: 'Despesas com Franquia',
    7: 'Manutenção e Reparos',
    8: 'Impostos'
};

// Função para processar a mensagem recebida
client.on('message', async (message) => {
    const { from, body } = message;
    
    try {
        if (body.toLowerCase() === 'adicionar conta') {
            iniciarInclusaoConta(from);
        } else if (clientesAguardandoResposta[from]) {
            await processarRespostaCliente(from, body);
        }
    } catch (error) {
        console.error('Erro ao processar mensagem:', error);
        await enviarMensagem(from, 'Ocorreu um erro ao processar sua mensagem. Por favor, tente novamente.');
    }
});

// Função para iniciar o processo de inclusão de conta
const iniciarInclusaoConta = async (clientId) => {
    clientesAguardandoResposta[clientId] = { passo: 1 };
    await enviarMensagem(clientId, 'Olá! Qual é a categoria da despesa?\n1. Despesas com Ocupação\n2. Despesas Comunicação\n3. Despesas com Pessoal\n4. Despesas com Publicidade/MKT\n5. Despesas Adm/Expediente\n6. Despesas com Franquia\n7. Manutenção e Reparos\n8. Impostos');
};

// Função para processar a resposta do cliente
const processarRespostaCliente = async (clientId, resposta) => {
    const estadoCliente = clientesAguardandoResposta[clientId];

    try {
        switch (estadoCliente.passo) {
            case 1:
                await processarCategoria(clientId, resposta);
                break;
            case 2:
                await processarValor(clientId, resposta);
                break;
            case 3:
                await processarObs(clientId, resposta);
                break;
            case 4:
                await processarConfirmacao(clientId, resposta);
                break;
            default:
                await enviarMensagem(clientId, 'Ocorreu um erro no processamento da sua solicitação. Por favor, tente novamente.');
        }
    } catch (error) {
        console.error('Erro ao processar resposta do cliente:', error);
        await enviarMensagem(clientId, 'Ocorreu um erro ao processar sua resposta. Por favor, tente novamente.');
    }
};

// Função para processar a categoria enviada pelo cliente
const processarCategoria = async (clientId, resposta) => {
    const conexao = await getConnection();
    try {
        const opcao = parseInt(resposta);
        if (opcao >= 1 && opcao <= 8) {
            await enviarMensagem(clientId, 'Por favor, informe o valor da despesa (ATENÇÃO NÃO PODE INCLUIR PONTOS E VIRGULAS):');
            clientesAguardandoResposta[clientId].passo = 2;
            clientesAguardandoResposta[clientId].categoria = opcoesCategoria[opcao];
        } else {
            await enviarMensagem(clientId, 'Por favor, responda com o número correspondente à sua escolha (1 a 8).');
        }
    } catch (error) {
        console.error('Erro ao processar categoria:', error);
        await enviarMensagem(clientId, 'Ocorreu um erro ao processar a categoria. Por favor, tente novamente.');
    } finally {
        conexao.end();
    }
};

// Função para processar o valor da despesa enviada pelo cliente
const processarValor = async (clientId, valor) => {
    clientesAguardandoResposta[clientId].valor = valor;
    clientesAguardandoResposta[clientId].passo = 3;
    await enviarMensagem(clientId, 'Por favor, informe qualquer observação adicional ou digite "N/A" se não houver nenhuma:');
};

// Função para processar a observação enviada pelo cliente
const processarObs = async (clientId, obs) => {
    clientesAguardandoResposta[clientId].obs = obs;
    clientesAguardandoResposta[clientId].passo = 4;
    const { categoria, valor } = clientesAguardandoResposta[clientId];
    await enviarMensagem(clientId, `Você adicionou a conta:\nCategoria: ${categoria}\nValor: ${valor}\nObservação: ${obs}\n\nDeseja confirmar? (Sim/Não)`);
};

// Função para processar a confirmação enviada pelo cliente
const processarConfirmacao = async (clientId, resposta) => {
    const conexao = await getConnection();
    try {
        if (resposta.toLowerCase() === 'sim') {
            const { categoria, valor, obs } = clientesAguardandoResposta[clientId];
            await conexao.execute(
                'INSERT INTO contas_diarias (categoria, valor, fone, data, obs) VALUES (?, ?, ?, NOW(), ?)',
                [categoria, valor, clientId, obs]
            );
            await enviarMensagem(clientId, 'Conta incluída com sucesso!');
            delete clientesAguardandoResposta[clientId];
        } else if (resposta.toLowerCase() === 'não') {
            delete clientesAguardandoResposta[clientId];
            await enviarMensagem(clientId, 'Processo de inclusão de conta cancelado. Você pode iniciar novamente enviando "adicionar conta".');
        } else {
            await enviarMensagem(clientId, 'Resposta inválida. Por favor, responda com "Sim" ou "Não".');
        }
    } catch (error) {
        console.error('Erro ao processar confirmação:', error);
        await enviarMensagem(clientId, 'Ocorreu um erro ao processar a confirmação. Por favor, tente novamente.');
    } finally {
        conexao.end();
    }
};

// Função para enviar mensagem para um determinado cliente
const enviarMensagem = async (clientId, mensagem) => {
    try {
        await client.sendMessage(clientId, mensagem);
        console.log(`Enviando mensagem para ${clientId}: ${mensagem}`);
    } catch (error) {
        console.error('Erro ao enviar mensagem:', error);
    }
};



//////FIM///////


/////INICIO METAS CONSULTOR////////




// Variável para controlar o estado do cliente aguardando resposta
const clientesAguardandoRespostaMetas = {};

// Configuração do evento de recebimento de mensagens
client.on('message', async (message) => {
    const { from, body } = message;

    try {
        if (body.toLowerCase() === 'metas diarias') {
            iniciarInclusaoMetas(from);
        } else if (clientesAguardandoRespostaMetas[from]) {
            await processarRespostaMetas(from, body);
        }
    } catch (error) {
        console.error('Erro ao processar mensagem:', error);
        await enviarMensagemMetas(from, 'Ocorreu um erro ao processar sua mensagem. Por favor, tente novamente.');
    }
});

// Função para iniciar o processo de inclusão de metas diárias
const iniciarInclusaoMetas = async (clientId) => {
    clientesAguardandoRespostaMetas[clientId] = {};
    await enviarMensagemMetas(clientId, 'Olá! Por favor, informe a data (formato DD/MM/YYYY):');
};

// Função para processar a resposta do cliente
const processarRespostaMetas = async (clientId, resposta) => {
    try {
        const estado = clientesAguardandoRespostaMetas[clientId];

        if (!estado.data) {
            await processarDataMetas(clientId, resposta);
        } else if (!estado.consultor) {
            await processarConsultorMetas(clientId, resposta);
        } else if (!estado.dh_deb_pix) {
            await processarValorMetas(clientId, 'dh_deb_pix', resposta, 'Por favor, informe o valor de DH/Deb/Pix: ATENÇÃO NÃO PODE INCLUIR PONTOS E VIRGULAS');
        } else if (!estado.cartao_credito) {
            await processarValorMetas(clientId, 'cartao_credito', resposta, 'Por favor, informe o valor do Cartão de Crédito:');
        } else if (!estado.carne) {
            await processarValorMetas(clientId, 'carne', resposta, 'Por favor, informe o valor do Carnê:');
        } else if (!estado.saldo) {
            await processarValorMetas(clientId, 'saldo', resposta, 'Por favor, informe o valor do Saldo:');
        } else if (!estado.vendas) {
            await processarVendasMetas(clientId, resposta);
        } else {
            await processarConfirmacaoMetas(clientId, resposta);
        }
    } catch (error) {
        console.error('Erro ao processar resposta do cliente:', error);
        await enviarMensagemMetas(clientId, 'Ocorreu um erro ao processar sua resposta. Por favor, tente novamente.');
    }
};

// Função para processar a data enviada pelo cliente
const processarDataMetas = async (clientId, data) => {
    try {
        if (/^\d{2}\/\d{2}\/\d{4}$/.test(data)) {
            const [dia, mes, ano] = data.split('/');
            const dataFormatada = `${ano}-${mes}-${dia}`;
            clientesAguardandoRespostaMetas[clientId].data = dataFormatada;
            await listarConsultoresMetas(clientId);
        } else {
            await enviarMensagemMetas(clientId, 'Por favor, informe a data no formato DD/MM/YYYY.');
        }
    } catch (error) {
        console.error('Erro ao processar data:', error);
        await enviarMensagemMetas(clientId, 'Ocorreu um erro ao processar a data. Por favor, tente novamente.');
    }
};

// Função para listar consultores disponíveis
const listarConsultoresMetas = async (clientId) => {
    const conexao = await getConnection();
    try {
        const [rows] = await conexao.execute('SELECT nome FROM consultor');
        const consultores = rows.map(row => row.nome);
        if (consultores.length > 0) {
            await enviarMensagemMetas(clientId, 'Selecione o consultor:\n' + consultores.map((nome, index) => `${index + 1}. ${nome}`).join('\n'));
        } else {
            await enviarMensagemMetas(clientId, 'Nenhum consultor encontrado.');
            delete clientesAguardandoRespostaMetas[clientId];
        }
    } catch (error) {
        console.error('Erro ao listar consultores:', error);
        await enviarMensagemMetas(clientId, 'Ocorreu um erro ao listar os consultores. Por favor, tente novamente.');
    } finally {
        conexao.end();
    }
};

// Função para processar a escolha do consultor
const processarConsultorMetas = async (clientId, resposta) => {
    const conexao = await getConnection();
    try {
        const [rows] = await conexao.execute('SELECT nome FROM consultor');
        const consultores = rows.map(row => row.nome);
        const opcao = parseInt(resposta) - 1;
        if (opcao >= 0 && opcao < consultores.length) {
            clientesAguardandoRespostaMetas[clientId].consultor = consultores[opcao];
            await enviarMensagemMetas(clientId, 'Por favor, informe o valor de DH/Deb/Pix: ATENÇÃO NÃO PODE INCLUIR PONTOS E VIRGULAS');
        } else {
            await enviarMensagemMetas(clientId, 'Opção inválida. Por favor, selecione o consultor novamente:\n' + consultores.map((nome, index) => `${index + 1}. ${nome}`).join('\n'));
        }
    } catch (error) {
        console.error('Erro ao processar consultor:', error);
        await enviarMensagemMetas(clientId, 'Ocorreu um erro ao processar o consultor. Por favor, tente novamente.');
    } finally {
        conexao.end();
    }
};

// Função para processar o valor de DH/Deb/Pix, Cartão de Crédito, Carnê, Saldo
const processarValorMetas = async (clientId, campo, valor, mensagem) => {
    try {
        clientesAguardandoRespostaMetas[clientId][campo] = valor;
        if (campo === 'dh_deb_pix') {
            await enviarMensagemMetas(clientId, 'Por favor, informe o valor do Cartão de Crédito:');
        } else if (campo === 'cartao_credito') {
            await enviarMensagemMetas(clientId, 'Por favor, informe o valor do Carnê:');
        } else if (campo === 'carne') {
            await enviarMensagemMetas(clientId, 'Por favor, informe o valor do Saldo:');
        } else if (campo === 'saldo') {
            await processarVendasMetas(clientId);
        }
    } catch (error) {
        console.error(`Erro ao processar ${campo}:`, error);
        await enviarMensagemMetas(clientId, `Ocorreu um erro ao processar o valor de ${campo}. Por favor, tente novamente.`);
    }
};

// Função para processar o número de Vendas
const processarVendasMetas = async (clientId, resposta) => {
    try {
        // Verifica se a resposta é um número válido
        const vendas = parseInt(resposta);
        if (isNaN(vendas)) {
            await enviarMensagemMetas(clientId, 'Por favor, informe um número válido para o número de vendas.');
        } else {
            clientesAguardandoRespostaMetas[clientId].vendas = vendas;
            const { data, consultor, dh_deb_pix, cartao_credito, carne, saldo } = clientesAguardandoRespostaMetas[clientId];
            await enviarMensagemMetas(clientId, `Você adicionou as metas diárias:\nData: ${data}\nConsultor: ${consultor}\nDH/Deb/Pix: ${dh_deb_pix}\nCartão de Crédito: ${cartao_credito}\nCarnê: ${carne}\nSaldo: ${saldo}\nVendas: ${vendas}\n\nDeseja confirmar? (Sim/Não)`);
        }
    } catch (error) {
        console.error('Erro ao processar Vendas:', error);
        await enviarMensagemMetas(clientId, 'Ocorreu um erro ao processar o número de Vendas. Por favor, tente novamente.');
    }
};

// Função para processar a confirmação enviada pelo cliente
const processarConfirmacaoMetas = async (clientId, resposta) => {
    const conexao = await getConnection();
    try {
        if (resposta.toLowerCase() === 'sim') {
            const { data, consultor, dh_deb_pix, cartao_credito, carne, saldo, vendas } = clientesAguardandoRespostaMetas[clientId];
            await conexao.execute(
                'INSERT INTO forma_pagemento_consultor (data, dh_deb_pix, cartao_credito, carne, saldo, consultor, vendas) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [data, dh_deb_pix, cartao_credito, carne, saldo, consultor, vendas]
            );
            await enviarMensagemMetas(clientId, 'Metas diárias incluídas com sucesso!');
            delete clientesAguardandoRespostaMetas[clientId];
        } else if (resposta.toLowerCase() === 'não') {
            delete clientesAguardandoRespostaMetas[clientId];
            await enviarMensagemMetas(clientId, 'Processo de inclusão de metas diárias cancelado. Você pode iniciar novamente enviando "metas diarias".');
        } else {
            await enviarMensagemMetas(clientId, 'Resposta inválida. Por favor, responda com "Sim" ou "Não".');
        }
    } catch (error) {
        console.error('Erro ao processar confirmação:', error);
        await enviarMensagemMetas(clientId, 'Ocorreu um erro ao processar a confirmação. Por favor, tente novamente.');
    } finally {
        conexao.end();
    }
};

// Função para enviar mensagem para um determinado cliente
const enviarMensagemMetas = async (clientId, mensagem) => {
    try {
        await client.sendMessage(clientId, mensagem);
        console.log(`Enviando mensagem para ${clientId}: ${mensagem}`);
    } catch (error) {
        console.error('Erro ao enviar mensagem:', error);
    }
};

// Supondo que você tenha uma função getConnection() para estabelecer a conexão com o banco de dados

// Supondo que você tenha configurado o cliente WhatsApp anteriormente


//////FIM METAS DIARIAS///////

///// INICIO METAS MENSAIS //////

// Variável para manter o estado do cliente aguardando resposta
const clientesAguardandoRespostaMetasMensais = {};

// Configuração do evento de recebimento de mensagens
client.on('message', async (message) => {
    const { from, body } = message;
    try {
        if (body.toLowerCase() === 'metas mensais') {
            // Cliente iniciou o processo de metas mensais
            clientesAguardandoRespostaMetasMensais[from] = { mes: null, consultor: null, meta_total: null };
            await enviarMensagemMetasMensais(from, 'Olá! Por favor, informe o mês (1 para Janeiro, 2 para Fevereiro, etc.):');
        } else if (clientesAguardandoRespostaMetasMensais[from]) {
            const estado = clientesAguardandoRespostaMetasMensais[from];
            if (!estado.mes) {
                // Processar resposta do mês
                await processarMesMetasMensais(from, body);
            } else if (!estado.consultor) {
                // Processar resposta do consultor
                await processarConsultorMetasMensais(from, body);
            } else if (!estado.meta_total) {
                // Processar resposta da meta total
                await processarMetaTotalMetasMensais(from, body);
            } else {
                // Processar resposta de confirmação
                await processarConfirmacaoMetasMensais(from, body);
            }
        }
    } catch (error) {
        console.error('Erro ao processar mensagem:', error);
        await enviarMensagemMetasMensais(from, 'Ocorreu um erro ao processar sua mensagem. Por favor, tente novamente.');
    }
});

// Função para processar o mês enviado pelo cliente
const processarMesMetasMensais = async (clientId, mes) => {
    try {
        console.log('Número do mês recebido:', mes);
        const numeroMes = parseInt(mes);
        console.log('Número do mês convertido:', numeroMes);
        if (!isNaN(numeroMes) && numeroMes >= 1 && numeroMes <= 12) {
            clientesAguardandoRespostaMetasMensais[clientId].mes = numeroMes;
            await listarConsultoresMetasMensais(clientId);
        } else {
            const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
            if (meses.includes(mes)) {
                clientesAguardandoRespostaMetasMensais[clientId].mes = meses.indexOf(mes) + 1;
                await listarConsultoresMetasMensais(clientId);
            } else {
                await enviarMensagemMetasMensais(clientId, 'Por favor, informe um mês válido (1 a 12 ou o nome do mês em português).');
            }
        }
    } catch (error) {
        console.error('Erro ao processar mês:', error);
        await enviarMensagemMetasMensais(clientId, 'Ocorreu um erro ao processar o mês. Por favor, tente novamente.');
    }
};

// Função para listar consultores da tabela 'consultor'
const listarConsultoresMetasMensais = async (clientId) => {
    const conexao = await getConnection();
    try {
        const [rows] = await conexao.execute('SELECT nome FROM consultor');
        const consultores = rows.map(row => row.nome);
        if (consultores.length > 0) {
            await enviarMensagemMetasMensais(clientId, 'Selecione o consultor:\n' + consultores.map((nome, index) => `${index + 1}. ${nome}`).join('\n'));
        } else {
            await enviarMensagemMetasMensais(clientId, 'Nenhum consultor encontrado.');
            delete clientesAguardandoRespostaMetasMensais[clientId];
        }
    } catch (error) {
        console.error('Erro ao listar consultores:', error);
        await enviarMensagemMetasMensais(clientId, 'Ocorreu um erro ao listar os consultores. Por favor, tente novamente.');
        delete clientesAguardandoRespostaMetasMensais[clientId];
    } finally {
        conexao.end();
    }
};

// Função para processar a escolha do consultor
const processarConsultorMetasMensais = async (clientId, resposta) => {
    const conexao = await getConnection();
    try {
        const [rows] = await conexao.execute('SELECT nome FROM consultor');
        const consultores = rows.map(row => row.nome);
        const opcao = parseInt(resposta) - 1;
        if (opcao >= 0 && opcao < consultores.length) {
            clientesAguardandoRespostaMetasMensais[clientId].consultor = consultores[opcao];
            await enviarMensagemMetasMensais(clientId, 'Por favor, informe o valor da meta total: ATENÇÃO NÃO PODE INCLUIR PONTOS E VIRGULAS');
        } else {
            await enviarMensagemMetasMensais(clientId, 'Opção inválida. Por favor, selecione o consultor novamente:\n' + consultores.map((nome, index) => `${index + 1}. ${nome}`).join('\n'));
        }
    } catch (error) {
        console.error('Erro ao processar consultor:', error);
        await enviarMensagemMetasMensais(clientId, 'Ocorreu um erro ao processar o consultor. Por favor, tente novamente.');
    } finally {
        conexao.end();
    }
};

// Função para processar o valor da meta total
const processarMetaTotalMetasMensais = async (clientId, metaTotal) => {
    try {
        console.log('Meta total recebida:', metaTotal); // Adicionando instrução de console
        const numeroMetaTotal = parseFloat(metaTotal);
        console.log('Número da meta total:', numeroMetaTotal); // Adicionando instrução de console
        if (!isNaN(numeroMetaTotal) && numeroMetaTotal > 0) {
            clientesAguardandoRespostaMetasMensais[clientId].meta_total = numeroMetaTotal;
            const estado = clientesAguardandoRespostaMetasMensais[clientId];
            await enviarMensagemMetasMensais(clientId, `Confirme se os dados estão corretos:\nMês: ${estado.mes}\nConsultor: ${estado.consultor}\nMeta Total: ${estado.meta_total}\nDigite "Sim" para confirmar ou "Não" para reiniciar o processo.`);
        } else {
            await enviarMensagemMetasMensais(clientId, 'Por favor, informe um valor válido para a meta total.');
        }
    } catch (error) {
        console.error('Erro ao processar meta total:', error);
        await enviarMensagemMetasMensais(clientId, 'Ocorreu um erro ao processar o valor da meta total. Por favor, tente novamente.');
    }
};

// Função para enviar mensagem para um determinado cliente
const enviarMensagemMetasMensais = async (clientId, mensagem) => {
    try {
        await client.sendMessage(clientId, mensagem);
        console.log(`Enviando mensagem para ${clientId}: ${mensagem}`);
    } catch (error) {
        console.error('Erro ao enviar mensagem:', error);
    }
};

// Função para converter número do mês para o nome do mês em português
const converterNumeroParaNomeMes = (numeroMes) => {
    const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    return meses[parseInt(numeroMes) - 1]; // Subtrai 1 para corresponder ao índice do array
};

// Função para calcular os dias úteis em um mês
const calcularDiasUteisNoMes = (ano, mes) => {
    const diasNoMes = new Date(ano, mes, 0).getDate();
    let diasUteis = 0;
    for (let dia = 1; dia <= diasNoMes; dia++) {
        const data = new Date(ano, mes - 1, dia);
        if (data.getDay() !== 0 && data.getDay() !== 6) {
            diasUteis++;
        }
    }
    return diasUteis;
};

// Função para inserir metas mensais no banco de dados e calcular metas diárias
const inserirMetasMensaisECalcularMetasDiarias = async (clientId, mes, consultor, metaTotal) => {
    console.log('Parâmetros:', { clientId, mes, consultor, metaTotal });
    const conexao = await getConnection();
    try {
        // Verificar se o número do mês é válido
        if (mes < 1 || mes > 12) {
            throw new Error('Número de mês inválido.');
        }

        const nomeMes = converterNumeroParaNomeMes(parseInt(mes));
        const metaTotalValido = metaTotal ? parseFloat(metaTotal) : null; // Verifica se metaTotal é definido e válido
        if (!nomeMes || !consultor || !metaTotalValido) {
            throw new Error('Parâmetros inválidos.'); // Lança um erro se algum parâmetro for inválido
        }

        // Inserir metas mensais
        console.log('Inserindo metas mensais...');
        await conexao.execute('INSERT INTO metas (mes, consultor, meta_total) VALUES (?, ?, ?)', [nomeMes, consultor, metaTotalValido]);

        // Calcular metas diárias
        console.log('Calculando metas diárias...');
        const diasUteis = calcularDiasUteisNoMes(2024, parseInt(mes));
        const metaDiaria = metaTotalValido / diasUteis;

        // Inserir metas diárias
        console.log('Inserindo metas diárias...');
        const dataInicio = new Date(2024, parseInt(mes) - 1, 1);
        const dataFim = new Date(2024, parseInt(mes), 0);
        const dataAtual = new Date(dataInicio);

        while (dataAtual <= dataFim) {
            if (dataAtual.getDay() !== 0 && dataAtual.getDay() !== 6) { // Ignorar sábado e domingo
                const formattedDate = `${dataAtual.getFullYear()}-${(dataAtual.getMonth() + 1).toString().padStart(2, '0')}-${dataAtual.getDate().toString().padStart(2, '0')}`;
                await conexao.execute('INSERT INTO metas_diarias (consultor, data, meta_diaria) VALUES (?, ?, ?)', [consultor, formattedDate, metaDiaria]);
            }
            dataAtual.setDate(dataAtual.getDate() + 1);
        }

        // Mensagem de sucesso
        console.log('Metas mensais inseridas com sucesso!');
        await enviarMensagemMetasMensais(clientId, 'Metas mensais inseridas com sucesso!');
    } catch (error) {
        console.error('Erro ao inserir metas mensais:', error);
        throw error;
    } finally {
        conexao.end();
    }
};

// Variável para rastrear confirmação enviada
const confirmacaoEnviada = {};

// Função para processar a confirmação das metas mensais
const processarConfirmacaoMetasMensais = async (clientId, confirmacao) => {
    if (confirmacao.toLowerCase() === 'sim') {
        const { mes, consultor, meta_total } = clientesAguardandoRespostaMetasMensais[clientId];
        try {
            await inserirMetasMensaisECalcularMetasDiarias(clientId, mes, consultor, meta_total);
            if (!confirmacaoEnviada[clientId]) {
                await enviarMensagemMetasMensais(clientId, 'Metas mensais inseridas com sucesso!');
                confirmacaoEnviada[clientId] = true; // Marca a confirmação como enviada
            }
            delete clientesAguardandoRespostaMetasMensais[clientId];
        } catch (error) {
            console.error('Erro ao inserir metas mensais:', error);
            await enviarMensagemMetasMensais(clientId, 'Ocorreu um erro ao inserir as metas mensais. Por favor, tente novamente.');
        }
    } else {
        await enviarMensagemMetasMensais(clientId, 'Processo de inserção de metas mensais cancelado.');
        delete clientesAguardandoRespostaMetasMensais[clientId];
    }
};



////// FIM DE METAS MENSAIS //////





/////INICO STATUS METAS/////

// Configuração do evento de recebimento de mensagens
client.on('message', async (message) => {
    const { from, body } = message;
    try {
        if (body.toLowerCase() === 'status da meta') {
            await enviarStatusDaMeta(from);
        }
    } catch (error) {
        console.error('Erro ao processar mensagem:', error);
        await enviarMensagem(from, 'Ocorreu um erro ao processar sua mensagem. Por favor, tente novamente.');
    }
});

// Função para enviar o status da meta para o destinatário especificado
async function enviarStatusDaMeta(to) {
    const url = 'https://statuspropria.pontestec.com.br/'; // URL do status da meta
    try {
        await client.sendMessage(to, url);
        console.log(`Status da meta enviado para ${to}`);
    } catch (error) {
        console.error('Erro ao enviar status da meta:', error);
        // Tratar o erro conforme necessário
    }
}




//////FIM STATUS META/////



// Inicia o cliente WhatsApp
client.initialize();


client.on('ready', async () => {
    // Add your scheduled task here
    nodeCron.schedule('*/5 8-18 * * *', async function () {
        try {

                const agendamentosSolicitacao = await agendamentoZDG();
                const agendamentosFinalizacao = await agendamentoZDG2();
                const agendamentosstatusad = await agendamentoZDG3();
                const agendamentosdataip = await agendamentoZDG4();
                const agendamentosdatede = await agendamentoZDG5();
                const agendamentosdatecol = await agendamentoZDG6();
                const agendamentosdata_aniversario = await agendamentoZDG7();
                const agendamentosgarantia = await agendamentoZDG8();
                const agendamentosgarantiafi = await agendamentoZDG9();
                const agendamentospap = await agendamentoZDG10();
                const agendamentospapd = await agendamentoZDG11();
                const agendamentosdateip2 = await agendamentoZDG12();
                const agendamentosdateip3 = await agendamentoZDG13();
                const agendamentosdateip4 = await agendamentoZDG14();
                const agendamentosdateip5 = await agendamentoZDG15();
                const agendamentosdateip6 = await agendamentoZDG16();
                const agendamentosdatern = await agendamentoZDG17();
                const agendamentosgarantiafile = await agendamentoZDG18();
                const agendamentosgarantiafilefi = await agendamentoZDG19();
                const agendamentospapdia = await agendamentoZDG20();
                const agendamentostaxa = await agendamentoZDG21();
                const agendamentosmensagem = await agendamentoZDG22();

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
                                const linkURL = 'https://www.instagram.com/oticasdiniz.propria/'; // Replace this with your desired link URL
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

                for (const agendamento of agendamentosFinalizacao) {
                    if (agendamento.data_finalizacao && agendamento.data_finalizacao <= hoje && !agendamento.enviado) {
                        // Marcar o agendamento como enviado
                        agendamento.enviado = true;

                        if (agendamento.nome !== '') {
                            client.sendMessage(agendamento.fone + '@c.us', agendamento.nome);
                        }

                        if (agendamento.mensagemfn && agendamento.mensagemfn !== '') {
                            console.log('URL da mensagemfn:', agendamento.mensagemfn);
                            try {
                                const media = await MessageMedia.fromUrl(agendamento.mensagemfn);
                                client.sendMessage(agendamento.fone + '@c.us', media, { caption: '' });
                            } catch (error) {
                                console.error('Erro ao obter a mensagemfn:', error);
                            }
                        }

                        const success = await updateStatusfn(agendamento.id);
                        if (success) {
                            console.log('BOT-ZDG - Mensagem ID: ' + agendamento.id + ' - statusfn atualizado para "enviado"');
                        } else {
                            console.log('BOT-ZDG - Falha ao atualizar o statusfn da mensagem ID: ' + agendamento.id);
                        }
                    }
                }


                for (const agendamento of agendamentosstatusad) {
                    if (agendamento.dataad && agendamento.dataad <= hoje && !agendamento.enviado) {
                        // Marcar o agendamento como enviado
                        agendamento.enviado = true;

                        if (agendamento.nome !== '') {
                            client.sendMessage(agendamento.fone + '@c.us', agendamento.nome);
                        }
                        if (agendamento.mensagemad && agendamento.mensagemad !== '') {
                            console.log('URL da mensagemad:', agendamento.mensagemad);
                            try {
                                const media = await MessageMedia.fromUrl(agendamento.mensagemad);
                                client.sendMessage(agendamento.fone + '@c.us', media, { caption: '' });
                            } catch (error) {
                                console.error('Erro ao obter a mensagemad:', error);
                            }
                        }

                        const success = await updateStatusad(agendamento.id);
                        if (success) {
                            console.log('BOT-ZDG - Mensagem ID: ' + agendamento.id + ' - statusad atualizado para "enviado"');
                        } else {
                            console.log('BOT-ZDG - Falha ao atualizar o statusad da mensagem ID: ' + agendamento.id);
                        }
                    }
                }

                // mensagem de cuidar do seus oculos (controle OS)

                for (const agendamento of agendamentosdataip) {
                    if (agendamento.dataip && agendamento.dataip <= hoje && !agendamento.enviado) {
                        // Marcar o agendamento como enviado
                        agendamento.enviado = true;

                        if (agendamento.nome !== '') {
                            client.sendMessage(agendamento.fone + '@c.us', agendamento.nome);
                        }

                        if (agendamento.mensagemip && agendamento.mensagemip !== '') {
                            console.log('URL da mensagemip:', agendamento.mensagemip);
                            try {
                                const media = await MessageMedia.fromUrl(agendamento.mensagemip);
                                client.sendMessage(agendamento.fone + '@c.us', media, { caption: '' });
                            } catch (error) {
                                console.error('Erro ao obter a mensagemip:', error);
                            }
                        }

                        const success = await updateStatusip(agendamento.id);
                        if (success) {
                            console.log('BOT-ZDG - Mensagem ID: ' + agendamento.id + ' - statusip atualizado para "enviado"');
                        } else {
                            console.log('BOT-ZDG - Falha ao atualizar o statusip da mensagem ID: ' + agendamento.id);
                        }
                    }
                }

                // mensagem desconto (controle OS)
                for (const agendamento of agendamentosdatede) {
                    if (agendamento.datede && agendamento.datede <= hoje && !agendamento.enviado) {
                        // Marcar o agendamento como enviado
                        agendamento.enviado = true;

                        if (agendamento.nome !== '') {
                            client.sendMessage(agendamento.fone + '@c.us', agendamento.nome);
                        }

                        if (agendamento.mensagemde && agendamento.mensagemde !== '') {
                            console.log('URL da mensagemde:', agendamento.mensagemde);
                            try {
                                const media = await MessageMedia.fromUrl(agendamento.mensagemde);
                                client.sendMessage(agendamento.fone + '@c.us', media, { caption: '' });
                            } catch (error) {
                                console.error('Erro ao obter a mensagemde:', error);
                            }
                        }

                        const success = await updateSattusde(agendamento.id);
                        if (success) {
                            console.log('BOT-ZDG - Mensagem ID: ' + agendamento.id + ' - sattusde atualizado para "enviado"');
                        } else {
                            console.log('BOT-ZDG - Falha ao atualizar o sattusde da mensagem ID: ' + agendamento.id);
                        }
                    }
                }

                // Mensagem coleÃ§Ã£o nova (controle OS)
                for (const agendamento of agendamentosdatecol) {
                    if (agendamento.datecol && agendamento.datecol <= hoje && !agendamento.enviado) {
                        // Marcar o agendamento como enviado
                        agendamento.enviado = true;

                        if (agendamento.nome !== '') {
                            client.sendMessage(agendamento.fone + '@c.us', agendamento.nome);
                        }

                        if (agendamento.mesnagemcol && agendamento.mesnagemcol !== '') {
                            console.log('URL da mesnagemcol:', agendamento.mesnagemcol);
                            try {
                                const media = await MessageMedia.fromUrl(agendamento.mesnagemcol);
                                client.sendMessage(agendamento.fone + '@c.us', media, { caption: '' });
                            } catch (error) {
                                console.error('Erro ao obter a mesnagemcol:', error);
                            }
                        }

                        const success = await updateStatuscol(agendamento.id);
                        if (success) {
                            console.log('BOT-ZDG - Mensagem ID: ' + agendamento.id + ' - statuscol atualizado para "enviado"');
                        } else {
                            console.log('BOT-ZDG - Falha ao atualizar o statuscol da mensagem ID: ' + agendamento.id);
                        }
                    }
                }

                // Mensagem de Aniversario (controle OS)
                for (const agendamento of agendamentosdata_aniversario) {
                    if (agendamento.data_aniversario && agendamento.data_aniversario <= hoje && !agendamento.enviado) {
                        // Marcar o agendamento como enviado
                        agendamento.enviado = true;

                        if (agendamento.nome !== '') {
                            client.sendMessage(agendamento.fone + '@c.us', agendamento.nome);
                        }
                        if (agendamento.mensageman && agendamento.mensageman !== '') {
                            console.log('URL da mensageman:', agendamento.mensageman);
                            try {
                                const media = await MessageMedia.fromUrl(agendamento.mensageman);
                                client.sendMessage(agendamento.fone + '@c.us', media, { caption: '' });
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
                        agendamento.enviado = true;

                        if (agendamento.nome !== '') {
                            client.sendMessage(agendamento.fone + '@c.us', agendamento.nome);
                        }

                        if (agendamento.mensagems && agendamento.mensagems !== '') {
                            console.log('URL da mensagems:', agendamento.mensagems);
                            try {
                                const media = await MessageMedia.fromUrl(agendamento.mensagems);
                                client.sendMessage(agendamento.fone + '@c.us', media, { caption: '' });
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
                        agendamento.enviado = true;

                        if (agendamento.nome !== '') {
                            client.sendMessage(agendamento.fone + '@c.us', agendamento.nome);
                        }

                        if (agendamento.mensagemf && agendamento.mensagemf !== '') {
                            console.log('URL da mensagemf:', agendamento.mensagemf);
                            try {
                                const media = await MessageMedia.fromUrl(agendamento.mensagemf);
                                client.sendMessage(agendamento.fone + '@c.us', media, { caption: '' });
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

                for (const agendamento of agendamentosgarantiafile) {
                    if (agendamento.data_solicitacao && agendamento.data_solicitacao <= hoje && !agendamento.enviado) {
                        // Marcar o agendamento como enviado
                        agendamento.enviado = true;

                        if (agendamento.nome !== '') {
                            client.sendMessage(agendamento.FONE + '@c.us', agendamento.nome);
                        }

                        if (agendamento.mensagemgaleso && agendamento.mensagemgaleso !== '') {
                            console.log('URL da mensagemgaleso:', agendamento.mensagemgaleso);
                            try {
                                const media = await MessageMedia.fromUrl(agendamento.mensagemgaleso);
                                client.sendMessage(agendamento.FONE + '@c.us', media, { caption: '' });
                            } catch (error) {
                                console.error('Erro ao obter a mensagemgaleso:', error);
                            }
                        }

                        const success = await updateStatusgale(agendamento.id);
                        if (success) {
                            console.log('BOT-ZDG - Mensagem ID: ' + agendamento.id + ' - statusgaleso atualizado para "enviado"');
                        } else {
                            console.log('BOT-ZDG - Falha ao atualizar o statusgaleso da mensagem ID: ' + agendamento.id);
                        }
                    }
                }

                for (const agendamento of agendamentosgarantiafilefi) {
                    if (agendamento.data_finalizacao && agendamento.data_finalizacao <= hoje && !agendamento.enviado) {
                        // Marcar o agendamento como enviado
                        agendamento.enviado = true;

                        if (agendamento.nome !== '') {
                            client.sendMessage(agendamento.FONE + '@c.us', agendamento.nome);
                        }

                        if (agendamento.mensagemgalefi && agendamento.mensagemgalefi !== '') {
                            console.log('URL da mensagemgalefi:', agendamento.mensagemgalefi);
                            try {
                                const media = await MessageMedia.fromUrl(agendamento.mensagemgalefi);
                                client.sendMessage(agendamento.FONE + '@c.us', media, { caption: '' });
                            } catch (error) {
                                console.error('Erro ao obter a mensagemgalefi:', error);
                            }
                        }

                        const success = await updateStatusgafle(agendamento.id);
                        if (success) {
                            console.log('BOT-ZDG - Mensagem ID: ' + agendamento.id + ' - statusgalefi atualizado para "enviado"');
                        } else {
                            console.log('BOT-ZDG - Falha ao atualizar o statusgalefi da mensagem ID: ' + agendamento.id);
                        }
                    }
                }

                for (const agendamento of agendamentospap) {
                    if (agendamento.data_entrevista && agendamento.data_entrevista <= hoje && !agendamento.enviado) {
                        // Marcar o agendamento como enviado
                        agendamento.enviado = true;

                        if (agendamento.nome !== '') {
                            client.sendMessage(agendamento.fone + '@c.us', agendamento.nome);
                        }
                        if (agendamento.mensagemen && agendamento.mensagemen !== '') {
                            console.log('URL da mensagemen:', agendamento.mensagemen);
                            try {
                                const media = await MessageMedia.fromUrl(agendamento.mensagemen);
                                client.sendMessage(agendamento.fone + '@c.us', media, { caption: '' });
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
                        agendamento.enviado = true;

                        if (agendamento.nome !== '') {
                            client.sendMessage(agendamento.fone + '@c.us', agendamento.nome);
                        }

                        if (agendamento.mensagemco && agendamento.mensagemco !== '') {
                            console.log('URL da mensagemco:', agendamento.mensagemco);
                            try {
                                const media = await MessageMedia.fromUrl(agendamento.mensagemco);
                                client.sendMessage(agendamento.fone + '@c.us', media, { caption: '' });
                            } catch (error) {
                                console.error('Erro ao obter a mensagemco:', error);
                            }
                        }

                        const success = await updateStatusco(agendamento.id);
                        if (success) {
                            console.log('BOT-ZDG - Mensagem ID: ' + agendamento.id + ' - statusen atualizado para "enviado"');
                        } else {
                            console.log('BOT-ZDG - Falha ao atualizar o statusen da mensagem ID: ' + agendamento.id);
                        }
                    }
                }


                for (const agendamento of agendamentospapdia) {
                    if (agendamento.datadiaantes && agendamento.datadiaantes <= hoje && !agendamento.enviado) {
                        // Marcar o agendamento como enviado
                        agendamento.enviado = true;

                        if (agendamento.nome !== '') {
                            client.sendMessage(agendamento.fone + '@c.us', agendamento.nome);
                        }

                        if (agendamento.mensagemdiaantes && agendamento.mensagemdiaantes !== '') {
                            console.log('URL da mensagemdiaantes:', agendamento.mensagemdiaantes);
                            try {
                                const media = await MessageMedia.fromUrl(agendamento.mensagemdiaantes);
                                client.sendMessage(agendamento.fone + '@c.us', media, { caption: '' });
                            } catch (error) {
                                console.error('Erro ao obter a mensagemdiaantes:', error);
                            }
                        }

                        const success = await updateStatuscodia(agendamento.id);
                        if (success) {
                            console.log('BOT-ZDG - Mensagem ID: ' + agendamento.id + ' - statusdiaantes atualizado para "enviado"');
                        } else {
                            console.log('BOT-ZDG - Falha ao atualizar o statusdiaantes da mensagem ID: ' + agendamento.id);
                        }
                    }
                }

                for (const agendamento of agendamentosdateip2) {
                    if (agendamento.dateip2 && agendamento.dateip2 <= hoje && !agendamento.enviado) {
                        // Marcar o agendamento como enviado
                        agendamento.enviado = true;

                        if (agendamento.nome !== '') {
                            client.sendMessage(agendamento.fone + '@c.us', agendamento.nome);
                        }

                        if (agendamento.mensagemip2 && agendamento.mensagemip2 !== '') {
                            console.log('URL da mensagemip2:', agendamento.mensagemip2);
                            try {
                                const media = await MessageMedia.fromUrl(agendamento.mensagemip2);
                                client.sendMessage(agendamento.fone + '@c.us', media, { caption: '' });
                            } catch (error) {
                                console.error('Erro ao obter a mensagemip2:', error);
                            }
                        }

                        const success = await updateSatusip2(agendamento.id);
                        if (success) {
                            console.log('BOT-ZDG - Mensagem ID: ' + agendamento.id + ' - statusip2 atualizado para "enviado"');
                        } else {
                            console.log('BOT-ZDG - Falha ao atualizar o statusip2 da mensagem ID: ' + agendamento.id);
                        }
                    }
                }


                for (const agendamento of agendamentosdateip3) {
                    if (agendamento.dateip3 && agendamento.dateip3 <= hoje && !agendamento.enviado) {
                        // Marcar o agendamento como enviado
                        agendamento.enviado = true;

                        if (agendamento.nome !== '') {
                            client.sendMessage(agendamento.fone + '@c.us', agendamento.nome);
                        }

                        if (agendamento.mensagemip3 && agendamento.mensagemip3 !== '') {
                            console.log('URL da mensagemip3:', agendamento.mensagemip3);
                            try {
                                const media = await MessageMedia.fromUrl(agendamento.mensagemip3);
                                client.sendMessage(agendamento.fone + '@c.us', media, { caption: '' });
                            } catch (error) {
                                console.error('Erro ao obter a mensagemip3:', error);
                            }
                        }

                        const success = await updatestatusip3(agendamento.id);
                        if (success) {
                            console.log('BOT-ZDG - Mensagem ID: ' + agendamento.id + ' - statusip3 atualizado para "enviado"');
                        } else {
                            console.log('BOT-ZDG - Falha ao atualizar o statusip3 da mensagem ID: ' + agendamento.id);
                        }
                    }
                }


                for (const agendamento of agendamentosdateip4) {
                    if (agendamento.dateip4 && agendamento.dateip4 <= hoje && !agendamento.enviado) {
                        // Marcar o agendamento como enviado
                        agendamento.enviado = true;

                        if (agendamento.nome !== '') {
                            client.sendMessage(agendamento.fone + '@c.us', agendamento.nome);
                        }

                        if (agendamento.mensagemip4 && agendamento.mensagemip4 !== '') {
                            console.log('URL da mensagemip4:', agendamento.mensagemip4);
                            try {
                                const media = await MessageMedia.fromUrl(agendamento.mensagemip4);
                                client.sendMessage(agendamento.fone + '@c.us', media, { caption: '' });
                            } catch (error) {
                                console.error('Erro ao obter a mensagemip4:', error);
                            }
                        }

                        const success = await updateStatusiip4(agendamento.id);
                        if (success) {
                            console.log('BOT-ZDG - Mensagem ID: ' + agendamento.id + ' - statusiip4 atualizado para "enviado"');
                        } else {
                            console.log('BOT-ZDG - Falha ao atualizar o statusiip4 da mensagem ID: ' + agendamento.id);
                        }
                    }
                }


                for (const agendamento of agendamentosdateip5) {
                    if (agendamento.dateip5 && agendamento.dateip5 <= hoje && !agendamento.enviado) {
                        // Marcar o agendamento como enviado
                        agendamento.enviado = true;

                        if (agendamento.nome !== '') {
                            client.sendMessage(agendamento.fone + '@c.us', agendamento.nome);
                        }

                        if (agendamento.mensagemip5 && agendamento.mensagemip5 !== '') {
                            console.log('URL da mensagemip5:', agendamento.mensagemip5);
                            try {
                                const media = await MessageMedia.fromUrl(agendamento.mensagemip5);
                                client.sendMessage(agendamento.fone + '@c.us', media, { caption: '' });
                            } catch (error) {
                                console.error('Erro ao obter a mensagemip5:', error);
                            }
                        }

                        const success = await updateStatusip5(agendamento.id);
                        if (success) {
                            console.log('BOT-ZDG - Mensagem ID: ' + agendamento.id + ' - statusip5 atualizado para "enviado"');
                        } else {
                            console.log('BOT-ZDG - Falha ao atualizar o statusip5 da mensagem ID: ' + agendamento.id);
                        }
                    }
                }


                for (const agendamento of agendamentosdateip6) {
                    if (agendamento.dateip6 && agendamento.dateip6 <= hoje && !agendamento.enviado) {
                        // Marcar o agendamento como enviado
                        agendamento.enviado = true;

                        if (agendamento.nome !== '') {
                            client.sendMessage(agendamento.fone + '@c.us', agendamento.nome);
                        }

                        if (agendamento.mensagemip6 && agendamento.mensagemip6 !== '') {
                            console.log('URL da mensagemip6:', agendamento.mensagemip6);
                            try {
                                const media = await MessageMedia.fromUrl(agendamento.mensagemip6);
                                client.sendMessage(agendamento.fone + '@c.us', media, { caption: '' });
                            } catch (error) {
                                console.error('Erro ao obter a mensagemip6:', error);
                            }
                        }

                        const success = await updateStatusip6(agendamento.id);
                        if (success) {
                            console.log('BOT-ZDG - Mensagem ID: ' + agendamento.id + ' - statusip6 atualizado para "enviado"');
                        } else {
                            console.log('BOT-ZDG - Falha ao atualizar o statusip6 da mensagem ID: ' + agendamento.id);
                        }
                    }
                }




                for (const agendamento of agendamentosdatern) {
                    if (agendamento.datern && agendamento.datern <= hoje && !agendamento.enviado) {
                        // Marcar o agendamento como enviado
                        agendamento.enviado = true;

                        if (agendamento.nome !== '') {
                            client.sendMessage(agendamento.fone + '@c.us', agendamento.nome);
                        }

                        if (agendamento.mesnagemrn && agendamento.mesnagemrn !== '') {
                            console.log('URL da mesnagemrn:', agendamento.mesnagemrn);
                            try {
                                const media = await MessageMedia.fromUrl(agendamento.mesnagemrn);
                                client.sendMessage(agendamento.fone + '@c.us', media, { caption: '' });
                            } catch (error) {
                                console.error('Erro ao obter a mesnagemrn:', error);
                            }
                        }

                        const success = await updateStatusrn(agendamento.id);
                        if (success) {
                            console.log('BOT-ZDG - Mensagem ID: ' + agendamento.id + ' - statusrn atualizado para "enviado"');
                        } else {
                            console.log('BOT-ZDG - Falha ao atualizar o statusrn da mensagem ID: ' + agendamento.id);
                        }
                    }
                }

                for (const agendamento of agendamentostaxa) {
                    if (agendamento.data_envio && agendamento.data_envio <= hoje && !agendamento.enviado) {
                        // Marcar o agendamento como enviado
                        agendamento.enviado = true;

                        if (agendamento.nome !== '') {
                            client.sendMessage(agendamento.fone + '@c.us', agendamento.nome);
                        }

                        if (agendamento.mensagem && agendamento.mensagem !== '') {
                            console.log('URL da mensagem:', agendamento.mensagem);
                            try {
                                const media = await MessageMedia.fromUrl(agendamento.mensagem);
                                client.sendMessage(agendamento.fone + '@c.us', media, { caption: '' });
                            } catch (error) {
                                console.error('Erro ao obter a mensagem:', error);
                            }
                        }

                        const success = await updateStatastaxa(agendamento.id);
                        if (success) {
                            console.log('BOT-ZDG - Mensagem ID: ' + agendamento.id + ' - statustaxa atualizado para "enviado"');
                        } else {
                            console.log('BOT-ZDG - Falha ao atualizar o statustaxa da mensagem ID: ' + agendamento.id);
                        }
                    }
                }
                
                for (const agendamento of agendamentosmensagem) {
                    if (agendamento.data && agendamento.data <= hoje && !agendamento.enviado) {
                        // Marcar o agendamento como enviado
                        agendamento.enviado = true;
    
                        if (agendamento.imagem && agendamento.imagem !== '') {
                            console.log('URL da imagem:', agendamento.imagem);
                            try {
                                const media = await MessageMedia.fromUrl(agendamento.imagem);
                                await client.sendMessage(agendamento.fone + '@c.us', media, { caption: '' });
                            } catch (error) {
                                console.error('Erro ao obter a imagem:', error);
                            }
                        }
                        
                        if (agendamento.mensagem !== '') {
                            try {
                                await client.sendMessage(agendamento.fone + '@c.us', agendamento.mensagem);
                            } catch (error) {
                                console.error('Erro ao enviar a mensagem:', error);
                            }
                        }
                        
                        const success = await updateStatasmensagem(agendamento.id);
                        if (success) {
                            console.log('BOT-ZDG - Mensagem ID: ' + agendamento.id + ' - status atualizado para "enviado"');
                        } else {
                            console.log('BOT-ZDG - Falha ao atualizar o status da imagem ID: ' + agendamento.id);
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

