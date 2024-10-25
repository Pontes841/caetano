const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const qrcode = require('qrcode');
const fileUpload = require('express-fileupload');
const port = 8067;
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
        user: 'u896627913_centralgoiania',
        password: 'Felipe@91118825',
        database: 'u896627913_centralgoiania'
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

// Function to update statusop in the database
const updateStatusop = async (id) => {
    try {
        const connection = await getConnection();
        const query = 'UPDATE controle_os SET statusop = "enviado" WHERE id = ?';
        const [result] = await connection.execute(query, [id]);
        return result.affectedRows > 0;
    } catch (error) {
        console.error('Erro ao atualizar o statusop:', error);
        return false;
    }
};

// Function to update the opinion in the database
const updateOpiniao = async (id, opinion) => {
    try {
        const connection = await getConnection();
        let opinionName = '';

        // Map numeric opinions to names
        switch (opinion) {
            case 1:
                opinionName = 'Estou tendo dificuldades';
                break;
            case 2:
                opinionName = 'Estou me acostumando, mas ainda não é ideal';
                break;
            case 3:
                opinionName = 'Estou adorando! A visão está incrível!';
                break;
            // Add more cases if needed

            default:
                opinionName = 'Não especificado';
        }

        const query = 'UPDATE controle_os SET opiniao = ? WHERE id = ?';
        const [result] = await connection.execute(query, [opinionName, id]);
        return result.affectedRows > 0;
    } catch (error) {
        console.error('Erro ao atualizar a opiniao:', error);
        return false;
    }
};

// Função para atualizar a resposta do cliente 
const updateRespostaPersonalizada = async (id, resposta) => {
    try {
        const connection = await getConnection();
        const query = 'UPDATE controle_os SET resposta_personalizada = ? WHERE id = ?';
        const [result] = await connection.execute(query, [resposta, id]);
        return result.affectedRows > 0;
    } catch (error) {
        console.error('Erro ao atualizar a resposta personalizada:', error);
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

const agendamentoZDG23 = async () => {
    try {
        const connection = await getConnection();
        const query = 'SELECT * FROM controle_os WHERE statusop IS NULL OR statusop = ""';
        const [rows] = await connection.execute(query);
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
        clientId: 'bot-zdg_8067', // Provided clientId
        // Para o segundo cliente
        dataPath: path.join(__dirname, '..', 'sessions', 'instancia8067')
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
    nodeCron.schedule('*/5 8-18 * * *', async function () {
        try {

                const agendamentosSolicitacao = await agendamentoZDG();
                const agendamentosFinalizacao = await agendamentoZDG2();
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
                const agendamentoscobranca = await agendamentoZDG23();

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
                                const linkURL = 'https://search.google.com/local/writereview?placeid=ChIJy3N3n9_0XpMRAYtc1Brfu6U'; // Replace this with your desired link URL
                                const textBelowImage = 'Seu feedback é importante para a Óticas Diniz. Poste uma avaliação no nosso perfil.';
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

                for (const agendamento of agendamentoscobranca) {
                    if (agendamento.dataopiniao && agendamento.dataopiniao <= hoje && !agendamento.enviado) {
                        // Marcar o agendamento como enviado
                        agendamento.enviado = true;
                        
                        // Atualizar o statusop no banco de dados
                        const successUpdateStatus = await updateStatusop(agendamento.id);
                        if (successUpdateStatus) {
                            console.log('BOT-ZDG - Mensagem ID: ' + agendamento.id + ' - statusop atualizado para "enviado"');
                        } else {
                            console.log('BOT-ZDG - Falha ao atualizar o statusop da mensagem ID: ' + agendamento.id);
                            continue; // Continue para o próximo agendamento se a atualização do statusop falhar
                        }
                
                        if (agendamento.nome !== '') {
                            const feedbackMessage = 
                            `Como está a sua adaptação aos novos óculos? Estamos aqui para te ajudar a qualquer momento! 😊\n\n` +
                            `Gostaríamos de saber sua opinião:\n\n` +
                            ` ● 1️⃣ - Estou tendo dificuldades\n\n` +
                            ` ● 2️⃣ - Estou me acostumando, mas ainda não é ideal\n\n` +
                            ` ● 3️⃣ - Estou adorando! A visão está incrível!\n\n` +
                            `Responda com o número da sua escolha e sinta-se à vontade para nos contatar para qualquer dúvida! ✨`;
                
                            client.sendMessage(agendamento.fone + '@c.us', feedbackMessage);
                
                            // Adicionar um ouvinte para mensagens recebidas e esperar pela resposta do usuário
                            const waitForUserResponse = async (clientId) => {
                                return new Promise((resolve) => {
                                    const responseListener = (message) => {
                                        if (message.from.endsWith('@c.us') && message.from.startsWith(clientId)) {
                                            if (message.body.match(/^[1-3]$/)) {
                                                resolve(parseInt(message.body)); // Resposta válida
                                            } else {
                                                // Armazenar resposta não válida
                                                const customResponse = message.body; // Texto ou áudio
                                                updateRespostaPersonalizada(agendamento.id, customResponse);
                                                resolve(null); // Para indicar que foi uma entrada não válida
                                            }
                
                                            // Remover o ouvinte após receber uma resposta
                                            client.off('message', responseListener);
                                        }
                                    };
                
                                    client.on('message', responseListener);
                                });
                            };
                
                            const userOpinion = await waitForUserResponse(agendamento.fone);
                
                            // Verificar se a opinião do usuário é válida ou não
                            if (userOpinion) {
                                // Atualizar o banco de dados com a opinião do usuário associada ao ID correto
                                const successUpdateOpiniao = await updateOpiniao(agendamento.id, userOpinion);
                                if (successUpdateOpiniao) {
                                    console.log('BOT-ZDG - Opinião do cliente atualizada com sucesso para a mensagem ID: ' + agendamento.id);
                                } else {
                                    console.log('BOT-ZDG - Falha ao atualizar a opinião do cliente para a mensagem ID: ' + agendamento.id);
                                }
                            } else {
                                console.log('BOT-ZDG - Resposta do usuário foi não válida para a mensagem ID: ' + agendamento.id);
                            }
                            
                            // Enviar mensagem baseada na opinião
                            let confirmationMessage;
                            if (userOpinion === 1 || userOpinion === 2) {
                                confirmationMessage = `Obrigado pelo seu feedback! Em breve, um consultor irá entrar em contato com você para ajudar.`;
                            } else if (userOpinion === 3) {
                                confirmationMessage = `Obrigado por compartilhar sua opinião conosco!🙏`;
                            }
                
                            if (confirmationMessage) {
                                client.sendMessage(agendamento.fone + '@c.us', confirmationMessage);
                            }
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

