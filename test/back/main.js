import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import { WebSocketServer } from "ws";

const app = express();
const PORT = 3001;

app.use(cors());

// Cria o servidor HTTP + WebSocket
const server = app.listen(PORT, () => {
    console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
});

const wss = new WebSocketServer({ server });

// Função para buscar todos os preços do dia
async function fetchFullDay(symbol) {
    try {
        const response = await fetch(
            `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1m&range=1d`
        );
        const json = await response.json();

        if (!json.chart?.result) return null;

        const result = json.chart.result[0];
        const timestamps = result.timestamp;
        const prices = result.indicators.quote[0].close;

        const data = timestamps.map((t, i) => ({
            time: new Date(t * 1000).toLocaleTimeString("pt-BR", { hour12: false }),
            price: prices[i],
        })).filter(p => p.price);

        return data;
    } catch (err) {
        console.error("Erro ao buscar histórico do ativo:", err);
        return null;
    }
}

// Função para pegar o último valor
async function fetchLastPrice(symbol) {
    const data = await fetchFullDay(symbol);
    if (!data) return null;
    return data[data.length - 1];
}

// WebSocket: comunicação com o front-end
wss.on("connection", (ws) => {
    console.log("📡 Cliente conectado via WebSocket");

    let symbol = null;
    let interval = null;

    ws.on("message", async (msg) => {
        const { type, symbol: sym } = JSON.parse(msg);

        if (type === "subscribe") {
            symbol = sym.toUpperCase();
            console.log(`🟢 Subscrito em: ${symbol}`);

            // Envia o gráfico completo do dia até agora
            const fullDay = await fetchFullDay(symbol);
            if (fullDay) {
                ws.send(JSON.stringify({ type: "fullDay", data: fullDay }));
            }

            // E continua enviando novos valores a cada 5s
            interval = setInterval(async () => {
                const latest = await fetchLastPrice(symbol);
                if (latest) {
                    ws.send(JSON.stringify({ type: "price", data: latest }));
                }
            }, 5000);
        }
    });

    ws.on("close", () => {
        console.log("❌ Cliente desconectado");
        clearInterval(interval);
    });
});
