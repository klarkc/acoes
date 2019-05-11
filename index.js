const Configstore = require('configstore');
const pkg = require('./package.json');

// create a Configstore instance with an unique ID e.g.
// Package name and optionally some default values
const conf = new Configstore(pkg.name, { 
    valorOperacao: 0,
    taxaImposto: 0,
    lucro: 30,
    custo: 10000,
    acoes: 1000,
    fracionadas: false,
});

function imprimeStops(args, stops = 3) {
    const { _, l, i, o, c, a, f } = args;
    const [cmd, t, sl, sg1, sg2, sg3] = _;
    let q = f?stops:stops*100; // n acoes
    let profit = 0;
    let done = false;
    do {
        const qq = q / stops;
        const nOps = 2 + stops;
        const taxes = o * nOps + (o * (1 + i / 100)) * nOps;
        const buy = t * q;
        let sell = sg1 * qq
        if (stops > 1) {
            sell += sg2 * qq;
        }
        if (stops > 2) {
            sell += sg3 * qq;
        }
        const cost = buy + taxes;
        profit = sell - cost;
        const minProfit = buy * l / 100;
        done = profit >= minProfit && cost < c;
        q += f?stops:stops*100;
    } while (!done && q <= a);
    if (!done) {
        if (l > 1) {
            const newL = Math.floor(l * .9);
            imprimeStops({...args, l: newL}, stops);
        } else {
            console.log('lucro de', l, '% não realisável');
        }
    } else {
        const lastQ = q - (f?stops:f*100);
        const qtd = lastQ / stops;
        const cost = t * lastQ;
        const loss = sl * lastQ;
        const maxLoss = cost - loss;

        console.log('lucro de', l, '% com a seguinte configuração');
        console.log('trigger', t);
        console.log('stop loss', sl);
        console.log('stop gain em', sg1, 'com', qtd, 'ações');
        if (stops > 1) {
            console.log('stop gain em', sg2, 'com', qtd, 'ações');
        }
        if (stops > 2) {
            console.log('stop gain em', sg3, 'com', qtd, 'ações');
        }
        console.log('=> custo da operação', Math.floor(cost));
        console.log('=> lucro da operação', Math.floor(profit));
        console.log('=> perda máxima', Math.floor(maxLoss));
    }
}

const argv = require('yargs')
    .usage('Uso: $0 <comando> [opcoes]')
    .command('stops', 'Retorna os stops com a quantidade de ações')
    .example('$0 stops 12.3 10 14.4 16 18.8', 'Retorna os stops com a quantidade ideal para uma ação com trigger 12.3, stoploss 10, stopgain 14.4, stopgain 16 e stopgain 18.8')
    .alias('o', 'valorOperacao')
    .nargs('o', 1)
    .default('o', conf.get('valorOperacao'))
    .describe('o', 'Valor da operação (corretagem)')
    .alias('i', 'taxaImposto')
    .nargs('i', 1)
    .default('i', conf.get('taxaImposto'))
    .describe('i', 'Porcentagem de impostos na Taxa de operação')
    .alias('l', 'lucro')
    .nargs('l', 1)
    .default('l', conf.get('lucro'))
    .describe('l', 'Porcentagem de lucro máximo')
    .alias('c', 'custo')
    .nargs('c', 1)
    .default('c', conf.get('custo'))
    .describe('c', 'Custo limite para comprar ações')
    .alias('a', 'acoes')
    .nargs('a', 1)
    .default('a', conf.get('acoes'))
    .describe('a', 'Número máximo de ações para efetuar compra')
    .alias('f', 'fracionadas')
    .default('f', conf.get('fracionadas'))
    .describe('f', 'Permitir ações fracionadas')
    .alias('h', 'help')
    .help('h')
    .argv;

console.log('== SIMULAÇÃO 1 ==');
imprimeStops(argv, 1);
console.log('');
console.log('== SIMULAÇÃO 2 ==');
imprimeStops(argv, 2);
console.log('');
console.log('== SIMULAÇÃO 3 ==');
imprimeStops(argv, 3);